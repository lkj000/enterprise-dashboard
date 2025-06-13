import React from 'react';
import { Box, Link } from '@mui/material';
import MUIDataTable from "mui-datatables";
import '../../global/custom-table.css';


const ExemptionTable = ({ input, port, dept, selectOwner, selectAppcode, exempType }) => {


  const columns = [
    {
      name: "sNo", label: "S.No",
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
      name: "Department",
      label: "Department",
      options: {
        filterType: 'dropdown',
        filterList: dept === 'All' || !dept ? [] : [dept],
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
        filterList: selectAppcode === 'All' || !selectAppcode ? [] : [selectAppcode],
        customFilterListOptions: { render: v => `App Code: ${v}` },
        customBodyRender: (value) => {
          if (value.toLowerCase() === "platform") {
            return value;
          }
          return <Link underline="hover" target="_blank" rel="noopener noreferrer" href={`https://safeway.service-now.com/cii?searchin=applications&search=${value}`}>{value}</Link>
        },
        setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top' } }),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' } })
      }
    },
    {
      name: "appOwner",
      label: "App Owner",
      options: {
        filterType: 'dropdown',
        filterList: selectOwner === 'All' || !selectOwner ? [] : [selectOwner],
        customFilterListOptions: { render: v => `App Owner: ${v}` },
        setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top' } }),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' } })
      }
    },
    {
      name: "RepositoryName",
      label: "Repository Name",
      options: {
        filterType: 'textField',
        customFilterListOptions: { render: v => `Repository Name: ${v}` },
        customBodyRender: (value) => (
          <Link underline="hover" target="_blank" rel="noopener noreferrer" href={`https://github.albertsons.com/albertsons/${value}`}>{`albertsons/${value}`}</Link>
        ),
        setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top' } }),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' } })
      }
    }, {
      name: "Description",
      label: "Exemption Type",
      options: {
        filterType: 'dropdown',
        filterList: exempType === 'All' || !exempType ? [] : [exempType],
        customFilterListOptions: { render: v => `Exemption Type: ${v}` },
        setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top' } }),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' } })
      }
    }
  ];


  const options = {
    fixedHeader: true,
    filter: true,
    sort: true,
    responsive: 'vertical',
    tableBodyHeight: "auto",
    rowsPerPage: 15,
    rowsPerPageOptions: [15, 25, 50, 100],
    sortOrder: {
      name: 'sNo',
      direction: 'desc'
    },
    downloadOptions: {
      filename: "Veracode Exemptions.csv",
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