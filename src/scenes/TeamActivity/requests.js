import ManagerSummary from '../../data-json/jira_managers_summary.json';
import Vps from '../../data-json/jira_vp_summary.json';
import Directors from '../../data-json/jira_directors_summary.json';
import { getSortDataForDropdown, set1DataFilter, set2DataFilter, set3DataFilter } from '../../utils';


const vpLookup = Vps.reduce((acc, {vp, managers}) => { 
  managers.forEach(manager => acc[manager] = vp);
  return acc;
}, {});

const directorLookup = Directors.reduce((acc, {director, managers}) => {
  managers.forEach(manager => acc[manager] = director);
  return acc
}, {});

export const ManagerData = (ManagerSummary?.data || []).map((data, i) => ({
  ...data,
  index: i+1,
  vp: vpLookup[data.manager] || "Not Available",
  director: directorLookup[data.manager] || "Not Available",
})).sort((a, b) => a.manager.localeCompare(b.manager));

export const manager_lastrun = ManagerSummary?.update_date ?? ''; // Last Run

export const objDefaultFilter = getSortDataForDropdown(ManagerData, ["portfolio", "vp", "director", "manager"]);

// Based on dropdown
export const functionMap = {
  "set1DataFilter": set1DataFilter,
  "set2DataFilter": set2DataFilter,
  "set3DataFilter": set3DataFilter
};

export const UpdateFields = (port, selectVP, selectDirector, selectManager) => {
  return {
    portfolio: port,
    vp: selectVP,
    director: selectDirector,
    manager: selectManager
  };
};