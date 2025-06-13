import React from 'react';
import { Box, DialogTitle, Typography } from '@mui/material';
import { getDialogData } from '../requests';


const CDMDialog = ({ selectItem }) => {

  const DialogData = selectItem ? getDialogData(selectItem) : [];


  return (
    <div>
      {selectItem ? <Box m={5}>
        <Box display="flex" flexDirection="row" justifyContent="center">
          <DialogTitle fontSize={30} fontWeight={600} marginLeft={-3} marginTop={1}>
            {selectItem.name}
          </DialogTitle>
        </Box>

        {DialogData.map((item, index) => (
        <Typography key={index} variant="body1" sx={{ textAlign: 'justify', marginTop: '20px' }}>
          {item.title}: {item.value}
        </Typography>
        ))}
      </Box> : null}
    </div>
  );
};

export default CDMDialog;