import { React } from "react";
import { Box, useTheme } from '@mui/material';
import Header from "../../components/Header";
import ExemptionMain from "./components/ExemptionMain";
import { ExempData } from "./requests";
import { tokens } from "../../theme";


const VeracodeExemptions = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="25px">

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Veracode Exemptions" subtitle="Overview" />
      </Box>

      <ExemptionMain data={ExempData} theme={theme} colors={colors} />

    </Box>
  );
};

export default VeracodeExemptions;