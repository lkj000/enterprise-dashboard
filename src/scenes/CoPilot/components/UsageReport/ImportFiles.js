export const Tab2AllFiles = {
// COMMON REPORT TYPES (DAILY, MID-MONTH, MONTHLY)
  UserData: "./data-json/CopilotUsageData/CopilotUsageDataSummary.json",
  DataDaySummary: "./data-json/CopilotUsageData/CopilotUsageDataDaySummary.json",
  EngagedUsersSummary: "./data-json/CopilotUsageData/CopilotUsageDataDayEngagedUsersSummary.json",
  LanguageSummary: "./data-json/CopilotUsageData/CopilotUsageDataLanguageSummary.json",

  UserData_Mid: "./data-json/CopilotUsageData_MidMonth/CopilotUsageDataSummary_MidMonth.json",
  DataDaySummary_Mid: "./data-json/CopilotUsageData_MidMonth/CopilotUsageDataDaySummary_MidMonth.json",
  EngagedUsersSummary_Mid: "./data-json/CopilotUsageData_MidMonth/CopilotUsageDataDayEngagedUsersSummary_MidMonth.json",
  LanguageSummary_Mid: "./data-json/CopilotUsageData_MidMonth/CopilotUsageDataLanguageSummary_MidMonth.json",

  UserData_Month: "./data-json/CopilotUsageData_Monthly/CopilotUsageDataSummary_Monthly.json",
  DataDaySummary_Month: "./data-json/CopilotUsageData_Monthly/CopilotUsageDataDaySummary_Monthly.json",
  EngagedUsersSummary_Month: "./data-json/CopilotUsageData_Monthly/CopilotUsageDataDayEngagedUsersSummary_Monthly.json",
  LanguageSummary_Month: "./data-json/CopilotUsageData_Monthly/CopilotUsageDataLanguageSummary_Monthly.json",
 
  // PORTFOLIO BASED
  UserData_Port: "./data-json/CopilotUsageData_Portfolio/CopilotUsageDataTeamsSummary.json",
  DataDaySummary_Port: "./data-json/CopilotUsageData_Portfolio/CopilotUsageDataTeamsDaySummary.json",
  EngagedUsersSummary_Port: "./data-json/CopilotUsageData_Portfolio/CopilotUsageDataTeamsDayEngagedUsersSummary.json",
  LanguageSummary_Port: "./data-json/CopilotUsageData_Portfolio/CopilotUsageDataTeamsLanguageSummary.json",
  
  // VP BASED
  UserData_VP: "./data-json/CopilotUsageData_VPs/CopilotUsageDataTeamsSummary.json",
  DataDaySummary_VP: "./data-json/CopilotUsageData_VPs/CopilotUsageDataTeamsDaySummary.json",
  EngagedUsersSummary_VP: "./data-json/CopilotUsageData_VPs/CopilotUsageDataTeamsDayEngagedUsersSummary.json",
  LanguageSummary_VP: "./data-json/CopilotUsageData_VPs/CopilotUsageDataTeamsLanguageSummary.json",
  
  // DIRECTOR BASED
  UserData_Dir: "./data-json/CopilotUsageData_Directors/CopilotUsageDataTeamsSummary.json",
  DataDaySummary_Dir: "./data-json/CopilotUsageData_Directors/CopilotUsageDataTeamsDaySummary.json",
  EngagedUsersSummary_Dir: "./data-json/CopilotUsageData_Directors/CopilotUsageDataTeamsDayEngagedUsersSummary.json",
  LanguageSummary_Dir: "./data-json/CopilotUsageData_Directors/CopilotUsageDataTeamsLanguageSummary.json",


  // 90 DAYS REPORT (DAILY)
  UserData_90: "./data-json/CopilotUsageData_90days/CopilotUsageDataSummary.json",
  DataDaySummary_90: "./data-json/CopilotUsageData_90days/CopilotUsageDataDaySummary.json",
  EngagedUsersSummary_90: "./data-json/CopilotUsageData_90days/CopilotUsageDataDayEngagedUsersSummary.json",
  LanguageSummary_90: "./data-json/CopilotUsageData_90days/CopilotUsageDataLanguageSummary.json",

  // PORTFOLIO BASED
  UserData_Port_90: "./data-json/CopilotUsageData_Portfolio_90days/CopilotUsageDataTeamsSummary.json",
  DataDaySummary_Port_90: "./data-json/CopilotUsageData_Portfolio_90days/CopilotUsageDataTeamsDaySummary.json",
  EngagedUsersSummary_Port_90: "./data-json/CopilotUsageData_Portfolio_90days/CopilotUsageDataTeamsDayEngagedUsersSummary.json",
  LanguageSummary_Port_90: "./data-json/CopilotUsageData_Portfolio_90days/CopilotUsageDataTeamsLanguageSummary.json",

  // VP BASED
  UserData_VP_90: "./data-json/CopilotUsageData_VPs_90days/CopilotUsageDataTeamsSummary.json",
  DataDaySummary_VP_90: "./data-json/CopilotUsageData_VPs_90days/CopilotUsageDataTeamsDaySummary.json",
  EngagedUsersSummary_VP_90: "./data-json/CopilotUsageData_VPs_90days/CopilotUsageDataTeamsDayEngagedUsersSummary.json",
  LanguageSummary_VP_90: "./data-json/CopilotUsageData_VPs_90days/CopilotUsageDataTeamsLanguageSummary.json",

  // DIRECTOR BASED
  UserData_Dir_90: "./data-json/CopilotUsageData_Directors_90days/CopilotUsageDataTeamsSummary.json",
  DataDaySummary_Dir_90: "./data-json/CopilotUsageData_Directors_90days/CopilotUsageDataTeamsDaySummary.json",
  EngagedUsersSummary_Dir_90: "./data-json/CopilotUsageData_Directors_90days/CopilotUsageDataTeamsDayEngagedUsersSummary.json",
  LanguageSummary_Dir_90: "./data-json/CopilotUsageData_Directors_90days/CopilotUsageDataTeamsLanguageSummary.json",
};


