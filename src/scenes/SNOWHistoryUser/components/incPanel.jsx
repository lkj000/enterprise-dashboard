import React from 'react';
import { Box } from '@mui/material';
import INCSummaryUser from '../../../data-json/incident_summary_user_data.json'
import UserPanel from './userPanel';

const IncPanel = () => {

  return (
    <Box>
      {/* Your component content goes here */}
      <UserPanel data={INCSummaryUser} title={"Incidents"}/>
    </Box>
  );
};

export default IncPanel;