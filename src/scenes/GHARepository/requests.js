import { WorkflowList } from "../../data/workflowList";
import { repoCommitsAndPRs } from "../../data/repoCommitsAndPRs";

const repoArray = repoCommitsAndPRs.repo_data.reduce((item, inc) => {
    item[inc.repository] = inc;
    return item;
  }, {});
  
const processData = WorkflowList.map((item, index) => {
    const { Portfolio, PortfolioVP, Department, appOwner, RepositoryName, ...rest } = item;
    const repoData = repoArray[RepositoryName] || {};
    const commit = repoData.repo_commit_count || 0;
    const PR = repoData.repo_pr_count || 0;
    const graph = repoData.weekly_commits || null;

    //TO FIX
    const portValue = Portfolio !== undefined ? Portfolio : "Not Available";
    const vpValue = PortfolioVP !== undefined ? PortfolioVP : "Not Available";
    const deptValue = Department !== undefined ? Department : "Not Available";
    const appOwnerValue = appOwner !== undefined ? appOwner : "Not Available";
  
    return {
        RepositoryName,
        Portfolio: portValue,
        PortfolioVP: vpValue,
        Department: deptValue,
        appOwner: appOwnerValue,
        TotalCommit: commit, 
        TotalPRCount: PR, 
        commitGraph: graph, 
        ...rest 
    };
});

export default processData;