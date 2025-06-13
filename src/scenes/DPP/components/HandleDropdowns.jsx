import { set1DataFilter, set2DataFilter, set3DataFilter, handleDropdownFilter, callExpressServerEndpointSync, HttpStatusCodes } from "../../../utils";


// COPILOT ACTIVITY STATUS
export const statusList = [
  "1-5 Days", "6-10 Days", ">10 Days", "Inactive Users", "License Not Assigned"
];

export const usageList = ["Last 28 Days", "Last 90 Days"];

export const getDPPData = async () => {
  try {
    const response = await callExpressServerEndpointSync('GET', `DPPdata`);
    if (response.status === HttpStatusCodes.OK) {
      return response.data;
    } else {
      return [];
    }
  } catch (error) {
    console.error(`Error fetching DPP data :`, error);
    return [];
  }
};

//------------------------------------------------------------------------------------//

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


// PORTFOLIO
export const handlePortfolio = (newPort, input, objDefaultFilter, setPort, setVP, setDirector, setManager, setCopilotStatus, setVPFilter, setDirectorFilter, setManagerFilter, setDataState) => {
  setPort(newPort);
  setVP('All');
  setDirector('All');
  setManager('All');
  setCopilotStatus('All');

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
export const handleVP = (newVP, input, objDefaultFilter, port, setVP, setDirector, setManager, setCopilotStatus, setDirectorFilter, setManagerFilter, setDataState) => {
  setVP(newVP);
  setDirector('All');
  setManager('All');
  setCopilotStatus('All');

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
export const handleDirector = (newDirector, input, objDefaultFilter, filterData, setDirector, setManager, setCopilotStatus, setManagerFilter, setDataState) => {
  setDirector(newDirector);
  setManager('All');
  setCopilotStatus('All');

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
export const handleManager = (newManager, filterData, setManager, setCopilotStatus, setDataState) => { 
  setManager(newManager);
  setCopilotStatus('All');

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


// COPILOT ACTIVITY STATUS
export const handleStatus = (newStatus, setStatus) => {
  setStatus(newStatus);
  if (newStatus === 'All' || !newStatus) {
    setStatus('All');
  }
};


// REPORT RANGE
export const handleRange = (newValue, setUsageDays) => {
  setUsageDays(newValue);
};