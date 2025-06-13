import axios from 'axios';
import { Box, Chip } from '@mui/material';
import  { TableFilterList } from "mui-datatables";

export const HttpStatusCodes = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  SESSION_EXPIRED: 440,
};

// ADDING CHIP (TABLE) - LAST UPDATED ON
export const LastUpdatedOnComponent = ({ props, date }) => {
  return (
    <Box display="flex" justifyContent='space-between' alignItems='center'>
      <TableFilterList {...props} />
      <Box display="flex" flexWrap="nowrap" justifyContent="flex-end">
        <Chip label={`Last Updated On: ${date}`} color="secondary" variant="outlined" sx={{ fontSize: '12px', marginTop: '-15px', marginBottom: '8px', marginRight: '10px' }} />
      </Box>
    </Box>
  )
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
};

export const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export const calTotalValue = (data, key) => {
  return data.reduce((total, item) => total + Number(item[key]), 0);
};

export const getSortDataForDropdown = (data, properties) => {
  const result = {};
  properties.forEach(property => {
    result[property] = data.flat()
      .map(item => item[property] !== "Not Available" ? item[property] : null)
      .filter(Boolean)
      .reduce((acc, i) => acc.includes(i) ? acc : [...acc, i], [])
      .sort();
  });
  return result;
};

// Helper function to check if a value is valid (not null, empty string, or "Not Available")
export const isValidValue = (value) => {
  return value !== null && value !== '' && value !== 'Not Available';
};

export const set1DataFilter = (inputData, filterBy, filterValue, property) => {
  return [...new Set(inputData.filter(item => item[filterBy] === filterValue && isValidValue(item[property])).map(item => item[property]))].sort();
};

export const set2DataFilter = (inputData, filterBy1, filterValue1, filterBy2, filterValue2, property) => {
  return [...new Set(inputData.filter(item => item[filterBy1] === filterValue1 && item[filterBy2] === filterValue2 && isValidValue(item[property])).map(item => item[property]))].sort();
};

export const set3DataFilter = (inputData, filterBy1, filterValue1, filterBy2, filterValue2, filterBy3, filterValue3, property) => {
  return [...new Set(inputData.filter(item => item[filterBy1] === filterValue1 && item[filterBy2] === filterValue2 && item[filterBy3] === filterValue3 && isValidValue(item[property])).map(item => item[property]))].sort();
};

export const set4DataFilter = (inputData, filterBy1, filterValue1, filterBy2, filterValue2, filterBy3, filterValue3, filterBy4, filterValue4, property) => {
  return [...new Set(inputData.filter(item => item[filterBy1] === filterValue1 && item[filterBy2] === filterValue2 && item[filterBy3] === filterValue3 && item[filterBy4] === filterValue4 && isValidValue(item[property])).map(item => item[property]))].sort();
};

export const handleDropdownFilter = (filterData) => {
  const activeFilters = Object.entries(filterData).filter(([_, value]) => value !== 'All' && value);
  if (activeFilters.length > 0) {
    const args = activeFilters.flatMap(([key, value]) => [key, value]);
    const functionName = `set${activeFilters.length}DataFilter`;
    return [args, functionName];
  }
  return [[], ''];
};

export const handleOrderSort = (property, orderBy, order) => {
  let newOrder = 'asc';
  if (property === orderBy && order === 'asc') {
    newOrder = 'desc';
  } else if (property === orderBy && order === 'desc') {
    newOrder = 'normal';
  }
  return newOrder;
};

export const compareDates = (a, b, order) => {
  if (a === null) return 1;
  if (b === null) return -1;
  return order === 'asc' ? new Date(a) - new Date(b) : new Date(b) - new Date(a);
};

export const compareHours = (a, b, order) => {
  if (a === null) return 1;
  if (b === null) return -1;
  const aHours = parseInt(a.replace('h', ''), 10);
  const bHours = parseInt(b.replace('h', ''), 10);
  return order === 'asc' ? aHours - bHours : bHours - aHours;
};

export const compareLeadTime = (a, b, order) => {
  if (a === null) return 1;
  if (b === null) return -1;
  const aHours = a.split('d').reduce((acc, time, i) => acc + parseInt(time) * (i === 0 ? 24 : 1), 0);
  const bHours = b.split('d').reduce((acc, time, i) => acc + parseInt(time) * (i === 0 ? 24 : 1), 0);
  return order === 'asc' ? aHours - bHours : bHours - aHours;
};

export const isMatch = (value, searchText) => {
  if (Array.isArray(value)) {
    return value.some(arrayItem => isMatch(arrayItem, searchText));
  } else if (typeof value === 'object' && value !== null) {
    return Object.values(value).some(innerValue => isMatch(innerValue, searchText));
  } else {
    return String(value).toLowerCase().startsWith(searchText.toLowerCase());
  }
};

