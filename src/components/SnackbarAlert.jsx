import React from 'react';
import { Snackbar, Alert, AlertTitle } from '@mui/material';

const SnackbarAlert = ({ 
  open, 
  onClose, 
  severity = 'info', 
  title = '',
  autoHideDuration = 5000, 
  anchorOrigin = { vertical: 'top', horizontal: 'right' },
  children
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={anchorOrigin} 
    >
      <Alert 
      onClose={onClose} 
      severity={severity} 
      sx={{ width: '100%', color: "white", fontWeight: "bold", fontSize: "14px" }}
      variant="filled"
      >
        {/* Conditionally render the title */}
        {title && <AlertTitle sx={{fontWeight: "bold", fontSize: "16px"}}>{title}</AlertTitle>}
        {children}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarAlert;