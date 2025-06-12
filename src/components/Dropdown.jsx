import React from 'react';
import { Box, Typography, Autocomplete, TextField, useTheme, useMediaQuery } from '@mui/material';
import { tokens } from "../theme";

const Dropdown = ({ setState, state, options, title }) => {
  const sortOptions = (a, b) => {
    if (a.toLowerCase() < b.toLowerCase()) {
      return -1;
    }
    if (a.toLowerCase() > b.toLowerCase()) {
      return 1;
    }
    return 0;
  }
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const optionsWithAll = ['all', ...options.sort(sortOptions)];

  const handleChange = (event, newvalue) => {
    if (!newvalue) {
      newvalue = 'all';
    }
    // setValue(newvalue);
    setState(newvalue);
  }
  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  } 
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('xl'));

  let dropdownHeight = "280px";
  if (isSmallScreen) {
    dropdownHeight = "100px";
  } else if (isMediumScreen) {
    dropdownHeight = "400px";
  } else if (isLargeScreen) {
    dropdownHeight = "400px";
  }
  return (
    <Box >
      {/* Your dropdown content goes here */}
      <Box
        direction="column"
        justifyContent="space-evenly"
        alignItems="flex-start"
        m={2}
       
      >
        <Typography variant="h5" fontWeight="600" color={colors.grey[100]} mb={3}>
          {title}
        </Typography>
        <Autocomplete
          options={optionsWithAll}
          value={state}
          onChange={handleChange}
          getOptionLabel={(option) => capitalize(option)}
          renderOption={(props, option) => {
            return (
              <li {...props}>
                {capitalize(option)}
              </li>
            );
          }}
          renderInput={(params) => (
            <div style={{ marginBottom: '20px', width: dropdownHeight }}>
              <TextField
                {...params}
                variant="outlined"
                label={`Select ${title}`}
                color="secondary"
              />
            </div>
          )}
        />
      </Box>
    </Box>
  );
};

export default Dropdown;