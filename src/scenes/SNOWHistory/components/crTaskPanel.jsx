import React from 'react';
import { Box } from '@mui/material';
import CommonPanel from './commonPanel';
import CRTaskSummary from '../../../data-json/change_request_task_summary_data.json'

const CrTaskPanel = () => {
  return (
    <Box>
      {/* Your component content goes here */}
      <CommonPanel data={CRTaskSummary} title={"Change Requests Tasks"} />
    </Box>
  );
};

export default CrTaskPanel;