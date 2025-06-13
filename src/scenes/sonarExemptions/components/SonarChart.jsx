import { React } from "react";
import { Box, Grid } from '@mui/material';
import PieChartBox from "../../../common-components/PieChartBox";
import PortfolioChart from "../../../components/PortfolioChart";
import StackBarChart from "../../../components/StackBarChart";
import { set1DataFilter } from "../../../utils";
import { totalCount, common, cog, digital, retail, barInfo, barCommon, objDefaultFilter } from "../requests";


const SonarChart = ({ input, barData, setPort, setDept, setAppowner, setAppcode, setDeptFilter, setOwnerFilter, setAppcodeFilter, setBarData, colors }) => { 


  const chartData = [
    { title: "All Portfolio's", data: common, total: totalCount, filterName: "All" },
    { title: `${cog[0]} Portfolio`, data: cog[1], total: cog[2], filterName: cog[0] },
    { title: `${digital[0]} Portfolio`, data: digital[1], total: digital[2], filterName: digital[0] },
    { title: `${retail[0]} Portfolio`, data: retail[1], total: retail[2], filterName: retail[0] }
  ];


  const handleDataPie = (data) => {
    const portName = typeof data === "string" ? data : data.filterName;
    setPort(portName);
    setBarData(portName === "All" ? barCommon : barInfo[portName]);
    setDept('All');
    setAppowner('All');
    setAppcode('All');

    if(portName === 'All' || !portName){
      setDeptFilter(objDefaultFilter['Department']);
      setOwnerFilter(objDefaultFilter['appOwner']);
      setAppcodeFilter(objDefaultFilter['appCode']);
    }else {
      setDeptFilter(set1DataFilter(input, 'Portfolio', portName, 'Department'));
      setOwnerFilter(set1DataFilter(input, 'Portfolio', portName, 'appOwner'));
      setAppcodeFilter(set1DataFilter(input, 'Portfolio', portName, 'appCode'));
    }
  }

  const handleBarClick = (bar) => {
    setDept(bar.data.Portfolio);
    setAppowner('All');
    setAppcode('All');

    setOwnerFilter(set1DataFilter(input, 'Department', bar.data.Portfolio, 'appOwner'));
    setAppcodeFilter(set1DataFilter(input, 'Department', bar.data.Portfolio, 'appCode'));
  }


  return (
    <Box>
      <Box
        display="flex"
        marginBottom="20px"
        sx={{ width: '100%', height: 'auto' }}
      >
        <Grid container>
          {common[0].value !== 0 && chartData.map((item, index) => (
            <PieChartBox
              key={index}
              title={item.title}
              colors={colors}
            >
              <PortfolioChart data={item.data} total={item.total} filterName={item.filterName} sendDataPie={handleDataPie} legendX={-68} />
            </PieChartBox>
          ))}
        </Grid>
      </Box>

      {barData.length > 0 ?
      <Box display="flex">
        <StackBarChart data={barData} onClickBar={handleBarClick} />
      </Box> : null}
    </Box>
  );
};

export default SonarChart;