import { React, useState } from "react";
import { Box, Tab, useTheme } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Header from "../../components/Header";
import FetchAllData, { DataProvider } from "./requests";
import { tokens } from "../../theme";


const CoPilot = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [value, setValue] = useState('1');

  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };


  return (
    <DataProvider>
      <Box m="25px">

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="GitHub Copilot Users" subtitle="Overview" />
      </Box>

      {/* TABS */}
      <TabContext value={value}>
        <Box sx={{ 
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
              label="USER ACTIVITY"
              value="1"
              style={{ fontSize:'14.5px', fontWeight:'medium' }}
              iconPosition="start" 
            />
            <Tab 
              label="COPILOT USAGE" 
              value="2" 
              style={{ fontSize:'14.5px', fontWeight:'medium' }}
              iconPosition="start" 
            />
          </TabList>
        </Box>
        
        {/* CONTENT */}
        <TabPanel value="1">
          <FetchAllData tab={1} theme={theme} colors={colors} />
        </TabPanel>
          
        <TabPanel value="2">
          <FetchAllData tab={2} theme={theme} colors={colors} />
        </TabPanel>

      </TabContext>
      </Box>
    </DataProvider>
  );
};

export default CoPilot;