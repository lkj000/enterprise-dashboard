const axios = require('axios');
const logger = require('../config/logger');

const acrUrl = process.env.ACR_API_ENDPOINT;

const axiosConfig = {
  headers: {
    Authorization: `Bearer ${process.env.ACR_API_KEY}`
  }
};

const callACRRepositories = async () => {
  const acrRepositoriesUrl = `${acrUrl}/acrmetrics/repositories`;

  let response = null;
  try {
    response = await axios.get(acrRepositoriesUrl, axiosConfig);
  }
  catch (err) {
    logger.info(`Error calling the /acrmetrics/repositories endpoint: ${JSON.stringify(err, null, 2)}`);
    response = err.response ? err.response :
      { status: err.status ? err.status : 500, data: { error: 'Something went wrong to call the /acrmetrics/repositories endpoint' } };
  }

  return response;
}

const callACRRepositoryImages = async (repository) => {
  const acrRepositoryImagesUrl = `${acrUrl}/acrmetrics/repositories/${repository}/images`;
  let response = null;
  try {
    response = await axios.get(acrRepositoryImagesUrl, axiosConfig);
  }
  catch (err) {
    logger.info(`Error calling the /acrmetrics/repositories/${repository}/images endpoint: ${JSON.stringify(err, null, 2)}`);
    response = err.response ? err.response :
      { status: err.status ? err.status : 500, data: { error: `Something went wrong to call the /acrmetrics/repositories/${repository}/images endpoint` } };
  }
  return response;
};

module.exports = {
  callACRRepositories,
  callACRRepositoryImages
}; 
