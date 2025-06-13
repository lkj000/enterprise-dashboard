import { React } from "react";
import { Box } from '@mui/material';
import Header from "../../components/Header";
import DeploymentTable from "./components/DeploymentTable";


const DeploymentHistory = () => {


  return (
    <Box m="25px">

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Deployment History" subtitle="Overview" />
      </Box>

      <DeploymentTable />

    </Box>
  );
};

export default DeploymentHistory;