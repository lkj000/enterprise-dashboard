import React from 'react';
import { Box, Link } from '@mui/material';
import MUIDataTable from "mui-datatables";
import { kanban_lastrun } from "../../requests";
import { formatDate, LastUpdatedOnComponent } from "../../../../utils";
import '../../../global/custom-table.css';


const KanbanIssues = ({ input }) => {

  const data = input?.issues ?? [];


  const columns = [
    {
      name: "key",
      label: "Issue Key",
      options: {
        filterType: 'textField',
        customFilterListOptions: { render: v =>  `Issue Key: ${v}` },
        customBodyRender: (value) => {
          return (
            <Link underline="hover" target="_blank" rel="noopener noreferrer" href={`https://jira.safeway.com/browse/${value}`}>{value}</Link>
        )},
        setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top' } }),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' } })
      }
    },
    {
      name: "title",
      label: "Issue Title",
      options: {
        filterType: 'textField',
        customBodyRender: (value) => (
          <div style={{ width: '300px', wordWrap: 'break-word', height:'auto' }}>
            {value}
          </div>),
        customFilterListOptions: { render: v =>  `Issue Title: ${v}` },
        setCellHeaderProps: () => ({ style: { whiteSpace:'nowrap' }})
      }
    },
    {
      name: "type",
      label: "Issue Type",
      options: {
        filterType: 'dropdown',
        customFilterListOptions: { render: v =>  `Issue Type: ${v}` },
        setCellProps: () => ({ style: { whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'left' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace:'nowrap' }})
      }
    },
    {
      name: "status",
      label: "Status",
      options: {
        filterType: 'dropdown',
        customFilterListOptions: { render: v =>  `Status: ${v}` },
        setCellProps: () => ({ style: { whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'left' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace:'nowrap' }})
      }
    },
    {
      name: "points",
      label: "No. of Points",
      options: {
        filterType: 'textField',
        customFilterListOptions: { render: v =>  `No. of Points: ${v}` },
        setCellProps: () => ({ style: { whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'left' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace:'nowrap' }})
      }
    },
    {
      name: "reporter",
      label: "Reporter",
      options: {
        filterType: 'textField',
        customFilterListOptions: { render: v =>  `Reporter: ${v}` },
        setCellProps: () => ({style: {whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'left'}}),
        setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}})
      }
    },
    {
      name: "assignee",
      label: "Assignee",
      options: {
        filterType: 'textField',
        customFilterListOptions: { render: v =>  `Assignee: ${v}` },
        setCellProps: () => ({ style: { whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'left' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace:'nowrap' }})
      }
    },
    {
      name: "createdDate",
      label: "Date of Creation",
      options: {
        filterType: 'textField',
        customBodyRender: (value) => {
          if(value === null){
            return null;
          }
          return <div>{formatDate(value)}</div>;
        },
        customFilterListOptions: { render: v =>  `Date of Creation: ${v}` },
        setCellProps: () => ({ style: { whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'left' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace:'nowrap' }})
      }
    },
    {
      name: "resolutionDate",
      label: "Date of Resolution",
      options: {
        filterType: 'textField',
        customBodyRender: (value) => {
          if(value === null){
            return null;
          }
          return <div>{formatDate(value)}</div>;
        },
        customFilterListOptions: { render: v =>  `Date of Resolution: ${v}` },
        setCellProps: () => ({ style: { whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'left' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace:'nowrap' }})
      }
    },
    {
      name: "mpo_id",
      label: "MPO ID",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => {
          if(value === null){
            return null;
          }
          return (<div style={{ width: '300px', wordWrap: 'break-word', height: 'auto' }}>
            {value}
          </div>)
        },
        customFilterListOptions: { render: v => `MPO ID: ${v}` },
        setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' } })
      }
    },
    {
      name: "leadTime",
      label: "Lead Time",
      options: {
        filterType: 'textField',
        customFilterListOptions: { render: v =>  `Lead Time: ${v}` },
        setCellProps: () => ({ style: { whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'left' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace:'nowrap' }})
      }
    },
    {
      name: "cycleTime",
      label: "Cycle Time",
      options: {
        filterType: 'textField',
        customFilterListOptions: { render: v =>  `Cycle Time: ${v}` },
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
    setRowProps: (row) => ({
      style: { height: 'auto' }
    }),
    downloadOptions: {
      filename: "Issues.csv",
      filterOptions: {
        useDisplayedColumnsOnly: true,
        useDisplayedRowsOnly: true
      }
    }
  };


  return (
    <Box>
      {data.length > 0 &&
      <Box className="table" style={{
        width: '100%',
        height: 'auto',
        marginTop: '40px'
      }}>
        <MUIDataTable
          title={<span className="custom-table-title">Issues</span>}
          data={data}
          columns={columns}
          options={options}
          className="custom-table"
          components={{
            TableFilterList: (props) => (
              kanban_lastrun && <LastUpdatedOnComponent props={props} date={kanban_lastrun}/>
            )
          }}
        />
      </Box> }
    </Box>
  );
};

export default KanbanIssues;