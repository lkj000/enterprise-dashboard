import React from 'react';
import { Box, useTheme } from '@mui/material';
import CustomAccordion from '../../../common-components/Accordion/CustomAccordion';
import DashboardChart from "../../../components/DashboardChart";
import HistoryChart from "../../../components/HistoryChart";
import { tokens } from "../../../theme";


const HomeCharts = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  return (
    <Box gridColumn="span 11">

      {/* ROW 3 - Deployment strategies*/}
      <CustomAccordion
        defaultValue={true}
        title="Automated Deployment Strategies"
        isDisplay={false}
        stylesInfo={{ marginBottom: '20px'}}
        colors={colors}
      >
        <Box height="415px" m="-20px 0 0 0">
          <DashboardChart isDashboard={true} />
        </Box>
      </CustomAccordion>

       {/* ROW 3 - History Workflow */}
      <CustomAccordion
        defaultValue={true}
        title="Workflow History"
        isDisplay={false}
        colors={colors}
      >
        <Box height="415px" m="-20px 0 0 0">
          <HistoryChart isHistory={true} />
        </Box>
      </CustomAccordion>
    </Box>
  );
};

export default HomeCharts;