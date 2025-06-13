import React from 'react';
import { AppBar, Box, Dialog, IconButton, Toolbar, Typography } from '@mui/material';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';

const DialogBox = ({ title, openDialog, handleClose, styleClass, width, px, colors, children }) => {
  return (
    <Dialog 
    PaperProps={{
      style: {
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.7)',
        borderRadius: '8px'
      }
    }}
      open={openDialog}
      onClose={handleClose}
      maxWidth="lg"
    >
      <AppBar position="sticky" color="primary">
        <Toolbar>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            onClick={handleClose}
          >
            <HighlightOffOutlinedIcon fontSize="large" />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div style={styleClass}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width={width}
          height="400px"
          px={px}
          m="0px"
          backgroundColor={colors.primary[400]}
        >
          {children}
        </Box>
      </div>
    </Dialog>
  );
};

export default DialogBox;