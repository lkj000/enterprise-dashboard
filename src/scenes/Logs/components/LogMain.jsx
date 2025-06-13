import { React, useState } from "react";
import { Box } from '@mui/material';
import LogDropdown from "./LogDropdown";
import LogTable from "./LogTable";


const LogMain = ({ data, lastRun, theme, colors }) => {


  const [ port, setPort ] = useState('All');
  const [ selectVP, setVP ] = useState('All');
  const [ selectDirector, setDirector ] = useState('All');
  const [ userID, setUserID ] = useState('All');


  return (
    <Box>
      <LogDropdown
        input={data}
        port={port}
        setPort={setPort}
        selectVP={selectVP}
        setVP={setVP}
        selectDirector={selectDirector}
        setDirector={setDirector}
        userID={userID}
        setUserID={setUserID}
        theme={theme}
        colors={colors}
      />
      
      <LogTable
        lastRun={lastRun}
        input={data}
        port={port}
        selectVP={selectVP}
        selectDirector={selectDirector}
        userID={userID}
      />
    </Box>
  );
};

export default LogMain;