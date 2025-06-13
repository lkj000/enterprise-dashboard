import {React} from "react";
import {Box, IconButton, Link, Tooltip, Typography} from '@mui/material';
import MUIDataTable from "mui-datatables";
import InfoIcon from '@mui/icons-material/Info';
import ToolTipBox from "../../../../common-components/ToolTipBox";
import { LastUpdatedOnComponent } from "../../../../utils";
import '../../../global/custom-table.css';


const UserTable = ({ input, port, selectVP, selectDirector, selectManager, userID, status, showCol, dates }) => {

    const [fromDate, toDate] = dates;


    const columns = [
        { 
            name: "SNo", label: "S.No",
            options: {
                filter: false,
                setCellProps: () => ({style: {whiteSpace:'nowrap', verticalAlign: 'top', textAlign:"left", maxWidth:'10px'}}),
                setCellHeaderProps: () => ({style: {whiteSpace:'nowrap', maxWidth:'10px'}}) 
            },
            alwaysVisible: true
        },
        { 
            name: 'user', 
            label: 'User ID',
            options: { 
                filter: true,
                filterType: 'dropdown',  
                filterList: userID === 'All' || !userID ? [] : [userID],
                customBodyRender: (value) => (
                    <Link underline="hover" target="_blank" rel="noopener noreferrer" href={`https://github.albertsons.com/${value}`}>{value}</Link>
                ),        
                customFilterListOptions: {render: v =>  `User ID: ${v}`},    
                setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top', textAlign:"left"} }),
                setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap'} })
            },
            alwaysVisible: true
        },
        { 
            name: 'portfolio', 
            label: 'Portfolio',
            options: {  
                filter: true,
                filterType: 'dropdown',
                filterList: port === 'All' || !port ? [] : [port],
                customFilterListOptions: {render: v =>  `Portfolio: ${v}`},                    
                setCellProps: () => ({ style: { whiteSpace: 'normal', verticalAlign: 'top', textAlign: 'left', maxWidth:'140px'}}),
                setCellHeaderProps: () => ({ style: { whiteSpace:'nowrap' } })
            },
            alwaysVisible: true       
        },
        { 
            name: 'display_name', 
            label: 'Full Name',
            options: {  
                filter: true,
                filterType: 'textField',
                customFilterListOptions: {render: v =>  `Full name: ${v}`},                    
                setCellProps: () => ({ style: { whiteSpace: 'normal', verticalAlign: 'top', textAlign: 'left', maxWidth:'100px'}}),
                setCellHeaderProps: () => ({ style: { whiteSpace:'nowrap' } })
            },
            alwaysVisible: true       
        },  
        { 
            name: 'job_title', 
            label: 'Title',
            options: {  
                filter: true,
                filterType: 'textField',
                customFilterListOptions: {render: v =>  `Title: ${v}`},                    
                setCellProps: () => ({ style: { whiteSpace: 'normal', verticalAlign: 'top', textAlign: 'left', maxWidth:'160px'}}),
                setCellHeaderProps: () => ({ style: { whiteSpace:'nowrap' } })
            },
            alwaysVisible: true       
        },
        { 
            name: 'vp', 
            label: 'Department',
            options: {  
                filter: true,
                filterType: 'dropdown',
                filterList: selectVP === 'All' || !selectVP ? [] : [selectVP],
                customFilterListOptions: {render: v =>  `Department: ${v}`},                    
                setCellProps: () => ({ style: { whiteSpace: 'normal', verticalAlign: 'top', textAlign: 'left', maxWidth:'140px'}}),
                setCellHeaderProps: () => ({ style: { whiteSpace:'nowrap' } })
            },
            alwaysVisible: true       
        }, 
        { 
            name: 'director', 
            label: 'Team',
            options: {  
                filter: true,
                filterType: 'dropdown',
                filterList: selectDirector === 'All' || !selectDirector ? [] : [selectDirector],
                customFilterListOptions: {render: v =>  `Team: ${v}`},                    
                setCellProps: () => ({ style: { whiteSpace: 'normal', verticalAlign: 'top', textAlign: 'left', maxWidth:'140px'}}),
                setCellHeaderProps: () => ({ style: { whiteSpace:'nowrap' } })
            },
            alwaysVisible: true       
        }, 
        { 
            name: 'manager', 
            label: 'Line Manager',
            options: {  
                filter: true,
                filterType: 'dropdown',  
                filterList: selectManager === 'All' || !selectManager ? [] : [selectManager],
                customFilterListOptions: {render: v =>  `Line Manager: ${v}`},                    
                setCellProps: () => ({ style: { whiteSpace: 'normal', verticalAlign: 'top', textAlign: 'left', maxWidth:'110px'}}),
                setCellHeaderProps: () => ({ style: { whiteSpace:'nowrap' } })
            },
            alwaysVisible: true       
        },
        { 
            name: 'user_status', 
            label: 'User Status',
            options: { 
                filter: true,
                filterType: 'dropdown',  
                filterList: status === 'All' || !status ? [] : [status],
                customFilterListOptions: {render: v =>  `User Status: ${v}`},    
                setCellProps: () => ({ style: { whiteSpace: 'normal', verticalAlign: 'top', textAlign: 'left', maxWidth:'80px'}}),
                setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' }})
            },
            alwaysVisible: true 
        },        
        {
            name: "weeks",
            label: "Contributions",
            options:{
                filter: false,
                customBodyRender: (value, tableMeta) => {
                    if(value === null){
                        return "Not Available";
                    }
                    return <ToolTipBox data={tableMeta.rowData[9]} />;
                },
                setCellProps: () => ({style: {whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'left'}}),
                setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}})
            },
            alwaysVisible: false
        }, 
        { 
            name: 'totalCommitContributions', 
            label: (<>
                No. of  Commits
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
                filterType: 'textField',
                customFilterListOptions: {render: v =>  `No. of Commits: ${v}`},                    
                setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top', textAlign: 'center',maxWidth:'80px'} }),
                setCellHeaderProps: () => ({ style: { whiteSpace:'normal', minWidth:'80px', maxWidth:'80px' } })
            },
            alwaysVisible: true            
        },
        { 
            name: 'totalIssueContributions', 
            label: 'No. of Issues' ,
            options: {  
                filter: true,
                filterType: 'textField',
                customFilterListOptions: {render: v =>  `No. of Issues: ${v}`},                    
                setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top', textAlign: 'center',maxWidth:'80px'} }),
                setCellHeaderProps: () => ({ style: { whiteSpace:'normal', minWidth:'80px', maxWidth:'80px' } })
            },
            alwaysVisible: true            
        },
      
        { 
            name: 'totalPullRequestContributions', 
            label: (<>
                No. of Pull Requests
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
                filterType: 'textField',
                customFilterListOptions: {render: v =>  `No. of Pull Requests: ${v}`},                    
                setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top', textAlign: 'center',maxWidth:'80px'} }),
                setCellHeaderProps: () => ({ style: { whiteSpace:'normal', minWidth:'80px', maxWidth:'80px' } })
            },
            alwaysVisible: true            
        },
        { 
            name: 'totalPullRequestReviewContributions', 
            label: 'No. of PR Reviews' ,
            options: {  
                filter: true,
                filterType: 'textField',
                customFilterListOptions: {render: v =>  `No. of PR Reviews: ${v}`},                    
                setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top', textAlign: 'center',maxWidth:'80px'} }),
                setCellHeaderProps: () => ({ style: { whiteSpace:'normal', minWidth:'80px', maxWidth:'80px' } })
            },
            alwaysVisible: true            
        },
        { 
            name: 'totalContributions', 
            label: 'Total Contributions' ,
            options: {  
                filter: true,
                filterType: 'textField',
                customFilterListOptions: {render: v =>  `Total Contributions: ${v}`},                    
                setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top', textAlign: 'center',maxWidth:'80px'} }),
                setCellHeaderProps: () => ({ style: { whiteSpace:'normal', minWidth:'80px', maxWidth:'80px' } })
            },
            alwaysVisible: true            
        },  
        { 
            name: 'git_push_count', 
            label: 'No. of Code Pushes' ,
            options: {  
                filter: true,
                filterType: 'textField',
                customFilterListOptions: {render: v =>  `No. of Pushes: ${v}`},                    
                setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top', textAlign: 'center',maxWidth:'80px'} }),
                setCellHeaderProps: () => ({ style: { whiteSpace:'normal', minWidth:'80px', maxWidth:'80px' } })
            },
            alwaysVisible: true            
        },
          
    ];


    const options = {
        fixedHeader: true,
        filter: true,
        responsive: 'vertical',
        tableBodyHeight: 'auto',
        rowsPerPage: 15,
        rowsPerPageOptions: [15,25,50,100],
        sort: true,
        textLabels: {
            body: {
                toolTip: "Sort",
                columnHeaderTooltip: column => {
                  return column.name === "totalCommitContributions" || column.name === "totalPullRequestContributions" ? '' : 'Sort';
                }
            }
        },
        downloadOptions: {
            filename: "User Contributions.csv",
            filterOptions: {
            useDisplayedColumnsOnly: true,
            useDisplayedRowsOnly: true,
            }
        }
    }


    return (
        <Box>
            {/* TABLE */}
            <Box className="table" style={{
                width: '100%', 
                height: 'auto'
            }}>
                <MUIDataTable
                    title={<span className="custom-table-title">User Contributions from ( {fromDate} - {toDate} ) </span>}
                    data={input}
                    columns={columns.filter(column => column.alwaysVisible || showCol)}
                    options={options}
                    className="custom-table"
                    components={{
                      TableFilterList: (props) => (
                        toDate && <LastUpdatedOnComponent props={props} date={toDate}/>
                      )
                    }}
                />
            </Box>
        </Box>
    );

}

export default UserTable;