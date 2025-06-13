const axios = require('axios');
const logger = require('../config/logger');
const { UnauthorizedError } = require('../error/api');

const callAnnouncement = async (key) => {
  const announcementUrl = `${process.env.ANNOUNCEMENT_URL}/${key}`;

  let response = null;

  

  try {
    // You can add your token here, for example, from an environment variable
    const authToken = process.env.ANNOUNCEMENT_API_KEY;

    // Ensure the authToken is available before making the request
    if (!authToken) {
      throw new UnauthorizedError("Authorization token is missing");
    }
    response = await axios.get(announcementUrl, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
      }
    });
  }
  catch (err) {
    logger.error(`Error calling the announcement endpoint: ${JSON.stringify(err, null, 2)}`);
    response = err.response ? err.response :
      { status: err.status ? err.status : 500, data: { error: 'Something went wrong to call the announcement endpoint' } };
  }

  return response;
}

module.exports = callAnnouncement; 
