import { React, useState } from "react";
import { Box, useTheme } from "@mui/material";
import RepoChart from "./components/RepoChart";
import RepoTable from "./components/RepoTable";
import RepoDropdown from "./components/RepoDropdown";
import { TableData } from "./requests";
import { getSortDataForDropdown } from "../../utils";
import { tokens } from "../../theme";

const RepoMain = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [port, setPort] = useState("All");
  const [vp, setVP] = useState("All");
  const [dept, setDept] = useState("All");
  const [appOwner, setAppOwner] = useState("All");
  const [appCode, setAppCode] = useState("All");
  const objDefaultFilter = getSortDataForDropdown(TableData, [
    "Portfolio",
    "Team",
    "Department",
    "AppOwner",
    "AppCode",
  ]);

  return (
    <Box m="25px">
      <RepoDropdown
        input={TableData}
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
        theme={theme}
        colors={colors}
      />

      <RepoChart colors={colors} />

      <RepoTable
        input={TableData}
        port={port}
        vp={vp}
        dept={dept}
        appOwner={appOwner}
        appCode={appCode}
        theme={theme}
        colors={colors}
      />
    </Box>
  );
};

export default RepoMain;
