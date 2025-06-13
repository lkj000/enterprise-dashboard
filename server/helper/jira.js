const axios = require('axios');
const jiraDomain = 'jira.safeway.com';
const logger = require('../config/logger');

const url = `https://${jiraDomain}/rest/api/2/issue`;

const createJiraIssue = async (email, issueData) => {
    const headers = {
        'Authorization': `Bearer ${process.env.REACT_APP_JIRA_TOKEN}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
      let response = null;
      try {
          response = await axios.post(url, issueData, {headers});
      }
      catch (err) {
        logger.info(`Error creating JIRA issue: ${JSON.stringify(err, null, 2)}`);
          response = err.response ? err.response : 
                      {status: err.status ? err.status : 500, data: {error: 'Something went wrong to create jira issue'}};
      }
  
      return response;
}

module.exports = createJiraIssue; 