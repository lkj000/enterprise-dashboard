import React, { useState } from 'react';
import { Box, Tab } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import RitMainPanel from './ritMainPanel';
import RitTaskPanel from './ritTaskPanel';

const RitPanel = () => {
  const [value, setValue] = useState('rtask');
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
              value="rtask"
              style={{ fontSize: '14.5px', fontWeight: 'medium' }}
              iconPosition="start"
            />
            <Tab
              label="RITM"
              value="rit"
              style={{ fontSize: '14.5px', fontWeight: 'medium' }}
              iconPosition="start"
            />
          </TabList>
        </Box>

        {/* CONTENT */}
        <TabPanel value="rit" >
          <RitMainPanel />
        </TabPanel>

        <TabPanel value="rtask" >
          <RitTaskPanel />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default RitPanel;