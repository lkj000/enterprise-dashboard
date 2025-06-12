import React from 'react';
import { Box, Grid, Typography } from '@mui/material';

const PieChartBox = ({ title, children, colors }) => {
  
  return (
    <Grid item xs={12} sm={6} md={6} lg={3} sx={{ 
      display: 'flex', 
      flexDirection: 'row', 
      justifyContent: 'space-evenly'
    }}>
      <Box
        display='flex'
        flexDirection='column'
        justifyContent='space-between'
        alignItems='center'
      >
        <Typography
          variant="h5"
          fontWeight="600"
          color={colors.grey[100]}
        >
          {title}
        </Typography>
        <Box sx={{ width: '280px', height: 400 }}>
          {children}
        </Box>
      </Box>
    </Grid>
  );
};

export default PieChartBox;