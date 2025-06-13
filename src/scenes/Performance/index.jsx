import { React, useState, useEffect, lazy, Suspense } from "react";
import { Box, useTheme } from '@mui/material';
import ProgressIcon from "../../common-components/ProgressIcon";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { WorkflowData } from "./requests";


const PerfAct = lazy(() => import('./components/PerfActivity'));

const PerfData = ({ theme, colors }) => {

  const [ loading, setLoading ] = useState(true);
  const [ data, setData ] = useState([]);

  useEffect(() => {
    setData(WorkflowData);
    setLoading(false);
  }, []);

  if (loading){
    return  <ProgressIcon />;
  }

  return (
    <Suspense fallback={<ProgressIcon />}>
      <PerfAct data={data} theme={theme} colors={colors} />
    </Suspense>
  );
}


const Performance = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  return (
    <Box m="25px">

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Performance" subtitle="Overview" />
      </Box>

      <PerfData theme={theme} colors={colors} />
    </Box>
  );
};

export default Performance;