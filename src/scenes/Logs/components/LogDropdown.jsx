import { React, useMemo, useState } from "react";
import { Grid } from '@mui/material';
import CustomAccordion from "../../../common-components/Accordion/CustomAccordion";
import Dropdown from "../../../common-components/Dropdown";
import { set1DataFilter, handleDropdownFilter, getSortDataForDropdown } from "../../../utils";
import { UpdateFields, functionMap } from "../requests";


const LogDropdown = ({ input, port, setPort, selectVP, setVP, selectDirector, setDirector, userID, setUserID, theme, colors}) => {

  const objDefaultFilter = getSortDataForDropdown(input, ['portfolio', 'vp', 'director', 'user']);
  const [ VPFilter, setVPFilter ] = useState(objDefaultFilter['vp']);
  const [ DirectorFilter, setDirectorFilter ] = useState(objDefaultFilter['director']);
  const [ UserFilter, setUserFilter ] = useState(objDefaultFilter['user']);

  // Filter Data
  var filterData = useMemo(() => UpdateFields(port, selectVP, selectDirector, userID),
  [port, selectVP, selectDirector, userID]);


  // PORTFOLIO
  const handleChangePort = (_event, newPort) => {
    setPort(newPort);
    setVP('All');
    setDirector('All');
    setUserID('All');

    if (newPort === 'All' || !newPort) {
      setPort('All');
      setVPFilter(objDefaultFilter['vp']);
      setDirectorFilter(objDefaultFilter['director']);
      setUserFilter(objDefaultFilter['user']);
    } else {
      setVPFilter(set1DataFilter(input, 'portfolio', newPort, 'vp'));
      setDirectorFilter(set1DataFilter(input, 'portfolio', newPort, 'director'));
      setUserFilter(set1DataFilter(input, 'portfolio', newPort, 'user'));
    }
  };


  // VP
  const handleChangeVP = (_event, newVP) => {
    setVP(newVP);
    setDirector('All');
    setUserID('All');

    if (newVP === 'All' || !newVP) {
      setVP('All');
      if (port === 'All' || !port) {
        setDirectorFilter(objDefaultFilter['director']);
        setUserFilter(objDefaultFilter['user']);
      } else {
        setDirectorFilter(set1DataFilter(input, 'portfolio', port, 'director'));
        setUserFilter(set1DataFilter(input, 'portfolio', port, 'user'));
      };
    } else {
      setDirectorFilter(set1DataFilter(input, 'vp', newVP, 'director'));
      setUserFilter(set1DataFilter(input, 'vp', newVP, 'user'));
    }
  };


  // DIRECTOR
  const handleChangeDirector = (_event, newDirector) => {
    setDirector(newDirector);
    setUserID('All');

    if (newDirector === 'All' || !newDirector) {
      setDirector('All');
      const obj = ['director', 'user'];
      obj.forEach((item) => filterData[item] = 'All');
      const [args, name] = handleDropdownFilter(filterData);
      if (args.length > 0) {
        setUserFilter(functionMap[name](input, ...args, 'user'));
      } else {
        setUserFilter(objDefaultFilter['user']);
      };
    } else {
      setUserFilter(set1DataFilter(input, 'director', newDirector, 'user'));
    }
  };


  // USER
  const handleChangeUser = (_event, newUser) => {
    setUserID(newUser);
    if (newUser === 'All' || !newUser) {
      setUserID('All');
      filterData['user'] = 'All';
    }
  };


  return (
    <CustomAccordion
      defaultValue={true}
      title="Filters"
      isDisplay={true}
      stylesInfo={{ marginBottom: '40px'}}
      colors={colors}
    >
      <Grid container>

        <Dropdown
          title="Portfolio"
          subtitle="Portfolio"
          options={objDefaultFilter['portfolio']}
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
        <Dropdown
          title="User ID"
          subtitle="UserID"
          options={UserFilter}
          value={userID}
          handleChange={handleChangeUser}
          theme={theme}
          colors={colors}
        />

      </Grid>
    </CustomAccordion>
  );
}

export default LogDropdown;