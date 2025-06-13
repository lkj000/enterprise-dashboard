import React from 'react';
import { Box } from '@mui/material';
import CommonPanel from './commonPanel';
import GASummary from '../../../data-json/group_approval_summary_data.json'

const GaPanel = () => {
  return (
    <Box>
      {/* Your component content goes here */}
      <CommonPanel data={GASummary} title={"Group Approval"} />
    </Box>
  );
};

export default GaPanel;