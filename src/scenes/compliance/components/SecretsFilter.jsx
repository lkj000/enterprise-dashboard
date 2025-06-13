import React from "react";
import { Box, useTheme } from "@mui/material";
import Dropdown from "../../../components/Dropdown";
import { tokens } from "../../../theme";

const Filters = ({
  setPortfolioParent,
  setVpParent,
  setDirectorParent,
  setOwnerParent,
  setAppCode,
  portfolioParent,
  vpParent,
  directorParent,
  ownerParent,
  AppCode,
  data,
}) => {
  const theme = useTheme();
  const colors = tokens(theme);

  let optionsPortfolio = [],
    optionsVp = [],
    optionsDirector = [],
    optionsOwner = [],
    optionsAppCode = [];
  optionsPortfolio = [...new Set(data.map((item) => item.portfolio))].filter(
    (n) => n
  );
  if (portfolioParent && portfolioParent !== "all") {
    optionsVp = [
      ...new Set(
        data
          .filter((item) => item.portfolio === portfolioParent)
          .map((item) => item.Department)
      ),
    ].filter((n) => n);
    optionsDirector = [
      ...new Set(
        data
          .filter((item) => item.portfolio === portfolioParent)
          .map((item) => item.Team)
      ),
    ].filter((n) => n);
    optionsOwner = [
      ...new Set(
        data
          .filter((item) => item.portfolio === portfolioParent)
          .map((item) => item.AppOwner)
      ),
    ].filter((n) => n);
    optionsAppCode = [
      ...new Set(
        data
          .filter((item) => item.portfolio === portfolioParent)
          .map((item) => item.AppCode)
      ),
    ].filter((n) => n);
  } else {
    optionsVp = [...new Set(data.map((item) => item.Department))].filter(
      (n) => n
    );
    optionsDirector = [...new Set(data.map((item) => item.Team))].filter(
      (n) => n
    );
    optionsOwner = [...new Set(data.map((item) => item.AppOwner))].filter(
      (n) => n
    );
    optionsAppCode = [...new Set(data.map((item) => item.AppCode))].filter(
      (n) => n
    );
  }

  //   Department
  if (vpParent && vpParent !== "all") {
    optionsDirector = [
      ...new Set(
        data
          .filter((item) => item.Department === vpParent)
          .map((item) => item.Team)
      ),
    ].filter((n) => n);
    optionsOwner = [
      ...new Set(
        data
          .filter((item) => item.Department === vpParent)
          .map((item) => item.AppOwner)
      ),
    ].filter((n) => n);
    optionsAppCode = [
      ...new Set(
        data
          .filter((item) => item.Department === vpParent)
          .map((item) => item.AppCode)
      ),
    ].filter((n) => n);
  } else {
    optionsDirector = [...new Set(data.map((item) => item.Team))].filter(
      (n) => n
    );
    optionsOwner = [...new Set(data.map((item) => item.AppOwner))].filter(
      (n) => n
    );
    optionsAppCode = [...new Set(data.map((item) => item.AppCode))].filter(
      (n) => n
    );
  }

  // Team
  if (directorParent && directorParent !== "all") {
    optionsOwner = [
      ...new Set(
        data
          .filter((item) => item.Team === directorParent)
          .map((item) => item.AppOwner)
      ),
    ].filter((n) => n);
    optionsAppCode = [
      ...new Set(
        data
          .filter((item) => item.Team === directorParent)
          .map((item) => item.AppCode)
      ),
    ].filter((n) => n);
  } else {
    optionsOwner = [...new Set(data.map((item) => item.AppOwner))].filter(
      (n) => n
    );
    optionsAppCode = [...new Set(data.map((item) => item.AppCode))].filter(
      (n) => n
    );
  }

  // App Owner
  if (ownerParent && ownerParent !== "all") {
    [
      ...new Set(
        data
          .filter((item) => item.Team === ownerParent)
          .map((item) => item.AppCode)
      ),
    ].filter((n) => n);
  } else {
    [...new Set(data.map((item) => item.AppCode))].filter((n) => n);
  }

  if (AppCode && AppCode !== "all") {
    [
      ...new Set(
        data
          .filter((item) => item.AppOwner === ownerParent)
          .map((item) => item.AppCode)
      ),
    ].filter((n) => n);
  } else {
    [...new Set(data.map((item) => item.AppCode))].filter((n) => n);
  }

  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(3, 1fr)"
      mb="25px"
      sx={{
        backgroundColor:
          theme.palette.mode === "light"
            ? colors.primary[10]
            : colors.primary[400],

        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.7)",
        borderRadius: "8px",
      }}
    >
      <Dropdown
        setState={setPortfolioParent}
        state={portfolioParent}
        options={optionsPortfolio}
        title="Portfolio"
      />
      <Dropdown
        setState={setVpParent}
        state={vpParent}
        options={optionsVp}
        title="Department"
      />
      <Dropdown
        setState={setDirectorParent}
        state={directorParent}
        options={optionsDirector}
        title="Team"
      />
      <Dropdown
        setState={setOwnerParent}
        state={ownerParent}
        options={optionsOwner}
        title="App Owner"
      />
      <Dropdown
        setState={setAppCode}
        state={AppCode}
        options={optionsAppCode}
        title="App Code"
      />
    </Box>
  );
};

export default Filters;
