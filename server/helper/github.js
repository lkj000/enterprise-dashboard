const axios = require('axios');
const logger = require('../config/logger');

const repoOwner = 'albertsons'; 
const headers = {
    headers: {
        Authorization: `Bearer ${process.env.GH_TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
    },
}

const callApiToTriggerWorkflow = async (repoName, workflowId, payload) => {
    const baseUrl = `https://github.albertsons.com/api/v3/repos/${repoOwner}/${repoName}`; 
    const triggerWorkflowUrl = `${baseUrl}/actions/workflows/${workflowId}/dispatches`;

    let response = null;
    try {
        response = await axios.post(triggerWorkflowUrl, payload, headers);
    }
    catch (err) {
        logger.info(`Error triggering the workflow: ${JSON.stringify(err, null, 2)}`);
        response = err.response ? err.response : 
                    {status: err.status ? err.status : 500, data: {error: 'Something went wrong to trigger the workflow'}};
    }

    return response;
}

module.exports = callApiToTriggerWorkflow; 


