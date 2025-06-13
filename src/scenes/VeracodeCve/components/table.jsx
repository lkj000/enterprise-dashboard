import { Box, Link } from "@mui/material";
import MUIDataTable from "mui-datatables";
import { Link as RouterLink } from 'react-router-dom';
import '../../global/custom-table.css';

const Table = ({ input, filter }) => {
  let columns = [
    {
      name: "AppName",
      label: "App Name",
      options: {
        filter: true,
        customBodyRender: (value) => (
          <Link underline="hover" target="_blank" rel="noopener noreferrer" href={`https://github.albertsons.com/albertsons/${value}`}>{value}</Link>
        ),
        filterType: 'textField',
        customFilterListOptions: { render: v => `App Name: ${v}` },
        setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top' } }),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' } })
      }
    },
    {
      name: "portfolio",
      label: "Portfolio",
      options: {
        filterType: 'textField',
        filterList: filter.portfolio !== "all" ? [filter.portfolio] : [],
        customFilterListOptions: { render: v => `Portfolio: ${v}` },
        setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top' } }),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' } })
      }
    },
    {
      name: "vp",
      label: "Department",
      options: {
        filterType: 'textField',
        filterList: filter.vp !== "all" ? [filter.vp] : [],
        customFilterListOptions: { render: v => `Department: ${v}` },
        setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top' } }),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' } })
      }
    },
    {
      name: "director",
      label: "Team",
      options: {
        filterType: 'textField',
        filterList: filter.director !== "all" ? [filter.director] : [],
        customFilterListOptions: { render: v => `Team: ${v}` },
        setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top' } }),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' } })
      }
    },
    {
      name: "owner",
      label: "App Owner",
      options: {
        filterType: 'textField',
        filterList: filter.owner !== "all" ? [filter.owner] : [],
        customFilterListOptions: { render: v => `App Owner: ${v}` },
        setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top' } }),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' } })
      }
    },
    {
      name: "Jira_URL",
      label: "Jira Story",
      options: {
        filterType: 'textField',
        customBodyRender: (value) => {
          if (!value || value === "Not Applicable") {
            return value;
          }
          return (
            <Link underline="hover" target="_blank" rel="noopener noreferrer" href={`https://jira.safeway.com/browse/${value}`}>{value}</Link>
        )},
        customFilterListOptions: { render: v => `Jira Story: ${v}` },
        setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top' } }),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' } })
      }
    },
    {
      name: "criticality",
      label: "Business Criticality",
      options: {
        filterType: 'dropdown',
        filterList: filter.criticality !== "all" ? [filter.criticality] : [],
        customFilterListOptions: { render: v => `Business Criticality: ${v}` },
        setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top' } }),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' } })
      }
    },
    {
      name: "exploitObserve",
      label: "Exploit Observed",
      options: {
        filterType: 'dropdown',
        filterList: filter.exploitObserve !== "all" ? [filter.exploitObserve] : [],
        customFilterListOptions: { render: v => `Exploit Observed: ${v}` },
        setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top' } }),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' } })
      }
    },
    {
      name: "veryHigh",
      label: "Very High",
      options: {
        filterType: 'textField',
        setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top' } }),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' } })
      }
    },
    {
      name: "high",
      label: "High",
      options: {
        filterType: 'textField',
        setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top' } }),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' } })
      }
    },
    {
      name: "medium",
      label: "Medium",
      options: {
        filterType: 'textField',
        setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top' } }),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' } })
      }
    },
    {
      name: "low",
      label: "Low",
      options: {
        filterType: 'textField',
        setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top' } }),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' } })
      }
    },
    {
      name: "veryLow",
      label: "Very Low",
      options: {
        filterType: 'textField',
        setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top' } }),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' } })
      }
    },
    {
      name: "cve",
      label: "CVE ID",
      options: {
        filter: filter.withDetails,
        filterType: 'textField',
        customFilterListOptions: { render: v => `CVE ID: ${v}` },
        customBodyRender: (value) => {
          if (value === null) {
            return null;
          }
          const parts = value.split(',').map((item, index) => (
            <div key={index}>
              <Link underline="hover" component={RouterLink} to={`/VeracodeCVESummary?cve=${item.replace(/ /g, "")}`}>{item.replace(/ /g, "")}</Link>
            </div>
          ))
          return <div>{parts}</div>;
        },
        setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top' } }),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' } }),
        viewColumns: filter.withDetails,
        display: filter.withDetails
      }
    },
    {
      name: "severity",
      label: "Severity",
      options: {
        filter: filter.withDetails,
        filterType: 'dropdown',
        filterList: filter.severityType !== "all" ? [filter.severityType] : [],
        filterOptions: {
          names: ['Very High', 'High', 'Medium', 'Low', 'Very Low'],
          logic(value, filters) {
            const valueArray = value.split(',').map(s => s.trim());
            const filterData =
              (filters.indexOf('Very High') >= 0 && valueArray.indexOf('Very High') >= 0 ) ||
              (filters.indexOf('High') >= 0 && valueArray.indexOf('High') >= 0 ) ||
              (filters.indexOf('Medium') >= 0 && valueArray.indexOf('Medium') >= 0 ) ||
              (filters.indexOf('Low') >= 0 && valueArray.indexOf('Low') >= 0 ) ||
              (filters.indexOf('Very Low') >= 0 && valueArray.indexOf('Very Low') >= 0 );
            return !filterData;
          }
        },
        customBodyRender: (value) => {
          if (value === null) {
            return null;
          }
          const parts = value.split(',').map((item, index) => (
            <div key={index}>{item}</div>
          ))
          return <div>{parts}</div>;
        },
        customFilterListOptions: { render: v => `Severity: ${v}` },
        setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top' } }),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' } }),
        viewColumns: filter.withDetails,
        display: filter.withDetails
      }
    }
  ];


  const options = {
    fixedHeader: true,
    filter: true,
    responsive: 'vertical',
    tableBodyHeight: 'auto',
    rowsPerPage: 15,
    rowsPerPageOptions: [15, 25, 50, 100],
    sort: true,
    downloadOptions: {
      filename: "veracode.csv",
      filterOptions: {
        useDisplayedColumnsOnly: true,
        useDisplayedRowsOnly: true,
      }
    }

  };

  return (
    <Box className="table" style={{
      width: '100%',
      height: 'auto'
    }}>
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