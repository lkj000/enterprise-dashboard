import React from 'react';
import { Box } from '@mui/material';
import UserPanel from './userPanel';
import RITTaskSummaryUser from '../../../data-json/rit_task_summary_user_data.json'

const RitTaskPanel = () => {
  return (
    <Box>
      {/* Your component content goes here */}
      <UserPanel data={RITTaskSummaryUser} title={"RIT Task"}/>
    </Box>
  );
};

export default RitTaskPanel;