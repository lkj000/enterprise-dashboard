import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import NetworkCheckIcon from '@mui/icons-material/NetworkCheck';
import SignalCellularAltOutlinedIcon from '@mui/icons-material/SignalCellularAltOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import { tokens } from "../../../theme";
import { HistoryCount } from "../../../data/historyWorkflow";


const HomeTiles = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const tiles = [
    {
      title: "Total Workflows run for Last 30 days",
      icon: (<NetworkCheckIcon
        sx={{ color: colors.tertiary[600], fontSize: "30px" }}
      />),
      value: HistoryCount[0].workflow_count,
      span: 4,
      mt: '28px'
    },
    {
      title: "Runners",
      icon: (<DirectionsRunIcon
        sx={{ color: colors.tertiary[600], fontSize: "26px" }}
      />),
      value: HistoryCount[0].runners_count,
      span: 3,
      mt: '30px'
    },
    {
      title: "GitHub Repositories",
      icon: (<GitHubIcon
        sx={{ color: colors.tertiary[600], fontSize: "26px" }}
      />),
      value: HistoryCount[0].repo_count,
      span: 4,
      mt: '30px'
    },
    {
      title: "Repositories Released to Production in Last 3 Months",
      icon: (<Box display="flex" flexDirection="column" mt="6px">
        <TrendingUpOutlinedIcon
          sx={{ color: colors.tertiary[600], fontSize: "24px" }}
        />
        <SignalCellularAltOutlinedIcon
          sx={{ color: colors.tertiary[600], fontSize: "24px", mt: '-10px' }}
        />
      </Box>),
      value: HistoryCount[0].prod_repoCount,
      span: 5,
      mt: '10px'
    }
  ]
  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(16, 1fr)"
      gridAutoRows="140px"
      gap="20px"
     
    >
      {/* Your content goes here */}
      {tiles.map((tile, index) => (
        <Box
          gridColumn={`span ${tile.span}`}
          backgroundColor={colors.primary[400]}
          display="flex"
          key={index} 
          sx={{ filter: 'drop-shadow(0px 4px 2px rgba(0, 0, 0, 0.2))', borderRadius: '5px' }} 
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
    </Box>
  );
};

export default HomeTiles;