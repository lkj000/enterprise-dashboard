import XrayCVE from '../../data-json/xray-cve.json';
import { getSortDataForDropdown, set1DataFilter, set2DataFilter, set3DataFilter, set4DataFilter } from '../../utils';

const severityOrder = ["Critical", "High", "Medium", "Low"];
export const XrayData = XrayCVE.map(({ CVE, "Severity Counts": severityCounts, ...rest }) => {
  const sortedCVE = CVE.sort((a, b) => severityOrder.indexOf(a.SEVERITY_DESC) - severityOrder.indexOf(b.SEVERITY_DESC));
  return {
    ...severityCounts,
    ...rest,
    cve: sortedCVE.map(cve => cve.CVE_ID).join(", "),
    severity: sortedCVE.map(cve => cve.SEVERITY_DESC).join(", ")
  };
});


export const objDefaultFilter = getSortDataForDropdown(XrayData, [ "Portfolio", "VP", "Director", "AppOwner", "AppCode"]);

// Based on dropdowns
export const functionMap = {
  "set1DataFilter": set1DataFilter,
  "set2DataFilter": set2DataFilter,
  "set3DataFilter": set3DataFilter,
  "set4DataFilter": set4DataFilter
};

export const UpdateFields = (port, selectVP, director, owner, selectAppcode ) => {
  return {
    Portfolio: port,
    VP: selectVP,
    Director: director,
    AppOwner: owner,
    AppCode: selectAppcode
  };
};