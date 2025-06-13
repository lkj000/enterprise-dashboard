import { React } from "react";
import { Box, Link } from '@mui/material';
import MUIDataTable from "mui-datatables";
import { formatDate, LastUpdatedOnComponent } from '../../../utils';
import { ExpireFilter } from './charts/ChartInfo';
import '../../global/custom-table.css';


const RenewTable = ({ input, lastRun, port, vp, director, owner, appcode, expireDays }) => {


  const columns = [
    { 
      name: "sNo",
      label: "S.No",
      options: {
        filter: false,
        setCellProps: () => ({ style: { whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'left' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace:'nowrap' }})
      }
    },
    {
      name: "Portfolio",
      label: "Portfolio",
      options: {
        filterType: 'dropdown',
        filterList: port === "All" || !port ? [] : [port],
        customFilterListOptions: { render: v => `Portfolio: ${v}` },
        setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top', textAlign: 'left'} }),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' } })
      }
    },
    {
      name: "Department",
      label: "Department",
      options: {
        filterType: 'dropdown',
        filterList: vp === "All" || !vp ? [] : [vp],
        customFilterListOptions: { render: v => `Department: ${v}` },
        setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top', textAlign: 'left'} }),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' } })
      }
    },
    {
      name: "Team",
      label: "Team",
      options: {
        filterType: 'dropdown',
        filterList: director === "All" || !director ? [] : [director],
        customFilterListOptions: { render: v => `Team: ${v}` },
        setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top', textAlign: 'left'} }),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' } })
      }
    },
    {
      name: "AppCode",
      label: "App Code",
      options: {
        filterType: 'dropdown',
        filterList: appcode === "All" || !appcode ? [] : [appcode], 
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
      name: "AppOwner",
      label: "App Owner",
      options: {
        filterType: 'dropdown',
        filterList: owner === "All" || !owner ? [] : [owner], 
        customFilterListOptions: { render: v =>  `AppOwner: ${v}` },
        setCellProps: () => ({ style: { whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'left' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace:'nowrap' }})
      }
    },
    {
      name: "DNS",
      label: "DNS",
      options: {
        filterType: 'textField',
        customFilterListOptions: { render: v =>  `DNS: ${v}` },
        setCellProps: () => ({ style: { whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'left' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace:'normal',textAlign: 'left' }})
      }
    },
    {
      name: "IP",
      label: "IP Address",
      options: {
        filterType: 'textField',
        customFilterListOptions: { render: v =>  `IP Address: ${v}` },
        setCellProps: () => ({ style: { whiteSpace:'normal', verticalAlign: 'top', textAlign: 'left' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace:'normal',textAlign: 'left' }})
      }
    },
    {
      name: "StartDate",
      label: "Start Date",
      options: {
        filterType: 'textField',
        customFilterListOptions: { render: v =>  `Start Date: ${v}` },
        customBodyRender: (value) => {
          if (!value) {
            return null;
          }
          return <div>{formatDate(value)}</div>;
        },
        setCellProps: () => ({ style: { whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'left' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace:'normal',textAlign: 'left' }})
      }
    },
    {
      name: "EndDate",
      label: "End Date",
      options: {
        filterType: 'textField',
        customFilterListOptions: { render: v =>  `End Date: ${v}` },
        customBodyRender: (value) => {
          if (!value) {
            return null;
          }
          return <div>{formatDate(value)}</div>;
        },
        setCellProps: () => ({ style: { whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'left' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace:'normal',textAlign: 'left' }})
      }
    },
    {
      name: "DaysToExpire",
      label: "Days To Expire",
      options: {
        filterType: 'dropdown',
        filterList: expireDays === "All" || !expireDays ? [] : [expireDays],
        customFilterListOptions: { render: v =>  `Days To Expire: ${v}` },
        customBodyRender: (value, tableMeta) => {
          if (!value || (!tableMeta.rowData[8] && !tableMeta.rowData[9])) {
            return null;
          }
          return parseInt(value);
        },
        filterOptions: {
          names: ExpireFilter,
          logic(value, filters) {
          
            const filterData=
            (filters.indexOf('1-30 Days') >=0 && (value >= 1 && value <= 30)) ||
            (filters.indexOf('31-60 Days') >=0 && (value >= 31 && value <= 60)) ||
            (filters.indexOf('61-90 Days') >=0 && (value >= 61 && value <= 90)) ||
            (filters.indexOf('91-180 Days') >=0 && (value >= 91 && value <= 180)) ||
            (filters.indexOf('>180 Days') >=0 && (value > 180)) ||
            (filters.indexOf('Already Expired') >=0 && (value <= 0 && value !== null)) ||
            (filters.indexOf('Never Expires') >=0 && (value === null));
            
            return !filterData;
          }
        },
        sortCompare: (order) => {
          return (obj1, obj2) => {
            let var1 = obj1.data === null ? null : parseInt(obj1.data);
            let var2 = obj2.data === null ? null : parseInt(obj2.data);
            return (var1 - var2) * (order === 'asc' ? 1 : -1);
          };
        },
        setCellProps: () => ({ style: { whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'left' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace:'normal',textAlign: 'left' }})
      }
    },
    {
      name: "Issuer",
      label: "Issuer",
      options: {
        filterType: 'textField',
        customFilterListOptions: { render: v =>  `Issuer: ${v}` },
        setCellProps: () => ({ style: { whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'left' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace:'normal',textAlign: 'left' }})
      }
    },
    {
      name: "Status",
      label: "Status",
      options: {
        filterType: 'dropdown',
        customFilterListOptions: { render: v =>  `Status: ${v}` },
        setCellProps: () => ({ style: { whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'left', textTransform: 'capitalize' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace:'normal',textAlign: 'left' }})
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
      filename: "GCP Renewal.csv",
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
        components={{
          TableFilterList: (props) => (
            lastRun && <LastUpdatedOnComponent props={props} date={lastRun}/>
          )
        }}
      />
    </Box>
  );
}

export default RenewTable;