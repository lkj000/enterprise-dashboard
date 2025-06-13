import {React, useMemo} from "react";
import {Box, Grid} from '@mui/material';
import Dropdown from "../../../common-components/Dropdown";
import { set1DataFilter, set2DataFilter, set3DataFilter, handleDropdownFilter } from "../../../utils";
import { objDefaultFilter, barCommon, barInfo } from "../requests";


const SonarDropdown = ({ input, port, setPort, dept, setDept, selectAppowner, setAppowner, selectAppcode, setAppcode, DeptFilter, setDeptFilter, OwnerFilter, setOwnerFilter, AppcodeFilter, setAppcodeFilter, setBarData, theme, colors}) => {


  // Based on the dropdown
  var functionMap = useMemo(() => ({
    "set1DataFilter": set1DataFilter,
    "set2DataFilter": set2DataFilter,
    "set3DataFilter": set3DataFilter
  }), []);

  var filterData = useMemo(() => ({
    Portfolio: port,
    Department: dept,
    appOwner: selectAppowner,
    appCode: selectAppcode
  }), [port, dept, selectAppowner, selectAppcode]);



  // PORTFOLIO
  const handleChangePort = (event, newPort) => {
    setPort(newPort);
    setDept('All');
    setAppowner('All');
    setAppcode('All');

    if(newPort === 'All' || !newPort){
      setPort('All');
      setBarData(barCommon);
      setDeptFilter(objDefaultFilter['Department']);
      setOwnerFilter(objDefaultFilter['appOwner']);
      setAppcodeFilter(objDefaultFilter['appCode']);
    }else{
      setBarData(barInfo[newPort]);
      setDeptFilter(set1DataFilter(input, 'Portfolio', newPort, 'Department'));
      setOwnerFilter(set1DataFilter(input, 'Portfolio', newPort, 'appOwner'));
      setAppcodeFilter(set1DataFilter(input, 'Portfolio', newPort, 'appCode'));
    }
  }

  // DEPARTMENT
  const handleChangeDept = (event, newDept) => {
    setDept(newDept);
    setAppowner('All');
    setAppcode('All');

    if(newDept === 'All' || !newDept){
      setDept('All');
      if(port !== 'All' && port){
        setOwnerFilter(set1DataFilter(input, 'Portfolio', port, 'appOwner'));
        setAppcodeFilter(set1DataFilter(input, 'Portfolio', port, 'appCode'));
      }else{
        setOwnerFilter(objDefaultFilter['appOwner']);
        setAppcodeFilter(objDefaultFilter['appCode']);
      }
    }else{
      setOwnerFilter(set1DataFilter(input, 'Department', newDept, 'appOwner'));
      setAppcodeFilter(set1DataFilter(input, 'Department', newDept, 'appCode'));
    }
  }

  // APP OWNER
  const handleChangeOwner = (event, newOwner) => {
    setAppowner(newOwner);
    setAppcode('All');

    if(newOwner === 'All' || !newOwner){
      setAppowner('All');
      filterData['appOwner'] = 'All';
    } else{
      filterData['appOwner'] = newOwner;
    }
    filterData['appCode'] = 'All';
    const [args, name] = handleDropdownFilter(filterData);
    if(args.length > 0) {
      setAppcodeFilter(functionMap[name](input, ...args, 'appCode'));
    }else {
      setAppcodeFilter(objDefaultFilter['appCode']);
    }
  }

  // APP CODE
  const handleChangeAppcode = (event, newAppcode) => {
    setAppcode(newAppcode);

    if(newAppcode === 'All' || !newAppcode){
      setAppcode('All');
      filterData['appCode'] = 'All';
    }
  }


  return (
    <Box>
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
              value={selectAppowner}
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
        </Grid>
      </Box>
    </Box>
  );
}

export default SonarDropdown;