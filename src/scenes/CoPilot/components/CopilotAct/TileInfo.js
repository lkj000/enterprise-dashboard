export const Tab1TileFiles = {
  enterprise_summary: "./data-json/copilot_info/copilot_enterprise_summary.json",
  port_summary: "./data-json/copilot_info/copilot_portfolios_summary.json",
  vp_summary: "./data-json/copilot_info/copilot_vps_summary.json",
  dir_summary: "/data-json/copilot_info/copilot_directors_summary.json",
  manager_summary: "./data-json/copilot_info/copilot_managers_summary.json"
};
  
export const getTab1TileFiles = (allData) => {
  return {
    "common": allData?.["enterprise_summary"] || [],
    "portfolio": allData?.["port_summary"] || [],
    "vp": allData?.["vp_summary"] || [],
    "director": allData?.["dir_summary"] || [],
    "manager": allData?.["manager_summary"] || []
  };
};

//-------------------------------------------------------------------------------------

// GET TILE DATA
const getTileName = (TileData, key) => {
  if (key === "common") {
    return TileData[key] || [];
  } else {
    const filteredTiles = TileData[key[0]].filter(item => item[key[0]] === key[1]);
    return filteredTiles[0] || [];
  }
};
  
export const getTileData = (TileData, item) => {
  const data = getTileName(TileData, item);
  return [
    {  title: "Total Users", text: data?.users_count ?? 0  },
    {  title: "No. of Users with License", text: data?.users_with_license ?? 0  },
    {  title: "No. of Users without License", text: data?.users_without_license ?? 0 },
    {  title: "No. of Active Users", text: data?.active_users ?? 0 },
    {  title: "No. of Active Users (1 to 5 Days)", text: data?.active_users_1_5_days ?? 0 },
    {  title: "No. of Active Users (6 to 10 Days)", text: data?.active_users_6_10_days ?? 0 },
    {  title: "No. of Active Users (> 10 Days)", text: data?.active_users_more_than_10_days ?? 0 },
    {  title: "No. of Inactive Users with License", text: data?.inactive_users_with_license ?? 0 },
    {  title: "No. of Users without any Commits in Last 30 Days", text: data?.users_without_commits_last_30_days ?? 0 },
    {  title: "No. of Users without any Contribution in Last 30 Days", text: data?.users_without_contribution_last_30_days ?? 0 }
  ];
};