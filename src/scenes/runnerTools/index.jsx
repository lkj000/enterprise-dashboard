import {React} from "react";
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import { tokens } from "../../theme";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Header from "../../components/Header";
import { PackageVM } from "../../data/PackageVM";

//Workflow table (style)
const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
      fontSize: 15, 
      fontWeight: 600,
      top: 0,
      position: 'sticky', 
      zIndex: 10,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 15
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({theme}) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  }));

const RunnerTools = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    //VM-App
    const packageAppLength = PackageVM[0].length;
    var VMApp = [];
    for(let i=0; i<packageAppLength ;i++){
        VMApp.push(PackageVM[0][i]);
    }

  // VM -table header
  var headerHostName = [];
  for(let i=0; i< VMApp.length; i++){
    headerHostName.push(VMApp[i].hostname);
  }

  // VM - Table Tools(Name)
  var tools = Object.keys(VMApp[0]), toolsName= [];
  for(let i=1; i< tools.length; i++){
    toolsName.push(tools[i]);
  }

  //VM - Table Tools(version)
  var toolsVersion = [];
  for(let i=0; i< VMApp.length; i++){
    var arrayVersion = [];
    for(let j=1; j< tools.length; j++){
      arrayVersion.push(Object.values(VMApp[i])[j]);
    }
    toolsVersion.push(arrayVersion);
  }

    //VM APP TABLE
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const isMediumScreen = useMediaQuery(theme.breakpoints.between('md','lg'));
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('xl'));
    
    let tableHeight = 700;
    if(isSmallScreen){
        tableHeight = 400;
    }else if(isMediumScreen){
        tableHeight = 800;
    }else if(isLargeScreen){
        tableHeight = 'auto';
    }
        

    return (
        <Box m="25px">

        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Header title="Runner Tools" subtitle="Overview" />
        </Box>

        {/* RUNNER TOOL */}
        <TableContainer sx={{ width: '100%', boxShadow: 3, height: tableHeight }}>
          <Table sx={{ minWidth: 750 }} >
           <TableHead style={{ background : colors.tertiary[700] }}>
            <TableRow>
              <StyledTableCell 
                  align="left" 
                  style={{ 
                    background : colors.tertiary[700],
                    width: '20px',
                    borderBottom: 'none',
                    left: 0,
                    position: 'sticky',
                    zIndex: 99
                  }}
                >
                  <Typography 
                    fontSize="15px"
                    fontWeight="600"
                  > 
                    Tools
                  </Typography>
                </StyledTableCell>
                { headerHostName.map((hostname,index) => {

                    return(
                    <StyledTableCell
                    key={index}
                    align="left" 
                    style={{ 
                        background : colors.tertiary[700],
                        width: '20px'
                    }}
                    >
                    <Typography 
                        fontSize="15px"
                        fontWeight="600"
                    > 
                        {hostname}
                    </Typography>
                    </StyledTableCell>
                )})}
              </TableRow>
            </TableHead>

            <TableBody>
              {toolsName.map((tools,index) => {
                return (
                  <StyledTableRow key={index}>
                    <StyledTableCell
                      key={index}
                      align="left" 
                      component="th" 
                      scope="row"
                      style={{ 
                        left: 0,
                        position: 'sticky',
                        zIndex: 1,
                        background : colors.tertiary[700],
                        borderBottom: 'none'
                      }}
                    >
                      <Typography fontSize="15px" fontWeight="600"> {tools} </Typography>
                    </StyledTableCell>
                    {Array.from(Array(headerHostName.length)).map((_, index1) => (
                      <StyledTableCell align="left" key={index1}>
                        {toolsVersion[index1][index] !== " " && toolsVersion[index1][index] !== null ? toolsVersion[index1][index] : "-"}
                      </StyledTableCell>
                    ))}
                  </StyledTableRow>
                )})}
            </TableBody>
          </Table>
        </TableContainer>
            
        </Box>
    );
};

export default RunnerTools;