import {React, useState} from "react";
import { Box, Link, IconButton, Dialog, useTheme, AppBar, Toolbar, Typography } from '@mui/material';
// import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
// import { saveAs } from "file-saver";
// import * as XLSX from 'xlsx';
import { tokens } from "../../theme";
import AddchartOutlinedIcon from '@mui/icons-material/AddchartOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import MUIDataTable from "mui-datatables";
import LineChartXY from "../../components/LineChartXY";
import Header from "../../components/Header";
import '../global/custom-table.css';
import { repoBuildArchetype as RepoArchetype } from "../../data/repoBuildArchetype";
import RunTime from "../../data-json/allRepoRuntimeData.json";
import { WorkflowList } from "../../data/workflowList";
import FullScatterChart from "../../components/FullScatterChart";

const FullPerformance = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [ openDialog, setOpenDialog ] = useState(false);
    const [ selectedData, setSelectedData ] = useState([]);

    const handleOpenDialog = (data) => {
        setSelectedData(data);
        setOpenDialog(true);
    }

    const handleClose = () => {
        setOpenDialog(false);
    }


    //DATA
    //Added Archetype column data
    WorkflowList.forEach((item) => {
        item.archetype = null;
        item.workflowRunFile = null;
        item.workflowRuns = null;
        item.MinRunID = null;
        item.durationMIN = null;
        item.durationMEDIAN = null;
        item.durationMAX = null;
        item.MaxRunID = null;
        item.chart = null;
    })
    
    for(let i=0; i< RepoArchetype.length; i++){
        for(let j=0; j< WorkflowList.length; j++){
            if(RepoArchetype[i].repository === WorkflowList[j].RepositoryName){
                WorkflowList[j].archetype = RepoArchetype[i].archetype;
            }
        }
    }

    //Added Workflow, Min Run, Max Run
    var processData = [], count = 0;
    for(let i=0; i< RunTime.length; i++){
        for(let j=0; j< WorkflowList.length; j++){
            if(RunTime[i].repository === WorkflowList[j].RepositoryName){
                var workflowSize = RunTime[i].workflows;
                if(workflowSize.length !== 0){
                    for(let k=0; k< workflowSize.length; k++){
                        processData[count] = {
                            sNo: count+1,
                            appCode : WorkflowList[j].appCode,
                            portfolio : WorkflowList[j].Portfolio,
                            RepositoryName : WorkflowList[j].RepositoryName,
                            archetype : WorkflowList[j].archetype,
                            workflowRunFile : workflowSize[k].workflow,
                            workflowRuns : parseInt(workflowSize[k].workflowRuns),
                            MinRunID : parseInt(workflowSize[k].min_run_id),
                            durationMIN : parseInt(workflowSize[k].min_run_time),
                            durationMEDIAN : parseInt(workflowSize[k].median_run_time),
                            durationMAX : parseInt(workflowSize[k].max_run_time),
                            MaxRunID : parseInt(workflowSize[k].max_run_id),
                            chart : workflowSize[k].total_workflow_runs
                        }
                        count++;
                    }
                }else {
                    processData[count] = WorkflowList[j];
                    processData[count]['sNo'] = count+1;
                    processData[count]['portfolio'] = WorkflowList[j].Portfolio;
                    count++;
                }


                // var workflowSize = RunTime[i].workflows;
                // var sum = (workflowSize.length !== 0) ? (workflowSize[0].workflow) : null;
                // var sum1 = (workflowSize.length !== 0) ? (workflowSize[0].workflowRuns) : null;
                // var sum2 = (workflowSize.length !== 0) ? (workflowSize[0].min_run_id) : null;
                // var sum3 = (workflowSize.length !== 0) ? (workflowSize[0].min_run_time) : null;
                // var sum4 = (workflowSize.length !== 0) ? (workflowSize[0].median_run_time) : null;
                // var sum5 = (workflowSize.length !== 0) ? (workflowSize[0].max_run_time) : null;
                // var sum6 = (workflowSize.length !== 0) ? (workflowSize[0].max_run_id) : null;
                
                // if(workflowSize.length === 0 || workflowSize.length === 1){
                //     WorkflowList[j].workflowRunFile = sum;
                //     WorkflowList[j].workflowRuns = sum1;
                //     WorkflowList[j].MinRunID = sum2;
                //     WorkflowList[j].durationMIN = sum3;
                //     WorkflowList[j].durationMEDIAN = sum4;
                //     WorkflowList[j].durationMAX = sum5;
                //     WorkflowList[j].MaxRunID = sum6;
                // }else if(workflowSize.length > 1){
                //     for(let k=0; k< workflowSize.length; k++){
                //         if(k>0){
                //             sum = sum + "," +  workflowSize[k].workflow;
                //             sum1 = sum1 + "," +  workflowSize[k].workflowRuns;
                //             sum2 = sum2 + "," +  workflowSize[k].min_run_id;
                //             sum3 = sum3 + "," +  workflowSize[k].min_run_time;
                //             sum4 = sum4 + "," +  workflowSize[k].median_run_time;
                //             sum5 = sum5 + "," +  workflowSize[k].max_run_time;
                //             sum6 = sum6 + "," +  workflowSize[k].max_run_id;
                //         }
                //     }
                //     WorkflowList[j].workflowRunFile = sum;
                //     WorkflowList[j].workflowRuns = sum1;
                //     WorkflowList[j].MinRunID = sum2;
                //     WorkflowList[j].durationMIN = sum3;
                //     WorkflowList[j].durationMEDIAN = sum4;
                //     WorkflowList[j].durationMAX = sum5;
                //     WorkflowList[j].MaxRunID = sum6;
                // }
            }
            //IF RUNTIME IS NOT MATCHED WITH WORKFLOW LIST REPO
            // else{
            //     processData[count] = WorkflowList[j];
            //     processData[count]['sNo'] = count+1;
            //     count++;
            // }
        }
    }


    //COLUMNS
    const columns = [
    { 
        name: "sNo", label: "S.No",
        options: {
            filter: false,
            setCellProps: () => ({style: {whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'left'}}),
            setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}})
        }
    },
    {
        name: "portfolio",
        label: "Portfolio",
        options: {
            customFilterListOptions: {render: v =>  `Portfolio: ${v}`},
            setCellProps: () => ({style: {whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'left'}}),
            setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}})
        }
    },
    {
        name: "appCode",
        label: "App Code",
        options: {
            filterType: 'multiselect',
            customBodyRender: (value) => {
                if(value === "PLATFORM" || value === "platform" || value === "Platform"){
                    return value;
                }
                return <Link underline="hover" target="_blank" rel="noopener noreferrer" href={`https://safeway.service-now.com/cii?searchin=applications&search=${value}`}>{value}</Link>
            },
            customFilterListOptions: {render: v =>  `AppCode: ${v}`},
            setCellProps: () => ({style: {whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'left'}}),
            setCellHeaderProps: () => ({style: {whiteSpace:'nowrap', textAlign: 'left'}})
        }
    },
    {
        name: "RepositoryName",
        label: "Repository Name",
        options:{
            filter: true,
            customBodyRender: (value) => (
                <Link underline="hover" target="_blank" rel="noopener noreferrer" href={`https://github.albertsons.com/${value}`}>{value}</Link>
            ),
            filterType: 'textField',
            customFilterListOptions: {render: v =>  `RepositoryName: ${v}`},
            setCellProps: () => ({style: {whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'left'}}),
            setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}})
        }
    },
    {
        name: "archetype",
        label: "Archetype",
        options:{
            filterType: 'multiselect',
            customFilterListOptions: {render: (v) =>  (v === null ? 'Archetype: Empty' : `Archetype: ${v}`)}, 
            setCellProps: () => ({style: {whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'left'}}),
            setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}})
        }
    },
    {
        name: "workflowRunFile",
        label: "Workflow Run File",
        options:{
            filterType: 'textField',
            customFilterListOptions: {render: v =>  `Workflow Run File: ${v}`}, 
            customBodyRender: (value, tableMeta) => {
                const repoName = tableMeta.rowData[3].split('/')[1];
                return <Link underline="hover" target="_blank" rel="noopener noreferrer" href={`https://github.albertsons.com/albertsons/${repoName}/actions/workflows/${value}`}>{value}</Link>
            },
            setCellProps: () => ({style: {whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'left'}}),
            setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}})
        }
    },
    {
        name: "workflowRuns",
        label: "Workflow Run",
        options:{
            filterType: 'textField',
            customFilterListOptions: {render: v =>  `Workflow Run: ${v}`}, 
            customBodyRender: (value) => {
                if(value === null){
                    return null;
                }
                // const parts = value.split(',').map((item,index) => (
                //     <div key={index}>{item}</div>
                // ))
                // return <div>{parts}</div>;
                return value;
            },
            setCellProps: () => ({style: {whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'center'}}),
            setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}})
        }
    },
    {
        name: "MinRunID",
        label: "MIN Run ID",
        options:{
            filterType: 'textField',
            customFilterListOptions: {render: v =>  `MIN RunID: ${v}`}, 
            customBodyRender: (value, tableMeta) => {
                if(value === null){
                    return null;
                }
                const repoName = tableMeta.rowData[3];
                const runID = tableMeta.rowData[7];
                // const parts = value.split(',').map((item,index) => {
                //    return <div key={index}>
                //        <Link underline="hover" target="_blank" rel="noopener noreferrer" href={`https://github.albertsons.com/${repoName}/actions/runs/${item}`}>{item}</Link>
                //    </div>
                // })
                // return <div>{parts}</div>;
                return <div>
                    <Link underline="hover" target="_blank" rel="noopener noreferrer" href={`https://github.albertsons.com/${repoName}/actions/runs/${runID}`}>{runID}</Link>
                </div>
            },
            setCellProps: () => ({style: {whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'center'}}),
            setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}})
        }
    },
    {
        name: "durationMIN",
        label: "Minimum Duration in Seconds (Last 30 Days)",
        options:{
            filterType: 'textField',
            customFilterListOptions: {render: v =>  `Minimum Duration: ${v}`},
            customBodyRender: (value) => {
                if(value === null){
                    return null;
                }
                // const parts = value.split(',').map((item,index) => (
                //     <div key={index}>{item}</div>
                // ))
                // return <div>{parts}</div>;
                return value;
            }, 
            setCellProps: () => ({style: {whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'center', minWidth:'150px', maxWidth:'150px'}}),
            setCellHeaderProps: () => ({style: {whiteSpace:'normal', minWidth:'200px', maxWidth:'200px'}})
        }
    },
    {
        name: "durationMEDIAN",
        label: "Median Duration in Seconds (Last 30 Days)",
        options:{
            filterType: 'textField',
            customFilterListOptions: {render: v =>  `Median Duration: ${v}`}, 
            customBodyRender: (value) => {
                if(value === null){
                    return null;
                }
                // const parts = value.split(',').map((item,index) => (
                //     <div key={index}>{item}</div>
                // ))
                // return <div>{parts}</div>;
                return value;
            },
            setCellProps: () => ({style: {whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'center', minWidth:'150px', maxWidth:'150px'}}),
            setCellHeaderProps: () => ({style: {whiteSpace:'normal',minWidth:'200px', maxWidth:'200px'}})
        }
    },
    {
        name: "durationMAX",
        label: "Maximum Duration in Seconds (Last 30 Days)",
        options:{
            filterType: 'textField',
            customFilterListOptions: {render: v =>  `Maximum Duration: ${v}`}, 
            customBodyRender: (value) => {
                if(value === null){
                    return null;
                }
                // const parts = value.split(',').map((item,index) => (
                //     <div key={index}>{item}</div>
                // ))
                // return <div>{parts}</div>;
                return value;
            },
            setCellProps: () => ({style: {whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'center', minWidth:'150px', maxWidth:'150px'}}),
            setCellHeaderProps: () => ({style: {whiteSpace:'normal', align:'center', minWidth:'220px', maxWidth:'220px'}})
        }
    },
    {
        name: "MaxRunID",
        label: "MAX Run ID",
        options:{
            filterType: 'textField',
            customFilterListOptions: {render: v =>  `MAX RunID: ${v}`}, 
            customBodyRender: (value, tableMeta) => {
                if(value === null){
                    return null;
                }
                const repoName = tableMeta.rowData[3];
                const runID = tableMeta.rowData[11];
                // const parts = value.split(',').map((item,index) => {
                //    return <div key={index}>
                //        <Link underline="hover" target="_blank" rel="noopener noreferrer" href={`https://github.albertsons.com/${repoName}/actions/runs/${item}`}>{item}</Link>
                //    </div>
                // })
                // return <div>{parts}</div>;
                return <div>
                    <Link underline="hover" target="_blank" rel="noopener noreferrer" href={`https://github.albertsons.com/${repoName}/actions/runs/${runID}`}>{runID}</Link>
                </div>
            },
            setCellProps: () => ({style: {whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'center'}}),
            setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}})
        }
    },
    {
        name: "chart",
        label: "Historical Graph View",
        options:{
            filterType: 'textField',
            filter: false,
            // customFilterListOptions: {render: v =>  `Graph View: ${v}`}, 
            customBodyRender: (value, tableMeta) => {
                if(value === null){
                    return null;
                }
                const chartData = tableMeta.rowData[12];
                return <IconButton variant="contained" color="secondary"
                    onClick={() => handleOpenDialog(chartData)}>
                        <AddchartOutlinedIcon />
                </IconButton>
            },
            setCellProps: () => ({style: {whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'center'}}),
            setCellHeaderProps: () => ({style: {whiteSpace:'normal', minWidth:'150px', maxWidth:'150px'}})
        }
    }
    ];

    // //Excel Header
    // const GHA_header = [
    //     { label: 'S.No', key: 'sNo'},
    //     { label: 'App Code', key: 'appCode'},
    //     { label: 'App Name', key: 'appName'},
    //     { label: 'Repository Name', key: 'RepositoryName' },
    //     { label: 'Archetype', key: 'archetype' },
    //     { label: 'Workflow Run File', key: 'workflowRunFile'},
    //     { label: 'Workflow Run', key: 'workflowRuns'},
    //     { label: 'MIN Run ID', key: 'MinRunID'},
    //     { label: 'Minimum Duration in Seconds (Last 30 Days)', key: 'durationMIN'},
    //     { label: 'Median Duration in Seconds (Last 30 Days)', key: 'durationMEDIAN'},
    //     { label: 'Maximum Duration in Seconds (Last 30 Days)', key: 'durationMAX'},
    //     { label: 'MAX Run ID', key: 'MaxRunID'}
    // ]

    // //Excel Download
    // const downloadXLSX = (tableState) => {
    //     const filterData = tableState.displayData.map((row) => row.data.map((cell,idx) => {
    //         if(idx === 3){
    //            return {t: 's', v: cell.props.children, l:{Target: cell.props.href, Tooltip: cell.props.href}}
    //         }else if(idx === 5 ||  idx === 6 || idx === 8 || idx === 9 || idx === 10){
    //             if(cell === null){
    //                 return cell;
    //             }else{
    //                 var all_data = cell.props.children[0].props.children;
    //                 for(let i=0; i< cell.props.children.length; i++){
    //                     if(i>0){
    //                         all_data = all_data + ', ' + cell.props.children[i].props.children; 
    //                     }
    //                 }
    //                 return all_data;
    //             }
    //         }else if(idx === 7 || idx === 11){
    //             if(cell !== null){
    //                var allrun_data = cell.props.children[0].props.children.props.children;
    //                for(let i=0; i< cell.props.children.length; i++){
    //                     if(i>0){
    //                         allrun_data = allrun_data + ', ' + cell.props.children[i].props.children.props.children; 
    //                     }
    //                } 
    //                return allrun_data;
    //             }
    //         }
    //         return cell;
    //     }));
    //     const ws = XLSX.utils.json_to_sheet(filterData);

    //     //columns
    //     GHA_header.forEach((header,index) => {
    //         const cellRef = XLSX.utils.encode_cell({ r: 0, c:index});
    //         ws[cellRef] = { v: header.label};
    //       })
        
    //       ws['!cols'] =[ {width: 10}, {width: 10}, {width: 30}, {width: 50}, {width: 20}, {width: 40}, {width: 20}, {width: 20}, {width: 20}, {width: 20}, {width: 20}, {width: 20} ];
    
    //     const wb = XLSX.utils.book_new();
    //     XLSX.utils.book_append_sheet(wb, ws, "Performance");
    //     const blob = new Blob(
    //         [XLSX.write(wb, { bookType: "xlsx", type: "array"})],
    //         {
    //             type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    //         }
    //     );
    //     saveAs(blob,"Performance.xlsx")
    // }
        
    const options = {
        fixedHeader: true,
        filter: true,
        responsive: 'vertical',
        tableBodyHeight: 'auto',
        rowsPerPage: 15,
        rowsPerPageOptions: [15,25,50,100],
        sort: true,
        sortOrder: {
            name: 'workflowRuns',
            direction: 'desc'
        },
        downloadOptions: {
            filename: "Performance.csv",
            filterOptions: {
            useDisplayedColumnsOnly: true,
            useDisplayedRowsOnly: true,
            }
        }
        // download: false,
        // customToolbar: (tableState) => {
        //     return(
        //         <span>
        //             <Tooltip title="Download XLSX">
        //                 <IconButton
        //                 variant="contained"
        //                 type="button"
        //                 color="white"
        //                 aria-label="download"
        //                 onClick={() => downloadXLSX(tableState)}
        //                 >
        //                     <CloudDownloadIcon/>
        //                 </IconButton>
        //             </Tooltip>
        //         </span>
        //     )
        // }
    }


    return (
    <Box m="25px">

        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Header title=" Full Performance" subtitle="Overview" />
        </Box>

        {/* HeatMap */}
        <Box display="flex" justifyContent="space-between" alignItems="center" sx={{positionLeft:15}}>
            <FullScatterChart allRepoRuntimeData={RunTime} />
        </Box>

        {/* TABLE */}
        <Box className="table" style={{
            width: '100%', 
            height: 'auto'
        }}>
            <MUIDataTable
                // title={<span className="custom-table-title">PERFORMANCE</span>}
                data={processData}
                columns={columns}
                options={options}
                className="custom-table-perform"
            />
            <Dialog 
              open={openDialog}
              onClose={handleClose}
              maxWidth="lg"
            >
                <AppBar position="sticky" color="primary">
                    <Toolbar>
                        <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                            HISTORY FOR LAST 30 DAYS
                        </Typography>
                        <IconButton
                          size="large"
                          edge="end"
                        //   variant="contained"
                          color="inherit"
                          onClick={() => setOpenDialog(false)}
                        >
                            <HighlightOffOutlinedIcon fontSize="large" />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <div style={{ flex: 1, overflowX: 'auto', overflowY: 'hidden', position: 'relative'}}>
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        width='1200px'
                        height="400px"
                        m="0px"
                        backgroundColor={colors.primary[400]}
                    >
                        <LineChartXY input={selectedData.sort((a, b) => a.x - b.x)} dataLegend="Run ID" labelX="Duration" labelY="Duration (in seconds)" zAxis={true} XaxisRotate={-45} />
                    </Box>
                </div>
            </Dialog>
        </Box>
    </Box>
    );
};

export default FullPerformance;
