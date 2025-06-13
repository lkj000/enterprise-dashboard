import { React, useState } from "react";
import { Box, IconButton, Link } from '@mui/material';
import MUIDataTable from "mui-datatables";
import AddchartOutlinedIcon from '@mui/icons-material/AddchartOutlined';
import DialogBox from "../../../../common-components/DialogBox";
import MultiLineChart from "../../../../components/MultiLineChart";
import { LastUpdatedOnComponent } from "../../../../utils";
import '../../../global/custom-table.css';


const RepoTable = ({ input, dates, port, selectVP, director, owner, selectAppcode, userID, colors }) => {

    const [ selectedData, setSelectedData ] = useState([]);
    const [ openDialog, setOpenDialog ] = useState(false);
   
    const handleOpenDialog = (data) => {
      setSelectedData(data);
      setOpenDialog(true);
    }
  
    const handleClose = () => {
      setOpenDialog(false);
    }

    const columns = [
        { 
            name: "index", label: "S.No",
            options: {
                filter: false,
                setCellProps: () => ({style: {whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'left'}}),
                setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}})
            }
        },
        {
            name: "Portfolio",
            label: "Portfolio",
            options: {
                filterType: 'dropdown',
                filterList: port === "All" || !port ? [] : [port],
                customFilterListOptions: { render: v => `Portfolio: ${v}` },
                setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top', textAlign: 'left'} }),
                setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' } })
            }
        },
        {
            name: "VP",
            label: "Department",
            options: {
                filterType: 'dropdown',
                filterList: selectVP === "All" || !selectVP ? [] : [selectVP],
                customFilterListOptions: { render: v => `Department: ${v}` },
                setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top', textAlign: 'left'} }),
                setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' } })
            }
        },
        {
            name: "department",
            label: "Team",
            options: {
                filterType: 'dropdown',
                filterList: director === "All" || !director ? [] : [director],
                customFilterListOptions: { render: v => `Team: ${v}` },
                setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top', textAlign: 'left'} }),
                setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' } })
            }
        },
        {
            name: "AppOwner",
            label: "App Owner",
            options: {
                filterType: 'dropdown',
                filterList: owner === "All" || !owner ? [] : [owner], 
                customFilterListOptions: {render: v =>  `AppOwner: ${v}`},
                setCellProps: () => ({style: {whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'left'}}),
                setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}})
            }
        },
        {
            name: "appcode",
            label: "App Code",
            options: {
                filterType: 'dropdown',
                filterList: selectAppcode === "All" || !selectAppcode ? [] : [selectAppcode], 
                customBodyRender: (value) => {
                    if(value === "PLATFORM" || value === "platform" || value === "Platform"){
                        return value;
                    }
                    return <Link underline="hover" target="_blank" rel="noopener noreferrer" href={`https://safeway.service-now.com/cii?searchin=applications&search=${value}`}>{value}</Link>
                },
                customFilterListOptions: {render: v =>  `AppCode: ${v}`},
                setCellProps: () => ({style: {whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'left'}}),
                setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}})
            }
        },
        {
            name: "user",
            label: "UserID",
            options:{
                filterType: 'dropdown',
                filterList: userID === "All" || !userID ? [] : [userID] ,
                customBodyRender: (value) => (
                    <Link underline="hover" target="_blank" rel="noopener noreferrer" href={`https://github.albertsons.com/${value}`}>{value}</Link>
                ),
                customFilterListOptions: {render: v =>  `UserID: ${v}`}, 
                setCellProps: () => ({style: {whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'left'}}),
                setCellHeaderProps: () => ({style: {whiteSpace:'nowrap',textAlign: 'left'}})
            }
        },
        {
            name: "display_name",
            label: "Full Name",
            options:{
                filter: true,
                filterType: 'textField',
                customFilterListOptions: {render: v =>  `fullname: ${v}`}, 
                setCellProps: () => ({style: {whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'left'}}),
                setCellHeaderProps: () => ({style: {whiteSpace:'normal',textAlign: 'left'}})
            }
        },
        {
            name: "job_title",
            label: "Title",
            options:{
                filter: true,
                filterType: 'textField',
                customFilterListOptions: {render: v =>  `Title: ${v}`}, 
                setCellProps: () => ({style: {whiteSpace:'normal', verticalAlign: 'top', textAlign: 'left'}}),
                setCellHeaderProps: () => ({style: {whiteSpace:'normal',textAlign: 'left'}})
            }
        },
        {
            name: "manager",
            label: "Line Manager",
            options:{
                filter: true,
                filterType: 'dropdown',
                customFilterListOptions: {render: v =>  `lineManager: ${v}`}, 
                setCellProps: () => ({style: {whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'left'}}),
                setCellHeaderProps: () => ({style: {whiteSpace:'normal',textAlign: 'left'}})
            }
        },
        {
            name: "total_commits",
            label: "Total No. of Commits for Default branch in Appcode",
            options:{
                filter: true,
                filterType: 'textField',
                customFilterListOptions: {render: v =>  `Total No.of Commits (Default Branch): ${v}`},
                setCellProps: () => ({style: {whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'center'}}),
                setCellHeaderProps: () => ({style: {whiteSpace:'normal', minWidth:'125px', maxWidth:'125px'}})
            }
        },
        {
            name: "four_week_total_commits",
            label: "No. of Commits in last 4 weeks",
            options:{
                filter: true,
                filterType: 'textField',
                customBodyRender: (value) => {
                    if(value === null || isNaN(value)){
                        return null;
                    }
                    return value;
                },
                customFilterListOptions: {render: v =>  `No.of Commits-last 4 weeks: ${v}`},
                setCellProps: () => ({style: {whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'center'}}),
                setCellHeaderProps: () => ({style: {whiteSpace:'normal', minWidth:'100px', maxWidth:'100px'}})
            }
        },
        {
            name: "four_week_total_additions",
            label: "No. of Additions in last 4 weeks",
            options:{
                filter: true,
                filterType: 'textField',
                customBodyRender: (value) => {
                    if(value === null || isNaN(value)){
                        return null;
                    }
                    return value;
                },
                customFilterListOptions: {render: v =>  `No.of Additions-last 4 weeks: ${v}`},
                setCellProps: () => ({style: {whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'center'}}),
                setCellHeaderProps: () => ({style: {whiteSpace:'normal', minWidth:'100px', maxWidth:'100px'}})
            }
        },
        {
            name: "four_week_total_deletions",
            label: "No. of Deletions in last 4 weeks",
            options:{
                filter: true,
                filterType: 'textField',
                customBodyRender: (value) => {
                    if(value === null || isNaN(value)){
                        return null;
                    }
                    return value;
                },
                customFilterListOptions: {render: v =>  `No.of Deletions-last 4 weeks: ${v}`},
                setCellProps: () => ({style: {whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'center'}}),
                setCellHeaderProps: () => ({style: {whiteSpace:'normal', minWidth:'100px', maxWidth:'100px'}})
            }
        },
        {
            name: "appcode_total_weekly_commits",
            label: "Last 12 weeks commits",
            options: {
                filter: false,            
                setCellProps: () => ({style: {whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'center', paddingTop: '6px'}}),
                setCellHeaderProps: () => ({style: {whiteSpace:'normal', minWidth:'100px', maxWidth:'100px'}}),
                display: false
            }
        },
        {
            name: "appcode_total_weekly_additions",
            label: "Last 12 weeks additions",
            options: {
                filter: false,            
                setCellProps: () => ({style: {whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'center', paddingTop: '6px'}}),
                setCellHeaderProps: () => ({style: {whiteSpace:'normal', minWidth:'100px', maxWidth:'100px'}}),
                display: false
            }
        },
        {
            name: "appcode_total_weekly_deletions",
            label: "Last 12 weeks deletions",
            options: {
                filter: false,            
                setCellProps: () => ({style: {whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'center', paddingTop: '6px'}}),
                setCellHeaderProps: () => ({style: {whiteSpace:'normal', minWidth:'100px', maxWidth:'100px'}}),
                display: false
            }
        },
        {
            name: "commitGraph",
            label: "Commit History (Last 12 weeks)",
            options: {
                filter: false,
                customBodyRender: (value, tableMeta) => {
                    const chartData = ["Commits", "Additions", "Deletions"].map((id, index) => ({
                      "id": id,
                      "data": tableMeta.rowData[index + 14].map((value, j) => ({
                          x: `Week ${j + 1}`,
                          y: value,
                        })),
                      }));
                    return  <IconButton variant="contained" color="secondary"
                        onClick={() => handleOpenDialog(chartData)}>
                            <AddchartOutlinedIcon />
                    </IconButton>
                },
                setCellProps: () => ({style: {whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'center', paddingTop: '6px'}}),
                setCellHeaderProps: () => ({style: {whiteSpace:'normal', minWidth:'100px', maxWidth:'100px'}}),
                display: true
            }
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
        downloadOptions: {
            filename: "App Code Activity.csv",
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
            data={input}
            columns={columns}
            options={options}
            className="custom-table"
            components={{
              TableFilterList: (props) => (
                dates && <LastUpdatedOnComponent props={props} date={dates}/>
              )
            }}
          />
        </Box>

        {/* DIALOG */}
        <DialogBox 
          title="HISTORY FOR LAST 12 WEEKS"
          openDialog={openDialog}
          handleClose={handleClose}
          styleClass={{ flex: 1, overflowX: 'hidden', overflowY: 'hidden', position: 'relative' }}
          width="1200px"
          px={0}
          colors={colors}
        >
         <MultiLineChart data={selectedData} dataLegend="Weeks" labelY="# of Commits" fixedData={true} XaxisRotate={-45} graphCss={[50,100,110,80]} translateX={120} />
        </DialogBox>
      </Box>
    );

}

export default RepoTable;