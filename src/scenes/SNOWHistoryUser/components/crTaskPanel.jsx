import React from 'react';
import { Box } from '@mui/material';
import UserPanel from './userPanel';
import CRTaskSummaryUser from '../../../data-json/change_request_task_summary_user_data.json'

const CrTaskPanel = () => {

  return (
    <Box>
      {/* Your component content goes here */}
      <UserPanel data={CRTaskSummaryUser} title={"Change Request Tasks"}/>
    </Box>
  );
};

export default CrTaskPanel;