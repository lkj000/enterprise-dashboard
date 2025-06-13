import {React, useState} from 'react';
import { Box } from '@mui/material';
import TrafficChart from './TrafficChart';
import TrafficDropdown from './TrafficDropdown';
import TrafficTable from './TrafficTable';


const TrafficMain = ({ data, theme, colors }) => {

  const [ selectURL, setSelectURL ] = useState('All');
  const [ URLData, setURLData ] = useState([]);


  return (
    <Box>
      <TrafficDropdown
        input={data}
        selectURL={selectURL}
        setSelectURL={setSelectURL}
        setURLData={setURLData}
        theme={theme}
        colors={colors}
      />
      <TrafficChart
        input={data}
        selectURL={selectURL}
        URLData={URLData}
        colors={colors}
      />
      <TrafficTable input={URLData} path={selectURL} />
    </Box>
  );
};

export default TrafficMain;