import { Box, Link } from "@mui/material";
import MUIDataTable from "mui-datatables";
import { Link as RouterLink } from "react-router-dom";
import "../../global/custom-table.css";

const Table = ({ input, filter }) => {
  const columns = [
    {
      name: "AppName",
      label: "App Name",
      options: {
        filter: true,
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
        filterType: "textField",
        customFilterListOptions: { render: (v) => `App Name: ${v}` },
        setCellProps: () => ({
          style: { whiteSpace: "nowrap", verticalAlign: "top" },
        }),
        setCellHeaderProps: () => ({ style: { whiteSpace: "nowrap" } }),
      },
    },
    {
      name: "portfolio",
      label: "Portfolio",
      options: {
        filterType: "textField",
        filterList: filter.portfolio !== "all" ? [filter.portfolio] : [],
        customFilterListOptions: { render: (v) => `Portfolio: ${v}` },
        setCellProps: () => ({
          style: { whiteSpace: "nowrap", verticalAlign: "top" },
        }),
        setCellHeaderProps: () => ({ style: { whiteSpace: "nowrap" } }),
      },
    },
    {
      name: "Department",
      label: "Department",
      options: {
        filterType: "textField",
        filterList: filter.vp !== "all" ? [filter.vp] : [],
        customFilterListOptions: { render: (v) => `Department: ${v}` },
        setCellProps: () => ({
          style: { whiteSpace: "nowrap", verticalAlign: "top" },
        }),
        setCellHeaderProps: () => ({ style: { whiteSpace: "nowrap" } }),
      },
    },
    {
      name: "Team",
      label: "Team",
      options: {
        filterType: "textField",
        filterList: filter.director !== "all" ? [filter.director] : [],
        customFilterListOptions: { render: (v) => `Team: ${v}` },
        setCellProps: () => ({
          style: { whiteSpace: "nowrap", verticalAlign: "top" },
        }),
        setCellHeaderProps: () => ({ style: { whiteSpace: "nowrap" } }),
      },
    },
    {
      name: "AppOwner",
      label: "App Owner",
      options: {
        filterType: "textField",
        filterList: filter.owner !== "all" ? [filter.owner] : [],
        customFilterListOptions: { render: (v) => `App Owner: ${v}` },
        setCellProps: () => ({
          style: { whiteSpace: "nowrap", verticalAlign: "top" },
        }),
        setCellHeaderProps: () => ({ style: { whiteSpace: "nowrap" } }),
      },
    },
    {
      name: "AppCode",
      label: "App Code",
      options: {
        filterType: "textField",
        filterList: filter.AppCode !== "all" ? [filter.AppCode] : [],
        customFilterListOptions: { render: (v) => `App Code: ${v}` },
        setCellProps: () => ({
          style: { whiteSpace: "nowrap", verticalAlign: "top" },
        }),
        setCellHeaderProps: () => ({ style: { whiteSpace: "nowrap" } }),
      },
    },
    {
      name: "Tag",
      label: "Tag",
      options: {
        filterType: "textField",
        setCellProps: () => ({
          style: { whiteSpace: "nowrap", verticalAlign: "top" },
        }),
        setCellHeaderProps: () => ({ style: { whiteSpace: "nowrap" } }),
      },
    },
    {
      name: "FirstScanDate",
      label: "Initial Scan Date",
      options: {
        filterType: "textField",
        setCellProps: () => ({
          style: { whiteSpace: "nowrap", verticalAlign: "top" },
        }),
        setCellHeaderProps: () => ({ style: { whiteSpace: "nowrap" } }),
      },
    },
    {
      name: "critical",
      label: "Critical",
      options: {
        filterType: "textField",
        setCellProps: () => ({
          style: { whiteSpace: "nowrap", verticalAlign: "top" },
        }),
        setCellHeaderProps: () => ({ style: { whiteSpace: "nowrap" } }),
      },
    },
    {
      name: "high",
      label: "High",
      options: {
        filterType: "textField",
        setCellProps: () => ({
          style: { whiteSpace: "nowrap", verticalAlign: "top" },
        }),
        setCellHeaderProps: () => ({ style: { whiteSpace: "nowrap" } }),
      },
    },
    {
      name: "medium",
      label: "Medium",
      options: {
        filterType: "textField",
        setCellProps: () => ({
          style: { whiteSpace: "nowrap", verticalAlign: "top" },
        }),
        setCellHeaderProps: () => ({ style: { whiteSpace: "nowrap" } }),
      },
    },
    {
      name: "low",
      label: "Low",
      options: {
        filterType: "textField",
        setCellProps: () => ({
          style: { whiteSpace: "nowrap", verticalAlign: "top" },
        }),
        setCellHeaderProps: () => ({ style: { whiteSpace: "nowrap" } }),
      },
    }
  ];
  if (filter.withDetails) {
    columns.push(
      {
        name: "cve",
        label: "CVE ID",
        options: {
          filterType: "textField",
          customFilterListOptions: { render: (v) => `CVE ID: ${v}` },
          customBodyRender: (value) => {
            if (value === null) {
              return null;
            }
            const parts = value.split(",").map((item, index) => (
              <div key={index}>
                <Link
                  underline="hover"
                  component={RouterLink}
                  to={`/PrismaCVESummary?cve=${item.replace(/ /g, "")}`}
                >
                  {item.replace(/ /g, "")}
                </Link>
              </div>
            ));
            return <div>{parts}</div>;
          },
          setCellProps: () => ({
            style: { whiteSpace: "nowrap", verticalAlign: "top" },
          }),
          setCellHeaderProps: () => ({ style: { whiteSpace: "nowrap" } }),
        },
      },
      {
        name: "severity",
        label: "Severity",
        options: {
          customFilterListOptions: { render: (v) => `Severity: ${v}` },
          filterType: "textField",
          customBodyRender: (value) => {
            if (value === null) {
              return null;
            }
            const parts = value
              .split(",")
              .map((item, index) => <div key={index}>{item}</div>);
            return <div>{parts}</div>;
          },
          setCellProps: () => ({
            style: { whiteSpace: "nowrap", verticalAlign: "top" },
          }),
          setCellHeaderProps: () => ({ style: { whiteSpace: "nowrap" } }),
        },
      }
    );
  }

  const options = {
    fixedHeader: true,
    filter: true,
    responsive: "vertical",
    tableBodyHeight: "auto",
    rowsPerPage: 15,
    rowsPerPageOptions: [15, 25, 50, 100],
    sort: true,
    downloadOptions: {
      filename: "Container Vulnerabilities (Prisma).csv",
      filterOptions: {
        useDisplayedColumnsOnly: true,
        useDisplayedRowsOnly: true,
      },
    },
  };

  return (
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
      />
    </Box>
  );
};

export default Table;
