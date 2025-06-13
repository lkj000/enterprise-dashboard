import React from 'react';
import { Box, Grid, IconButton, Typography } from '@mui/material';

const IconClick = ({ title, icon, handleClick, colors }) => {
  
  return (
    <Grid
      item
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
      }}
    >
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-evenly"
        m={2}
        marginLeft="40px"
      >
        <IconButton onClick={handleClick} color="secondary" sx={{ marginBottom: 1 }}>
          {icon}
        </IconButton>
        <Typography variant="h5" fontWeight="600" color={colors.white} sx={{ marginTop: 1 }}>
          {title} 
        </Typography>
      </Box>
    </Grid>
  );
};

export default IconClick;