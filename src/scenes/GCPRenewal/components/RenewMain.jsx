import { React, useState } from "react";
import { Box } from '@mui/material';
import RenewChart from "./charts/RenewChart";
import RenewDropdown from "./RenewDropdown";
import RenewTable from "./RenewTable";


const RenewMain = ({ data, lastRun, theme, colors }) => {

  const [ port, setPort ] = useState('All');
  const [ vp, setVP ] = useState('All');
  const [ director, setDirector ] = useState('All');
  const [ owner, setOwner ] = useState('All');
  const [ appcode, setAppcode ] = useState('All');
  const [ expireDays, setExpireDays ] = useState('All');
  const [ chartState, setChartState ] = useState('common');


  return (
    <Box>
      <RenewDropdown
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

      <RenewChart input={data} expireDays={expireDays} chartState={chartState} />

      <RenewTable
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

export default RenewMain;