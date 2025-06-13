import { React } from "react";
import { Box, Link} from '@mui/material';
import MUIDataTable from "mui-datatables";
import { formatDate, LastUpdatedOnComponent } from "../../../../utils";
import { IssueData, currentIssue_lastrun } from "../../requests";
import '../../../global/custom-table.css';


const CurrentSprint = ({ projKey, sprintData }) => {

  const data = IssueData[projKey]?.[sprintData.id] ?? [];

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
        setCellProps: () => ({ style: { whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'left' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace:'nowrap' }})
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
      label: "Issue Status",
      options: {
        filterType: 'dropdown',
        customFilterListOptions: { render: v =>  `Issue Status: ${v}` },
        setCellProps: () => ({ style: { whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'left' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace:'nowrap' }})
      }
    }, 
    {
      name: "points",
      label: "Story Points",
      options: {
        filterType: 'textField',
        customFilterListOptions: { render: v =>  `Story Points: ${v}` },
        setCellProps: () => ({ style: { whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'left' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace:'nowrap' }})
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
      name: "createdDate",
      label: "Created Date",
      options: {
        filterType: 'textField',
        customBodyRender: (value) => {
          if(value === null){
            return null;
          }
          return <div>{formatDate(value)}</div>;
        },
        customFilterListOptions: { render: v =>  `Created Date: ${v}` },
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
        </div>)},
        customFilterListOptions: { render: v => `MPO ID: ${v}` },
        setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' } })
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
      name: 'createdDate',
      direction: 'desc'
    },
    downloadOptions: {
      filename: "Current Sprint Issues.csv",
      filterOptions: {
        useDisplayedColumnsOnly: true,
        useDisplayedRowsOnly: true
      }
    }
  };

  

  return(
    <Box>
      {data.length > 0 &&
      <Box className="table" style={{
        width: '100%',
        height: 'auto',
        marginTop: '40px'
      }}>
        <MUIDataTable
            title={<span className="custom-table-title">Current Sprint Issues</span>}
            data={data}
            columns={columns}
            options={options}
            className="custom-table"
            components={{
              TableFilterList: (props) => (
                currentIssue_lastrun && <LastUpdatedOnComponent props={props} date={currentIssue_lastrun}/>
              )
            }}
        />
      </Box> }
    </Box>
  );
};

export default CurrentSprint;