import { React } from "react";
import { Box, Link } from '@mui/material';
import MUIDataTable from "mui-datatables";
import { lastRun } from "../requests";
import { LastUpdatedOnComponent } from "../../../utils";
import '../../global/custom-table.css';


const SonarTable = ({ input, port, dept, selectAppowner, selectAppcode }) => {


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
      options: {
        filterType: 'dropdown',
        filterList: port === 'All' || !port ? [] : [port],
        customFilterListOptions: { render: v => `Portfolio: ${v}` },
        setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top'} }),
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
        setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top'} }),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' } })
      }
    },
    {
      name: "appCode",
      label: "App Code",
      options: {
        filterType: 'dropdown',
        filterList: selectAppcode === 'All' || !selectAppcode ? [] : [selectAppcode],
        customBodyRender: (value) => {
          if (value.toLowerCase() === "platform") {
            return value;
          }
          return <Link underline="hover" target="_blank" rel="noopener noreferrer" href={`https://safeway.service-now.com/cii?searchin=applications&search=${value}`}>{value}</Link>
        },
        customFilterListOptions: { render: v => `App Code: ${v}` },
        setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top'} }),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' } })
      }
    },
    {
      name: "appOwner",
      label: "App Owner",
      options: {
        filterType: 'dropdown',
        filterList: selectAppowner === 'All' || !selectAppowner ? [] : [selectAppowner],
        customFilterListOptions: { render: v => `App Owner: ${v}` },
        setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top'} }),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' } })
      }
    },
    {
      name: "RepositoryName",
      label: "Repository Name",
      options: {
        filter: true,
        customBodyRender: (value) => (
          <Link underline="hover" target="_blank" rel="noopener noreferrer" href={`https://github.albertsons.com/albertsons/${value}`}>{`albertsons/${value}`}</Link>
        ),
        filterType: 'textField',
        customFilterListOptions: { render: v => `Repository Name: ${v}` },
        setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top'} }),
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
    rowsPerPageOptions: [15,25, 50, 100],
    sort: true,
    sortOrder: {
      name: 'sNo',
      direction: 'desc'
    },
    downloadOptions: {
      filename: "Sonar Exemptions.csv",
      filterOptions: {
        useDisplayedColumnsOnly: true,
        useDisplayedRowsOnly: true,
      }
    }
  }



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
        components={{
          TableFilterList: (props) => (
            lastRun && <LastUpdatedOnComponent props={props} date={lastRun}/>
          )
        }}
      />
    </Box>
  );
};

export default SonarTable;