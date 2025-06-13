import React from 'react';
import Box from '@mui/material/Box';
import BarChartUser from '../../../components/BarChartUser';

const CVEChart = ({ input, filter }) => {

  const filteredData = input.filter((data) => {
    return (filter.portfolio === "all" || data.portfolio === filter.portfolio) &&
      (filter.vp === "all" || data.vp === filter.vp) &&
      (filter.director === "all" || data.director === filter.director) &&
      (filter.owner === "all" || data.owner === filter.owner) &&
      (filter.severityType === "all" || data.severity.split(',').map(s => s.trim())
        .some(s => s === filter.severityType)) &&
      (filter.criticality === "all" || data.criticality === filter.criticality) &&
      (filter.exploitObserve === "all" || data.exploitObserve === filter.exploitObserve);
  });
  const graphData = filteredData.reduce((acc, curr) => {
    const categories = ["Very High", "High", "Medium", "Low", "Very Low"];
    categories.forEach((category) => {
      const item = acc.find((item) => item.id === category);
      const obj = category.charAt(0).toLowerCase() + category.slice(1);
      const value = curr[obj.replace(" ", "")];
      if (typeof value === 'number') {
        item.Total += value;
      }
    });
    return acc
  }, [
    {
      id: "Very High",
      Total: 0,
    },
    {
      id: "High",
      Total: 0,
    },
    {
      id: "Medium",
      Total: 0,
    },
    {
      id: "Low",
      Total: 0,
    },
    {
      id: "Very Low",
      Total: 0,
    }
  ]);
  const colors = bar => {
    switch (bar.indexValue) {
      case "Very High":
        return "#7E0A0A";
      case "High":
        return "#AF0F0F";
      case "Medium":
        return "#DF1C1C";
      case "Low":
        return "#FC3A3A";
      case "Very Low":
        return "#E05353";
      default:
        return "#000000";
    }
  }

  const totalValue = graphData.reduce((sum, item) => sum + item.Total, 0);

  return (
    <Box>
      {totalValue > 0 && (
      <div style={{ height: 500, position: "relative", marginTop: "50px" }}>
        <BarChartUser data={graphData} dataIndex="id" dataKeys={["Total"]} mode="stacked" layout="vertical" marginCss={[20, 130, 190, 50]} colorType={colors} legendX="Severity" legendY="" XaxisRotate={-90} legendXOffset={160} translateX={115} topValue={true} label={false} />
      </div> )}
    </Box>
  );
};

export default CVEChart;