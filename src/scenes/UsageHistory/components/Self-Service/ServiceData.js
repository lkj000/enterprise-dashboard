import workflowStatus from "../../../../data-json/WorkflowRunStats.json";
import { calTotalValue } from "../../../../utils";


// SELF-SERVICE
const RepoName = Object.keys(workflowStatus).sort();
export const workflowData = RepoName.reduce((acc, key) => {
    acc[key] = workflowStatus[key];
    return acc;
}, {});

const defaultData = Object.keys(workflowData).map(key => Object.values(workflowData[key])).flat().map(item => Object.values(item)).flat();
export const totData = calTotalValue(defaultData, 'total_runs');
export const successData = calTotalValue(defaultData, 'success');
export const failedData = calTotalValue(defaultData, 'failure');


export const RepoData = RepoName.reduce((acc, key) => {
    acc[key] = Object.values(workflowStatus[key]).flat().map(item => Object.values(item)).flat();
    return acc;
}, {});

export const FileData = RepoName.reduce((acc, item) => {
    acc[item] = Object.fromEntries(
        Object.keys(workflowStatus[item]).map(key => [key, Object.values(workflowStatus[item][key]).flat()])
    );
    return acc;
}, {});

export const getServiceChart = (data) => {
    return Object.entries(data).reduce((acc, [key, value]) => {
        acc[key] = { date: key, total_runs: value.total_runs, success: value.success, failure: value.failure };
        return Object.values(acc);
    }, {});
};