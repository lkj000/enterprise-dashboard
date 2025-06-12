import * as React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import ChangeHistoryOutlinedIcon from '@mui/icons-material/ChangeHistoryOutlined';
import { tokens } from "../theme";
// import {VeracodeData} from '../data/mainData';


const SingleCB = ({title1,content1}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box 
      margin='0'
      display="flex" 
      gridTemplateColumns="repeat(16)" 
      gap={3}
      justifyContent="space-evenly" 
      alignItems="center"
    >
      {/* V0 */}
      <Box 
        gridColumn="span 8" 
        backgroundColor={colors.primary[400]}
        sx={{
          width: '45%',
          height: 450,
          boxShadow: 3,
          overflow: 'auto',
          display: 'flex',
        }}>
        <Box 
          display="flex">
          <Box 
            display="grid" 
            >
            <Box m={2}>
              <ChangeHistoryOutlinedIcon />
            </Box>
            <Box 
              mt={-27} 
              ml={2.4}>
              <Typography 
                variant="h5">
                {title1}
              </Typography>
            </Box>
          </Box>
            <Box 
              mt={2} 
              mr={3.5}>
              <Typography>
                {content1}
              </Typography>
              {/* {VeracodeData.map((data,key) => {
              return (
                <div key={key} style={{ padding: `0 ${theme.spacing(0.5)}` }}>
                    {
                    data.id + " , " +  
                    data.RepositoryName + " , " +
                    data.VeracodePresent +  " , " +
                    data.DeploymentStrategy  + " , " +
                    data.PathToProductionStatus
                    }
                </div>
              )
              })} */}
            </Box>
        </Box>
      </Box>
    </Box>
  )
};

export default SingleCB;