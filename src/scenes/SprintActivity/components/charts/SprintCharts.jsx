import { React } from "react";
import { Box } from '@mui/material';
import ChartBox from "../../../../common-components/ChartBox";
import JiraLineChart from "../../../../components/JiraLineChart";
import SprintChart from "../../../../components/SprintChart";
import { getBurndownData, getOldSprintData, chartStyle } from "./ChartData";  


const SprintCharts = ({ data, projData, colors }) => {

  let input = data, burndown_issue = [], burndown_story = [], oldSprintInfo = {
    bugData: [], velocity: [], avgVelocity: [], spillData: []
  };

  // CHART 1
  if (input?.sprintData?.daily_data?.length > 0) {
    [burndown_issue, burndown_story] = getBurndownData(input);
  }

  // CHART 2 to 5
  if (projData?.length > 0) {
    oldSprintInfo = getOldSprintData(projData);
  };


  return(
    <Box>
        
      {/* BURNDOWN CHART - 1 */}
      {input?.sprintData?.daily_data?.length > 0 ? <Box>
        <ChartBox title="Burndown Chart (Issues)" colors={colors}>
          <div style={chartStyle.chart1}>
            <JiraLineChart chartData={burndown_issue} colorType={['#50C878','#377eb8','#E67835','#FAFA33']} marginCss={[45,150,110,120]} legendX="Date" maxValue={true} XaxisRotate={-25} legendTextBottom={100} legendTextRight={10} legendXOffset={90} legendWidth="100px" />
          </div>
        </ChartBox>
          
        <ChartBox title="Burndown Chart (Stories)" colors={colors}>
          <div style={chartStyle.chart1}>
            <JiraLineChart chartData={burndown_story} colorType={['#50C878','#377eb8','#E67835','#FAFA33']} marginCss={[45,150,110,120]} legendX="Date" maxValue={true} XaxisRotate={-25} legendTextBottom={100} legendTextRight={10} legendXOffset={90} legendWidth="100px" />
          </div>
        </ChartBox> 
      </Box>  : null}


      {/* BUG CHART - 2 */}
      {Object.values(oldSprintInfo.bugData).length > 0 ?
        <ChartBox title="Defect History" colors={colors}>
          <SprintChart chartData={oldSprintInfo.bugData} colorType={['#F28C28','#50C878','#E35335']} legendX="Sprint Name" legendY="# of Bugs" maxValue={true}/>
      </ChartBox> : null }
      
      {/* VELOCITY CHART  - 3*/}
      {Object.values(oldSprintInfo.velocity).length > 0 ?
        <ChartBox title="Velocity History - Story Points" colors={colors}>
          <SprintChart chartData={oldSprintInfo.velocity} colorType={['#50C878','#377eb8']} legendX="Sprint Name" legendY="Value" maxValue={false}/>
      </ChartBox> : null }

      {/* AVG VELOCITY CHART - 4 */}
      {Object.values(oldSprintInfo.avgVelocity).length > 0 ?
        <ChartBox title="Average Resource Velocity" colors={colors}>
          <SprintChart chartData={oldSprintInfo.avgVelocity} colorType={['#50C878','#377eb8']} legendX="Sprint Name" legendY="Value" maxValue={false}/> 
      </ChartBox> : null }

      {/* SPILL CHART - 5*/}
      {Object.values(oldSprintInfo.spillData).length > 0 ?
        <ChartBox title="Spill Over and Scope Creep Issues" colors={colors}>
          <SprintChart chartData={oldSprintInfo.spillData} colorType={['#E35335', '#50C878']} legendX="Sprint Name" legendY="# of Issues" maxValue={true}/>
      </ChartBox> : null }

    </Box>
  );
};

export default SprintCharts;