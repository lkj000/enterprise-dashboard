import { React, useState } from "react";
import { Box, useTheme, Grid } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { VeracodeData as VeracodeList } from "../../data/veracode";
import '../global/custom-table.css';
import VeracodeTable from "./components/VeracodeTable";
import PieCharts from "./components/PieCharts";
import Dropdown from "../../common-components/Dropdown";

const Veracode = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [selectedPortfolio, setSelectedPortfolio] = useState('All');
  const [selectedAppOwner, setSelectedAppOwner] = useState('All');
  const [selectedPortVp, setSelectedPortVp] = useState('All');
  const [selectedVeracodeConslusion, setSelectedVeracodeConclusion] = useState('All');

  let repoList = ["albertsons/ospg-payments-D", "albertsons/OSPG-PaymentTokenService-D"]; //(Not included)
  let finalVeracode = VeracodeList.filter(item => !repoList.includes(item.RepositoryName));

  //Checking Portfolio & Veracode conclusion (Filter)
  let PortfolioTableFilter = [], ConclusionTableFilter = [], AppOwnerFilter = [], PortfolioVpFilter = [], filterLists = {};

  //DATA
  let portArray = [...new Set(finalVeracode.flat().map((item) => item.Portfolio))].filter(n => n).sort();
  let appOwnerArray = [...new Set(finalVeracode.flat().map((item) => item.ApplicationOwner))].filter(n => n).sort();
  let portVPArray = [...new Set(finalVeracode.flat().map((item) => item.PortfolioVP))].filter(n => n).sort();
  const veracodeConslusionArray = ['Success', 'Failure', 'CI-FAILED', 'Not present', 'Not Applicable', 'Profile Missing'];

  //ROWS- [Get S.no data]
  const VeracodeData = finalVeracode.map((item, index) => {
    const { id, ...rest } = item;
    return { id: index + 1, ...rest };
  });

  //Table filters

  //Portfolio Filter
  if (selectedPortfolio === 'All' || !selectedPortfolio) {
    PortfolioTableFilter = [];
  } else if (typeof (selectedPortfolio) === "string") {
    PortfolioTableFilter[0] = selectedPortfolio;
  } else {
    PortfolioTableFilter = selectedPortfolio;
  }

  //PortfolioVp Filter
  if (selectedPortVp === 'All' || !selectedPortVp) {
    PortfolioVpFilter = [];
  } else {
    PortfolioVpFilter[0] = selectedPortVp;
  }

  //VeracodeConslusion Filter
  if (selectedVeracodeConslusion === 'All' || !selectedVeracodeConslusion) {
    ConclusionTableFilter = [];
  } else {
    ConclusionTableFilter[0] = selectedVeracodeConslusion;
  }

  //AppOwner Filter
  if (selectedAppOwner === 'All' || !selectedAppOwner) {
    AppOwnerFilter = [];
  } else {
    AppOwnerFilter[0] = selectedAppOwner;
  }

  filterLists = {
    PortfolioTableFilter,
    PortfolioVpFilter,
    AppOwnerFilter,
    ConclusionTableFilter,
  }

  return (
    <Box m="25px">

      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Veracode" />
      </Box>

      {/* PORTFOLIO - CHART*/}
      <Box sx={{
        width: '100%',
        maxWidth: '100%',
        height: '400px',
        maxHeight: '400px',
        marginTop: 2,
        marginBottom: 10,
      
      
      }}>
        <Grid container>
          <PieCharts veracodeData={VeracodeData} states={{
            setSelectedPortfolio,
            setSelectedPortVp,
            setSelectedAppOwner,
            setSelectedVeracodeConclusion
          }} />

          {/* FILTERS */}
          <Box
            display="flex"
            marginBottom="20px"
            sx={{ 
              backgroundColor: colors.primary[400], 
              width: '100%', 
              height: 'auto',
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.7)',
              borderRadius: '8px'
            }}
            >

            <Grid container>
              <Dropdown
                title="Portfolio"
                subtitle="Portfolio"
                options={portArray}
                value={selectedPortfolio}
                handleChange={(event, newPort) => setSelectedPortfolio(newPort || 'All')}
                theme={theme}
                colors={colors}
              />
              <Dropdown
                title="Department"
                subtitle="Department"
                options={portVPArray}
                value={selectedPortVp}
                handleChange={(event, newPortVp) => setSelectedPortVp(newPortVp || 'All')}
                theme={theme}
                colors={colors}
              />
              <Dropdown
                title="App Owner"
                subtitle="App Owner"
                options={appOwnerArray}
                value={selectedAppOwner}
                handleChange={(event, newAppOwner) => setSelectedAppOwner(newAppOwner || 'All')}
                theme={theme}
                colors={colors}
              />
              <Dropdown
                title="Veracode Conclusion"
                subtitle="Veracode Conclusion"
                options={veracodeConslusionArray}
                value={selectedVeracodeConslusion}
                handleChange={(event, newConclusion) => setSelectedVeracodeConclusion(newConclusion || 'All')}
                theme={theme}
                colors={colors}
              />
            </Grid>
          </Box>

          {/* TABLE */}
          <Grid item xs={12} sm={12} md={12} lg={12} sx={{
            display: 'flex',
            flexDirection: 'column',
          }}>
            <VeracodeTable data={VeracodeData} filterLists={filterLists} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Veracode;