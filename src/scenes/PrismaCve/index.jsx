import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import PrismaCVEData from "../../data-json/twistlock_cve_data.json";
import Header from "../../components/Header";
import Filters from "./components/Filters";
import Table from "./components/table";
import Chart from "./components/Chart";

const PrismaCVE = () => {
  const SEVERITY_LEVEL = {
    critical: 4,
    high: 3,
    medium: 2,
    low: 1,
  };
  const sortCve = (a, b) => {
    return SEVERITY_LEVEL[b.severity] - SEVERITY_LEVEL[a.severity];
  };
  PrismaCVEData.forEach((item) => {
    if (item.vulnerabilities)
      item.vulnerabilities = item.vulnerabilities.sort(sortCve);
  });
  const prisma = PrismaCVEData.map((data) => {
    return {
      AppName: data.AppName,
      portfolio: data.Portfolio,
      Department: data.Department,
      Team: data.Team,
      AppOwner: data.AppOwner,
      Tag: data.tag,
      FirstScanDate: data.first_scan_date,
      AppCode: data.AppCode,
      critical: data.critical,
      high: data.high,
      medium: data.medium,
      low: data.low,
      cve: data.vulnerabilities.map((cve) => cve.cve).join(", "),
      severity: data.vulnerabilities.map((cve) => cve.severity).join(", "),
    };
  });

  const [portfolio, setPortfolio] = useState("all");
  const [vp, setVp] = useState("all");
  const [director, setDirector] = useState("all");
  const [owner, setOwner] = useState("all");
  const [AppCode, setAppCode] = useState("all");
  const [withDetails, setWithDetails] = useState(false);

  const [filters, setFilters] = useState({
    portfolio: "all",
    Department: "all",
    Team: "all",
    AppOwner: "all",
    AppCode: "all",
    withDetails: withDetails,
  });

  useEffect(() => {
    setFilters({
      portfolio: portfolio ? portfolio : "all",
      vp: vp ? vp : "all",
      director: director ? director : "all",
      owner: owner ? owner : "all",
      AppCode: AppCode ? AppCode : "all",
      withDetails: withDetails,
    });
  }, [portfolio, vp, director, owner, AppCode, withDetails]);

  useEffect(() => {
    setVp("all");
    setDirector("all");
    setOwner("all");
    setAppCode("all");
  }, [portfolio]);

  useEffect(() => {
    setDirector("all");
    setOwner("all");
    setAppCode("all");
  }, [vp]);

  useEffect(() => {
    setOwner("all");
    setAppCode("all");
  }, [director]);
  useEffect(() => {
    setAppCode("all");
  }, [owner]);
  useEffect(() => {
    setFilters({
      portfolio: portfolio ? portfolio : "all",
      vp: vp ? vp : "all",
      director: director ? director : "all",
      owner: owner ? owner : "all",
      AppCode: AppCode ? AppCode : "all",
      withDetails: withDetails,
    });
  }, [portfolio, vp, director, owner, AppCode, withDetails]);

  useEffect(() => {
    setVp("all");
    setDirector("all");
    setOwner("all");
    setAppCode("all");
  }, [portfolio]);

  useEffect(() => {
    setDirector("all");
    setOwner("all");
    setAppCode("all");
  }, [vp]);

  useEffect(() => {
    setOwner("all");
    setAppCode("all");
  }, [director]);
  useEffect(() => {
    setAppCode("all");
  }, [owner]);

  return (
    <Box m="25px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Container Vulnerabilities" />
      </Box>

      {/* FILTERS */}
      <Filters
        setPortfolioParent={setPortfolio}
        setVpParent={setVp}
        setDirectorParent={setDirector}
        setOwnerParent={setOwner}
        setAppCode={setAppCode}
        setWithDetailsParent={setWithDetails}
        portfolioParent={portfolio}
        vpParent={vp}
        directorParent={director}
        ownerParent={owner}
        AppCode={AppCode}
        withDetailsParent={withDetails}
        data={prisma}
      />
      {/* Chart */}
      <Chart input={prisma} filter={filters} />
      {/* TABLE */}
      <Table input={prisma} filter={filters} />
    </Box>
  );
};

export default PrismaCVE;
