import { React, useEffect } from "react";
import {Box, Grid} from '@mui/material';
import Dropdown from "../../../../common-components/Dropdown";
import { getSortDataForDropdown } from "../../../../utils";


const TrafficDropdown = ({ input, selectURL, setSelectURL, setURLData, theme, colors}) => {

  const objDefaultFilter = getSortDataForDropdown(input, ['Path']);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    getUpdateURL(selectURL, input);
  }, [selectURL, input]);
  /* eslint-disable react-hooks/exhaustive-deps */


  const getUpdateURL = (newData, data) => {
    setSelectURL(newData);
    if (newData === 'All' || !newData) {
      setSelectURL('All');
      setURLData([]);
    } else {
      setURLData(data.filter((item) => item.Path === newData));
    }
  };

  const handleChangeURL = (_event, newData) => {
    getUpdateURL(newData, input);
  };


  return (
    <Box>
      <Box
        display="flex"
        marginBottom="40px"
        sx={{ backgroundColor: colors.primary[400], width: '100%', height: 'auto' ,filter: 'drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.2))', borderRadius: '5px'}}
        boxShadow="0px 4px 10px rgba(0, 0, 0, 0.5)"
      >                
        <Grid container>
          <Dropdown
            title="Request URLs"
            subtitle="URL"
            options={objDefaultFilter['Path']}
            value={selectURL}
            handleChange={handleChangeURL}
            theme={theme}
            colors={colors}
          />
        </Grid>
      </Box>
    </Box>
  );
}

export default TrafficDropdown;