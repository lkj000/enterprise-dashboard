import React from "react";
import { Box, Link } from "@mui/material";
import MUIDataTable from "mui-datatables";
import { formatDate, LastUpdatedOnComponent } from "../../../utils";
import { projectOptions, init_lastrun } from "../requests";
import "../../global/custom-table.css";

const ProductTable = ({
  input,
  projKey,
  port,
  selectVP,
  selectDirector,
  selectManager,
  colors,
}) => {
  const columns = [
    {
      name: "key",
      label: "Key",
      options: {
        filter: true,
        filterType: "dropdown",
        filterOptions: {
          names: projectOptions,
          logic(keyValue, filters) {
            if (filters.length === 0) return false;
            return !filters.some((filter) => keyValue.startsWith(filter + "-"));
          },
        },
        filterList: projKey === "All" || !projKey ? [] : [projKey],
        customFilterListOptions: { render: (v) => `Project Key: ${v}` },
        customBodyRender: (value) => (
          <Link
            underline="hover"
            target="_blank"
            rel="noopener noreferrer"
            href={`https://jira.safeway.com/browse/${value}`}
          >
            {value}
          </Link>
        ),
        sort: true,
      },
    },
    {
      name: "portfolio",
      label: "Portfolio",
      options: {
        filter: true,
        filterType: "dropdown",
        filterList: port === "All" || !port ? [] : [port],
        customFilterListOptions: { render: (v) => `Portfolio: ${v}` },
      },
    },
    {
      name: "vp",
      label: "Department",
      options: {
        filter: true,
        filterType: "dropdown",
        filterList: selectVP === "All" || !selectVP ? [] : [selectVP],
        customFilterListOptions: { render: (v) => `Department: ${v}` },
      },
    },
    {
      name: "director",
      label: "Team",
      options: {
        filter: true,
        filterType: "dropdown",
        filterList:
          selectDirector === "All" || !selectDirector ? [] : [selectDirector],
        customFilterListOptions: { render: (v) => `Team: ${v}` },
      },
    },
    {
      name: "manager",
      label: "Line Manager",
      options: {
        filter: true,
        filterType: "dropdown",
        filterList:
          selectManager === "All" || !selectManager ? [] : [selectManager],
        customFilterListOptions: { render: (v) => `Line Manager: ${v}` },
      },
    },
    {
      name: "title",
      label: "Title",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "status",
      label: "Status",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "points",
      label: "Story Points",
      options: {
        customBodyRender: (value) => {
          return value !== 0 && value !== null ? value : 1;
        },
        filter: true,
        sort: true,
      },
    },
    {
      name: "createdDate",
      label: "Created Date",
      options: {
        filter: true,
        customBodyRender: (value) => {
          if (value === null) {
            return null;
          }
          return <div>{formatDate(value)}</div>;
        },
        sort: true,
      },
    },
    {
      name: "mpo_id",
      label: "MPO ID",
      options: {
        filter: true,
        sort: true,
        customFilterListOptions: { render: (v) => `MPO ID: ${v}` },
      },
    },
    {
      name: "assignee",
      label: "Assignee",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "reporter",
      label: "Reporter",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "resolutiondate",
      label: "Resolution Date",
      options: {
        customBodyRender: (value) => {
          if (value === null) {
            return null;
          }
          return <div>{formatDate(value)}</div>;
        },
        filter: true,
        sort: true,
      },
    },
  ];

  const options = {
    fixedHeader: true,
    filter: true,
    responsive: "vertical",
    tableBodyHeight: "auto",
    rowsPerPage: 15,
    rowsPerPageOptions: [15, 25, 50, 100],
    sort: true,
    sortOrder: {
      name: "key",
      direction: "desc",
    },
    downloadOptions: {
      filename: "Product Initiatives.csv",
      filterOptions: {
        useDisplayedColumnsOnly: true,
        useDisplayedRowsOnly: true,
      },
    },
  };

  return (
    <Box>
      <Box
        className="table"
        style={{
          width: "100%",
          height: "auto",
        }}
      >
        <MUIDataTable
          title={
            <span className="custom-table-title">Product Initiatives</span>
          }
          data={input}
          columns={columns}
          options={options}
          className="custom-table"
          components={{
            TableFilterList: (props) =>
              init_lastrun && (
                <LastUpdatedOnComponent props={props} date={init_lastrun} />
              ),
          }}
        />
      </Box>
    </Box>
  );
};

export default ProductTable;
