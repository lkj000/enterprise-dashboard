import { React } from "react";
import { Box } from '@mui/material';
import ChartBox from "../../../../common-components/ChartBox";
import SprintChart from "../../../../components/SprintChart"; 
import { getBugData } from "./ChartInfo";


const KanbanChart = ({ input, colors }) => {

  const bugData = input?.bugs ? getBugData(input.bugs) : [];


  return(
    <Box>

      {/* BUG CHART */}
      {bugData.length > 0 ?
        <ChartBox title="Defect History" colors={colors}>
          <SprintChart chartData={bugData} colorType={['#F28C28', '#50C878', '#E35335']} legendY="# of Bugs" maxValue={true} />
      </ChartBox> : null }

    </Box>
  );
};

export default KanbanChart;