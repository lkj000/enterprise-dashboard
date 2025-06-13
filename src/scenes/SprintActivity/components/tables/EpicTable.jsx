import { React } from 'react';
import { Box, Link } from '@mui/material';
import MUIDataTable from "mui-datatables";
import { formatDate, LastUpdatedOnComponent } from "../../../../utils";
import { epic_lastrun } from "../../requests";
import '../../../global/custom-table.css';


const EpicTable = ({ input }) => {

  const data = input?.epic || [];

  const columns = [
    {
      name: "key",
      label: "Epic Number",
      options: {
        filterType: 'textField',
        customBodyRender: (value) => (
          <Link underline="hover" target="_blank" rel="noopener noreferrer" href={`https://jira.safeway.com/browse/${value}`}>{value}</Link>
        ),
        customFilterListOptions: { render: v => `Feature Number: ${v}` },
        setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top', textAlign: 'left' } }),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' } })
      }
    },
    {
      name: "summary",
      label: "Description",
      options: {

        filterType: 'textField',
        customBodyRender: (value) => (
          <div style={{ width: '300px', wordWrap: 'break-word', height: 'auto' }}>
            {value}
          </div>
        ),
        customFilterListOptions: { render: v => `Description: ${v}` },
        setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' } })
      }
    },
    {
      name: "component",
      label: "Component",
      options: {
        filterType: 'textField',
        customBodyRender: (value) => (
          <div style={{ width: '200px', wordWrap: 'break-word', height: 'auto' }}>
            {value}
          </div>
        ),
        customFilterListOptions: { render: v => `Component: ${v}` },
        setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' } })
      }
    },
    {
      name: "assignee",
      label: "Assignee",
      options: {
        customFilterListOptions: { render: v => `Assignee: ${v}` },
        setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top', textAlign: 'left' } }),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' } })
      }
    },
    {
      name: "in_active_sprint",
      label: "In Active Sprint",
      options: {
        filterType: 'textField',
        customBodyRender: (value) => value ? 'Yes' : 'No',
        customFilterListOptions: { render: v => `Is Active: ${v}` },
        setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top', textAlign: 'center', paddingLeft: '0px' } }),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'normal', minWidth: '75px', maxWidth: '75px' } })
      }
    },       
    {
      name: "story_points",
      label: "Epic Story points",
      options: {
        filterType: 'textField',
        customBodyRender: (value) => {
          return value !== 0 && value !== null ? value : 1;
        },
        customFilterListOptions: { render: v => `Epic Story points: ${v}` },
        setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top', textAlign: 'center', paddingLeft: '0px' } }),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'normal', minWidth: '110px', maxWidth: '110px' } })
      }
    },
    {
      name: "total issues",
      label: "Total Issues",
      options: {
        filterType: 'textField',
        customFilterListOptions: { render: v => `Total Issues: ${v}` },
        setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top', textAlign: 'center', paddingLeft: '0px' } }),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'normal', minWidth: '75px', maxWidth: '75px' } })
      }
    }, 
    {
      name: "total closed issues",
      label: "Total Closed Issues",
      options: {
        filterType: 'textField',
        customFilterListOptions: { render: v => `Total Closed Issues: ${v}` },
        setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top', textAlign: 'center', paddingLeft: '0px' } }),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'normal', minWidth: '110px', maxWidth: '110px' } })
      }
    },
    {
      name: "",
      label: "Overall Linked Issues InProgress (%)",
      options: {
        filterType: 'textField',
        customBodyRender: (value, tableMeta) => {
          if (tableMeta.rowData[7]=== 0 && tableMeta.rowData[6]=== 0) {
            return 0;
          }
          return (tableMeta.rowData[7]/ tableMeta.rowData[6]* 100).toFixed(2);
        },
        customFilterListOptions: { render: v => `Issues In Progress: ${v}` },
        setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top', textAlign: 'center', paddingLeft: '0px' } }),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'normal', minWidth: '155px', maxWidth: '155px' } })
      }
    },
    {
      name: "total_story_points",
      label: "Total Story points",
      options: {
        filterType: 'textField',
        customFilterListOptions: { render: v => `Total Story points: ${v}` },
        setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top', textAlign: 'center', paddingLeft: '0px' } }),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'normal', minWidth: '110px', maxWidth: '110px' } })
      }
    },
    {
      name: "resolved_story_points",
      label: "Total Closed Story points",
      options: {
        filterType: 'textField',
        customFilterListOptions: { render: v => `Total Closed Story points: ${v}` },
        setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top', textAlign: 'center', paddingLeft: '0px' } }),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'normal', minWidth: '110px', maxWidth: '110px' } })
      }
    },
    {
      name: "",
      label: "Story Points In Progress (%)",
      options: {
        filterType: 'textField',
        customBodyRender: (value, tableMeta) => {
          if (tableMeta.rowData[10] === 0 || tableMeta.rowData[9] === 0) {
            return 0;
          }
          return (tableMeta.rowData[10] / tableMeta.rowData[9] * 100).toFixed(2);
        },
        customFilterListOptions: { render: v => `Story Points In Progress: ${v}` },
        setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top', textAlign: 'center', paddingLeft: '0px' } }),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'normal', minWidth: '125px', maxWidth: '125px' } })
      }
    },
    {
      name: "issues_active",
      label: "Issues in Active Sprint",
      options: {
        filterType: 'textField',
        customFilterListOptions: { render: v => `Issues in Active Sprint: ${v}` },
        setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top', textAlign: 'center', paddingLeft: '0px' } }),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'normal', minWidth: '75px', maxWidth: '75px' } })
      }
    },
    {
      name: "stories_active",
      label: "Stories in Active Sprint",
      options: {
        filterType: 'textField',
        customFilterListOptions: { render: v => `Stories in Active Sprint: ${v}` },
        setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top', textAlign: 'center', paddingLeft: '0px' } }),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'normal', minWidth: '75px', maxWidth: '75px' } })
      }
    },    
    {
      name: "created_date",
      label: "Created Date",
      options: {
        filterType: 'textField',
        customBodyRender: (value) => {
          if (value === null) {
            return null;
          }
          return <div>{formatDate(value)}</div>;
        },
        customFilterListOptions: { render: v => `Created Date: ${v}` },
        setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top', textAlign: 'left' } }),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' } })
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
      name: "planned_start_date",
      label: "Planned Start Date",
      options: {
        filterType: 'textField',
        customBodyRender: (value) => {
          if (value === null) {
            return null;
          }
          return <div>{formatDate(value)}</div>;
        },
        customFilterListOptions: { render: v => `Created Date: ${v}` },
        setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top', textAlign: 'left' } }),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' } })
      }
    },
    {
      name: "planned_end_date",
      label: "Planned End Date",
      options: {
        filterType: 'textField',
        customBodyRender: (value) => {
          if (value === null) {
            return null;
          }
          return <div>{formatDate(value)}</div>;
        },
        customFilterListOptions: { render: v => `Created Date: ${v}` },
        setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top', textAlign: 'left' } }),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' } })
      }
    },
    {
      name: "resolution_date",
      label: "Resolved Date",
      options: {
        customFilterListOptions: { render: v => `Resolved Date: ${v}` },
        filterType: 'textField',
        customBodyRender: (value) => {
          if (value === null) {
            return null;
          }
          return <div>{formatDate(value)}</div>;
        },
        setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top', textAlign: 'left' } }),
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
    rowsPerPageOptions: [15, 25, 50, 100],
    sort: true,
    sortOrder: {
      name: 'created_date',
      direction: 'desc'
    },
    downloadOptions: {
      filename: "Epic.csv",
      filterOptions: {
        useDisplayedColumnsOnly: true,
        useDisplayedRowsOnly: true,
      }
    }
  }


  return (
    <Box>
      {data.length > 0 &&
      <Box className="table" style={{
        width: '100%',
        height: 'auto',
        marginTop: '40px'
      }}>
        <MUIDataTable
          title={<span className="custom-table-title">EPIC</span>}
          data={data}
          columns={columns}
          options={options}
          className="custom-table"
          components={{
            TableFilterList: (props) => (
              epic_lastrun && <LastUpdatedOnComponent props={props} date={epic_lastrun}/>
            )
          }}
        />
      </Box> }
    </Box>
  );
}

export default EpicTable;