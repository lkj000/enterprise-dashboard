import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import PortfolioChart from '../../../components/PortfolioChart';
import { tokens } from "../../../theme";

const SinglePie = ({ title, data, total, filterName, sendDataPie, legendX }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
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
          <PortfolioChart data={data} total={total} filterName={filterName} sendDataPie={sendDataPie} legendX={legendX} colorType={true} />
        </Box>
      </Box>
  );
};

export default SinglePie;