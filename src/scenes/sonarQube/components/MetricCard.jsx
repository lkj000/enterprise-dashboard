import { React, useState } from "react";
import { Box } from '@mui/material';
import GatewayTiles from "./tiles/GatewayTiles";
import MetricDropdown from "./MetricDropdown";
import MetricTable from "./MetricTable";
import MetricTiles from "./tiles/MetricTiles";


const MetricCard = ({ data, theme, colors }) => {

  const [ port, setPort ] = useState('All');
  const [ VP, setVP ] = useState('All');
  const [ owner, setOwner ] = useState('All');
  const [ tilesData, setTilesData ] = useState([]);


  return (
    <Box>
      <GatewayTiles />
      <MetricDropdown
        port={port}
        VP={VP}
        owner={owner}
        setPort={setPort}
        setVP={setVP}
        setOwner={setOwner}
        setTilesData={setTilesData}
        theme={theme}
        colors={colors}
      />
      <MetricTiles data={tilesData} />
      <MetricTable
        input={data}
        port={port}
        VP={VP}
        owner={owner}
        colors={colors}
      />
    </Box>
  );
};

export default MetricCard;