// TILES INFO
export const formatAvgTime = (time) => {
    if (isNaN(time) || time < 0) {
      return "-";
    }
    return time.toFixed(2);
};

const calculateBusinessDays = (startDate, endDate) => {
  let start = new Date(startDate);
  let end = new Date(endDate);
  let businessSeconds = 0;

  if (start > end) {
    [start, end] = [end, start];
  }

  while (start < end) {
    const dayOfWeek = start.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      businessSeconds += 86400;
    }
    start.setDate(start.getDate() + 1);
  }
  return businessSeconds;
};

export const getWeekendData = (weekend, startDate, endDate, resources) => {
  const currentDate = new Date();
  const getStartDate = new Date(startDate);
  const getEndDate = new Date(endDate);
  const differenceInTime = getEndDate.getTime() - currentDate.getTime() < 0 ? 0 : getEndDate.getTime() - currentDate.getTime();
  const leadTimeDifference = getEndDate.getTime() - getStartDate.getTime();
  const totalCapacityTime = Math.ceil(leadTimeDifference / (1000 * 3600 * 24)) * resources * 8;
  const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

  if (!weekend) {
    return [differenceInDays, totalCapacityTime, differenceInDays * resources * 8];
  }else {
    const businessTime = calculateBusinessDays(currentDate, getEndDate);
    const leadTimeBusiness = calculateBusinessDays(getStartDate, getEndDate);
    const businessDays = Math.ceil(businessTime / (3600 * 24));
    const leadTimeBusinessDays = Math.ceil(leadTimeBusiness / (3600 * 24));
    return [businessDays, leadTimeBusinessDays * resources * 8, businessDays * resources * 8];
  }
};