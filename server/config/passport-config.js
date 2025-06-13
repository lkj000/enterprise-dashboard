const samlConfig = require('../config/saml-config');
const SamlStrategy = require('passport-saml').Strategy;
const {generateToken} = require('../helper/jwt');
const logger = require('./logger');

const callbackPath = samlConfig.callbackUrl;
const tenantId = samlConfig.tenantId;
const issuer = samlConfig.issuer;
const cert = samlConfig.cert;
const jwtSecret = process.env.JWT_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

const port = process.env.PORT || 3000; 
const nodeDevelopmentServerUrl = `http://localhost:${port}`;
const isDevelopmentEnv = process.env.NODE_ENV === 'development';

module.exports = function(passport) {
    const getFirstLetter = (str) => (str && str.length > 0 ? str.charAt(0) : '');
    // TODO: Need to change the name of the REACT_SERVER_URL variable. It should be something like node server.
    const host = isDevelopmentEnv ? nodeDevelopmentServerUrl : process.env.REACT_SERVER_URL;
    const strategy = new SamlStrategy({
    callbackUrl: host + callbackPath,
    entryPoint: `https://login.microsoftonline.com/${tenantId}/saml2`, 
    issuer: issuer, 
    cert: cert,
    },
    async function(profile, done) {
        const data = {};
        data.givenname = profile['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname'];
        data.surname = profile['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname'];
        data.email = profile['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress']; // eamil ending with @albertsons.com
        data.username = profile['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']; // email ending with @safeway.com
        data.userid = profile['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/uid'];
        data.shortname = getFirstLetter(data.givenname) + getFirstLetter(data.surname);

        try {
            // Generate JWT token with 1 day expiration by default
            data.accessToken = generateToken(jwtSecret, data, '1d');
            // Generate refresh token with 7 days expiration
            data.refreshToken = generateToken(refreshTokenSecret, data, '7d'); 
        }
        catch (error) {
            data.accessToken = '';
            data.refreshToken = '';
            logger.error(error.message);
        }

        return done(null, data);
    }); 

    // Configure Passport to use SAML
    passport.use(strategy);

    passport.serializeUser((user, done) => {
    done(null, user);
    });

    passport.deserializeUser((obj, done) => {
    done(null, obj)
    });
}