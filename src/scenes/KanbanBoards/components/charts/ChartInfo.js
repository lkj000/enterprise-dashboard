export const getBugData = (data) => {
  const bugs = Object.entries(data).map(([week, bug]) => ({
    week: week === "0" ? "Current" : `Week ${week}`,
    ...bug
  })).reverse();

  const bugData = [
    { id: 'Created Bug', data: bugs.map(data => ({ x: data.week, y: data.created || 0 })) },  
    { id: 'Closed Bug', data: bugs.map(data => ({ x: data.week, y: data.closed || 0 })) },
    { id: 'Active Bug', data: bugs.map(data => ({ x: data.week, y: data.active || 0 })) }
  ];

  return bugData;
};