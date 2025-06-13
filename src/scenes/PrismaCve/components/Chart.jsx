import React from "react";
import Box from "@mui/material/Box";
import BarChartUser from "../../../components/BarChartUser";

const Chart = ({ input, filter }) => {
  const filteredData = input.filter((data) => {
    return (
      (filter.portfolio === "all" || data.portfolio === filter.portfolio) &&
      (filter.vp === "all" || data.Department === filter.vp) &&
      (filter.director === "all" || data.Team === filter.director) &&
      (filter.owner === "all" || data.AppOwner === filter.owner) &&
      (filter.AppCode === "all" || data.AppCode === filter.AppCode)
    );
  });

  const graphData = filteredData.reduce(
    (acc, curr) => {
      const criticalItem = acc.find((item) => item.id === "critical");
      if (curr.critical !== "Not Found") {
        criticalItem.Total += curr.critical;
      }
      const highItem = acc.find((item) => item.id === "high");
      if (curr.high !== "Not Found") {
        highItem.Total += curr.high;
      }
  
      const mediumItem = acc.find((item) => item.id === "medium");
      if (curr.medium !== "Not Found") {
        mediumItem.Total += curr.medium;
      }
  
      const lowItem = acc.find((item) => item.id === "low");
      if (curr.low !== "Not Found") {
        lowItem.Total += curr.low;
      }
      return acc;
    },
    [
      {
        id: "critical",
        Total: 0,
      },
      {
        id: "high",
        Total: 0,
      },
      {
        id: "medium",
        Total: 0,
      },
      {
        id: "low",
        Total: 0,
      },
    ]
  );
  const colors = (bar) => {
    switch (bar.indexValue) {
      case "critical":
        return "#7E0A0A";
      case "high":
        return "#AF0F0F";
      case "medium":
        return "#DF1C1C";
      case "low":
        return "#FC3A3A";
      default:
        return "#000000";
    }
  };
  return (
    <Box>
      {/* Your chart content goes here */}
      <div style={{ height: 500, position: "relative", marginTop: "50px" }}>
        <BarChartUser
          data={graphData}
          dataIndex="id"
          dataKeys={["Total"]}
          mode="stacked"
          layout="vertical"
          marginCss={[20, 130, 190, 50]}
          colorType={colors}
          legendX="Severity"
          legendY=""
          XaxisRotate={-90}
          legendXOffset={160}
          translateX={115}
          topValue={true}
          label={false}
        />
      </div>
    </Box>
  );
};

export default Chart;
