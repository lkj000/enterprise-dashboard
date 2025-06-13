import {React, useState} from "react";
import { Box } from '@mui/material';
import CommitTiles from "./CommitTiles";
import UserDropdown from "./UserDropdown";
import UserTable from "./UserTable";
import { getSortDataForDropdown } from "../../../../utils";

const UserAct = ({ data, theme, colors, dates}) => {

  const [port, setPort] = useState('All');
  const [selectVP, setSelectVP] = useState('All');
  const [selectDirector, setSelectDirector] = useState('All');
  const [selectManager, setSelectManager] = useState('All');
  const [userID, setUserID] = useState('All');
  const [status, setStatus] = useState('Active');
  const [showCol, setShowCol] = useState(false);
  const [selectIndex, setSelectIndex] = useState(null);
  const objDefaultFilter = getSortDataForDropdown(data, ['portfolio', 'vp', 'director', 'manager', 'user', 'user_status']);


  return (
    <Box>
      <UserDropdown 
        input={data}
        objDefaultFilter={objDefaultFilter}
        port={port}
        setPort={setPort}
        selectVP={selectVP}
        setSelectVP={setSelectVP}
        selectDirector={selectDirector}
        setSelectDirector={setSelectDirector}
        selectManager={selectManager} 
        setSelectManager={setSelectManager}
        userID={userID}
        setUserID={setUserID}
        status={status}
        setStatus={setStatus}
        showCol={showCol}
        setShowCol={setShowCol}
        setSelectIndex={setSelectIndex}
        theme={theme}
        colors={colors}
      />

      {userID !== 'All' && userID ?
      <CommitTiles input={data} selectIndex={selectIndex} colors={colors} /> : null}

      <UserTable 
        input={data} 
        port={port}
        selectVP={selectVP}
        selectDirector={selectDirector}
        selectManager={selectManager} 
        userID={userID}
        status={status}
        showCol={showCol}
        dates={dates}
      />
    </Box>
  );
};

export default UserAct;