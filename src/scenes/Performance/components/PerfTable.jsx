import { React, useState } from "react";
import { Box, IconButton, Link } from '@mui/material';
import MUIDataTable from "mui-datatables";
import AddchartOutlinedIcon from '@mui/icons-material/AddchartOutlined';
import DialogBox from "../../../common-components/DialogBox"
import LineChartXY from "../../../components/LineChartXY";
import '../../global/custom-table.css';


const PerfTable = ({ input, port, arctype, colors }) => {


  const [ openDialog, setOpenDialog ] = useState(false);
  const [ selectedData, setSelectedData ] = useState([]);

  const handleOpenDialog = (data) => {
    setSelectedData(data);
    setOpenDialog(true);
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
        setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top', textAlign: 'left' } }),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' } })
      }
    },
    {
      name: "Portfolio",
      label: "Portfolio",
      options: {
        filterType: 'dropdown',
        filterList: port === "All" || !port ? [] : [port],
        customFilterListOptions: { render: v => `Portfolio: ${v}` },
        setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top', textAlign: 'left' } }),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' } })
      }
    },
    {
      name: "appCode",
      label: "App Code",
      options: {
        filterType: 'multiselect',
        customBodyRender: (value) => {
          if (value.toLowerCase() === 'platform') {
            return value;
          }
          return <Link underline="hover" target="_blank" rel="noopener noreferrer" href={`https://safeway.service-now.com/cii?searchin=applications&search=${value}`}>{value}</Link>
        },
        customFilterListOptions: { render: v => `AppCode: ${v}` },
        setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top', textAlign: 'left' } }),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap', textAlign: 'left' } })
      }
    },
    {
      name: "RepositoryName",
      label: "Repository Name",
      options: {
        filterType: 'textField',
        customBodyRender: (value) => (
          <Link underline="hover" target="_blank" rel="noopener noreferrer" href={`https://github.albertsons.com/${value}`}>{value}</Link>
        ),
        customFilterListOptions: { render: v => `RepositoryName: ${v}` },
        setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top', textAlign: 'left' } }),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' } })
      }
    },
    {
      name: "archetype",
      label: "Archetype",
      options: {
        filterType: 'dropdown',
        filterList: arctype === "All" || !arctype ? [] : [arctype],
        customFilterListOptions: { render: v => `Archetype: ${v}` },
        setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top', textAlign: 'left' } }),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' } })
      }
    },
    {
      name: "workflow",
      label: "Workflow Run File",
      options: {
        filterType: 'textField',
        customFilterListOptions: { render: v => `Workflow Run File: ${v}` },
        customBodyRender: (value, tableMeta) => {
          if (value === null || value === undefined) {
            return null;
          }
          const repoName = tableMeta.rowData[3].split('/')[1];
          return <Link underline="hover" target="_blank" rel="noopener noreferrer" href={`https://github.albertsons.com/albertsons/${repoName}/actions/workflows/${value}`}>{value}</Link>
        },
        setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top', textAlign: 'left' } }),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' } })
      }
    },
    {
      name: "workflowRuns",
      label: "Workflow Run",
      options: {
        filterType: 'textField',
        customFilterListOptions: { render: v => `Workflow Run: ${v}` },
        customBodyRender: (value) => {
          if (value === null || value === undefined) {
            return null;
          }
          return value;
        },
        setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top', textAlign: 'center' } }),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' } })
      }
    },
    {
      name: "min_run_id",
      label: "MIN Run ID",
      options: {
        filterType: 'textField',
        customFilterListOptions: { render: v => `MIN RunID: ${v}` },
        customBodyRender: (value, tableMeta) => {
          if (value === null || value === undefined) {
            return null;
          }
          const repoName = tableMeta.rowData[3];
          const runID = tableMeta.rowData[7];
          return <div>
            <Link underline="hover" target="_blank" rel="noopener noreferrer" href={`https://github.albertsons.com/${repoName}/actions/runs/${runID}`}>{runID}</Link>
          </div>
        },
        setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top', textAlign: 'center' } }),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' } })
      }
    },
    {
      name: "min_run_time",
      label: "Minimum Duration in Seconds (Last 30 Days)",
      options: {
        filterType: 'textField',
        customFilterListOptions: { render: v => `Minimum Duration: ${v}` },
        customBodyRender: (value) => {
          if (value === null || value === undefined) {
            return null;
          }
          return value;
        },
        setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top', textAlign: 'center', minWidth: '150px', maxWidth: '150px' } }),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'normal', minWidth: '200px', maxWidth: '200px' } })
      }
    },
    {
      name: "median_run_time",
      label: "Median Duration in Seconds (Last 30 Days)",
      options: {
        filterType: 'textField',
        customFilterListOptions: { render: v => `Median Duration: ${v}` },
        customBodyRender: (value) => {
          if (value === null || value === undefined) {
            return null;
          }
          return value;
        },
        setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top', textAlign: 'center', minWidth: '150px', maxWidth: '150px' } }),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'normal', minWidth: '200px', maxWidth: '200px' } })
      }
    },
    {
      name: "max_run_time",
      label: "Maximum Duration in Seconds (Last 30 Days)",
      options: {
        filterType: 'textField',
        customFilterListOptions: { render: v => `Maximum Duration: ${v}` },
        customBodyRender: (value) => {
          if (value === null || value === undefined) {
            return null;
          }
          return value;
        },
        setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top', textAlign: 'center', minWidth: '150px', maxWidth: '150px' } }),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'normal', align: 'center', minWidth: '220px', maxWidth: '220px' } })
      }
    },
    {
      name: "max_run_id",
      label: "MAX Run ID",
      options: {
        filterType: 'textField',
        customFilterListOptions: { render: v => `MAX RunID: ${v}` },
        customBodyRender: (value, tableMeta) => {
          if (value === null || value === undefined) {
            return null;
          }
          const repoName = tableMeta.rowData[3];
          const runID = tableMeta.rowData[11];
          return <div>
            <Link underline="hover" target="_blank" rel="noopener noreferrer" href={`https://github.albertsons.com/${repoName}/actions/runs/${runID}`}>{runID}</Link>
          </div>
        },
        setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top', textAlign: 'center' } }),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' } })
      }
    },
    {
      name: "total_workflow_runs",
      label: "Historical Graph View",
      options: {
        filter: false, 
        customBodyRender: (value, tableMeta) => {
          if (value === null || value === undefined) {
            return null;
          }
          const chartData = tableMeta.rowData[12];
          return <IconButton variant="contained" color="secondary" onClick={() => handleOpenDialog(chartData)}>
            <AddchartOutlinedIcon />
          </IconButton>
        },
        setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top', textAlign: 'center' } }),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'normal', minWidth: '150px', maxWidth: '150px' } })
      }
    }
  ];


  const options = {
    fixedHeader: true,
    filter: true,
    responsive: 'vertical',
    tableBodyHeight: 'auto',
    rowsPerPage: 15,
    rowsPerPageOptions: [15, 25, 50, 100],
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
          className="custom-table-perform"
        />
      </Box>

      {/* DIALOG */}
      <DialogBox 
        title="HISTORY FOR LAST 30 DAYS"
        openDialog={openDialog}
        handleClose={handleClose}
        styleClass={{ display: 'flex', width: 'auto', flex: 1, overflowX: 'auto', overflowY: 'hidden' }}
        px={0}
        width="1500px"
        colors={colors}
      >
        <LineChartXY input={selectedData.sort((a, b) => a.x - b.x)} dataLegend="Run ID" labelX="Duration" labelY="Duration (in seconds)" zAxis={true} XaxisRotate={-45} />
      </DialogBox>
    </Box>
  );
};

export default PerfTable;