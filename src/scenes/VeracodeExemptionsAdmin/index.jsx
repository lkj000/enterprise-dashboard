import { React, useState } from "react";
import { Box, useMediaQuery, useTheme, Autocomplete, TextField, Typography, Link, Grid } from '@mui/material';
import MUIDataTable from "mui-datatables";
import Header from "../../components/Header";
// import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
// import { saveAs } from "file-saver";
// import * as XLSX from 'xlsx';
import { tokens } from "../../theme";
import '../global/custom-table.css';
import PortfolioChart from "../../components/PortfolioChart";
import StackBarChart from "../../components/StackBarChart"; 
import { VeracodeList as VeracodeData } from "../../data/veracodeContinueList";
import { WorkflowList as WorkflowData } from "../../data/workflowList";

const VeracodeExemptionsAdmin = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    var repoList = ["ospg-payments-D","OSPG-PaymentTokenService-D"]; //(Not included)
    var WorkflowList = WorkflowData.filter(item => !repoList.includes(item.appName));
    var VeracodeList= [];
    VeracodeList[0] = VeracodeData[0].filter(item => !repoList.includes(item.RepositoryName));

    const [selectedPortfolio, setSelectedPortfolio] = useState('All');
    const [selectedDepartment, setSelectedDepartment] = useState('All');
    const [selectedAppCode, setSelectedAppCode] = useState('All');
    const [selectedAppOwner, setSelectedAppOwner] = useState('All'); 
    
    // const [dataPie, setDataPie] =useState([]);

    const handleDataPie = (data) => {
    //    setDataPie(data);
        //center value
        if (typeof (data) === "string") {
            setSelectedPortfolio(data);
        } else {
            //pie chart value
            setSelectedPortfolio(data.filterName);
        }
    }

    //Map the values of the portfolios
    const mapping = {
        'cloud-platform-and-engineering': 'COG (Jim Saber)',
        'observability': 'COG (Jim Saber)',
        'intelligent-automation': 'COG (Jim Saber)',
        'client-services': 'COG (Jim Saber)',
        'enterprise-architecture': 'COG (Jim Saber)',
        'network-services': 'COG (Jim Saber)',
        'cloud-and-it-operations': 'COG (Jim Saber)',
        'developer-enablement': 'COG (Jim Saber)',
        'it-operations': 'COG (Jim Saber)',
        'merchandising': 'Digital (Ramiya Iyer)',
        'digital-marketing': 'Digital (Ramiya Iyer)',
        'data-management': 'Digital (Ramiya Iyer)',
        'pharmacy-health-and-wellness': 'Digital (Ramiya Iyer)',
        'digital-customer-experience': 'Digital (Ramiya Iyer)',
        'digital-fulfillment': 'Digital (Ramiya Iyer)',
        'digital-loyalty': 'Digital (Ramiya Iyer)',
        'digital-collective': 'Digital (Ramiya Iyer)',
        'digital-shopper-experience': 'Digital (Ramiya Iyer)',
        'corporate-services': 'Digital (Ramiya Iyer)',
        'workforce-talent-and-payroll-mgmt': 'Digital (Ramiya Iyer)',
        'supply-chain': 'Retail & Supply Chain (Maria Latushkin)',
        'retail-operations': 'Retail & Supply Chain (Maria Latushkin)',
        'customer-service': 'Retail & Supply Chain (Maria Latushkin)',
        'information-security':'Information Security (Aaron Hughes)',
        'security-technology':'Information Security (Aaron Hughes)'
    };

    // const [totalRepos, setTotalRepos] = useState(WorkflowList.length);
    // const [totalExemptions, setTotalExemptions] = useState(VeracodeList[0].length);

    const totalRepos = VeracodeList[0].length;
    //WorkflowList.length;
    const totalExemptions = VeracodeList[0].length;


    var Common = [
        { id: "Total Veracode Exceptions" , value: totalExemptions, label: `Total Veracode Exceptions (${totalExemptions})`},
        { id: "Total Repos Without Exceptions " , value: totalRepos-totalExemptions, label: `Total Repos Without Exceptions (${totalRepos-totalExemptions})` }
    ];

    const matchingCogValues = Object.keys(mapping).filter(key => mapping[key] === "COG (Jim Saber)");
    const matchingCogVeracode =VeracodeList[0].filter(item => matchingCogValues.includes(item.Department)).length;
    const matchingCogCount = matchingCogVeracode;
    //WorkflowList.filter(item => matchingCogValues.includes(item.Department)).length;
    // const matchingCogVeracode = '483';
    //VeracodeList[0].filter(item => matchingCogValues.includes(item.Department)).length;

    var Cog = [
        { id: "Total Veracode Exceptions" , value: matchingCogVeracode, label: `Total Veracode Exceptions (${matchingCogVeracode})`},
        { id: "Total Repos Without Exceptions " , value: matchingCogCount-matchingCogVeracode, label: `Total Repos Without Exceptions (${matchingCogCount-matchingCogVeracode})` }
    ];

    const matchingDigValues = Object.keys(mapping).filter(key => mapping[key] === "Digital (Ramiya Iyer)");
    const matchingDigVeracode = VeracodeList[0].filter(item => matchingDigValues.includes(item.Department)).length;
    const matchingDigCount = matchingDigVeracode;
    // const matchingDigVeracode = '1274';
    // WorkflowList.filter(item => matchingDigValues.includes(item.Department)).length;
    //VeracodeList[0].filter(item => matchingDigValues.includes(item.Department)).length;

    var Dig = [
        { id: "Total Veracode Exceptions" , value: matchingDigVeracode, label: `Total Veracode Exceptions (${matchingDigVeracode})`},
        { id: "Total Repos Without Exceptions " , value: matchingDigCount-matchingDigVeracode, label: `Total Repos Without Exceptions (${matchingDigCount-matchingDigVeracode})` }
    ];

    const matchingRetValues = Object.keys(mapping).filter(key => mapping[key] === "Retail & Supply Chain (Maria Latushkin)");
    const matchingRetVeracode = VeracodeList[0].filter(item => matchingRetValues.includes(item.Department)).length;
    const matchingRetCount = matchingRetVeracode;
    // const matchingRetCount = '849'
    //WorkflowList.filter(item => matchingRetValues.includes(item.Department)).length;
    // const matchingRetVeracode ='849';
    // VeracodeList[0].filter(item => matchingRetValues.includes(item.Department)).length;

    var Ret = [
        { id: "Total Veracode Exceptions" , value: matchingRetVeracode, label: `Total Veracode Exceptions (${matchingRetVeracode})`},
        { id: "Total Repos Without Exceptions " , value: matchingRetCount-matchingRetVeracode, label: `Total Repos Without Exceptions (${matchingRetCount-matchingRetVeracode})` }
    ];

    const keysForSelectedValue = selectedPortfolio ? Object.keys(mapping).filter(key => mapping[key] === selectedPortfolio) : [];

    //getting data by department
    const getCountsByPortfolioValue = (data) => {
        const counts = {};
      
        data.forEach(item => {
          if (counts[item.Department]) {
            counts[item.Department]++;
          } else {
            counts[item.Department] = 1;
          }
        });
      
        return counts;
    }

    //Build Data for stack bar chart
    const buildStackBarStructure = (total, exemptions) => {
        const totalCounts = getCountsByPortfolioValue(total);
        const exemptionsCounts = getCountsByPortfolioValue(exemptions);
      
        const PortfolioValues = new Set([...Object.keys(totalCounts), ...Object.keys(exemptionsCounts)].filter(key => keysForSelectedValue.length === 0 || keysForSelectedValue.includes(key))); // All unique Portfolio values
      
        return [...PortfolioValues].map(pValue => {
            const total = totalCounts[pValue] || 0;
            const exemptions = exemptionsCounts[pValue] || 0;
            if (total === exemptions) {
                return {
                    "Portfolio": pValue,
                    "exemptions": exemptions
                }
              }
          
              return {
                "Portfolio": pValue,
                "total": total-exemptions,
                "exemptions": exemptions
              };          
        });
    }

    const stackBarChartData = buildStackBarStructure(WorkflowList, VeracodeList[0]);

    //Find if PORTFOLIO has EXEMPTION / ELSE No Bar Graph
    var findBarChartExemption = 0;
    stackBarChartData.forEach(inc => {
        findBarChartExemption = findBarChartExemption + inc.exemptions;
    });

    const handleBarClick = (barData) => {        
        setSelectedDepartment(barData.data.Portfolio);
    }
    
    //Portfolio Filter
    var TablePortfolioFilter = [];
    if (selectedPortfolio === 'All' || selectedPortfolio === null || selectedPortfolio === '') {
        TablePortfolioFilter = [];
    } else {
        TablePortfolioFilter[0] = selectedPortfolio;
    }

    //Department Filter
    var TableDepartmentFilter = [];
    if (selectedDepartment === 'All' || selectedDepartment === null || selectedDepartment === '') {
        TableDepartmentFilter = [];
    } else {
        TableDepartmentFilter[0] = selectedDepartment;
    }

    //AppCode Filter
    var TableAppcodeFilter = [];
    if (selectedAppCode === 'All' || selectedAppCode === null || selectedAppCode === '') {
        TableAppcodeFilter = [];
    } else {
        TableAppcodeFilter[0] = selectedAppCode;
    }

    //AppOwner Filter
    var TableAppOwnerFilter = [];
    if (selectedAppOwner === 'All' || selectedAppOwner === null || selectedAppOwner === '') {
        TableAppOwnerFilter = [];
    } else {
        TableAppOwnerFilter[0] = selectedAppOwner;
    }

    //VERACODE TABLE-BODY (SIZE)
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const isMediumScreen = useMediaQuery(theme.breakpoints.between('md', 'lg'));
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('xl'));

    let tableHeight = "auto", dropdownHeight = "280px";
    if (isSmallScreen) {
        // tableHeight = "400px";
        dropdownHeight = "100px";
    } else if (isMediumScreen) {
        // tableHeight = "800px";
        dropdownHeight = "400px";
    } else if (isLargeScreen) {
        // tableHeight = '2000px';
        dropdownHeight = "400px";
    }

    //DATA
    var portArray = VeracodeList.flat().map((item) => item.Portfolio);
    var dptArray = VeracodeList.flat().map((item) => item.Department);
    var appCodeArray = VeracodeList.flat().map((item) => item.appCode);
    var appOwnerArray = VeracodeList.flat().map((item) => item.appOwner);
    
    //Remove empty & undefined data from array
    var newPortArray = portArray.reduce((acc, i) => i ? [...acc, i] : acc, []);
    var newDPTArray = dptArray.reduce((acc, i) => i ? [...acc, i] : acc, []);
    var newAppCodeArray = appCodeArray.reduce((acc, i) => i ? [...acc, i] : acc, []);
    var newAppOwnerArray = appOwnerArray.reduce((acc, i) => i ? [...acc, i] : acc, []);

    //remove duplicate & sort + Filter
    var filterPortfolio = ([...new Set(newPortArray)]).sort();
    filterPortfolio.unshift('All');

    var newDpt = ([...new Set(newDPTArray)]).sort();

    var newAppCode = ([...new Set(newAppCodeArray)]).sort();
    var filterAppcode = [];
    newAppCode.forEach(item => {
        filterAppcode.push(item);
    });
    filterAppcode.unshift('All');

    var newAppOwner = ([...new Set(newAppOwnerArray)]).sort();
    var filterAppOwner = [];
    newAppOwner.forEach(item => {
        filterAppOwner.push(item);
    });
    filterAppOwner.unshift('All');

    //Option - Filter Dpt based on Portfolio
    var filterDpt = [], x = 0, cog = 0, digital = 0, retail = 0, info = 0;
    var filterCOG = [], filterDIGITAL = [], filterRETAIL = [], filterINFO = [];
    for(let i = 0; i < newDpt.length; i++){
        filterDpt[x] = newDpt[i];
        x++;
        if(newDpt[i] === "cloud-platform-and-engineering" || newDpt[i] === "observability" || newDpt[i] === "intelligent-automation" || newDpt[i] === "client-services" || newDpt[i] === "enterprise-architecture" || newDpt[i] === "network-services" || newDpt[i] === "cloud-and-it-operations" || newDpt[i] === "developer-enablement" || newDpt[i] === "it-operations"){
            filterCOG[cog] = newDpt[i];
            cog++;
        }else if(newDpt[i] === "merchandising" || newDpt[i] === "digital-marketing" || newDpt[i] === "data-management" || newDpt[i] === "pharmacy-health-and-wellness" || newDpt[i] === "digital-customer-experience" || newDpt[i] === "digital-fulfillment" || newDpt[i] === "digital-loyalty" || newDpt[i] === "digital-collective" || newDpt[i] === "digital-shopper-experience" || newDpt[i] === "corporate-services" || newDpt[i] === "workforce-talent-and-payroll-mgmt"){
            filterDIGITAL[digital] = newDpt[i];
            digital++;
        } else if (newDpt[i] === "supply-chain" || newDpt[i] === "retail-operations" || newDpt[i] === "customer-service") {
            filterRETAIL[retail] = newDpt[i];
            retail++;
        } else if (newDpt[i] === "information-security" || newDpt[i] === "security-technology"){
            filterINFO[info] = newDpt[i];
            info++;
        }
    }

    var finalDPTFilter = [];
    if(selectedPortfolio === "COG (Jim Saber)"){
        for(let i=0; i < filterCOG.length; i++){
            finalDPTFilter.push(filterCOG[i])
        }
    }else if(selectedPortfolio === "Digital (Ramiya Iyer)"){
        for(let i=0; i < filterDIGITAL.length; i++){
            finalDPTFilter.push(filterDIGITAL[i])
        }  
    }else if(selectedPortfolio === "Retail & Supply Chain (Maria Latushkin)"){
        for(let i=0; i < filterRETAIL.length; i++){
            finalDPTFilter.push(filterRETAIL[i])
        }
    }else if(selectedPortfolio === "Information Security (Aaron Hughes)"){
        for(let i=0; i < filterINFO.length; i++){
            finalDPTFilter.push(filterINFO[i])
        }
    }else{
        for(let i=0; i < filterDpt.length; i++){
            finalDPTFilter.push(filterDpt[i])
        }
    }
    finalDPTFilter.unshift('All');

    //ROWS- [Get S.No data]
    const processData = VeracodeList[0].map((item, index) => {
        const { ...rest } = item;
        return { sNo: index+1, ...rest };
    });

    //COLUMNS
    const columns = [
        {
            name: "sNo", label: "S.No",
            options: {
                filter: false,
                setCellProps: () => ({style: {whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'center'}}),
                setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}})
            }
        },
        {
            name: "Portfolio",
            label: "Portfolio",
            options: {
                filterType: 'dropdown',
                filterList: TablePortfolioFilter,
                customFilterListOptions: { render: v => `Portfolio: ${v}` },
                setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top' } }),
                setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' } })
            }
        },
        {
            name: "Department",
            label: "Department",
            options: {
                filterType: 'dropdown',
                filterList: TableDepartmentFilter,
                customFilterListOptions: { render: v => `Department: ${v}` },
                setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top' } }),
                setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' } })
            }
        },
        {
            name: "appCode",
            label: "App Code",
            options: {
                filterType: 'dropdown',
                filterList: TableAppcodeFilter,
                customBodyRender: (value) => {
                    if(value === "PLATFORM" || value === "platform" || value === "Platform"){
                        return value;
                    }
                    return <Link underline="hover" target="_blank" rel="noopener noreferrer" href={`https://safeway.service-now.com/cii?searchin=applications&search=${value}`}>{value}</Link>
                },
                customFilterListOptions: { render: v => `App Code: ${v}` },
                setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top' } }),
                setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' } })
            }
        },
        {
            name: "appOwner",
            label: "App Owner",
            options: {
                filterType: 'dropdown',
                filterList: TableAppOwnerFilter,
                customFilterListOptions: { render: v => `App Owner: ${v}` },
                setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top' } }),
                setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' } })
            }
        },
        {
            name: "RepositoryName",
            label: "Repository Name",
            options: {
                filter: true,
                customBodyRender: (value) => (
                    <Link underline="hover" target="_blank" rel="noopener noreferrer" href={`https://github.albertsons.com/albertsons/${value}`}>{`albertsons/${value}`}</Link>
                ),
                filterType: 'textField',
                customFilterListOptions: {render: v =>  `Repository Name: ${v}`},
                setCellProps: () => ({style: {whiteSpace:'nowrap', verticalAlign: 'top' }}),
                setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}})
            }
        },
    ];

    // //Excel Header
    // const veracode_header = [
    //     { label: 'S.No', key: 'sNo'},
    //     { label: 'Portfolio', key: 'Portfolio'},
    //     { label: 'Department', key: 'Department' },
    //     { label: 'App Code', key: 'appCode'},
    //     { label: 'App Owner', key: 'appOwner'},
    //     { label: 'Repository Name', key: 'RepositoryName' }
    // ]

    // //Excel Download
    // const downloadXLSX = (tableState) => {
    //     const filterData = tableState.displayData.map((row) => row.data.map((cell,idx) => {
    //         if(idx === 5){
    //            return {t: 's', v: cell.props.children, l:{Target: cell.props.href, Tooltip: cell.props.href}}
    //         }
    //         return cell;
    //     }));
    //     const ws = XLSX.utils.json_to_sheet(filterData);

    //     //columns
    //     veracode_header.forEach((header,index) => {
    //         const cellRef = XLSX.utils.encode_cell({ r: 0, c:index});
    //         ws[cellRef] = { v: header.label};
    //       })

    //       ws['!cols'] =[ {width: 10}, {width: 30}, {width: 30}, {width: 10}, {width: 30}, {width: 50} ];

    //     const wb = XLSX.utils.book_new();
    //     XLSX.utils.book_append_sheet(wb, ws, "Veracode_Exemptions");
    //     const blob = new Blob(
    //         [XLSX.write(wb, { bookType: "xlsx", type: "array"})],
    //         {
    //             type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    //         }
    //     );
    //     saveAs(blob,"Veracode-Exemptions.xlsx")
    // }

    const options = {
        fixedHeader: true,
        filter: true,
        responsive: 'vertical',
        tableBodyHeight: tableHeight,
        rowsPerPage: 15,
        rowsPerPageOptions: [15, 25, 50, 100],
        sort: true,
        sortOrder: {
            name: 'sNo',
            direction: 'desc'
        },
        downloadOptions: {
            filename: "VeracodeExemptions.csv",
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
                <Header title="Veracode Exemptions" subtitle="Overview" />
            </Box>

            {/* PORTFOLIO CHART */}
            <Box
                display="flex"
                marginBottom="20px"
                sx={{ width: '100%', height: 'auto' }}>
            <Grid container>
                <Grid item xs={12} sm={6} md={6} lg={3} sx={{ 
                    display: 'flex', 
                    flexDirection: 'row', 
                    justifyContent: 'space-evenly'
                }}>
                <Box
                display='flex'
                flexDirection='column'
                justifyContent='space-between'
                alignItems='center'
                >
                    <Typography
                        variant="h5"
                        fontWeight="600"
                        color={colors.grey[100]}
                    >
                        All Portfolio's
                    </Typography>
                    <Box sx={{ width: '280px', height: 400 }}>
                        <PortfolioChart data={Common} total={totalRepos} filterName="All" sendDataPie={handleDataPie} legendX={-68}/>
                    </Box>
                </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={3} sx={{ 
                    display: 'flex', 
                    flexDirection: 'row', 
                    justifyContent: 'space-evenly'
                }}>
                <Box
                display='flex'
                flexDirection='column'
                justifyContent='space-between'
                alignItems='center'
                >
                    <Typography
                        variant="h5"
                        fontWeight="600"
                        color={colors.grey[100]}
                    >
                        COG (Jim Saber) Portfolio
                    </Typography>
                    <Box sx={{ width: '280px', height: 400 }}>
                        <PortfolioChart data={Cog} total={matchingCogCount} filterName="COG (Jim Saber)" sendDataPie={handleDataPie} legendX={-68}/>
                    </Box>
                </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={3} sx={{ 
                    display: 'flex', 
                    flexDirection: 'row', 
                    justifyContent: 'space-evenly'
                }}>
                <Box
                display='flex'
                flexDirection='column'
                justifyContent='space-between'
                alignItems='center'
                >
                    <Typography
                        variant="h5"
                        fontWeight="600"
                        color={colors.grey[100]}
                    >
                        Digital (Ramiya Iyer) Portfolio
                    </Typography>
                    <Box sx={{ width: '280px', height: 400 }}>
                        <PortfolioChart data={Dig} total={matchingDigCount} filterName="Digital (Ramiya Iyer)" sendDataPie={handleDataPie} legendX={-68}/>
                    </Box>
                </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={3} sx={{ 
                    display: 'flex', 
                    flexDirection: 'row', 
                    justifyContent: 'space-evenly'
                }}>
                <Box
                display='flex'
                flexDirection='column'
                justifyContent='space-between'
                alignItems='center'
                textAlign='center'
                >
                    <Typography
                        variant="h5"
                        fontWeight="600"
                        color={colors.grey[100]}
                    >
                        Retail & Supply Chain (Maria Latushkin) Portfolio
                    </Typography>
                    <Box sx={{ width: '280px', height: 400 }}>
                        <PortfolioChart data={Ret} total={matchingRetCount} filterName="Retail & Supply Chain (Maria Latushkin)" sendDataPie={handleDataPie} legendX={-68}/>
                    </Box>
                </Box>
                </Grid>
             </Grid>
            </Box>

            {findBarChartExemption ? <Box display="flex">
                <StackBarChart data={stackBarChartData} onClickBar={handleBarClick}/>
            </Box>: null}

            <Box
                display="flex"
                marginBottom="20px"
                sx={{ backgroundColor: colors.primary[400], width: '100%', height: 'auto' }}>

            {/* FILTER - PORTFOLIO */}
            
            <Grid container>                
                <Grid item sx={{ 
                    display: 'flex', 
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start'
                }}>                
                <Box
                    direction="column"
                    justifyContent="space-evenly"
                    alignItems="flex-start"
                    m={2}
                >
                    <Typography variant="h5" fontWeight="600" color={colors.grey[100]} mb={3}>
                        Portfolio
                    </Typography>
                    <Autocomplete
                        options={filterPortfolio}
                        value={selectedPortfolio}
                        onChange={(event, newselectedPortfolio) => {setSelectedPortfolio(newselectedPortfolio)}}
                        renderInput={(params) => (
                            <div style={{ marginLeft: '20px', marginBottom: '20px', width: dropdownHeight}}>
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    label="Select Portfolio"
                                    color="secondary"
                                />
                            </div>
                        )}
                    />
                </Box>
                </Grid>

                {/* FILTER - DEPARTMENT */}
                <Grid item sx={{ 
                    display: 'flex', 
                    flexDirection: 'row', 
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start'
                }}>
                <Box
                    direction="column"
                    justifyContent="space-evenly"
                    alignItems="flex-start"
                    m={2}
                >
                    <Typography variant="h5" fontWeight="600" color={colors.grey[100]} mb={3}>
                        Department
                    </Typography>
                    <Autocomplete
                        options={finalDPTFilter}
                        value={selectedDepartment}
                        onChange={(event, newselectedDepartment) => { setSelectedDepartment(newselectedDepartment) }}
                        renderInput={(params) => (
                            <div style={{ marginLeft: '20px', marginBottom: '20px', width: dropdownHeight}}>
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    label="Select Department"
                                    color="secondary"
                                />
                            </div>
                        )}
                    />
                </Box>
                </Grid>

                {/* FILTER -APPOWNER */}
                <Grid item sx={{ 
                    display: 'flex', 
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start'
                }}>
                <Box
                    direction="column"
                    justifyContent="space-evenly"
                    alignItems="flex-start"
                    m={2}
                >
                    <Typography variant="h5" fontWeight="600" color={colors.grey[100]} mb={3}>
                        App Owner
                    </Typography>
                    <Autocomplete
                        options={filterAppOwner}
                        value={selectedAppOwner}
                        onChange={(event, newAppOwner) => {
                            setSelectedAppOwner(newAppOwner);
                        }}
                        renderInput={(params) => (
                            <div
                                style={{ marginLeft: '20px', marginBottom: '20px', width: dropdownHeight  }}
                            >
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    label="Select App Owner"
                                    color="secondary"
                                />
                            </div>
                        )}
                    />
                </Box>
                </Grid>

                {/* FILTER -APPCODE */}
                <Grid item sx={{ 
                    display: 'flex', 
                    flexDirection: 'row', 
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start'
                }}>
                <Box
                    direction="column"
                    justifyContent="space-evenly"
                    alignItems="flex-start"
                    m={2}
                >
                    <Typography variant="h5" fontWeight="600" color={colors.grey[100]} mb={3}>
                        App Code
                    </Typography>
                    <Autocomplete
                        options={filterAppcode}
                        value={selectedAppCode}
                        onChange={(event, newselectedAppCode) => { setSelectedAppCode(newselectedAppCode) }}
                        renderInput={(params) => (
                            <div style={{ marginLeft: '20px', marginBottom: '20px', width: dropdownHeight}}>
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    label="Select App Code"
                                    color="secondary"
                                />
                            </div>
                        )}
                    />
                </Box>
                </Grid>                
             </Grid>
            </Box>

            {/* TABLE */}
            <Box className="table" style={{
                width: '100%',
                height: 'auto'
            }}>
                <MUIDataTable
                    // title={<span className="custom-table-title"></span>}
                    data={processData}
                    columns={columns}
                    options={options}
                    className="custom-table"
                />
            </Box>
        </Box>
    );
};

export default VeracodeExemptionsAdmin;
