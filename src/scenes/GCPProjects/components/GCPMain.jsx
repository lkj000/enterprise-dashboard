import { React, useState } from "react";
import { Box } from '@mui/material';
import GCPChart from "./charts/GCPChart";
import GCPDropdown from "./GCPDropdown";
import GCPTable from "./GCPTable";


const GCPMain = ({ data, lastRun, theme, colors }) => {

  const [ port, setPort ] = useState('All');
  const [ vp, setVP ] = useState('All');
  const [ director, setDirector ] = useState('All');
  const [ owner, setOwner ] = useState('All');
  const [ appcode, setAppcode ] = useState('All');
  const [ chartState, setChartState ] = useState('common');


  return (
    <Box>
      <GCPDropdown
        input={data}
        port={port}
        vp={vp}
        director={director}
        owner={owner}
        appcode={appcode}
        setPort={setPort}
        setVP={setVP}
        setDirector={setDirector}
        setOwner={setOwner}
        setAppcode={setAppcode}
        setChartState={setChartState}
        theme={theme}
        colors={colors}
      />

      <GCPChart input={data} chartState={chartState} />

      <GCPTable
        input={data}
        lastRun={lastRun}
        port={port}
        vp={vp}
        director={director}
        owner={owner}
        appcode={appcode}
      />
    </Box>
  );
};

export default GCPMain;