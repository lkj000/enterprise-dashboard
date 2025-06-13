import React from 'react';
import MUIDataTable from "mui-datatables";
import { Box, Link } from '@mui/material';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { LastUpdatedOnComponent } from '../../../utils';
import '../../global/custom-table.css';

const SnowTable = ({ summary, title, user, lastRun = "" }) => {
  // Your code here
  const options = {
    // other options
    setRowProps: (row) => ({
      style: { height: 'auto' } // Set row height to auto
    })
  };
  let columns = []
  if (!user) {
    columns = [
      {
        name: "assignment_group",
        label: "Assignment Group",
        options: {
          filter: true,
          sort: true,
          setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top' } }),
          setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' } }),
        }
      },
      {
        name: "portfolio",
        label: "Portfolio",
        options: {
          filter: true,
          sort: true,
          setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top' } }),
          setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' } }),
        }
      },
      {
        name: "vp",
        label: "Department",
        options: {
          filter: true,
          sort: true,
          setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top' } }),
          setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' } }),
        }
      },
      {
        name: "director",
        label: "Team",
        options: {
          filter: true,
          sort: true,
          setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top' } }),
          setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' } }),
        }
      },      
      {
        name: "manager",
        label: "Manager",
        options: {
          filter: true,
          sort: true,
          setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top' } }),
          setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' } }),
        }
      },
      {
        name: "state",
        label: "State",
        options: {
          filter: true,
          sort: true,
          setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top' } }),
          setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' } }),
        }
      },
      {
        name: "made_sla",
        label: "SLA Status",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (value) => {
            if (!value) {
              return null;
            }
            return value === "In SLA" ? <DoneOutlinedIcon style={{ color: 'lightseagreen' }} /> : 
              <ClearOutlinedIcon style={{ color: 'red' }} />;
          },
          setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top' } }),
          setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' } }),
        }
      },
      {
        name: "count",
        label: "Count",
        options: {
          filter: false,
          sort: true,
          setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top' } }),
          setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' } }),
        }
      },
    ]
  } else {
    columns = [
      {  name: "url", options: { filter: false, display: false }  },
      {
        name: "assigned_to",
        label: "Assigned To",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (value, tableMeta) => {
            const userURL = tableMeta.rowData[0];
            return userURL ? (<Link underline="hover" target="_blank" rel="noopener noreferrer" href={`${userURL}`}>{value}</Link>)
              : value;
          },
          setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top' } }),
          setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' } }),
        }
      },
      {
        name: "portfolio",
        label: "Portfolio",
        options: {
          filter: true,
          sort: true,
          setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top' } }),
          setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' } }),
        }
      },
      {
        name: "vp",
        label: "Department",
        options: {
          filter: true,
          sort: true,
          setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top' } }),
          setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' } }),
        }
      },
      {
        name: "director",
        label: "Team",
        options: {
          filter: true,
          sort: true,
          setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top' } }),
          setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' } }),
        }
      },
      {
        name: "manager",
        label: "Manager",
        options: {
          filter: true,
          sort: true,
          setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top' } }),
          setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' } }),
        }
      },
      {
        name: "state",
        label: "State",
        options: {
          filter: true,
          sort: true,
          setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top' } }),
          setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' } }),
        }
      },
      {
        name: "made_sla",
        label: "SLA Status",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (value) => {
            if (!value) {
              return null;
            }
            return value === "In SLA" ? <DoneOutlinedIcon style={{ color: 'lightseagreen' }} /> : 
              <ClearOutlinedIcon style={{ color: 'red' }} />;
          },
          setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top' } }),
          setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' } }),
        }
      },
      {
        name: "count",
        label: "Count",
        options: {
          filter: false,
          sort: true,
          setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top' } }),
          setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' } }),
        }
      },
    ]
  }
  return (
    <Box
      className="table"
      marginTop={5}
    >
      {/* Your table content here */}
      <MUIDataTable
        title={<span className="custom-table-title">{title}</span>}
        data={summary}
        columns={columns}
        options={options}
        className="custom-table-perform"
        components={{
          TableFilterList: (props) => (
            lastRun && <LastUpdatedOnComponent props={props} date={lastRun}/>
          )
        }}
      />
    </Box>
  );
};

export default SnowTable;