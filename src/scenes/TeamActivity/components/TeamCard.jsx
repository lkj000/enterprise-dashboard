import { React, useState } from "react";
import { Box } from '@mui/material';
import TeamDropdown from './TeamDropdown';
import TeamChart from "./TeamChart";
import TeamTable from './TeamTable';


const TeamCard = ({ data, theme, colors }) => { 

  const [ port, setPort ] = useState("All");
  const [ selectVP, setVP ] = useState("All");
  const [ selectDirector, setDirector ] = useState("All");
  const [ selectManager, setManager ] = useState("All");
  const [ colState, setColState ] = useState({ story: true, issue: false });
  const [ toggleState, setToggleState ] = useState({ storyPercent: false, issuePercent: false });
  const [ barData, setBarData ] = useState([]);
  const [ lineData, setLineData ] = useState([]);
  const chartState = (port === 'All' || !port) && (selectVP === 'All' || !selectVP) && (selectDirector === 'All' || !selectDirector) && (selectManager === 'All' || !selectManager);


  return (
    <Box>
      <TeamDropdown
        input={data}
        port={port}
        setPort={setPort}
        selectVP={selectVP}
        setVP={setVP}
        selectDirector={selectDirector}
        setDirector={setDirector}
        selectManager={selectManager}
        setManager={setManager}
        setColState={setColState}
        setToggleState={setToggleState}
        setBarData={setBarData}
        setLineData={setLineData}
        theme={theme}
        colors={colors}
      />

      {!chartState && <TeamChart
        barData={barData}
        lineData={lineData}
        viewState={colState}
        colors={colors}
      />}

      <TeamTable
        input={data}
        port={port}
        selectVP={selectVP}
        selectDirector={selectDirector}
        selectManager={selectManager}
        colState={colState}
        toggleState={toggleState}
      />
    </Box>
  );
}

export default TeamCard;