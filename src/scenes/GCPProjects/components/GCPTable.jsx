import { React } from "react";
import { Box, Link } from '@mui/material';
import MUIDataTable from "mui-datatables";
import { formatDate, LastUpdatedOnComponent } from '../../../utils';
import '../../global/custom-table.css';


const GCPTable = ({ input, lastRun, port, vp, director, owner, appcode }) => {


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
      name: "AppName",
      label: "App Name",
      options:{
        filterType: 'textField',
        customFilterListOptions: { render: v =>  `App Name: ${v}` }, 
        setCellProps: () => ({style: {whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'left'}}),
        setCellHeaderProps: () => ({style: {whiteSpace:'nowrap',textAlign: 'left'}})
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
      name: "ProjectID",
      label: "Project ID",
      options: {
        filterType: 'textField',
        customFilterListOptions: { render: v =>  `Project ID: ${v}` },
        setCellProps: () => ({ style: { whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'left' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace:'normal',textAlign: 'left' }})
      }
    },
    {
      name: "Environment",
      label: "Environment",
      options: {
        filterType: 'dropdown',
        customFilterListOptions: { render: v =>  `Environment: ${v}` },
        setCellProps: () => ({ style: { whiteSpace:'normal', verticalAlign: 'top', textAlign: 'left' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace:'normal',textAlign: 'left' }})
      }
    },
    {
      name: "Compliance",
      label: "Compliance",
      options: {
        filterType: 'dropdown',
        customFilterListOptions: { render: v =>  `Compliance: ${v}` },
        setCellProps: () => ({ style: { whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'left' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace:'normal',textAlign: 'left' }})
      }
    },
    {
      name: "DRTier",
      label: "DR Tier",
      options: {
        filterType: 'dropdown',
        customFilterListOptions: { render: v =>  `DR Tier: ${v}` },
        setCellProps: () => ({ style: { whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'left' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace:'normal',textAlign: 'left' }})
      }
    },
    {
      name: "CostCenter",
      label: "Cost Center",
      options: {
        filterType: 'dropdown',
        customFilterListOptions: { render: v =>  `Cost Center: ${v}` },
        setCellProps: () => ({ style: { whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'left' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace:'normal',textAlign: 'left' }})
      }
    },
    {
      name: "Folder",
      label: "Folder",
      options: {
        filterType: 'textField',
        customFilterListOptions: { render: v =>  `Folder: ${v}` },
        setCellProps: () => ({ style: { whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'left' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace:'normal',textAlign: 'left' }})
      }
    },
    {
      name: "email_notifications",
      label: "Email Notifications",
      options: {
        filterType: 'textField',
        customBodyRender: (value) => {
          if (!value) return null;
          return (
            <div>{value.split(',').map((item, index) => (
              <div key={index}>{item}</div>))}
            </div>
          );
        },
        customFilterListOptions: { render: v =>  `Email Notifications: ${v}` },
        setCellProps: () => ({ style: { whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'left' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace:'normal',textAlign: 'left' }})
      }
    },
    {
      name: "Expiry",
      label: "Expiry",
      options: {
        filterType: 'textField',
        customFilterListOptions: { render: v =>  `Expiry: ${v}` },
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
      name: "BudgetAmount",
      label: "Budget Amount",
      options: {
        filterType: 'textField',
        customFilterListOptions: { render: v =>  `Budget Amount: ${v}` },
        setCellProps: () => ({ style: { whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'left' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace:'normal',textAlign: 'left' }})
      }
    },
    {
      name: "BudgetPeriod",
      label: "Budget Period",
      options: {
        filterType: 'dropdown',
        customFilterListOptions: { render: v =>  `Budget Period: ${v}` },
        setCellProps: () => ({ style: { whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'left' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace:'normal',textAlign: 'left' }})
      }
    },
    {
      name: "BudgetPeriodStart",
      label: "Budget Period Start",
      options: {
        filterType: 'textField',
        customFilterListOptions: { render: v =>  `Budget Period Start: ${v}` },
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
      name: "BudgetPeriodEnd",
      label: "Budget Period End",
      options: {
        filterType: 'textField',
        customFilterListOptions: { render: v =>  `Budget Period End: ${v}` },
        customBodyRender: (value) => {
          if (!value) {
            return null;
          }
          return <div>{formatDate(value)}</div>;
        },
        setCellProps: () => ({ style: { whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'left' }}),
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
      filename: "GCP Projects.csv",
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

export default GCPTable;