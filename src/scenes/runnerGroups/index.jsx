import {React, useState} from "react";
import { Box, Tab } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Header from "../../components/Header";
import Runners from "../../components/Runners";
import Labels from "../../components/Labels";
import { Runner } from "../../data/runner";

const RunnerGroups= () => {

    const [value, setValue] = useState('1');
    const handleChange = (_event, newValue) => {
        setValue(newValue);
    }

    const runnerGroupLength = Runner[0].runnerGroup.length;
    var runner = [], count=0;
    for(let i=0; i<runnerGroupLength ;i++){
        if(Runner[0].runnerGroup[i].runners.length >=1){
            runner[count] = {
                index: count.toString(),
                name: Runner[0].runnerGroup[i].name,
                runners: Runner[0].runnerGroup[i].runners,
                url: Runner[0].runnerGroup[i].url
            }
            count++;
        }
        // runner.push(Runner[0].runnerGroup[i]);
    }

    // Labels
    var labelsList = [];
    for(let i=0; i<runnerGroupLength ;i++){
        var runnersLength = Runner[0].runnerGroup[i].runners.length;
        for(let j=0; j<runnersLength; j++){
            labelsList.push(Runner[0].runnerGroup[i].runners[j]);
        }
    }

    // unique labels
    const labels = Array.from(
        new Set(
            labelsList.reduce((acc,obj) => {
            const objLabels = obj.label.split(",");
            return [...acc, ...objLabels];
          }, [])
        )
      ).sort();

    // index
    var labelCheckList = [];
    for(let i=0; i< labels.length; i++){
        labelCheckList[i] = {
            index: i,
            label: labels[i]
        }
    }

    //Filter labels
    var labelCheck = [];
    for(let i=0; i< labels.length; i++){
        var labelListData = [], x=0;
        for(let j=0; j< labelsList.length; j++){
            var text= labelsList[j].label.split(",");
            var labelCompare = text.some(lab => lab === labels[i]);
            if(labelCompare){
            // if(labelsList[j].label.includes(labels[i])){
                labelListData[x] = {
                    id: x+1,
                    runnerName: labelsList[j].runnerName,
                    label: labelsList[j].label,
                };
                x++;
            }
        }
        labelCheck[i] = labelListData;
    }

    return (
        <Box m="25px">

        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Header title="Runner Groups" subtitle="Overview" />
        </Box>

        {/* TABS */}
        <TabContext value={value}>
          <Box
            sx={{ 
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
                // variant="scrollable"
                // scrollButtons
                // allowScrollButtonsMobile
            >
                <Tab 
                    label="Runner Groups" 
                    value="1" 
                    style={{fontSize:'14.5px', fontWeight:'medium'}}
                    iconPosition="start" 
                />
                <Tab 
                    label="Labels"
                    value="2"
                    style={{fontSize:'14.5px', fontWeight:'medium'}}
                    iconPosition="start" 
                />
               
            </TabList>
          </Box>
        
          {/* CONTENT */}
            <TabPanel value="1" >
                <Runners input={runner} />
            </TabPanel>
            <TabPanel value="2" >
                <Labels list={labelCheckList} input={labelCheck} />
            </TabPanel>
        </TabContext>

    </Box>
    );
};

export default RunnerGroups;