const buildFolder = '../../build';
const dataJsonFolder = `${buildFolder}/data-json`;
const splittedFileFolder = `${buildFolder}/splitted_files`;
const splittedJiraFilesFolder = `${splittedFileFolder}/jira`;
const splittedJiraFilenamePrefix = 'JiraIssueData';
const numberOfJiraFiles = 20;
const splittedAppCodeContributionDataFilenamePrefix = 'AppCodeContributionData';
const splittedUserContributionDataFilenamePrefix = 'UserContributionData';
const splittedGitHubFilesFolder = `${splittedFileFolder}/github`;
const numberOfGitHubActivityFiles = 7;

const httpStatus = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORISED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
    INVALID_SESSION: 440,
}
const platformDashboardCookieName = "platform-dashboard";

const cookieProps = {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    signed: true,
    sameSite: 'Lax',
    maxAge: 1000 * 60 * 60 * 24 * 8,
  };

const appTyps = {
    PLATFORM_DASHBOARD: 'platform-dashboard',
    ADA_VSCODE_EXTENSION: 'ada-extension',
}

module.exports = { 
    dataJsonFolder, 
    splittedFileFolder, 
    splittedJiraFilesFolder, 
    splittedJiraFilenamePrefix, 
    splittedAppCodeContributionDataFilenamePrefix,
    splittedUserContributionDataFilenamePrefix,
    splittedGitHubFilesFolder,
    numberOfGitHubActivityFiles,
    numberOfJiraFiles ,
    httpStatus,
    platformDashboardCookieName,
    cookieProps, 
    appTyps,
};
