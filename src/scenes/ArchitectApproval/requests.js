import { WorkflowList } from "../../data/workflowList";

export const WorkflowData = WorkflowList;


// CHART
export const totalCount = WorkflowList.length;
let totalNotPTX = WorkflowList.filter(item => !item.PTX).length;
export const common = [
  { id: "Total PTX Present" , value: totalCount - totalNotPTX, label: `Total PTX- Present (${totalCount - totalNotPTX})`},
  { id: "Total PTX Not Present" , value: totalNotPTX, label: `Total PTX- Not Present (${totalNotPTX})` }
];


function getPieChartData( portName ) {
  const totPortCount = WorkflowList.filter(item => item.Portfolio === portName).length;
  const totPortNotPTX = WorkflowList.filter(item => item.Portfolio === portName && !item.PTX).length;
      
  return [ portName, [
    { id: "PTX Present" , value: totPortCount - totPortNotPTX, label: `PTX- Present (${totPortCount - totPortNotPTX})`},
    { id: "PTX Not Present" , value: totPortNotPTX, label: `PTX- Not Present (${totPortNotPTX})` }
  ], totPortCount  ];
};

export const cog = getPieChartData('COG (Jim Saber)');
export const digital = getPieChartData('Digital (Ramiya Iyer)');
export const retail = getPieChartData('Retail & Supply Chain (Maria Latushkin)');