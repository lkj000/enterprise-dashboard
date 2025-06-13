import { React } from "react";
import { Box, useTheme } from '@mui/material';
import Header from "../../components/Header";
import ProjectCard from "./components/ProjectCard";
import { sprintData } from "./requests";
import { tokens } from "../../theme";

const SprintActivity = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  return (
    <Box m="25px">

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Sprint Activity" subtitle="Stories, Backlogs, Epics and Features in Active Sprints" />
      </Box>

      <ProjectCard data={sprintData} theme={theme} colors={colors} />

    </Box>
  );
}

export default SprintActivity;