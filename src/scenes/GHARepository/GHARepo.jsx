import { React, useState } from "react";
import { Box } from '@mui/material';
import GHADropdown from "./components/GHADropdown";
import GHATable from "./components/GHATable";
import { getSortDataForDropdown } from "../../utils";


const GHARepo = ({ data, theme, colors }) => {
    
  const [port, setPort] = useState('All');
  const [vp, setVP] = useState('All');
  const [dept, setDept] = useState('All');
  const [appOwner, setAppOwner] = useState('All');
  const [appCode, setAppCode] = useState('All');
  const [activityColumn, setActivityColumn] = useState(true);
  const [commonColumn, setCommonColumn] = useState(true);
  const [deploymentColumn, setDeploymentColumn] = useState(true);
  const [workflowColumn, setWorkflowColumn] = useState(true);
  const [workflowFileColumn, setWorkflowFileColumn] = useState(false);
  const objDefaultFilter = getSortDataForDropdown(data, ["Portfolio", "PortfolioVP", "Department", "appOwner", "appCode"]);

  return (
    <Box>
      <GHADropdown
        input={data}
        objDefaultFilter={objDefaultFilter}
        port={port}
        setPort={setPort}
        vp={vp}
        setVP={setVP}
        dept={dept}
        setDept={setDept}
        appOwner={appOwner}
        setAppOwner={setAppOwner}
        appCode={appCode}
        setAppCode={setAppCode}
        setActivityColumn={setActivityColumn}
        setCommonColumn={setCommonColumn}
        setDeploymentColumn={setDeploymentColumn}
        setWorkflowColumn={setWorkflowColumn}
        setWorkflowFileColumn={setWorkflowFileColumn}
        theme={theme}
        colors={colors}
      />

      <GHATable
        input={data}
        port={port}
        vp={vp}
        dept={dept}
        appOwner={appOwner}
        appCode={appCode}
        activityColumn={activityColumn}
        commonColumn={commonColumn}
        deploymentColumn={deploymentColumn}
        workflowColumn={workflowColumn}
        workflowFileColumn={workflowFileColumn}
        theme={theme}
        colors={colors}
      />
    </Box>
  );
};

export default GHARepo;