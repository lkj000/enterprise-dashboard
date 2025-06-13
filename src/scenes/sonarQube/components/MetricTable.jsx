import { React, useState } from "react";
import { Box, IconButton, Link } from '@mui/material';
import MUIDataTable from "mui-datatables";
import AddchartOutlinedIcon from '@mui/icons-material/AddchartOutlined';
import DialogBox from "../../../common-components/DialogBox";
import JiraLineChart from "../../../components/JiraLineChart";
import { lastRun } from "../requests";
import { LastUpdatedOnComponent } from "../../../utils";
import '../../global/custom-table.css';


const MetricTable = ({ input, port, VP, owner, colors }) => {

  const [ openDialog, setOpenDialog ] = useState(false);
  const [ selectedData, setSelectedData ] = useState([]);
  const [ graphName, setGraphName ] = useState('');


  const handleOpenDialog = (data) => {
    setOpenDialog(true);
    setSelectedData(data);
    setGraphName(data[0].id);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };


  const columns = [
    {
      name: "sNo",
      label: "S.No",
      options: { 
        filter: false,
        setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top' } }),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' } })
      }
    },
    {
      name: "Portfolio",
      label: "Portfolio",
      options: {
        filterType: 'dropdown',  
        filterList: port === 'All' || !port ? [] : [port],
        customFilterListOptions: { render: v => `Portfolio: ${v}` },
        setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top' } }),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' } })
      }
    },
    {
      name: "VP",
      label: "Department",
      options: {
        filterType: 'dropdown',  
        filterList: VP === 'All' || !VP ? [] : [VP],
        customFilterListOptions: { render: v => `Department: ${v}` },
        setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top' } }),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' } })
      }
    },
    {
      name: "AppOwner",
      label: "App Owner",
      options: {
        filterType: 'dropdown',  
        filterList: owner === 'All' || !owner ? [] : [owner],
        customFilterListOptions: { render: v => `App Owner: ${v}` },
        setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top' } }),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' } })
      }
    },
    {
      name: "App_Name",
      label: "Application Name",
      options: { 
        customBodyRender: (value) => (
          <Link underline="hover" target="_blank" rel="noopener noreferrer" href={`https://sonarqube.albertsons.com/projects?search=${value}`}>{value}</Link>
        ),
        customFilterListOptions: { render: v =>  `Application Name: ${v}` },
        setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top' } }),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' } })
      }
    },
    {
      name: "Branch",
      label: "Branch",
      options: { 
        customFilterListOptions: { render: v =>  `Branch: ${v}` },
        setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top' } }),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' } })
      }
    },
    {
      name: "coverage",
      label: "Coverage",
      options: { 
        filterType: 'textField',
        customFilterListOptions: { render: v =>  `Coverage: ${v}` },
        setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top' } }),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' } })
      }
    },
    {
      name: "duplicated_lines_density",
      label: "Duplicated Lines Density",
      options: {
        filterType: 'textField',
        customFilterListOptions: { render: v =>  `Duplicated Lines Density: ${v}` },
        setCellProps: () => ({ style: { whiteSpace:'nowrap' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace:'normal', minWidth:'90px', maxWidth:'90px' }})
      }
    },
    {
      name: "reliability_rating",
      label: "Reliability Rating",
      options: {
        filterType: 'textField',
        customFilterListOptions: { render: v =>  `Reliability Rating: ${v}` },
        setCellProps: () => ({ style: { whiteSpace:'nowrap' } }),
        setCellHeaderProps: () => ({ style: { whiteSpace:'normal', minWidth:'80px', maxWidth:'80px' } })
      }
    },
    {
      name: "security_hotspots_reviewed",
      label: "Security Hotspots Reviewed",
      options: {
        filterType: 'textField',
        customFilterListOptions: { render: v =>  `Security Hotspots Reviewed: ${v}` },
        setCellProps: () => ({ style: { whiteSpace:'nowrap' } }),
        setCellHeaderProps: () => ({ style: { whiteSpace:'normal', minWidth:'100px', maxWidth:'100px' } })
      }
    },
    {
      name: "security_rating",
      label: "Security Rating",
      options: {
        filterType: 'textField',
        customFilterListOptions: { render: v =>  `Security Rating: ${v}` },
        setCellProps: () => ({ style: { whiteSpace:'nowrap' } }),
        setCellHeaderProps: () => ({ style: { whiteSpace:'normal', minWidth:'80px', maxWidth:'80px' } })
      }
    },
    {
      name: "sqale_rating",
      label: "Maintainability Rating",
      options: {
        filterType: 'textField',
        customFilterListOptions: { render: v =>  `Maintainability Rating: ${v}` },
        setCellProps: () => ({ style: { whiteSpace:'nowrap' } }),
        setCellHeaderProps: () => ({ style: { whiteSpace:'normal', minWidth:'80px', maxWidth:'80px' } })
      }
    },
    {
      name: "coverage_history",
      label: "Coverage History",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta) => (
          <IconButton
            variant="contained"
            color={!value || value.length === 0 ? "default" : "secondary"}
            onClick={() => value && value.length > 0 && handleOpenDialog([{ "id": "Coverage", "color": "#7FC97F", "data": tableMeta.rowData[12] }])}
            disabled={!value || value.length === 0}
          >
            <AddchartOutlinedIcon />
          </IconButton>
        ),
        setCellProps: () => ({ style: { whiteSpace:'nowrap' } }),
        setCellHeaderProps: () => ({ style: { whiteSpace:'normal', minWidth:'80px', maxWidth:'80px' } })
      }
    },
    {
      name: "reliability_rating_history",
      label: "Reliability Rating History",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta) => (
          <IconButton
            variant="contained"
            color={!value || value.length === 0 ? "default" : "secondary"}
            onClick={() => value && value.length > 0 && handleOpenDialog([{ "id":"Reliability Rating", "color":"#7FC97F", "data": tableMeta.rowData[13] }])}
            disabled={!value || value.length === 0}
          >
            <AddchartOutlinedIcon />
          </IconButton>),
        setCellProps: () => ({ style: { whiteSpace:'nowrap' } }),
        setCellHeaderProps: () => ({ style: { whiteSpace:'normal', minWidth:'80px', maxWidth:'80px' } })
      }
    },
    {
      name: "security_rating_history",
      label: "Security Rating History",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta) => (
          <IconButton
            variant="contained"
            color={!value || value.length === 0 ? "default" : "secondary"}
            onClick={() => value && value.length > 0 && handleOpenDialog([{ "id":"Security Rating", "color":"#7FC97F", "data": tableMeta.rowData[14] }])}
            disabled={!value || value.length === 0}
          >
            <AddchartOutlinedIcon />
          </IconButton>),
        setCellProps: () => ({ style: { whiteSpace:'nowrap' } }),
        setCellHeaderProps: () => ({ style: { whiteSpace:'normal', minWidth:'80px', maxWidth:'80px' } })
      }
    },
    {
      name: "sqale_rating_history",
      label: "Sqale Rating History",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta) => (
          <IconButton
            variant="contained"
            color={!value || value.length === 0 ? "default" : "secondary"}
            onClick={() => value && value.length > 0 && handleOpenDialog([{ "id":"Sqale Rating", "color":"#7FC97F", "data": tableMeta.rowData[15] }])}
            disabled={!value || value.length === 0}
          >
            <AddchartOutlinedIcon />
          </IconButton>),
        setCellProps: () => ({ style: { whiteSpace:'nowrap' } }),
        setCellHeaderProps: () => ({ style: { whiteSpace:'normal', minWidth:'80px', maxWidth:'80px' } })
      }
    },
    {
      name: "duplicated_lines_density_history",
      label: "Duplicated Lines Density History",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta) => (
          <IconButton
            variant="contained"
            color={!value || value.length === 0 ? "default" : "secondary"}
            onClick={() => value && value.length > 0 && handleOpenDialog([{ "id":"Duplicated Lines Density", "color":"#7FC97F", "data": tableMeta.rowData[16] }])}
            disabled={!value || value.length === 0}
          >
            <AddchartOutlinedIcon />
          </IconButton>),
        setCellProps: () => ({ style: { whiteSpace:'nowrap' } }),
        setCellHeaderProps: () => ({ style: { whiteSpace:'normal', minWidth:'80px', maxWidth:'80px' } })
      }
    }
  ];

  const options = {
    fixedHeader: true,
    filter: true,
    sort: true,
    responsive: 'vertical',
    tableBodyHeight: 'auto',
    rowsPerPage: 15,
    rowsPerPageOptions: [15,25,50,100],
    sortOrder: {
      name: '',
      direction: 'desc'
    },
    downloadOptions: {
      filename: "SonarQube Results.csv",
      filterOptions: {
        useDisplayedColumnsOnly: true,
        useDisplayedRowsOnly: true,
      }
    }
  };


  return (
    <Box>
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

      {/* DIALOG */}
      <DialogBox 
        title={`${graphName.toUpperCase()} HISTORY`}
        openDialog={openDialog}
        handleClose={handleClose}
        styleClass={{ flex: 1, overflowX: 'auto', overflowY: 'hidden', position: 'relative' }}
        px='15px'
        width='1200px'
        colors={colors}
      >
        <JiraLineChart chartData={selectedData} colorType={['#50C878']} marginCss={[45,150,110,120]} legendX="Weeks" legendY={graphName} maxValue={true} XaxisRotate={-25} legendTextBottom={100} legendTextRight={30} legendXOffset={60} legendWidth="100px" />
      </DialogBox>
    </Box>
  );
};

export default MetricTable;