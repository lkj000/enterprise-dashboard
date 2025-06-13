import { React, useState } from 'react';
import { Box, Tab, useTheme } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Header from "../../components/Header";
import ServiceHistory from './components/Self-Service/ServiceHistory';
import { workflowData } from './components/Self-Service/ServiceData';
import { FetchData } from './requests';
import { tokens } from "../../theme";


const UsageHistory = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [value, setValue] = useState('1');

  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };


  return (
    <Box m="25px">

      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Dashboard Usage History" subtitle="Overview" />
      </Box>

      {/* TABS */}
      <TabContext value={value}>
        <Box
          sx={{ 
            borderBottom: 1, 
            borderColor: 'divider', 
            mt:-1.5,
            mb: 3.5
        }}>
          <TabList 
            value={value} 
            onChange={handleChange} 
            indicatorColor="secondary" 
            textColor="inherit" 
            variant="fullWidth"
          >
            <Tab 
              label="TRAFFIC HISTORY"
              value="1"
              style={{ fontSize:'14.5px', fontWeight:'medium' }}
              iconPosition="start" 
            />
            <Tab 
              label="SELF-SERVICE HISTORY" 
              value="2" 
              style={{ fontSize:'14.5px', fontWeight:'medium' }}
              iconPosition="start" 
            />
          </TabList>
        </Box> 

        {/* CONTENT */}
        <TabPanel value="1">
          <FetchData theme={theme} colors={colors} />
        </TabPanel>

        <TabPanel value="2">
          <ServiceHistory data={workflowData} theme={theme} colors={colors} />
        </TabPanel>

      </TabContext>      
    </Box>
  );
}


export default UsageHistory;