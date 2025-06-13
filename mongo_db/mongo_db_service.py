from datetime import datetime, timedelta
from typing import Any, Dict, List, Mapping, Optional, Union
import time

from pymongo import UpdateOne
from pymongo.collection import Collection
from pymongo.database import Database
from pymongo.errors import PyMongoError

from mongo_db.mongo_db_client import MongoDBClient


class MongoDBService:
    """
    A generic service for MongoDB operations with support for batch processing
    and data lifecycle management.
    """

    def __init__(
        self,
        mongo_client: MongoDBClient,
        default_collection: Optional[str] = None,
        timestamp_field: str = "inserted_date",
    ):
        """
        Initialize MongoDB service

        Args:
            mongo_client: MongoDBClient instance for database connectivity
            default_collection: Default collection to use if not specified in methods
            timestamp_field: Field name to use for update timestamps
        """
        self.mongo_client = mongo_client
        self.default_collection = default_collection
        self.timestamp_field = timestamp_field
        self.db: Optional[Database] = None

    def connect(self) -> bool:
        """
        Establish connection to MongoDB through the MongoDBClient

        Returns:
            True if connection successful, False otherwise
        """
        try:
            self.db = self.mongo_client.get_database()

            # Test connection
            self.mongo_client.client.admin.command("ping")
            print(f"Connected to MongoDB database: {self.db.name}")
            return True
        except PyMongoError as e:
            print(f"Failed to connect to MongoDB: {e}")
            return False

    def close(self) -> None:
        """Close MongoDB connection"""
        try:
            self.mongo_client.close()
            self.db = None
            print("MongoDB connection closed")
        except Exception as e:
            print(f"Error closing connection: {e}")

    def get_database(self) -> Optional[Database]:
        """Get the MongoDB database object"""
        if self.db is None:
            self.db = self.mongo_client.get_database()
        return self.db

    def get_collection(
        self, collection_name: Optional[str] = None
    ) -> Optional[Collection]:
        """
        Get a MongoDB collection

        Args:
            collection_name: Name of collection to use (falls back to default if None)

        Returns:
            MongoDB collection object or None if unavailable
        """
        db = self.get_database()
        if db is None:
            return None

        coll_name = collection_name or self.default_collection
        if coll_name is None:
            print("No collection name provided and no default set")
            return None

        return db[coll_name]

    def upsert_many_documents(
            self,
            documents: List[Dict[str, Any]],
            collection_name: Optional[str] = None,
            batch_size: int = 100,
            id_field: str = "",
            add_timestamp: bool = True,
            max_retries: int = 5,
            initial_retry_delay_ms: int = 50
    ) -> Dict[str, Any]:
        """
        Upsert multiple documents to MongoDB with retry logic for rate limiting.
        Only retries failed documents when rate limits are hit.
        """
        if not documents:
            return {"success": True, "processed": 0, "message": "No data to process"}

        try:
            collection = self.get_collection(collection_name)
            if collection is None:
                return {"success": False, "message": "Failed to get collection"}

            current_time = datetime.now()

            # Add timestamp if needed
            if add_timestamp:
                for doc in documents:
                    doc[self.timestamp_field] = current_time

            # Process in batches
            total_processed = 0
            batch_count = (len(documents) + batch_size - 1) // batch_size

            for i in range(0, len(documents), batch_size):
                batch_docs = documents[i:i + batch_size]
                remaining_docs = batch_docs.copy()

                # Retry logic
                retry_count = 0
                retry_delay_ms = initial_retry_delay_ms

                while remaining_docs and retry_count <= max_retries:
                    try:
                        # Prepare operations for remaining docs
                        operations = []
                        for doc in remaining_docs:
                            filter_doc = {id_field: doc.get(id_field)} if id_field in doc else doc
                            operations.append(UpdateOne(filter_doc, {"$set": doc}, upsert=True))

                        # Execute bulk write
                        result = collection.bulk_write(operations, ordered=False)
                        batch_processed = result.upserted_count + result.modified_count
                        total_processed += batch_processed

                        print(f"Processed batch {i // batch_size + 1}/{batch_count}: {batch_processed} documents")

                        # All documents processed successfully
                        remaining_docs = []
                        time.sleep(0.2)  # Sleep to avoid overwhelming the server
                        break

                    except PyMongoError as e:
                        if "TooManyRequests" in str(e) or "429" in str(e):
                            retry_count += 1

                            # Try to extract information about successful operations
                            successful_indices = []
                            if hasattr(e, 'details') and 'writeErrors' in e.details:
                                # Find the index of the first failed operation
                                error_indices = [err['index'] for err in e.details['writeErrors']]
                                # Mark all operations before the first error as successful
                                if error_indices:
                                    first_error_idx = min(error_indices)
                                    successful_indices = list(range(first_error_idx))

                            # Remove successfully processed documents
                            if successful_indices:
                                for idx in sorted(successful_indices, reverse=True):
                                    if idx < len(remaining_docs):
                                        del remaining_docs[idx]

                                # Update processed count based on successful operations
                                if hasattr(e, 'details'):
                                    if 'nUpserted' in e.details:
                                        total_processed += e.details['nUpserted']
                                    if 'nMatched' in e.details:
                                        total_processed += e.details['nMatched']

                            # Extract retry delay
                            retry_after_ms = initial_retry_delay_ms
                            import re
                            match = re.search(r'RetryAfterMs=(\d+)', str(e))
                            if match:
                                retry_after_ms = max(int(match.group(1)), retry_after_ms)

                            # Exponential backoff
                            retry_delay_ms = retry_after_ms * (2 ** (retry_count - 1))

                            if retry_count <= max_retries and remaining_docs:
                                print(
                                    f"Rate limit exceeded. Retrying {len(remaining_docs)} documents in {retry_delay_ms}ms (attempt {retry_count}/{max_retries})")
                                time.sleep(retry_delay_ms / 1000)
                            else:
                                print(f"Max retries exceeded for batch {i // batch_size + 1}")
                                if retry_count > max_retries:
                                    raise
                        else:
                            # Not a rate limiting error
                            raise

            return {
                "success": True,
                "processed": total_processed,
                "message": f"Successfully processed {total_processed} documents",
            }

        except PyMongoError as e:
            print(f"Error storing batch in MongoDB: {e}")
            return {"success": False, "message": f"MongoDB error: {str(e)}"}
        except Exception as e:
            print(f"Unexpected error in upsert_many_documents: {e}")
            return {"success": False, "message": f"Unexpected error: {str(e)}"}

    def delete_old_data(
        self,
        collection_name: Optional[str] = None,
        days_old: int = 90,
        custom_filter: Optional[Dict] = None,
    ) -> Dict[str, Any]:
        """
        Delete old documents from MongoDB

        Args:
            collection_name: Target collection name
            days_old: Delete documents older than this many days
            custom_filter: Custom MongoDB filter for deletion (overrides timestamp filter)

        Returns:
            Dict with operation results
        """
        try:
            collection = self.get_collection(collection_name)
            if not collection:
                return {"success": False, "message": "Failed to get collection"}

            # Use custom filter or create one based on timestamp
            if custom_filter is None:
                cutoff_date = datetime.now() - timedelta(days=days_old)
                filter_query = {self.timestamp_field: {"$lt": cutoff_date}}
            else:
                filter_query = custom_filter

            result = collection.delete_many(filter_query)

            return {
                "success": True,
                "deleted_count": result.deleted_count,
                "message": f"Deleted {result.deleted_count} documents",
            }

        except PyMongoError as e:
            print(f"Error deleting old data from MongoDB: {e}")
            return {"success": False, "message": f"MongoDB error: {str(e)}"}
        except Exception as e:
            print(f"Unexpected error in delete_old_data: {e}")
            return {"success": False, "message": f"Unexpected error: {str(e)}"}

    def find_documents(
        self,
        query: Dict,
        collection_name: Optional[str] = None,
        projection: Optional[Dict] = None,
        limit: int = 0,
        sort: Optional[List] = None,
    ) -> Union[PyMongoError, list[Union[Mapping[str, Any], Any]], list[Any]]:
        try:
            collection = self.get_collection(collection_name)
            if collection is None:
                return []

            cursor = collection.find(query, projection)

            if limit > 0:
                cursor = cursor.limit(limit)

            if sort:
                cursor = cursor.sort(sort)

            return list(cursor)

        except PyMongoError as e:
            print(f"Error finding documents in MongoDB: {e}")
            return e

    def get_max_of_field(
        self, collection_name: str, field_name: str
    ) -> Optional[datetime]:
        try:
            collection = self.get_collection(collection_name)
            if collection is None:
                return None

            max_date = collection.find_one(
                {},
                sort=[(field_name, -1)],
                projection={field_name: 1}
            )

            return max_date.get(field_name) if max_date else None

        except PyMongoError as e:
            print(f"Error getting max updated date from MongoDB: {e}")
            return None

    def aggregate(
        self, collection_name: str, pipeline: List[Dict[str, Any]]
    ) -> List[Dict[str, Any]]:
        """
        Perform an aggregation operation on a MongoDB collection.

        Args:
            collection_name: Name of the collection to query
            pipeline: List of aggregation pipeline stages

        Returns:
            List of documents resulting from the aggregation
        """
        try:
            print(f"Executing aggregation on collection '{collection_name}'")
            collection = self.mongo_client.get_database()[collection_name]
            cursor = collection.aggregate(pipeline)
            result = list(cursor)
            print(f"Aggregation returned {len(result)} documents")
            return result
        except Exception as e:
            print(
                f"Error during MongoDB aggregation on collection '{collection_name}': {e}"
            )
            return []