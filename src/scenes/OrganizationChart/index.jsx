import { React, useState } from 'react';
import { Box, Tab, useTheme } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Header from "../../components/Header";
import FetchAllData, { jsonFiles } from "./requests";
import { tokens } from "../../theme";


const OrganizationChart = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [value, setValue] = useState("it");

  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };


  return (
    <Box m="25px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Organization Chart" subtitle="Overview" />
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
            {Object.keys(jsonFiles).map((key) => (
              <Tab 
                key={key}
                label={key}
                value={key}
                style={{ fontSize:'14.5px', fontWeight:'medium' }}
                iconPosition="start" 
              />
            ))}
          </TabList>
        </Box>
          
        {/* CONTENT */}
        {Object.keys(jsonFiles).map((key) => (
          <TabPanel key={key} value={key}>
            <FetchAllData tab={key} theme={theme} colors={colors} />
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
};


export default OrganizationChart;