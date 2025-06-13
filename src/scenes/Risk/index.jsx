import { React } from "react";
import { Box, useTheme } from '@mui/material';
import Header from "../../components/Header";
import RiskMain from "./components/RiskMain";
import { tokens } from "../../theme";


const Risk = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  return (
    <Box m="25px">

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Risk" />
      </Box>

      <RiskMain theme={theme} colors={colors} />

    </Box>
  );
}

export default Risk;