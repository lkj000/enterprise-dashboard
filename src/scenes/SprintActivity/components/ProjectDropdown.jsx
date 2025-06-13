import { React, useEffect, useState } from "react";
import { useSearchParams } from 'react-router-dom';
import { Box, Grid } from '@mui/material';
import jiraImg from "../../../Assets/jira.png";
import CopyIcon from '@mui/icons-material/ContentCopy';
import CustomAccordion from "../../../common-components/Accordion/CustomAccordion";
import IconClick from "../../../common-components/IconClick";
import CustomDropdown from "../../../common-components/CustomDropdown";
import ToggleSwitch from "../../../common-components/ToggleSwitch";
import JiraModal from "./jira/JiraModal";
import { jiraModalFields } from "./jira/ModalFunc";
import { keyData, activeSprintNames, activeSprintsData, projectData } from "../requests";


const ProjectDropdown = ({ input, projKey, setProjKey, setProjData, selectSprint, setSelectSprint, setSprintData, setProjTables, weekend, setWeekend, theme, colors }) => {

  const [searchParams] = useSearchParams();
  const [ModalOpen, setModalOpen] = useState(false);
  const [extractData, setExtractData] = useState({ project: projKey, ...jiraModalFields });


  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const path1 = searchParams.get('projectKey');
    const path2 = searchParams.get('activeSprint');
    path1 && getProjectData(null, path1, path2);
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */


  useEffect(() => {
    if (projKey && !selectSprint) {
      setProjData(projectData[projKey]?.[0] || []);
      setSelectSprint(activeSprintNames[projKey]?.[0] || null);
      setSprintData(activeSprintsData[projKey]?.[0] || []);
    }
  }, [projKey, setProjData, selectSprint, setSelectSprint, setSprintData]);


  // PROJECT KEY
  const getProjectData = (event, newKey, sprintName) => {
    setProjKey(newKey);
    setExtractData({ project: newKey, ...jiraModalFields });
  
    if (!newKey) {
      setProjKey(null);
      setProjData([]);
      setProjTables([]);
      setSelectSprint(null);
      setSprintData([]);
    } else {
      setProjTables(input.filter(item => item.projectKey === newKey)[0] || []);
      const upprojectInfo = projectData[newKey].find(item => item.some(data => data.name === sprintName)) || projectData[newKey]?.[0] || [];
      const upSprintName = activeSprintNames[newKey].find(item => item === sprintName) || activeSprintNames[newKey]?.[0] || null;
      const upSprintData = activeSprintsData[newKey].find(item => item.name === sprintName) || activeSprintsData[newKey]?.[0] || [];
      setProjData(upprojectInfo);
      setSelectSprint(upSprintName);
      setSprintData(upSprintData);
    }
  };

  const handleProjectKey = (event, newKey) => {
    getProjectData(event, newKey, null);
  };

  // ACTIVE SPRINT
  const handleSprintChange = (event, newSprint) => {
    setSelectSprint(newSprint);
    if(projKey && newSprint){
      const projectInfo = projectData[projKey].find(item => item.some(data => data.name === newSprint)) || [];
      setProjData(projectInfo);
      setSprintData(activeSprintsData[projKey].filter(item => item.name === newSprint)[0] || []);
    }
  };


  // COPY URL
  const copyURL = async () => {
    try {
      const host = window.location.host;
      const urlPath = window.location.pathname;
      const params1 = `?projectKey=${projKey}`;
      const params2 = selectSprint ? `&activeSprint=${selectSprint}` : '';
      const url = `${host}${urlPath}${projKey ? (params1 + params2) : ''}`;
      await navigator.clipboard.writeText(url);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };



  return (
    <CustomAccordion
      defaultValue={true}
      title="Filters"
      isDisplay={true}
      stylesInfo={{ marginBottom: '40px'}}
      colors={colors}
    >              
      <Grid container>
        <CustomDropdown
          title="Project Key"
          subtitle="Project Key"
          options={keyData}
          value={projKey}
          handleChange={handleProjectKey}
          theme={theme}
          colors={colors}
        />

        {projKey ? <>
          <CustomDropdown
            title="Active Sprint"
            subtitle="Active Sprint"
            options={activeSprintNames[projKey] || null}
            value={selectSprint}
            handleChange={handleSprintChange}
            theme={theme}
            colors={colors}
          />
          <Box marginTop={2}>
            <ToggleSwitch
              title="Exclude Weekend"
              value={weekend}
              handleChange={(value) => setWeekend(value)}
            />
          </Box>       
          <Box marginTop={6}>
            <IconClick 
              title="Copy Link"
              icon={(<CopyIcon />)}
              handleClick={copyURL}
              colors={colors}
            />
          </Box>
          <Box>
            <img
              className="jira-img"
              src={jiraImg}
              alt="jira"
              width="80px"
              style={{ cursor: 'pointer', marginTop: '52px', marginLeft: '20px' }}
              onClick={() => setModalOpen(true)}
            />
            <JiraModal
              extractData={extractData}
              isOpen={ModalOpen}
              setModalOpen={setModalOpen}
              colors={colors}
            />
          </Box>
        </> : null }

      </Grid>
    </CustomAccordion>
  );
}

export default ProjectDropdown;