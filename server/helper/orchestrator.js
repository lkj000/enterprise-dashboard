const axios = require('axios');
const logger = require('../config/logger');
const FormData = require('form-data');

const callOrchestratorGateway = async (headers, accessToken, payload) => {
  const gatewayUrl = `${process.env.ORCH_API_ENDPOINT}/gateway`;
  let response = null;
  const reqHeaders = {
    Authorization: `Bearer ${process.env.ORCH_AUTH_TOKEN}`,
    "Content-Type": headers['content-type'] || "application/json",
    "jwt-token": accessToken || headers['jwt-token'],
  }
  
  try {
    // For standard JSON requests
    response = await axios.post(gatewayUrl, payload, {
      headers: reqHeaders,
      timeout: 400000
    });
  }
  catch (err) {
    logger.info(`Error calling the orchestrator's gateway endpoint: ${JSON.stringify(err, null, 2)}`);
    response = err.response ? err.response :
      { status: err.status ? err.status : 500, data: { error: 'Something went wrong to call the orchestrator\'s gateway endpoint' } };
  }

  return response;
}

const callOrchestratorGatewayWithFile = async (jwtToken, formFields, file) => {
  const gatewayUrl = `${process.env.ORCH_API_ENDPOINT}/gateway`;
  let response = null;
  
  try {
    // Create a FormData object for multipart/form-data
    const formData = new FormData();
    
    // Add form fields
    if (formFields.query) {
      formData.append('query', formFields.query);
    }
    
    if (formFields.detail) {
      formData.append('detail', formFields.detail);
    }
    
    if (formFields.preset) {
      formData.append('preset', formFields.preset);
    }
    
    // Handle options field - parse it and add it correctly
    if (formFields.options) {
      try {
        const optionsObj = JSON.parse(formFields.options);
        formData.append('options', JSON.stringify(optionsObj));
      } catch (e) {
        formData.append('options', formFields.options);
      }
    }
    
    // Add the file
    formData.append('file', file.buffer, {
      filename: file.originalname,
      contentType: file.mimetype
    });
    
    // Set headers with proper content type and boundary
    const headers = {
      'Authorization': `Bearer ${process.env.ORCH_AUTH_TOKEN}`,
      'Content-Type': `multipart/form-data; boundary=${formData.getBoundary()}`,
      'jwt-token': jwtToken || ''
    };
    
    response = await axios.post(gatewayUrl, formData, {
      headers: headers,
      maxBodyLength: Infinity,
      maxContentLength: Infinity,
      timeout: 400000
    });
  }
  catch (err) {
    logger.info(`Error calling the orchestrator's gateway endpoint with file: ${JSON.stringify(err, null, 2)}`);
    response = err.response ? err.response :
      { status: err.status ? err.status : 500, data: { error: 'Something went wrong to call the orchestrator\'s gateway endpoint with file' } };
  }

  return response;
}

const callExecuteCommand = async (jwtToken, payload) => {
  const gatewayUrl = `${process.env.ORCH_API_ENDPOINT}/execute`;

  let response = null;
  try {
    response = await axios.post(gatewayUrl, payload, {
      headers: {
        Authorization: `Bearer ${process.env.ORCH_AUTH_TOKEN}`,
        "Content-Type": "application/json",
        "jwt-token": jwtToken,
      },
      timeout: 400000,
    });
  }
  catch (err) {
    logger.info(`Error calling the orchestrator's execute command endpoint: ${JSON.stringify(err, null, 2)}`);
    response = err.response ? err.response :
      { status: err.status ? err.status : 500, data: { error: 'Something went wrong to call the orchestrator\'s execute command endpoint' } };
  }

  return response;
}


const callPostPredictionScore = async (jwtToken, payload) => {
  const predictionScore = `${process.env.ORCH_API_ENDPOINT}/post-prediction-score`;
  let response = null;

  try {
    response = await axios.post(predictionScore, payload, {
      headers: {
        Authorization: `Bearer ${process.env.ORCH_AUTH_TOKEN}`,
        "Content-Type": "application/json",
        "jwt-token": jwtToken,
      },
      timeout: 400000,
    });
  }
  catch (err) {
    logger.info(`Error calling the orchestrator's post prediction score endpoint: ${JSON.stringify(err, null, 2)}`);
    response = err.response ? err.response :
      { status: err.status ? err.status : 500, data: { error: 'Something went wrong to call the orchestrator\'s post prediction score endpoint' } };
  }

  return response;
}

module.exports = {callOrchestratorGateway, callOrchestratorGatewayWithFile, callExecuteCommand, callPostPredictionScore}; 
