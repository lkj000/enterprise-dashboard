import { React } from 'react';
import { Box } from '@mui/material';
import BarChartUser from "../../../../components/BarChartUser";
import { colors } from "./ChartData";


const XrayChart = ({ graphData }) => {



  return (
    <Box>
      {graphData.length > 0 && (
      <div style={{ height: 500, position: "relative", marginTop: "50px" }}>
        <BarChartUser data={graphData} dataIndex="id" dataKeys={["Total"]} mode="stacked" layout="vertical" marginCss={[20, 130, 190, 50]} colorType={colors} legendX="Severity" legendY="" XaxisRotate={-90} legendXOffset={160} translateX={115} topValue={true} label={false} />
      </div>)}
    </Box>
  );
};

export default XrayChart;