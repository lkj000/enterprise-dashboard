import { React, useState } from 'react';
import { Box, Button, Tab, useTheme } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Header from "../../components/Header";
import CWFBox from "../../components/CWFBox";
import ReleaseData from './ReleaseData';
import { release } from '../../data/release';
import { tokens } from "../../theme";


const ReleaseNotes = () => {

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
        <Header title="Central Workflow Release Notes" subtitle="Overview" />
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
            {ReleaseData.map((item, index) => (
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
        {release[0].workflow.map((data, index) => {
          const label = ReleaseData.find(item => item.value === data.value)?.label || '';
          return (
            <TabPanel value={data.value} key={index}>

              {/* URL */}
              {data.count !== 0 && (
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => window.open(`https://github.albertsons.com/albertsons/${data.url}/issues?q=is%3Aissue+is%3Aclosed+label%3APortal`, '_blank')}
                sx={{ width: 'auto', fontSize: '17px', marginLeft: '10px', marginBottom: '20px' }}
              >
                VIEW {label} REPO
              </Button>
              )}

              {/* CWF BOX */}
              <CWFBox
                count={data.count}
                input={data.repo}
                colors={colors}
              />
            </TabPanel>
          );
        })}

        </TabContext>
      </Box>           
    );
};


export default ReleaseNotes;