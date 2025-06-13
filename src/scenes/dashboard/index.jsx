import { React } from "react";
import { Box } from "@mui/material";
import Header from "../../components/Header";
import Announcements from "../../components/AnnouncementsColumnView";
import HomeTiles from "./components/HomeTiles";
import HomeCharts from "./components/HomeCharts";


const Dashboard = () => {
  return (
    <Box m="25px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DevOps Dashboard" subtitle="Overview" />
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(16, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        <Box gridColumn="span 16">
          <HomeTiles />
        </Box>

        {/* ROW 2 - Charts*/}
        <HomeCharts />
        {/* ROW 1 - Announcements*/}
        <Announcements />

      </Box>
    </Box>
  );
};

export default Dashboard;