//-----------------------------------------------------------------------------------------------------------------


// USAGE REPORT (30/90 DAYS)
export const generateUsageReportDays = (allData, timeFrame) => {
  const suffix = timeFrame === "90" ? "_90" : "";
  return {
    "Daily": {
      "UsageData": allData?.[`UserData${suffix}`] || [],
      "DataSummary": allData?.[`DataDaySummary${suffix}`] || [],
      "EngagedUsers": allData?.[`EngagedUsersSummary${suffix}`] || [],
      "Language": allData?.[`LanguageSummary${suffix}`] || []
    },
    "portfolio": {
      "UsageData": allData?.[`UserData_Port${suffix}`] || [],
      "DataSummary": allData?.[`DataDaySummary_Port${suffix}`] || [],
      "EngagedUsers": allData?.[`EngagedUsersSummary_Port${suffix}`] || [],
      "Language": allData?.[`LanguageSummary_Port${suffix}`] || []
    },
    "vp": {
      "UsageData": allData?.[`UserData_VP${suffix}`] || [],
      "DataSummary": allData?.[`DataDaySummary_VP${suffix}`] || [],
      "EngagedUsers": allData?.[`EngagedUsersSummary_VP${suffix}`] || [],
      "Language": allData?.[`LanguageSummary_VP${suffix}`] || []
    },
    "director": {
      "UsageData": allData?.[`UserData_Dir${suffix}`] || [],
      "DataSummary": allData?.[`DataDaySummary_Dir${suffix}`] || [],
      "EngagedUsers": allData?.[`EngagedUsersSummary_Dir${suffix}`] || [],
      "Language": allData?.[`LanguageSummary_Dir${suffix}`] || []
    },
    ...(timeFrame !== "90" && {
      "Mid-Month": {
        "UsageData": allData?.["UserData_Mid"] || [],
        "DataSummary": allData?.["DataDaySummary_Mid"] || [],
        "EngagedUsers": allData?.["EngagedUsersSummary_Mid"] || [],
        "Language": allData?.["LanguageSummary_Mid"] || []
      },
      "Monthly": {
        "UsageData": allData?.["UserData_Month"] || [],
        "DataSummary": allData?.["DataDaySummary_Month"] || [],
        "EngagedUsers": allData?.["EngagedUsersSummary_Month"] || [],
        "Language": allData?.["LanguageSummary_Month"] || []
      }
    })
  };
};