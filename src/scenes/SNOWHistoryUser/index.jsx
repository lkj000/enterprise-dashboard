import { useState } from 'react';
import { Box, Tab } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Header from "../../components/Header";
import IncPanel from './components/incPanel';
import RitPanel from './components/ritPanel';
import CrPanel from './components/crPanel';

const SNOWHistoryUser = () => {
  const [value, setValue] = useState('inc_history');
  const handleChange = (_event, newValue) => {
    setValue(newValue);
  }

  return <Box m="25px">
    {/* HEADER */}
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Header title="SNOW History User" subtitle="Service Now Tickets in last 90 days" />
    </Box>

    {/* TABS */}
    <TabContext value={value}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          mt: -1.5,
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
            label="INC History"
            value="inc_history"
            style={{ fontSize: '14.5px', fontWeight: 'medium' }}
            iconPosition="start"
          />
          <Tab
            label="RIT History"
            value="rit_history"
            style={{ fontSize: '14.5px', fontWeight: 'medium' }}
            iconPosition="start"
          />
          <Tab
            label="CR History"
            value="cr_history"
            style={{ fontSize: '14.5px', fontWeight: 'medium' }}
            iconPosition="start"
          />
        </TabList>
      </Box>

      {/* CONTENT */}
      <TabPanel value="inc_history" >
        <IncPanel />
      </TabPanel>

      <TabPanel value="rit_history" >
        <RitPanel />
      </TabPanel>

      <TabPanel value="cr_history" >
        <CrPanel />
      </TabPanel>
    </TabContext>
  </Box>
}

export default SNOWHistoryUser;