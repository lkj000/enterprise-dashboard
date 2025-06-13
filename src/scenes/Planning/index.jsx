import { React } from "react";
import { Box, useTheme } from '@mui/material';
import Header from "../../components/Header";
import PlanCard from "./components/PlanCard";
import { projectData } from "./requests";
import { tokens } from "../../theme";


const Planning = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  return (
    <Box m="25px">

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="Planning (Public Preview)"
          subtitle="Overview" 
        />
      </Box>

      <PlanCard data={projectData} theme={theme} colors={colors} />

    </Box>
  );
}

export default Planning;