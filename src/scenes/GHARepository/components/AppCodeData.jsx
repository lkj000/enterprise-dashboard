import { React } from "react";
import { Box, Typography } from '@mui/material';


const AppCodeData = ({ data, colors }) => {

  const prod_deployCount = data.reduce((acc, curr) => {
    return curr.ProdDeployCountLast30days + acc;
  }, 0);

  const max_deployCount = data.reduce((max, item) => Math.max(max, item.ProdDeployCountLast30days), 0);

  return (
    <Box sx={{ mt: '-15px', ml: '20px', mb: '20px' }}>
      <Typography
        variant='h6'
        fontSize="16px"
        sx={{ color: colors.tertiary[500], ml: '20px' }}
      >
        Total Deployments per App Code for Last 30 Days
        <b style={{ marginLeft: '20px' }}>- &nbsp;&nbsp; {prod_deployCount}</b>
      </Typography>

      <Typography
        variant='h6'
        fontSize="16px"
        sx={{ color: colors.tertiary[500], ml: '20px' }}
      >
        Maximum Deployments in App Code for Last 30 Days
        <b style={{ marginLeft: '20px' }}>- &nbsp;&nbsp;&nbsp; {max_deployCount}</b>
      </Typography>
    </Box>
  );
};

export default AppCodeData;