import { React, useState } from "react";
import { Box, IconButton, Link } from '@mui/material';
import MUIDataTable from "mui-datatables";
import AddchartOutlinedIcon from '@mui/icons-material/AddchartOutlined';
import InsightsIcon from '@mui/icons-material/Insights';
import DialogBox from "../../../common-components/DialogBox";
import LineChartXY from "../../../components/LineChartXY";
import '../../global/custom-table.css';


const GHATable = ({ input, port, vp, dept, appOwner, appCode, activityColumn, commonColumn, deploymentColumn, workflowColumn, workflowFileColumn, colors }) => {

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
      name: "sNo",
      label: "S.No",
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
        filterList: port === 'All' || !port ? [] : [port],
        customFilterListOptions: { render: v => `Portfolio: ${v}` },
        setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top', textAlign: 'left'} }),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' } })
      }
    },
    {
      name: "PortfolioVP",
      label: "Department",
      options: {
        filterType: 'dropdown',
        filterList: vp === 'All' || !vp ? [] : [vp],
        customFilterListOptions: { render: v => `Department: ${v}` },
        setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top', textAlign: 'left'} }),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' } })
      }
    },
    {
      name: "Department",
      label: "Team",
      options: {
        filterType: 'dropdown',
        filterList: dept === 'All' || !dept ? [] : [dept],
        customFilterListOptions: { render: v => `Team: ${v}` },
        setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top', textAlign: 'left'} }),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' } })
      }
    },
    {
      name: "appCode",
      label: "App Code",
      options: {
        filterType: 'dropdown',
        filterList: appCode === 'All' || !appCode ? [] : [appCode], 
        customBodyRender: (value) => {
            if(value.toLowerCase() === 'platform') {
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
      name: "appName",
      label: "App Name",
      options: {
        filterType: 'textField',
        customFilterListOptions: {render: v =>  `AppName: ${v}`},
        setCellProps: () => ({style: {whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'left'}}),
        setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}})
      }
    },
    {
      name: "appOwner",
      label: "App Owner",
      options: {
        filterType: 'dropdown',
        filterList: appOwner === 'All' || !appOwner ? [] : [appOwner],
        customFilterListOptions: {render: v =>  `AppOwner: ${v}`}, 
        setCellProps: () => ({style: {whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'left'}}),
        setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}})
      }
    },
    {
      name: "RepositoryName",
      label: "Repository Name",
      options: {
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
      name: "visibility",
      label: "Repo Visibility",
      options: {
        filterType: 'multiselect',
        customFilterListOptions: {render: (v) =>  `Repo Visibility: ${v}`}, 
        setCellProps: () => ({style: {whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'left'}}),
        setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}})
      }
    },
    {
      name: "forks_count",
      label: "No. of Forks",
      options: {
        filterType: 'textField',
        customFilterListOptions: {render: (v) =>  `No. of Forks: ${v}`}, 
        setCellProps: () => ({style: {whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'left'}}),
        setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}})
      }
    },
    {
      name: "deploymentStrategy",
      label: "Deployment Strategy",
      options:{
        filter: true,
        filterType: 'multiselect',
        customFilterListOptions: {render: v =>  `DeploymentStrategy: ${v}`},
        setCellProps: () => ({style: {whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'left'}}),
        setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}}),
        display: workflowColumn
      }
    },
    {
      name: "ActionCentralWorkflowList",
      label: "Central Workflow Actions",
      options: {
        filter: true,
        filterType: 'textField',
        customFilterListOptions: {render: v =>  `CentralWorkflowActions: ${v}`},
        customBodyRender: (value) => {
          if(!value){
            return null;
          }
          const parts = value.split(',').map((item,index) => (
            <div key={index}>{item}</div>
          ))
            return <div>{parts}</div>;
        },
        setCellProps: () => ({style: {whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'left'}}),
        setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}}),
        display: workflowFileColumn
      }
    },
    {
      name: "workflowFile",
      label: "Workflow",
      options: {
        customFilterListOptions: {render: v =>  `Workflow: ${v}`},
        filterType: 'textField',
        customBodyRender: (value) => {
          if(!value){
            return null;
          }
          const parts = value.split(',').map((item,index) => (
            <div key={index}>{item}</div>
          ))
          return <div>{parts}</div>;
        },
        setCellProps: () => ({style: {whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'left'}}),
        setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}}),
        display: workflowFileColumn
      }
    },
    {
      name: "LastProdDeployment",
      label: "Last Prod Deploy",
      options: {
        customFilterListOptions: {render: v =>  `LastProdDeploy: ${v}`},
        filterType: 'textField',
        sortCompare: (order) => (a,b) => {
          const dateA = new Date(a.data);
          const dateB = new Date(b.data);
    
          if(order === "desc"){
            return dateB-dateA;
          }
          return dateA-dateB;
        },
        setCellProps: () => ({style: {whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'center'}}),
        setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}}),
        display: commonColumn
      }
    },
    {
      name: "ProdDeployFrequency",
      label: "Deployment Frequency (In Days)",
      options: {
        customFilterListOptions: {render: v =>  `DeployFrequency: ${v}`},
        filterType: 'textField',
        setCellProps: () => ({style: {whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'center'}}),
        setCellHeaderProps: () => ({style: {whiteSpace:'normal', minWidth:'150px', maxWidth:'150px'}}),
        display: deploymentColumn
      }
    },
    {
      name: "LastSuccessfulProdCommit",
      label: "Last Commit Deploy to Prod",
      options: {
        filterType: 'textField',
        customFilterListOptions: {render: v =>  `LastCommitDeployProd: ${v}`},
        setCellProps: () => ({style: {whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'center'}}),
        setCellHeaderProps: () => ({style: {whiteSpace:'normal', minWidth:'130px', maxWidth:'130px'}}),
        display: deploymentColumn
      }
    },
    {
      name: "LastCommit",
      label: "Last Commit",
      options: {
        filterType: 'textField',
        customFilterListOptions: {render: v =>  `LastCommit: ${v}`},
        setCellProps: () => ({style: {whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'center'}}),
        setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}}),
        display: deploymentColumn
      }
    },
    {
      name: "lastStageDeployment",
      label: "Last Stage Deploy",
      options: {
        filterType: 'textField',
        customFilterListOptions: {render: v =>  `LastStageDeploy: ${v}`},
        setCellProps: () => ({style: {whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'center'}}),
        setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}}),
        display: deploymentColumn
      }
    },
    {
      name: "ProdDeployCountLast30days",
      label: "No. of Deployments (In Last 30 Days)",
      options: {
        filterType: 'textField',
        customFilterListOptions: {render: v =>  `noOfDeployments: ${v}`},
        setCellProps: () => ({style: {whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'center'}}),
        setCellHeaderProps: () => ({style: {whiteSpace:'normal', minWidth:'150px', maxWidth:'150px'}}),
        display: deploymentColumn
      }
    },
    {
      name: "Meanlead Time",
      label: "Mean Lead Time (In Days)",
      options: {
        filterType: 'textField',
        customFilterListOptions: {render: v =>  `MeanLeadTime: ${v}`},
        setCellProps: () => ({style: {whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'center'}}),
        setCellHeaderProps: () => ({style: {whiteSpace:'normal', minWidth:'130px', maxWidth:'130px'}}),
        display: deploymentColumn
      }    
    },
    {
      name: "TotalCommit",
      label: "Commits (In Last 30 Days)",
      options: {
        filterType: 'textField',
        customFilterListOptions: {render: v =>  `TotalCommit: ${v}`},
        setCellProps: () => ({style: {whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'center'}}),
        setCellHeaderProps: () => ({style: {whiteSpace:'normal', minWidth:'130px', maxWidth:'130px'}}),
        display: activityColumn
      }
    },
    {
      name: "TotalPRCount",
      label: "PR's (In Last 30 Days)",
      options: {
        filterType: 'textField',
        customFilterListOptions: {render: v =>  `TotalPRCount: ${v}`},
        setCellProps: () => ({style: {whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'center'}}),
        setCellHeaderProps: () => ({style: {whiteSpace:'normal', minWidth:'110px', maxWidth:'110px'}}),
        display: activityColumn
      }
    },
    {
      name: "commitGraph",
      label: "Commit Historical Graph",
      options: {
        filter: false,
        customBodyRender: (value, tableMeta) => {
          if(value === null){
            return null;
          }
          const chartData = [];
          for (let i=0; i<tableMeta.rowData[22].length; i++){
            chartData[i] = {
              x:  "Week "+(i+1),
              y:  tableMeta.rowData[22][i]
            }
          }
          return  <IconButton variant="contained" color="secondary" onClick={() => handleOpenDialog(chartData)}>
              <AddchartOutlinedIcon />
            </IconButton>
        },
        setCellProps: () => ({style: {whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'center', paddingTop: '7px'}}),
        setCellHeaderProps: () => ({style: {whiteSpace:'normal', minWidth:'130px', maxWidth:'130px'}}),
        display: activityColumn
      }
    },
    {
      name: "Insights",
      label: "Insights View",
      options: {
        filter: false,
        customBodyRender: (value, tableMeta) => {
          const chartData = tableMeta.rowData[7];
          return  <Link underline="hover" target="_blank" rel="noopener noreferrer" href={`https://github.albertsons.com/${chartData}/pulse/monthly`}>
            <IconButton variant="contained" color="secondary">
              <InsightsIcon />
            </IconButton>
          </Link>
        },
        setCellProps: () => ({style: {whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'center', paddingTop: '7px'}}),
        setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}}),
        display: activityColumn
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
      name: 'LastProdDeployment',
      direction: 'desc'
    },
    downloadOptions: {
      filename: "GHARepository.csv",
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
        />
      </Box>

      {/* DIALOG */}
      <DialogBox 
        title="HISTORY FOR LAST 52 WEEKS"
        openDialog={openDialog}
        handleClose={handleClose}
        styleClass={{ display: 'flex', width: 'auto', flex: 1, overflowX: 'auto', overflowY: 'hidden' }}
        px={0}
        width="1500px"
        colors={colors}
      >
        <LineChartXY input={selectedData} dataLegend="Weeks" labelX="Commits" labelY="# of Commits" zAxis={false} XaxisRotate={-45}/>
      </DialogBox>
    </Box>
  );
};

export default GHATable;