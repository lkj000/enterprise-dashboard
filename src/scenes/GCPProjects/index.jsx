import { React } from "react";
import { Box, useTheme } from '@mui/material';
import Header from "../../components/Header";
import { FetchGCPData } from "./requests";
import { tokens } from "../../theme";


const GCPProjects = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  return (
    <Box m="25px">

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="GCP Projects" subtitle="Overview" />
      </Box>

      <FetchGCPData theme={theme} colors={colors} />
    </Box>
  );
};

export default GCPProjects;