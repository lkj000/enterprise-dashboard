export const expireList = ['1-15 Days','16-30 Days','31-60 Days','>60 Days','Already Expired', 'Inactive', 'Never Expires'];

// Charts
const rangeData = [
  { label: "1-15 Days", min: 1, max: 15 },
  { label: "16-30 Days", min: 16, max: 30 },
  { label: "31-60 Days", min: 31, max: 60 },
  { label: ">60 Days", min: 61, max: Infinity, exclude: '9999' },
  { label: "Already Expired", min: -Infinity, max: 0 },
  { label: "Inactive", min: ""},
  { label: "Never Expires", min: '9999' }
];

export const colors = bar => {
  switch (bar.indexValue) {
    case "1-15 Days":
      return "#8b2a9c";
    case "16-30 Days":
      return "#FFA500";
    case "31-60 Days":
      return "#377eb8";
    case ">60 Days":
      return "#50C878";
    case "Already Expired":
      return "#DF1C1C";
    case "Inactive":
      return "#F38C79";
    case "Never Expires":
      return "#008080";
    default:
      return "#000000";
  }
};

//------------------------------------------------------------------------------------------

const handleExpireDays = (data) => {
  return rangeData.map(range => {
    if (range.min === '9999') {
      return {
        Range: range.label,
        Count: data.filter(item => item.Expiry.startsWith(range.min)).length
      };
    } else if (range.min === "") {
      return {
        Range: range.label,
        Count: data.filter(item => item.DaysToExpire === "").length
      };
    } else {
      return {
        Range: range.label,
        Count: data.filter(item => parseInt(item.DaysToExpire, 10) >= range.min && parseInt(item.DaysToExpire, 10) <= range.max && 
          (!range.exclude || !item.Expiry.startsWith(range.exclude))).length
      };
    }
  });
}

export const getExpireData = (data, option, state) => {
  let arrayData = handleExpireDays(state === 'common' ? data : data.filter(item => item[state[0]] === state[1]));
  let allData = option === 'All' ? arrayData : arrayData.filter(item => item.Range === option);
  return allData.every(item => item.Count === 0) ? [] : allData;
};