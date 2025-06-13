import { React, useMemo } from "react";
import { Box, Grid } from '@mui/material';
import Dropdown from "../../../common-components/Dropdown";
import { UpdateFields, handlePort, handleDept, handleOwner, handleAppcode, handleExemption } from "./HandleDropdowns";
import { objDefaultFilter } from "../requests";


const ExemptionDropdown = ({ input, port, dept, selectOwner, selectAppcode, exempType, setPort, setDept, setOwner, setAppcode, setExempType, DeptFilter, OwnerFilter, AppcodeFilter, ExemptionFilter, setDeptFilter, setOwnerFilter, setAppcodeFilter, setExemptionFilter, setBarData, theme, colors}) => {


  // Filter Data
  var filterData = useMemo(() => UpdateFields(port, dept, selectOwner, selectAppcode, exempType),
  [port, dept, selectOwner, selectAppcode, exempType]);


  const handleChangePort = (_event, newPort) => {
    handlePort(newPort, input, setPort, setDept, setOwner, setAppcode, setExempType, setDeptFilter, setOwnerFilter, setAppcodeFilter, setExemptionFilter, setBarData);
  };

  const handleChangeDept = (_event, newDept) => {
    handleDept(newDept, input, port, setDept, setOwner, setAppcode, setExempType, setOwnerFilter, setAppcodeFilter, setExemptionFilter);
  };

  const handleChangeOwner = (_event, newOwner) => {
    handleOwner(newOwner, input, filterData, setOwner, setAppcode, setExempType, setAppcodeFilter, setExemptionFilter);
  };

  const handleChangeAppcode = (_event, newAppcode) => {
    handleAppcode(newAppcode, input, filterData, setAppcode, setExempType, setExemptionFilter);
  };

  const handleChangeExemption = (_event, newExemption) => {
    handleExemption(newExemption, filterData, setExempType);
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
    }}>                
      <Grid container>
        <Dropdown
          title="Portfolio"
          subtitle="Portfolio"
          options={objDefaultFilter['Portfolio']}
          value={port}
          handleChange={handleChangePort}
          theme={theme}
          colors={colors}
        />
        <Dropdown
          title="Department"
          subtitle="Department"
          options={DeptFilter}
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
          options={AppcodeFilter}
          value={selectAppcode}
          handleChange={handleChangeAppcode}
          theme={theme}
          colors={colors}
        />
        <Dropdown
          title="Exemption Type"
          subtitle="Exemption Type"
          options={ExemptionFilter}
          value={exempType}
          handleChange={handleChangeExemption}
          theme={theme}
          colors={colors}
        />
      </Grid>
    </Box>
  );
}

export default ExemptionDropdown;