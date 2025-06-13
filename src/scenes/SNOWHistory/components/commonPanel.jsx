import React, { useEffect } from 'react';
import { Box, Grid, useTheme } from '@mui/material';
import CustomAccordion from "../../../common-components/Accordion/CustomAccordion";
import Dropdown from '../../../components/Dropdown';
import TilesGroup from './tilesGroup';
import { tokens } from "../../../theme";

const CommonPanel = ({ data, title }) => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  let lastRun = data?.update_date ?? "";

  data = (data?.data || []).map((item, i) => ({
    ...item,
    made_sla: item.made_sla === 'true' ? "In SLA" : item.made_sla === 'false' ? "Out of SLA" : item.made_sla
  }));

  const [madeSla, setMadeSla] = React.useState('all');
  const [state, setState] = React.useState('all');
  const [assignmentGroup, setAssignmentGroup] = React.useState('all');
  const [manager, setManager] = React.useState('all');
  const [portfolio, setPortfolio] = React.useState('all');
  const [vp, setVp] = React.useState('all');
  const [director, setDirector] = React.useState('all');

  let optionsAssignmentGroup = [], optionsManager = [], optionsPortfolio = [], optionsVp = [], optionsDirector = [], optionsState = [], optionsSla = [];

  optionsPortfolio = [...new Set(data.filter(item => item.portfolio).map(item => item.portfolio))]
  if (data.filter(item => !item.portfolio).length > 0) optionsPortfolio.unshift("Not Specified")
  const validatePortfolio = (item) => {
    if (portfolio === "Not Specified") {
      return !item.portfolio
    } else if (portfolio === "all") {
      return true
    } else {
      return item.portfolio === portfolio
    }
  }
  const validateVp = (item) => {
    if (vp === "Not Specified") {
      return !item.vp
    } else if (vp === "all") {
      return true
    } else {
      return item.vp === vp
    }
  }
  const validateDirector = (item) => {
    if (director === "Not Specified") {
      return !item.director
    } else if (director === "all") {
      return true
    } else {
      return item.director === director
    }
  }

  const validateManager = (item) => {
    if (manager === "Not Specified") {
      return !item.manager
    } else if (manager === "all") {
      return true
    } else {
      return item.manager === manager
    }
  }

  const validateAssignedGroup = (item) => {
    if (assignmentGroup === "Not Specified") {
      return !item.assignment_group
    } else if (assignmentGroup === "all") {
      return true
    } else {
      return item.assignment_group === assignmentGroup
    }
  }

  const validateState = (item) => {
    if (state === "Not Specified") {
      return !item.state
    } else if (state === "all") {
      return true
    } else {
      return item.state === state
    }
  }

  optionsVp = [...new Set(data.filter(item => item.vp && validatePortfolio(item))
    .map(item => item.vp))]
  if (data.filter(item => !item.vp && validatePortfolio(item)).length > 0) optionsVp.unshift("Not Specified")

  optionsDirector = [...new Set(data.filter(item => item.director
    && validateVp(item) && validatePortfolio(item))
    .map(item => item.director))]
  if (data.filter(item => !item.director && validateVp(item) && validatePortfolio(item)).length > 0) optionsDirector.unshift("Not Specified")

  optionsManager = [...new Set(data.filter(item => item.manager
    && validateDirector(item) && validateVp(item) && validatePortfolio(item))
    .map(item => item.manager))]
  if (data.filter(item => !item.manager && validateDirector(item) && validateVp(item) && validatePortfolio(item)).length > 0) optionsManager.unshift("Not Specified")

  optionsAssignmentGroup = [...new Set(data.filter(item => item.assignment_group
    && validateManager(item) && validateDirector(item) && validateVp(item) && validatePortfolio(item))
    .map(item => item.assignment_group))]
  if (data.filter(item => !item.assignment_group && validateManager(item) && validateDirector(item) && validateVp(item) && validatePortfolio(item)).length > 0) optionsAssignmentGroup.unshift("Not Specified")

  optionsState = [...new Set(data.filter(item => item.state
    && validateAssignedGroup(item) && validateManager(item) && validateDirector(item) && validateVp(item) && validatePortfolio(item))
    .map(item => item.state))]
  if (data.filter(item => !item.state && validateAssignedGroup(item) && validateManager(item) && validateDirector(item) && validateVp(item) && validatePortfolio(item)).length > 0) optionsState.unshift("Not Specified")

  optionsSla = [...new Set(data.filter(item => item.made_sla
    && validateState(item) && validateAssignedGroup(item) && validateManager(item) && validateDirector(item) && validateVp(item) && validatePortfolio(item))
    .map(item => item.made_sla))]
  if (data.filter(item => !item.made_sla && validateState(item) && validateAssignedGroup(item) && validateManager(item) && validateDirector(item) && validateVp(item) && validatePortfolio(item)).length > 0) optionsSla.unshift("Not Specified")


  let filter = {
    madeSla: madeSla,
    state: state,
    assignmentGroup: assignmentGroup,
    portfolio: portfolio,
    vp: vp,
    director: director,
    manager: manager
  }

  useEffect(() => {
    setVp('all')
    setDirector('all')
    setManager('all')
    setAssignmentGroup('all')
    setState('all')
    setMadeSla('all')
  }, [portfolio])
  useEffect(() => {
    setDirector('all')
    setManager('all')
    setAssignmentGroup('all')
    setState('all')
    setMadeSla('all')
  }, [vp])
  useEffect(() => {
    setManager('all')
    setAssignmentGroup('all')
    setState('all')
    setMadeSla('all')
  }, [director])
  useEffect(() => {
    setAssignmentGroup('all')
    setState('all')
    setMadeSla('all')
  }, [manager])
  useEffect(() => {
    setState('all')
    setMadeSla('all')
  }, [assignmentGroup])
  useEffect(() => {
    setMadeSla('all')
  }, [state])

  return (
    <Box>
      {/* Your component content goes here */}
      <CustomAccordion
        defaultValue={true}
        title="Filters"
        isDisplay={true}
        stylesInfo={{ marginBottom: '40px'}}
        colors={colors}
      >
        <Grid container>
          <Dropdown setState={setPortfolio} state={portfolio} options={optionsPortfolio} title={"Porfolio"} />
          <Dropdown setState={setVp} state={vp} options={optionsVp} title={"Department"} />
          <Dropdown setState={setDirector} state={director} options={optionsDirector} title={"Team"} />
          <Dropdown setState={setManager} state={manager} options={optionsManager} title={"Manager"} />
          <Dropdown setState={setAssignmentGroup} state={assignmentGroup} options={optionsAssignmentGroup} title={"Assignment Group"} />
          <Dropdown setState={setState} state={state} options={optionsState} title={"State"} />
          <Dropdown setState={setMadeSla} state={madeSla} options={optionsSla} title={"SLA Status"} />
        </Grid>
      </CustomAccordion>

      <TilesGroup summary={data} filter={filter} title={title} lastRun={lastRun} />
    </Box>
  );
};

export default CommonPanel;