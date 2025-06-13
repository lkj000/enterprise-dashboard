import {React, useState} from 'react';
import { Box } from '@mui/material';
import ServiceChart from './ServiceChart';
import ServiceDropdown from './ServiceDropdown';
import { totData, successData, failedData } from './ServiceData';


const ServiceHistory = ({ data, theme, colors }) => {

  const [ selectRepo, setRepo ] = useState('All');
  const [ selectFile, setFile ] = useState('All');
  const [ totCount, setTotCount ] = useState(totData);
  const [ successCount, setSuccessCount ] = useState(successData);
  const [ failedCount, setFailedCount ] = useState(failedData);
  const [ graphData, setGraphData ] = useState({});


  return (
    <Box>
      <ServiceDropdown
        input={data}
        selectRepo={selectRepo}
        setRepo={setRepo}
        selectFile={selectFile}
        setFile={setFile}
        setTotCount={setTotCount}
        setSuccessCount={setSuccessCount}
        setFailedCount={setFailedCount}
        setGraphData={setGraphData}
        theme={theme}
        colors={colors}
      />
      <ServiceChart
        totCount={totCount}
        successCount={successCount}
        failedCount={failedCount}
        graphData={graphData}
        colors={colors}
      />
    </Box>
  );
};

export default ServiceHistory;