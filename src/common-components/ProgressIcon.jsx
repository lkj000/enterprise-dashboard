import React from 'react';
import { Box, CircularProgress } from '@mui/material';

const ProgressIcon = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      position="fixed"
      top="0"
      left="0"
      width="100%"
      height="100%"
      paddingRight="15px"
    >
      <CircularProgress color="secondary" size={40} />
    </Box>
  );
};

export default ProgressIcon;