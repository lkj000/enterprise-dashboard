import { React, useEffect, useState } from "react";
import { Box } from '@mui/material';
import Header from "../../components/Header";
import QueueTable from "./components/QueueTable";
import { getQueueData } from "./requests";


const InProgress = () => {

  const [queueData, setQueueData] = useState([]);

  const fetchData = async () => {
    setQueueData(await getQueueData());
  };


  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 600000);
    return () => clearInterval(intervalId);
  }, []);


  return (
    <Box m="25px">

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="In Progress" subtitle="Overview" />
      </Box>

      <QueueTable input={queueData} fetchData={fetchData} />
    </Box>
  );
};

export default InProgress;
	