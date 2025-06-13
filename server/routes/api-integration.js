const express = require('express');
const router = express.Router();
const callApiToTriggerWorkflow = require('../helper/github');
const createJiraIssue = require("../helper/jira");
const {callOrchestratorGateway, callOrchestratorGatewayWithFile, callExecuteCommand, callPostPredictionScore} = require('../helper/orchestrator');
const callAnnouncement = require('../helper/announcment');
const { callACRRepositories, callACRRepositoryImages } = require('../helper/acr');
const { fetchDPPData } = require('../helper/dpp_data');
const { sessionAndHeaderAuthMiddleware } = require('../middleware/auth-middleware');
const { generateSASUrl } = require('../helper/azure-blob-service');
const { platformDashboardCookieName, httpStatus: {BAD_REQUEST, CREATED, INTERNAL_SERVER_ERROR} } = require('../config/constant');

const multer = require('multer');
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit
});

router.post('/triggerWorkflow', sessionAndHeaderAuthMiddleware, async (req, res) => {
    const accessToken = req.signedCookies[platformDashboardCookieName]?.accessToken;
    
    // TODO: Need to make the same name of the token input field
    const payload = req.body?.payload;
    if (payload && payload.inputs) {
      if ('USERID' in payload.inputs) { 
        payload.inputs.USERID = accessToken;
      }
      if ('user_jwt' in payload.inputs) {
        payload.inputs.user_jwt = accessToken;
      }
    }

    const response = await callApiToTriggerWorkflow(req.body?.repoName, req.body?.workflowId, req.body?.payload);
    const status = response.status;
    res.status(status).json({response: response.data});
  });

router.post('/createJiraIssue', sessionAndHeaderAuthMiddleware, async (req, res) => {  
    const response = await createJiraIssue(req.body.email, req.body.issueData);
    const status = response.status;
    res.status(status).json({response: response.data});
});

router.post('/orchestrator/gateway', sessionAndHeaderAuthMiddleware, upload.single('file'), async (req, res) => {
  const accessToken = req.signedCookies[platformDashboardCookieName]?.accessToken;
  // Handle file uploads
  if (req.file) {
    try {
      // Use the orchestrator helper for file uploads
      const response = await callOrchestratorGatewayWithFile(
        accessToken, 
        req.body, 
        req.file
      );
      
      const correlationId = response.headers?.['x-correlation-id'];
      const status = response.status;
      return res.status(status).header({'X-Correlation-ID': correlationId}).json(response.data);
    } catch (error) {
      const status = error.response?.status || 500;
      const errorMessage = error.response?.data || { error: `Error processing file upload: ${error.message}` };
      return res.status(status).json(errorMessage);
    }
  }
  
  // For non-file requests, use the standard orchestrator gateway
  const response = await callOrchestratorGateway(req.headers, accessToken ,req.body);
  const correlationId = response.headers?.['x-correlation-id'];
  const status = response.status;
  res.status(status).header({'X-Correlation-ID': correlationId}).json(response.data);
});

router.post('/orchestrator/executeCommand', sessionAndHeaderAuthMiddleware, async (req, res) => {
  const accessToken = req.signedCookies[platformDashboardCookieName]?.accessToken;
  const response = await callExecuteCommand(accessToken, req.body);
  const correlationId = response.headers?.['x-correlation-id'];
  const status = response.status;
  res.status(status).header({'X-Correlation-ID': correlationId}).json(response.data);
});

router.post('/orchestrator/predictionScore', sessionAndHeaderAuthMiddleware, async (req, res) => {
  const accessToken = req.signedCookies[platformDashboardCookieName]?.accessToken;
  const response = await callPostPredictionScore(accessToken, req.body);
  const correlationId = response.headers?.['x-correlation-id'];
  const status = response.status;
  res.status(status).header({'X-Correlation-ID': correlationId}).json(response.data);
});

router.get('/announcements/:key', sessionAndHeaderAuthMiddleware, async (req, res) => {
  const response = await callAnnouncement(req.params.key);
  const status = response.status;
  res.status(status).json(response.data);
});

router.get('/acr/metrics/repositories', sessionAndHeaderAuthMiddleware, async (req, res) => {
  const response = await callACRRepositories();
  const status = response.status;
  res.status(status).json(response.data);
});

router.get('/acr/metrics/repositories/:repository/images', sessionAndHeaderAuthMiddleware, async (req, res) => {
  const response = await callACRRepositoryImages(req.params.repository);
  const status = response.status;
  res.status(status).json(response.data);
});

router.get('/DPPdata', sessionAndHeaderAuthMiddleware, async (req, res) => {
  try {
    const data = await fetchDPPData();
    res.json(data);
  } catch (error) {
    console.error('Error fetching DPP data:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/azureBlobService/generateSASUrl', async (req, res) => {
  if (!Array.isArray(req.body.fileNames) || req.body.fileNames.length === 0) {
    res.status(BAD_REQUEST).json({ message: 'No files to upload' });
    return;
  }
  const promises = req.body.fileNames.map((fileName) => generateSASUrl(fileName));
  try {
    let result = await Promise.all(promises);
    result = result.reduce((acc, curr) => {
      const { blobUrl, blobName, fileName } = curr;
      acc[fileName] = {
        blobUrl,
        blobName,
      };
      return acc;
    }, {});
    res.status(CREATED).json({
      blobs: result,
      envType: process.env.ENV_TYPE,
    });
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).json({
      message: 'Error generating SAS URL',
    });
  }

  
});

module.exports = router;