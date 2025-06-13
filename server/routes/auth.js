const express = require('express');
const router = express.Router();
const passport = require('passport');
const path = require('path');
const samlConfig = require('../config/saml-config');
const {generateToken, isTokenValidRegardlessOfExpiration } = require('../helper/jwt');
const logger = require('../config/logger');
const {getUserGroupsByEmail} = require('../helper/keycloak');
const { sessionAndHeaderAuthMiddleware } = require('../middleware/auth-middleware');
const { platformDashboardCookieName, cookieProps, appTyps: {PLATFORM_DASHBOARD, ADA_VSCODE_EXTENSION} } = require('../config/constant');

const callbackPath = samlConfig.callbackUrl;
const reactDevelopmentServerUrl = 'http://localhost:3000';
const isDevelopmentEnv = process.env.NODE_ENV === 'development';
const reactServerUrl = isDevelopmentEnv ? reactDevelopmentServerUrl : '';
const requireAuth = process.env.REQUIRE_AUTH;
const vscodeExtensionCallbackUrl = 'vscode://albertsons.ada/callback';
const sessionMaxAge = 24 * 60 * 60 * 1000; 

router.get('/login', (req, res) => {
  const returnTo = req.query.returnTo || '/Home';
  const appType = req.query.relayState || PLATFORM_DASHBOARD;

  passport.authenticate('saml', {
    additionalParams: {
      RelayState: JSON.stringify({
        appType,
        returnTo,
      }),
    }
  })(req, res);
});

// Route for callback
router.post(callbackPath,
  passport.authenticate('saml', { failureRedirect: '/', session: false }),
  (req, res) => {
    let redirectUrl = `${reactServerUrl}/Home`; // Default redirect URL

    try {
      const relayState = req.body?.RelayState ? JSON.parse(req.body.RelayState) : {};
      if (relayState.appType === ADA_VSCODE_EXTENSION) {
      redirectUrl = `${reactServerUrl}/ada/authorize`;
      } else if (relayState.returnTo) {
      redirectUrl = `${reactServerUrl}${relayState.returnTo}`;
      }
    } catch (error) {
      logger.error('Failed to parse RelayState:', error.message);
      return res.status(400).send('Invalid RelayState');
    }

    res.cookie(platformDashboardCookieName, req.user, cookieProps);
    res.redirect(redirectUrl);
    //res.sendFile(path.join(__dirname, '../../build', 'index.html'));
});

router.get('/ada/authorize', (req, res) => {
  let redirectUrl = `/login?relayState=${ADA_VSCODE_EXTENSION}`;
  if (req.isAuthenticated()) {
    const data = encodeURIComponent(Buffer.from(
      JSON.stringify({
        session: req.headers.cookie,
        sessionExpires: Date.now() + sessionMaxAge,
        jwtToken: generateToken(req.user, '30d')
      })
    ).toString("base64"));
    redirectUrl = `${vscodeExtensionCallbackUrl}?data=${data}`;
  }
  res.redirect(redirectUrl);
});

router.get('/accessToken', sessionAndHeaderAuthMiddleware, async (req, res) => {
  const accessToken = req.signedCookies[cookieName]?.accessToken;
  if (!accessToken) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  return res.json({ accessToken });
});

router.get('/user', sessionAndHeaderAuthMiddleware, async (req, res) => {
  // If authentication is not required, return default user data
  if (requireAuth === 'false') {
    return res.json({
      userData: {
        givenname: '',
        surname: '',
        username: '',
        userid: '',
        shortname: '',
        groups: []
      }
    });
  }

  const { givenname, surname, username, userid, shortname } = req.signedCookies['platform-dashboard'] || {};
  let groups = [];

  try {
    logger.info(`Getting user groups for user: ${username}`);
    groups = await getUserGroupsByEmail(username);
  } catch (error) {
    logger.error(error.message);
  }

  res.json({
    userData: {
      givenname: givenname || '',
      surname: surname || '',
      username: username || '',
      userid: userid || '',
      shortname: shortname || '',
      groups
    }
  });
});

router.post('/regenerateToken', sessionAndHeaderAuthMiddleware, (req, res) => {
  const expiredToken = req.body.expiredToken;

  const isValid = isTokenValidRegardlessOfExpiration(expiredToken);

  if (!isValid) {
    res.status(400).json({error: 'Old token is invalid'});
  }

  try {
    res.json({token: generateToken(req.user)});
  }
  catch (error) {
    res.status(500).json({error: 'Token generation failed ' + error.message});
  }
  
});

module.exports = router
