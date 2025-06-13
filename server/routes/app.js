const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { platformDashboardCookieName, appTyps: {PLATFORM_DASHBOARD} } = require('../config/constant');
const { verifyOrRefreshToken } = require('../helper/jwt');

const requireAuth = process.env.REQUIRE_AUTH;

router.get('/health', (req, res) => {
    const buildPath = path.join(path.join(__dirname, '../../build', 'index.html'));
    res.status(200).json({
      status: 'UP',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      reactApp: fs.existsSync(buildPath) ? 'Reachable' : 'Not Reachable'
    });
});
  
  // Serve static files from the React app
router.use(express.static(path.join(__dirname, '../../build')));
  
  // All other routes (e.g., React routes). This should be the last endpoint
router.get('*', (req, res) => {

  const platformDashboardCookie = req.signedCookies[platformDashboardCookieName];
  const result = verifyOrRefreshToken(platformDashboardCookie);

  if (requireAuth === 'true' && !result.success) {
    const originalUrl = encodeURIComponent(req.originalUrl);
    return res.redirect(`/login?relayState=${PLATFORM_DASHBOARD}&returnTo=${originalUrl}`);
  }
  
  if (requireAuth !== 'true' || result.success) {
    res.sendFile(path.join(__dirname, '../../build', 'index.html'));
  }

});

module.exports = router