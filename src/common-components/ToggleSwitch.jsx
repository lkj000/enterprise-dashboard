import React from 'react';
import { Box, FormControlLabel, FormGroup, Grid, Switch } from '@mui/material';

const ToggleSwitch = ({ title, value, handleChange }) => {

  const handleSwitchChange = (event) => {
    handleChange(event.target.checked);
  };
  
  return (
    <Grid
      item
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
      }}
    >
      <Box
        direction="column"
        justifyContent="space-evenly"
        marginLeft="30px"
        height="150px"
      >
        <FormGroup sx={{ marginTop:"50px" }}>
          <FormControlLabel 
            control={
              <Switch
                checked={value}
                onChange={handleSwitchChange}
                inputProps={{ 'aria-label': 'controlled' }}
                color="secondary"
              />
            } 
            label={title} />
        </FormGroup>
      </Box>
    </Grid>
  );
};

export default ToggleSwitch;