import sonarExcludeData from "../../data-json/SonarExclusionsList";
import { getSortDataForDropdown } from '../../utils';

export const sonarData = sonarExcludeData.map((item, index) => ({ ...item, sNo: index + 1 }));
export const objDefaultFilter = getSortDataForDropdown(sonarExcludeData, ['Portfolio', 'Department', 'AppOwner', 'AppCode']);