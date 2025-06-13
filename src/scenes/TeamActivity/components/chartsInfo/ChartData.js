import { ManagerData } from "../../requests";
import { processBarData, checkDataLength, sortData } from "./ChartFunc";


// BAR CHART - 1
let portBarData = {}, vpBarData = {}, dirBarData = {}, manBarData = {};
processBarData("portfolio", portBarData);
processBarData("vp", vpBarData);
processBarData("director", dirBarData);
processBarData("manager", manBarData);

export { portBarData, vpBarData, dirBarData, manBarData };

export const enterpriseInfo = [
  {"Average Stories Closed Per User (Enterprise)": ManagerData[0]?.enterprise_average_stories_done_per_user || 0 },
  {"Average Issues Closed Per User (Enterprise)": ManagerData[0]?.enterprise_average_issues_done_per_users || 0 }
];

export const getBarData = (data) => {
  return (data.length > 60 ? [data.slice(0, data.length/2) , data.slice(data.length/2, data.length)]: [data]);
};


// LINE CHART  - 2
const COLORS = ['#50C878','#E35335','#377eb8','#FAFA33', '#7E0E94'];
export const getLineData = (data) => {
  const LineInfo = sortData(data).map((item, index) => {
    return {
      "id": item.id,
      "color": COLORS[index % COLORS.length],
      "data": item.Velocity_ChartData
    };
  });

  return checkDataLength(LineInfo);
};


export const barChartNames = {
  "portfolio": portBarData,
  "vp": vpBarData,
  "director": dirBarData,
  "manager": manBarData
};

export const LineChartNames = {
  "portfolio": [],
  "vp": vpBarData,
  "director": dirBarData,
  "manager": manBarData
};

export const ChartStyle = {
  chart1: {
    width: '100%',
    height: 550,
    position: 'relative'
  },
  chart2: {
    width: '100%',
    height: 400,
    marginTop: '-40px',
    position: 'relative'
  }
};