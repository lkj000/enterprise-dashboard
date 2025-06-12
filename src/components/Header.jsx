import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

const Header = ({ title, subtitle, subtitle1 = "" }) => {
  const {palette: { mode }} = useTheme();
  const colors = tokens(mode);
  return (
    <Box mb="10px">
      <Typography
        variant="h2"
        color={colors.grey[100]}
        fontWeight="bold"
        sx={{ m: "0 0 5px 0" }}
      >
        {title}
      </Typography>
      <Typography variant="h5" color={colors.tertiary[400]}>
        {subtitle}
      </Typography>
      <Typography variant="h5" color={colors.tertiary[400]}
        sx={{ m: subtitle1 !== "" && "3px 0 0 0" }}>
        {subtitle1}
      </Typography>
    </Box>
  );
};

export default Header;
