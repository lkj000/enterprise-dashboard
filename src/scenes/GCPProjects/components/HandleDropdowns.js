import { set1DataFilter, set2DataFilter, set3DataFilter, handleDropdownFilter } from "../../../utils";

// Based on dropdowns
const functionMap = {
  "set1DataFilter": set1DataFilter,
  "set2DataFilter": set2DataFilter,
  "set3DataFilter": set3DataFilter
};
export const UpdateFields = (port, vp, director, owner, appcode) => {
  return {
    Portfolio: port,
    Department: vp,
    Team: director,
    AppOwner: owner,
    AppCode: appcode
  };
};

//------------------------------------------------------------------------------------//


// PORTFOLIO
export const handlePortfolio = (newPort, input, objDefaultFilter, setPort, setVP, setDirector, setOwner, setAppcode, setChartState, setVPFilter, setDirectorFilter, setAppOwnerFilter, setAppcodeFilter) => {
  setPort(newPort);
  setVP('All');
  setDirector('All');
  setOwner('All');
  setAppcode('All');

  if (newPort === 'All' || !newPort) {
    setPort('All');
    setVPFilter(objDefaultFilter["Department"]);
    setDirectorFilter(objDefaultFilter["Team"]);
    setAppOwnerFilter(objDefaultFilter["AppOwner"]);
    setAppcodeFilter(objDefaultFilter["AppCode"]);
    setChartState('common');
  } else {
    setVPFilter(set1DataFilter(input, 'Portfolio', newPort, 'Department'));
    setDirectorFilter(set1DataFilter(input, 'Portfolio', newPort, 'Team'));
    setAppOwnerFilter(set1DataFilter(input, 'Portfolio', newPort, 'AppOwner'));
    setAppcodeFilter(set1DataFilter(input, 'Portfolio', newPort, 'AppCode'));
    setChartState(['Portfolio', newPort]);
  };
}


// VP
export const handleVP = (newVP, input, objDefaultFilter, port, setVP, setDirector, setOwner, setAppcode, setChartState, setDirectorFilter, setAppOwnerFilter, setAppcodeFilter) => {
  setVP(newVP);
  setDirector('All');
  setOwner('All');
  setAppcode('All');

  if(newVP === 'All' || !newVP) {
    setVP('All');
    if (port !== 'All' && port) {
      setDirectorFilter(set1DataFilter(input, 'Portfolio', port, 'Team'));
      setAppOwnerFilter(set1DataFilter(input, 'Portfolio', port, 'AppOwner'));
      setAppcodeFilter(set1DataFilter(input, 'Portfolio', port, 'AppCode'));
      setChartState(['Portfolio', port]);
    } else {
      setDirectorFilter(objDefaultFilter['Team']);
      setAppOwnerFilter(objDefaultFilter['AppOwner']);
      setAppcodeFilter(objDefaultFilter['AppCode']);
      setChartState('common');
    };

  } else {
    setDirectorFilter(set1DataFilter(input, 'Department', newVP, 'Team'));
    setAppOwnerFilter(set1DataFilter(input, 'Department', newVP, 'AppOwner'));
    setAppcodeFilter(set1DataFilter(input, 'Department', newVP, 'AppCode'));
    setChartState(['Department', newVP]);
  }
};


// DIRECTOR
export const handleDirector = (newDirector, input, objDefaultFilter, filterData, setDirector, setOwner, setAppcode, setChartState, setAppOwnerFilter, setAppcodeFilter) => {
  setDirector(newDirector);
  setOwner('All');
  setAppcode('All');

  if (newDirector === 'All' || !newDirector) {
    setDirector('All');
    const obj = ['Team', 'AppOwner', 'AppCode'];
    obj.forEach(prop => filterData[prop] = 'All');
    const [args, name] = handleDropdownFilter(filterData);

    if (args.length > 0) {
      setAppOwnerFilter(functionMap[name](input, ...args, 'AppOwner'));
      setAppcodeFilter(functionMap[name](input, ...args, 'AppCode'));
      setChartState([args[args.length-2], args[args.length-1]]);
    } else {
      setAppOwnerFilter(objDefaultFilter['AppOwner']);
      setAppcodeFilter(objDefaultFilter['AppCode']);
      setChartState('common');
    };

  } else {
    setAppOwnerFilter(set1DataFilter(input, 'Team', newDirector, 'AppOwner'));
    setAppcodeFilter(set1DataFilter(input, 'Team', newDirector, 'AppCode'));
    setChartState(['Team', newDirector]);
  }
};


// APP OWNER
export const handleOwner = (newOwner, input, objDefaultFilter, filterData, setOwner, setAppcode, setChartState, setAppcodeFilter) => {
  setOwner(newOwner);
  setAppcode('All');

  if(newOwner === 'All' || !newOwner) {
    setOwner('All');
    const obj = ['AppOwner', 'AppCode'];
    obj.forEach(prop => filterData[prop] = 'All');
    const [args, name] = handleDropdownFilter(filterData);

    if (args.length > 0) {
      setAppcodeFilter(functionMap[name](input, ...args, 'AppCode'));
      setChartState([args[args.length-2], args[args.length-1]]);
    } else {
      setAppcodeFilter(objDefaultFilter['AppCode']);
      setChartState('common');
    };

  } else {
    setAppcodeFilter(set1DataFilter(input, 'AppOwner', newOwner, 'AppCode'));
    setChartState(['AppOwner', newOwner]);
  }
};


// APP CODE
export const handleAppcode = (newAppcode, filterData, setAppcode, setChartState) => {
  setAppcode(newAppcode);

  if (newAppcode === 'All' || !newAppcode) {
    setAppcode('All');
    filterData['AppCode'] = 'All';
    const args = handleDropdownFilter(filterData)[0];
    if (args.length > 0) {
      setChartState([args[args.length-2], args[args.length-1]]);
    } else {
      setChartState('common');
    };

  } else {
    setChartState(['AppCode', newAppcode]);
  }
};