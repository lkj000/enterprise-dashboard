import { set1DataFilter, set2DataFilter, set3DataFilter, handleDropdownFilter } from "../../../utils";

// Based on dropdowns
const functionMap = {
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

//------------------------------------------------------------------------------------//


// REPORT TYPE
export const handleReport = (newValue, setReportType, setDataState, setPort, setVP, setDirector, setManager, setStatus) => {
  setReportType(newValue);
  if (!newValue) {
    setReportType('Daily');
  }
  setDataState('common');
  setPort('All');
  setVP('All');
  setDirector('All');
  setManager('All');
  setStatus('All');
};


// PORTFOLIO
export const handlePortfolio = (newPort, input, objDefaultFilter, setPort, setVP, setDirector, setManager, setVPFilter, setDirectorFilter, setManagerFilter, setDataState) => {
  setPort(newPort);
  setVP('All');
  setDirector('All');
  setManager('All');

  if (newPort === 'All' || !newPort) {
    setPort('All');
    setVPFilter(objDefaultFilter["vp"]);
    setDirectorFilter(objDefaultFilter["director"]);
    setManagerFilter(objDefaultFilter["manager"]);
    setDataState('common');
  } else {
    setVPFilter(set1DataFilter(input, 'portfolio', newPort, 'vp'));
    setDirectorFilter(set1DataFilter(input, 'portfolio', newPort, 'director'));
    setManagerFilter(set1DataFilter(input, 'portfolio', newPort, 'manager'));
    setDataState(['portfolio', newPort]);
  };
}


// VP
export const handleVP = (newVP, input, objDefaultFilter, port, setVP, setDirector, setManager, setDirectorFilter, setManagerFilter, setDataState) => {
  setVP(newVP);
  setDirector('All');
  setManager('All');

  if(newVP === 'All' || !newVP) {
    setVP('All');
    if (port !== 'All' && port) {
      setDirectorFilter(set1DataFilter(input, 'portfolio', port, 'director'));
      setManagerFilter(set1DataFilter(input, 'portfolio', port, 'manager'));
      setDataState(['portfolio', port]);
    }else{
      setDirectorFilter(objDefaultFilter['director']);
      setManagerFilter(objDefaultFilter['manager']);
      setDataState('common');
    };

  } else {
    setDirectorFilter(set1DataFilter(input, 'vp', newVP, 'director'));
    setManagerFilter(set1DataFilter(input, 'vp', newVP, 'manager'));
    setDataState(['vp', newVP]);
  }
};


// DIRECTOR
export const handleDirector = (newDirector, input, objDefaultFilter, filterData, setDirector, setManager, setManagerFilter, setDataState) => {
  setDirector(newDirector);
  setManager('All');

  if (newDirector === 'All' || !newDirector) {
    setDirector('All');
    ['director', 'manager'].forEach(item => filterData[item] = 'All');
    const [args, name] = handleDropdownFilter(filterData);

    if (args.length > 0) {
      setDataState([args[args.length-2], args[args.length-1]]);
      setManagerFilter(functionMap[name](input, ...args, 'manager'));
    } else {
      setManagerFilter(objDefaultFilter['manager']);
      setDataState('common');
    };
  } else {
    setManagerFilter(set1DataFilter(input, 'director', newDirector, 'manager'));
    setDataState(['director', newDirector]);
  }
};


// MANAGER
export const handleManager = (newManager, filterData, setManager, setDataState) => { 
  setManager(newManager);
  if (newManager === 'All' || !newManager) {
    setManager('All');
    filterData['manager'] = 'All';
    const args = handleDropdownFilter(filterData)[0];

    if (args.length > 0) {
      setDataState([args[args.length-2], args[args.length-1]]);
    } else {
      setDataState('common');
    };
  } else {
    setDataState(['manager', newManager]);
  }
};


// ACTIVITY STATUS
export const handleStatus = (newStatus, setStatus) => {
  setStatus(newStatus);
  if (newStatus === 'All' || !newStatus) {
    setStatus('All');
  }
};


// VIEW STATE
export const handleLevel = (newValue, setViewState) => {
  setViewState(newValue);
};


// USAGE REPORT RANGE
export const handleUsage = (newValue, setUsageDays) => {
  setUsageDays(newValue);
};