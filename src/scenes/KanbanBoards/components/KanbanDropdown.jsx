import { React, useState, useEffect } from "react";
import { useSearchParams } from 'react-router-dom';
import { Box, Grid } from '@mui/material';
import jiraImg from "../../../Assets/jira.png";
import CopyIcon from '@mui/icons-material/ContentCopy';
import CustomAccordion from "../../../common-components/Accordion/CustomAccordion";
import IconClick from "../../../common-components/IconClick";
import CustomDropdown from "../../../common-components/CustomDropdown";
import JiraModal from "../../SprintActivity/components/jira/JiraModal";
import { jiraModalFields } from "../../SprintActivity/components/jira/ModalFunc";
import { keyData, activeBoardNames, activeBoardData } from "../requests";


const KanbanDropdown = ({ input, projKey, setProjKey, setProjData, selectBoard, setSelectBoard, setBoardData, theme, colors }) => {


  const [searchParams] = useSearchParams();
  const [ ModalOpen, setModalOpen ] = useState(false);
  const [ extractData, setExtractData ] = useState({ project: projKey, ...jiraModalFields });


  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const path1 = searchParams.get('projectKey');
    const path2 = searchParams.get('board');
    path1 && handleProjectKey(null, path1);
    path2 && handleBoardChange(null, path2, path1);
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */



  // PROJECT KEY
  const handleProjectKey = (event, newKey) => {
    setProjKey(newKey);
    setSelectBoard(null);
    setBoardData({});
    setExtractData({ project: newKey, ...jiraModalFields });

    if (!newKey) {
      setProjKey(null);
      setProjData({});
    } else {
      setProjData(input.filter(item => item.projectKey === newKey)[0] || {});
    }
  };


  // BOARD
  const handleBoardChange = (event, newBoard, key) => {
    setSelectBoard(newBoard);
    if (!newBoard) {
      setSelectBoard(null);
      setBoardData({});
    } else {
      setBoardData(activeBoardData[key].filter(item => item.name === newBoard)[0] || {});
    }
  };

  const handleBoard = (event, newBoard) => {
    handleBoardChange(event, newBoard, projKey);
  }


  // COPY URL
  const copyURL = async () => {
    try {
      const host = window.location.host;
      const urlPath = window.location.pathname;
      const params = projKey ? `?projectKey=${projKey}${selectBoard ? `&board=${selectBoard}` : ''}` : '';
      const url = `${host}${urlPath}${params}`;
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
            title="Boards"
            subtitle="Boards"
            options={activeBoardNames[projKey] || null}
            value={selectBoard}
            handleChange={handleBoard}
            theme={theme}
            colors={colors}
          />
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

export default KanbanDropdown;