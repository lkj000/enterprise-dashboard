import { ManagerData, objDefaultFilter } from '../../requests';


// CHARTS FUNCTIONS
export const extractFields = (data, name) => {
  return {
    "id": name,
    "vp": data.vp,
    "director": data.director,
    "portfolio": data.portfolio
  };
};
  
export const  pushStoryData = (data, storyArray, commonFields) => {
  let storyData = {
    ...commonFields,
    "Total Stories": data?.total_stories ?? 0,
    "Closed Stories": data?.total_closed_stories ?? 0,
    "Open Stories": (data?.total_stories ?? 0) - (data?.total_closed_stories ?? 0),
    "Average Stories Closed Per User": data?.average_stories_done_per_user ?? 0,
    "Average Stories Closed Per User (Enterprise)": data?.enterprise_average_stories_done_per_user ?? 0,
    "Velocity_ChartData": data?.Velocity_ClosedStory ?? []
  };
  storyArray.push(storyData);
};

export const pushIssueData = (data, issueArray, commonFields) => {
  let issueData = {
    ...commonFields,
    "Total Issues": data?.total_issues ?? 0,
    "Closed Issues": data?.total_closed_issues ?? 0,
    "Open Issues": (data?.total_issues ?? 0) - (data?.total_closed_issues ?? 0),
    "Average Issues Closed Per User": data?.average_issues_done_per_user ?? 0,
    "Average Issues Closed Per User (Enterprise)": data?.enterprise_average_issues_done_per_users ?? 0,
    "Velocity_ChartData": data?.Velocity_ClosedIssue ?? []
  };
  issueArray.push(issueData);
};

export const processBarData = (filterKey, objData) => {
  objDefaultFilter[filterKey].forEach(filterData => {
    let issueArray = [], storyArray = [];
    
    ManagerData.filter(data => data[filterKey] === filterData)
      .forEach(data => {
        let parts = data.manager.split(" ");
        let name = parts.length > 1 ? parts[0] + " " + parts[1] : parts[0];
        let commonFields = extractFields(data, name);
        pushStoryData(data, storyArray, commonFields);
        pushIssueData(data, issueArray, commonFields);
      });
      objData[filterData] = [storyArray, issueArray];
  });
};

// Sort the line graph
export const sortData = (arrayData) => {
  const sortableArray = arrayData.map(item => {
    const lastY = item.Velocity_ChartData[item.Velocity_ChartData.length - 1].y;
    return { ...item, lastY };
  });
  sortableArray.sort((a, b) => b.lastY - a.lastY);
  return sortableArray.map(({ lastY, ...item }) => item);
};

export const checkDataLength = (data) => {
  if(data.length <= 5){
    return [data];
  } else {
    const splitLength = Math.ceil(data.length / 5);
    const arrayValue = [];
    for (let i = 0; i < splitLength; i++) {
      arrayValue.push(data.slice(i * 5, (i + 1) * 5));
    }
    return arrayValue;
  }
};