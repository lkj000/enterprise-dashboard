export function formatDate(dateString) {
  return dateString.split('/').reverse().join('/');
};

const UpDateFormat = (date) => date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' });

// get remaining days of sprint
function generateDateRange (mainDate) {
  const dateRange = [...Array(13)].map((_, i) => {
    let date = new Date(mainDate);
    date.setDate(date.getDate() + i);
    return UpDateFormat(date);
  });
  return dateRange;
};

function generateMidRange (currDate) {
  const dateRange = [...Array(13)].map((_, i) => {
    let date = new Date(currDate);
    date.setDate(date.getDate() + i - 6);
    return UpDateFormat(date);
  });
  return dateRange;
};

export function getRemDaysInfo(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const leadDiff = end.setHours(0, 0, 0, 0) - start.setHours(0, 0, 0, 0);
  const diffInDays = Math.floor((leadDiff) / (1000 * 3600 * 24));

  let getDays = [];

  // if sprint is less than 15 days
  if(diffInDays <= 15){
    while (start <= end) {
      const formattedDate = `${start.getMonth() + 1}`.padStart(2, '0') + '/' + `${start.getDate()}`.padStart(2, '0');
      getDays.push(formattedDate);
      start.setDate(start.getDate() + 1);
    }
    return getDays;
  } else {  /// if sprint is more than 15 days

    const startInfo = UpDateFormat(start);
    const endInfo = UpDateFormat(end);

    const currentDate = new Date();
    const start_leadDiff = currentDate.setHours(0, 0, 0, 0) - start.setHours(0, 0, 0, 0);
    const start_leadDays = Math.floor(start_leadDiff / (1000 * 3600 * 24));
    const end_leadDiff = end.setHours(0, 0, 0, 0) - currentDate.setHours(0, 0, 0, 0);
    const end_leadDays = Math.floor(end_leadDiff / (1000 * 3600 * 24));

    if(start_leadDays <= 6) {
      getDays = generateDateRange(start);
      return [startInfo, ...getDays, endInfo];
    } else if(end_leadDays <= 6) {
      const endSub13 = new Date(end);
      endSub13.setDate(endSub13.getDate() - 13);
      getDays = generateDateRange(endSub13);
      return [startInfo, ...getDays, endInfo];
    } else {
      getDays = generateMidRange(currentDate);
      return [startInfo, ...getDays, endInfo];
    }
  }
};

export function getChartX (data, x, y, dateList) {
  return dateList.map(date => {
    const item = data.find(item => item[x] === date);
    return { x: date, y: item ? item[y] : 0 };
  });
};

export function getChartCulX (data, x, y, dateList) {
  const MaxCulValue = Math.max(...data.map(item => item[y]));
  return dateList.map(date => {
    const item = data.find(item => item[x] === date);
    return { x: date, y: item ? item[y] : MaxCulValue };
  });
};