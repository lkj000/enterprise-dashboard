import { React, useState } from 'react';
import { Box } from '@mui/material';
import XrayChart from './charts/XrayChart';
import XrayDropdown from './XrayDropdown';
import XrayTable from './XrayTable';
import { barChartNames } from './charts/ChartData';


const XrayMain = ({ data, theme, colors }) => {


  const [ port, setPort ] =  useState('All');
  const [ selectVP, setSelectVP ] = useState('All');
  const [ director, setDirector ] = useState('All');
  const [ owner, setOwner ] = useState('All');
  const [ selectAppcode, setSelectAppcode ] = useState('All');
  const [ showCol, setShowCol ] = useState(false);
  const [ graphData, setGraphData ] = useState(barChartNames['Common'] || []);


   
  return (
    <Box>
      <XrayDropdown
        input={data}
        port={port}
        setPort={setPort}
        selectVP={selectVP}
        setSelectVP={setSelectVP}
        director={director}
        setDirector={setDirector}
        owner={owner}
        setOwner={setOwner}
        selectAppcode={selectAppcode}
        setSelectAppcode={setSelectAppcode}
        showCol={showCol}
        setShowCol={setShowCol}
        setGraphData={setGraphData}
        theme={theme}
        colors={colors}
      />

      <XrayChart graphData={graphData} />

      <XrayTable
        input={data}
        port={port}
        selectVP={selectVP}
        director={director}
        owner={owner}
        selectAppcode={selectAppcode}
        showCol={showCol}
      />
    </Box>
  );
};

export default XrayMain;