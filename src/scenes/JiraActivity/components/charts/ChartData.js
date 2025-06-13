import { checkIfLineEmpty, checkIfBarEmpty, getClosedItems, getCumulativeClosedItems, getAvgClosedItems,
  getAvgVelocity
} from './utils';


// CHART 1 (BURNDOWN CHART) - ISSUES & POINTS
export const colorsBurndown = ['#50C878','#377eb8', '#E67835'];
export const getBurndownIssues = (data) => {
  const allIssues = [
    {  "id": "Daily Issues Closed", "color" : "#50C878", "data": getClosedItems(data, 'issues_closed')  },
    {  "id": "Cumulative Closed Issues", "color" : "#377eb8", "data": getCumulativeClosedItems(data, 'issues_closed')  },
    {  "id": "Avg. Issues Closed in Last 11 Weeks", "color" : "#E67835", "data": getAvgClosedItems(data, 'Velocity_ClosedIssue', 'Velocity_ClosedIssue')  },
  ];
  return checkIfLineEmpty(allIssues) ? [] : allIssues;
};

export const getBurndownIssuePoints = (data) => {
  const allIssuePoints = [
    {  "id": "Daily Issue Pts. Closed", "color": "#50C878", "data": getClosedItems(data, 'issue_points_closed')  },
    {  "id": "Cumulative Closed Issue Pts.", "color" : "#377eb8", "data": getCumulativeClosedItems(data, 'issue_points_closed')  },
    {  "id": "Avg. Issue Pts Closed in Last 11 Weeks", "color" : "#E67835", "data": getAvgClosedItems(data, 'Velocity_ClosedStoryPoints_Issue', 'Velocity_ClosedIssue')  },
  ];
  return checkIfLineEmpty(allIssuePoints) ? [] : allIssuePoints;
};


//------------------------------------------------------------------------------------------------------------------


// CHART 2 (BURNDOWN CHART) - STORIES & POINTS
export const getBurndownStories = (data) => {
  const allStories = [
    {  "id": "Daily Stories Closed", "color": "#50C878", "data": getClosedItems(data, 'stories_closed')  },
    {  "id": "Cumulative Closed Stories", "color": "#377eb8", "data": getCumulativeClosedItems(data, 'stories_closed')  },
    {  "id": "Avg. Stories Closed in Last 11 Weeks", "color": "#E67835", "data": getAvgClosedItems(data, 'Velocity_ClosedStory', 'Velocity_ClosedStory')  },
  ];
  return checkIfLineEmpty(allStories) ? [] : allStories;
};

export const getBurndownStoryPoints = (data) => {
  const allStoryPoints = [
    {  "id": "Daily Story Pts. Closed", "color": "#50C878", "data": getClosedItems(data, 'story_points_closed')  },
    {  "id": "Cumulative Closed Story Pts.", "color": "#377eb8", "data": getCumulativeClosedItems(data, 'story_points_closed')  },
    {  "id": "Avg. Story Pts Closed in Last 11 Weeks", "color": "#E67835", "data": getAvgClosedItems(data, 'Velocity_ClosedStoryPoints_Story', 'Velocity_ClosedStory')  },
  ];
  return checkIfLineEmpty(allStoryPoints) ? [] : allStoryPoints;
};


//------------------------------------------------------------------------------------------------------------------


// CHART 3 (TEAM PROGRESS)
export const getTeamProgress = (data, IssueColumn, StoryColumn) => {
  const teamProgress = [
    {  "id": "Issues", "Backlog": data.IssueReady, "In Progress": data.IssueInProgress, "Done": data.IssueDone},
    {  "id": "Stories", "Backlog": data.StoryReady, "In Progress": data.StoryInProgress, "Done": data.StoryDone}
  ];

  const startIndex = IssueColumn ? 0 : 1;
  const endIndex = StoryColumn ? 2 : 1;
  const splitData = teamProgress.slice(startIndex, endIndex);

  const allKeysCheck = ["Backlog", "In Progress", "Done"];
  return checkIfBarEmpty(splitData, allKeysCheck) ? [] : splitData;
};


//------------------------------------------------------------------------------------------------------------------


// CHART 4 (RESOURCE ASSIGNMENT)
export const getResourceData = (data) => {
  const allKeys = ["Done", "Open", "Total"];
  const resource = [ data.Resource_Issue, data.Resource_Story ];
  return resource.map(item => checkIfBarEmpty(item, allKeys) ? [] : item);
};


//------------------------------------------------------------------------------------------------------------------


// CHART 5 (WEEKLY VELOCITY)
export const getVelocityData = (data, IssueColumn, StoryColumn) => {
  const allVelocity = [
    {  "id": "Avg. Closed Issue Pts", "color": "#BB0000", "data": getAvgVelocity(data, 'Velocity_ClosedStoryPoints_Issue', 'Velocity_ClosedIssue') },
    {  "id": "Total Closed Issues", "color": "#50C878", "data": data.Velocity_ClosedIssue  },
    {  "id": "Avg. Closed Issues", "color": "#00FF00", "data": getAvgVelocity(data, 'Velocity_ClosedIssue', 'Velocity_ClosedIssue')  },
    {  "id": "Closed Issue Pts.", "color": "#E35335", "data": data.Velocity_ClosedStoryPoints_Issue  },
    {  "id": "Avg. Closed Story Pts.", "color": "#E16D25", "data": getAvgVelocity(data, 'Velocity_ClosedStoryPoints_Story', 'Velocity_ClosedStory')  },
    {  "id": "Avg. Closed Stories", "color": "#DD00BB", "data": getAvgVelocity(data, 'Velocity_ClosedStory', 'Velocity_ClosedStory')  },
    {  "id": "Total Closed Stories", "color": "#377eb8", "data": data.Velocity_ClosedStory  },
    {  "id": "Closed Story Pts.", "color": "#FAFA33", "data": data.Velocity_ClosedStoryPoints_Story  }
  ];

  const startIndex = IssueColumn ? 0 : 4;
  const endIndex = StoryColumn ? 8 : 4;
  const splitData = allVelocity.slice(startIndex, endIndex);
  return checkIfLineEmpty(splitData) ? [] : splitData;
};