import React from 'react';
import { Box, Tooltip, Typography } from '@mui/material';
import './styles.css';

const ToolTipBox = ({ data }) => {

  return (
    <div className='tooltip-box'>
        <Box display="flex" flexDirection="row" gap={0.7}>                       
            {data.map((item,index) => (
                <Tooltip key={index} title={<Typography fontSize={14}>{`${item.contributionCount} contributions on ${item.date}`}</Typography>}>
                    <Box sx={{
                        width: '14px',
                        height: '14px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        backgroundColor: `${item.color}`
                    }}>
                    </Box>
                </Tooltip>
            ))} 
        </Box>
    </div>
  );
};

export default ToolTipBox;