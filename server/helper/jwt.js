
const jwt = require('jsonwebtoken');
const { TokenGenerationError } = require('../error/custom');


const generateToken = (secret, userData, expiresIn = '1h') => {
    if (!userData || !userData.username) {
        throw new TokenGenerationError('Invalid user data: username is required');
    }

    const payload = {
        email: userData.username, //email ending with @safeway.com
        issuedAt: Date.now(),  
        type: 'access'          
    };

    const options = {
        expiresIn,         
        issuer: 'platform-dashboard',    
    };

    try {
        return jwt.sign(payload, secret, options);
    } catch (error) {
        throw new TokenGenerationError(`Token generation failed ${error.message}`);
    }
};


const jwtSecret = process.env.JWT_SECRET;
const isTokenValidRegardlessOfExpiration = (token) => {
try {
    jwt.verify(token, jwtSecret, { ignoreExpiration: true });
    return true;
} catch (error) {
    return false;
}
}

const isExpired = (exp) => {
    return exp && exp < Math.floor(Date.now() / 1000) ? true : false;
}

const verifyOrRefreshToken = (platformDashboardCookie) => {
    if (!platformDashboardCookie) {
      return { success: false, message: 'No session is provided' };
    }
  
    const accessToken = platformDashboardCookie.accessToken;
    const refreshToken = platformDashboardCookie.refreshToken;
  
    if (!accessToken) {
      return { success: false, message: 'No Access Token is provided' };
    }
  
    try {
      // Verify access token
      jwt.verify(accessToken, process.env.JWT_SECRET);
      return { success: true, message: 'Access token valid' };
    } catch (err) {
      // Try refresh token if access token expired
      if (err.name === 'TokenExpiredError' && refreshToken) {
        try {
          const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  
          const newAccessToken = generateToken(
            process.env.JWT_SECRET,
            { username: decoded.email },
            '1d'
          );
  
          return {
            success: true,
            message: 'Access token refreshed',
            newAccessToken,
            user: decoded
          };
        } catch (refreshErr) {
          return {
            success: false,
            message: 'Refresh Token is not valid'
          };
        }
      }
  
      return {
        success: false,
        message: 'No refresh token is provided or invalid access token'
      };
    }
  };  

module.exports = {
    generateToken,
    isTokenValidRegardlessOfExpiration,
    isExpired,
    verifyOrRefreshToken
};  