export const generateColor = () => {
  const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
  return `${randomColor}`;
};

export const formatNumber = num => {
  const formatted = num.toFixed(1)
  if (Number.isInteger(num)) {
    return num;
  }
  return formatted;
}

export const validateKeyValueStringFormat = input => {
  const regex = /^.+:\s*.+(,\s*.+:\s*.+)*,?$/;
  return regex.test(input);
}

// In development mode, express server and react server are run on different ports.
// That's why express server url is given to react app to communicate with express server for SSO etc.
// In production mode, react app is served from express server and express server url is not required.
export const getExpressServerUrl = () => {
  return process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : '';
}

const headers = {
  'Content-Type': 'application/json',
  'x-ui-access': 'true',
};

const defaultCatchHandler = (e, cb) => {
  cb(e);
}

const validateStatus = status => status >= 200 && status <= 500 && status !== HttpStatusCodes.SESSION_EXPIRED;
export const callExpressServerEndpoint = (
  method,
  uri,
  data,
  constFunction,
  additionalHeaders = {},
  catchHandler = defaultCatchHandler,
  additionalConfig = {}
) => {

  let expressServerUrl = getExpressServerUrl();

  const internalCatchHandler = (error) => {
    console.error(`Error calling ${uri} endpoint:`, error);
    const status = error.response?.status;
    loginIfUnauthorized(status);
  };

  const config = {
    method: method,
    url: `${expressServerUrl}/${uri}`,
    withCredentials: true,
    validateStatus: validateStatus,
    headers: {
      ...headers,
      ...additionalHeaders
    },
    ...additionalConfig
  };

  if ((method === 'POST' || method === 'PUT') && data) {
    config.data = data;
  }

  axios(config)
    .then(constFunction)
    .catch((e) => { 
      const handler = typeof catchHandler === 'function' ? catchHandler : defaultCatchHandler;
      handler(e, internalCatchHandler);
    });
}

export const callExpressServerEndpointSync = async (method, uri, data={}, additionalHeaders={}) => {

  let expressServerUrl = getExpressServerUrl();

  const config = {
    method: method,
    url: `${expressServerUrl}/${uri}`,
    withCredentials: true,
    validateStatus: validateStatus,
    headers: {
      ...headers,
      ...additionalHeaders
    }
  };

  if ((method === 'POST' || method === 'PUT') && data) {
    config.data = data;
  }

  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    const status = error.response?.status;
    const errorMessage = status === HttpStatusCodes.SESSION_EXPIRED 
      ? 'Session expired, Logging in again' 
      : error.response?.data?.message || error.message;
  
    loginIfUnauthorized(status);
  
    throw new Error(axios.isAxiosError(error) ? errorMessage : 'An unexpected error occurred');
  }
}

const loginIfUnauthorized = status => {
  if (status === HttpStatusCodes.SESSION_EXPIRED) {
    window.location.href = `${getExpressServerUrl()}/login`;
  }
}

export const isTokenExpired = token => {
  if (!token || typeof token !== 'string') {
    return false;
  }

  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return false;
    }

    const payloadBase64 = parts[1];

    const decodedPayload = JSON.parse(atob(payloadBase64));

    if (!decodedPayload.exp || typeof decodedPayload.exp !== 'number') {
      return false;
    }

    const currentTime = Math.floor(Date.now() / 1000);

    return decodedPayload.exp < currentTime;

  } catch (error) {
    console.error('Error decoding token or checking expiration:', error);
    return false;
  }
};

export const getToken = async () => {
  const token = localStorage.getItem('token');
  if (isTokenExpired(token)) {
    try {

      const response = await callExpressServerEndpointSync('POST', 'regenerateToken', { expiredToken: token });

      if (response.status === HttpStatusCodes.OK) {
        const newToken = response.data.token;
        localStorage.setItem('token', newToken);
        return newToken;
      }
      else {
        console.error('Error regenerating token:', response.data.error);
        return token;
      }
    }
    catch (error) {
      console.error('Error regenerating token:', error.message);
      return token;
    }
  }

  return token;
}


// FUNCTION TO FETCH ALL FILES DATA (PUBLIC)
export const getFileList = async (files, funcData) => {
  const fetchAllData = {};
  const filePromises = Object.keys(files).map(async (name) => {
    try {
      const response = await fetch(files[name]);
      if (!response.ok) {
        fetchAllData[name] = [];
      }
      const jsonData = await response.json();
      fetchAllData[name] = funcData ? funcData(jsonData) : jsonData;
    } catch (error) {
      fetchAllData[name] = [];
      console.error(`Error fetching ${files[name]}:`, error);
    }
  });
  await Promise.all(filePromises);
  return fetchAllData;
};