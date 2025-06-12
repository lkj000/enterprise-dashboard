import { React, useState }  from 'react';
import { Box, useTheme, useMediaQuery, List, Divider, ListItem, ListItemButton, ListItemText, Chip, Link, Typography, IconButton, TextField, InputAdornment } from '@mui/material';
import { DebounceInput } from 'react-debounce-input';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import MUIDataTable from "mui-datatables";
// import { styled } from '@mui/system';
// import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
// import { saveAs } from "file-saver";
// import * as XLSX from 'xlsx';
import '../scenes/global/custom-table.css';
import { tokens } from "../theme";

// const useStyles = styled((theme) => ({
//     runnersList: {
//         borderBottom: '0.1px solid #BEBDB8',
//         '&.Mui-selected': {
//             borderRight: '4px solid #2e7c67'
//         }
//     }
// }))

const Runners = ({input}) => {

    // const classes = useStyles();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [selectedIndex, setSelectedIndex] = useState('0');
    const [search, setSearch] = useState("");
    const [jsonData, setJsonData] = useState(input);
    const [checkState, setCheckState] = useState(0);
    const list_data=input;


    const handleClick = (_event, index) => {
      setSelectedIndex(index);
    }

    const handleSearch = (e) => {
        if(e.target.value === ""){
            setSearch(e.target.value);
            setJsonData(input);
            setSelectedIndex('0');
            setCheckState(0);
        }else{
            setSearch(e.target.value);
            const searchTerm = list_data.filter(item => item.name.toLowerCase().includes(e.target.value.trim().toLowerCase()));
            if(searchTerm.length > 0){
                setSearch(e.target.value);
                setJsonData(searchTerm);
                setSelectedIndex(searchTerm[0].index);
                setCheckState(0);
            }else{
                setSearch(e.target.value);
                setJsonData(input);
                setSelectedIndex('0');
                setCheckState(1);
            }
        }
        setSearch(e.target.value);
    }

    //RUNNERS GROUP TABLE-BODY (SIZE)
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const isMediumScreen = useMediaQuery(theme.breakpoints.between('md','lg'));
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('xl'));
    
    let tableHeight = "700px", DataTableHeight = "auto" ;
    if(isSmallScreen){
        tableHeight = "400px";
        // DataTableHeight = "200px";
    }else if(isMediumScreen){
        tableHeight = "800px";
        // DataTableHeight = "500px";
    }else if(isLargeScreen){
        tableHeight = "1500px";
        // DataTableHeight = "1000px";
        // tableHeight = 'auto';
    }

    //Table
    var columns = [
        { 
            name: "id", label: "S.No",
            options: {
                filter: false,
                setCellProps: () => ({style: {whiteSpace:'nowrap', verticalAlign: 'top'}}),
                setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}})
            }
        },
        {
            name: "runnerName",
            label: "Runners Name",
            options:{
                filter: true,
                filterType: 'textField',
                customFilterListOptions: {render: v =>  `RunnersName: ${v}`},
                setCellProps: () => ({style: {whiteSpace:'nowrap', verticalAlign: 'top'}}),
                setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}})
            }
        },
        {
            name: "label",
            label: "Label",
            options: {
                filterType: 'textField',
                customFilterListOptions: {render: v =>  `Label: ${v}`},
                customBodyRender: (value) => (
                    <div>
                        {value.split(',').map((item,index) => (
                            <Chip key={index} label={item}  style={{ marginRight: '5px' }} />
                        ))}
                    </div>
                ),
                setCellProps: () => ({style: {whiteSpace:'nowrap', verticalAlign: 'top'}}),
                setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}})
            }
        },
    ];

    // //Excel Header
    // const runner_header = [
    //     { label: 'S.No', key: 'id'},
    //     { label: 'Runners Name', key: 'runnerName'},
    //     { label: 'Label', key: 'label'}
    // ]


    // //Excel Download
    // const downloadXLSX = (tableState) => {
    //     const filterData = tableState.displayData.map((row) => row.data.map((cell,idx) => {
    //         if(idx === 2){
    //             var all_data = cell.props.children[0].props.label ;
    //             for(let i=0; i< cell.props.children.length; i++){
    //                 if(i>0){
    //                     all_data = all_data + ' , ' + cell.props.children[i].props.label; 
    //                 }
    //             }
    //             return all_data;
    //         }
    //         return cell;
    //     }));
    //     const ws = XLSX.utils.json_to_sheet(filterData);

    //     //columns
    //     runner_header.forEach((header,index) => {
    //         const cellRef = XLSX.utils.encode_cell({ r: 0, c:index});
    //         ws[cellRef] = { v: header.label};
    //       })
        
    //       ws['!cols'] =[ {width: 10}, {width: 20}, {width: 80} ];
    
    //     const wb = XLSX.utils.book_new();
    //     XLSX.utils.book_append_sheet(wb, ws, input[selectedIndex].name);
    //     const blob = new Blob(
    //         [XLSX.write(wb, { bookType: "xlsx", type: "array"})],
    //         {
    //             type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    //         }
    //     );
    //     saveAs(blob,"Runner Groups.xlsx")
    // }

    var options = {
        fixedHeader: true,
        filter: true,
        responsive: 'vertical',
        tableBodyHeight: DataTableHeight,
        rowsPerPage: 15,
        rowsPerPageOptions: [10,15,25,50],
        sort: true,
        downloadOptions: {
            filename: "runners.csv",
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
    };


  return (
    <Box             
      display="flex"
      flexDirection="column" 
      sx={{ width: '100%'}}
    >
        <DebounceInput
            sx={{ marginBottom : '20px', width: '400px'}}
            element={TextField}
            placeholder="Search"
            type="text"
            variant="outlined"
            // fullWidth
            size="small"
            color="secondary"
            onChange={handleSearch}
            value={search}
            InputProps={{
            startAdornment: (
            <InputAdornment position="start">
                <SearchOutlinedIcon />
            </InputAdornment>
            ),

            endAdornment: search && (
            <IconButton
                onClick={() => {setSearch(""); setJsonData(input); setSelectedIndex('0'); setCheckState(0); }}
            ><CloseOutlinedIcon/></IconButton>
            )
            }}
        />
        {checkState === 1 && (<Typography fontSize="16px"> No Runner groups found</Typography>)}
        <Box sx={{
            width: '100%',
            height: tableHeight,
            marginTop: '10px',
            boxShadow: 3,
            overflow: 'auto',
            display: 'flex',
            background: colors.primary[400]
        }}>
        <List sx={{
            width: '100%',
            maxHeight: tableHeight,
            maxWidth: 200,
            // minWidth: 200,
            position: 'relative',
            overflow: 'auto',
            paddingTop: '0px',
            paddingBottom: '0px',
            fontSize: '16px',
            fontWeight:'medium'
        }}>
            {jsonData.map((text) => (
              <ListItem key={text.name} disablePadding >
                <ListItemButton 
                  selected={selectedIndex === text.index} 
                  onClick={(_event)=> handleClick(_event,text.index)}
                //   className={classes.runnersList}
                style={{
                    borderBottom: '0.1px solid #BEBDB8',
                    borderRight: selectedIndex === text.index ? '4px solid #2e7c67': ''
                  }}
                >
                  <ListItemText primary={text.name.toUpperCase()} />
                </ListItemButton>
              </ListItem>
            ))}  
            </List>
            <Divider orientation="vertical" sx={{ maxHeight: tableHeight }} />
            <Box style={{
                width: '100%',
                minWidth: 200,
                // maxHeight: tableHeight,
                margin: '20px',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative'
            }}>
                <Typography  variant="h3" fontWeight="bold" sx={{ marginTop: '10px', marginBottom: '30px'}}>{parseInt(selectedIndex) + 1})&nbsp;&nbsp;
                <Link
                    href={input[selectedIndex].url} 
                    color="inherit" 
                    underline="hover" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'underline' }}
                >
                    {input[selectedIndex].name}
                </Link>
                </Typography>
                <Box style={{
                    width: '100%',
                    // height: 'auto',
                    position: 'relative',
                    overflow: 'auto'
                }}>
                    <MUIDataTable
                        // title={<span className="custom-table-title"></span>}
                        data={input[selectedIndex].runners}
                        columns={columns}
                        options={options}
                        className="custom-table"
                    />
                </Box>
            </Box>
      </Box>
    </Box>

  );
};

export default Runners;