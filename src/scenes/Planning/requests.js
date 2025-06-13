import { Buffer } from "buffer";
import ProjectInfo from "../../data-json/alljiraprojects_sprint.json";
import EpicData from "../../data-json/jiraepicmetric";
import FeatureData from "../../data-json/jirafeaturemetric";


const epicDataMap = new Map((EpicData?.data || []).map(item => [item.project_key, item.epics]));
const featureDataMap = new Map((FeatureData?.data || []).map(item => [item.project_key, item.features]));
export const keyData = ProjectInfo.map(item => item.projectKey).sort(); // Dropdowns

export const projectData = keyData.map(projectKey => {
  return {
    projectKey,
    epic: epicDataMap.get(projectKey) || [],
    feature: featureDataMap.get(projectKey) || []
  };
});


// GET PROJECT TABLES
export const getProjTables = (projKey, input) => {
  if (!projKey.length) return { epic: [], feature: [] };
  const keySet = new Set(projKey);
  return input.reduce((acc, { projectKey, epic = [], feature = [] }) => {
    if (keySet.has(projectKey)) {
      acc.epic.push(...epic);
      acc.feature.push(...feature);
    }
  return acc;
  }, { epic: [], feature: [] });
};

// URLS ENCODE & DECODE
export const encodeURL = (str) => {
  return Buffer.from(str.join(',')).toString('base64');
};

export const decodeURL = (str) => {
  return Buffer.from(str, 'base64').toString('ascii').split(',');
};