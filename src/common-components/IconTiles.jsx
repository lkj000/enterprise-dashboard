import React from 'react';
import { Box, Typography } from '@mui/material';

const IconTiles = ({ data, colors }) => {
  return (
    <>
      {data.map((tile, index) => (
        <Box
          key={index}
          display="flex"
          gridColumn={`span ${tile.span}`}
          backgroundColor={colors.primary[400]}
          boxShadow="0px 4px 10px rgba(0, 0, 0, 0.5)" 
          sx={{ filter: 'drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.2))', borderRadius: '5px' }}
        >
          <Box display="flex" flexDirection="column" ml="20px" mt={tile.mt}>
            {tile.icon}
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{ color: colors.grey[100], mt: '6px' }}
            >
              {tile.value}
            </Typography>
            <Typography variant="h5" sx={{ color: colors.tertiary[500], mt: '6px' }}>
              {tile.title}
            </Typography>
          </Box>
        </Box>
      ))}
    </>
  );
};

export default IconTiles;