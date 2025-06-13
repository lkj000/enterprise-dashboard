// USAGE FILES
export const UsageFiles = {
  UserData: "./data-json/CopilotUsageData/CopilotUsageDataSummary.json",
  portfolio: "./data-json/CopilotUsageData_Portfolio/CopilotUsageDataTeamsSummary.json",
  vp: "./data-json/CopilotUsageData_VPs/CopilotUsageDataTeamsSummary.json",
  director: "./data-json/CopilotUsageData_Directors/CopilotUsageDataTeamsSummary.json",
  manager: "./data-json/CopilotUsageData_Managers/CopilotUsageDataTeamsSummary.json",

  // 90 DAYS REPORT
  UserData_90: "./data-json/CopilotUsageData_90days/CopilotUsageDataSummary.json",
  portfolio_90: "./data-json/CopilotUsageData_Portfolio_90days/CopilotUsageDataTeamsSummary.json",
  vp_90: "./data-json/CopilotUsageData_VPs_90days/CopilotUsageDataTeamsSummary.json",
  director_90: "./data-json/CopilotUsageData_Directors_90days/CopilotUsageDataTeamsSummary.json",
  manager_90: "./data-json/CopilotUsageData_Managers_90days/CopilotUsageDataTeamsSummary.json"
};

//--------------------------------------------------------------------------------------------------

// COPILOT TILES INFO
export const getUsageTileData = (data, usageDays) => {
  return [
    { title: "Current Licensed Seats", text: data?.['Current Licensed Seats'] ?? 0 },
    { title: "Date Range", text: data?.['Date Range'] ?? '-' },
    { title: "Total Suggestions Count", text: data?.['Total Suggestions Count'] ?? 0 },
    { title: "Total Acceptance Count", text: data?.['Total Acceptance Count'] ?? 0 },
    { title: "Acceptance Rate", text: data?.['Acceptance Rate'] ?? '0%' },
    { title: "Line of Code Suggested", text: data?.['Lines Of Code Suggested'] ?? 0 },
    { title: "Line of Code Accepted", text: data?.['Lines Of Code Accepted'] ?? 0 },
    { title: "Line Acceptance Rate", text: data?.['Lines Acceptance Rate'] ?? '0%' },
    {
      title: "Daily Average Engagement Per Resource",
      text: data?.['Current Licensed Seats'] === 0 ? 0
        : isNaN((data?.['Total Suggestions Count'] / (data?.['Current Licensed Seats'] ?? 1)) / parseInt(usageDays)) ? 0
        : ((data?.['Total Suggestions Count'] / (data?.['Current Licensed Seats'] ?? 1)) / parseInt(usageDays)).toFixed(2)
    }
  ];
};

// JIRA, GITHUB TILES INFO
export const getGithubTileData = (data, type) => [
  { title: "Total Assigned Tickets", text: data?.['totalIssues'] ?? 0 },
  { title: "Total PRs", text: data?.['totalPRs'] ?? 0 },
  { title: "Total Commits on PRs", text: data?.['totalCommits'] ?? 0 },
  ...(type === 'manager' ? [{ title: "Total Remaining Hours", text: (data?.['totRemainHrs'] ?? 0) + 'h' }] : [])
];