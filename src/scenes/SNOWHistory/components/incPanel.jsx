import React from 'react';
import { Box } from '@mui/material';
import INCSummary from '../../../data-json/incident_summary_data.json'
import CommonPanel from './commonPanel';

const IncPanel = () => {
  return (
    <Box>
      {/* Your component content goes here */}
      <CommonPanel data={INCSummary} title={"Incidents"} />
    </Box>
  );
};

export default IncPanel;