import { React } from "react";
import { Box, Link } from '@mui/material';
import MUIDataTable from "mui-datatables";
import '../../global/custom-table.css';
import { processData as input } from "../requests";


const DeploymentTable = () => {


  const columns = [
    { 
      name: "sNo",
      label: "S.No",
      options: {
        filter: false,
        setCellProps: () => ({style: {whiteSpace:'nowrap', verticalAlign: 'top'}}),
        setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}})
      }
    },
    {
      name: "repository",
      label: "Repository Name",
      options:{
        filterType: 'textField',
        customBodyRender: (value) => (
          <Link underline="hover" target="_blank" rel="noopener noreferrer" href={`https://github.albertsons.com/albertsons/${value}`}>{value}</Link>
        ),
        customFilterListOptions: { render: v =>  `RepositoryName: ${v}` },
        setCellProps: () => ({ style: { whiteSpace:'nowrap', verticalAlign: 'top' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace:'nowrap' }})
      }
    },
    {
      name: "currentDeployedArtifact",
      label: "Current Prod Deploy Artifact",
      options: {
        filterType: 'textField',
        customFilterListOptions: { render: v =>  `Current Prod Deploy Artifact: ${v}` },
        setCellProps: () => ({ style: { whiteSpace:'nowrap', verticalAlign: 'top' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace:'nowrap' }})
      }
    },
    {
      name: "previousDeployedArtifact",
      label: "Previous Prod Deploy Artifact",
      options: {
        filterType: 'textField',
        customFilterListOptions: { render: v =>  `Previous Prod Deploy Artifact: ${v}` },
        setCellProps: () => ({ style: { whiteSpace:'nowrap', verticalAlign: 'top' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace:'nowrap' }})
      }
    },
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
      name: 'currentDeployedArtifact',
      direction: 'desc'
    },
    downloadOptions: {
      filename: "Deployment History.csv",
      filterOptions: {
        useDisplayedColumnsOnly: true,
        useDisplayedRowsOnly: true,
      }
    }
  };
        

  return (
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
  );
};

export default DeploymentTable;