import { React, useEffect, useState } from "react";
import { Box } from '@mui/material';
import HistDropdown from "./HistDropdown";
import HistTable from "./HistTable";
import { getImgList } from "../../requests";


const HistoryMain = ({ repoNames, colors }) => {


  const [ selectRepo, setSelectRepo ] = useState(null);
  const [ data, setData ] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      if (!selectRepo) {
        setData([]);
      } else {
        const res = await getImgList({ repoName: selectRepo });
        setData(res);
      }
    };
  
    fetchData();
  }, [selectRepo, setData]);


  return (
    <Box>
      <HistDropdown
        repoNames={repoNames}
        selectRepo={selectRepo}
        setSelectRepo={setSelectRepo}
        colors={colors}
      />
      { data.length > 0 && <HistTable input={data} /> }
    </Box>
  );
};

export default HistoryMain;