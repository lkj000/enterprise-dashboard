import RiskInfo from "../../data-json/allrisks.json";
import { getSortDataForDropdown } from '../../utils';

export const RiskData = RiskInfo?.data || [];
export const risk_lastrun = RiskInfo?.update_date || ''; // last run

export const keyOptions = [...new Set(RiskData.map(data => data.key.split("-")[0]))].sort();
export const objDefaultFilter = getSortDataForDropdown(RiskData, ["portfolio", "vp", "director", "manager"]);

export const filterByKey = (newKey) => {
  return RiskData.filter((data) => data.key.startsWith(newKey + '-'));
};

// BASED ON THE KEY, FILTER THE DROPDOWNS
export const filterKeyData = (data, key) => {
  return getSortDataForDropdown(data, [key])[key];
}