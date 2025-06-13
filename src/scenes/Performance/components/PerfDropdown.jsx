import { React, useState } from "react";
import { Box, Grid } from '@mui/material';
import Dropdown from "../../../common-components/Dropdown";
import { set1DataFilter } from "../../../utils";
import { objDefaultFilter } from "../requests";
import { getChartData, allChartData, portChartData, archChartData } from "./ChartData";


const PerfDropdown = ({ input, port, arctype, setPort, setArcType, setGraphData, theme, colors }) => {

  const [ ArcFilter, setArcFilter ] = useState(objDefaultFilter['archetype']);


  // PORTFOLIO
  const handleChangePort = (event, newPort) => {
    setPort(newPort);
    setArcType('All');
    if(newPort === 'All' || !newPort) {
      setPort('All');
      setGraphData(allChartData);
      setArcFilter(objDefaultFilter['archetype']);
    } else {
      setGraphData(portChartData[newPort] ?? []);
      setArcFilter(set1DataFilter(input, 'Portfolio', newPort, 'archetype'));
    }
  };

  // ARCHETYPE
  const handleChangeArcType = (event, newArcType) => {
    setArcType(newArcType);
    if(newArcType === 'All' || !newArcType) {
      setArcType('All');
      setGraphData((port && port !== 'All') ? (portChartData[port] ?? []) : allChartData);
    } else {
      setGraphData((port && port !== 'All') ? getChartData(input.filter(item => item.Portfolio === port && item.archetype === newArcType) ?? [])
       : (archChartData[newArcType] ?? []));
    }
  };



  return (
    <Box
      display="flex"
      marginBottom="40px"
      sx={{
        width: '100%',
        height: 'auto'
      }}
    >                
      <Grid container>
        <Dropdown
          title="Portfolio"
          subtitle="Portfolio"
          options={objDefaultFilter['Portfolio']}
          value={port}
          handleChange={handleChangePort}
          theme={theme}
          colors={colors}
        />
        <Dropdown
          title="Archetype"
          subtitle="Archetype"
          options={ArcFilter}
          value={arctype}
          handleChange={handleChangeArcType}
          theme={theme}
          colors={colors}
        />
      </Grid>
    </Box>
  );
};

export default PerfDropdown;