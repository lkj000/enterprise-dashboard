import { React } from "react";
import { Box, useTheme } from '@mui/material';
import Header from "../../components/Header";
import ExcludeMain from "./components/ExcludeMain";
import { sonarData } from "./requests";
import { tokens } from "../../theme";


const SonarExclusions = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="25px">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="Sonar Exclusions" subtitle="Overview" />
        </Box>

        <ExcludeMain data={sonarData} theme={theme} colors={colors} />
    </Box>
  );
};

export default SonarExclusions;