import { SonarList } from "../../data/sonarList";
import { WorkflowList } from "../../data/workflowList";
import { getSortDataForDropdown } from '../../utils';

// TABLE DATA
export const lastRun = SonarList?.update_date ?? "";
export const processData = (SonarList?.data ?? []).map((item, index) => {
  const { Portfolio, Department, appOwner, ...rest } = item;
  //TO FIX
  const portValue = Portfolio !== undefined && Portfolio ? Portfolio : "Not Available";
  const deptValue = Department !== undefined && Portfolio ? Department : "Not Available";
  const appOwnerValue = appOwner !== undefined && Portfolio ? appOwner : "Not Available";
  return { 
    sNo: index + 1,
    Portfolio: portValue,
    Department: deptValue,
    appOwner: appOwnerValue, 
    ...rest
  };
});

export const objDefaultFilter = getSortDataForDropdown(processData, ['Portfolio', 'Department', 'appOwner', 'appCode']);


function getPieChartData( portName ) {
  const workflowCount = WorkflowList.filter(item => item.Portfolio === portName).length;
  const sonarCount = processData.filter(item => item.Portfolio === portName && item.Department !== 'Not Available');
    
  return [ portName, [
    { id: "Total Sonar Exceptions" , value: sonarCount.length, label: `Total Sonar Exceptions (${sonarCount.length})`},
    { id: "Total Repos Without Exceptions " , value: workflowCount - sonarCount.length, label: `Total Repos Without Exceptions (${workflowCount - sonarCount.length})` }
  ], workflowCount  ];
};
  
  
// PIE CHART DATA
export const totalCount = WorkflowList.length;
export const common = [
  { id: "Total Sonar Exceptions" , value: processData.length, label: `Total Sonar Exceptions (${processData.length})`},
  { id: "Total Repos Without Exceptions " , value: totalCount - processData.length, label: `Total Repos Without Exceptions (${totalCount - processData.length})` }
];
  
export const cog = getPieChartData('COG (Jim Saber)');
export const digital = getPieChartData('Digital (Ramiya Iyer)');
export const retail = getPieChartData('Retail & Supply Chain (Maria Latushkin)');
  
// BAR CHART DATA
export const barInfo = objDefaultFilter['Portfolio'].reduce((acc, port) => {
  const data = processData.filter(item => item.Portfolio === port && item.Department !== 'Not Available').reduce((acc, {Department}) => {
    if (!acc[Department]) {
      acc[Department] = { Portfolio: Department, exemptions: 0 };
    }
    acc[Department].exemptions += 1;
    return acc;
  }, {});
  acc[port] = Object.values(data);
  return acc;
}, {});
  
export const barCommon = Object.values(barInfo).flat();

