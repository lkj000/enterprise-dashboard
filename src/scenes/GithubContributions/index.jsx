import { React, useState } from "react";
import { Box, Tab, useTheme } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import Header from "../../components/Header";
import GithubAct from "./GithubAct";
import { tokens } from "../../theme";

const GithubContributions = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [value, setValue] = useState("1");

    const handleChange = (_event, newValue) => {
      setValue(newValue);
    }

    return (
      <Box m="25px">

        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header
            title="GitHub Contributions"
            subtitle="User Activity in last 30 Days"
            subtitle1="App Code Activity on default branch over last 12 Weeks"
          />
        </Box>

        {/* TABS */}
        <TabContext value={value}>
          <Box sx={{ 
            borderBottom: 1, 
            borderColor: 'divider', 
            mt: -1.5,
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
                label="APP CODE ACTIVITY"
                value="2"
                style={{ fontSize:'14.5px', fontWeight:'medium' }}
                iconPosition="start" 
              />
            </TabList>
          </Box>
        
          {/* CONTENT */}
          <GithubAct theme={theme} colors={colors}/>

        </TabContext>
      </Box>
    );
};

export default GithubContributions;