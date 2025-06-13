import { WorkflowData, objDefaultFilter } from "../requests";

export const getChartData = (data) => {
  return data.flatMap(item => 
    (item.total_workflow_runs || []).map(run => ({
      id: run.x,
      color: item.workflowColor,
      data: [{ x: run.x, y: run.y, z: run.z }]
    }))
  );
};

const generateChartData = (key, filterFn) => {
  return objDefaultFilter[key].reduce((acc, value) => {
    const data = WorkflowData.filter(filterFn(value));
    acc[value] = getChartData(data);
    return acc;
  }, {});
};


// CHART DATA
export const allChartData = getChartData(WorkflowData) ?? [];
export const portChartData = generateChartData('Portfolio', port => item => item.Portfolio === port);
export const archChartData = generateChartData('archetype', arc => item => item.archetype === arc);


export const legendData = {
  "CI": "#3333ff",
  "CD": "#e60000",
  "CICD": "#8000ff",
  "Veracode": "#477249",
  "Automation": "#9adf9e",
  "Others": "#eff334"
};