import { React } from "react";
import { Box, IconButton, Link, Tooltip } from '@mui/material';
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';
import MUIDataTable from "mui-datatables";
import { getQueueData } from "./TableUtils";
import '../../global/custom-table.css';


const QueueTable = ({ input, fetchData }) => {

  const data = input?.queue_list ? getQueueData(input.queue_list) : [];


  const columns = [
    { 
      name: "sNo",
      label: "S.No",
      options: {
        filter: false,
        setCellProps: () => ({ style: { whiteSpace:'nowrap', verticalAlign: 'top' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace:'nowrap' }})
      }
    },
    {
      name: "name",
      label: "Repository Name",
      options: {
        filterType: 'textField',
        customFilterListOptions: { render: v =>  `Repository Name: ${v}` }, 
        customBodyRender: (value) => (
          <Link underline="hover" target="_blank" rel="noopener noreferrer" href={`https://github.albertsons.com/${value}`}>{value}</Link>
        ),
        setCellProps: () => ({ style: { whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'left' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace:'nowrap' }})
      }
    },
    {
      name: "queue",
      label: "Queue Run ID",
      options: {
        filter: true,
        filterType: 'textField',
        customFilterListOptions: { render: v =>  `Queue RunID: ${v}` },
        customBodyRender: (value, tableMeta) => {
          const repoName = tableMeta.rowData[1];
          return <Link underline="hover" target="_blank" rel="noopener noreferrer" href={`https://github.albertsons.com/${repoName}/actions/runs/${value}`}>{value}</Link>
        },
        setCellProps: () => ({ style: { whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'left' }}),
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
    downloadOptions: {
      filename: "Queue Status.csv",
      filterOptions: {
        useDisplayedColumnsOnly: true,
        useDisplayedRowsOnly: true,
      }
    },
    customToolbar: () => {
      return( <span>
        <Tooltip title="Refresh">
          <IconButton
            variant="contained"
            type="button"
            color="white"
            aria-label="refresh"
            onClick={() => fetchData() }
          >
            <AutorenewOutlinedIcon/>
          </IconButton>
        </Tooltip>
      </span> )
    }
  };


  return (
    <Box className="table" style={{
      width: '100%', 
      height: 'auto'
    }}>
      <MUIDataTable
        title={<span className="custom-table-title">Queue</span>}
        data={data}
        columns={columns}
        options={options}
        className="custom-table"
      />
    </Box>
  );
};

export default QueueTable;