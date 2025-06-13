import { React, useState } from "react";
import { Box, Grid } from "@mui/material";
import Dropdown from "../../../common-components/Dropdown";
import AppCodeData from "./AppCodeData";
import {
  set1DataFilter,
  set2DataFilter,
  set3DataFilter,
  set4DataFilter,
} from "../../../utils";

const GHADropdown = ({
  input,
  objDefaultFilter,
  port,
  setPort,
  vp,
  setVP,
  dept,
  setDept,
  appOwner,
  setAppOwner,
  appCode,
  setAppCode,
  setActivityColumn,
  setCommonColumn,
  setDeploymentColumn,
  setWorkflowColumn,
  setWorkflowFileColumn,
  theme,
  colors,
}) => {
  const [VPFilter, setVPFilter] = useState(objDefaultFilter["PortfolioVP"]);
  const [AppTeamFilter, setAppTeamFilter] = useState(
    objDefaultFilter["Department"]
  );
  const [AppOwnerFilter, setAppOwnerFilter] = useState(
    objDefaultFilter["appOwner"]
  );
  const [AppCodeFilter, setAppCodeFilter] = useState(
    objDefaultFilter["appCode"]
  );
  const [appData, setAppData] = useState([]);
  const [column, setColumn] = useState("All");

  // PORTFOLIO
  const handleChangePort = (event, newPort) => {
    setPort(newPort);
    setVP("All");
    setDept("All");
    setAppOwner("All");
    setAppCode("All");

    if (newPort === "All" || !newPort) {
      setPort("All");
      setVPFilter(objDefaultFilter["PortfolioVP"]);
      setAppTeamFilter(objDefaultFilter["Department"]);
      setAppOwnerFilter(objDefaultFilter["appOwner"]);
      setAppCodeFilter(objDefaultFilter["appCode"]);
    } else {
      setVPFilter(set1DataFilter(input, "Portfolio", newPort, "PortfolioVP"));
      setAppTeamFilter(
        set1DataFilter(input, "Portfolio", newPort, "Department")
      );
      setAppOwnerFilter(
        set1DataFilter(input, "Portfolio", newPort, "appOwner")
      );
      setAppCodeFilter(set1DataFilter(input, "Portfolio", newPort, "appCode"));
    }
  };

  // VP
  const handleChangeVP = (event, newVP) => {
    setVP(newVP);
    setDept("All");
    setAppOwner("All");
    setAppCode("All");

    if (newVP === "All" || !newVP) {
      setVP("All");
      if (port !== "All" && port) {
        setAppTeamFilter(
          set1DataFilter(input, "Portfolio", port, "Department")
        );
        setAppOwnerFilter(set1DataFilter(input, "Portfolio", port, "appOwner"));
        setAppCodeFilter(set1DataFilter(input, "Portfolio", port, "appCode"));
      } else {
        setAppTeamFilter(objDefaultFilter["Department"]);
        setAppOwnerFilter(objDefaultFilter["appOwner"]);
        setAppCodeFilter(objDefaultFilter["appCode"]);
      }
    } else {
      if (port !== "All" && port) {
        setAppTeamFilter(
          set2DataFilter(
            input,
            "Portfolio",
            port,
            "PortfolioVP",
            newVP,
            "Department"
          )
        );
        setAppOwnerFilter(
          set2DataFilter(
            input,
            "Portfolio",
            port,
            "PortfolioVP",
            newVP,
            "appOwner"
          )
        );
        setAppCodeFilter(
          set2DataFilter(
            input,
            "Portfolio",
            port,
            "PortfolioVP",
            newVP,
            "appCode"
          )
        );
      } else {
        setAppTeamFilter(
          set1DataFilter(input, "PortfolioVP", newVP, "Department")
        );
        setAppOwnerFilter(
          set1DataFilter(input, "PortfolioVP", newVP, "appOwner")
        );
        setAppCodeFilter(
          set1DataFilter(input, "PortfolioVP", newVP, "appCode")
        );
      }
    }
  };

  // APP TEAM
  const handleChangeAppTeam = (event, newAppTeam) => {
    setDept(newAppTeam);
    setAppOwner("All");
    setAppCode("All");

    if (newAppTeam === "All" || !newAppTeam) {
      setDept("All");
      if (port !== "All" && port && vp !== "All" && vp) {
        setAppOwnerFilter(
          set2DataFilter(
            input,
            "Portfolio",
            port,
            "PortfolioVP",
            vp,
            "appOwner"
          )
        );
        setAppCodeFilter(
          set2DataFilter(input, "Portfolio", port, "PortfolioVP", vp, "appCode")
        );
      } else if (port !== "All" && port) {
        setAppOwnerFilter(set1DataFilter(input, "Portfolio", port, "appOwner"));
        setAppCodeFilter(set1DataFilter(input, "Portfolio", port, "appCode"));
      } else if (vp !== "All" && vp) {
        setAppOwnerFilter(set1DataFilter(input, "PortfolioVP", vp, "appOwner"));
        setAppCodeFilter(set1DataFilter(input, "PortfolioVP", vp, "appCode"));
      } else {
        setAppOwnerFilter(objDefaultFilter["appOwner"]);
        setAppCodeFilter(objDefaultFilter["appCode"]);
      }
    } else {
      if (port !== "All" && port && vp !== "All" && vp) {
        setAppOwnerFilter(
          set3DataFilter(
            input,
            "Portfolio",
            port,
            "PortfolioVP",
            vp,
            "Department",
            newAppTeam,
            "appOwner"
          )
        );
        setAppCodeFilter(
          set3DataFilter(
            input,
            "Portfolio",
            port,
            "PortfolioVP",
            vp,
            "Department",
            newAppTeam,
            "appCode"
          )
        );
      } else if (port !== "All" && port) {
        setAppOwnerFilter(
          set2DataFilter(
            input,
            "Portfolio",
            port,
            "Department",
            newAppTeam,
            "appOwner"
          )
        );
        setAppCodeFilter(
          set2DataFilter(
            input,
            "Portfolio",
            port,
            "Department",
            newAppTeam,
            "appCode"
          )
        );
      } else if (vp !== "All" && vp) {
        setAppOwnerFilter(
          set2DataFilter(
            input,
            "PortfolioVP",
            vp,
            "Department",
            newAppTeam,
            "appOwner"
          )
        );
        setAppCodeFilter(
          set2DataFilter(
            input,
            "PortfolioVP",
            vp,
            "Department",
            newAppTeam,
            "appCode"
          )
        );
      } else {
        setAppOwnerFilter(
          set1DataFilter(input, "Department", newAppTeam, "appOwner")
        );
        setAppCodeFilter(
          set1DataFilter(input, "Department", newAppTeam, "appCode")
        );
      }
    }
  };

  // APP OWNER
  const handleChangeAppOwner = (event, newAppOwner) => {
    setAppOwner(newAppOwner);
    setAppCode("All");

    if (newAppOwner === "All" || !newAppOwner) {
      setAppOwner("All");
      if (
        port !== "All" &&
        port &&
        vp !== "All" &&
        vp &&
        dept !== "All" &&
        dept
      ) {
        setAppCodeFilter(
          set3DataFilter(
            input,
            "Portfolio",
            port,
            "PortfolioVP",
            vp,
            "Department",
            dept,
            "appCode"
          )
        );
      } else if (port !== "All" && port && vp !== "All" && vp) {
        setAppCodeFilter(
          set2DataFilter(input, "Portfolio", port, "PortfolioVP", vp, "appCode")
        );
      } else if (port !== "All" && port) {
        setAppCodeFilter(set1DataFilter(input, "Portfolio", port, "appCode"));
      } else if (vp !== "All" && vp) {
        setAppCodeFilter(set1DataFilter(input, "PortfolioVP", vp, "appCode"));
      } else if (dept !== "All" && dept) {
        setAppCodeFilter(set1DataFilter(input, "Department", dept, "appCode"));
      } else {
        setAppCodeFilter(objDefaultFilter["appCode"]);
      }
    } else {
      if (
        port !== "All" &&
        port &&
        vp !== "All" &&
        vp &&
        dept !== "All" &&
        dept
      ) {
        setAppCodeFilter(
          set4DataFilter(
            input,
            "Portfolio",
            port,
            "PortfolioVP",
            vp,
            "Department",
            dept,
            "appOwner",
            newAppOwner,
            "appCode"
          )
        );
      } else if (port !== "All" && port && vp !== "All" && vp) {
        setAppCodeFilter(
          set3DataFilter(
            input,
            "Portfolio",
            port,
            "PortfolioVP",
            vp,
            "appOwner",
            newAppOwner,
            "appCode"
          )
        );
      } else if (port !== "All" && port) {
        setAppCodeFilter(
          set2DataFilter(
            input,
            "Portfolio",
            port,
            "appOwner",
            newAppOwner,
            "appCode"
          )
        );
      } else if (vp !== "All" && vp) {
        setAppCodeFilter(
          set2DataFilter(
            input,
            "PortfolioVP",
            vp,
            "appOwner",
            newAppOwner,
            "appCode"
          )
        );
      } else if (dept !== "All" && dept) {
        setAppCodeFilter(
          set2DataFilter(
            input,
            "Department",
            dept,
            "appOwner",
            newAppOwner,
            "appCode"
          )
        );
      } else {
        setAppCodeFilter(
          set1DataFilter(input, "appOwner", newAppOwner, "appCode")
        );
      }
    }
  };

  // APP CODE
  const handleChangeAppCode = (event, newAppCode) => {
    setAppCode(newAppCode);

    if (newAppCode === "All" || !newAppCode) {
      setAppCode("All");
      setAppData([]);
    } else {
      setAppData(input.filter((item) => item.appCode === newAppCode));
    }
  };

  // VIEW SET
  const handleChangeColumn = (event, newColumn) => {
    setColumn(newColumn);

    if (newColumn === "All" || !newColumn) {
      setColumn("All");
      setActivityColumn(true);
      setCommonColumn(true);
      setDeploymentColumn(true);
      setWorkflowColumn(true);
      setWorkflowFileColumn(false);
    } else if (newColumn === "Activity") {
      setActivityColumn(true);
      setCommonColumn(false);
      setDeploymentColumn(false);
      setWorkflowColumn(false);
      setWorkflowFileColumn(false);
    } else if (newColumn === "Deployments") {
      setActivityColumn(false);
      setCommonColumn(true);
      setDeploymentColumn(true);
      setWorkflowColumn(false);
      setWorkflowFileColumn(false);
    } else if (newColumn === "Workflow") {
      setActivityColumn(false);
      setCommonColumn(true);
      setDeploymentColumn(false);
      setWorkflowColumn(true);
      setWorkflowFileColumn(true);
    }
  };

  return (
    <Box>
      <Box
        display="flex"
        marginBottom="40px"
        sx={{
          backgroundColor: colors.primary[400],
          width: "100%",
          height: "auto",
          filter: "drop-shadow(0px 4px 3px rgba(0, 0, 0, 0.2))",
          borderRadius: "8px",
        }}
      >
        <Grid container>
          <Dropdown
            title="Portfolio"
            subtitle="Portfolio"
            options={objDefaultFilter["Portfolio"]}
            value={port}
            handleChange={handleChangePort}
            theme={theme}
            colors={colors}
          />
          <Dropdown
            title="Department"
            subtitle="Department"
            options={VPFilter}
            value={vp}
            handleChange={handleChangeVP}
            theme={theme}
            colors={colors}
          />
          <Dropdown
            title="Team"
            subtitle="Team"
            options={AppTeamFilter}
            value={dept}
            handleChange={handleChangeAppTeam}
            theme={theme}
            colors={colors}
          />
          <Dropdown
            title="App Owner"
            subtitle="App Owner"
            options={AppOwnerFilter}
            value={appOwner}
            handleChange={handleChangeAppOwner}
            theme={theme}
            colors={colors}
          />

          <Box>
            <Dropdown
              title="App Code"
              subtitle="App Code"
              options={AppCodeFilter}
              value={appCode}
              handleChange={handleChangeAppCode}
              theme={theme}
              colors={colors}
            />
            {appCode !== "All" && appCode ? (
              <AppCodeData data={appData} colors={colors} />
            ) : null}
          </Box>

          <Dropdown
            title="View Set"
            subtitle="View"
            options={["Activity", "Deployments", "Workflow"]}
            value={column}
            handleChange={handleChangeColumn}
            theme={theme}
            colors={colors}
          />
        </Grid>
      </Box>
    </Box>
  );
};

export default GHADropdown;
