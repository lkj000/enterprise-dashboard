import { React } from "react";
import { Box, Link } from '@mui/material';
import MUIDataTable from "mui-datatables";
import { WorkflowData as input } from "../requests";
import "../../global/custom-table.css";


const ArchitectTable = ({ port, ptxValue }) => {


  const columns = [
    { 
      name: "sNo",
      label: "S.No",
      options: {
        filter: false
      }
    },
    {
      name: "Portfolio",
      label: "Portfolio",
      options:{
        filterList: port === 'All' || !port ? [] : [port],
        customFilterListOptions: { render: v =>  `Portfolio: ${v}` }, 
        setCellProps: () => ({ style: { whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'left' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace:'nowrap' }})
      }
    },
    {
      name: "appCode",
      label: "App Code",
      options: {
        filterType: 'multiselect',
        customBodyRender: (value) => {
          if (value.toLowerCase() === "platform") {
            return value;
          }
          return <Link underline="hover" target="_blank" rel="noopener noreferrer" href={`https://safeway.service-now.com/cii?searchin=applications&search=${value}`}>{value}</Link>
        },
        customFilterListOptions: { render: v =>  `AppCode: ${v}` },
        setCellProps: () => ({ style: { whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'left' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace:'nowrap' }})
      }
    },
    {
      name: "appName",
      label: "App Name",
      options: {
        filterType: 'textField',
        customFilterListOptions: { render: v =>  `AppName: ${v}` },
        setCellProps: () => ({ style: { whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'left' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace:'nowrap' }})
      }
    },
    {
      name: "appOwner",
      label: "App Owner",
      options:{
        filterType: 'multiselect',
        customFilterListOptions: { render: v =>  `AppOwner: ${v}` }, 
        setCellProps: () => ({ style: { whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'left' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace:'nowrap' }})
      }
    },
    {
      name: "RepositoryName",
      label: "Repository Name",
      options:{
        filter: true,
        filterType: 'textField',
        customBodyRender: (value) => (
          <Link underline="hover" target="_blank" rel="noopener noreferrer" href={`https://github.albertsons.com/${value}`}>{value}</Link>
        ),
        customFilterListOptions: { render: v =>  `RepositoryName: ${v}` },
        setCellProps: () => ({ style: { whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'left' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace:'nowrap' }})
      }
    },
    {
      name: "PTX",
      label: "PTX",
      options: {
        filterType: 'dropdown',
        filterList: ptxValue === 'All' || !ptxValue ? [] : [ptxValue],
        filterOptions: {
          names: ['Present', 'Not Present'],
          logic(value, filters) {
            const filterData =
            (filters.indexOf('Present') >=0 && (value)) ||
            (filters.indexOf('Not Present') >=0 && (!value));
            return !filterData;
          }
        },
        customFilterListOptions: { render: v =>  `PTX: ${v}` },
        setCellProps: () => ({ style: { whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'left' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace:'nowrap' }})
      }
    },
    {
      name: "LastProdDeployment",
      label: "Last Prod Deploy",
      options: {
        filterType: 'textField',
        customFilterListOptions: {render: v =>  `LastProdDeploy: ${v}`},
        sortCompare: (order) => (a,b) => {
          const dateA = new Date(a.data);
          const dateB = new Date(b.data);

          if(order === "desc"){
            return dateB-dateA;
          }
          return dateA-dateB;
        },
        setCellProps: () => ({ style: { whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'center' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace:'nowrap' }})
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
      filename: "Enterprise_Architect_Approval.csv",
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

export default ArchitectTable;