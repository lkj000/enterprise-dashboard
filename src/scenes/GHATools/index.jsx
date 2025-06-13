import { React, useState, useEffect } from 'react';
import { Box, Tab, useTheme } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Header from "../../components/Header";
import CommonBox from "./components/CommonBox";
import SearchBox from './components/SearchBox';
import { tokens } from "../../theme";
import auto_gen_workflow_metadata from './data/auto_generated_workflow_metadata.json';
import static_workflow_metadata from './data/static_workflow_metadata.json';


const GHATools = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [mainTabValue, setMainTabValue] = useState("DevOps");
  const [subTabValue, setSubTabValue] = useState({ subBoxName: "", subText: ""});
  const [combinedWorkflowMetaData, setCombinedWorkflowMetaData] = useState({});
  const [workflowData, setWorkflowData] = useState([]);


  const handleChange = (_event, newValue) => {
    setMainTabValue(newValue);
  }


  useEffect(() => {
    // Combining auto generated and static workflows
    const combineObjects = (json1, json2) => {
      const combined = JSON.parse(JSON.stringify(json1));
    
      Object.keys(json2).forEach(key => {
        if (key in combined) {
          combined[key] = combined[key].map(section => {
            const matchingSection = json2[key].find(s => s.title === section.title);
            if (matchingSection) {
              const matchingSectionContent = matchingSection.content;
              const sectionContent = section.content;
              const combinedContent = { ...sectionContent };
              Object.keys(matchingSectionContent).forEach(k => {
                if (k in combinedContent) {
                  combinedContent[k] = [...combinedContent[k], ...matchingSectionContent[k]];
                } else {
                  combinedContent[k] = matchingSectionContent[k];
                }
              });
              section.content = combinedContent;
            }
            return section;
          });

          json2[key].forEach(section => {
            const matchingSection = combined[key].find(s => s.title === section.title);

            if(!matchingSection)
              combined[key].push(section);
          });

        } else {
          combined[key] = json2[key];
        }
      });


    
      return combined;
    };
    const combinedJson = combineObjects(auto_gen_workflow_metadata, static_workflow_metadata);
    setCombinedWorkflowMetaData(combinedJson);
  }, []);

  return (
    <Box m="25px">            
            
      {/* HEADER */}                    
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Self-Service" subtitle="Overview" />
      </Box>

      {/* SEARCH BOX */}
      <SearchBox
        data={combinedWorkflowMetaData}
        setWorkflowData={setWorkflowData}
        setMainTabValue={setMainTabValue}
        setSubTabValue={setSubTabValue}
        theme={theme}
        colors={colors}
      />

      {/* TABS */}
      <TabContext value={mainTabValue}>
        <Box sx={{ 
          borderBottom: 1, 
          borderColor: 'divider', 
          mt:-1.5,
          mb: 3.5,
        }}>
          <TabList 
            value={mainTabValue} 
            onChange={handleChange} 
            indicatorColor="secondary" 
            textColor="inherit" 
            variant="fullWidth"
          >
            {Object.entries(combinedWorkflowMetaData).map(([key, value], index) => (
              <Tab
                key={index}
                label={key} 
                value={key} 
                style={{  fontSize:'14.5px', fontWeight:'medium', textTransform:'none' }}
                iconPosition="start" 
              />
            ))}
          </TabList>
        </Box>
            
        {/* CONTENT */}
        {Object.entries(combinedWorkflowMetaData).map(([key, value], index) => (
          <TabPanel value={key} key={index} >
            <CommonBox input={value} subTabValue={subTabValue} workflowData={workflowData} colors={colors} />
          </TabPanel>
        ))}
        </TabContext>     
      </Box>           
    );
};


export default GHATools;