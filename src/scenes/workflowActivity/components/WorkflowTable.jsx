import { React } from "react";
import { Box } from '@mui/material';
import MUIDataTable from "mui-datatables";
import { RunTimeData as input } from "../requests";
import '../../global/custom-table.css';


const WorkflowTable = () => {


  const columns = [
    {
      name: "user",
      label: "User ID",
      options: {
        customFilterListOptions: { render: v =>  `AppCode: ${v}` },
        setCellProps: () => ({ style: { whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'left' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace:'nowrap', textAlign: 'left' }})
      }
    },
    {
      name: "display_name",
      label: "Name",
      options: {
        customFilterListOptions: { render: v =>  `AppCode: ${v}` },
        setCellProps: () => ({ style: { whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'left' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace:'nowrap', textAlign: 'left' }})
      }
    },
    {
      name: "manager",
      label: "Manager",
      options: { 
        customFilterListOptions: { render: v =>  `AppCode: ${v}` },
        setCellProps: () => ({ style: { whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'left' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace:'nowrap', textAlign: 'left' }})
      }
    },
    {
      name: "count",
      label: "Workflow Runs",
      options: {
        filterType: 'textField',
        customFilterListOptions: { render: v =>  `Workflow Run: ${v}` }, 
        customBodyRender: (value) => {
          if(value === null){
            return null;
          }
          return value;
        },
        setCellProps: () => ({ style: { whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'left' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace:'nowrap' }})
      }
    }
  ];


  const options = {
    fixedHeader: true,
    filter: true,
    responsive: 'vertical',
    tableBodyHeight: 'auto',
    rowsPerPage: 15,
    rowsPerPageOptions: [15,25,50,100],
    sort: true,
    sortOrder: {
      name: 'count',
      direction: 'desc'
    },
    downloadOptions: {
      filename: "Workflow Activity.csv",
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
        className="custom-table-perform"
      />
    </Box>
  );
};

export default WorkflowTable;