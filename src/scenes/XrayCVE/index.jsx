import { React } from 'react';
import { Box, useTheme } from '@mui/material';
import Header from "../../components/Header";
import XrayMain from './components/XrayMain';
import { XrayData } from './requests';
import { tokens } from "../../theme";


const XrayCVE = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

   
  return (
    <Box m="25px">

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Xray Vulnerabilities" />
      </Box>

      <XrayMain data={XrayData} theme={theme} colors={colors} />

    </Box>
  );
};

export default XrayCVE;