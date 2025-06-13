import RepoWithSecret from '../../data-json/tatertotDetectData.json';
import { formatDate } from '../../utils';

export const lastRun = RepoWithSecret?.updated_date ?? "";
export const TableData = RepoWithSecret.table_data;

// PIE CHART
const pieData = RepoWithSecret.pie_chart;
export const total = pieData.total_repos;
export const commonData = [
  { id: "Repositories with secrets" , value: pieData.compromised_repos, label: `Repositories with secrets (${ pieData.compromised_repos })` },
  { id: "Repositories without secrets" , value: total - pieData.compromised_repos, label: `Repositories without secrets (${ total - pieData.compromised_repos })` }
];

// LINE CHART
const graphValue = RepoWithSecret.time_seriers_graph.slice(-30).map((item) => {
  return {  "x": formatDate(item.date), "y": item.total_secrets };
});
export const lineData = [{ "id": "Repositories with secrets", "color": "#378805", "data": graphValue }];
