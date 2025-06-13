import { Box, Link } from "@mui/material";
import MUIDataTable from "mui-datatables";
import { LastUpdatedOnComponent } from "../../../utils";
import "../../global/custom-table.css";

const Table = ({ input, lastRun, filter }) => {
  const columns = [
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
      name: "Repository",
      label: "Repository",
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
        customFilterListOptions: { render: (v) => `Repository: ${v}` },
        setCellProps: () => ({
          style: { whiteSpace: "nowrap", verticalAlign: "top" },
        }),
        setCellHeaderProps: () => ({ style: { whiteSpace: "nowrap" } }),
      },
    },
    {
      name: "Files",
      label: "Files",
      options: {
        filterType: "textField",
        customFilterListOptions: { render: (v) => `Files: ${v}` },
        customBodyRender: (value) => {
          if (value === null) {
            return null;
          }
          const parts = value.map((item, index) => (
            <div key={index}>{item.replace(/ /g, "")}</div>
          ));
          return <div>{parts}</div>;
        },
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
    responsive: "vertical",
    tableBodyHeight: "auto",
    rowsPerPage: 15,
    rowsPerPageOptions: [15, 25, 50, 100],
    sort: true,
    downloadOptions: {
      filename: "Secrets Repositories.csv",
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
        components={{
          TableFilterList: (props) => (
            lastRun && <LastUpdatedOnComponent props={props} date={lastRun}/>
          )
        }}
      />
    </Box>
  );
};

export default Table;
