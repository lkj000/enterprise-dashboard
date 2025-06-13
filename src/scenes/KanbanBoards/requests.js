import KanbanBoards from "../../data-json/kanban_issues.json";
import EpicData from "../../data-json/jiraepicmetric";
import FeatureData from "../../data-json/jirafeaturemetric";


const epicDataMap = new Map((EpicData?.data || []).map(item => [item.project_key, item.epics]));
const featureDataMap = new Map((FeatureData?.data || []).map(item => [item.project_key, item.features]));

export const KanbanData = (KanbanBoards?.data || []).map(item => {
    const newData = { ...item };
    newData.epic = epicDataMap.get(item.projectKey) || [];
    newData.feature = featureDataMap.get(item.projectKey) || [];
  
    return newData;
});

// GET LAST UPDATE DATES
export const kanban_lastrun = KanbanBoards?.update_date ?? '';

// Dropdowns
export const keyData = KanbanData.map(item => item.projectKey).sort();

export const activeBoardNames = KanbanData.reduce((acc, item) => {
    const boardData = Object.values(item.boards);
    acc[item.projectKey] = [...new Set(boardData.map(board => board.name))].sort((a, b) => a.localeCompare(b));
    return acc;
}, {});

export const activeBoardData = KanbanData.reduce((acc, item) => {
    acc[item.projectKey] = Object.values(item.boards).sort((a, b) => a.name.localeCompare(b.name));
    return acc;
}, {});
