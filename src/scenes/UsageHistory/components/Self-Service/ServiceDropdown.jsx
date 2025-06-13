import { React } from "react";
import {Box, Grid} from '@mui/material';
import Dropdown from "../../../../common-components/Dropdown";
import { totData, successData, failedData, RepoData, FileData } from "./ServiceData";
import { calTotalValue } from "../../../../utils";


const ServiceDropdown = ({ input, selectRepo, setRepo, selectFile, setFile, setTotCount, setSuccessCount, setFailedCount, setGraphData, theme, colors}) => {

  const handleChangeRepo = (_event, newData) => {
    setRepo(newData);
    setFile('All');
    setGraphData({});
    if(newData === 'All' || !newData) {
      setRepo('All');
      setTotCount(totData);
      setSuccessCount(successData);
      setFailedCount(failedData);
    }else{
      const repoInfo = RepoData[newData];
      setTotCount(calTotalValue(repoInfo, 'total_runs'));
      setSuccessCount(calTotalValue(repoInfo, 'success'));
      setFailedCount(calTotalValue(repoInfo, 'failure'));
    }
  };

  const handleChangeFile = (_event, newData) => {
    setFile(newData);
    if(newData === 'All' || !newData) {
      setFile('All');
      setGraphData({});

      if(selectRepo === 'All' || !selectRepo){
        setTotCount(totData);
        setSuccessCount(successData);
        setFailedCount(failedData);
      }else{
        setTotCount(calTotalValue(RepoData[selectRepo], 'total_runs'));
        setSuccessCount(calTotalValue(RepoData[selectRepo], 'success'));
        setFailedCount(calTotalValue(RepoData[selectRepo], 'failure'));
      }
    }else{
      const fileInfo = input[selectRepo][newData];
      setTotCount(calTotalValue(FileData[selectRepo][newData], 'total_runs'));
      setSuccessCount(calTotalValue(FileData[selectRepo][newData], 'success'));
      setFailedCount(calTotalValue(FileData[selectRepo][newData], 'failure'));
      setGraphData(fileInfo);
    }
  }


  return (
    <Box>
      <Box
        display="flex"
        marginBottom="40px"
        sx={{ backgroundColor: colors.primary[400], width: '100%', height: 'auto' ,filter: 'drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.2))', borderRadius: '5px'}}
        boxShadow="0px 4px 10px rgba(0, 0, 0, 0.5)"
      >                
        <Grid container>
          <Dropdown
            title="Repositories"
            subtitle="Repository"
            options={Object.keys(input).sort()}
            value={selectRepo}
            handleChange={handleChangeRepo}
            theme={theme}
            colors={colors}
          />

        {selectRepo !== 'All' && selectRepo && (
          <Dropdown
            title="Workflow Files"
            subtitle="Workflow File"
            options={Object.keys(input[selectRepo]).sort()}
            value={selectFile}
            handleChange={handleChangeFile}
            theme={theme}
            colors={colors}
          />)}
        </Grid>
      </Box>
    </Box>
  );
}

export default ServiceDropdown;