import dayjs from 'dayjs';
import RunTimeChart from '../../data-json/allRepoRuntimeDataByUserChart.json';
import RunTimeData from '../../data-json/allRepoRuntimeDataByUser.json';

export { RunTimeData };

// BAR CHART DATA
export const chartData = RunTimeChart.map((item) => {
  return {
    "date": dayjs(item.date).format('MM/DD/YYYY'),
    "Automation Users": item.automation_user_count,
    "Other Users": item.other_users_count,
    "Total Users": item.total_count
  }
});

// STYLES
export const chartStyle = {
  chart1: {
    height: 450,
    position: 'relative'
  }
};