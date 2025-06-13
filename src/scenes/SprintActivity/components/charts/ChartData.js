import { formatDate, getRemDaysInfo, getChartX, getChartCulX } from './ChartUtils';
  

// CHART 1
export const getBurndownData = (input) => {
  const dailyInfo = input.sprintData.daily_data.map(item => ({ 
    ...item, date: formatDate(item.date) 
  }));

  const dateList = getRemDaysInfo(input.startDate, input.endDate);
  
  const burndown_issue = [
    { "id":"Closed Issues", "color": "#50C878", "data": getChartX(dailyInfo, 'date', 'issues_closed', dateList) },
    {  "id":"Cumulative Closed Issues", "color": "#377eb8", "data": getChartCulX(dailyInfo, 'date', 'accumulated_closed_issues', dateList) },
    {  "id":"Closed Issue Pts.", "color": "#E67835", "data": getChartX(dailyInfo, 'date', 'issue_points_closed', dateList) },
    {  "id":"Total Issues", "color": "#FAFA33", "data": dateList.map(date => ({ x: date, y : input.sprintData.issueCount })) }
  ];    
  const burndown_story = [
    {  "id":"Closed Stories", "color": "#50C878", "data": getChartX(dailyInfo, 'date', 'stories_closed', dateList) },
    {  "id":"Cumulative Closed Stories", "color": "#377eb8", "data": getChartCulX(dailyInfo, 'date', 'accumulated_closed_stories', dateList)},
    {  "id":"Closed Story Pts.", "color": "#E67835", "data": getChartX(dailyInfo, 'date', 'story_points_closed', dateList) },
    {  "id":"Total Stories", "color": "#FAFA33", "data": dateList.map(date => ({ x: date, y : input.sprintData.totalStoryCount })) }
  ];   
  return [burndown_issue, burndown_story];
};
  
  
// CHART 2
export const getOldSprintData = (sprintInfo) => {
  const graphData = sprintInfo.filter(item => item.state !== 'active').reverse();
  
  const bugData = graphData.length > 0 ? [
    { id: 'Created Bug', data: graphData.map(data => ({ x: data.name, y: data.bugsCreatedCount || 0 })) },  
    { id: 'Closed Bug', data: graphData.map(data => ({ x: data.name, y: data.bugsClosedCount || 0 })) },
    { id: 'Active Bug', data: graphData.map(data => ({ x: data.name, y: data.bugsActiveCount || 0 })) }
  ] : [];
  const velocity = graphData.length > 0 ? [
    { id: 'Average Completed Velocity', data: graphData.map(data => ({ x: data.name, y: parseFloat(data.velocityCompleted) || 0 })) },
    { id: 'Average Estimated Velocity', data: graphData.map(data => ({ x: data.name, y: parseFloat(data.velocityEstimated) || 0 })) }
  ] : [];
  const avgVelocity = graphData.length > 0 ? [
    { id: 'Total Contributors', data: graphData.map(data => ({ x: data.name, y: parseFloat(data.resources) || 0 })) },
    { id: 'Average Resource Velocity', data: graphData.map(data => ({ x: data.name, y: parseFloat(data.velocityResource) || 0 })) } 
  ] : [];
  const spillData = graphData.length > 0 ? [
    { id: 'Spilled Issues', data: graphData.map(data => ({ x: data.name, y: data.spilledIssues || 0 })) },
    { id: 'Scope Creep Issues', data: graphData.map(data => ({ x: data.name, y: data.createdAfterStart || 0 })) }
  ] : [];
  
  return { 
    bugData : bugData,
    velocity: velocity,
    avgVelocity: avgVelocity,
    spillData: spillData
  };
};
  
  
// CHART STYLES
export const chartStyle = {
  chart1: {
    height: 470,
    position: 'relative',
    marginTop: '-40px'
  }
};