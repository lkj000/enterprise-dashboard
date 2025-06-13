import React from 'react';
import { Box } from '@mui/material';
import CommonPanel from './commonPanel';
import RITTaskSummary from '../../../data-json/rit_task_summary_data.json'

const RitTaskPanel = () => {
  return (
    <Box>
      {/* Your component content goes here */}
      <CommonPanel data={RITTaskSummary} title={"RIT Tasks"} />
    </Box>
  );
};

export default RitTaskPanel;