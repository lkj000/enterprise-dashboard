import { React } from "react";
import { Box, Link } from "@mui/material";
import MUIDataTable from "mui-datatables";
import '../../../global/custom-table.css';


const HistTable = ({ input }) => {


  const columns = [
    { 
      name: "sNo",
      label: "S.No",
      options: {
        filter: false
      }
    },
    {
      name: "repository_name",
      label: "Repository Name",
      options: {
        filterType: 'dropdown',
        customBodyRender: (value) => (
          <Link underline="hover" target="_blank" rel="noopener noreferrer" href={`https://github.albertsons.com/albertsons/${value}`}>{value}</Link>
        ),
        customFilterListOptions: { render: v =>  `Repository Name: ${v}` },
        setCellProps: () => ({ style: { whiteSpace:'nowrap', verticalAlign: 'top' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace:'nowrap' }})
      }
    },
    {
      name: "tag",
      label: "Image Tag",
      options: {
        filterType: 'textField',
        customFilterListOptions: { render: v =>  `Image Tag: ${v}` },
        setCellProps: () => ({ style: {whiteSpace:'nowrap', verticalAlign: 'top' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace:'nowrap' }})
      }
    },
    {
      name: "digest",
      label: "Digest",
      options: {
        filterType: 'textField',
        customFilterListOptions: { render: v =>  `Digest: ${v}` },
        setCellProps: () => ({ style: {whiteSpace:'nowrap', verticalAlign: 'top' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace:'nowrap' }})
      }
    },
    {
      name: "timestamp",
      label: "Timestamp",
      options: {
        filterType: 'textField',
        sortCompare: (order) => (a,b) => {
          const dateA = new Date(a.data);
          const dateB = new Date(b.data);
    
          if(order === "desc"){
            return dateB-dateA;
          }
          return dateA-dateB;
        },
        customFilterListOptions: { render: v =>  `Timestamp: ${v}` },
        setCellProps: () => ({ style: {whiteSpace:'nowrap', verticalAlign: 'top' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace:'nowrap' }})
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
      filename: "ACR History.csv",
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

export default HistTable;