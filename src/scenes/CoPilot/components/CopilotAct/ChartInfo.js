export const Tab1ChartFiles = {
  vp_chart: "./data-json/copilot_info/copilot_vps_chart.json",
  dir_chart: "./data-json/copilot_info/copilot_directors_chart.json",
  manager_chart: "./data-json/copilot_info/copilot_managers_chart.json"
};
  

// FUNCTION TO GET THE FILE - CHART DATA
export const getAllChartFiles = (allData) => {
  const sortedData = (data) => data.sort((a, b) => a.id.localeCompare(b.id));
  return {
    "All": sortedData(allData?.["manager_chart"] || []),
    "VP": sortedData(allData?.["vp_chart"] || []),
    "Director": sortedData(allData?.["dir_chart"] || [])
  };
};

//-------------------------------------------------------------------------------------

// LEGENDS
const objGraphKey = {
  "License Not Assigned" : '#FFA500',
  "Inactive Users": '#E35335',
  "Active Users (>10 Days)": '#8b2a9c',
  "Active Users (6-10 Days)": '#377eb8',
  "Active Users (1-5 Days)": '#50C878'
};
const graphID = Object.keys(objGraphKey);
const colorCode = Object.values(objGraphKey);
    
export const ChartStyle = {
  chart1: {
    height: 550,
    position: 'relative'
  }
};
  
//-------------------------------------------------------------------------------------
  
  
// CHARTS DATA
export const getChartData = (chartNames, viewState, key) => {
  const chartData = chartNames[viewState] || [];
  if (key === 'common') {
    return chartData;
  }; 
  if (viewState === 'All') {  // Dropdown Charts
    if (key[0] === 'manager') {
      return chartData.filter((item) => item.id === key[1]);
    } else {
      return chartData.filter((item) => item[key[0]] === key[1]);
    }
  };
  if (key[0] === 'portfolio') {  // VP, Director Charts
    return chartData.filter((item) => item[key[0]] === key[1]);
  };
  return chartData;
};
  
  
// GRAPH KEY
export const getGraphKey = (newStatus) => {
  return newStatus === 'All' ? [graphID, colorCode] : graphID.reduce((acc, item) => {
    if (item.includes(newStatus)) {
      acc[0].push(item);
      acc[1].push(objGraphKey[item]);
    }
    return acc;
  }, [[], []]);
};