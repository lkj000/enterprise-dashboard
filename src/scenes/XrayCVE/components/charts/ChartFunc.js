import { objDefaultFilter, XrayData } from "../../requests";


// Helper function to calculate totals
const calculateTotals = (data) => {
  return data.reduce((totals, item) => {
    totals.Critical += item["Critical"];
    totals.High += item["High"];
    totals.Medium += item["Medium"];
    totals.Low += item["Low"];
    return totals;
  }, { Critical: 0, High: 0, Medium: 0, Low: 0 });
};


// Function to process bar data ('ALL')
export const processAllBarData = () => {
  const totals = calculateTotals(XrayData);
  let objData = [
    { id: "Critical", Total: totals.Critical },
    { id: "High", Total: totals.High },
    { id: "Medium", Total: totals.Medium },
    { id: "Low", Total: totals.Low }
  ];
  return objData;
};

// Function to process bar data based on a specific filter key (e.g., Portfolio, VP, etc.)
export const processBarData = (filterKey, objData) => {
  objDefaultFilter[filterKey].forEach(filterData => {
    const filteredData = XrayData.filter(data => data[filterKey] === filterData);
    const totals = calculateTotals(filteredData);
    objData[filterData] = [
      { id: "Critical", Total: totals.Critical },
      { id: "High", Total: totals.High },
      { id: "Medium", Total: totals.Medium },
      { id: "Low", Total: totals.Low }
    ];
  });
};