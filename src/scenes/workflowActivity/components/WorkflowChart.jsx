import { React } from "react";
import { Box } from '@mui/material';
import ChartBox from "../../../common-components/ChartBox";
import GroupedBarChart from "../../../components/GroupedBarChart";
import { chartData, chartStyle } from "../requests";


const WorkflowChart = ({ colors }) => {


  return (
    <Box m="-40px 0 40px 0">
      <ChartBox title="Automation User History" colors={colors}>
        <div style={chartStyle.chart1}>
          <GroupedBarChart data={chartData} dataIndex="date" dataKeys={["Automation Users","Other Users"]} mode="stacked" layout="vertical" marginCss={[20,130,120,80]} colorType={['#50C878','#377eb8','#E35335']} legendX="Date" legendY="" XaxisRotate={-25} legendXOffset={100} translateX={113} topValue={true} label={true}/>
        </div>
      </ChartBox>
    </Box>
  );
};

export default WorkflowChart;