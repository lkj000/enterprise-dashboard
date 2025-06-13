import { React } from "react";
import { Box, Link } from '@mui/material';
import MUIDataTable from "mui-datatables";
import { expireList } from "./charts/ChartInfo";
import { dateFormatter } from "../requests";
import { formatDate, LastUpdatedOnComponent } from '../../../utils';
import '../../global/custom-table.css';


const SATable = ({ input, lastRun, port, vp, director, owner, appcode, expireDays }) => {


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
      name: "Project",
      label: "Project",
      options: {
        filterType: 'textField',
        customFilterListOptions: { render: v =>  `Project: ${v}` },
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
      name: "S-AccountEmail",
      label: "Service Account Email",
      options: {
        filterType: 'textField',
        customFilterListOptions: { render: v =>  `Service Account Email: ${v}` },
        setCellProps: () => ({ style: { whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'left' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace:'normal',textAlign: 'left' }})
      }
    },
    {
      name: "KeyID",
      label: "Key ID",
      options: {
        filterType: 'textField',
        customFilterListOptions: { render: v =>  `Key ID: ${v}` },
        setCellProps: () => ({ style: { whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'left' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace:'normal',textAlign: 'left' }})
      }
    },
    {
      name: "KeyType",
      label: "Key Type",
      options: {
        filterType: 'dropdown',
        customFilterListOptions: { render: v =>  `Key Type: ${v}` },
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
          } else if (value.startsWith("9999")) {
            return "Never Expire";
          }
          return formatDate(dateFormatter(value));
        },
        sortCompare: (order) => (a,b) => {
          if (!a.data || a.data.startsWith('9999')) return 1
          if (!b.data || b.data.startsWith('9999')) return -1
          const dateA = new Date(dateFormatter(a.data));
          const dateB = new Date(dateFormatter(b.data));

          if (order === "desc") {
            return dateB-dateA;
          }
          return dateA-dateB;
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
          if (tableMeta.rowData[11].startsWith("9999")) {
            return null; // Never Expires field is null
          } else if (!value) {
            return "" // Inactive field is empty
          }
          return parseInt(value);
        },
        filterOptions: {
          names: expireList,
          logic(value, filters) {
          
            const filterData=
            (filters.indexOf('1-15 Days') >=0 && (value >= 1 && value <= 15)) ||
            (filters.indexOf('16-30 Days') >=0 && (value >= 16 && value <= 30)) ||
            (filters.indexOf('31-60 Days') >=0 && (value >= 31 && value <= 60)) ||
            (filters.indexOf('>60 Days') >=0 && ( value >= 61)) ||
            (filters.indexOf('Already Expired') >=0 && (value <= 0 && value !== null && value !== "")) ||
            (filters.indexOf('Inactive') >=0 && (value === "")) ||
            (filters.indexOf('Never Expires') >=0 && (value === null));
            
            return !filterData;
          }
        },
        sortCompare: (order) => {
          return (obj1, obj2) => {
            const var1 = (obj1.data === "") ? (order === 'asc' ? Number.MAX_SAFE_INTEGER : Number.MIN_SAFE_INTEGER) : parseInt(obj1.data);
            const var2 = (obj2.data === "") ? (order === 'asc' ? Number.MAX_SAFE_INTEGER : Number.MIN_SAFE_INTEGER) : parseInt(obj2.data);
            return (var1 - var2) * (order === 'asc' ? 1 : -1);
          };
        },
        setCellProps: () => ({ style: { whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'left' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace:'normal',textAlign: 'left' }})
      }
    },
    {
      name: "AutoRenew",
      label: "Auto Renew",
      options: {
        filterType: 'dropdown',
        customFilterListOptions: { render: v =>  `Auto Renew: ${v}` },
        setCellProps: () => ({ style: { whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'left' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace:'normal',textAlign: 'left' }})
      }
    },
    {
      name: "Auto_Renew_GHA_Repositories",
      label: "GHA Repositories",
      options: {
        filterType: 'textField',
        customBodyRender: (value) => {
          if (!value) return null;
          return (
            <div>{value.split(',').map((item, index) => (
              <div key={index}>
                <Link underline="hover" target="_blank" rel="noopener noreferrer" href={`https://github.albertsons.com/albertsons/${item}`}>{item}</Link>
              </div>))}
            </div>
          );
        },
        customFilterListOptions: { render: v =>  `GHA Repositories: ${v}` },
        setCellProps: () => ({ style: { whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'left' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace:'normal',textAlign: 'left' }})
      }
    },
    {
      name: "Auto_Renew_GHA_GHA_Secret_ID",
      label: "GHA Secret ID",
      options: {
        filterType: 'textField',
        customFilterListOptions: { render: v =>  `GHA Secret ID: ${v}` },
        setCellProps: () => ({ style: { whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'left' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace:'normal',textAlign: 'left' }})
      }
    },
    {
      name: "Auto_Renew_GCP_Target_Project",
      label: "GCP Target Project",
      options: {
        filterType: 'textField',
        customFilterListOptions: { render: v =>  `GCP Target Project: ${v}` },
        setCellProps: () => ({ style: { whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'left' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace:'normal',textAlign: 'left' }})
      }
    },
    {
      name: "Auto_Renew_GCP_Secret_ID",
      label: "GCP Secret ID",
      options: {
        filterType: 'textField',
        customFilterListOptions: { render: v =>  `GCP Secret ID: ${v}` },
        setCellProps: () => ({ style: { whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'left' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace:'normal',textAlign: 'left' }})
      }
    },
    {
      name: "Auto_Renew_Email_DGS",
      label: "EMail DGS",
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
        customFilterListOptions: { render: v =>  `EMail DGS: ${v}` },
        setCellProps: () => ({ style: { whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'left' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace:'normal',textAlign: 'left' }})
      }
    },
    {
      name: "Auto_Renew_Email_ADGroups",
      label: "Email AD Groups",
      options: {
        filterType: 'textField',
        customFilterListOptions: { render: v =>  `Email AD Groups: ${v}` },
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
      filename: "GCP SA Expiry.csv",
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

export default SATable;