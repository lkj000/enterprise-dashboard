import React from 'react';
import { Box, Link } from '@mui/material';
import MUIDataTable from "mui-datatables";
import { formatDate, LastUpdatedOnComponent } from '../../../utils';
import { keyOptions, RiskData as input, risk_lastrun } from '../requests';
import '../../global/custom-table.css';


const RiskTable = ({ projKey, port, selectVP, selectDirector, selectManager }) => {


  const columns = [
    {
      name: "key",
      label: "Key",
      options: {
        filterType: 'dropdown',
        filterList: projKey === "All" || !projKey ? [] : [projKey],
        customFilterListOptions: { render: v =>  `Project Key: ${v}` },
        customBodyRender: (value) => (
          <Link underline="hover" target="_blank" rel="noopener noreferrer" href={`https://jira.safeway.com/browse/${value}`}>{value}</Link>
        ),
        filterOptions: {
          names: keyOptions,
          logic(keyValue, filters) {
            if (filters.length === 0) return false;
            return !filters.some(filter => keyValue.startsWith(filter + '-'));
          },
        }
      }
    },
    {
      name: "portfolio",
      label: "Portfolio",
      options:{
        filter: true,
        filterType: 'dropdown',
        filterList: port === "All" || !port ? [] : [port],
        customFilterListOptions: { render: v =>  `Portfolio: ${v}` }
      }
    },
    {
      name: "vp",
      label: "Department",
      options:{
        filter: true,
        filterType: 'dropdown',
        filterList: selectVP === "All" || !selectVP ? [] : [selectVP],
        customFilterListOptions: { render: v =>  `Department: ${v}` }
      }
    },
    {
      name: "director",
      label: "Team",
      options:{
        filter: true,
        filterType: 'dropdown',
        filterList: selectDirector === "All" || !selectDirector ? [] : [selectDirector],
        customFilterListOptions: { render: v =>  `Team: ${v}` }
      }
    },
    {
      name: "manager",
      label: "Line Manager",
      options:{
        filter: true,
        filterType: 'dropdown',
        filterList: selectManager === "All" || !selectManager ? [] : [selectManager],
        customFilterListOptions: { render: v =>  `Line Manager: ${v}` }
      }
    },
    {
      name: "title",
      label: "Title",
      options: {
        filter: true,
        sort: true,
        filterType: 'textField',
        customFilterListOptions: { render: v =>  `Title: ${v}` }
      }
    },
    {
      name: "priority",
      label: "Priority",
      options: {
        filter: true,
        sort: true,
        filterType: 'textField',
        customFilterListOptions: { render: v =>  `Priority: ${v}` }
      }
    },
    {
      name: "status",
      label: "Status",
      options: {
        filter: true,
        sort: true,
        customFilterListOptions: { render: v =>  `Status: ${v}` }
      }
    },
    {
      name: "points",
      label: "Story Points",
      options: {
        filter: true,
        sort: true,
        filterType: 'textField',
        customBodyRender: (value) => {
          return value !== 0 && value !== null ? value : 1;
        },
        customFilterListOptions: { render: v =>  `Story Points: ${v}` }
      }
    },
    {
      name: "createdDate",
      label: "Created Date",
      options: {
        filter: true,
        sort: true,
        filterType: 'textField',
        customBodyRender: (value) => {
          if (value === null) {
            return null;
          }
          return <div>{formatDate(value)}</div>;
        },
        customFilterListOptions: { render: v =>  `Created Date: ${v}` }
      }
    },
    {
      name: "target-completed-Date",
      label: "Target Completed Date",
      options: {
        filter: true,
        sort: true,
        filterType: 'textField',
        customBodyRender: (value) => {
          if (value === null) {
            return null;
          }
          return <div>{formatDate(value)}</div>;
        },
        customFilterListOptions: { render: v =>  `Target Completed Date: ${v}` }
      }
    },
    {
      name: "mpo_id",
      label: "MPO ID",
      options: {
        filter: true,
        sort: true,
        filterType: 'textField',
        customFilterListOptions: { render: v =>  `MPO ID: ${v}` }
      }
    },
    {
      name: "assignee",
      label: "Assignee",
      options: {
        filter: true,
        sort: true,
        filterType: 'textField',
        customFilterListOptions: { render: v =>  `Assignee: ${v}` }
      }
    },
    {
      name: "reporter",
      label: "Reporter",
      options: {
        filter: true,
        sort: true,
        filterType: 'textField',
        customFilterListOptions: { render: v =>  `Reporter: ${v}` }
      }
    },
    {
      name: "resolutiondate",
      label: "Resolution Date",
      options: {
        filter: true,
        sort: true,
        filterType: 'textField',
        customFilterListOptions: { render: v =>  `Resolution Date: ${v}` },
        customBodyRender: (value) => {
          if (value === null) {
            return null;
          }
          return <div>{formatDate(value)}</div>;
        }
      }
    },
  ];


  const options = {
    fixedHeader: true,
    filter: true,
    responsive: 'vertical',
    tableBodyHeight: 'auto',
    rowsPerPage: 15,
    rowsPerPageOptions: [15, 25, 50, 100],
    sort: true,
    sortOrder: {
      name: 'key',
      direction: 'desc'
    },
    downloadOptions: {
      filename: "Risk.csv",
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
          components={{
            TableFilterList: (props) => (
              risk_lastrun && <LastUpdatedOnComponent props={props} date={risk_lastrun}/>
            )
          }}
      />
    </Box>
  );
};

export default RiskTable;