import { set1DataFilter, set2DataFilter, handleDropdownFilter } from "../../../utils";
import { objDefaultFilter, filterByKey, filterKeyData, RiskData as input } from "../requests";

// Based on dropdowns
const functionMap = {
  "set1DataFilter": set1DataFilter,
  "set2DataFilter": set2DataFilter
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


// PROJECT KEY
export const handleKey = (newKey, setProjKey, setPort, setVP, setDirector, setManager, setProjFilter, setPortFilter, setVPFilter, setDirectorFilter, setManagerFilter) => {
  setProjKey(newKey);
  setPort('All');
  setVP('All');
  setDirector('All');
  setManager('All');
        
  if( newKey === 'All' || !newKey ) {
    setProjKey('All');
    setProjFilter(input);
    setPortFilter(objDefaultFilter['portfolio']);
    setVPFilter(objDefaultFilter['vp']);
    setDirectorFilter(objDefaultFilter['director']);
    setManagerFilter(objDefaultFilter['manager']);
  } else {
    const keyData = filterByKey(newKey);
    setProjFilter(keyData);
    setPortFilter(filterKeyData(keyData, 'portfolio'));
    setVPFilter(filterKeyData(keyData, 'vp'));
    setDirectorFilter(filterKeyData(keyData, 'director'));
    setManagerFilter(filterKeyData(keyData, 'manager'));
  }
};



// PORTFOLIO
export const handlePort = (newPort, projKey, ProjFilter, setPort, setVP, setDirector, setManager, setVPFilter, setDirectorFilter, setManagerFilter) => {
  setPort(newPort);
  setVP('All');
  setDirector('All');
  setManager('All');

  if( newPort === 'All' || !newPort ) {
    setPort('All');
    if(projKey !== 'All' && projKey){
      setVPFilter(filterKeyData(ProjFilter, 'vp'));
      setDirectorFilter(filterKeyData(ProjFilter, 'director'));
      setManagerFilter(filterKeyData(ProjFilter, 'manager'));
    } else {
      setVPFilter(objDefaultFilter['vp']);
      setDirectorFilter(objDefaultFilter['director']);
      setManagerFilter(objDefaultFilter['manager']);
    }
  } else {
    const data = projKey !== 'All' && projKey ? ProjFilter : input;
    setVPFilter(set1DataFilter(data, 'portfolio', newPort, 'vp'));
    setDirectorFilter(set1DataFilter(data, 'portfolio', newPort, 'director'));
    setManagerFilter(set1DataFilter(data, 'portfolio', newPort, 'manager'));
  }
};


// VP
export const handleVP = (newVP, filterData, projKey, ProjFilter, setVP, setDirector, setManager, setDirectorFilter, setManagerFilter) => {
  setVP(newVP);
  setDirector('All');
  setManager('All');
  const isFiltered = projKey !== 'All' && projKey;
  const data = isFiltered ? ProjFilter : input;

  if( newVP === 'All' || !newVP ) {
    setVP('All');
    const obj = ['vp', 'director', 'manager'];
    obj.forEach((item) => filterData[item] = 'All');
    const [args, name] = handleDropdownFilter(filterData);
    if (args.length > 0) {
      setDirectorFilter(functionMap[name](data, ...args, 'director'));
      setManagerFilter(functionMap[name](data, ...args, 'manager'));
    } else {
      setDirectorFilter((isFiltered ? filterKeyData(ProjFilter, 'director') : objDefaultFilter['director']));
      setManagerFilter((isFiltered ? filterKeyData(ProjFilter, 'manager') : objDefaultFilter['manager']));
    };
  } else {
    setDirectorFilter(set1DataFilter(data, 'vp', newVP, 'director'));
    setManagerFilter(set1DataFilter(data, 'vp', newVP, 'manager'));
  }
};


// DIRECTOR
export const handleDirector = (newDirector, filterData, projKey, ProjFilter, setDirector, setManager, setManagerFilter) => {
  setDirector(newDirector);
  setManager('All');
  const isFiltered = projKey !== 'All' && projKey;
  const data = isFiltered ? ProjFilter : input;

  if (newDirector === 'All' || !newDirector) {
    setDirector('All');
    const obj = ['director', 'manager'];
    obj.forEach((item) => filterData[item] = 'All');
    const [args, name] = handleDropdownFilter(filterData);
    if (args.length > 0) {
      setManagerFilter(functionMap[name](data, ...args, 'manager'));
    } else{
      setManagerFilter((isFiltered ? filterKeyData(ProjFilter, 'manager') : objDefaultFilter['manager']));
    };
  } else {
    setManagerFilter(set1DataFilter(data, 'director', newDirector, 'manager'));
  }
};


// MANAGER
export const handleManager = (newManager, filterData, setManager) => {
  setManager(newManager);
  if (newManager === 'All' || !newManager) {
    setManager('All');
    filterData['manager'] = 'All';
  };
};