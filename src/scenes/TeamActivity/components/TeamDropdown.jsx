import { React, useState, useMemo } from "react";
import { Grid } from '@mui/material';
import CustomAccordion from "../../../common-components/Accordion/CustomAccordion";
import Dropdown from "../../../common-components/Dropdown";
import RadioButton from "../../../common-components/RadioButton";
import ToggleSwitch from "../../../common-components/ToggleSwitch";
import { set1DataFilter, handleDropdownFilter } from "../../../utils";
import { objDefaultFilter, UpdateFields, functionMap } from "../requests";
import { portBarData, vpBarData, dirBarData, manBarData, barChartNames, LineChartNames } from "./chartsInfo/ChartData";


const TeamDropdown = ({ input, port, setPort, selectVP, setVP, selectDirector, setDirector, selectManager, setManager, setColState, setToggleState, setBarData, setLineData, theme, colors }) => { 
    

  const [ VPFilter, setVPFilter ] = useState(objDefaultFilter['vp']);
  const [ DirectorFilter, setDirectorFilter ] = useState(objDefaultFilter['director']);
  const [ ManagerFilter, setManagerFilter ] = useState(objDefaultFilter['manager']);
  const [ viewState, setViewState ] = useState('StoryBased');
  const [ toggleValue, setToggleValue ] = useState(false);

  // Filter Data
  var filterData = useMemo(() => UpdateFields(port, selectVP, selectDirector, selectManager),
  [port, selectVP, selectDirector, selectManager]);


  // PORTFOLIO
  const handleChangePort = (event, newPort) => {
    setPort(newPort);
    setLineData([]);
    setVP('All');
    setDirector('All');
    setManager('All');

    if(newPort === 'All' || !newPort) {
      setPort('All');
      setBarData([]);
      setVPFilter(objDefaultFilter['vp']);
      setDirectorFilter(objDefaultFilter['director']);
      setManagerFilter(objDefaultFilter['manager']);
    }else{
      setBarData(newPort === 'Business' ? [] : (portBarData[newPort] || []));
      setVPFilter(set1DataFilter(input, 'portfolio', newPort, 'vp'));
      setDirectorFilter(set1DataFilter(input, 'portfolio', newPort, 'director'));
      setManagerFilter(set1DataFilter(input, 'portfolio', newPort, 'manager'));
    }
  };


  // VP
  const handleChangeVP = (event, newVP) => {
    setVP(newVP);
    setDirector('All');
    setManager('All');
    
    if(newVP === 'All' || !newVP) {
      setVP('All');
      setLineData([]);
      if (port !== 'All' && port) {
        setBarData(portBarData[port] || []);
        setDirectorFilter(set1DataFilter(input, 'portfolio', port, 'director'));
        setManagerFilter(set1DataFilter(input, 'portfolio', port, 'manager'));
      } else {
        setBarData([]);
        setDirectorFilter(objDefaultFilter['director']);
        setManagerFilter(objDefaultFilter['manager']);
      };
    } else {
      setBarData(vpBarData[newVP] || []);
      setLineData(vpBarData[newVP] || []);
      setDirectorFilter(set1DataFilter(input, 'vp', newVP, 'director'));
      setManagerFilter(set1DataFilter(input, 'vp', newVP, 'manager'));
    }
  };


  // DIRECTOR
  const handleChangeDirector = (event, newDirector) => {
    setDirector(newDirector);
    setManager('All');
    
    if(newDirector === 'All' || !newDirector) {
      setDirector('All');
      const obj = ['director', 'manager'];
      obj.forEach((item) => filterData[item] = 'All');
      const [args, name] = handleDropdownFilter(filterData);
    
      if (args.length > 0) {
        const objKey = args[args.length-2];
        const objValue = args[args.length-1];
        setBarData(barChartNames[objKey][objValue] || []);
        setLineData(LineChartNames[objKey][objValue] || []);
        setManagerFilter(functionMap[name](input, ...args, 'manager'));
      } else {
        setBarData([]);
        setManagerFilter(objDefaultFilter['manager']);
      };
    } else {
      setBarData(dirBarData[newDirector] || []);
      setLineData(dirBarData[newDirector] || []);
      setManagerFilter(set1DataFilter(input, 'director', newDirector, 'manager'));
    }
  };

  
  // MANAGER
  const handleChangeManager = (event, newManager) => {
    setManager(newManager);
    if(newManager === 'All' || !newManager){
      setManager('All');
      filterData['manager'] = 'All';
      const args = handleDropdownFilter(filterData)[0];
      if (args.length > 0) {
        const objKey = args[args.length-2];
        const objValue = args[args.length-1];
        setBarData(barChartNames[objKey][objValue] || []);
        setLineData(LineChartNames[objKey][objValue] || []);
      }else{
        setBarData([]);
      }
    } else {
      const managerData = input.filter(item => item.manager === newManager && item.portfolio !== 'Business');
      setBarData(managerData.length > 0 ? (manBarData[newManager] || []) : []);
      setLineData(managerData.length > 0 ? (manBarData[newManager] || []) : []);
    }
  };


  // VIEW STATE
  const handleView = (event, newView) => {
    setViewState(newView);
    setColState({
      story: newView !== "IssueBased",
      issue: newView !== "StoryBased"
    });
    setToggleState({
      storyPercent: (newView === "StoryBased" || newView === "Mix") && toggleValue,
      issuePercent: (newView === "IssueBased" || newView === "Mix") && toggleValue
    });
  };

  // TOGGLE
  const handleToggle = (newToggle) => {
    setToggleValue(newToggle);
    setToggleState({
      storyPercent: (viewState === "StoryBased" || viewState === "Mix") && newToggle,
      issuePercent: (viewState === "IssueBased" || viewState === "Mix") && newToggle
    })
  };


  return (
    <CustomAccordion
      defaultValue={true}
      title="Filters"
      isDisplay={true}
      stylesInfo={{ marginBottom: '40px'}}
      colors={colors}
    >
      <Grid container>
        <Dropdown
          title="Portfolio"
          subtitle="Portfolio"
          options={objDefaultFilter["portfolio"]}
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
          value={selectDirector}
          handleChange={handleChangeDirector}
          theme={theme}
          colors={colors}
        />
        <Dropdown
          title="Line Managers"
          subtitle="line Manager"
          options={ManagerFilter}
          value={selectManager}
          handleChange={handleChangeManager}
          theme={theme}
          colors={colors}
        />

        {/* VIEW STATE */}
        <RadioButton
          title="Report Level"
          value={viewState}
          name={['StoryBased', 'IssueBased', 'Mix']}
          label={['Story Based', 'Issue Based', 'Mix KPI']}
          handleChange={handleView}
          colors={colors}
        />

        {/* TOGGLE */} 
        <ToggleSwitch
          title="Show Enterprise Info"
          value={toggleValue}
          handleChange={(newToggle) => handleToggle(newToggle)}
        />
      </Grid>
    </CustomAccordion>
  );
}

export default TeamDropdown;