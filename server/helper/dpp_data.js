const { readFiles } = require('./file_util');
const path = require('path');
const buildFolder = '../../build';
const dataJsonFolder = `${buildFolder}/data-json`;

// FILES (DPP)
const DPPFilePaths = [
  `${dataJsonFolder}/developer-productivity/developer-productivity-metrics.json`,
  `${dataJsonFolder}/developer-productivity/developer-productivity.json`
];

// FUNCTION TO BIND DPP DATA
const getBindDPPData = (userResponse, issueResponse) => {
  // MAP THE ISSUES (BASED ON USERID)
  const issueMap = issueResponse.reduce((issueArray, data) => {
    const userId = data.userid.toLowerCase();
    if (!issueArray[userId]) {
      issueArray[userId] = [];
    };
    issueArray[userId].push(data.issues);
    return issueArray;
  }, {});

  // MAP ISSUES TO MAIN TABLE
  return userResponse.map((item) => ({
    ...item,
    issues: issueMap[item.userid.toLowerCase()]?.[0] || [],
  }));
};

// FUNCTION TO FETCH DPP DATA
const fetchDPPData = async () => {
  const filePaths = DPPFilePaths.map((filePath) => path.join(__dirname, filePath));
  let [ userData, issueData ] = await readFiles(filePaths);
  return getBindDPPData(userData, issueData);
};

module.exports = { fetchDPPData };