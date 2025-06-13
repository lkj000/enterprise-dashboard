import { React } from "react";
import { Box } from '@mui/material';
import ChartBox from "../../../common-components/ChartBox";
import BarChartUser from "../../../components/BarChartUser";
import CustomChart from "../../../components/CustomChart";
import TeamLineChart from "../../../components/TeamLineChart";
import { enterpriseInfo, getBarData, getLineData, ChartStyle } from "./chartsInfo/ChartData";


const TeamChart = ({ barData, lineData, viewState, colors }) => {


  const storyBarInfo = barData.length > 0 ? getBarData(barData[0]) : [];
  const issueBarInfo = barData.length > 0 ? getBarData(barData[1]) : [];
  const storyLineInfo = lineData.length > 0 ? getLineData(lineData[0]) : [];
  const issueLineInfo = lineData.length > 0 ? getLineData(lineData[1]) : [];


  return (
    <Box>

      {/* STORY */}
      {(viewState.story) && <Box>

        {storyBarInfo.length >0 && <Box mb="40px">
          <ChartBox title="Team Productivity Story Based" colors={colors}>
            {storyBarInfo.map((graphData, index) => (
              <div key={index} style={ChartStyle.chart1}>
                <BarChartUser data={graphData} dataIndex="id" dataKeys={["Closed Stories","Open Stories"]} mode="stacked" layout="vertical" marginCss={[20,130,190,50]} colorType={['#50C878','#E35335']} legendX="Line Managers" legendY="" XaxisRotate={-90} legendXOffset={160} translateX={115} topValue={true} label={false}/>
              </div>
            ))}
          </ChartBox>

          <ChartBox title="Team Productivity Stories per Resource Based" colors={colors}>
            {storyBarInfo.map((graphData, index) => (
              <div key={index} style={ChartStyle.chart1}>
                <CustomChart data={graphData} dataIndex="id" dataKeys={["Average Stories Closed Per User"]} mode="stacked" layout="vertical" marginCss={[20,130,190,50]} colorType={['#50C878','#E35335']} legendX="Line Managers" legendY="" XaxisRotate={-90} legendXOffset={160} topValue={true} legendTextBottom={90} legendTextRight={0} marker={enterpriseInfo[0]} />
              </div>
            ))}
          </ChartBox>
        </Box>}

        {storyLineInfo.length >0 && <Box mb="40px">
          <ChartBox title="Weekly Velocity Stories" colors={colors}>
            {storyLineInfo.map((graphData, index) => (
              <div key={index} style={ChartStyle.chart2}>
                <TeamLineChart chartData={graphData} type={false} colorNames={[]} marginCss={[45, 150, 110, 120]} legendX="Weeks" legendY="Value" maxValue={true} XaxisRotate={-25} legendTextBottom={100} legendTextRight={10} legendXOffset={90} legendWidth="100px" />
              </div>
            ))}
          </ChartBox>
        </Box>}
    
      </Box>}



      {/* ISSUE */}
      {(viewState.issue) && <Box>

        {issueBarInfo.length >0 && <Box mb="40px">
          <ChartBox title="Team Productivity Issue Based" colors={colors}>
            {issueBarInfo.map((graphData, index) => (
              <div key={index} style={ChartStyle.chart1}>
                <BarChartUser data={graphData} dataIndex="id" dataKeys={["Closed Issues","Open Issues"]} mode="stacked" layout="vertical" marginCss={[20,130,190,50]} colorType={['#50C878','#E35335']} legendX="Line Managers" legendY="" XaxisRotate={-90} legendXOffset={160} translateX={115} topValue={true} label={false}/>
              </div>
            ))}
          </ChartBox>

          <ChartBox title="Team Productivity Issues per Resource Based" colors={colors}>
            {issueBarInfo.map((graphData, index) => (
              <div key={index} style={ChartStyle.chart1}>
                <CustomChart data={graphData} dataIndex="id" dataKeys={["Average Issues Closed Per User"]} mode="stacked" layout="vertical" marginCss={[20,130,190,50]} colorType={['#50C878','#E35335']} legendX="Line Managers" legendY="" XaxisRotate={-90} legendXOffset={160} topValue={true} legendTextBottom={90} legendTextRight={0} marker={enterpriseInfo[1]} />
              </div>
            ))}
          </ChartBox>
        </Box>}

        {issueLineInfo.length >0 && <Box mb="40px">
          <ChartBox title="Weekly Velocity Issues" colors={colors}>
            {issueLineInfo.map((graphData, index) => (
              <div key={index} style={ChartStyle.chart2}>
                <TeamLineChart chartData={graphData} type={false} colorNames={[]} marginCss={[45, 150, 110, 120]} legendX="Weeks" legendY="Value" maxValue={true} XaxisRotate={-25} legendTextBottom={100} legendTextRight={10} legendXOffset={90} legendWidth="100px" />
              </div>
            ))}
          </ChartBox>
        </Box>}

      </Box>}

    </Box>
  );
}

export default TeamChart;