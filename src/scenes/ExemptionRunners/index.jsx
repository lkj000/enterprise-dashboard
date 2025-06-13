import { React, useState } from "react";
import { Box, Tab, useTheme } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Header from "../../components/Header";
import ExemptionTable from "./components/ExemptionTable";
import RunsonTable from "./components/RunsonTable";
import { tokens } from "../../theme";


const ExemptionRunners = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [value, setValue] = useState('1');

  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };
        

  return (
    <Box m="25px">

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Exemption Runners" subtitle="Overview" />
      </Box>

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
              label="EXEMPTION RUNNERS"
              value="1"
              style={{ fontSize:'14.5px', fontWeight:'medium' }}
              iconPosition="start" 
            />
            <Tab 
              label="RUNS-ON" 
              value="2" 
              style={{ fontSize:'14.5px', fontWeight:'medium' }}
              iconPosition="start" 
            />
               
          </TabList>
        </Box>
        
        <TabPanel value="1" >
          <ExemptionTable />
        </TabPanel>
        <TabPanel value="2" >
          <RunsonTable colors={colors} />
        </TabPanel>

      </TabContext>
    </Box>
  );
};

export default ExemptionRunners;