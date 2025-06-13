import { React, useState } from "react";
import { Box } from '@mui/material';
import PerfDropdown from "./PerfDropdown";
import PerfChart from "./PerfChart";
import PerfTable from "./PerfTable";
import { allChartData } from "./ChartData";


const PerfActivity = ({ data, theme, colors }) => {

  const [ port, setPort ] = useState('All');
  const [ arctype, setArcType ] = useState('All');
  const [ graphData, setGraphData ] = useState(allChartData);


  return (
    <Box>
      <PerfDropdown
        input={data}
        port={port}
        arctype={arctype}
        setPort={setPort}
        setArcType={setArcType}
        setGraphData={setGraphData}
        theme={theme}
        colors={colors}
      />
      <PerfChart graphData={graphData} colors={colors} />
      <PerfTable
        input={data}
        port={port}
        arctype={arctype}
        colors={colors}
      />
    </Box>
  );
};

export default PerfActivity;