import React from 'react';
import { Autocomplete, Box, Grid, TextField, Typography, useMediaQuery } from '@mui/material';
import './styles.css';

const CustomDropdown = ({ title, subtitle, options, optionsDisable = () => {}, value, handleChange, theme, colors }) => {

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumOrLargeScreen = useMediaQuery(theme.breakpoints.up('md'));
  let dropdownHeight = isSmallScreen ? '100px' : isMediumOrLargeScreen ? '400px' : '280px';

  const handleDropdownChange = (event, newValue) => {
    handleChange(event, newValue);
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
      <Box direction="column" justifyContent="space-evenly" alignItems="flex-start" m={2}>
        <Typography variant="h5" fontWeight="600" color={colors.grey[100]} mb={3}>
          {title}
        </Typography>
        <Autocomplete
          options={[...options]}
          getOptionDisabled={optionsDisable}
          value={value}
          onChange={handleDropdownChange}
          renderInput={(params) => (
            <div className='dropdown-menu' style={{ width: dropdownHeight }}>
              <TextField {...params} variant="outlined" label={`Select ${subtitle}`} color="secondary" />
            </div>
          )}
        />
      </Box>
    </Grid>
  );
};

export default CustomDropdown;