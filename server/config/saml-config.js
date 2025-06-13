const fs = require('fs');
const defaultSamlData = require('../data/default-dashboard-sso-saml-data.json');
const logger = require('./logger');

let samlConfig; 
const defaultSamlConfig = {
    callbackUrl: defaultSamlData.callbackUrl || process.env.AZ_CALLBACK_PATH,
    tenantId: defaultSamlData.tenantId || process.env.AZ_TENANT_ID,
    issuer: defaultSamlData.issuer || process.env.AZ_ISSUER,
    cert: defaultSamlData.cert || process.env.AZ_CERT
};

const propsFile = (process.env.SAML_ENV_PROPS_PATH || '.') +  '/dashboard-sso-saml-data.json';
try {
    const samlData = fs.readFileSync(propsFile);
    logger.info(`Reading data from ${propsFile}`);
    const props = JSON.parse(samlData);
    samlConfig = {
        callbackUrl: props.callbackUrl || defaultSamlConfig.callbackUrl,
        tenantId: props.tenantId || defaultSamlConfig.tenantId,
        issuer: props.issuer || defaultSamlConfig.issuer,
        cert: props.cert || defaultSamlConfig.cert
    };
}
catch (e) {
    logger.error(`Error reading ${propsFile}, setting default values.`);
    samlConfig = defaultSamlConfig;
}

logger.info(`Issuer is ${samlConfig.issuer}`);

module.exports = samlConfig;