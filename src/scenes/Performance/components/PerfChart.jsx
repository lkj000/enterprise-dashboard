import { React } from "react";
import { Box } from '@mui/material';
import ScatterPlotChart from "../../../components/ScatterPlotChart";
import { legendData } from "./ChartData";


const PerfChart = ({ graphData, colors }) => {


  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={{ positionLeft: 15 }}
    >
      <ScatterPlotChart data={graphData} legendData={legendData} colors={colors} />
    </Box>
  );
};

export default PerfChart;