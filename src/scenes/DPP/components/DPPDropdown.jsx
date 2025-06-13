import { React, useMemo, useState } from "react";
import { Box, Grid } from '@mui/material';
import Dropdown from "../../../common-components/Dropdown";
import RadioButton from "../../../common-components/RadioButton";
import { statusList, usageList, UpdateFields, handlePortfolio, handleVP, handleDirector, handleManager, handleStatus, handleRange } from "./HandleDropdowns";
import { getSortDataForDropdown } from "../../../utils";


const DPPDropdown = ({ input, port, selectVP, selectDirector, selectManager, copilotStatus, usageDays, setPort, setVP, setDirector, setManager, setCopilotStatus, setUsageDays, setDataState, theme, colors }) => {


  const objDefaultFilter = getSortDataForDropdown(input, ["portfolio", "vp", "director", "manager"]);
  const [ VPFilter, setVPFilter ] = useState(objDefaultFilter["vp"]);
  const [ DirectorFilter, setDirectorFilter ] = useState(objDefaultFilter["director"]);
  const [ ManagerFilter, setManagerFilter ] = useState(objDefaultFilter["manager"]);


  // Filter Data
  var filterData = useMemo(() => UpdateFields(port, selectVP, selectDirector, selectManager),
  [port, selectVP, selectDirector, selectManager]);
  
  const handleChangePort = (_event, newPort) => {
    handlePortfolio(newPort, input, objDefaultFilter, setPort, setVP, setDirector, setManager, setCopilotStatus,  setVPFilter, setDirectorFilter, setManagerFilter, setDataState);
  };

  const handleChangeVP = (_event, newVP) => {
    handleVP(newVP, input, objDefaultFilter, port, setVP, setDirector, setManager, setCopilotStatus, setDirectorFilter, setManagerFilter, setDataState);
  };

  const handleChangeDirector = (_event, newDirector) => {
    handleDirector(newDirector, input, objDefaultFilter, filterData, setDirector, setManager, setCopilotStatus, setManagerFilter, setDataState);
  };

  const handleChangeManager = (_event, newManager) => {
    handleManager(newManager, filterData, setManager, setCopilotStatus, setDataState);
  };

  const handleChangeStatus = (_event, newStatus) => {
    handleStatus(newStatus, setCopilotStatus);
  };

  const handleUsageRange = (_event, newValue) => {
    handleRange(newValue, setUsageDays);
  };


  return (
    <Box
      display="flex"
      marginBottom="40px"
      sx={{
        backgroundColor: colors.primary[400],
        width: '100%',
        height: 'auto',
        filter: "drop-shadow(0px 4px 3px rgba(0, 0, 0, 0.2))",
        borderRadius: '8px'
      }}
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
        <Dropdown
          title="Status"
          subtitle="Status"
          options={statusList}
          value={copilotStatus}
          handleChange={handleChangeStatus}
          theme={theme}
          colors={colors}
        />
        <RadioButton
          title="Copilot Report Range"
          value={usageDays}
          name={["28", "90"]}
          label={usageList}
          handleChange={handleUsageRange}
          colors={colors}
        />
      </Grid>
    </Box>
  );
};

export default DPPDropdown;