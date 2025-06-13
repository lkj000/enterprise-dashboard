import { getUsageTileData, getGithubTileData } from "./TilesInput";

// GET GITHUB AGGREGATED DATA
const getAggGithubData = (data) => {
  const totalIssues = data.reduce((sum, item) => sum + (item["total_issues"] || 0), 0);
  const totalPRs = data.reduce((sum, item) => sum + (item["total_pr_count"] || 0), 0);
  const totalCommits = data.reduce((sum, item) => sum + (item["total_commits_in_prs_count"] || 0), 0);
  const totalRemainHrs = data.reduce((sum, item) => {
    const hours = parseInt(item["total_remaining_estimate"]?.replace(/h$/, ""), 10) || 0;
    return sum + hours;
  }, 0);

  return {
    totalIssues: totalIssues,
    totalPRs: totalPRs,
    totalCommits: totalCommits,
    totRemainHrs: totalRemainHrs
  };
};

//-------------------------------------------------------------------------------------------------------


// TILES DATA
export const getTilesData = (inputData, allData, usageDays, key) => {
  const suffix = usageDays === "90" ? "_90" : "";
  const isCommon = key === "common";
  const dataKey = isCommon ? `UserData${suffix}` : key[0] + suffix;
  const data = isCommon ? allData[dataKey] : allData[dataKey]?.find(item => item["Team Slug"] === key[1]) || {};
  const copilotFilter = isCommon ? inputData : inputData.filter(item => item[key[0]] === key[1]);

  return [
    { [`Copilot (Activity in last ${usageDays} days)`]: getUsageTileData(data, usageDays) },
    { "Jira & GitHub (Activity in last 90 days)": getGithubTileData(getAggGithubData(copilotFilter), key[0]) }
  ];
};