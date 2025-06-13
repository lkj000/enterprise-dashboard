import { Box } from '@mui/material';
import MUIDataTable from "mui-datatables";
import ExpandableRow from "./ExpandableRow";
import { statusList } from "../HandleDropdowns";
import '../../../global/custom-table.css';


const DPPTable = ({ input, port, selectVP, selectDirector, selectManager, copilotStatus, theme }) => {


  const columns = [
    {
      name: "Assignee",
      label: "User",
      options: {
        filter: true,
        sort: true,
        filterType: 'textField',
        setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top' } }),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' } })
      },
      alwaysVisible: true 
    },
    {
      name: "user_role",
      label: "Title",
      options: {
        filter: true,
        sort: true,
        setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top' } }),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' } })
      },
      alwaysVisible: true 
    },
    {
      name: "vp",
      label: "Department",
      options: {
        filterType: 'dropdown',
        filterList: selectVP === "All" || !selectVP ? [] : [selectVP],
        customFilterListOptions: { render: v =>  `Department: ${v}` },
        setCellProps: () => ({ style: { whiteSpace:'nowrap', verticalAlign: 'top' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace:'nowrap' }}),
        display: false
      } 
    }, 
    {
      name: "director",
      label: "Team",
      options: {
        filterType: 'dropdown',
        filterList: selectDirector === "All" || !selectDirector ? [] : [selectDirector],
        customFilterListOptions: { render: v =>  `Team: ${v}` },
        setCellProps: () => ({ style: { whiteSpace:'nowrap', verticalAlign: 'top' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace:'nowrap' }}),
        display: false
      } 
    }, 
    {
      name: "portfolio",
      label: "Portfolio",
      options: {
        filterType: 'dropdown',
        filterList: port === "All" || !port ? [] : [port],
        customFilterListOptions: { render: v =>  `Portfolio: ${v}`},
        setCellProps: () => ({ style: { whiteSpace:'nowrap', verticalAlign: 'top' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace:'nowrap' }})
      },
      alwaysVisible: true 
    }, 
    {
      name: "manager",
      label: "Line Manager",
      options: {
        filterType: 'dropdown',
        filterList: selectManager === "All" || !selectManager ? [] : [selectManager],
        customFilterListOptions: {render: v =>  `Line Manager: ${v}`},         
        setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top' } }),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' } })        
      },
      alwaysVisible: true   
    },
    {
      name: "total_issues",
      label: "Total Jira Tickets",
      options: {
        filterType: 'textField',
        customFilterListOptions: { render: v =>  `Total Jira Tickets: ${v}` },
        setCellProps: () => ({ style: { whiteSpace: 'normal', verticalAlign: 'top', textAlign: 'center', paddingLeft: '0px', paddingRight: '30px' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' }})
      }
    },
    {
      name: "total_original_estimate",
      label: "Total Estimated Hrs.",
      options: {
        filterType: 'textField',
        customFilterListOptions: { render: v =>  `Total Estimated Hrs: ${v}` },
        sortCompare: (order) => (a, b) => {
          const num1 = parseFloat(a.data);
          const num2 = parseFloat(b.data);
          return order === "asc" ? num1 - num2 : num2 - num1;
        },
        setCellProps: () => ({ style: { whiteSpace: 'normal', verticalAlign: 'top', textAlign: 'center', paddingLeft: '0px', paddingRight: '30px' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' }})
      }
    },
    {
      name: "total_timeSpent",
      label: "Total Logged Hrs.",
      options: {
        filterType: 'textField',
        customFilterListOptions: { render: v =>  `Total Logged Hrs: ${v}` },
        sortCompare: (order) => (a, b) => {
          const num1 = parseFloat(a.data);
          const num2 = parseFloat(b.data);
          return order === "asc" ? num1 - num2 : num2 - num1;
        },
        setCellProps: () => ({ style: { whiteSpace: 'normal', verticalAlign: 'top', textAlign: 'center', paddingLeft: '0px', paddingRight: '30px' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' }})
      }
    },
    {
      name: "total_remaining_estimate",
      label: "Total Remaining Hrs.",
      options: {
        filterType: 'textField',
        customFilterListOptions: { render: v =>  `Total Remaining Hrs: ${v}` },
        sortCompare: (order) => (a, b) => {
          const num1 = parseFloat(a.data);
          const num2 = parseFloat(b.data);
          return order === "asc" ? num1 - num2 : num2 - num1;
        },
        setCellProps: () => ({ style: { whiteSpace: 'normal', verticalAlign: 'top', textAlign: 'center', paddingLeft: '0px', paddingRight: '30px' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' }})
      }
    },
    {
      name: "jira_with_gc_component",
      label: "Total Jira Tickets with GC Component",
      options: {
        filterType: 'textField',
        customFilterListOptions: { render: v =>  `Total Jira Tickets with GC Component: ${v}` },
        setCellProps: () => ({ style: { whiteSpace: 'normal', verticalAlign: 'top', textAlign: 'center', paddingLeft: '0px', paddingRight: '30px' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'normal', minWidth: '160px', maxWidth: '160px' }})
      }
    },
    {
      name: "total_pr_count",
      label: "Total PRs",
      options: {
        filterType: 'textField',
        customFilterListOptions: { render: v =>  `Total PRs: ${v}` },
        setCellProps: () => ({ style: { whiteSpace: 'normal', verticalAlign: 'top', textAlign: 'center', paddingLeft: '0px', paddingRight: '30px' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' } })
      }
    },
    {
      name: "total_commits_in_prs_count",
      label: "Total Commits",
      options: {
        filterType: 'textField',
        customFilterListOptions: { render: v =>  `Total Commits: ${v}` },
        setCellProps: () => ({ style: { whiteSpace: 'normal', verticalAlign: 'top', textAlign: 'center', paddingLeft: '0px', paddingRight: '30px' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' } })
      }
    },
    {
      name: "total_additions_in_prs_count",
      label: "Total Additions",
      options: {
        filterType: 'textField',
        setCellProps: () => ({ style: { whiteSpace: 'normal', verticalAlign: 'top', textAlign: 'center', paddingLeft: '0px', paddingRight: '30px' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' } })
      }
    },
    {
      name: "total_deletions_in_prs_count",
      label: "Total Deletions",
      options: {
        filterType: 'textField',
        customFilterListOptions: { render: v =>  `Total Deletions: ${v}` },
        setCellProps: () => ({ style: { whiteSpace: 'normal', verticalAlign: 'top', textAlign: 'center', paddingLeft: '0px', paddingTop: '16px', paddingRight: '30px' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' } })
      }
    },
    {
      name: "user_created_at",
      label: "License Assigned Date",
      options: { 
        filterType: 'textField',
        customFilterListOptions: { render: v =>  `License Assigned Date: ${v}` },
        sortCompare: (order) => (a,b) => {
          if (a.data === "Not Created") return 1
          if (b.data === "Not Created") return -1
          const dateA = new Date(a.data);
          const dateB = new Date(b.data);

          if (order === "desc") {
            return dateB-dateA;
          }
          return dateA-dateB;
        },
        setCellProps: () => ({ style: { whiteSpace: 'normal', verticalAlign: 'top', textAlign: 'center', paddingLeft: '0px', paddingRight: '40px' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' }})
      }
    },
    {
      name: "last_activity",
      label: "Last Copilot Activity",
      options: {
        filterType: 'textField',
        customFilterListOptions: { render: v =>  `Last Copilot Activity: ${v}` },
        sortCompare: (order) => (a,b) => {
          if (a.data === "No Activity") return 1
          if (b.data === "No Activity") return -1
          const dateA = new Date(a.data);
          const dateB = new Date(b.data);

          if (order === "desc") {
            return dateB-dateA;
          }
          return dateA-dateB;
        },
        setCellProps: () => ({ style: { whiteSpace: 'normal', verticalAlign: 'top', textAlign: 'center', paddingLeft: '0px' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' }})
      }
    },
    {
      name: "activity_status",
      label: "Status",
      options: {
        viewColumns: false,
        display: false,
        filterType: 'dropdown',
        filterList: copilotStatus === "All" || !copilotStatus ? [] : [copilotStatus],
        customFilterListOptions: { render: v =>  `Status: ${v}` },
        filterOptions: {
          names: statusList,
          logic(value, filters) {
            const filterData=
              (filters.indexOf('1-5 Days') >=0 && (value === "1")) ||
              (filters.indexOf('6-10 Days') >=0 && ( value === "6")) ||
              (filters.indexOf('>10 Days') >=0 && ( value === "10")) ||
              (filters.indexOf('Inactive Users') >=0 && ( value === "Inactive")) ||
              (filters.indexOf('License Not Assigned') >=0 && ( value === "NotAssigned"));  
            return !filterData;
          }
        },
        setCellProps: () => ({ style: { whiteSpace: 'nowrap',verticalAlign: 'top', textAlign: 'left' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' }})
      }
    },
    {
      name: "status",
      label: "GitHub Enterprise Status",
      options: {
        filterType: 'dropdown',
        customFilterListOptions: { render: v =>  `GitHub Enterprise Status: ${v}` },
        setCellProps: () => ({ style: { whiteSpace:'normal', verticalAlign: 'top', textAlign: 'center', paddingLeft: '0px', paddingBottom: '0px', paddingTop: '16px' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' }})
      }
    }
  ];


  const options = {
    expandableRows: true,
    expandableRowsHeader: false,
    expandableRowsOnClick: false,
    renderExpandableRow: (rowData, rowMeta) => <ExpandableRow rowMeta={rowMeta} input={input} theme={theme} />,
    fixedHeader: true,
    filter: true,
    sort: true,
    responsive: 'vertical',
    tableBodyHeight: 'auto',
    rowsPerPage: 15,
    rowsPerPageOptions: [15,25,50,100],
    downloadOptions: {
      filename: "Developer Productivity.csv",
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
}

export default DPPTable;