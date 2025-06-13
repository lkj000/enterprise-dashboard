import { React } from "react";
import {Box, IconButton, Link, Tooltip, Typography} from '@mui/material';
import MUIDataTable from "mui-datatables";
import InfoIcon from '@mui/icons-material/Info';
import { LastUpdatedOnComponent } from "../../../utils";
import '../../global/custom-table.css';


const CopilotTable = ({ input, lastRun, port, selectVP, selectDirector, selectManager, selectStatus }) => {


    const columns = [
    { 
        name: "SNo", label: "S.No",
        options: {
            filter: false,
            setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top', textAlign: 'left' }}),
            setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' }})
        }
    },
    {
        name: "user",
        label: "User ID",
        options:{
            filter: true,
            filterType: 'textField',
            customFilterListOptions: {render: v =>  `User ID: ${v}`},
            customBodyRender: (value) => (
                <Link underline="hover" target="_blank" rel="noopener noreferrer" href={`https://github.albertsons.com/${value}`}>{value}</Link>
            ),    
            setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top', textAlign: 'left' }}),
            setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' }})
        }
    },
    {
        name: "display_name",
        label: "Full Name",
        options:{
            filter: true,
            filterType: 'textField',
            customFilterListOptions: { render: v =>  `displayName: ${v}` },
            setCellProps: () => ({ style: { whiteSpace: 'normal', verticalAlign: 'top', textAlign: 'left' }}),
            setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' }})
        }
    },
    {
        name: "job_title",
        label: "Title",
        options:{
            filter: true,
            filterType: 'dropdown',
            customFilterListOptions: { render: v =>  `job_title: ${v}` },
            setCellProps: () => ({ style: { whiteSpace: 'normal', verticalAlign: 'top', textAlign: 'left' }}),
            setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' }})
        }
    },
    {
        name: "portfolio",
        label: "Portfolio",
        options:{
            filter: true,
            filterType: 'dropdown',
            filterList: port === 'All' || !port ? [] : [port],
            customFilterListOptions: { render: v =>  `Portfolio: ${v}` },
            setCellProps: () => ({ style: { whiteSpace: 'normal', verticalAlign: 'top', textAlign: 'left' }}),
            setCellHeaderProps: () => ({ style: { whiteSpace: 'normal', minWidth: '135px', maxWidth: '135px' }})
        }
    },
    {
        name: "vp",
        label: "Department",
        options:{
            filter: true,
            filterType: 'dropdown',
            filterList: selectVP === 'All' || !selectVP ? [] : [selectVP],
            customFilterListOptions: { render: v =>  `Department: ${v}` },
            setCellProps: () => ({ style: { whiteSpace: 'normal', verticalAlign: 'top', textAlign: 'left' }}),
            setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' }}),
            display: false
        }
    },
    {
        name: "director",
        label: "Team",
        options:{
            filter: true,
            filterType: 'dropdown',
            filterList: selectDirector === 'All' || !selectDirector ? [] : [selectDirector],
            customFilterListOptions: { render: v =>  `Team: ${v}` },
            setCellProps: () => ({ style: { whiteSpace: 'normal', verticalAlign: 'top', textAlign: 'left' }}),
            setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' }}),
            display: false
        }
    },
    {
        name: "manager",
        label: "Line Manager",
        options:{
            filter: true,
            filterType: 'dropdown',
            filterList: selectManager === 'All' || !selectManager ? [] : [selectManager],
            customFilterListOptions: { render: v =>  `Line Manager: ${v}` },
            setCellProps: () => ({ style: { whiteSpace: 'normal', verticalAlign: 'top', textAlign: 'left' }}),
            setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' }})
        }
    },
    {
        name: "created_date",
        label: "License Assigned Date",
        options: {
            customFilterListOptions: { render: v =>  `License Assigned Date: ${v}` },
            filterType: 'textField',
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
            setCellHeaderProps: () => ({ style: { whiteSpace: 'normal', minWidth: '145px', maxWidth: '145px' }})
        }
    },
    {
        name: "last_activity",
        label: "Last Copilot Activity",
        options: {
            customFilterListOptions: { render: v =>  `Last Copilot Activity: ${v}` },
            filterType: 'textField',
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
            setCellHeaderProps: () => ({ style: { whiteSpace: 'normal', minWidth: '135px', maxWidth: '135px' }})
        }
    },
    {
        name: "activity_status",
        label: "Status",
        options: {
            customFilterListOptions: { render: v =>  `Status: ${v}` },
            filterType: 'dropdown',
            filterList: selectStatus === 'All' || !selectStatus ? [] : [selectStatus],
            filterOptions: {
                names: ['1-5 Days','6-10 Days','>10 Days','Inactive Users','License Not Assigned'],
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
            setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' }}),
            display: false
        }
    },
    {
        name: "user_commits_last_30_days",
        label: (<>
            No. of Commits in Last 30 Days
            <Tooltip arrow title={<Typography fontSize={16}>The No. of commits made to a default branch for any repository in Last 30 Days</Typography>}>
            <IconButton
              variant="contained"
              type="button"
              color="primary"
              aria-label="commits"
            >
              <InfoIcon/>
            </IconButton>
            </Tooltip>
        </>),
        options: {
            filter: true,
            customFilterListOptions: { render: v =>  `No. of Commits: ${v}` },
            filterType: 'textField',
            setCellProps: () => ({ style: { whiteSpace:'normal', verticalAlign: 'top', textAlign: 'center', paddingLeft: '2px' }}),
            setCellHeaderProps: () => ({ style: { whiteSpace: 'normal', minWidth: '130px', maxWidth: '130px' }})
        }
    },
    {
        name: "user_prs_last_30_days",
        label: (<>
            No. of PR's in Last 30 Days
            <Tooltip arrow title={<Typography fontSize={16}>The No. of PR's raised against the default branch in Last 30 Days</Typography>}>
            <IconButton
              variant="contained"
              type="button"
              color="primary"
              aria-label="PR"
            >
              <InfoIcon/>
            </IconButton>
            </Tooltip>
        </>),
        options: {
            filter: true,
            customFilterListOptions: { render: v =>  `No. of PR's: ${v}` },
            filterType: 'textField',
            setCellProps: () => ({ style: { whiteSpace: 'normal', verticalAlign: 'top', textAlign: 'center', paddingLeft: '2px' }}),
            setCellHeaderProps: () => ({ style: { whiteSpace: 'normal', minWidth: '120px', maxWidth: '120px' }})
        }
    },
    {
        name: "status",
        label: "GitHub Enterprise Status",
        options: {
            filter: true,
            customFilterListOptions: { render: v =>  `GitHub Enterprise Status: ${v}` },
            filterType: 'dropdown',
            setCellProps: () => ({ style: { whiteSpace:'normal', verticalAlign: 'top', textAlign: 'center', paddingLeft: '0px' }}),
            setCellHeaderProps: () => ({ style: { whiteSpace: 'normal', minWidth: '150px', maxWidth: '150px' }})
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
            name: 'created_date',
            direction: 'desc'
          },
        textLabels: {
            body: {
                toolTip: "Sort",
                columnHeaderTooltip: column => {
                  return column.name === "user_commits_last_30_days" || column.name === "user_prs_last_30_days" ? '' : 'Sort';
                }
            }
        },
        downloadOptions: {
            filename: "Copilot Users.csv",
            filterOptions: {
            useDisplayedColumnsOnly: true,
            useDisplayedRowsOnly: true,
            }
        }
    }


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
              lastRun && <LastUpdatedOnComponent props={props} date={lastRun}/>
            )
          }}
        />
    </Box>
    );
};

export default CopilotTable;