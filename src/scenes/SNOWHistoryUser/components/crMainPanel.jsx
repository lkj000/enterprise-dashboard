import React from 'react';
import { Box } from '@mui/material';
import UserPanel from './userPanel';
import CRSummaryUser from '../../../data-json/change_request_summary_user_data.json'

const CrMainPanel = () => {
  return (
    <Box>
      <UserPanel data={CRSummaryUser} title={"Change Requests"}/>
    </Box>
  );
};

export default CrMainPanel;