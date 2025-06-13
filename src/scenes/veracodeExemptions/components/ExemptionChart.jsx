import { React } from "react";
import { Box, Grid } from '@mui/material';
import PieChartBox from "../../../common-components/PieChartBox";
import VeracodeExpBarChart from "../../../components/VeracodeExpBarChart";
import StackBarChart from "../../../components/StackBarChart";
import { handlePieClick, handleBarClick } from "./HandleDropdowns";
import { pieData } from "../requests";


const ExemptionChart = ({ input, setPort, setDept, setOwner, setAppcode, setExempType, setDeptFilter, setOwnerFilter, setAppcodeFilter, setExemptionFilter, barData, setBarData, colors }) => {


  const handleDataPie = (newData) => {
    handlePieClick(newData, input, setPort, setDept, setOwner, setAppcode, setExempType, setDeptFilter, setOwnerFilter, setAppcodeFilter, setExemptionFilter, setBarData);
  };

  const handleDataBar = (newData) => {
    handleBarClick(newData, input, setDept, setOwner, setAppcode, setExempType, setOwnerFilter, setAppcodeFilter, setExemptionFilter);
  };


  return (
    <Box>
      <Box
        display="flex"
        marginBottom={15}
        sx={{ width: '100%', height: 'auto' }}
      >
        <Grid container>
          {pieData.map((item, index) => (
            <PieChartBox
              key={index}
              title={item.title}
              colors={colors}
            >
              <VeracodeExpBarChart data={item.data} total={item.total} filterName={item.filterName} sendDataPie={handleDataPie} legendX={-40} legendY={item.legendY} />
            </PieChartBox>
          ))}
        </Grid>
      </Box>

      {barData.length > 0 ?
      <Box display="flex">
        <StackBarChart data={barData} onClickBar={handleDataBar} />
      </Box> : null}
    </Box>
  );
};

export default ExemptionChart;