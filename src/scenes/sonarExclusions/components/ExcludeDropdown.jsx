import { React, useState, useMemo } from "react";
import { Box, Grid } from '@mui/material';
import Dropdown from "../../../common-components/Dropdown";
import { UpdateFields, handlePortfolio, handleDept, handleOwner, handleCode } from "./HandleDropdowns";
import { objDefaultFilter } from "../requests";


const ExcludeDropdown = ({ input, port, dept, selectOwner, selectCode, setPort, setDept, setAppOwner, setAppCode, theme, colors}) => {

  const [ VPFilter, setVPFilter ] = useState(objDefaultFilter["Department"]);
  const [ OwnerFilter, setOwnerFilter ] = useState(objDefaultFilter["AppOwner"]);
  const [ CodeFilter, setCodeFilter ] = useState(objDefaultFilter["AppCode"]);


  // Filter Data
  var filterData = useMemo(() => UpdateFields(port, dept, selectOwner, selectCode),
    [port, dept, selectOwner, selectCode]
  );

  const handleChangePort = (_event, newPort) => {
    handlePortfolio(newPort, input, objDefaultFilter, setPort, setDept, setAppOwner, setAppCode, setVPFilter, setOwnerFilter, setCodeFilter);
  };

  const handleChangeDept = (_event, newDept) => {
    handleDept(newDept, input, objDefaultFilter, port, setDept, setAppOwner, setAppCode, setOwnerFilter, setCodeFilter);
  };

  const handleChangeOwner = (_event, newOwner) => {
    handleOwner(newOwner, input, objDefaultFilter, filterData, setAppOwner, setAppCode, setCodeFilter);
  };

  const handleChangeCode = (_event, newCode) => {
    handleCode(newCode, filterData, setAppCode);
  };


  return (
    <Box
      display="flex"
      marginBottom="40px"
      sx={{
        backgroundColor: colors.primary[400],
        width: "100%",
        height: "auto",
        filter: "drop-shadow(0px 4px 3px rgba(0, 0, 0, 0.2))",
        borderRadius: "8px"
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
          value={dept}
          handleChange={handleChangeDept}
          theme={theme}
          colors={colors}
        />
        <Dropdown
          title="App Owner"
          subtitle="App Owner"
          options={OwnerFilter}
          value={selectOwner}
          handleChange={handleChangeOwner}
          theme={theme}
          colors={colors}
        />
        <Dropdown
          title="App Code"
          subtitle="App Code"
          options={CodeFilter}
          value={selectCode}
          handleChange={handleChangeCode}
          theme={theme}
          colors={colors}
        />
      </Grid>
    </Box>
  );
}

export default ExcludeDropdown;