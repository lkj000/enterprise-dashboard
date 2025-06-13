import { React } from "react";
import { Box, Grid } from '@mui/material';
import PieChartBox from "../../../common-components/PieChartBox";
import PortfolioChart from "../../../components/PortfolioChart";
import { totalCount, common, cog, digital, retail } from "../requests";


const ArchitectChart = ({ setPort, setPtxValue, colors }) => {


  const chartData = [
    { title: "All Portfolio's", data: common, total: totalCount, filterName: "All" },
    { title: `${cog[0]} Portfolio`, data: cog[1], total: cog[2], filterName: cog[0] },
    { title: `${digital[0]} Portfolio`, data: digital[1], total: digital[2], filterName: digital[0] },
    { title: `${retail[0]} Portfolio`, data: retail[1], total: retail[2], filterName: retail[0] }
  ];


  const handleDataPie = (data) => {
    if(typeof data === "string"){
      setPort(data);
      setPtxValue('All');
    } else {
      setPort(data.filterName);
      setPtxValue(data.id.includes('Not Present') ? 'Not Present' : 'Present');
    }
  };



  return (
    <Box
      display="flex"
      marginBottom="20px"
      sx={{ width: '100%', height: 'auto' }}
    >
      <Grid container>
        {chartData.map((item, index) => (
          <PieChartBox
            key={index}
            title={item.title}
            colors={colors}
          >
            <PortfolioChart data={item.data} total={item.total} filterName={item.filterName} sendDataPie={handleDataPie} legendX={-50} />
          </PieChartBox>
        ))}
      </Grid>
    </Box>
  );
};

export default ArchitectChart;