import { Box, Link } from "@mui/material";
import MUIDataTable from "mui-datatables";
import "../../global/custom-table.css";
import { ExemptionData as input } from "../requests";


const ExemptionTable = () => {


  const columns = [
    { 
      name: "sNo",
      label: "S.No",
      options: {
        filter: false,
        setCellProps: () => ({ style: { whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'left' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace:'nowrap '}})
      }
    },
    {  name: "id", options: { filter: false, display: false }  },
    {
      name: "runner_group",
      label: "Runner Group",
      options: {
        filterType: 'textField',
        customBodyRender: (value, tableMeta) => {
          const runnerUrl = tableMeta.rowData[1];
          return <Link underline="hover" target="_blank" rel="noopener noreferrer" href={`https://github.albertsons.com/organizations/albertsons/settings/actions/runner-groups/${runnerUrl}`}>{value}</Link>
        },
        customFilterListOptions: { render: v =>  `Runner Group: ${v}` }, 
        setCellProps: () => ({ style: { whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'left' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace:'nowrap' }})
      }
    },
    {
      name: "selected_repositories_url",
      label: "Selected Repository",
      options: {
        filterType: 'textField',
        customBodyRender: (value) => {
          const parts = value.map((item, index) => (
          <div key={index}>
            <Link underline="hover" target="_blank" rel="noopener noreferrer" href={`https://github.albertsons.com/albertsons/${item}`}>{item}</Link>
          </div>));   
          return <div>{parts}</div>;
        },
        customFilterListOptions: { render: v =>  `Selected Repository: ${v}` },
        setCellProps: () => ({ style: { whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'left' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace:'nowrap' }})
      }
    },
    {
      name: "selected_workflows",
      label: "Selected Workflows",
      options: {
        filterType: 'textField',
        customBodyRender: (value) => {
          const parts = value.map((item, index) => (
            <div key={index}> {item} </div>))
          return <div>{parts}</div>;
        },
        customFilterListOptions: { render: v =>  `Selected Workflows: ${v}` },
        setCellProps: () => ({ style: { whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'left' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace:'nowrap' }})
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
      filename: "Exemption Runners.csv",
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

export default ExemptionTable;