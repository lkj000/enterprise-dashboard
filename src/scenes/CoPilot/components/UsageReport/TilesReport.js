import { generateUsageReportDays } from "./ImportFiles";

export const getTab2AllFiles = (allData, timeFrame) => {
  return generateUsageReportDays(allData, timeFrame);
};

export const ChartStyle = {
  chart1: {
    height: 450,
    marginTop: -20,
    marginBottom: -10,
  }
};

//-------------------------------------------------------------------------------------
  
  
// TILES - USAGE REPORT
export const getTileReport = (tileInfo, type, usageDays, key) => {
  const isCommonKey = key === 'common';
  const tileFile = isCommonKey ? tileInfo[type] : tileInfo[key[0]];
  const data = isCommonKey ? tileFile['UsageData'] : (tileFile['UsageData'].find(item => item["Team Slug"] === key[1]) || {});
  
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
  

// CHARTS - USAGE REPORT
export const getUsageChart = (tileInfo, type, key) => {
  const isCommonKey = key === 'common';
  const chartFile = isCommonKey ? (tileInfo[type] ?? []) : (tileInfo[key[0]] ?? []);
  
  const getData = (property) => isCommonKey ? (chartFile[property] ?? []) : 
  (chartFile[property]?.[key[1]] ?? []);
  
  return [
    getData('DataSummary'),
    getData('EngagedUsers'),
    getData('Language')
  ];
};