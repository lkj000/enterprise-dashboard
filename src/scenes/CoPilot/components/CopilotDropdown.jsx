import { React, useMemo, useState } from "react";
import { Box, Grid } from "@mui/material";
import CustomDropdown from "../../../common-components/CustomDropdown";
import Dropdown from "../../../common-components/Dropdown";
import RadioButton from "../../../common-components/RadioButton";
import { getSortDataForDropdown } from "../../../utils";
import { UpdateFields, handleUsage, handleReport, handlePortfolio, handleVP, handleDirector, handleManager, handleStatus, handleLevel } from "./HandleDropdowns";


const CopilotDropdown = ({ input, tab, reportType, port, selectVP, selectDirector, selectManager, selectStatus, viewState, usageDays, setReportType, setPort, setVP, setDirector, setManager, setStatus, setViewState, setUsageDays, setDataState, theme, colors }) => {


  const objDefaultFilter = getSortDataForDropdown(input, ["portfolio","vp","director","manager"]);
  const [VPFilter, setVPFilter] = useState(objDefaultFilter["vp"]);
  const [DirectorFilter, setDirectorFilter] = useState(objDefaultFilter["director"]);
  const [ManagerFilter, setManagerFilter] = useState(objDefaultFilter["manager"]);

  // Filter Data
  var filterData = useMemo(() => UpdateFields(port, selectVP, selectDirector, selectManager),
    [port, selectVP, selectDirector, selectManager]
  );

  const handleUsageReport = (_event, newValue) => {
    handleReport(newValue, setReportType, setDataState, setPort, setVP, setDirector, setManager, setStatus);
  };

  const handleChangePort = (_event, newPort) => {
    handlePortfolio(newPort, input, objDefaultFilter, setPort, setVP, setDirector, setManager, setVPFilter, setDirectorFilter, setManagerFilter, setDataState);
  };

  const handleChangeVP = (_event, newVP) => {
    handleVP(newVP, input, objDefaultFilter, port, setVP, setDirector, setManager, setDirectorFilter, setManagerFilter, setDataState);
  };

  const handleChangeDirector = (_event, newDirector) => {
    handleDirector(newDirector, input, objDefaultFilter, filterData, setDirector, setManager, setManagerFilter, setDataState);
  };

  const handleChangeManager = (_event, newManager) => {
    handleManager(newManager, filterData, setManager, setDataState);
  };

  const handleChangeStatus = (_event, newStatus) => {
    handleStatus(newStatus, setStatus);
  };

  const handleChangeLevel = (_event, newValue) => {
    handleLevel(newValue, setViewState);
  };

  const handleChangeUsage = (_event, newValue) => {
    handleUsage(newValue, setUsageDays);
  };


  return (
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
        {tab === 2 && (
          <CustomDropdown
            title="Usage Report"
            subtitle="Usage Report"
            options={["Daily", "Mid-Month", "Monthly"]}
            optionsDisable={usageDays === "90" ? (option) => ["Mid-Month", "Monthly"].includes(option) : () => {}}
            value={reportType}
            handleChange={handleUsageReport}
            theme={theme}
            colors={colors}
          />
        )}

        {reportType === "Daily" && (
          <>
            <Dropdown
              title="Portfolio"
              subtitle="Portfolio"
              options={objDefaultFilter["portfolio"]}
              value={port}
              handleChange={handleChangePort}
              theme={theme}
              colors={colors}
            />
            <Dropdown
              title="Department"
              subtitle="Department"
              options={VPFilter}
              value={selectVP}
              handleChange={handleChangeVP}
              theme={theme}
              colors={colors}
            />
            <Dropdown
              title="Team"
              subtitle="Team"
              options={DirectorFilter}
              value={selectDirector}
              handleChange={handleChangeDirector}
              theme={theme}
              colors={colors}
            />
            {tab !== 2 && (
              <Dropdown
                title="Line Managers"
                subtitle="line Manager"
                options={ManagerFilter}
                value={selectManager}
                handleChange={handleChangeManager}
                theme={theme}
                colors={colors}
              />
            )}
            <Dropdown
              title="Status"
              subtitle="Status"
              options={["1-5 Days", "6-10 Days", ">10 Days", "Inactive Users", "License Not Assigned"]}
              value={selectStatus}
              handleChange={handleChangeStatus}
              theme={theme}
              colors={colors}
            />
            {tab === 2 && (
              <RadioButton
                title="Report Range"
                value={usageDays}
                name={["28", "90"]}
                label={["Last 28 Days", "Last 90 Days"]}
                handleChange={handleChangeUsage}
                colors={colors}
              />
            )}
          </>
        )}

        {tab !== 2 && (
          <RadioButton
            title="Report Level"
            value={viewState}
            name={["All", "VP", "Director"]}
            label={["All", "Department", "Team"]}
            handleChange={handleChangeLevel}
            colors={colors}
          />
        )}
      </Grid>
    </Box>
  );
};

export default CopilotDropdown;
