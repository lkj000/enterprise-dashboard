import { React } from 'react';
import { Box } from '@mui/material';
import Header from "../../components/Header";
import CyberMatrix from './components/CyberMatrix';


const CyberDefenseMatrix = () => {


  return (
    <Box m="25px">

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Cyber Defense Matrix" subtitle="Overview" />
      </Box>

      <CyberMatrix />

    </Box>
  );
};

export default CyberDefenseMatrix;