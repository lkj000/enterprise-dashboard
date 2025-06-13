import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import SecretsData from "../../data-json/property-file-secret-data.json";
import Filters from "./components/SecretsFilter";
import Table from "./components/SecretsTable";

const SecretsRepositories = () => {
  const lastRun = SecretsData?.update_date ?? "";
  const secretRepoData = SecretsData?.data?.map((data) => {
    return {
      AppName: data.repo,
      portfolio: data.Portfolio,
      Department: data.Department,
      Team: data.Team,
      AppOwner: data.AppOwner,
      AppCode: data.AppCode,
      Repository: data.Repository,
      Files: data.Files,
    };
  }) ?? [];

  const [portfolio, setPortfolio] = useState("all");
  const [vp, setVp] = useState("all");
  const [director, setDirector] = useState("all");
  const [owner, setOwner] = useState("all");
  const [AppCode, setAppCode] = useState("all");

  const [filters, setFilters] = useState({
    portfolio: "all",
    Department: "all",
    Team: "all",
    AppOwner: "all",
    AppCode: "all",
  });

  useEffect(() => {
    setFilters({
      portfolio: portfolio ? portfolio : "all",
      vp: vp ? vp : "all",
      director: director ? director : "all",
      owner: owner ? owner : "all",
      AppCode: AppCode ? AppCode : "all",
    });
  }, [portfolio, vp, director, owner, AppCode]);

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
    });
  }, [portfolio, vp, director, owner, AppCode]);

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
      {/* FILTERS */}
      <Filters
        setPortfolioParent={setPortfolio}
        setVpParent={setVp}
        setDirectorParent={setDirector}
        setOwnerParent={setOwner}
        setAppCode={setAppCode}
        portfolioParent={portfolio}
        vpParent={vp}
        directorParent={director}
        ownerParent={owner}
        AppCode={AppCode}
        data={secretRepoData}
      />
      {/* TABLE */}
      <Table input={secretRepoData} lastRun={lastRun} filter={filters} />
    </Box>
  );
};

export default SecretsRepositories;
