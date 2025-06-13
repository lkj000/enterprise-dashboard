import { React } from "react";
import { Box } from '@mui/material';
import ChartBox from '../../../../common-components/ChartBox';
import CoPilotBarChart from '../../../../components/CoPilotBarChart';
import { getAllChartFiles, getChartData, getGraphKey, ChartStyle } from './ChartInfo';


const ActivityChart = ({ allData, dataState, selectStatus, viewState, colors }) => {

  const chartFileData = getAllChartFiles(allData);
  const chartData = getChartData(chartFileData, viewState, dataState);
  const [ graphKey, graphColor ] = getGraphKey(selectStatus);


  return (
    <Box mb={6}>
      { viewState === 'All' && chartData.length > 0  ? (
        <ChartBox title="CoPilot User Activity" colors={colors}>
          <div style={ChartStyle.chart1}>
            <CoPilotBarChart data={chartData} dataIndex="id" dataKeys={graphKey} mode="stacked" layout="vertical" marginCss={[20, 145, 190, 50]} colorType={graphColor} legendX="Line Managers" legendY="" XaxisRotate={-90} legendXOffset={160} translateX={113} topValue={true} label={true} legendAuto={false} />
          </div>
        </ChartBox>
      ) : null }

      { viewState === 'VP' && chartData.length > 0  ? (
        <ChartBox title="Department Based CoPilot User Activity" colors={colors}>
          <div style={ChartStyle.chart1}>
            <CoPilotBarChart data={chartData} dataIndex="id" dataKeys={graphKey} mode="stacked" layout="vertical" marginCss={[20, 155, 190, 50]} colorType={graphColor} legendX="Department" legendY="" XaxisRotate={-90} legendXOffset={160} translateX={110} topValue={true} label={true} legendAuto={true} />
          </div>
        </ChartBox>
      ) : null }

      { viewState === 'Director' && chartData.length > 0 ? (
        <ChartBox title="Team Based CoPilot User Activity" colors={colors}>
          <div style={ChartStyle.chart1}>
            <CoPilotBarChart data={chartData} dataIndex="id" dataKeys={graphKey} mode="stacked" layout="vertical" marginCss={[20, 155, 190, 50]} colorType={graphColor} legendX="Team" legendY="" XaxisRotate={-90} legendXOffset={160} translateX={110} topValue={true} label={true} legendAuto={true} />
          </div>
        </ChartBox>
      ) : null }

    </Box>
  );
}

export default ActivityChart;