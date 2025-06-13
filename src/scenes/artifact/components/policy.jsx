import React from 'react';
import { Box, Typography } from '@mui/material';
import { ArtifactPolicy } from "../../../data/artifactPolicy";

const Policy = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      sx={{ width: '100%', height: '90vh' }}>
      <Box
        display="flex"
        flexDirection="column"
      >
        {ArtifactPolicy[0].define.map((data, index) => {
          return (
            <>
              <Typography key={index} fontSize="16px">
                {data.title}
              </Typography>
              <br />
            </>
          )
        })}

        <ol>
          {ArtifactPolicy[0].policy.map((data, index) => {
            return (
              <>
                <li key={-index-1}>
                  <Typography variant="p" fontSize="16px" paddingLeft="10px" fontWeight="bold">
                    {data.name}
                  </Typography>
                </li>
                <ul key={index+1} style={{ listStyleType: 'initial' }}>
                  {data.content.map((info, index1) => {
                    return (
                      <li key={index1}>
                        <Typography variant="p" fontSize="16px">
                          {info.title}
                        </Typography>
                      </li>
                    )
                  })}
                </ul>
                <br />
              </>
            )
          })}
        </ol>
      </Box>
    </Box>
  );
};

export default Policy;