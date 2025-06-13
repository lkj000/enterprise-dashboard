import { processAllBarData, processBarData } from './ChartFunc';


// BAR CHART
let portBarData = {}, vpBarData = {}, dirBarData = {}, ownerBarData = {}, codeBarData = {};
processBarData("Portfolio", portBarData);
processBarData("VP", vpBarData);
processBarData("Director", dirBarData);
processBarData("AppOwner", ownerBarData);
processBarData("AppCode", codeBarData);

export { portBarData, vpBarData, dirBarData, ownerBarData, codeBarData };

export const barChartNames = {
  "Common": processAllBarData(),
  "Portfolio": portBarData,
  "VP": vpBarData,
  "Director": dirBarData,
  "AppOwner": ownerBarData,
  "AppCode": codeBarData
};

export const colors = (bar) => {
  switch (bar.indexValue) {
    case "Critical":
      return "#7E0A0A";
    case "High":
      return "#AF0F0F";
    case "Medium":
      return "#DF1C1C";
    case "Low":
      return "#FC3A3A";
    default:
      return "#000000";
  }
};