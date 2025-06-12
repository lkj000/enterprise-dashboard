import React from "react";
import { Backdrop, CircularProgress, Typography, Box } from "@mui/material";

const FullScreenLoader = ({ open, progress, message }) => {
  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.modal + 1,
        display: "flex",
        flexDirection: "column",
      }}
      open={open}
    >
      <CircularProgress color="inherit" />
      <Box mt={2}>
        <Typography variant="h6" color="inherit">
          {progress !== undefined ? `${message} ${progress}%` : message}
        </Typography>
      </Box>
    </Backdrop>
  );
};

export default FullScreenLoader;
