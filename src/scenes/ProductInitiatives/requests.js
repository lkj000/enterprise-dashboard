import Initiatives from '../../data-json/allinitiatives.json';
import { getSortDataForDropdown } from '../../utils';

export const InitiativeData = Initiatives?.data || [];
export const init_lastrun = Initiatives?.update_date || ''; // last run

export const projectOptions = [...new Set(InitiativeData.map((data) => data.key.split('-')[0]))].sort();
export const objDefaultFilter = getSortDataForDropdown(InitiativeData, ['portfolio', 'vp', 'director', 'manager']);

export const filterByKey = (input, newKey) => {
    return input.filter((data) => data.key.startsWith(newKey + '-'));
};