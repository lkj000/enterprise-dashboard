export const checkIfLineEmpty = (splittedData) => {
  return splittedData.every(item => item.data.every(point => point.y === 0 || point.y === '0.0'));
};

export const checkIfBarEmpty = (splittedData, allKeys) => {
  return splittedData.every(item => allKeys.every(key => item[key] === 0));
};


//------------------------------------------------------------------------------------------------------------------


// CHART 1 & 2 FUNCTIONS -- (BURNDOWN CHART) - ISSUES/STORIES & POINTS
const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
export const getClosedItems = (tileData, dataKey) => {
  return daysOfWeek.map(day => {
    const item = tileData.daily_data.find(item => {
      const parts = item.date.split('-');
      const date = new Date(parts[0], parts[1] - 1, parts[2]);
      return date.toLocaleDateString('en-US', { weekday: 'long' }) === day;
    });
    return {
      "x": day,
      "y": item ? item[dataKey] : 0,
    };
  });
};

export const getCumulativeClosedItems = (tileData, dataKey) => {
  let cumulativeCount = 0;
  return daysOfWeek.map(day => {
    const item = tileData.daily_data.find(item => {
      const parts = item.date.split('-');
      const date = new Date(parts[0], parts[1] - 1, parts[2]);
      return date.toLocaleDateString('en-US', { weekday: 'long' }) === day;
    });
    if (item) {
      cumulativeCount += item[dataKey];
    }
    return {
      "x": day,
      "y": cumulativeCount,
    };
  });
};

export const getAvgClosedItems = (tileData, dataKey, lengthKey) => {
  const avgValue = tileData[dataKey].reduce((a, b) => a + b.y, 0) / tileData[lengthKey].length;
  return daysOfWeek.map(day => {
    tileData.daily_data.find(item => {
      const parts = item.date.split('-');
      const date = new Date(parts[0], parts[1] - 1, parts[2]);
      return date.toLocaleDateString('en-US', { weekday: 'long' }) === day;
    });
    return {
      "x": day,
      "y": avgValue.toFixed(1)
    };
  });
};


//------------------------------------------------------------------------------------------------------------------


// CHART 5 FUNCTIONS (WEEKLY VELOCITY)
export const getAvgVelocity = (tileData, dataKey, lengthKey) => {
  const average = tileData[dataKey].reduce((a, b) => a + b.y, 0) / tileData[lengthKey].length;
  return tileData[dataKey].map((item) => {
    return {
      "x": item.x,
      "y": average.toFixed(1)
    };
  });
};