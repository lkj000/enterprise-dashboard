import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import MUIDataTable from "mui-datatables";
import { callExpressServerEndpointSync } from "../../utils";
import "../global/custom-table.css";

const FeedbackShow = () => {
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const feedbackResponse = await callExpressServerEndpointSync("GET", "feedback");
      if (feedbackResponse.status === 200 && feedbackResponse.data) {
        setFeedbackList(feedbackResponse.data);
      } else {
        setFeedbackList([]);
      }
    };
    fetchData();
  }, []);

  const columns = [
    {
      name: "userid",
      label: "User ID",
      options: {
        filter: false,
        sort: false,
        setCellProps: () => ({ style: { width: "150px", fontSize: "16px" } }),
        setCellHeaderProps: () => ({ style: { fontSize: "18px", fontWeight: "bold" } }),
      },
    },
    {
      name: "fullname",
      label: "Full Name",
      options: {
        filter: false,
        sort: false,
        setCellProps: () => ({ style: { width: "200px", fontSize: "16px" } }),
        setCellHeaderProps: () => ({ style: { fontSize: "18px", fontWeight: "bold" } }),
      },
    },
    {
      name: "sidebarSection",
      label: "Sidebar Section",
      options: {
        filter: false,
        sort: false,
        setCellProps: () => ({ style: { width: "180px", fontSize: "16px" } }),
        setCellHeaderProps: () => ({ style: { fontSize: "18px", fontWeight: "bold" } }),
      },
    },
    {
      name: "screenUnderSection",
      label: "Screen Under Section",
      options: {
        filter: false,
        sort: false,
        setCellProps: () => ({ style: { width: "200px", fontSize: "16px" } }),
        setCellHeaderProps: () => ({ style: { fontSize: "18px", fontWeight: "bold" } }),
      },
    },
    {
      name: "improvementAreas",
      label: "Improvement Areas",
      options: {
        filter: false,
        sort: false,
        setCellProps: () => ({ style: { width: "250px", fontSize: "16px" } }),
        setCellHeaderProps: () => ({ style: { fontSize: "18px", fontWeight: "bold" } }),
        customBodyRender: (value) => (
          <div style={{ wordBreak: "break-word" }}>{value?.join(", ")}</div>
        ),
      },
    },
    {
      name: "details",
      label: "Details",
      options: {
        filter: false,
        sort: false,
        setCellProps: () => ({ style: { width: "400px", fontSize: "16px" } }),
        setCellHeaderProps: () => ({ style: { fontSize: "18px", fontWeight: "bold" } }),
        customBodyRender: (value) => (
          <div style={{ maxHeight: "100px", overflowY: "auto", wordBreak: "break-word" }}>
            {value}
          </div>
        ),
      },
    },
  ];

  const options = {
    filter: false,
    filterType: "dropdown",
    responsive: "standard",
    rowsPerPage: 15,
    rowsPerPageOptions: [15, 25, 50],
    selectableRows: "none", // Removes checkboxes
    downloadOptions: {
      filename: "Feedback.csv",
      filterOptions: {
        useDisplayedColumnsOnly: true,
        useDisplayedRowsOnly: true,
      },
    },
  };

  return (
    <Box>
      <Typography variant="h3" sx={{ marginLeft: 3, marginTop: 5, fontWeight: "bold" }}>
        User Feedback
      </Typography>
      <Box sx={{ marginTop: 2, padding: 2 }}>
        <MUIDataTable
          data={feedbackList}
          columns={columns}
          options={options}
          className="custom-table"
        />
      </Box>
    </Box>
  );
};

export default FeedbackShow;
