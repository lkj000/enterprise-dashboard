const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { splittedJiraFilesFolder, 
  splittedGitHubFilesFolder, 
  splittedJiraFilenamePrefix,
  splittedAppCodeContributionDataFilenamePrefix,
  splittedUserContributionDataFilenamePrefix,
  numberOfJiraFiles, 
  numberOfGitHubActivityFiles,
  httpStatus } = require('../config/constant.js');
const { sessionAndHeaderAuthMiddleware } = require('../middleware/auth-middleware');
const logger = require('../config/logger.js');


router.get('/jiraIssueData', sessionAndHeaderAuthMiddleware, (req, res) => {

  const jiraFileNumber = req.query.number;
  if (jiraFileNumber < 1 || jiraFileNumber > numberOfJiraFiles) {
      return res.status(httpStatus.NOT_FOUND).send(`Invalid Jira file number ${jiraFileNumber}`);
  }

  const fileName = `${splittedJiraFilesFolder}/${splittedJiraFilenamePrefix}${jiraFileNumber}.json`;
  const filePath = path.join(__dirname, fileName);

  fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        logger.error(`Error reading log file ${err}`);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR)
        .send(`Something happend to read the jira file ${jiraFileNumber}. See the server logs for more details.`);
      }
      
      res.json(JSON.parse(data));
  });
});

router.get('/githubUserData', sessionAndHeaderAuthMiddleware, (req, res) => {
  const number = req.query.number;

  if (number < 1 || number > numberOfGitHubActivityFiles) {
    return res.status(httpStatus.NOT_FOUND).send(`Invalid GitHub file number ${number}`);
  }

  const filePath = path.join(__dirname, `${splittedGitHubFilesFolder}/${splittedUserContributionDataFilenamePrefix}${number}.json`);
  fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        logger.error(`Error reading log file ${err}`);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR)
        .send(`Something happend to read the user data. See the server logs for more details.`);
      }
      
      res.json(JSON.parse(data));
  });
});

router.get('/githubRepoData', sessionAndHeaderAuthMiddleware, (req, res) => {
  const number = req.query.number;

  if (number < 1 || number > numberOfGitHubActivityFiles) {
    return res.status(httpStatus.NOT_FOUND).send(`Invalid GitHub file number ${number}`);
  }

  const filePath = path.join(__dirname, `${splittedGitHubFilesFolder}/${splittedAppCodeContributionDataFilenamePrefix}${number}.json`);
  fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        logger.error(`Error reading log file ${err}`);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR)
        .send(`Something happend to read the repo data. See the server logs for more details.`);
      }
      
      res.json(JSON.parse(data));
  });
});

module.exports = router