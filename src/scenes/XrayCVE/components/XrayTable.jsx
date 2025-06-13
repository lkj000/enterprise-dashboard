import { React } from 'react';
import { Link as RouterLink } from "react-router-dom";
import { Box, Link } from '@mui/material';
import MUIDataTable from "mui-datatables";
import "../../global/custom-table.css";


const XrayTable = ({ input, port, selectVP, director, owner, selectAppcode, showCol }) => {


  const columns = [
    {
      name: "AppName",
      label: "App Name",
      options: {
        filterType: "textField",
        customBodyRender: (value) => (
          <Link underline="hover" target="_blank" rel="noopener noreferrer" href={`https://github.albertsons.com/albertsons/${value}`}> {value} </Link>
        ),
        customFilterListOptions: { render: (v) => `App Name: ${v}` },
        setCellProps: () => ({  style: { whiteSpace: "nowrap", verticalAlign: "top" } }),
        setCellHeaderProps: () => ({ style: { whiteSpace: "nowrap" } })
      }
    },
    {
      name: "Portfolio",
      label: "Portfolio",
      options: {
        filterType: "dropdown",
        filterList: port === 'All' || !port ? [] : [port],
        customFilterListOptions: { render: (v) => `Portfolio: ${v}` },
        setCellProps: () => ({ style: { whiteSpace: "nowrap", verticalAlign: "top" }}),
        setCellHeaderProps: () => ({ style: { whiteSpace: "nowrap" } })
      }
    },
    {
      name: "VP",
      label: "Department",
      options: {
        filterType: "dropdown",
        filterList: selectVP === 'All' || !selectVP ? [] : [selectVP],
        customFilterListOptions: { render: (v) => `Department: ${v}` },
        setCellProps: () => ({ style: { whiteSpace: "nowrap", verticalAlign: "top" } }),
        setCellHeaderProps: () => ({ style: { whiteSpace: "nowrap" } })
      }
    },
    {
      name: "Director",
      label: "Team",
      options: {
        filterType: "dropdown",
        filterList: director === 'All' || !director ? [] : [director],
        customFilterListOptions: { render: (v) => `Team: ${v}` },
        setCellProps: () => ({ style: { whiteSpace: "nowrap", verticalAlign: "top" } }),
        setCellHeaderProps: () => ({ style: { whiteSpace: "nowrap" } })
      }
    },
    {
      name: "AppOwner",
      label: "App Owner",
      options: {
        filterType: "dropdown",
        filterList: owner === 'All' || !owner ? [] : [owner],
        customFilterListOptions: { render: (v) => `App Owner: ${v}` },
        setCellProps: () => ({ style: { whiteSpace: "nowrap", verticalAlign: "top" } }),
        setCellHeaderProps: () => ({ style: { whiteSpace: "nowrap" } })
      }
    },
    {
      name: "AppCode",
      label: "App Code",
      options: {
        filterType: "dropdown",
        filterList: selectAppcode === 'All' || !selectAppcode ? [] : [selectAppcode],
        customFilterListOptions: { render: (v) => `App Code: ${v}` },
        setCellProps: () => ({ style: { whiteSpace: "nowrap", verticalAlign: "top" } }),
        setCellHeaderProps: () => ({ style: { whiteSpace: "nowrap" } })
      }
    },
    {
      name: "Critical",
      label: "Critical",
      options: {
        filterType: "dropdown",
        setCellProps: () => ({ style: { whiteSpace: "nowrap", verticalAlign: "top" } }),
        setCellHeaderProps: () => ({ style: { whiteSpace: "nowrap" } })
      }
    },
    {
      name: "High",
      label: "High",
      options: {
        filterType: "dropdown",
        setCellProps: () => ({ style: { whiteSpace: "nowrap", verticalAlign: "top" } }),
        setCellHeaderProps: () => ({ style: { whiteSpace: "nowrap" } })
      }
    },
    {
      name: "Medium",
      label: "Medium",
      options: {
        filterType: "dropdown",
        setCellProps: () => ({ style: { whiteSpace: "nowrap", verticalAlign: "top" } }),
        setCellHeaderProps: () => ({ style: { whiteSpace: "nowrap" } })
      }
    },
    {
      name: "Low",
      label: "Low",
      options: {
        filterType: "dropdown",
        setCellProps: () => ({ style: { whiteSpace: "nowrap", verticalAlign: "top" } }),
        setCellHeaderProps: () => ({ style: { whiteSpace: "nowrap" } })
      }
    },
    {
      name: "Artifact Repository",
      label: "Artifact Repository",
      options: {
        filterType: "textField",
        setCellProps: () => ({ style: { whiteSpace: "nowrap", verticalAlign: "top" } }),
        setCellHeaderProps: () => ({ style: { whiteSpace: "nowrap" } })
      }
    },
    {
      name: "Artifact",
      label: "Artifact",
      options: {
        filterType: "textField",
        setCellProps: () => ({ style: { whiteSpace: "nowrap", verticalAlign: "top" } }),
        setCellHeaderProps: () => ({ style: { whiteSpace: "nowrap" } })
      }
    },
    {
      name: "cve",
      label: "CVE ID",
      options: {
        filter: showCol,
        viewColumns: showCol,
        display: showCol,
        filterType: "textField",
        customFilterListOptions: { render: (v) => `CVE ID: ${v}` },
        customBodyRender: (value) => {
          if (value === null) {
            return null;
          }
          const parts = value.split(",").map((item, index) => (
            <div key={index}>
              <Link underline="hover" component={RouterLink} to={`/XrayCVESummary?cve=${item.replace(/ /g, "")}`}>
                {item.replace(/ /g, "")}
              </Link>
            </div>));
            return <div>{parts}</div>;
        },
        setCellProps: () => ({ style: { whiteSpace: "nowrap", verticalAlign: "top" } }),
        setCellHeaderProps: () => ({ style: { whiteSpace: "nowrap" } })
      }
    },
    {
      name: "severity",
      label: "Severity",
      options: {
        filter: showCol,
        viewColumns: showCol,
        display: showCol,
        filterType: "textField",
        customFilterListOptions: { render: (v) => `Severity: ${v}` },
        customBodyRender: (value) => {
          if (value === null) {
            return null;
          };
          const parts = value.split(",").map((item, index) => <div key={index}>{item}</div>);
          return <div>{parts}</div>;
        },
        setCellProps: () => ({ style: { whiteSpace: "nowrap", verticalAlign: "top" } }),
        setCellHeaderProps: () => ({ style: { whiteSpace: "nowrap" } })
      }
    }
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
      filename: "Xray Vulnerabilities.csv",
      filterOptions: {
        useDisplayedColumnsOnly: true,
        useDisplayedRowsOnly: true
      }
    }
  }; 
    

   
  return (
    <Box className="table" style={{
      width: "100%",
      height: "auto",
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

export default XrayTable;