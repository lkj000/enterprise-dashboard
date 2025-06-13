import { React, useState, useMemo } from "react";
import { Grid } from '@mui/material';
import CustomAccordion from "../../../common-components/Accordion/CustomAccordion";
import Dropdown from "../../../common-components/Dropdown";
import { UpdateFields, handleKey, handlePort, handleVP, handleDirector, handleManager } from "./HandleDropdowns";
import { objDefaultFilter, keyOptions, RiskData as input } from "../requests";


const RiskDropdown = ({ projKey, port, selectVP, selectDirector, selectManager, setProjKey, setPort, setVP, setDirector, setManager, theme, colors }) => {

  const [ ProjFilter, setProjFilter ] = useState(input);
  const [ PortFilter, setPortFilter ] = useState(objDefaultFilter['portfolio']);
  const [ VPFilter, setVPFilter ] = useState(objDefaultFilter['vp']);
  const [ DirectorFilter, setDirectorFilter ] = useState(objDefaultFilter['director']);
  const [ ManagerFilter, setManagerFilter ] = useState(objDefaultFilter['manager']);


  // Filter Data
  var filterData = useMemo(() => UpdateFields(port, selectVP, selectDirector, selectManager),
  [port, selectVP, selectDirector, selectManager]);

  const handleChangeKey = (_event, newKey) => {
    handleKey(newKey, setProjKey, setPort, setVP, setDirector, setManager, setProjFilter, setPortFilter, setVPFilter, setDirectorFilter, setManagerFilter);
  };

  const handleChangePort = (_event, newPort) => {
    handlePort(newPort, projKey, ProjFilter, setPort, setVP, setDirector, setManager, setVPFilter, setDirectorFilter, setManagerFilter);
  };

  const handleChangeVP = (_event, newVP) => {
    handleVP(newVP, filterData, projKey, ProjFilter, setVP, setDirector, setManager, setDirectorFilter, setManagerFilter);
  };

  const handleChangeDirector = (_event, newDirector) => {
    handleDirector(newDirector, filterData, projKey, ProjFilter, setDirector, setManager, setManagerFilter);
  };

  const handleChangeManager = (_event, newManager) => {
    handleManager(newManager, filterData, setManager);
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
          title="Project Key"
          subtitle="Project Key"
          options={[...keyOptions]}
          value={projKey}
          handleChange={handleChangeKey}
          theme={theme}
          colors={colors}
        />
        <Dropdown
          title="Portfolio"
          subtitle="Portfolio"
          options={PortFilter}
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
      </Grid>
    </CustomAccordion>
  );
}

export default RiskDropdown;