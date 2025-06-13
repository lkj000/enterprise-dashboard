import { React } from "react";
import { Box } from '@mui/material';
import CoPilotBarChart from "../../../../components/CoPilotBarChart";
import { getChartData, graphColor } from "./ChartInfo";


const GCPChart = ({ input, chartState }) => {

  const { chartData, graphKey } = getChartData(input, chartState);


  return (
    <Box>
      {chartData.length > 0 && (
      <div style={{ height: 500, position: "relative", marginTop: "50px" }}>
        <CoPilotBarChart data={chartData} dataIndex="id" dataKeys={graphKey} mode="stacked" layout="vertical" marginCss={[20, 155, 190, 90]} colorType={graphColor} legendX="Environment" legendY="Data Classification" XaxisRotate={-60} legendXOffset={110} translateX={140} topValue={true} label={true} legendAuto={true} />
      </div> )}
    </Box>
  );
}

export default GCPChart;