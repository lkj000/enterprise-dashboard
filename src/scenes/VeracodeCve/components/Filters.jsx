import React from 'react';
import { Box, FormControlLabel, FormGroup, Switch, Typography, useTheme } from '@mui/material';
import Dropdown from '../../../components/Dropdown';
import { tokens } from "../../../theme";



const Filters = ({ setPortfolioParent, setVpParent, setDirectorParent, setOwnerParent, setSeverityTypeParent, setCriticalityParent, setExploitObserveParent,
  setWithDetailsParent, portfolioParent, vpParent, directorParent, ownerParent, severityTypeParent, criticalityParent, exploitObserveParent, withDetailsParent, data
}) => {
  const theme = useTheme();
  const colors = tokens(theme);

  let optionsPortfolio = [], optionsVp = [], optionsDirector = [], optionsOwner = [], optionsSeverity = [], optionsCriticality = [], optionsExploitObserve = [];
  optionsPortfolio = [...new Set(data.map((item) => item.portfolio))].filter(n => n);
  if (portfolioParent && portfolioParent !== 'all') {
    optionsVp = [...new Set(data.filter((item) => item.portfolio === portfolioParent).map((item) => item.vp))].filter(n => n);
    optionsDirector = [...new Set(data.filter((item) => item.portfolio === portfolioParent).map((item) => item.director))].filter(n => n);
    optionsOwner = [...new Set(data.filter((item) => item.portfolio === portfolioParent).map((item) => item.owner))].filter(n => n);
    optionsSeverity = [...new Set(data.filter((item) => item.portfolio === portfolioParent).flatMap((item) => item.severity.split(',').map(s => s.trim())))].filter(n => n);
    optionsCriticality = [...new Set(data.filter((item) => item.portfolio === portfolioParent).map((item) => item.criticality))].filter(n => n);
    optionsExploitObserve = [...new Set(data.filter((item) => item.portfolio === portfolioParent).map((item) => item.exploitObserve))].filter(n => n);
  } else {
    optionsVp = [...new Set(data.map((item) => item.vp))].filter(n => n);
    optionsDirector = [...new Set(data.map((item) => item.director))].filter(n => n);
    optionsOwner = [...new Set(data.map((item) => item.owner))].filter(n => n);
    optionsSeverity = [...new Set(data.flatMap((item) => item.severity.split(',').map(s => s.trim())))].filter(n => n);
    optionsCriticality = [...new Set(data.map((item) => item.criticality))].filter(n => n);
    optionsExploitObserve = [...new Set(data.map((item) => item.exploitObserve))].filter(n => n);
  }

  if (vpParent && vpParent !== 'all') {
    optionsDirector = [...new Set(data.filter((item) => item.vp === vpParent).map((item) => item.director))].filter(n => n);
    optionsOwner = [...new Set(data.filter((item) => item.vp === vpParent).map((item) => item.owner))].filter(n => n);
    optionsSeverity = [...new Set(data.filter((item) => item.vp === vpParent).flatMap((item) => item.severity.split(',').map(s => s.trim())))].filter(n => n);
    optionsCriticality = [...new Set(data.filter((item) => item.vp === vpParent).map((item) => item.criticality))].filter(n => n);
    optionsExploitObserve = [...new Set(data.filter((item) => item.vp === vpParent).map((item) => item.exploitObserve))].filter(n => n);
  } else {
    optionsDirector = [...new Set(data.map((item) => item.director))].filter(n => n);
    optionsOwner = [...new Set(data.map((item) => item.owner))].filter(n => n);
    optionsSeverity = [...new Set(data.flatMap((item) => item.severity.split(',').map(s => s.trim())))].filter(n => n);
    optionsCriticality = [...new Set(data.map((item) => item.criticality))].filter(n => n);
    optionsExploitObserve = [...new Set(data.map((item) => item.exploitObserve))].filter(n => n);
  }

  if (directorParent && directorParent !== 'all') {
    optionsOwner = [...new Set(data.filter((item) => item.director === directorParent).map((item) => item.owner))].filter(n => n);
    optionsSeverity = [...new Set(data.filter((item) => item.director === directorParent).flatMap((item) => item.severity.split(',').map(s => s.trim())))].filter(n => n);
    optionsCriticality = [...new Set(data.filter((item) => item.director === directorParent).map((item) => item.criticality))].filter(n => n);
    optionsExploitObserve = [...new Set(data.filter((item) => item.director === directorParent).map((item) => item.exploitObserve))].filter(n => n);
  } else {
    optionsOwner = [...new Set(data.map((item) => item.owner))].filter(n => n);
    optionsSeverity = [...new Set(data.flatMap((item) => item.severity.split(',').map(s => s.trim())))].filter(n => n);
    optionsCriticality = [...new Set(data.map((item) => item.criticality))].filter(n => n);
    optionsExploitObserve = [...new Set(data.map((item) => item.exploitObserve))].filter(n => n);
  }

  if (ownerParent && ownerParent !== 'all') {
    optionsSeverity = [...new Set(data.filter((item) => item.owner === ownerParent).flatMap((item) => item.severity.split(',').map(s => s.trim())))].filter(n => n);
    optionsCriticality = [...new Set(data.filter((item) => item.owner === ownerParent).map((item) => item.criticality))].filter(n => n);
    optionsExploitObserve = [...new Set(data.filter((item) => item.owner === ownerParent).map((item) => item.exploitObserve))].filter(n => n);
  } else {
    optionsSeverity = [...new Set(data.flatMap((item) => item.severity.split(',').map(s => s.trim())))].filter(n => n);
    optionsCriticality = [...new Set(data.map((item) => item.criticality))].filter(n => n);
    optionsExploitObserve = [...new Set(data.map((item) => item.exploitObserve))].filter(n => n);
  }

  // if (severityTypeParent && severityTypeParent !== 'all') {
  //   optionsCriticality = [...new Set(data.filter((item) => item.severity.includes(severityTypeParent)).map((item) => item.criticality))].filter(n => n);
  //   optionsExploitObserve = [...new Set(data.filter((item) => item.severity.includes(severityTypeParent)).map((item) => item.exploitObserve))].filter(n => n);
  // } else {
  //   optionsCriticality = [...new Set(data.map((item) => item.criticality))].filter(n => n);
  //   optionsExploitObserve = [...new Set(data.map((item) => item.exploitObserve))].filter(n => n);
  // }

  // if (criticalityParent && criticalityParent !== 'all') {
  //   optionsExploitObserve = [...new Set(data.filter((item) => item.criticality === criticalityParent).map((item) => item.exploitObserve))].filter(n => n);
  // } else {
  //   optionsExploitObserve = [...new Set(data.map((item) => item.exploitObserve))].filter(n => n);
  // }

  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(3, 1fr)"
      mb="25px"
      sx={{
        backgroundColor: theme.palette.mode === 'light' ? colors.primary[10] : colors.primary[400],
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.7)',
        borderRadius: '8px'
      }}
    >
      <Dropdown
        setState={setPortfolioParent}
        state={portfolioParent}
        options={optionsPortfolio}
        title="Portfolio" />
      <Dropdown
        setState={setVpParent}
        state={vpParent}
        options={optionsVp}
        title="Department" />
      <Dropdown
        setState={setDirectorParent}
        state={directorParent}
        options={optionsDirector}
        title="Team" />
      <Dropdown
        setState={setOwnerParent}
        state={ownerParent}
        options={optionsOwner}
        title="App Owner" />
      <Dropdown
        setState={setSeverityTypeParent}
        state={severityTypeParent}
        options={optionsSeverity}
        title="Severity" />
      <Dropdown
        setState={setCriticalityParent}
        state={criticalityParent}
        options={optionsCriticality}
        title="Criticality" />
      <Dropdown
        setState={setExploitObserveParent}
        state={exploitObserveParent}
        options={optionsExploitObserve}
        title="Exploit Observed" />
      <Box
        display="flex"
        m={5}
        marginTop={7}>
        <FormGroup >
          <FormControlLabel
            control={
              <Switch
                checked={withDetailsParent}
                onChange={(event) => setWithDetailsParent(event.target.checked)}
                inputProps={{ 'aria-label': 'controlled' }}
                color="secondary"
              />
            }
            label={<Typography sx={{ fontSize: '16px', fontWeight: '600' }}>Details</Typography>} />
        </FormGroup>
      </Box>
    </Box>
  );
};

export default Filters;