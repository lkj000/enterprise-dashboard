import { React, useState } from "react";
import { Box } from '@mui/material';
import DPPDropdown from "./DPPDropdown";
import DPPTable from "./tables/DPPTable";
import TileCard from "./tiles/TileCard";


const CommonDPP = ({ data, usage, theme, colors }) => { 
    
  const [ port, setPort ] = useState("All");
  const [ selectVP, setVP ] = useState("All");
  const [ selectDirector, setDirector ] = useState("All");
  const [ selectManager, setManager] = useState("All");
  const [ copilotStatus, setCopilotStatus ] = useState("All");
  const [ usageDays, setUsageDays ] = useState("28");
  const [ dataState, setDataState ] = useState('common');


  return (
    <Box>
      <DPPDropdown
        input={data}
        port={port}
        selectVP={selectVP}
        selectDirector={selectDirector}
        selectManager={selectManager}
        copilotStatus={copilotStatus}
        usageDays={usageDays}
        setPort={setPort}
        setVP={setVP}
        setDirector={setDirector}
        setManager={setManager}
        setCopilotStatus={setCopilotStatus}
        setUsageDays={setUsageDays}
        setDataState={setDataState}
        theme={theme}
        colors={colors}
      />

      <TileCard input={data} usage={usage} usageDays={usageDays} dataState={dataState} colors={colors} />

      <DPPTable
        input={data}
        port={port}
        selectVP={selectVP}
        selectDirector={selectDirector}
        selectManager={selectManager}
        copilotStatus={copilotStatus}
        theme={theme}
      />
    </Box>
  );
}

export default CommonDPP;