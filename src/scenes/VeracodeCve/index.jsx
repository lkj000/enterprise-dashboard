import React, {useState, useEffect} from 'react';
import { Box } from '@mui/material';
import VeracodeCVEData from "../../data-json/veracode_cve_desc.json";
import Header from "../../components/Header";

import Filters from "./components/Filters";
import Table from "./components/table";
import CVEChart from "./components/CVEChart";

const VeracodeCVE = () => {

  const SEVERITY_LEVEL = {
    "Very High": 5,
    "High": 4,
    "Medium": 3,
    "Low": 2,
    "Very Low": 1
  }
  const sortCve = (a, b) => {
    return SEVERITY_LEVEL[b.SEVERITY_DESC] - SEVERITY_LEVEL[a.SEVERITY_DESC]
  } 
  VeracodeCVEData.forEach((item) => {
    if (item.CVE)  item.CVE = item.CVE.sort(sortCve)
  })
  const veracode = VeracodeCVEData.map((data) => {
    return {
      AppName: data.AppName,
      portfolio: data.Portfolio,
      director: data.Director,
      vp: data.VP,
      owner: data.AppOwner,
      criticality: data.business_criticality,
      exploitObserve: data.Exploit_Observed,
      veryHigh: data['Severity Counts']["Very High"],
      high: data['Severity Counts']["High"],
      medium: data['Severity Counts']["Medium"],
      low: data['Severity Counts']["Low"],
      veryLow: data['Severity Counts']["Very Low"],
      cve: data.CVE.map(cve => cve.CVE_ID).join(", "),
      severity: data.CVE.map(cve => cve.SEVERITY_DESC).join(", "),
      Jira_URL: data.Jira_URL
    }
  })
 
  const [portfolio, setPortfolio] = useState('all');
  const [vp, setVp] = useState('all');
  const [director, setDirector] = useState('all');
  const [owner, setOwner] = useState('all');
  const [severityType, setSeverityType] = useState('all');
  const [criticality, setCriticality] = useState('all');
  const [exploitObserve, setExploitObserve] = useState('all');
  const [withDetails, setWithDetails] = useState(false);
  const [filters, setFilters] = useState({
    portfolio: 'all',
    vp: 'all',
    director: 'all',
    owner: 'all',
    severityType: 'all',
    criticality: 'all',
    exploitObserve: 'all',
    withDetails: withDetails
  });

  useEffect(() => {
    setFilters({
      portfolio: portfolio ? portfolio : 'all',
      vp: vp ? vp : 'all',
      director: director ? director : 'all',
      owner: owner ? owner : 'all',
      severityType: severityType ? severityType : 'all',
      criticality: criticality ? criticality : 'all',
      exploitObserve: exploitObserve ? exploitObserve : 'all', 
      withDetails: withDetails
    })
  }, [portfolio, vp, director, owner, severityType, criticality, exploitObserve, withDetails])

  useEffect(() => {
    setVp('all');
    setDirector('all');
    setOwner('all');
    setSeverityType('all');
    setCriticality('all');
    setExploitObserve('all');
  }, [portfolio])

  useEffect(() => {
    setDirector('all');
    setOwner('all');
    setSeverityType('all');
    setCriticality('all');
    setExploitObserve('all');
  }, [vp])

  useEffect(() => {
    setOwner('all');
    setSeverityType('all');
    setCriticality('all');
    setExploitObserve('all');
  }, [director])

  useEffect(() => {
    setSeverityType('all');
    setCriticality('all');
    setExploitObserve('all');
  }, [owner])

  useEffect(() => {
    setCriticality('all');
    setExploitObserve('all');
  }, [severityType])

  useEffect(() => {
    setExploitObserve('all');
  }, [criticality])

  return (
    <Box m="25px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Application Vulnerabilities" />
      </Box>
   

      {/* FILTERS */}
      <Filters
        setPortfolioParent={setPortfolio}
        setVpParent={setVp}
        setDirectorParent={setDirector}
        setOwnerParent={setOwner}
        setSeverityTypeParent={setSeverityType}
        setCriticalityParent={setCriticality}
        setExploitObserveParent={setExploitObserve}
        setWithDetailsParent={setWithDetails}
        portfolioParent={portfolio}
        vpParent={vp}
        directorParent={director}
        ownerParent={owner}
        severityTypeParent={severityType}
        criticalityParent={criticality}
        exploitObserveParent={exploitObserve}
        withDetailsParent={withDetails}
        data={veracode}
      />
      {/* Chart */}
      <CVEChart input={veracode} filter={filters}/>
      {/* TABLE */}
      <Table input={veracode} filter={filters} />
    </Box>
  );
};

export default VeracodeCVE;
