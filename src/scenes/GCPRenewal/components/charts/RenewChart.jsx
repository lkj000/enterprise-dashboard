import { React } from "react";
import { Box } from '@mui/material';
import BarChartUser from "../../../../components/BarChartUser";
import { getExpireData, colors } from "./ChartInfo";


const RenewChart = ({ input, expireDays, chartState }) => {

  const chartData = getExpireData(input, expireDays, chartState);


  return (
    <Box>
      {chartData.length > 0 && (
      <div style={{ height: 500, position: "relative", marginTop: "50px" }}>
        <BarChartUser data={chartData} dataIndex="Range" dataKeys={["Count"]} mode="stacked" layout="vertical" marginCss={[20, 130, 190, 50]} colorType={colors} legendX="Expiration" legendY="" XaxisRotate={-60} legendXOffset={160} translateX={115} topValue={true} label={false} />
      </div> )}
    </Box>
  );
}

export default RenewChart;