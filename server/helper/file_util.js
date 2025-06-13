const fs = require('fs');
const path = require('path');
const logger = require('../config/logger.js');
const { dataJsonFolder, 
    splittedFileFolder, 
    splittedJiraFilesFolder, 
    numberOfJiraFiles,
    splittedJiraFilenamePrefix,
    splittedAppCodeContributionDataFilenamePrefix,
    splittedUserContributionDataFilenamePrefix,
    splittedGitHubFilesFolder,
    numberOfGitHubActivityFiles 
} = require('../config/constant.js');


const splitIntoSubArrays = (jsonArray, numberOfSubArrays) => {
    const subArrayLength = Math.ceil(jsonArray.length / numberOfSubArrays);
    const subArrays = [];

    for (let i = 0; i < numberOfSubArrays; i++) {
        const start = i * subArrayLength;
        const end = start + subArrayLength;
        const subArray = jsonArray.slice(start, end);
        subArrays.push(subArray);
    }
    return subArrays;
}

async function writeJson(dataArray, folder, fileName) {
    const tempJiraDir = path.join(__dirname, folder);
    if (!fs.existsSync(tempJiraDir)) {
        fs.mkdirSync(tempJiraDir);
    }

    // Write each sub-array to a separate file
    const writePromises = dataArray.map((data, index) => {
        const filePath = path.join(__dirname, `${folder}/${fileName}${index + 1}.json`);
        return fs.promises.writeFile(filePath, JSON.stringify(data, null, 2));
    });

    try {
        await Promise.all(writePromises);
        logger.info(`${fileName} files created and stored to folder ${folder}`);
    } catch (err) {
        logger.info(`${fileName} files creation failed: ${JSON.stringify(err, null, 2)}`);
    }
}

async function readFiles(filePaths) {
    const promises = filePaths.map(filePath => fs.promises.readFile(filePath, 'utf-8'));
    const fileContents = await Promise.all(promises);
    return fileContents.map(content => JSON.parse(content));
}

const fetchGitHubContributionData = async () => {
    const filePaths = [
        path.join(__dirname, `${dataJsonFolder}/userContributionHistory.json`),
        path.join(__dirname, `${dataJsonFolder}/appCodeContributionData.json`)
    ];

    let [userData, repoData] = await readFiles(filePaths);

    let repoIndex = 0, repoLastUpdate = repoData?.update_date ?? '';
    repoData = repoData.data.flatMap(repo => 
        repo.total_user_appcode_commits.map(commit => {
          const { total_user_appcode_commits, ...rest } = repo;
          return {
            index: ++repoIndex,
            ...rest,
            ...commit
          };
        })
      );

    return { userData, repoData, repoLastUpdate };
}

const splitGitHubContributionsData = async () => {
    const dir = path.join(__dirname, splittedFileFolder);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    const { userData, repoData, repoLastUpdate } = await fetchGitHubContributionData();

    let userSubArrays = splitIntoSubArrays(userData.user_data, numberOfGitHubActivityFiles);
    // Make an object with from date and til date along with each sub array
    userSubArrays = userSubArrays.map((subArray) => {
        return {
            from_date: userData.from_date,
            til_date: userData.til_date,
            data: subArray
        }
    });

    let repoSubArrays = splitIntoSubArrays(repoData, numberOfGitHubActivityFiles);
    repoSubArrays = repoSubArrays.map((subArray) => {
        return {
            update_date: repoLastUpdate,
            data: subArray
        }
    });

    await writeJson(userSubArrays, splittedGitHubFilesFolder, splittedUserContributionDataFilenamePrefix);
    await writeJson(repoSubArrays, splittedGitHubFilesFolder, splittedAppCodeContributionDataFilenamePrefix);
    logger.info('GitHub contribution data split into files successfully.');
}

const fetchJiraData = async () => {     
    const filePaths = [
        path.join(__dirname, `${dataJsonFolder}/jiraUsersActivity.json`),
        path.join(__dirname, `${dataJsonFolder}/jiraIssuesList.json`)
    ];

    const [userResponse, issueResponse] = await readFiles(filePaths);
    let userLastUpdate = userResponse?.update_date ?? '';

    const issueMap = issueResponse.reduce((issueArray, data) => {
        const userId = data.userid.toLowerCase();
        if (!issueArray[userId]) {
            issueArray[userId] = [];
        }
        issueArray[userId].push(data.issues);
        return issueArray;
    }, {});

    const userData = userResponse.data.map((item) => {
        const weeklyData = Array.from({length: 11}, (_, i) => item[`week${i+1}`]);
        return {
            ...item,
            weeklyData,
            issues: issueMap[item.userid.toLowerCase()][0] || [],
        }
    });

    return { userData, userLastUpdate };
};

const splitJiraFile = async () => {
    const dir = path.join(__dirname, splittedFileFolder);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    // Jira file
    const { userData, userLastUpdate } = await fetchJiraData();
    let subJiraArrays = splitIntoSubArrays(userData, numberOfJiraFiles);
    subJiraArrays = subJiraArrays.map((subArray) => {
        return {
            update_date: userLastUpdate,
            data: subArray
        }
    });
    await writeJson(subJiraArrays, splittedJiraFilesFolder, splittedJiraFilenamePrefix);
    logger.info(`Jira data split into ${numberOfJiraFiles} files successfully.`);
}

const splitLargeFiles = async () => {
    await splitJiraFile();
    await splitGitHubContributionsData();
    // Other large files
}

const appendJson = async (filePath, data) => {
    try {
      const jsonString = JSON.stringify(data) + "\n"; // Newline for append-only format
      await fs.promises.appendFile(filePath, jsonString);
    } catch (error) {
      logger.error(`Error writing to file: ${error}`);
      throw error; // Ensure errors are handled properly
    }
  };

module.exports = { splitLargeFiles, appendJson, readFiles };

