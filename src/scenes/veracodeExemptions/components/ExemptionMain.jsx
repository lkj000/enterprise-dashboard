import { React, useState } from "react";
import { Box } from '@mui/material';
import ExemptionChart from "./ExemptionChart";
import ExemptionDropdown from "./ExemptionDropdown";
import ExemptionTable from "./ExemptionTable";
import { barCommon, objDefaultFilter } from "../requests";


const ExemptionMain = ({ data, theme, colors }) => {

  const [ port, setPort ] = useState('All');
  const [ dept, setDept ] = useState('All');
  const [ selectOwner, setOwner ] = useState('All');
  const [ selectAppcode, setAppcode ] = useState('All');
  const [ exempType, setExempType ] = useState('All');
  const [ barData, setBarData ] = useState(barCommon);

  // Default Filters
  const [ DeptFilter, setDeptFilter ] = useState(objDefaultFilter["Department"]);
  const [ OwnerFilter, setOwnerFilter ] = useState(objDefaultFilter["appOwner"]);
  const [ AppcodeFilter, setAppcodeFilter ] = useState(objDefaultFilter["appCode"]);
  const [ ExemptionFilter, setExemptionFilter ] = useState(objDefaultFilter["Description"]);



  return (
    <Box>
      <ExemptionChart
        input={data}
        setPort={setPort}
        setDept={setDept}
        setOwner={setOwner}
        setAppcode={setAppcode}
        setExempType={setExempType}
        setDeptFilter={setDeptFilter}
        setOwnerFilter={setOwnerFilter}
        setAppcodeFilter={setAppcodeFilter}
        setExemptionFilter={setExemptionFilter}
        barData={barData}
        setBarData={setBarData}
        colors={colors}
      />
      <ExemptionDropdown
        input={data}
        port={port}
        dept={dept}
        selectOwner={selectOwner}
        selectAppcode={selectAppcode}
        exempType={exempType}
        setPort={setPort}
        setDept={setDept}
        setOwner={setOwner}
        setAppcode={setAppcode}
        setExempType={setExempType}
        DeptFilter={DeptFilter}
        OwnerFilter={OwnerFilter}
        AppcodeFilter={AppcodeFilter}
        ExemptionFilter={ExemptionFilter}
        setDeptFilter={setDeptFilter}
        setOwnerFilter={setOwnerFilter}
        setAppcodeFilter={setAppcodeFilter}
        setExemptionFilter={setExemptionFilter}
        setBarData={setBarData}
        theme={theme}
        colors={colors}
      />

      <ExemptionTable
        input={data}
        port={port}
        dept={dept}
        selectOwner={selectOwner}
        selectAppcode={selectAppcode}
        exempType={exempType}
      />
    </Box>
  );
};

export default ExemptionMain;