import { React, useState } from "react";
import { Box, Link, Tab } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import MUIDataTable from "mui-datatables";
import { formatDate, LastUpdatedOnComponent } from "../../../../utils";
import { backlog_lastrun } from "../../requests";
import '../../../global/custom-table.css';


const JiraBacklog = ({ input }) => {

  const data = input?.backlog || [];
  const [value, setValue] = useState('1');

  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };


  const columns = [
    {
      name: "key",
      label: "Issue Key",
      options: {
        filterType: 'textField',
        customBodyRender: (value) => {
          return (
            <Link underline="hover" target="_blank" rel="noopener noreferrer" href={`https://jira.safeway.com/browse/${value}`}>{value}</Link>
        )},
        customFilterListOptions: { render: v =>  `Issue Key: ${v}` },
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
        setCellHeaderProps: () => ({ style: { whiteSpace:'nowrap' }}),
        display: value === '1' ? true : false
      }
    }, 
    {
      name: "reporter",
      label: "Reporter",
      options: {
        filterType: 'textField',
        customFilterListOptions: { render: v =>  `Reporter: ${v}` },
        setCellProps: () => ({ style: { whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'left' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace:'nowrap' }})
      }
    },
    {
      name: "createdDate",
      label: "Created Date",
      options: {
        filterType: 'textField',
        customBodyRender: (value) => {
          if(value === null) {
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
          if(value === null) {
            return null;
          }
          return (<div style={{ width: '300px', wordWrap: 'break-word', height: 'auto' }}>
            {value}
          </div>)
        },
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
      filename: "Backlog Issues.csv",
      filterOptions: {
        useDisplayedColumnsOnly: true,
        useDisplayedRowsOnly: true,
      }
    }
  };


  return(
    <Box>

      {data.length > 0 ?
        <Box mt={8} mb={2}>
          <TabContext value={value}>
            <Box sx={{ 
              borderBottom: 1, 
              borderColor: 'divider', 
              mt:-1.5,
              mb: 3.5
            }}>
              <TabList 
                value={value} 
                onChange={handleChange} 
                indicatorColor="secondary" 
                textColor="inherit" 
                variant="fullWidth"
              >
                <Tab 
                  label="BACKLOG JIRA ASSIGNED"
                  value="1"
                  style={{ fontSize:'14.5px', fontWeight:'medium' }}
                  iconPosition="start" 
                />
                <Tab 
                  label="BACKLOG JIRA UNASSIGNED" 
                  value="2" 
                  style={{ fontSize:'14.5px', fontWeight:'medium' }}
                  iconPosition="start" 
                />
              </TabList>
            </Box>

            <TabPanel value="1">            
              {data[0].length > 0 ?
              <Box className="table"
                style={{
                  width: '100%', 
                  height: 'auto'
              }}>
                <MUIDataTable
                  title={<span className="custom-table-title">BACKLOG ASSIGNED ISSUES</span>}
                  data={data[0]}
                  columns={columns}
                  options={options}
                  className="custom-table"
                  components={{
                    TableFilterList: (props) => (
                      backlog_lastrun && <LastUpdatedOnComponent props={props} date={backlog_lastrun}/>
                    )
                  }}
                />
              </Box> : null}
            </TabPanel>
            
            <TabPanel value="2" >
              {data[1].length > 0 ?
              <Box className="table" style={{
                width: '100%', 
                height: 'auto'
              }}>
                <MUIDataTable
                  title={<span className="custom-table-title">BACKLOG UNASSIGNED ISSUES</span>}
                  data={data[1]}
                  columns={columns}
                  options={options}
                  className="custom-table"
                  components={{
                    TableFilterList: (props) => (
                      backlog_lastrun && <LastUpdatedOnComponent props={props} date={backlog_lastrun}/>
                    )
                  }}
                />
              </Box> : null}
            </TabPanel>

        </TabContext>
      </Box> : null}

    </Box>
  );
};

export default JiraBacklog;