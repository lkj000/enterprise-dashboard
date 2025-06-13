from typing import Optional

from pymongo import MongoClient
from pymongo.errors import ConnectionFailure


class MongoConfig:
    def __init__(
        self,
        app_name: str,
        database: str,
        host: str = "localhost",
        port: int = 27017,
        username: Optional[str] = None,
        password: Optional[str] = None,
        max_pool_size: int = 1,
        min_pool_size: int = 0,
        connect_timeout_ms: int = 30000,
        socket_timeout_ms: int = 30000,
        max_idle_time_ms: int = 30000,
        wait_queue_timeout_ms: int = 5000,
        ssl: bool = True,
    ):
        self.app_name = app_name
        self.database = database
        self.host = host
        self.port = port
        self.username = username
        self.password = password
        self.max_pool_size = max_pool_size
        self.min_pool_size = min_pool_size
        self.connect_timeout_ms = connect_timeout_ms
        self.socket_timeout_ms = socket_timeout_ms
        self.max_idle_time_ms = max_idle_time_ms
        self.wait_queue_timeout_ms = wait_queue_timeout_ms
        self.ssl = ssl


class MongoDBClient:
    def __init__(self, config: MongoConfig):
        self.config = config
        self.client = self._create_client()

    def _create_client(self) -> MongoClient:
        try:
            if self.config.username and self.config.password:
                uri = f"mongodb://{self.config.username}:{self.config.password}@{self.config.host}:{self.config.port}/"

                return MongoClient(
                    uri,
                    ssl=self.config.ssl,
                    maxPoolSize=self.config.max_pool_size,
                    minPoolSize=self.config.min_pool_size,
                    connectTimeoutMS=self.config.connect_timeout_ms,
                    retryWrites=True,
                    socketTimeoutMS=self.config.socket_timeout_ms,
                    appName=f'github_workflow_{self.config.app_name}',
                    maxIdleTimeMS=self.config.max_idle_time_ms,
                    waitQueueTimeoutMS= self.config.wait_queue_timeout_ms,
                )

            uri = f"mongodb://{self.config.host}:{self.config.port}/"
            return MongoClient(uri)

        except ConnectionFailure as e:
            print(f"Connection failed: {e}")
            raise

    def get_database(self):
        return self.client[self.config.database]

    def close(self):
        if hasattr(self, "client") and self.client:
            self.client.close()