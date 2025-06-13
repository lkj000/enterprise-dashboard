import {React, useEffect, useState} from "react";
//import { useQuery } from 'react-query';
import { Box } from '@mui/material';
import TabPanel from '@mui/lab/TabPanel';
import ProgressIcon from "../../common-components/ProgressIcon";
import { callExpressServerEndpoint } from "../../utils";
import RepoAct from './components/RepoActivity/RepoAct';
import UserAct  from './components/UserActivity/UserAct';
import LinearPercentageProgressBar from "../../common-components/LinearPercentageProgressBar";

const GitHubAct = ({ theme, colors}) => {

  const [repoAct, setRepoAct] = useState([]);
  const [userAct, setUserAct] = useState([]);
  const [progress, setProgress] = useState(0);
  const [repoDates, setRepoDates] = useState("");
  const [dates, setDates] = useState([]);
  const totalPages = 7;
  const progressPerPage = 100 / totalPages;

  
  useEffect(() => {

    const callBackUserDataFunction = (response) => {
      const data = response.data.data;
      setDates([response.data.from_date, response.data.til_date]);
      setUserAct(previousData => [...previousData, ...data]);
      setProgress((prevProgress) =>  prevProgress + progressPerPage);
    };

    const callBackRepoDataFunction = (response) => {
      const data = response.data.data;
      setRepoDates(response.data.update_date);
      setRepoAct(previousData => [...previousData, ...data]);
      // setProgress((prevProgress) =>  prevProgress + progressPerPage);
    };

    for(let number = 1; number <= totalPages; number++) {
      callExpressServerEndpoint('GET', `githubUserData?number=${number}`, null, callBackUserDataFunction);
      callExpressServerEndpoint('GET', `githubRepoData?number=${number}`, null, callBackRepoDataFunction);
    }

  }, [progressPerPage]);

  // const { data: repoAct, isLoading: repoLoading } = useQuery('repoData', getRepoData);
  // const { data: userAct, isLoading: userLoading } = useQuery('userData', getUserData);

  if (userAct.length === 0 || repoAct.length === 0) {
    return  <ProgressIcon />;
  }

  return (
    <Box>
      {progress < 100
      &&
      <Box sx={{ width: '100%' }}>
        <LinearPercentageProgressBar value={progress} />
      </Box>}
      <TabPanel value="1">
          <UserAct data={userAct} theme={theme} colors={colors} dates={dates}/>
      </TabPanel>
      <TabPanel value="2">
          <RepoAct data={repoAct} dates={repoDates} theme={theme} colors={colors} />
      </TabPanel>
    </Box>
  );
};

export default GitHubAct;