import { getSortDataForDropdown } from "../../../../utils";

const handleData = (data) => {
    const objFilter = getSortDataForDropdown(data, ["Environment", "Compliance"]);
    const chartData = objFilter["Environment"].map(env => {
      const compData = objFilter["Compliance"].reduce((acc, comp) => {
        acc[comp] = data.filter(item => item["Environment"] === env && item["Compliance"] === comp).length;
        return acc;
      }, {});
      
      return { id: env, ...compData };
    });
    return [ chartData, objFilter["Compliance"]];
  };

export const getChartData = (input, chartState) => {
    const arrayData = handleData(chartState === 'common' ? input : input.filter(item => item[chartState[0]] === chartState[1]));
    return arrayData[0].length > 0 ? { chartData: arrayData[0], graphKey: arrayData[1] } : 
      { chartData: [], graphKey: [] };
};

export const graphColor = ["#50C878","#8b2a9c","#FFA500","#377eb8","#008080","#DF1C1C"];