import { React } from "react";
import { Box } from "@mui/material";
import MUIDataTable from "mui-datatables";
import '../../global/custom-table.css';


const SummaryTable = ({ input, cveID }) => {


  const columns = [
    {
      name: "cve_id",
      label: "CVE ID",
      options: {
        filterType: 'textField',
        filterList: cveID === 'All' || !cveID ? [] : [cveID]
      }
    },
    {
      name: "summary",
      label: "Summary",
      options: {
        filterType: 'textField'
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
    downloadOptions: {
      filename: "Xray CVE Summary.csv",
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

export default SummaryTable;