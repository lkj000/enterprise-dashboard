import { React, useState } from "react";
import { Box, useTheme } from '@mui/material';
import Header from "../../components/Header";
import ArchitectChart from "./components/ArchitectChart";
import ArchitectTable from "./components/ArchitectTable";
import { tokens } from "../../theme";


const ArchitectApproval = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  const [ port, setPort ] = useState('All');
  const [ ptxValue, setPtxValue ] = useState('All');


  return (
    <Box m="25px">

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Enterprise Architect Approval" subtitle="Overview" />
      </Box>

      <ArchitectChart setPort={setPort} setPtxValue={setPtxValue} colors={colors} />
      <ArchitectTable port={port} ptxValue={ptxValue} />
    </Box>
  );
};

export default ArchitectApproval;