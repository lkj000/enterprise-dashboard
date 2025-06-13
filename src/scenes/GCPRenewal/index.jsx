import { React } from "react";
import { Box, useTheme } from '@mui/material';
import Header from "../../components/Header";
import { FetchGCPRenew } from "./requests";
import { tokens } from "../../theme";


const GCPRenewal = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  return (
    <Box m="25px">

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="GCP Certificate Renewal" subtitle="Overview" />
      </Box>

      <FetchGCPRenew theme={theme} colors={colors} />
    </Box>
  );
};

export default GCPRenewal;