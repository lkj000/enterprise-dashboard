import { React, useState } from "react";
import { Box, useTheme, Typography } from '@mui/material';
import { tokens } from "../../theme";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Header from "../../components/Header";
import { ArtifactHistory } from "../../data/artifactHistory";
import Policy from './components/policy'
import History from './components/history'
import Search from './components/search'

const Artifact = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [value, setValue] = useState('1');
  const handleChange = (_event, newValue) => {
    setValue(newValue);
  }

  // const artifact = ArtifactHistory.reverse().slice(0, 10);
  //Artifact (desc)
  const artifactLength = ArtifactHistory.length;
  var artifact = [];
  for(let i=artifactLength-1; i>= 0 ;i--){
      artifact.push(ArtifactHistory[i]);
  }

  //Adding index (Filter data) & date (format)
  const artifact_Index = artifact.map((data, i) => {
    const inc = i + 1;
    var parts = (data.date).split('-');
    var final_Date = parts[1] + '-' + parts[0] + '-' + parts[2];
    return { index: inc, date: final_Date, artifacts: data.artifacts };
  });

  return (
    <Box m="25px">

      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Artifactory Cleanup Policy" subtitle="Overview" />
      </Box>

      {/* TABS */}
      <TabContext value={value}>
        <Box
          sx={{
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
              label="policy"
              value="1"
              style={{ fontSize: '14.5px', fontWeight: 'medium' }}
              iconPosition="start"
            />
            <Tab
              label="artifacts history"
              value="2"
              style={{ fontSize: '14.5px', fontWeight: 'medium' }}
              iconPosition="start"
            />
            <Tab
              label="advance search"
              value="3"
              style={{ fontSize: '14.5px', fontWeight: 'medium' }}
              iconPosition="start"
            />
          </TabList>
        </Box>

        {/* CONTENT */}
        <TabPanel value="1" >
          <Box display="flex" mb="25px">
            <Typography variant="h4" color={colors.tertiary[400]} style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>
              Enterprise Standards - Lifecycle Policy for Enterprise Artifactory
            </Typography>
          </Box>
          <Policy />
        </TabPanel>
        <TabPanel value="2" >
          <History input={artifact_Index} />
        </TabPanel>
        <TabPanel value="3" >
          <Search input={artifact_Index} />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default Artifact;