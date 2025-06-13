import React from 'react';
import { Box } from '@mui/material';
import UserPanel from './userPanel';
import RITSummaryUser from '../../../data-json/rit_summary_user_data.json'

const RitMainPanel = () => {

  return (
    <Box>
      {/* Your component content goes here */}
      <UserPanel data={RITSummaryUser} title={"RIT"}/>
    </Box>
  );
};

export default RitMainPanel;