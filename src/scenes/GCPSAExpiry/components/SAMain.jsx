import { React, useState } from "react";
import { Box } from '@mui/material';
import SAChart from "./charts/SAChart";
import SADropdown from "./SADropdown";
import SATable from "./SATable";


const SAMain = ({ data, lastRun, theme, colors }) => {

  const [ port, setPort ] = useState('All');
  const [ vp, setVP ] = useState('All');
  const [ director, setDirector ] = useState('All');
  const [ owner, setOwner ] = useState('All');
  const [ appcode, setAppcode ] = useState('All');
  const [ expireDays, setExpireDays ] = useState('All');
  const [ chartState, setChartState ] = useState('common');


  return (
    <Box>
      <SADropdown
        input={data}
        port={port}
        vp={vp}
        director={director}
        owner={owner}
        appcode={appcode}
        expireDays={expireDays}
        setPort={setPort}
        setVP={setVP}
        setDirector={setDirector}
        setOwner={setOwner}
        setAppcode={setAppcode}
        setExpireDays={setExpireDays}
        setChartState={setChartState}
        theme={theme}
        colors={colors}
      />

      <SAChart input={data} expireDays={expireDays} chartState={chartState} />

      <SATable
        input={data}
        lastRun={lastRun}
        port={port}
        vp={vp}
        director={director}
        owner={owner}
        appcode={appcode}
        expireDays={expireDays}
      />
    </Box>
  );
};

export default SAMain;