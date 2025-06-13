import { React } from 'react';
import { Box, useTheme } from '@mui/material';
import Header from "../../components/Header";
import TeamCard from './components/TeamCard';
import { tokens } from "../../theme";
import { ManagerData } from './requests';

const TeamActivity = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
   
  return (
    <Box m="25px">

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Team Activity" subtitle="Jira Activity in last 90 Days" />
      </Box>
      <TeamCard data={ManagerData} theme={theme} colors={colors} />

    </Box>
  );
};

export default TeamActivity;