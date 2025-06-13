import React, { useEffect, useState } from 'react';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Tab } from '@mui/material';
import { List } from '@mui/material';
import WorkflowListItem from './WorkflowListItem'; 
import SubjectIcon from '@mui/icons-material/Subject'; 
import { Box } from '@mui/system';


const DynamicTabs = ({ item, subTabValue, workflowData }) => {

  const [tabValue, setTabValue] = useState(item.title + "-0");

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };


  // (WHEN SEARCH RESULT CLICKED)
  useEffect(() => {
    if (subTabValue.subBoxName && subTabValue.subBoxName.includes(item.title)) {
      setTabValue(subTabValue.subBoxName);
    } else if (!subTabValue.subBoxName) {
      setTabValue(item.title + "-0");
    }
  }, [subTabValue, item]);


  return (
    <Box>
    {Object.keys(item.content).length > 1 ?
    <TabContext value={tabValue}>
      <TabList
        onChange={handleTabChange}
        indicatorColor="secondary"
        textColor="inherit"
        variant="fullWidth"
      >
        {Object.entries(item.content).map(([key, value], index) => (
          <Tab
            key={index} 
            label={key}
            value={item.title + "-" + index}
            style={{ fontSize: '14.5px', fontWeight: 'medium', textTransform: 'none' }}
            iconPosition="start"
          />
        ))}
      </TabList>

      {Object.entries(item.content).map(([key, value], index) => (
        <TabPanel key={index} value={item.title + "-" + index} sx={{ padding: 0 }}>
          <List>
            {value.map((content, inc) => (
              <WorkflowListItem
                key={inc} 
                selectedText={subTabValue.subText}
                actionIcon={SubjectIcon}
                listItemText={content.text}
                githubUrl={content.url}
                wikiUrl={content.wiki}
                workflowData={workflowData}
              />
            ))}
          </List>
        </TabPanel>
      ))}
    </TabContext>
    :
    <List>
        {item.content[Object.keys(item.content)[0]].map((content, inc) => (
        <WorkflowListItem
            key={inc} 
            selectedText={subTabValue.subText}
            actionIcon={SubjectIcon}
            listItemText={content.text}
            githubUrl={content.url}
            wikiUrl={content.wiki}
            workflowData={workflowData}
        />
        ))}
    </List>
    }
    </Box>
);
};

export default DynamicTabs;