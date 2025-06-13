import { React } from "react";
import { Box } from '@mui/material';
import ChartBox from "../../../../common-components/ChartBox";
import CopilotUsageBarChart from "../../../../components/CopilotUsageBarChart";
import { getUsageChart, ChartStyle } from "./TilesReport";


const UsageChart = ({ tileInfo, reportType, dataState, colors }) => {

  const [ dataSummary, engagedUsers, language ] = getUsageChart(tileInfo, reportType, dataState);



  return (
    <Box mb="40px">

      {dataSummary.length > 0 && (
      <ChartBox title="Copilot Usage Data Day Summary" colors={colors}>
        <div style={ChartStyle.chart1}>
          <CopilotUsageBarChart data={dataSummary} indexKey="Day" chartKeys={["Total Suggestions Count", "Total Acceptance Count"]}/>
        </div>
      </ChartBox>)}

      {engagedUsers.length > 0 && (
      <ChartBox title="Copilot Usage Data Day Engaged Users Summary" colors={colors}>
        <div style={ChartStyle.chart1}>
          <CopilotUsageBarChart data={engagedUsers} chartKeys={["Engaged Users"]} indexKey="Day"/>
        </div>
      </ChartBox>)}

      {language.length > 0 && (
      <ChartBox title="Copilot Usage Data Language Summary" colors={colors}>
        <div style={ChartStyle.chart1}>
          <CopilotUsageBarChart data={language} indexKey="Language" chartKeys={["Total Suggestions Count",  "Total Acceptance Count", "Lines Of Code Suggested", "Lines Of Code Accepted"]}/>
        </div>
      </ChartBox>)}

    </Box>
  );
};

export default UsageChart;