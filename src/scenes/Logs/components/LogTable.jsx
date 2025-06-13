import { React } from "react";
import { Box, Link } from '@mui/material';
import MUIDataTable from "mui-datatables";
import { LastUpdatedOnComponent } from "../../../utils";
import '../../global/custom-table.css';


const LogTable = ({ lastRun, input, port, selectVP, selectDirector, userID }) => {


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
      name: "user",
      label: "User ID",
      options: {
        filterType: 'dropdown',
        filterList: userID === 'All' || !userID ? [] : [userID],
        customFilterListOptions: { render: v =>  `User ID: ${v}` },
        customBodyRender: (value) => (
          <Link underline="hover" target="_blank" rel="noopener noreferrer" href={`https://github.albertsons.com/${value}`}>{value}</Link>
        ),    
        setCellProps: () => ({ style: { whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'left' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace:'nowrap' }})
      }
    },
    {
      name: "display_name",
      label: "Full Name",
      options: {
        filterType: 'textField',
        customFilterListOptions: { render: v =>  `Full Name: ${v}` },
        setCellProps: () => ({ style: { whiteSpace:'normal', verticalAlign: 'top', textAlign: 'left' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace:'nowrap' }})
      }
    },
    {
      name: "job_title",
      label: "Title",
      options: {
        filterType: 'textField',
        customFilterListOptions: { render: v =>  `Title: ${v}` },
        setCellProps: () => ({ style: { whiteSpace: 'normal', verticalAlign: 'top', textAlign: 'left' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'nowrap' }})
      }
    },
    {
      name: "portfolio",
      label: "Portfolio",
      options: {
        filterType: 'dropdown',
        filterList: port === 'All' || !port ? [] : [port],
        customFilterListOptions: { render: v =>  `Portfolio: ${v}` },
        setCellProps: () => ({ style: { whiteSpace:'normal', verticalAlign: 'top', textAlign: 'left' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'normal', minWidth: '135px', maxWidth: '135px' }})
      }
    },
    {
      name: "vp",
      label: "Department",
      options: {
        filterType: 'dropdown',
        filterList: selectVP === 'All' || !selectVP ? [] : [selectVP],
        customFilterListOptions: { render: v =>  `Department: ${v}` },
        setCellProps: () => ({ style: { whiteSpace:'normal', verticalAlign: 'top', textAlign: 'left' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace:'nowrap' }})
      }
    },
    {
      name: "director",
      label: "Team",
      options: {
        filterType: 'dropdown',
        filterList: selectDirector === 'All' || !selectDirector ? [] : [selectDirector],
        customFilterListOptions: {render: v =>  `Team: ${v}`},
        setCellProps: () => ({ style: { whiteSpace:'normal', verticalAlign: 'top', textAlign: 'left' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace:'nowrap' }})
      }
    },
    {
      name: "clone_count",
      label: "Total Repos Cloned",
      options: {
        filterType: 'textField',
        customFilterListOptions: { render: v => `Total Repos Cloned: ${v}` },
        setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top', textAlign: 'center', paddingLeft: '5px' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace:'normal', minWidth:'110px', maxWidth:'110px' }})
      }
    },
    {
      name: "clone_repos",
      label: "Repos Cloned",
      options: {
        filterType: 'textField',
        customFilterListOptions: { render: v => `Repos Cloned: ${v}` },
        customBodyRender: (value) => {
          if(value.length === 0 || !value) {
            return null;
          }
          return (<div>
            {value.map((item, index) => {
              const repo = item.split('/').pop();
              return (<div key={index}>
                <Link underline="hover" target="_blank" rel="noopener noreferrer" href={`https://github.albertsons.com/${item}`}>{repo}</Link>
              </div>);
            })}
          </div>);
        },
        setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top', textAlign: 'left' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace:'nowrap' }})
      }
    },
    {
      name: "fetch_count",
      label: "Total Repos Fetched",
      options: {
        filterType: 'textField',
        customFilterListOptions: { render: v => `Total Repos Fetched: ${v}` },
        setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top', textAlign: 'center', paddingLeft: '5px' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace:'normal', minWidth:'110px', maxWidth:'110px' }})
      }
    },
    {
      name: "fetch_repos",
      label: "Repos Fetched",
      options: {
        filterType: 'textField',
        customFilterListOptions: { render: v => `Repos Fetched: ${v}` },
        customBodyRender: (value) => {
          if(value.length === 0 || !value) {
            return null;
          }
          return (<div>
            {value.map((item, index) => {
              const repo = item.split('/').pop();
              return (<div key={index}>
                <Link underline="hover" target="_blank" rel="noopener noreferrer" href={`https://github.albertsons.com/${item}`}>{repo}</Link>
              </div>);
            })}
          </div>);
        },
        setCellProps: () => ({ style: { whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'left' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace:'nowrap' }})
      }
    },
    {
      name: "push_count",
      label: "Total Repos Pushed",
      options: {
        filterType: 'textField',
        customFilterListOptions: { render: v => `Total Repos Pushed: ${v}` },
        setCellProps: () => ({ style: { whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'center', paddingLeft: '5px' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace:'normal', minWidth:'110px', maxWidth:'110px' }})
      } 
    },
    {
      name: "push_repos",
      label: "Repos Pushed",
      options: {
        filterType: 'textField',
        customFilterListOptions: { render: v => `Repos Pushed: ${v}` },
        customBodyRender: (value) => {
          if(value.length === 0 || !value) {
            return null;
          }
          return (<div>
            {value.map((item, index) => {
              const repo = item.split('/').pop();
              return (<div key={index}>
                <Link underline="hover" target="_blank" rel="noopener noreferrer" href={`https://github.albertsons.com/${item}`}>{repo}</Link>
              </div>);
            })}
          </div>);
        },
        setCellProps: () => ({ style: { whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'left' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace:'nowrap' }})
      }
    },
    {
      name: "download_count",
      label: "Total Repos Downloaded",
      options: {
        filterType: 'textField',
        customFilterListOptions: { render: v => `Total Repos Downloaded: ${v}` },
        setCellProps: () => ({ style: { whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'center', paddingLeft: '5px' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace:'normal', minWidth:'110px', maxWidth:'110px' }})
      }
    },
    {
      name: "download_repos",
      label: "Repos Downloaded",
      options: {
        filterType: 'textField',
        customFilterListOptions: { render: v => `Repos Downloaded: ${v}` },
        customBodyRender: (value) => {
          if(value.length === 0 || !value) {
            return null;
          }
          return (<div>
            {value.map((item, index) => {
              const repo = item.split('/').pop();
              return (<div key={index}>
                <Link underline="hover" target="_blank" rel="noopener noreferrer" href={`https://github.albertsons.com/${item}`}>{repo}</Link>
              </div>);
            })}
          </div>);
        },
        setCellProps: () => ({ style: { whiteSpace: 'nowrap', verticalAlign: 'top', textAlign: 'left' }}),
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
    downloadOptions: {
      filename: "Audit Logs.csv",
      filterOptions: {
        useDisplayedColumnsOnly: true,
        useDisplayedRowsOnly: true
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
};

export default LogTable;