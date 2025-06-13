import { React } from "react";
import { Box, useTheme } from '@mui/material';
import Header from "../../components/Header";
import WorkflowChart from "./components/WorkflowChart";
import WorkflowTable from "./components/WorkflowTable";
import { tokens } from "../../theme";


const WorkflowActivity = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="25px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Workflow Activity" subtitle="Overview" />
      </Box>

      <WorkflowChart colors={colors} />
      <WorkflowTable />
    </Box>
  );
};

export default WorkflowActivity;