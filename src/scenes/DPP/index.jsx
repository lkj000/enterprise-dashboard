import { React } from "react";
import { Box, Typography, useTheme } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import Header from "../../components/Header";
import { tokens } from "../../theme";
import FetchDPPData from "./requests";


const DPP = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  return (
    <Box m="25px">

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Developer Productivity" subtitle="" />
        <Box display="flex" alignItems="center" gap="7px">
          <VisibilityOutlinedIcon sx={{ fontSize: 28, color: colors.tertiary[400] }} />
          <Typography fontSize={18} sx={{ fontWeight: 600, color: colors.tertiary[400]}}>
            PREVIEW
          </Typography>
        </Box>
      </Box>

      <FetchDPPData theme={theme} colors={colors} />

    </Box>
  );
};

export default DPP;