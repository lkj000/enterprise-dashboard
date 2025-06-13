import React from 'react';
import { Box } from '@mui/material';
import CommonPanel from './commonPanel';
import RITSummary from '../../../data-json/rit_summary_data.json'

const RitMainPanel = () => {
  return (
    <Box>
      {/* Your component content goes here */}
      <CommonPanel data={RITSummary} title={"RIT"} />
    </Box>
  );
};

export default RitMainPanel;