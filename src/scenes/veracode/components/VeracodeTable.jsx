import React from 'react';
import { Box, Link } from '@mui/material';
import MUIDataTable from "mui-datatables";
import '../../global/custom-table.css';

const VeracodeTable = ({ data, filterLists }) => {
  const columns = [
    {
      name: "id", label: "ID",
      options: {
        filter: false,
        setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top', textAlign: 'center' } }),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' } })
      }
    },
    {
      name: "Portfolio",
      label: "Portfolio",
      options: {
        filterType: 'multiselect',
        customFilterListOptions: { render: v => `Portfolio: ${v}` },
        filterList: filterLists.PortfolioTableFilter,
        setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top', textAlign: 'left' } }),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' } })
      }
    },
    {
      name: "PortfolioVP",
      label: "VP",
      options: {
        filterType: 'multiselect',
        customFilterListOptions: { render: v => `VP: ${v}` },
        filterList: filterLists.PortfolioVpFilter,
        setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top', textAlign: 'left' } }),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' } })
      }
    },
    {
      name: "ApplicationOwner",
      label: "App Owner",
      options: {
        filterType: 'multiselect',
        customFilterListOptions: { render: v => `AppOwner: ${v}` },
        filterList: filterLists.AppOwnerFilter,
        setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top', textAlign: 'left' } }),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' } })
      }
    },
    {
      name: "RepositoryName",
      label: "Name",
      options: {
        filter: true,
        customBodyRender: (value) => (
          <Link underline="hover" target="_blank" rel="noopener noreferrer" href={`https://github.albertsons.com/${value}/actions/workflows/nightly_veracode_scan.yml`}>{value}</Link>
        ),
        filterType: 'textField',
        customFilterListOptions: { render: v => `RepositoryName: ${v}` },
        setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top', textAlign: 'left' } }),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' } })
      }
    },

    {
      name: "DeploymentStrategy",
      label: "Deployment Strategy",
      options: {
        customFilterListOptions: { render: v => `DeploymentStrategy: ${v}` },
        filterType: 'multiselect',
        setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top', textAlign: 'center' } }),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' } })
      }
    },
    {
      name: "VeracodeConclusion",
      label: "Veracode Conclusion",
      options: {
        filterType: 'multiselect',
        filterList: filterLists.ConclusionTableFilter,
        customFilterListOptions: { render: v => `VeracodeConclusion: ${v}` },
        filterOptions: {
          names: ['Success', 'Failure', 'CI-FAILED', 'Not present', 'Not Applicable', 'Profile Missing'],
          logic(value, filters) {

            const conclusion =
              (filters.indexOf('Success') >= 0 && (value === 'success' || value === 'Success')) ||
              (filters.indexOf('Failure') >= 0 && (value === 'failure' || value === 'Failure')) ||
              (filters.indexOf('CI-FAILED') >= 0 && (value === 'CI-FAILED' || value === 'startup_failure' || value === 'cancelled')) ||
              (filters.indexOf('Not present') >= 0 && value === 'Not present') ||
              (filters.indexOf('Not Applicable') >= 0 && value === 'Not Applicable') ||
              (filters.indexOf('Profile Missing') >= 0 && value === 'Profile Missing');

            return !conclusion;
          }
        },
        setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top', textAlign: 'center' } }),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' } })
      }
    },
    {
      name: "VeracodeLastRunDate",
      label: "Last Run",
      options: {
        filterType: 'textField',
        sortDescFirst: true,
        sort: true,
        customBodyRender: (value) => {
          const dateValue = (value !== ' ' && value !== undefined) ? new Date(value).toLocaleDateString('en-US') : '';
          return dateValue;
        },
        customFilterListOptions: { render: v => `VeracodeLastRunDate: ${v}` },
        setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top', textAlign: 'center' } }),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' } })
      }
    },
    {
      name: "LastestProdDeployDate",
      label: "Prod Deploy",
      options: {
        filterType: 'textField',
        customFilterListOptions: { render: v => `LastestProdDeployDate: ${v}` },
        setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top', textAlign: 'center' } }),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' } })
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
      name: 'Portfolio',
      direction: 'desc'
    },
    downloadOptions: {
      filename: "Veracode.csv",
      filterOptions: {
        useDisplayedColumnsOnly: true,
        useDisplayedRowsOnly: true,
      }
    }

  }

  return (
    <Box className="table" style={{
      width: '100%',
      height: 'auto',
      marginBottom: '30px'
    }}
    >
      <MUIDataTable
        data={data}
        columns={columns}
        options={options}
        className="custom-table"
      />
    </Box>
  );
};

export default VeracodeTable;