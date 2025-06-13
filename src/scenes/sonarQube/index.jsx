import { React } from "react";
import { Box, useTheme } from '@mui/material';
import Header from "../../components/Header";
import MetricCard from "./components/MetricCard";
import { sonarData } from "./requests";
import { tokens } from "../../theme";

const SonarQube = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="25px">

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="SonarQube Results" subtitle="Overview" />
      </Box>

      <MetricCard data={sonarData} theme={theme} colors={colors} />
    </Box>
  );
};

export default SonarQube;