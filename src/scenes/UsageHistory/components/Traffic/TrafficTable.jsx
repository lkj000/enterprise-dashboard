import { React } from "react";
import { Box } from "@mui/material";
import MUIDataTable from "mui-datatables";
import '../../../global/custom-table.css';


const TrafficTable = ({ input, path }) => {


  const columns = [
    {
      name: "Timestamp",
      label: "Timestamp",
      options: {
        filterType: 'textField',
        customFilterListOptions: { render: (v) => `Timestamp: ${v}` },
        sortCompare: (order) => (a,b) => {
          if (!a.data) return 1;
          if (!b.data) return -1;
          const dateA = new Date(a.data);
          const dateB = new Date(b.data);

          if (order === "desc") {
              return dateB-dateA;
          }
          return dateA-dateB;
        },
        setCellProps: () => ({ style: { whiteSpace: "nowrap", verticalAlign: "top" } }),
        setCellHeaderProps: () => ({ style: { whiteSpace: "nowrap" } })
      }
    },
    {
      name: "IPAddress",
      label: "IP Address",
      options: {
        filterType: 'textField',
        customFilterListOptions: { render: (v) => `IP Address: ${v}` },
        setCellProps: () => ({ style: { whiteSpace: "nowrap", verticalAlign: "top" } }),
        setCellHeaderProps: () => ({ style: { whiteSpace: "nowrap" } })
      }
    },
    {
      name: "Path",
      label: "Path",
      options: {
        filterType: 'dropdown',
        filterList: path === 'All' || !path ? [] : [path],
        customFilterListOptions: { render: (v) => `Path: ${v}` },
        setCellProps: () => ({ style: { whiteSpace: "nowrap", verticalAlign: "top" } }),
        setCellHeaderProps: () => ({ style: { whiteSpace: "nowrap" } })
      }
    },
    {
      name: "UserID",
      label: "User ID",
      options: {
        filterType: 'textField',
        customFilterListOptions: { render: (v) => `User ID: ${v}` },
        setCellProps: () => ({ style: { whiteSpace: "nowrap", verticalAlign: "top" } }),
        setCellHeaderProps: () => ({ style: { whiteSpace: "nowrap" } })
      }   
    }
  ];


  const options = {
    fixedHeader: true,
    filter: true,
    sort: true,
    responsive: 'vertical',
    tableBodyHeight: 'auto',
    rowsPerPage: 15,
    rowsPerPageOptions: [15,25,50,100],
    downloadOptions: {
      filename: "Usage History.csv",
      filterOptions: {
        useDisplayedColumnsOnly: true,
        useDisplayedRowsOnly: true,
      }
    }
  };


  return (
    <>
    {input.length > 0 && (
      <Box className="table" style={{
        width: '100%', 
        height: 'auto',
        marginTop: '20px'
      }}>
        <MUIDataTable
          data={[...input].reverse()}
          columns={columns}
          options={options}
          className="custom-table"
        />
      </Box>)}
    </>
  );
};

export default TrafficTable;