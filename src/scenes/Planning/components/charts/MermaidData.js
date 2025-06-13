const today = new Date();
const todayFormatted = today.toISOString().split('T')[0];
const next30Days = new Date(today.setDate(today.getDate() + 30));
const nextFormatted = next30Days.toISOString().split('T')[0];

const generateGanttHeader = () => `
  gantt 
    dateFormat  YYYY-MM-DD
    todayMarker stroke-width:5px,stroke:#0f0,opacity:0.5
    Q1      :milestone,  02-01-2024, 0d
    Q2      :milestone,  06-01-2024, 0d
    Q3      :milestone,  09-01-2024, 0d
    Q4      :milestone,  12-01-2024, 0d
`;

const generateEpicData = (projData) => {
  return projData.reduce((acc, item) => {
    const { epic_mermaid_gantt, key } = item;
    if (epic_mermaid_gantt && (epic_mermaid_gantt.split('\n').length - 1 > 1)) {
      return acc + epic_mermaid_gantt;
    } else {
      const data = `${key} - No Feature Linked : crit, ${todayFormatted}, ${nextFormatted}\n`;
      return acc + epic_mermaid_gantt + data;
    }
  }, '');
};

// GET DEFAULT CHART
export const getEpicMermaid = (projData) => {
  const alldata = projData.epic.length > 0 ? generateEpicData(projData.epic) : '';
  return alldata.length > 0 ? generateGanttHeader() + alldata : '';
};

// GET ONLY SELECTED MERMAID CHART
export const getSelectedEpicMermaid = (projData) => {
  const alldata = projData.length > 0 ? generateEpicData(projData) : '';
  return alldata.length > 0 ? generateGanttHeader() + alldata : '';
};