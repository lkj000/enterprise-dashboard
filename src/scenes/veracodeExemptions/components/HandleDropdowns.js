import { handleDropdownFilter, set1DataFilter, set2DataFilter, set3DataFilter, set4DataFilter } from "../../../utils";
import { objDefaultFilter, barCommon, barInfo } from "../requests";

// Based on dropdowns
export const UpdateFields = (port, dept, selectOwner, selectAppcode, exempType) => {
  return {
    Portfolio: port,
    Department: dept,
    appOwner: selectOwner,
    appCode: selectAppcode,
    Description: exempType
  };
};
const functionMap = {
  "set1DataFilter": set1DataFilter,
  "set2DataFilter": set2DataFilter,
  "set3DataFilter": set3DataFilter,
  "set4DataFilter": set4DataFilter
};


// PORTFOLIO
export const handlePort = (newPort, input, setPort, setDept, setOwner, setAppcode, setExempType, setDeptFilter, setOwnerFilter, setAppcodeFilter, setExemptionFilter, setBarData) => {
  setPort(newPort);
  setDept('All');
  setOwner('All');
  setAppcode('All');
  setExempType('All');

  if (newPort === 'All' || !newPort) {
    setPort('All');
    setDeptFilter(objDefaultFilter['Department']);
    setOwnerFilter(objDefaultFilter['appOwner']);
    setAppcodeFilter(objDefaultFilter['appCode']);
    setExemptionFilter(objDefaultFilter['Description']);
    setBarData(barCommon);
  } else {
    setDeptFilter(set1DataFilter(input, 'Portfolio', newPort, 'Department'));
    setOwnerFilter(set1DataFilter(input, 'Portfolio', newPort, 'appOwner'));
    setAppcodeFilter(set1DataFilter(input, 'Portfolio', newPort, 'appCode'));
    setExemptionFilter(set1DataFilter(input, 'Portfolio', newPort, 'Description'));
    setBarData(barInfo[newPort]);
  }
};


// DEPARTMENT
export const handleDept = (newDept, input, port, setDept, setOwner, setAppcode, setExempType, setOwnerFilter, setAppcodeFilter, setExemptionFilter) => {
  setDept(newDept);
  setOwner('All');
  setAppcode('All');
  setExempType('All');

  if (newDept === 'All' || !newDept) {
    setDept('All');
    if (port !== 'All' && port) {
      setOwnerFilter(set1DataFilter(input, 'Portfolio', port, 'appOwner'));
      setAppcodeFilter(set1DataFilter(input, 'Portfolio', port, 'appCode'));
      setExemptionFilter(set1DataFilter(input, 'Portfolio', port, 'Description'));
    } else {
      setOwnerFilter(objDefaultFilter['appOwner']);
      setAppcodeFilter(objDefaultFilter['appCode']);
      setExemptionFilter(objDefaultFilter['Description']);
    }
  } else {
    setOwnerFilter(set1DataFilter(input, 'Department', newDept, 'appOwner'));
    setAppcodeFilter(set1DataFilter(input, 'Department', newDept, 'appCode'));
    setExemptionFilter(set1DataFilter(input, 'Department', newDept, 'Description'));
  }
};


// APP OWNER
export const handleOwner = (newOwner, input, filterData, setOwner, setAppcode, setExempType, setAppcodeFilter, setExemptionFilter) => {
  setOwner(newOwner);
  setAppcode('All');
  setExempType('All');

  if (newOwner === 'All' || !newOwner) {
    setOwner('All');
    ['appOwner', 'appCode', 'Description'].forEach(item => filterData[item] = 'All');
    const [args, name] = handleDropdownFilter(filterData);
    if (args.length > 0) {
      setAppcodeFilter(functionMap[name](input, ...args, 'appCode'));
      setExemptionFilter(functionMap[name](input, ...args, 'Description'));
    } else {
      setAppcodeFilter(objDefaultFilter['appCode']);
      setExemptionFilter(objDefaultFilter['Description']);
    }
  } else {
    setAppcodeFilter(set1DataFilter(input, 'appOwner', newOwner, 'appCode'));
    setExemptionFilter(set1DataFilter(input, 'appOwner', newOwner, 'Description'));
  };

};


// APP CODE
export const handleAppcode = (newAppcode, input, filterData, setAppcode, setExempType, setExemptionFilter) => {
  setAppcode(newAppcode);
  setExempType('All');

  if (newAppcode === 'All' || !newAppcode) {
    setAppcode('All');
    ['appCode', 'Description'].forEach(item => filterData[item] = 'All');
    const [args, name] = handleDropdownFilter(filterData);
    if (args.length > 0) {
      setExemptionFilter(functionMap[name](input, ...args, 'Description'));
    } else {
      setExemptionFilter(objDefaultFilter['Description']);
    };
  } else {
    setExemptionFilter(set1DataFilter(input, 'appCode', newAppcode, 'Description'));
  }
};


// EXEMPTION TYPE
export const handleExemption = (newExemption, filterData, setExempType) => {
  setExempType(newExemption);

  if (newExemption === 'All' || !newExemption) {
    setExempType('All');
    filterData['Description'] = 'All';
  }
};


// -----------------------------------------------------------------------------------------------

// HANDLE PIE CHART
export const handlePieClick = (newData, input, setPort, setDept, setOwner, setAppcode, setExempType, setDeptFilter, setOwnerFilter, setAppcodeFilter, setExemptionFilter, setBarData) => {
  const isString = typeof newData === "string";
  const portName = isString ? newData : newData.filterName;
  const exempType = isString ? 'All' : newData.id;
  setPort(portName);
  setDept('All');
  setOwner('All');
  setAppcode('All');
  setExempType(exempType);

  if (portName === 'All') {
    setDeptFilter(objDefaultFilter['Department']);
    setOwnerFilter(objDefaultFilter['appOwner']);
    setAppcodeFilter(objDefaultFilter['appCode']);
    setExemptionFilter(objDefaultFilter['Description']);
    setBarData(barCommon);
  } else {
    setDeptFilter(set1DataFilter(input, 'Portfolio', portName, 'Department'));
    setOwnerFilter(set1DataFilter(input, 'Portfolio', portName, 'appOwner'));
    setAppcodeFilter(set1DataFilter(input, 'Portfolio', portName, 'appCode'));
    setExemptionFilter(set1DataFilter(input, 'Portfolio', portName, 'Description'));
    setBarData(barInfo[portName]);
  }
};


// HANDLE BAR CHART
export const handleBarClick = (newData, input, setDept, setOwner, setAppcode, setExempType, setOwnerFilter, setAppcodeFilter, setExemptionFilter) => {
  const deptName = newData.indexValue;
  setDept(deptName);
  setOwner('All');
  setAppcode('All');
  setExempType('All');

  setOwnerFilter(set1DataFilter(input, 'Department', deptName, 'appOwner'));
  setAppcodeFilter(set1DataFilter(input, 'Department', deptName, 'appCode'));
  setExemptionFilter(set1DataFilter(input, 'Department', deptName, 'Description'));
};