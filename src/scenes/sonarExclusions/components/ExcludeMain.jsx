import { React, useState } from "react";
import { Box } from '@mui/material';
import ExcludeDropdown from "./ExcludeDropdown";
import ExcludeTable from "./ExcludeTable";


const ExcludeMain = ({ data, theme, colors }) => {
  
  const [ port, setPort ] = useState('All');
  const [ dept, setDept ] = useState('All');
  const [ selectOwner, setAppOwner ] = useState('All');
  const [ selectCode, setAppCode ] = useState('All');


  return (
    <Box>
      <ExcludeDropdown
        input={data}
        port={port}
        dept={dept}
        selectOwner={selectOwner}
        selectCode={selectCode}
        setPort={setPort}
        setDept={setDept}
        setAppOwner={setAppOwner}
        setAppCode={setAppCode}
        theme={theme}
        colors={colors}
      />
       <ExcludeTable
        input={data}
        port={port}
        dept={dept}
        selectOwner={selectOwner}
        selectCode={selectCode}
      />
    </Box>
  );
};

export default ExcludeMain;