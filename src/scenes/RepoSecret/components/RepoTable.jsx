import { Box, Link } from "@mui/material";
import MUIDataTable from "mui-datatables";
import { TableData, lastRun } from "../requests";
import { formatDate, LastUpdatedOnComponent } from "../../../utils";
import "../../global/custom-table.css";

const RepoTable = ({ port, vp, dept, appOwner, appCode }) => {
  const columns = [
    {
      name: "index",
      label: "S.No",
      options: {
        filter: false,
        setCellProps: () => ({
          style: { whiteSpace: "nowrap", verticalAlign: "top" },
        }),
        setCellHeaderProps: () => ({ style: { whiteSpace: "nowrap" } }),
      },
    },
    {
      name: "Portfolio",
      label: "Portfolio",
      options: {
        filterType: "dropdown",
        filterList: port === "All" || !port ? [] : [port],
        customFilterListOptions: { render: (v) => `Portfolio: ${v}` },
        setCellProps: () => ({
          style: {
            whiteSpace: "nowrap",
            verticalAlign: "top",
            textAlign: "left",
          },
        }),
        setCellHeaderProps: () => ({ style: { whiteSpace: "nowrap" } }),
      },
    },
    {
      name: "Department",
      label: "Department",
      options: {
        filterType: "dropdown",
        filterList: vp === "All" || !vp ? [] : [vp],
        customFilterListOptions: { render: (v) => `Department: ${v}` },
        setCellProps: () => ({
          style: {
            whiteSpace: "nowrap",
            verticalAlign: "top",
            textAlign: "left",
          },
        }),
        setCellHeaderProps: () => ({ style: { whiteSpace: "nowrap" } }),
      },
    },
    {
      name: "Team",
      label: "Team",
      options: {
        filterType: "dropdown",
        filterList: dept === "All" || !dept ? [] : [dept],
        customFilterListOptions: { render: (v) => `Team: ${v}` },
        setCellProps: () => ({
          style: {
            whiteSpace: "nowrap",
            verticalAlign: "top",
            textAlign: "left",
          },
        }),
        setCellHeaderProps: () => ({ style: { whiteSpace: "nowrap" } }),
      },
    },
    {
      name: "AppCode",
      label: "App Code",
      options: {
        filterType: "dropdown",
        filterList: appCode === "All" || !appCode ? [] : [appCode],
        customBodyRender: (value) => {
          if (value.toLowerCase() === "platform") {
            return value;
          }
          return (
            <Link
              underline="hover"
              target="_blank"
              rel="noopener noreferrer"
              href={`https://safeway.service-now.com/cii?searchin=applications&search=${value}`}
            >
              {value}
            </Link>
          );
        },
        customFilterListOptions: { render: (v) => `AppCode: ${v}` },
        setCellProps: () => ({
          style: {
            whiteSpace: "nowrap",
            verticalAlign: "top",
            textAlign: "left",
          },
        }),
        setCellHeaderProps: () => ({ style: { whiteSpace: "nowrap" } }),
      },
    },
    {
      name: "AppOwner",
      label: "App Owner",
      options: {
        filterType: "dropdown",
        filterList: appOwner === "All" || !appOwner ? [] : [appOwner],
        customFilterListOptions: { render: (v) => `AppOwner: ${v}` },
        setCellProps: () => ({
          style: {
            whiteSpace: "nowrap",
            verticalAlign: "top",
            textAlign: "left",
          },
        }),
        setCellHeaderProps: () => ({ style: { whiteSpace: "nowrap" } }),
      },
    },
    {
      name: "repository",
      label: "Repository URL",
      options: {
        filter: true,
        filterType: "textField",
        customBodyRender: (value) => (
          <Link
            underline="hover"
            target="_blank"
            rel="noopener noreferrer"
            href={`${value}`}
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
      name: "link",
      label: "File",
      options: {
        filter: true,
        customBodyRender: (value) => (
          <Link
            underline="hover"
            target="_blank"
            rel="noopener noreferrer"
            href={`${value}`}
          >
            {value}
          </Link>
        ),
      },
    },
    {
      name: "line_number",
      label: "Line",
      options: {
        filter: true,
        setCellProps: () => ({
          style: { whiteSpace: "nowrap", verticalAlign: "top" },
        }),
        setCellHeaderProps: () => ({ style: { whiteSpace: "nowrap" } }),
      },
    },
    {
      name: "credential_type",
      label: "Credential Type",
      options: {
        filter: true,
        filterType: "textField",
        customFilterListOptions: { render: (v) => `Credential Type: ${v}` },
        setCellProps: () => ({
          style: { whiteSpace: "nowrap", verticalAlign: "top" },
        }),
        setCellHeaderProps: () => ({ style: { whiteSpace: "nowrap" } }),
      },
    },
    {
      name: "committer",
      label: "Committer",
      options: {
        filter: true,
        filterType: "textField",
        customFilterListOptions: { render: (v) => `Committer: ${v}` },
        setCellProps: () => ({
          style: { whiteSpace: "nowrap", verticalAlign: "top" },
        }),
        setCellHeaderProps: () => ({ style: { whiteSpace: "nowrap" } }),
      },
    },
    {
      name: "committed_on",
      label: "Committed On",
      options: {
        filter: true,
        filterType: "textField",
        customBodyRender: (value) => {
          if (value === null) {
            return null;
          }
          return <div>{formatDate(value)}</div>;
        },
        customFilterListOptions: { render: (v) => `Committed On: ${v}` },
        setCellProps: () => ({
          style: { whiteSpace: "nowrap", verticalAlign: "top" },
        }),
        setCellHeaderProps: () => ({ style: { whiteSpace: "nowrap" } }),
      },
    },
    {
      name: "detected_on",
      label: "Detected On",
      options: {
        filter: true,
        filterType: "textField",
        customBodyRender: (value) => {
          if (value === null) {
            return null;
          }
          return <div>{formatDate(value)}</div>;
        },
        customFilterListOptions: { render: (v) => `Detected On: ${v}` },
        setCellProps: () => ({
          style: { whiteSpace: "nowrap", verticalAlign: "top" },
        }),
        setCellHeaderProps: () => ({ style: { whiteSpace: "nowrap" } }),
      },
    },
    {
      name: "number_of_days_since_detection",
      label: "Number of Days Since Detection",
      options: {
        filter: true,
        filterType: "textField",
        customFilterListOptions: {
          render: (v) => `Number of Days Since Detection: ${v}`,
        },
        setCellProps: () => ({
          style: {
            whiteSpace: "normal",
            verticalAlign: "top",
            maxwidth: "10px",
          },
        }),
        setCellHeaderProps: () => ({
          style: { whiteSpace: "normal", maxwidth: "10px" },
        }),
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
      filename: "Repository With Secrets.csv",
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
        data={TableData}
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
  );
};

export default RepoTable;
