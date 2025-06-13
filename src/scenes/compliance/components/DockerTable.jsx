import { React } from "react";
import { Box, Link, Typography } from "@mui/material";
import MUIDataTable from "mui-datatables";
import { dockerData as input, lastRun } from "../requests";
import { LastUpdatedOnComponent } from "../../../utils";
import "../../global/custom-table.css";

const DockerTable = ({ colors }) => {
  const columns = [
    {
      name: "index",
      label: "S.No",
      options: {
        filter: false,
      },
    },
    {
      name: "name",
      label: "Repository Name",
      options: {
        filter: true,
        filterType: "textField",
        customBodyRender: (value) => (
          <Link
            underline="hover"
            target="_blank"
            rel="noopener noreferrer"
            href={`https://github.albertsons.com/albertsons/${value}`}
          >
            {value}
          </Link>
        ),
        customFilterListOptions: { render: (v) => `Repository Name: ${v}` },
        setCellProps: () => ({
          style: { whiteSpace: "nowrap", verticalAlign: "top" },
        }),
        setCellHeaderProps: () => ({ style: { whiteSpace: "nowrap" } }),
      },
    },
    {
      name: "fileName",
      label: "Workflow File",
      options: {
        filterType: "textField",
        customFilterListOptions: { render: (v) => `Workflow File: ${v}` },
        setCellProps: () => ({
          style: { whiteSpace: "nowrap", verticalAlign: "top" },
        }),
        setCellHeaderProps: () => ({ style: { whiteSpace: "nowrap" } }),
      },
    },
  ];

  const options = {
    fixedHeader: true,
    filter: true,
    sort: true,
    responsive: "vertical",
    tableBodyHeight: "auto",
    rowsPerPage: 15,
    rowsPerPageOptions: [15, 25, 50, 100],
    downloadOptions: {
      filename: "Docker.csv",
      filterOptions: {
        useDisplayedColumnsOnly: true,
        useDisplayedRowsOnly: true,
      },
    },
  };

  return (
    <Box>
      <Box display="flex" mb="25px">
        <Typography variant="h5" color={colors.tertiary[400]}>
          These Repositories are downloading package from internet during build
          time or not using authorized Albertsons Base Images
        </Typography>
      </Box>

      <Box
        className="table"
        style={{
          width: "100%",
          height: "auto",
        }}
      >
        <MUIDataTable
          data={input}
          columns={columns}
          options={options}
          className="custom-table"
          components={{
            TableFilterList: (props) => (
              lastRun && <LastUpdatedOnComponent props={props} date={lastRun}/>
            )
          }}
        />
      </Box>
    </Box>
  );
};

export default DockerTable;