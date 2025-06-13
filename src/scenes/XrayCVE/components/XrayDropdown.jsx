import { React, useState, useMemo } from "react";
import { Box, Grid } from '@mui/material';
import Dropdown from "../../../common-components/Dropdown";
import ToggleSwitch from "../../../common-components/ToggleSwitch";
import { set1DataFilter, handleDropdownFilter } from "../../../utils";
import { barChartNames } from "./charts/ChartData";
import { objDefaultFilter, functionMap, UpdateFields } from "../requests";


const XrayDropdown = ({ input, port, setPort, selectVP, setSelectVP, director, setDirector, owner, setOwner, selectAppcode, setSelectAppcode, showCol, setShowCol, setGraphData, theme, colors}) => {


  const [ VPFilter, setVPFilter ] = useState(objDefaultFilter['VP']);
  const [ DirectorFilter, setDirectorFilter ] = useState(objDefaultFilter['Director']);
  const [ AppOwnerFilter, setAppOwnerFilter ] = useState(objDefaultFilter['AppOwner']);
  const [ AppCodeFilter, setAppCodeFilter ] = useState(objDefaultFilter['AppCode']);


  // Filter Data
  var filterData = useMemo(() => UpdateFields(port, selectVP, director, owner, selectAppcode),
  [port, selectVP, director, owner, selectAppcode]);


  // PORTFOLIO
  const handleChangePort = (event, newPort) => {
    setPort(newPort);
    setSelectVP('All');
    setDirector('All');
    setOwner('All');
    setSelectAppcode('All');

    if(newPort === 'All' || !newPort) {
      setPort('All');
      setGraphData(barChartNames['Common'] || []);
      setVPFilter(objDefaultFilter['VP']);
      setDirectorFilter(objDefaultFilter['Director']);
      setAppOwnerFilter(objDefaultFilter['AppOwner']);
      setAppCodeFilter(objDefaultFilter['AppCode']);
    } else {
      setGraphData(barChartNames['Portfolio'][newPort] || []);
      setVPFilter(set1DataFilter(input, 'Portfolio', newPort, 'VP'));
      setDirectorFilter(set1DataFilter(input, 'Portfolio', newPort, 'Director'));
      setAppOwnerFilter(set1DataFilter(input, 'Portfolio', newPort, 'AppOwner'));
      setAppCodeFilter(set1DataFilter(input, 'Portfolio', newPort, 'AppCode'));
    }
  };


  // VP
  const handleChangeVP = (event, newVP) => {
    setSelectVP(newVP);
    setDirector('All');
    setOwner('All');
    setSelectAppcode('All');

    if(newVP === 'All' || !newVP) {
      setSelectVP('All');

      if(port !== 'All' && port) {
        setGraphData(barChartNames['Portfolio'][port] || []);
        setDirectorFilter(set1DataFilter(input, 'Portfolio', port, 'Director'));
        setAppOwnerFilter(set1DataFilter(input, 'Portfolio', port, 'AppOwner'));
        setAppCodeFilter(set1DataFilter(input, 'Portfolio', port, 'AppCode'));
      } else {
        setGraphData(barChartNames['Common'] || []);
        setDirectorFilter(objDefaultFilter['Director']);
        setAppOwnerFilter(objDefaultFilter['AppOwner']);
        setAppCodeFilter(objDefaultFilter['AppCode']);
      }

    } else {
      setGraphData(barChartNames['VP'][newVP] || []);
      setDirectorFilter(set1DataFilter(input, 'VP', newVP, 'Director'));
      setAppOwnerFilter(set1DataFilter(input, 'VP', newVP, 'AppOwner'));
      setAppCodeFilter(set1DataFilter(input, 'VP', newVP, 'AppCode'));
    }
  };


  // DIRECTOR
  const handleChangeDirector = (event, newDirector) => {
    setDirector(newDirector);
    setOwner('All');
    setSelectAppcode('All');

    if(newDirector === 'All' || !newDirector) {
      setDirector('All');
      const obj = ['Director', 'AppOwner', 'AppCode'];
      obj.forEach(prop => filterData[prop] = 'All');
      const [args, name] = handleDropdownFilter(filterData);

      if(args.length > 0) {
        const tileKey = args[args.length-2];
        const tileValue = args[args.length-1];
        setGraphData(barChartNames[tileKey][tileValue] || []);
        setAppOwnerFilter(functionMap[name](input, ...args, 'AppOwner'));
        setAppCodeFilter(functionMap[name](input, ...args, 'AppCode'));
      } else {
        setGraphData(barChartNames['Common'] || []);
        setAppOwnerFilter(objDefaultFilter['AppOwner']);
        setAppCodeFilter(objDefaultFilter['AppCode']);
      }

    } else {
      setGraphData(barChartNames['Director'][newDirector] || []);
      setAppOwnerFilter(set1DataFilter(input, 'Director', newDirector, 'AppOwner'));
      setAppCodeFilter(set1DataFilter(input, 'Director', newDirector, 'AppCode'));
    }
  };

    
  // APP OWNER
  const handleChangeOwner = (event, newAppOwner) => {
    setOwner(newAppOwner);
    setSelectAppcode('All');

    if(newAppOwner === 'All' || !newAppOwner) {
      setOwner('All');
      filterData.AppOwner = 'All';
    } else {
      filterData.AppOwner = newAppOwner;
    }

    const obj = ['AppCode'];
    obj.forEach(prop => filterData[prop] = 'All');
    const [args, name] = handleDropdownFilter(filterData);
    if(args.length > 0) {
      const tileKey = args[args.length-2];
      const tileValue = args[args.length-1];
      setGraphData(barChartNames[tileKey][tileValue] || []);
      setAppCodeFilter(functionMap[name](input, ...args, 'AppCode'));
    } else {
      setGraphData(barChartNames['Common'] || []);
      setAppCodeFilter(objDefaultFilter['AppCode']);
    }
  };

    
  // APP CODE
  const handleChangeAppcode = (event, newAppcode) => {
    setSelectAppcode(newAppcode);
    if(newAppcode === 'All' || !newAppcode) {
      setSelectAppcode('All');
      filterData['AppCode'] = 'All';

      const args = handleDropdownFilter(filterData)[0];
      if (args.length > 0) {
        const tileKey = args[args.length-2];
        const tileValue = args[args.length-1];
        setGraphData(barChartNames[tileKey][tileValue] || []);
      }else{
        setGraphData(barChartNames['Common'] || []);
      }
    } else {
      setGraphData(barChartNames['AppCode'][newAppcode] || []);
    }
  };


  return (
    <Box
      display="flex"
      marginBottom="40px"
      sx={{ backgroundColor: colors.primary[400], width: '100%', height: 'auto', filter: 'drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.2))', borderRadius: '5px' }}
      boxShadow="0px 4px 10px rgba(0, 0, 0, 0.5)"
    >              
      <Grid container>
        <Dropdown
          title="Portfolio"
          subtitle="Portfolio"
          options={objDefaultFilter["Portfolio"]}
          value={port}
          handleChange={handleChangePort}
          theme={theme}
          colors={colors}
       />
        <Dropdown
          title="Department"
          subtitle="Department"
          options={VPFilter}
          value={selectVP}
          handleChange={handleChangeVP}
          theme={theme}
          colors={colors}
        />
        <Dropdown
          title="Team"
          subtitle="Team"
          options={DirectorFilter}
          value={director}
          handleChange={handleChangeDirector}
          theme={theme}
          colors={colors}
        />
        <Dropdown
          title="App Owner"
          subtitle="App Owner"
          options={AppOwnerFilter}
          value={owner}
          handleChange={handleChangeOwner}
          theme={theme}
          colors={colors}
        />
        <Dropdown
          title="App Code"
          subtitle="App Code"
          options={AppCodeFilter}
          value={selectAppcode}
          handleChange={handleChangeAppcode}
          theme={theme}
          colors={colors}
        />
        <ToggleSwitch
          title="Details"
          value={showCol}
          handleChange={(value) => setShowCol(value)}
        />

      </Grid>
    </Box>
  );
}

export default XrayDropdown;