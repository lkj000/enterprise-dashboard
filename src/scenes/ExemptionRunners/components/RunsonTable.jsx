import { Box, Link, Typography } from "@mui/material";
import MUIDataTable from "mui-datatables";
import "../../global/custom-table.css";
import { RunsonData as input } from "../requests";


const RunsonTable = ({ colors }) => {


  const columns = [
    { 
      name: "sNo",
      label: "S.No",
      options: {
        filter: false,
        setCellProps: () => ({ style: { whiteSpace:'nowrap', verticalAlign: 'top' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace:'nowrap' }})
      }
    },
    {
      name: "name",
      label: "Repository Name",
      options: {
        filterType: 'textField',
        customBodyRender: (value) => (
          <Link underline="hover" target="_blank" rel="noopener noreferrer" href={`https://github.albertsons.com/albertsons/${value}`}>{value}</Link>
        ),
        customFilterListOptions: { render: v =>  `Repository Name: ${v}` },
        setCellProps: () => ({ style: { whiteSpace:'nowrap', verticalAlign: 'top' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace:'nowrap' }})
      }
    },
    {
      name: "fileName",
      label: "Workflow File",
      options: {
        filterType: 'textField',
        customBodyRender: (value) => {
          if (value === null) {
            return null;
          }
          const parts = value.split(',').map((item,index) => (
            <div key={index}>{item}</div>))
          return <div>{parts}</div>;
        },
        customFilterListOptions: { render: v =>  `Workflow File: ${v}` },
        setCellProps: () => ({ style: { whiteSpace:'nowrap', verticalAlign: 'top' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace:'nowrap' }})
      }
    },
    {
      name: "label",
      label: "Label",
      options: {
        filterType: 'textField',
        customBodyRender: (value) => {
          if (value === null) {
            return null;
          }
          const parts = value.split(',').map((item,index) => (
            <div key={index}>{item}</div>))
          return <div>{parts}</div>;
        },                   
        customFilterListOptions: { render: v =>  `Label: ${v}` },
        setCellProps: () => ({ style: { whiteSpace:'nowrap', verticalAlign: 'top' }}),
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
      filename: "runson.csv",
      filterOptions: {
        useDisplayedColumnsOnly: true,
        useDisplayedRowsOnly: true,
      }
    }
  };


  return (
    <Box>
      <Box display="flex" mb="25px">
        <Typography variant="h5" color={colors.tertiary[400]}>
          These Repositories are using unauthorized Labels
        </Typography>
      </Box>

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
    </Box>
  );
};

export default RunsonTable;