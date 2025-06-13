import React, { useState } from 'react';
import { Box, Tab } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import CrMainPanel from './crMainPanel';
import CrTaskPanel from './crTaskPanel';

const CrPanel = () => {
  const [value, setValue] = useState('ctask');
  const handleChange = (_event, newValue) => {
    setValue(newValue);
  }

  return (
    <Box>
      {/* Your component content goes here */}
      <TabContext value={value}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            // mb: 3.5
          }}>
          <TabList
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
          >
            <Tab
              label="TASKS"
              value="ctask"
              style={{ fontSize: '14.5px', fontWeight: 'medium' }}
              iconPosition="start"
            />
            <Tab
              label="CR's"
              value="cr"
              style={{ fontSize: '14.5px', fontWeight: 'medium' }}
              iconPosition="start"
            />
          </TabList>
        </Box>

        {/* CONTENT */}
        <TabPanel value="cr" >
          <CrMainPanel/>
        </TabPanel>

        <TabPanel value="ctask" >
          <CrTaskPanel/>
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default CrPanel;