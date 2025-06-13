import { React, useState } from "react";
import { Box } from '@mui/material';
import RepoChart from "./RepoChart";
import RepoDropdown from "./RepoDropdown";
import RepoTable from "./RepoTable";
import { getSortDataForDropdown } from "../../../../utils";

const RepoAct = ({ data, dates, theme, colors }) => {

  const [port, setPort] = useState('All');
  const [selectVP, setSelectVP] = useState('All');
  const [director, setDirector] = useState('All');
  const [owner, setOwner] = useState('All');
  const [selectAppcode, setSelectAppcode] = useState('All');
  const [userID, setUserID] = useState('All');
  const [graphData, setGraphData] = useState([]);
  const objDefaultFilter = getSortDataForDropdown(data, ['Portfolio', 'VP', 'department', 'AppOwner', 'appcode', 'user']);


  return (
    <Box>
      <RepoDropdown 
        input={data}
        objDefaultFilter={objDefaultFilter}
        port={port}
        setPort={setPort}
        selectVP={selectVP}
        setSelectVP={setSelectVP}
        director={director}
        setDirector={setDirector}
        owner={owner}
        setOwner={setOwner}
        selectAppcode={selectAppcode}
        setSelectAppcode={setSelectAppcode}
        userID={userID}
        setUserID={setUserID}
        setGraphData={setGraphData}
        theme={theme}
        colors={colors}
      />

      {selectAppcode !== 'All' && selectAppcode ? 
      <RepoChart data={graphData} colors={colors} /> : null}

      <RepoTable 
        input={data} 
        dates={dates}
        port={port}
        selectVP={selectVP}
        director={director}
        owner={owner}
        selectAppcode={selectAppcode}
        userID={userID}
        colors={colors}
      />
    </Box>
  );
};

export default RepoAct;