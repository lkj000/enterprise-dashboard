const {
  StorageSharedKeyCredential,
  generateBlobSASQueryParameters,
  ContainerSASPermissions,
} = require("@azure/storage-blob");

const { v4: uuidv4 } = require("uuid");

const logger = require("../config/logger");

const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
const accountKey = process.env.AZURE_STORAGE_ACCOUNT_ACCESS_KEY;
const containerName = "esghjiraattachments";
const envType = process.env.ENV_TYPE;

const sharedKeyCredential = new StorageSharedKeyCredential(
  accountName,
  accountKey
);

const generateSASUrl = async (fileName) => {
  try {
    const startsOn = new Date();
    const expiresOn = new Date(startsOn.getTime() + 10 * 60 * 1000); // 2 minutes

    const permissions = ContainerSASPermissions.parse("rw");

    const blobName = `${uuidv4()}-${envType}-${fileName}`;

    const sasOptions = {
      containerName,
      permissions,
      startsOn,
      expiresOn,
      blobName,
    };

    const sasToken = generateBlobSASQueryParameters(
      sasOptions,
      sharedKeyCredential
    ).toString();

    const blobUrl = `https://${accountName}.blob.core.windows.net/${containerName}/${encodeURIComponent(
      blobName
    )}?${sasToken}`;

    return {
      blobUrl,
      blobName,
      fileName,
    };
  } catch (error) {
    logger.error(`Error generating SAS token: ${JSON.stringify(error, null, 2)}`);
    throw error;
  }
};

module.exports = { generateSASUrl };
