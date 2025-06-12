import React from 'react';
import { Box, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Typography } from '@mui/material';
import "./styles.css";

const RadioButton = ({ title, value, name, label, handleChange, colors }) => {

  const handleRadioChange = (event, newValue) => {
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
        <Box
          direction="column"
          justifyContent="space-evenly"
          alignItems="flex-start"
          m={2}
        >
          <FormControl>
            <Typography variant="h5" fontWeight="600" color={colors.grey[100]} mb={3}>
              {title}
            </Typography>
            <RadioGroup
              row
              name="row-radio-buttons-group"
              color="red"
              marginLeft="25px"
              value={value}
              onChange={handleRadioChange}
            >
              <div className='radio-group'>
                {label.map((item, index) => {
                  return (
                    <FormControlLabel key={index} value={name[index]} control={<Radio className='radio-label' sx={{
                      color: colors.tertiary[400],
                      '&.Mui-checked': {
                        color: colors.tertiary[400],
                      },
                    }}/>} label={item} />
                  )
                })}
              </div>
            </RadioGroup>
          </FormControl>
        </Box>
    </Grid>
  );
};

export default RadioButton;