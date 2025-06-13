import { React } from "react";
import { Box, useTheme } from '@mui/material';
import Header from "../../components/Header";
import { FetchData } from "./requests";
import { tokens } from "../../theme";


const Logs = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  return (
    <Box m="25px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="GitHub Logs" subtitle="GitHub User's Logs in last 30 Days" />
      </Box>

      <FetchData theme={theme} colors={colors} />
    </Box>
  );
};

export default Logs;