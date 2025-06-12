import React from "react";
import { Box, Typography } from "@mui/material";

const ChartBox = ({ title, colors, children }) => {
  return (
    <Box
      sx={{
        filter: "drop-shadow(0px 4px 3px rgba(0, 0, 0, 0.2))",
        borderRadius: "5px",
        overflowY: "auto",
      }}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      marginTop={5}
      padding={2}
      backgroundColor={colors.primary[400]}
    >
      <Box padding={2}>
        <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
          {title}
        </Typography>
      </Box>
      {children}
    </Box>
  );
};

export default ChartBox;
