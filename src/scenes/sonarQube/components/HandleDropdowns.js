import { sonarData as input, objDefaultFilter } from "../requests";
import { set1DataFilter, handleDropdownFilter } from "../../../utils";

// Filter Functions (Appowner dropdown) - [no property]
const get1DataFilter = (inputData, filterBy, filterValue) => {
  return [...new Set(inputData.filter(item => item[filterBy] === filterValue))].sort();
};
const get2DataFilter = (inputData, filterBy1, filterValue1, filterBy2, filterValue2) => {
  return [...new Set(inputData.filter(item => item[filterBy1] === filterValue1 && item[filterBy2] === filterValue2))].sort();
};
const get3DataFilter = (inputData, filterBy1, filterValue1, filterBy2, filterValue2, filterBy3, filterValue3) => {
  return [...new Set(inputData.filter(item => item[filterBy1] === filterValue1 && item[filterBy2] === filterValue2 && item[filterBy3] === filterValue3))].sort();
};


export const UpdateFields = (port, VP, owner) => {
  return {
    Portfolio: port,
    VP: VP,
    AppOwner: owner
  };
};

//------------------------------------------------------------------------------------//


// PORTFOLIO
export const handlePortfolio = (newPort, setPort, setVP, setOwner, setVPFilter, setOwnerFilter, setTilesData) => {
  setPort(newPort);
  setVP('All');
  setOwner('All');

  if (newPort === "All" || !newPort) {
    setPort('All');
    setVPFilter(objDefaultFilter['VP']);
    setOwnerFilter(objDefaultFilter['AppOwner']);
    setTilesData([]);
  } else {
    setVPFilter(set1DataFilter(input, 'Portfolio', newPort, 'VP'));
    setOwnerFilter(set1DataFilter(input, 'Portfolio', newPort, 'AppOwner'));
    setTilesData(input.filter(item => item.Portfolio === newPort));
  }
};


// VP
export const handleVP = (newVP, port, setVP, setOwner, setOwnerFilter, setTilesData) => {
  setVP(newVP);
  setOwner('All');

  if (newVP === "All" || !newVP) {
    setVP('All');
    if (port === "All" || !port) {
      setOwnerFilter(objDefaultFilter['AppOwner']);
      setTilesData([]);
    } else{
      setOwnerFilter(set1DataFilter(input, 'Portfolio', port, 'AppOwner'));
      setTilesData(input.filter(item => item.Portfolio === port));
    };
  } else {
    setOwnerFilter(set1DataFilter(input, 'VP', newVP, 'AppOwner'));
    setTilesData(input.filter(item => item.VP === newVP));
  }
};


// APP OWNER
export const handleOwner = (newOwner, filterData, setOwner, setTilesData) => {
  setOwner(newOwner);
  if (newOwner === "All" || !newOwner) {
    setOwner('All');
    filterData.AppOwner = 'All';
  } else {
    filterData.AppOwner = newOwner;
  }
  const [args] = handleDropdownFilter(filterData);
  if (args.length > 0) {
    const divLength = args.length / 2;
    const tilesData = divLength === 3 ? get3DataFilter(input, ...args) : 
      divLength === 2 ? get2DataFilter(input, ...args) : get1DataFilter(input, ...args);
    setTilesData(tilesData);
  } else {
    setTilesData([]);
  };
};