import { Box, Divider, Typography, useTheme } from "@mui/material";
import React from "react";

import { tokens } from "../../../theme";
import { parseGuidelines } from "../utils";

const RequestProcess = ({ input }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      display="flex"
      flexDirection="column"
      backgroundColor={colors.primary[400]}
      sx={{
        width: "100%",
        height: "96%",
        filter: "drop-shadow(0px 4px 3px rgba(0, 0, 0, 0.2))",
        borderRadius: "5px",
        marginBottom: 1,
        padding: 2,
      }}
    >
      <Typography variant="h4" component="div" sx={{ marginLeft: 1 }} mb="10px">
        {input.title}
      </Typography>
      <Divider color={colors.tertiary[400]} />
      {parseGuidelines(input.instructions)}
    </Box>
  );
};

export default RequestProcess;
