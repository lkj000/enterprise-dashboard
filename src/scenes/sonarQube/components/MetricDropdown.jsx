import { React, useMemo, useState } from "react";
import { Box, Grid } from '@mui/material';
import Dropdown from "../../../common-components/Dropdown";
import { objDefaultFilter } from "../requests";
import { UpdateFields, handlePortfolio, handleVP, handleOwner } from "./HandleDropdowns";


const MetricDropdown = ({ port, VP, owner, setPort, setVP, setOwner, setTilesData, theme, colors}) => {

  const [ VPFilter, setVPFilter ] = useState(objDefaultFilter['VP']);
  const [ OwnerFilter, setOwnerFilter ] = useState(objDefaultFilter['AppOwner']);

  // Filter Data
  var filterData = useMemo(() => UpdateFields(port, VP, owner),
  [port, VP, owner]);

  const handleChangePort = (event, newPort) => {
    handlePortfolio(newPort, setPort, setVP, setOwner, setVPFilter, setOwnerFilter, setTilesData);
  };

  const handleChangeVP = (event, newVP) => {
    handleVP(newVP, port, setVP, setOwner, setOwnerFilter, setTilesData);
  };

  const handleChangeOwner = (event, newOwner) => {
    handleOwner(newOwner, filterData, setOwner, setTilesData);
  };


  return (
    <Box>
      <Box
        display="flex"
        marginBottom="40px"
        sx={{ backgroundColor: colors.primary[400], width: '100%', height: 'auto' ,filter: 'drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.2))', borderRadius: '5px'}}
        boxShadow="0px 4px 10px rgba(0, 0, 0, 0.5)" 
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
            value={VP}
            handleChange={handleChangeVP}
            theme={theme}
            colors={colors}
          />
          <Dropdown
            title="App Owner"
            subtitle="App Owner"
            options={OwnerFilter}
            value={owner}
            handleChange={handleChangeOwner}
            theme={theme}
            colors={colors}
          />
        </Grid>
      </Box>
    </Box>
  );
}

export default MetricDropdown;