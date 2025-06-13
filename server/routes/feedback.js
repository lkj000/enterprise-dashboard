const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const dashboardDir = path.join(__dirname, '../../dashboard_data');
const feedbackFile = path.join(dashboardDir, 'feedback.txt');
const { sessionAndHeaderAuthMiddleware } = require('../middleware/auth-middleware');
const logger = require('../config/logger');
const { appendJson } = require('../helper/file_util');
const { findSourceMap } = require('module');

if (!fs.existsSync(dashboardDir)) {
  fs.mkdirSync(dashboardDir);
}

if (!fs.existsSync(feedbackFile)) {
  fs.writeFileSync(feedbackFile, '');
}

router.post("/feedback", sessionAndHeaderAuthMiddleware, async (req, res) => {
    const userid = req.user?.userid;
    const fullname = `${req.user?.givenname} ${req.user?.surname}`
    const payload = { userid, fullname, ...req.body }
  
    if (!payload || Object.keys(payload).length === 0) {
      return res.status(400).send("Bad Request: No payload provided");
    }
  
    try {
      await appendJson(feedbackFile, payload);
      res.status(200).send("Feedback saved successfully");
    } catch (error) {
      logger.error(`Error logging feedback: ${error}`);
      res.status(500).send(`Feedback is not saved due to error ${error}`);
    }
  });


router.get("/feedback", sessionAndHeaderAuthMiddleware, async (req, res) => {
  try {
    // Read file content
    const data = await fs.promises.readFile(feedbackFile, "utf8");

    if (!data.trim()) {
      return res.json([]);
    }

    // Split lines and parse each line as JSON
    const feedbackArray = data
      .trim()
      .split("\n")
      .map((line) => JSON.parse(line));

    res.json(feedbackArray);
  } catch (error) {
    logger.error(`Error reading feedback file: ${error}`);
    res.status(500).send("Error retrieving feedback data");
  }
});

  module.exports = router;