import { React } from "react";
import { Box } from "@mui/material";
import Header from "../../components/Header";
import RepoMain from "./RepoMain";

const RepoSecret = () => {
  return (
    <Box m="25px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Repositories With Secrets" subtitle="Overview" />
      </Box>

      <RepoMain />
    </Box>
  );
};

export default RepoSecret;
