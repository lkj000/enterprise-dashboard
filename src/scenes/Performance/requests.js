import { getSortDataForDropdown } from '../../utils';
import { WorkflowList } from "../../data/workflowList";
import { repoBuildArchetype } from "../../data/repoBuildArchetype";
import RunTimeInfo from "../../data-json/allRepoRuntimeData.json";

const RepoNames = new Set([ 
  "albertsons/platform-github-actions-workflows-common",
  "albertsons/esgh-central-workflow-queue",
  "albertsons/esgh-platform-dashboard"
]);

export const WorkflowData = WorkflowList.filter(({ RepositoryName }) => !RepoNames.has(RepositoryName))
  .flatMap(({ Portfolio, appCode, RepositoryName }) => {
    const archetype = repoBuildArchetype.find(item => item.repository === RepositoryName)?.archetype ?? "Not Specified";
    const runTime = RunTimeInfo.find(item => item.repository === RepositoryName)?.workflows ?? [];
    const data = { Portfolio, appCode, RepositoryName, archetype };
    return runTime.length ? runTime.map(info => ({ ...data, ...info })) : [data];
  }).map((item, i) => ({ sNo: i + 1, ...item }));


export const objDefaultFilter = getSortDataForDropdown(WorkflowData, ['Portfolio', 'archetype']);