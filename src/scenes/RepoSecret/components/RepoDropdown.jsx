import { React, useState } from "react";
import { Box, Grid } from "@mui/material";
import Dropdown from "../../../common-components/Dropdown";
import AppCodeData from "../../GHARepository/components/AppCodeData";
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
  theme,
  colors,
}) => {
  const [VPFilter, setVPFilter] = useState(objDefaultFilter["Department"]);
  const [AppTeamFilter, setAppTeamFilter] = useState(objDefaultFilter["Team"]);
  const [AppOwnerFilter, setAppOwnerFilter] = useState(
    objDefaultFilter["AppOwner"]
  );
  const [AppCodeFilter, setAppCodeFilter] = useState(
    objDefaultFilter["AppCode"]
  );
  const [appData, setAppData] = useState([]);

  // PORTFOLIO
  const handleChangePort = (event, newPort) => {
    setPort(newPort);
    setVP("All");
    setDept("All");
    setAppOwner("All");
    setAppCode("All");

    if (newPort === "All" || !newPort) {
      setPort("All");
      setVPFilter(objDefaultFilter["Department"]);
      setAppTeamFilter(objDefaultFilter["Team"]);
      setAppOwnerFilter(objDefaultFilter["AppOwner"]);
      setAppCodeFilter(objDefaultFilter["AppCode"]);
    } else {
      setVPFilter(set1DataFilter(input, "Portfolio", newPort, "Department"));
      setAppTeamFilter(
        set1DataFilter(input, "Portfolio", newPort, "Department")
      );
      setAppOwnerFilter(
        set1DataFilter(input, "Portfolio", newPort, "AppOwner")
      );
      setAppCodeFilter(set1DataFilter(input, "Portfolio", newPort, "AppCode"));
    }
  };

  // VP - Department
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
        setAppOwnerFilter(set1DataFilter(input, "Portfolio", port, "AppOwner"));
        setAppCodeFilter(set1DataFilter(input, "Portfolio", port, "AppCode"));
      } else {
        setAppTeamFilter(objDefaultFilter["Department"]);
        setAppOwnerFilter(objDefaultFilter["AppOwner"]);
        setAppCodeFilter(objDefaultFilter["AppCode"]);
      }
    } else {
      if (port !== "All" && port) {
        setAppTeamFilter(
          set2DataFilter(input, "Portfolio", port, "Department", newVP, "Team")
        );
        setAppOwnerFilter(
          set2DataFilter(
            input,
            "Portfolio",
            port,
            "Department",
            newVP,
            "AppOwner"
          )
        );
        setAppCodeFilter(
          set2DataFilter(
            input,
            "Portfolio",
            port,
            "Department",
            newVP,
            "AppCode"
          )
        );
      } else {
        setAppTeamFilter(set1DataFilter(input, "Department", newVP, "Team"));
        setAppOwnerFilter(
          set1DataFilter(input, "Department", newVP, "AppOwner")
        );
        setAppCodeFilter(set1DataFilter(input, "Department", newVP, "AppCode"));
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
          set2DataFilter(input, "Portfolio", port, "Department", vp, "AppOwner")
        );
        setAppCodeFilter(
          set2DataFilter(input, "Portfolio", port, "Department", vp, "AppCode")
        );
      } else if (port !== "All" && port) {
        setAppOwnerFilter(set1DataFilter(input, "Portfolio", port, "AppOwner"));
        setAppCodeFilter(set1DataFilter(input, "Portfolio", port, "AppCode"));
      } else if (vp !== "All" && vp) {
        setAppOwnerFilter(set1DataFilter(input, "Department", vp, "AppOwner"));
        setAppCodeFilter(set1DataFilter(input, "Department", vp, "AppCode"));
      } else {
        setAppOwnerFilter(objDefaultFilter["AppOwner"]);
        setAppCodeFilter(objDefaultFilter["AppCode"]);
      }
    } else {
      if (port !== "All" && port && vp !== "All" && vp) {
        setAppOwnerFilter(
          set3DataFilter(
            input,
            "Portfolio",
            port,
            "Department",
            vp,
            "Team",
            newAppTeam,
            "AppOwner"
          )
        );
        setAppCodeFilter(
          set3DataFilter(
            input,
            "Portfolio",
            port,
            "Department",
            vp,
            "Team",
            newAppTeam,
            "AppCode"
          )
        );
      } else if (port !== "All" && port) {
        setAppOwnerFilter(
          set2DataFilter(
            input,
            "Portfolio",
            port,
            "Team",
            newAppTeam,
            "AppOwner"
          )
        );
        setAppCodeFilter(
          set2DataFilter(
            input,
            "Portfolio",
            port,
            "Team",
            newAppTeam,
            "AppCode"
          )
        );
      } else if (vp !== "All" && vp) {
        setAppOwnerFilter(
          set2DataFilter(
            input,
            "Department",
            vp,
            "Team",
            newAppTeam,
            "AppOwner"
          )
        );
        setAppCodeFilter(
          set2DataFilter(input, "Department", vp, "Team", newAppTeam, "AppCode")
        );
      } else {
        setAppOwnerFilter(
          set1DataFilter(input, "Team", newAppTeam, "AppOwner")
        );
        setAppCodeFilter(set1DataFilter(input, "Team", newAppTeam, "AppCode"));
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
            "Department",
            vp,
            "Team",
            dept,
            "AppCode"
          )
        );
      } else if (port !== "All" && port && vp !== "All" && vp) {
        setAppCodeFilter(
          set2DataFilter(input, "Portfolio", port, "Department", vp, "AppCode")
        );
      } else if (port !== "All" && port) {
        setAppCodeFilter(set1DataFilter(input, "Portfolio", port, "AppCode"));
      } else if (vp !== "All" && vp) {
        setAppCodeFilter(set1DataFilter(input, "Department", vp, "AppCode"));
      } else if (dept !== "All" && dept) {
        setAppCodeFilter(set1DataFilter(input, "Team", dept, "AppCode"));
      } else {
        setAppCodeFilter(objDefaultFilter["AppCode"]);
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
            "Department",
            vp,
            "Team",
            dept,
            "AppOwner",
            newAppOwner,
            "AppCode"
          )
        );
      } else if (port !== "All" && port && vp !== "All" && vp) {
        setAppCodeFilter(
          set3DataFilter(
            input,
            "Portfolio",
            port,
            "Department",
            vp,
            "AppOwner",
            newAppOwner,
            "AppCode"
          )
        );
      } else if (port !== "All" && port) {
        setAppCodeFilter(
          set2DataFilter(
            input,
            "Portfolio",
            port,
            "AppOwner",
            newAppOwner,
            "AppCode"
          )
        );
      } else if (vp !== "All" && vp) {
        setAppCodeFilter(
          set2DataFilter(
            input,
            "Department",
            vp,
            "AppOwner",
            newAppOwner,
            "AppCode"
          )
        );
      } else if (dept !== "All" && dept) {
        setAppCodeFilter(
          set2DataFilter(
            input,
            "Team",
            dept,
            "AppOwner",
            newAppOwner,
            "AppCode"
          )
        );
      } else {
        setAppCodeFilter(
          set1DataFilter(input, "AppOwner", newAppOwner, "AppCode")
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

  return (
    <Box>
      <Box
        display="flex"
        marginBottom="40px"
        sx={{
          backgroundColor: colors.primary[400],
          width: "100%",
          height: "auto",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.7)",
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
        </Grid>
      </Box>
    </Box>
  );
};

export default GHADropdown;
