import ProjectData from "../../data-json/alljiraprojects_sprint.json";
import EpicData from "../../data-json/jiraepicmetric";
import FeatureData from "../../data-json/jirafeaturemetric";
import BacklogJira from "../../data-json/jira_backlog.json";
import currentIssues from "../../data-json/active_sprint_issues.json";


const epicDataMap = new Map((EpicData?.data || []).map(item => [item.project_key, item.epics]));
const featureDataMap = new Map((FeatureData?.data || []).map(item => [item.project_key, item.features]));

export const sprintData = ProjectData.map(item => {
    const newData = { ...item };
    newData.epic = epicDataMap.get(item.projectKey) || [];
    newData.feature = featureDataMap.get(item.projectKey) || [];
  
    const backlog = BacklogJira?.data?.[item.projectKey] ?? {};
    if (Object.keys(backlog).length > 0 && (backlog.total_assigned !== 0 || backlog.total_unassigned !== 0)) {
        newData.backlog = Object.values(backlog);
    } else {
        newData.backlog = [];
    }
  
    return newData;
});

// Dropdowns
export const keyData = sprintData.map(item => item.projectKey).sort();

export const projectData = sprintData.reduce((acc, item) => {
    const sortedActiveSprints = item.sprints.filter(sprint => sprint[0]?.state === 'active').sort((a, b) => a[0].name.localeCompare(b[0].name));
    acc[item.projectKey] = sortedActiveSprints;
    return acc;
}, {});

export const activeSprintNames = sprintData.reduce((acc, item) => {
    acc[item.projectKey] = [...new Set(item.sprints.flat().filter(sprint => sprint.state === 'active').map(sprint => sprint.name))].sort((a, b) => a.localeCompare(b));
    return acc;
}, {});

export const activeSprintsData = sprintData.reduce((acc, item) => {
    acc[item.projectKey] = [...new Set(item.sprints.flat().filter(sprint => sprint.state === 'active'))].sort((a, b) => a.name.localeCompare(b.name));
    return acc;
}, {});

export const IssueData = sprintData.reduce((acc, item) => {
    const issuesObject = (currentIssues?.data?.[item.projectKey] || []).reduce((issuesAcc, issue) => {
        issuesAcc[Object.keys(issue)] = Object.values(issue)[0];
        return issuesAcc;
    }, {});

    acc[item.projectKey] = issuesObject;
    return acc;
}, {});

// GET LAST UPDATE DATES
export const currentIssue_lastrun = currentIssues?.update_date ?? '';
export const backlog_lastrun = BacklogJira?.update_date ?? '';
export const epic_lastrun = EpicData?.update_date ?? '';
export const feature_lastrun = FeatureData?.update_date ?? '';