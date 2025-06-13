import { React, useMemo, useState } from "react";
import { Box, Grid } from '@mui/material';
import Dropdown from "../../../common-components/Dropdown";
import { getSortDataForDropdown } from "../../../utils";
import { UpdateFields, handlePortfolio, handleVP, handleDirector, handleOwner, handleAppcode } from "./HandleDropdowns";


const GCPDropdown = ({ input, port, vp, director, owner, appcode, setPort, setVP, setDirector, setOwner, setAppcode, setChartState, theme, colors }) => {


  const objDefaultFilter = getSortDataForDropdown(input, ["Portfolio", "Department", "Team", "AppOwner", "AppCode"]);
  const [ VPFilter, setVPFilter ] = useState(objDefaultFilter["Department"]);
  const [ DirectorFilter, setDirectorFilter ] = useState(objDefaultFilter["Team"]);
  const [ AppOwnerFilter, setAppOwnerFilter ] = useState(objDefaultFilter["AppOwner"]);
  const [ AppcodeFilter, setAppcodeFilter ] = useState(objDefaultFilter["AppCode"]);


  // Filter Data
  var filterData = useMemo(() => UpdateFields(port, vp, director, owner, appcode),
  [port, vp, director, owner, appcode]);

  
  const handleChangePort = (_event, newPort) => {
    handlePortfolio(newPort, input, objDefaultFilter, setPort, setVP, setDirector, setOwner, setAppcode, setChartState, setVPFilter, setDirectorFilter, setAppOwnerFilter, setAppcodeFilter);
  };

  const handleChangeVP = (_event, newVP) => {
    handleVP(newVP, input, objDefaultFilter, port, setVP, setDirector, setOwner, setAppcode, setChartState, setDirectorFilter, setAppOwnerFilter, setAppcodeFilter);
  };

  const handleChangeDirector = (_event, newDirector) => {
    handleDirector(newDirector, input, objDefaultFilter, filterData, setDirector, setOwner, setAppcode, setChartState, setAppOwnerFilter, setAppcodeFilter);
  };

  const handleChangeOwner = (_event, newOwner) => {
    handleOwner(newOwner, input, objDefaultFilter, filterData, setOwner, setAppcode, setChartState, setAppcodeFilter);
  };

  const handleChangeAppcode = (_event, newAppcode) => {
    handleAppcode(newAppcode, filterData, setAppcode, setChartState);
  };


  return (
    <Box
      display="flex"
      marginBottom="40px"
      sx={{
        backgroundColor: colors.primary[400],
        width: '100%',
        height: 'auto',
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.7)',
        borderRadius: '8px'
      }}
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
          value={vp}
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
          options={AppcodeFilter}
          value={appcode}
          handleChange={handleChangeAppcode}
          theme={theme}
          colors={colors}
        />

      </Grid>
    </Box>
  );
};

export default GCPDropdown;
