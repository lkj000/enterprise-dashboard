import { React, useState } from 'react';
import { Box } from '@mui/material';
import RiskDropdown from './RiskDropdown';
import RiskTable from './RiskTable';


const RiskMain = ({ theme, colors }) => {

  const [ projKey, setProjKey ] = useState('All');
  const [ port, setPort ] = useState('All');
  const [ selectVP, setVP ] = useState('All');
  const [ selectDirector, setDirector ] = useState('All');
  const [ selectManager, setManager ] = useState('All');

  
  return (
    <Box>
      <RiskDropdown
        projKey={projKey}
        port={port}
        selectVP={selectVP}
        selectDirector={selectDirector}
        selectManager={selectManager}
        setProjKey={setProjKey}
        setPort={setPort}
        setVP={setVP}
        setDirector={setDirector}
        setManager={setManager}
        theme={theme}
        colors={colors}
      />

      <RiskTable
        projKey={projKey}
        port={port}
        selectVP={selectVP}
        selectDirector={selectDirector}
        selectManager={selectManager}
      />
    </Box>
  );
};

export default RiskMain;