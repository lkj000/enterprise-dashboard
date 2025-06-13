const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const logsDir = path.join(__dirname, '../../logs');
const accessLogFile = path.join(logsDir, 'access.log');
const { sessionAndHeaderAuthMiddleware } = require('../middleware/auth-middleware');
const { platformDashboardCookieName } = require('../config/constant');
const logger = require('../config/logger');

if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

if (!fs.existsSync(accessLogFile)) {
  fs.writeFileSync(accessLogFile, '');
}

router.post('/log', sessionAndHeaderAuthMiddleware, (req, res) => {

  res.on('finish', () => {
    const responseTime = Date.now() - res.locals.startTime;
    const UserID = req.signedCookies[platformDashboardCookieName]?.userid;
    // const UserID = req.user?.userid;
    const bodyWithUserId = { ...req.body, UserID };
    const logEntry = Object.keys(bodyWithUserId).length > 0
      ? `${Object.entries(bodyWithUserId).map(([key, value]) => `${key}: ${value}`).join(', ')}, statusCode: ${res.statusCode}, responseTime: ${responseTime}ms\n`
      : `No request body, statusCode: ${res.statusCode}, responseTime: ${responseTime}ms\n`;

    fs.appendFile(accessLogFile, logEntry, (err) => {
      if (err) {
        logger.error(`Error writing to file: ${err}`);
        return res.status(500).send('Internal Server Error');
      }
    });
  });
  res.status(200).send('Log saved');
});
  
router.get('/log', sessionAndHeaderAuthMiddleware, (req, res) => {

  fs.readFile(accessLogFile, 'utf8', (err, data) => {
    if (err) {
      logger.error(`Error reading log file: ${err}`);
      return res.status(500).send('Internal Server Error');
    }
    const logData = data.trim().split('\n').map(line => {
      const item = Object.fromEntries(line.split(', ').map(part => part.split(': ')));
      if (item.Path && item.Path !== '/') {
        const { UserID, UserId, ...rest } = item;
        return {
          ...rest,
          Timestamp: new Date(item.Timestamp).toLocaleDateString("en-US", { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'UTC' }),
          Path: item.Path.split('/')[1],
          UserID: item.UserID || item.UserId,
        };
      }
      return null;
    }).filter(item => item !== null);
    res.json(logData);
  });
});

module.exports = router
