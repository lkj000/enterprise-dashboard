const axios = require('axios');
const { KeycloakError } = require('../error/custom');

const KEYCLOAK_URL = process.env.KEYCLOAK_URL; 
const USERNAME = process.env.KEYCLOAK_USERNAME;
const PASSWORD = process.env.KEYCLOAK_PASSWORD;
const REALM = 'platform-dashboard'; 
const GRANT_TYPE = 'password';
const CLIENT_ID = 'admin-cli'; 


const getAccessToken = async () => {
    const data = new URLSearchParams();
    data.append('username', USERNAME);
    data.append('password', PASSWORD);
    data.append('grant_type', GRANT_TYPE);
    data.append('client_id', CLIENT_ID);

  const response = await axios.post(`${KEYCLOAK_URL}/realms/${REALM}/protocol/openid-connect/token`, data.toString(), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  return response.data.access_token;
};


const getUserGroupsByEmail = async (email) => {

    if (!email) {
      throw new Error('Email is required');
    }

    try {
      const token = await getAccessToken();
      const { data } = await axios.get(`${KEYCLOAK_URL}/admin/realms/${REALM}/users`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { email: email },
      });
      const user = data.length > 0 ? data[0] : null;

      if (!user) {
        return [];
      }

      const groups = user ? await getUserGroups(token, user.id) : [];
      const groupNames = groups.map((group) => group.name);
      return groupNames;
    } catch (error) {
      throw new KeycloakError(`Failed to retrieve user:, 
      ${error.response ? JSON.stringify(error.response.data) : error.message}`);
    }
  };


  const getUserGroups = async (token, userId) => {
    try {
      const { data } = await axios.get(`${KEYCLOAK_URL}/admin/realms/${REALM}/users/${userId}/groups`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    } catch (error) {
      throw new KeycloakError(`Failed to retrieve user groups for email: ${email}, 
      ${error.response ? JSON.stringify(error.response.data) : error.message}`);
    }
  };

module.exports = { getUserGroupsByEmail };
