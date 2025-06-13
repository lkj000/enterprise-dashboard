import { React, useState } from "react";
import { Box } from '@mui/material';
import SonarChart from "./SonarChart";
import SonarDropdown from "./SonarDropdown";
import SonarTable from "./SonarTable";
import { objDefaultFilter, barCommon } from "../requests";

const SonarCard = ({ data, theme, colors }) => {
  
  const [ port, setPort ] = useState('All');
  const [ dept, setDept ] = useState('All');
  const [ selectAppowner, setAppowner ] = useState('All');
  const [ selectAppcode, setAppcode ] = useState('All');
  const [ barData, setBarData ] = useState(barCommon);
  const [ DeptFilter, setDeptFilter ] = useState(objDefaultFilter['Department']);
  const [ OwnerFilter, setOwnerFilter ] = useState(objDefaultFilter['appOwner']);
  const [ AppcodeFilter, setAppcodeFilter ] = useState(objDefaultFilter['appCode']);



  return (
    <Box>
      <SonarChart
        input={data}
        barData={barData}
        setPort={setPort}
        setDept={setDept}
        setAppowner={setAppowner}
        setAppcode={setAppcode}
        setDeptFilter={setDeptFilter}
        setOwnerFilter={setOwnerFilter}
        setAppcodeFilter={setAppcodeFilter}
        setBarData={setBarData}
        colors={colors}
      />
      <SonarDropdown
        input={data}
        port={port}
        setPort={setPort}
        dept={dept}
        setDept={setDept}
        selectAppowner={selectAppowner}
        setAppowner={setAppowner}
        selectAppcode={selectAppcode}
        setAppcode={setAppcode}
        DeptFilter={DeptFilter}
        setDeptFilter={setDeptFilter}
        OwnerFilter={OwnerFilter}
        setOwnerFilter={setOwnerFilter}
        AppcodeFilter={AppcodeFilter}
        setAppcodeFilter={setAppcodeFilter}
        setBarData={setBarData}
        theme={theme}
        colors={colors}
      />
       <SonarTable
        input={data}
        port={port}
        dept={dept}
        selectAppowner={selectAppowner}
        selectAppcode={selectAppcode}
      />
    </Box>
  );
};

export default SonarCard;