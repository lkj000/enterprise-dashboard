import { React, lazy, Suspense } from 'react';
import { useQuery } from 'react-query';
import { Box, useTheme } from '@mui/material';
import ProgressIcon from "../../common-components/ProgressIcon";
import Header from "../../components/Header";
import { getRepoList } from "./requests";
import { tokens } from "../../theme";


const HistoryMain = lazy(() => import('./components/ACRHistory/HistoryMain'));
const ImgHistory = ({ colors }) => {

  const { data: repoNames, isLoading: loading } = useQuery('RepoNames', getRepoList);

  if (loading){
    return  <ProgressIcon />;
  }

  return (
    <Suspense fallback={<ProgressIcon />}>
      <HistoryMain repoNames={repoNames} colors={colors} />
    </Suspense>
  );
}


const ACR = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  return (
    <Box m="25px">

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Azure Container Registry" subtitle="Overview" />
      </Box>

      <ImgHistory colors={colors} />

    </Box>
  );
};

export default ACR;