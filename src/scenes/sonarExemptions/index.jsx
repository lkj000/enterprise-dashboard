import { React } from "react";
import { Box, useTheme } from '@mui/material';
import Header from "../../components/Header";
import SonarCard from "./components/SonarCard";
import { tokens } from "../../theme";
import { processData } from "./requests";

const SonarExemptions = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="25px">

      {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="Sonar Exemptions" subtitle="Overview" />
        </Box>

        <SonarCard data={processData} theme={theme} colors={colors} />
    </Box>
  );
};

export default SonarExemptions;