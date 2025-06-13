import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import ProgressCircle from "./ProgressCircle";

const StatBox = ({ title, subtitle, icon, progress, increase }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%" m="0 30px">
      <Box display="flex" justifyContent="space-between" ml="-15px">
        <Box display="flex" flexDirection="column" justifyContent="space-evenly">
          {icon}
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: colors.grey[100] }}
          >
            {title}
          </Typography>
        </Box>
        <Box 
          display="flex"
          flexDirection="column"
          gap={0.8}
        >
          <ProgressCircle progress={progress} />
          <Typography
          variant="h5"
          fontStyle="italic"
          sx={{ color: colors.tertiary[600] }}
          ml="5px"
          >
          {increase}
        </Typography>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" mt="1.5px" ml="-15px">
        <Typography variant="h5" sx={{ color: colors.tertiary[500] }}>
          {subtitle}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatBox;