import React from 'react';
import { Box } from '@mui/material';
import CommonPanel from './commonPanel';
import CRSummary from '../../../data-json/change_request_summary_data.json'

const CrMainPanel = () => {
  return (
    <Box>
      {/* Your component content goes here */}
      <CommonPanel data={CRSummary} title={"Change Request"} />
    </Box>
  );
};

export default CrMainPanel;