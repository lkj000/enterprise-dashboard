const { httpStatus, platformDashboardCookieName, cookieProps } = require('../config/constant');
const requireAuth = process.env.REQUIRE_AUTH;
const { verifyOrRefreshToken } = require('../helper/jwt');


const sessionAndHeaderAuthMiddleware = (req, res, next) => {

    if (!req.headers['x-ui-access'] || req.headers['x-ui-access'] !== 'true') {
      return res.status(httpStatus.FORBIDDEN).send('Forbidden');
    }
    
    if (requireAuth !== 'true') {
        console.log('Skipping authentication as it is not required');
        return next();
    }

    const platformDashboardCookie = req.signedCookies[platformDashboardCookieName];

    const result = verifyOrRefreshToken(platformDashboardCookie);

    if (!result.success) {
      return res.status(httpStatus.INVALID_SESSION).send(result.message);
    }

    // If refreshed, set new cookie
    if (result.newAccessToken) {
      const newCookie = { ...platformDashboardCookie, accessToken: result.newAccessToken };
      res.cookie(platformDashboardCookieName, newCookie, cookieProps);
    }

    next();

  };

module.exports = {
  sessionAndHeaderAuthMiddleware
};

