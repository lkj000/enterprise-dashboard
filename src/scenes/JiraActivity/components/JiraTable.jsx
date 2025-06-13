import {React, useState, useEffect, useRef} from "react";
import {Box, CircularProgress, IconButton} from '@mui/material';
import MUIDataTable from "mui-datatables";
import AddchartOutlinedIcon from '@mui/icons-material/AddchartOutlined';
import DialogBox from "../../../common-components/DialogBox";
import JiraLineChart from "../../../components/JiraLineChart";
import ExpandableRow from "./ExpandableRow";
import { isMatch, LastUpdatedOnComponent } from "../../../utils";
import '../../global/custom-table.css';


function searchHandleTable(input, searchText) {
    return input.filter(item => Object.values(item).some(value => isMatch(value, searchText)));
}


const JiraTable = ({ input, lastRun, selectedPortfolio, selectedVP, selectedDirector, selectedManager, IssueColumn, StoryColumn, theme, colors }) => {

    const [filteredData, setFilteredData] = useState(input);
    const [openIssueDialog, setOpenIssueDialog] = useState(false);
    const [openStoryDialog, setOpenStoryDialog] = useState(false);
    const [selectedData, setSelectedData] = useState([]);
    const [tableSearch, setTableSearch] =  useState('');
    const [loading, setLoading] = useState(false);
    const timeoutId = useRef(null);

    useEffect(() => {
        if(tableSearch){
            setFilteredData(filteredData);
        }else{
            setFilteredData(input);
        }
    }, [input, tableSearch, filteredData]);

    const handleOpenIssueDialog = (data) => {
        setSelectedData(data);
        setOpenIssueDialog(true);
    }

    const handleOpenStoryDialog = (data) => {
        setSelectedData(data);
        setOpenStoryDialog(true);
    }

    const handleIssueClose = () => {
        setOpenIssueDialog(false);
    }

    const handleStoryClose = () => {
        setOpenStoryDialog(false);
    }


    const columns = [
        {
            name: "user",
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
            name: "job_title",
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
            options:{
                filter: true,
                filterType: 'dropdown',
                filterList: selectedVP === "All" || !selectedVP ? [] : [selectedVP],
                customFilterListOptions: {render: v =>  `Department: ${v}`},
                setCellProps: () => ({style: {whiteSpace:'nowrap', verticalAlign: 'top'}}),
                setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}}),
                display: false
            } 
        }, 
        {
            name: "director",
            label: "Team",
            options:{
                filter: true,
                filterType: 'dropdown',
                filterList: selectedDirector === "All" || !selectedDirector ? [] : [selectedDirector],
                customFilterListOptions: {render: v =>  `Team: ${v}`},
                setCellProps: () => ({style: {whiteSpace:'nowrap', verticalAlign: 'top'}}),
                setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}}),
                display: false
            } 
        }, 
        {
            name: "portfolio",
            label: "Portfolio",
            options:{
                filter: true,
                filterType: 'dropdown',
                filterList: selectedPortfolio === "All" || !selectedPortfolio ? [] : [selectedPortfolio],
                customFilterListOptions: {render: v =>  `Portfolio: ${v}`},
                setCellProps: () => ({style: {whiteSpace:'nowrap', verticalAlign: 'top'}}),
                setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}})
            },
            alwaysVisible: true 
        }, 
        {
            name: "manager",
            label: "Line Manager",
            options: {  
                filter: true,
                filterType: 'dropdown',
                filterList: selectedManager === "All" || !selectedManager ? [] : [selectedManager],
                customFilterListOptions: {render: v =>  `Line Manager: ${v}`},         
                setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top' } }),
                setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' } })           
            },
            alwaysVisible: true   
        },
        {
            name: "total",
            label: "Total Issues",
            options: {
                filterType: 'textField',
                filter: true,
                sort: true,
                setCellProps: () => ({ style: { whiteSpace: 'normal', verticalAlign: 'top'  } }),
                setCellHeaderProps: () => ({ style: { whiteSpace: 'normal' } }),
                display: IssueColumn
            }
        },
        
        {
            name: "closed",
            label: "Total Closed Issues",
            options: {
                filterType: 'textField',
                filter: true,
                sort: true,
                setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top', textAlign: 'center'  } }),
                setCellHeaderProps: () => ({ style: { whiteSpace: 'normal', minWidth:'110px', maxWidth:'110px' } }),
                display: IssueColumn
            }
        },
        {
            name:"totalStoryPoint",
            label: "Total Issue Points",
            options: {
                filterType: 'textField',
                filter: true,
                sort: true,
                setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top', textAlign: 'center' } }),
                setCellHeaderProps: () => ({ style: {whiteSpace:'normal', minWidth:'130px', maxWidth:'130px'} }),
                display: IssueColumn
            },
        },
        {
            name:"totalStoryPointsClosed",
            label: "Total Issues Points",
            options: {
                filterType: 'textField',
                filter: true,
                sort: true,
                setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top', textAlign: 'center' } }),
                setCellHeaderProps: () => ({ style: {whiteSpace:'normal', minWidth:'140px', maxWidth:'140px'} }),
                display: IssueColumn
            }
        },
        {
            name:"StoryPointPerIssue",
            label: "Story Points per Issue",
            options: {
                filterType: 'textField',
                filter: true,
                sort: true,
                setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top', textAlign: 'center' } }),
                setCellHeaderProps: () => ({ style: {whiteSpace:'normal', minWidth:'110px', maxWidth:'110px'} }),
                display: IssueColumn
            }
        },
        {
            name:"averageLeadTime",
            label: "Average Lead Time (Issues)",
            options: {
                filterType: 'textField',
                filter: true,
                sort: true,
                setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top', textAlign: 'center', paddingLeft: '0px' } }),
                setCellHeaderProps: () => ({ style: {whiteSpace:'normal', minWidth:'120px', maxWidth:'120px'} }),
                display: IssueColumn
            }
        },
        {
            name:"averageCycleTime",
            label: "Average Cycle Time (Issues)",
            options: {
                filterType: 'textField',
                filter: true,
                sort: true,
                setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top', textAlign: 'center', paddingLeft: '0px' } }),
                setCellHeaderProps: () => ({ style: {whiteSpace:'normal', minWidth:'120px', maxWidth:'120px'} }),
                display: IssueColumn
            }
        },
        {
            name: "weeklyData",
            label: "Issue Closure Graph",
            options:{
                filter: false,
                customBodyRender: (value, tableMeta) => {
                    if(value === null){
                        return null;
                    }
                    const chart1 = [], chart2 = [], data = tableMeta.rowData[13];
                    for(let i=data.length-1; i>=0; i--){
                        chart1.push({   "x": data[i].date,  "y": data[i][`week${i+1}closed`]   });
                        chart2.push({   "x": data[i].date,  "y": data[i].closedpoints   });
                    }
                    const chartData = [
                       { "id":"Total Closed Issues", "color":"#7FC97F", "data": chart1 },
                       { "id":"Closed Issues Points", "color":"#E35335", "data": chart2 }
                    ];
                    return <IconButton variant="contained" color="secondary"
                        onClick={() => handleOpenIssueDialog(chartData)}>
                            <AddchartOutlinedIcon />
                    </IconButton>
                },
                setCellProps: () => ({style: {whiteSpace:'nowrap', verticalAlign: 'top', paddingTop: '4px' }}),
                setCellHeaderProps: () => ({style: {whiteSpace:'normal', minWidth:'130px', maxWidth:'130px'}}),
                display: IssueColumn
            }
        },
        {
            name:"total_stories",
            label: "Total Stories",
            options: {
                filterType: 'textField',
                filter: true,
                sort: true,
                setCellProps: () => ({ style: { whiteSpace: 'normal', verticalAlign: 'top' } }),
                setCellHeaderProps: () => ({ style: {whiteSpace:'normal'} }),
                display: StoryColumn
            }
        },
        {
            name:"total_closed_stories",
            label: "Total Closed Stories",
            options: {
                filterType: 'textField',
                filter: true,
                sort: true,
                setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top', textAlign: 'center' } }),
                setCellHeaderProps: () => ({ style: {whiteSpace:'normal', minWidth:'110px', maxWidth:'110px'} }),
                display: StoryColumn
            }
        },
        {
            name:"total_story_points",
            label: "Total Story Points",
            options: {
                filterType: 'textField',
                filter: true,
                sort: true,
                setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top', textAlign: 'center', paddingTop: '16px' } }),
                setCellHeaderProps: () => ({ style: {whiteSpace:'normal', minWidth:'130px', maxWidth:'130px'} }),
                display: StoryColumn
            }
        },
        {
            name:"total_closed_story_points",
            label: "Total Closed Story Points",
            options: {
                filterType: 'textField',
                filter: true,
                sort: true,
                setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top', textAlign: 'center' } }),
                setCellHeaderProps: () => ({ style: {whiteSpace:'normal', minWidth:'140px', maxWidth:'140px'} }),
                display: StoryColumn
            }
        },
        {
            name:"StoryPointPerStory",
            label: "Story Points per Story",
            options: {
                filterType: 'textField',
                filter: true,
                sort: true,
                setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top', textAlign: 'center' } }),
                setCellHeaderProps: () => ({ style: {whiteSpace:'normal', minWidth:'110px', maxWidth:'110px'} }),
                display: StoryColumn
            }
        },
        {
            name:"averageStoryLeadTime",
            label: "Average Lead Time (Stories)",
            options: {
                filterType: 'textField',
                filter: true,
                sort: true,
                setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top', textAlign: 'center', paddingLeft: '0px' } }),
                setCellHeaderProps: () => ({ style: {whiteSpace:'normal', minWidth:'120px', maxWidth:'120px'} }),
                display: StoryColumn
            }
        },
        {
            name:"averageStoryCycleTime",
            label: "Average Cycle Time (Stories)",
            options: {
                filterType: 'textField',
                filter: true,
                sort: true,
                setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top', textAlign: 'center', paddingLeft: '0px' } }),
                setCellHeaderProps: () => ({ style: {whiteSpace:'normal', minWidth:'120px', maxWidth:'120px'} }),
                display: StoryColumn
            }
        },
        {
            name: "",
            label: "Story Closure Graph",
            options:{
                filter: false,
                customBodyRender: (value, tableMeta) => {
                    if(value === null){
                        return null;
                    }
                    const chart1 = [], chart2 = [], data = tableMeta.rowData[13];
                    for(let i=data.length-1; i>=0; i--){
                        chart1.push({   "x": data[i].date,  "y": data[i].week_story_count   });
                        chart2.push({   "x": data[i].date,  "y": data[i].weeks_closed_story_points  });
                    }
                    const storyChartData = [
                        { "id":"Total Closed Stories", "color":"#7FC97F", "data": chart1 },
                        { "id":"Closed Story Points", "color":"#E35335", "data": chart2 }
                    ];
                    return <IconButton variant="contained" color="secondary"
                        onClick={() => handleOpenStoryDialog(storyChartData)}>
                            <AddchartOutlinedIcon />
                    </IconButton>
                },
                setCellProps: () => ({style: {whiteSpace:'nowrap', verticalAlign: 'top', paddingTop: '4px' }}),
                setCellHeaderProps: () => ({style: {whiteSpace:'normal', minWidth:'130px', maxWidth:'130px'}}),
                display: StoryColumn
            }
        }
    ];
 
    const options = {
        expandableRows: true,
        expandableRowsHeader: false,
        expandableRowsOnClick: false,
        renderExpandableRow: (rowData, rowMeta) => <ExpandableRow rowMeta={rowMeta} input={filteredData} theme={theme} />,
        onSearchChange: (searchText) => {
            if (!searchText) {
                return;
            }

            if (timeoutId.current) {
                clearTimeout(timeoutId.current);
            }
            setLoading(true);
            timeoutId.current = setTimeout(() => {
                setTableSearch(searchText);
                const searchResult = searchHandleTable(input, searchText);
                setFilteredData(searchResult);
                setLoading(false);
            }, 1900);
        },
        customSearch: () => {
            return true;
        },
        onSearchClose: () => {
            setFilteredData(input);
            setTableSearch('');
        },
        rowsExpanded: tableSearch.length > 0 ? filteredData.map((item, index) => index) : [],
        fixedHeader: true,
        filter: true,
        responsive: 'vertical',
        tableBodyHeight: 'auto',
        rowsPerPage: 15,
        rowsPerPageOptions: [15,25,50,100],
        sort: true,
        sortOrder: {
            name: 'dateCreated',
            direction: 'desc'
        },
        downloadOptions: {
            filename: "User-Jira Activity.csv",
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
                height: 'auto',
                marginTop: '50px',
                position: 'relative'
            }}>
                {loading && 
                    <Box position="absolute" top="50%" left="50%" style={{ transform: 'translate(-50%, -50%)', zIndex: 9999 }}>
                        <CircularProgress color="inherit" />
                    </Box>
                }
                <MUIDataTable
                    title={<span className="custom-table-title">TEAM ASSIGNMENT</span>}
                    data={filteredData}
                    columns={columns}
                    options={options}
                    className="custom-table-perform"
                    components={{
                      TableFilterList: (props) => (
                        lastRun && <LastUpdatedOnComponent props={props} date={lastRun}/>
                      )
                    }}
                />

                {/* DIALOG - ISSUE */}
                <DialogBox 
                    title="ISSUE CLOSURE HISTORY FOR LAST 11 WEEKS"
                    openDialog={openIssueDialog}
                    handleClose={handleIssueClose}
                    styleClass={{ flex: 1, overflowX: 'auto', overflowY: 'hidden', position: 'relative' }}
                    px='15px'
                    width='1200px'
                    colors={colors}
                >
                    <JiraLineChart chartData={selectedData} colorType={['#50C878','#E35335']} marginCss={[45,150,110,120]} legendX="Weeks" legendY="Value" maxValue={true} XaxisRotate={-25} legendTextBottom={100} legendTextRight={30} legendXOffset={90} legendWidth="100px" />
                </DialogBox>

                {/* DIALOG - STORY */}
                <DialogBox
                    title="STORY CLOSURE HISTORY FOR LAST 11 WEEKS"
                    openDialog={openStoryDialog}
                    handleClose={handleStoryClose}
                    styleClass={{ flex: 1, overflowX: 'auto', overflowY: 'hidden', position: 'relative' }}
                    px='15px'
                    width='1200px'
                    colors={colors}
                >
                    <JiraLineChart chartData={selectedData} colorType={['#50C878','#E35335']} marginCss={[45,150,110,120]} legendX="Weeks" legendY="Value" maxValue={true} XaxisRotate={-25} legendTextBottom={100} legendTextRight={30} legendXOffset={90} legendWidth="100px" />
                </DialogBox>
            </Box>
        </Box>
    );

}

export default JiraTable;