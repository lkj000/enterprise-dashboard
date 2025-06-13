import { React, useState } from "react";
import { Box, Tab, useTheme } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Header from "../../components/Header";
import CWFBox from "../../components/CWFBox";
import RoadMapData from './RoadMapData';
import { roadmap } from "../../data/roadmap";
import { tokens } from "../../theme";


const UpcomingFeature = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [value, setValue] = useState('1');

  const handleChange = (_event, newValue) => {
    setValue(newValue);
  }

  return (
    <Box m="25px">

      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Upcoming Features (Beta Testing)" subtitle="Overview" />
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
            variant="scrollable"
          >
            {RoadMapData.map((item, index) => (
              <Tab 
                key={index}
                label={item.label}
                value={item.value}
                style={{fontSize:'14.5px', fontWeight:'medium'}}
                icon={item.icon} 
                iconPosition="start" 
              />
            ))}
          </TabList>
        </Box>
            
        {/* CONTENT */}
        {roadmap[0].workflow.map((data, index) => (
          <TabPanel value={data.value} key={index}>
            <CWFBox
              count={data.count}
              input={data.repo}
              colors={colors}
            />
          </TabPanel>
        ))}

      </TabContext>
    </Box>
  );
};

export default UpcomingFeature;