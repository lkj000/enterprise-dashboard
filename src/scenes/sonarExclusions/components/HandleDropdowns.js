import { set1DataFilter, set2DataFilter, set3DataFilter, handleDropdownFilter } from "../../../utils";

// Based on the dropdown
const functionMap = {
  "set1DataFilter": set1DataFilter,
  "set2DataFilter": set2DataFilter,
  "set3DataFilter": set3DataFilter
};

export const UpdateFields = (port, dept, selectOwner, selectCode) => {
  return {
    Portfolio: port,
    Department: dept,
    AppOwner: selectOwner,
    AppCode: selectCode
  };
};

//------------------------------------------------------------------------------------//

// PORTFOLIO
export const handlePortfolio = (newPort, input, objDefaultFilter, setPort, setDept, setAppOwner, setAppCode, setVPFilter, setOwnerFilter, setCodeFilter) => {
  setPort(newPort);
  setDept('All');
  setAppOwner('All');
  setAppCode('All');

  if (newPort === 'All' || !newPort) {
    setPort('All');
    setVPFilter(objDefaultFilter["Department"]);
    setOwnerFilter(objDefaultFilter["AppOwner"]);
    setCodeFilter(objDefaultFilter["AppCode"]);
  } else {
    setVPFilter(set1DataFilter(input, 'Portfolio', newPort, 'Department'));
    setOwnerFilter(set1DataFilter(input, 'Portfolio', newPort, 'AppOwner'));
    setCodeFilter(set1DataFilter(input, 'Portfolio', newPort, 'AppCode'));
  };
};


// DEPARTMENT
export const handleDept = (newDept, input, objDefaultFilter, port, setDept, setAppOwner, setAppCode, setOwnerFilter, setCodeFilter) => {
  setDept(newDept);
  setAppOwner('All');
  setAppCode('All');

  if (newDept === 'All' || !newDept) {
    setDept('All');
    if (port !== 'All' && port) {
      setOwnerFilter(set1DataFilter(input, 'Portfolio', port, 'AppOwner'));
      setCodeFilter(set1DataFilter(input, 'Portfolio', port, 'AppCode'));
    } else {
      setOwnerFilter(objDefaultFilter['AppOwner']);
      setCodeFilter(objDefaultFilter['AppCode']);
    };
  } else {
    setOwnerFilter(set1DataFilter(input, 'Department', newDept, 'AppOwner'));
    setCodeFilter(set1DataFilter(input, 'Department', newDept, 'AppCode'));
  };
};


// APP OWNER
export const handleOwner = (newOwner, input, objDefaultFilter, filterData, setAppOwner, setAppCode, setCodeFilter) => {
  setAppOwner(newOwner);
  setAppCode('All');

  if (newOwner === 'All' || !newOwner) {
    setAppOwner('All');
    filterData['AppOwner'] = 'All';
  } else {
    filterData['AppOwner'] = newOwner;
  };
  filterData['AppCode'] = 'All';
  const [args, name] = handleDropdownFilter(filterData);

  if (args.length > 0) {
    setCodeFilter(functionMap[name](input, ...args, 'AppCode'));
  } else {
    setCodeFilter(objDefaultFilter['AppCode']);
  };
}


// APP CODE
export const handleCode = (newCode, filterData, setAppCode) => {
  setAppCode(newCode);
  if (newCode === 'All' || !newCode) {
    setAppCode('All');
    filterData['AppCode'] = 'All';
  }
};
