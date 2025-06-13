export const ExpireFilter = ['1-30 Days','31-60 Days','61-90 Days','91-180 Days','>180 Days','Already Expired','Never Expires'];

const rangeData = [
  { label: "1-30 Days", min: 1, max: 30 },
  { label: "31-60 Days", min: 31, max: 60 },
  { label: "61-90 Days", min: 61, max: 90 },
  { label: "91-180 Days", min: 91, max: 180 },
  { label: ">180 Days", min: 181, max: Infinity },
  { label: "Already Expired", min: -Infinity, max: 0 },
  { label: "Never Expires" }
];

export const colors = bar => {
  switch (bar.indexValue) {
    case "1-30 Days":
      return "#eb34ab";
    case "31-60 Days":
      return "#8b2a9c";
    case "61-90 Days":
      return "#FFA500";
    case "91-180 Days":
      return "#377eb8";
    case ">180 Days":
      return "#50C878";
    case "Already Expired":
      return "#DF1C1C";
    case "Never Expires":
      return "#008080";
    default:
      return "#000000";
  }
};

//------------------------------------------------------------------------------------------

const handleExpireDays = (data) => {
  return rangeData.map(range => {
    if (range.label === "Never Expires") {
      return {
        Range: range.label,
        Count: data.filter(item => !item.StartDate && !item.EndDate).length
      };
    } else {
      return {
        Range: range.label,
        Count: data.filter(item => parseInt(item.DaysToExpire, 10) >= range.min && parseInt(item.DaysToExpire, 10) <= range.max).length
      };
    }
  });
}

export const getExpireData = (data, option, state) => {
  let arrayData = handleExpireDays(state === 'common' ? data : data.filter(item => item[state[0]] === state[1]));
  let allData = option === 'All' ? arrayData : arrayData.filter(item => item.Range === option);
  return allData.every(item => item.Count === 0) ? [] : allData;
};