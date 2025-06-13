import { React } from "react";
import { Box } from '@mui/material';
import JiraBarChart from "../../../../components/JiraBarChart";
import JiraLineChart from "../../../../components/JiraLineChart";
import BarChartUser from "../../../../components/BarChartUser";
import ChartBox from "../../../../common-components/ChartBox";
import { getBurndownIssues, getBurndownIssuePoints, getBurndownStories, getBurndownStoryPoints,
  getTeamProgress, getResourceData, getVelocityData, colorsBurndown 
} from "./ChartData";
import { jiraChartStyle } from "../styles";


const JiraTileChart = ({ tileData, IssueColumn, StoryColumn, colors }) => {


  const { issuesDaily, issuePointsDaily, storiesDaily, storyPointsDaily, TeamChart, ResourceChart, weeklyChart } = Object.values(tileData).length > 0 ? {
    issuesDaily: getBurndownIssues(tileData),
    issuePointsDaily: getBurndownIssuePoints(tileData),
    storiesDaily: getBurndownStories(tileData),
    storyPointsDaily: getBurndownStoryPoints(tileData),
    TeamChart: getTeamProgress(tileData, IssueColumn, StoryColumn),
    ResourceChart: getResourceData(tileData),
    weeklyChart: getVelocityData(tileData, IssueColumn, StoryColumn)
  } : {
    issuesDaily: [],
    issuePointsDaily: [],
    storiesDaily: [],
    storyPointsDaily: [],
    TeamChart: [],
    ResourceChart: [],
    weeklyChart: []
  };

  // LEGEND COLOR
  const weeklyColor = ['#BB0000', '#00FF00', '#50C878','#E35335','#E16D25','#DD00BB','#377eb8','#FAFA33']
    .slice(IssueColumn ? 0 : 4, StoryColumn ? 8 : 4);


  return (
    <Box>
      {Object.values(tileData).length > 0 ? <>

        {/* CHART 1 - BURNDOWN CHART (ISSUES) */}
          {(((IssueColumn && StoryColumn) || (IssueColumn && !StoryColumn)) && issuesDaily.length > 0) && (
            <ChartBox title="Burndown Chart (Issues)" colors={colors}>
              <div style={jiraChartStyle.chart2}>
                <JiraLineChart chartData={issuesDaily} colorType={colorsBurndown} marginCss={[45,150,110,120]} legendX="Day" maxValue={true} XaxisRotate={-25} legendTextBottom={100} legendTextRight={10} legendXOffset={90} legendWidth="100px" />
              </div>
            </ChartBox>)}

        {/* CHART 1 - BURNDOWN CHART (ISSUE POINTS) */}
          {(((IssueColumn && StoryColumn) || (IssueColumn && !StoryColumn)) && issuePointsDaily.length > 0) && (
            <ChartBox title="Burndown Chart (Issues Points)" colors={colors}>
              <div style={jiraChartStyle.chart2}>
                <JiraLineChart chartData={issuePointsDaily} colorType={colorsBurndown} marginCss={[45,150,110,120]} legendX="Day" maxValue={true} XaxisRotate={-25} legendTextBottom={100} legendTextRight={10} legendXOffset={90} legendWidth="100px" />
              </div>
            </ChartBox>)}

        {/* CHART 2 - BURNDOWN CHART (STORIES) */}
          {(((IssueColumn && StoryColumn) || (!IssueColumn && StoryColumn)) && storiesDaily.length > 0) && (
            <ChartBox title="Burndown Chart (Stories)" colors={colors}>
              <div style={jiraChartStyle.chart2}>
                <JiraLineChart chartData={storiesDaily} colorType={colorsBurndown} marginCss={[45,150,110,120]} legendX="Day" maxValue={true} XaxisRotate={-25} legendTextBottom={100} legendTextRight={10} legendXOffset={90} legendWidth="100px" />
              </div>
            </ChartBox>)}

        {/* CHART 2 - BURNDOWN CHART (STORY POINTS) */}
          {(((IssueColumn && StoryColumn) || (!IssueColumn && StoryColumn)) && storyPointsDaily.length > 0) && (
            <ChartBox title="Burndown Chart (Stories Points)" colors={colors}>
              <div style={jiraChartStyle.chart2}>
                <JiraLineChart chartData={storyPointsDaily} colorType={colorsBurndown} marginCss={[45,150,110,120]} legendX="Day" maxValue={true} XaxisRotate={-25} legendTextBottom={100} legendTextRight={10} legendXOffset={90} legendWidth="100px" />
              </div>
            </ChartBox>)}

        {/* CHART 3 - TEAM PROGRESS */}
          {TeamChart.length > 0 && (
            <ChartBox title="Team Progress" colors={colors}>
              <div style={jiraChartStyle.chart1}>
                <JiraBarChart data={TeamChart} dataIndex="id" dataKeys={["Backlog","In Progress","Done"]} colorType={['#E35335','#FFAA33','#50C878']} legendX="Jira Type" />
              </div>
            </ChartBox>)}

        {/* CHART 4 - RESOURCE ASSIGNMENT (ISSUES) */}
          {(((IssueColumn && StoryColumn) || (IssueColumn && !StoryColumn)) && ResourceChart[0].length > 0) && (
            <ChartBox title="Resource Assignment (Issues)" colors={colors}>
              <div style={jiraChartStyle.chart2}>
                <BarChartUser data={ResourceChart[0]} dataIndex="id" dataKeys={["Open","Done","Total"]} mode="grouped" layout="vertical" marginCss={[50,180,180,65]} colorType={['#E35335','#50C878','#377eb8']} legendX="Users" legendY="" XaxisRotate={-90} legendXOffset={160} translateX={160} topValue={false} label={true}/>
              </div>
            </ChartBox>)}

        {/* CHART 4 - RESOURCE ASSIGNMENT (STORIES) */}
          {(((IssueColumn && StoryColumn) || (!IssueColumn && StoryColumn)) && ResourceChart[1].length > 0) && (
            <ChartBox title="Resource Assignment (Stories)" colors={colors}>
              <div style={jiraChartStyle.chart2}>
                <BarChartUser data={ResourceChart[1]} dataIndex="id" dataKeys={["Open","Done","Total"]} mode="grouped" layout="vertical" marginCss={[50,180,180,65]} colorType={['#E35335','#50C878','#377eb8']} legendX="Users" legendY="" XaxisRotate={-90} legendXOffset={160} translateX={160} topValue={false} label={true}/>
              </div>
            </ChartBox>)}

        {/* CHART 5 - VELOCITY */}
        {weeklyChart.length > 0 && (
          <ChartBox title="Weekly Velocity" colors={colors}> 
            <div style={jiraChartStyle.chart3}>
              <JiraLineChart chartData={weeklyChart} colorType={weeklyColor} marginCss={[45,150,110,120]} legendX="Weeks" legendY="Value" maxValue={true} XaxisRotate={-25} legendTextBottom={100} legendTextRight={10} legendXOffset={90} legendWidth="100px" />
            </div>      
          </ChartBox>)}

      </>  : null}
    </Box>
  );
}

export default JiraTileChart;