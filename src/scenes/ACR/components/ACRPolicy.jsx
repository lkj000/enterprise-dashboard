import { React }  from 'react';
import { Box, Typography } from '@mui/material';
import { policyData, policyHeaders } from "../requests";


const ACRPolicy = ({ colors }) => {

  return (
    <Box>
      <Box display="flex" mb="25px">
        <Typography variant="h4" color={colors.tertiary[400]} sx={{ textTransform: 'uppercase', fontWeight: 'bold' }}>
          {policyHeaders[0]}
        </Typography>
      </Box>

      <Box             
        display="flex"
        flexDirection="column"
        sx={{ width: '100%', height: '90vh'}}
      >               
        {policyData.map((data, index) => {
          return ( <div key={index}>
            <Typography variant="p" fontSize="16px" paddingLeft="10px" fontWeight="bold">
              {data.name}
            </Typography>
            <ul style={{ listStyleType: 'initial'}}>
              {data.content.map((info, i) => {
                return ( <li key={i}>
                  <Typography variant="p" fontSize="16px">
                    {info.title}
                  </Typography>
                </li> )
              })}
            </ul>                    
            <br/>
          </div> )
        })}
      </Box>

      <Box display="flex" mb="25px" justifyContent="left">
        <Typography variant="h6" color={colors.tertiary[400]} sx={{ textTransform: 'uppercase', fontWeight: 'bold' }}>
          {policyHeaders[1]}
        </Typography>
      </Box>

    </Box>
  );
}

export default ACRPolicy;