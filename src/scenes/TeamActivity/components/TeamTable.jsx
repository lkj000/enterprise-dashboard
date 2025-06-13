import { React } from "react";
import { Box } from '@mui/material';
import MUIDataTable from "mui-datatables";
import { manager_lastrun } from "../requests";
import { LastUpdatedOnComponent } from "../../../utils";
import '../../global/custom-table.css';


const TeamTable = ({ input, port, selectVP, selectDirector, selectManager, colState, toggleState }) => {


  const columns = [
    { 
      name: "index", 
      label: "S.No",
      options: {
        filter: false,
        setCellProps: () => ({ style: { whiteSpace:'nowrap', verticalAlign: 'top' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace:'nowrap' }})
      },
      alwaysVisible: true 
    },
    {
      name: "manager",
      label: "Manager Name",
      options: {
        filter: true,
        filterType: 'dropdown',
        filterList: selectManager === 'All' || !selectManager ? [] : [selectManager],
        customFilterListOptions: { render: v =>  `Manager Name: ${v}` },
        setCellProps: () => ({ style: { whiteSpace:'nowrap', verticalAlign: 'top' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace:'nowrap' }})
      },
      alwaysVisible: true 
    },
    {
      name: "portfolio",
      label: "Portfolio",
      options: {
        filter: true,
        filterType: 'dropdown',
        filterList: port === 'All' || !port ? [] : [port],
        customFilterListOptions: { render: v =>  `Portfolio: ${v}` },
        setCellProps: () => ({ style: { whiteSpace:'nowrap', verticalAlign: 'top' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace:'nowrap' }})
      },
      alwaysVisible: true 
    },
    {
      name: "vp",
      label: "Department",
      options: {
        filter: true,
        filterType: 'dropdown',
        filterList: selectVP === 'All' || !selectVP ? [] : [selectVP],
        customFilterListOptions: { render: v =>  `Department: ${v}` },
        setCellProps: () => ({ style: { whiteSpace:'nowrap', verticalAlign: 'top' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace:'nowrap'}})
      },
      alwaysVisible: true 
    },
    {
      name: "director",
      label: "Team",
      options:{
        filter: true,
        filterType: 'dropdown',
        filterList: selectDirector === 'All' || !selectDirector ? [] : [selectDirector],
        customFilterListOptions: { render: v =>  `Team: ${v}` },
        setCellProps: () => ({ style: { whiteSpace:'nowrap', verticalAlign: 'top' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace:'nowrap' }})
      },
      alwaysVisible: true 
    },
    {
      name: "total_users",
      label: "Total Resources",
      options: {
        filter: true,   
        filterType: 'textField',
        setCellProps: () => ({ style: { whiteSpace:'normal', verticalAlign: 'top', textAlign: 'center', paddingLeft: '0px' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'normal', minWidth: '75px', maxWidth: '75px' }})
      },
      alwaysVisible: true 
    },
    {
      name: "total_users_percentage",
      label: "Total Resource (%)",
      options: {
        filter: true,
        filterType: 'textField',
        setCellProps: () => ({ style: { whiteSpace:'normal', verticalAlign: 'top', textAlign: 'center', paddingLeft: '0px' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'normal', minWidth: '115px', maxWidth: '115px' }}),
        display: toggleState.issuePercent || toggleState.storyPercent
      }
    },
    {
      name: "total_stories",
      label: "Total Stories",
      options: {
        filter: true,
        filterType: 'textField',
        setCellProps: () => ({ style: { whiteSpace:'normal', verticalAlign: 'top', textAlign: 'center', paddingLeft: '0px' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'normal', minWidth: '75px', maxWidth: '75px' }}),
        display: colState.story
      }
    },
    {
      name: "total_stories_percentage",
      label: "Total Stories (%)",
      options: {
        filter: true,   
        filterType: 'textField',
        setCellProps: () => ({style: {whiteSpace:'normal', verticalAlign: 'top', textAlign: 'center', paddingLeft: '0px' }}),
        setCellHeaderProps: () => ({style: { whiteSpace: 'normal', minWidth: '105px', maxWidth: '105px' }}),
        display: toggleState.storyPercent
      }
    },
    {
      name: "total_closed_stories",
      label: "Total Closed Stories",
      options: {
        filter: true,
        filterType: 'textField',
        setCellProps: () => ({ style: { whiteSpace:'normal', verticalAlign: 'top', textAlign: 'center', paddingLeft: '0px' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'normal', minWidth: '110px', maxWidth: '110px' }}),
        display: colState.story
      }
    },
    {
      name: "total_closed_stories_percentage",
      label: "Total Closed Stories (%)",
      options: {
        filter: true,
        filterType: 'textField',
        setCellProps: () => ({ style: { whiteSpace:'normal', verticalAlign: 'top', textAlign: 'center', paddingLeft: '0px' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'normal', minWidth: '110px', maxWidth: '110px' }}),
        display: toggleState.storyPercent
      }
    },
    {
      name: "total_story_points",
      label: "Total Story Points",
      options: {
        filter: true,
        filterType: 'textField',
        setCellProps: () => ({ style: { whiteSpace:'normal', verticalAlign: 'top', textAlign: 'center', paddingLeft: '0px' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'normal', minWidth: '105px', maxWidth: '105px' }}),
        display: colState.story
      }
    },
    {
      name: "total_story_points_percentage",
      label: "Total Story Points (%)",
      options: {
        filter: true,
        filterType: 'textField',
        setCellProps: () => ({ style: { whiteSpace:'normal', verticalAlign: 'top', textAlign: 'center', paddingLeft: '0px' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'normal', minWidth: '105px', maxWidth: '105px' }}),
        display: toggleState.storyPercent
      }
    },
    {
      name: "total_closed_story_points",
      label: "Total Closed Story Points",
      options: {
        filter: true,
        filterType: 'textField',
        setCellProps: () => ({ style: { whiteSpace:'normal', verticalAlign: 'top', textAlign: 'center', paddingLeft: '0px' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'normal', minWidth: '110px', maxWidth: '110px' }}),
        display: colState.story
      }
    },
    {
      name: "total_closed_story_points_percentage",
      label: "Total Closed Story Points (%)",
      options: {
        filter: true,
        filterType: 'textField',
        setCellProps: () => ({ style: { whiteSpace:'normal', verticalAlign: 'top', textAlign: 'center', paddingLeft: '0px' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'normal', minWidth: '110px', maxWidth: '110px' }}),
        display: toggleState.storyPercent
      }
    },
    {
      name: "average_stories_per_user",
      label: "Average Stories Per User",
      options: {
        filter: true,
        filterType: 'textField',
        setCellProps: () => ({ style: { whiteSpace:'normal', verticalAlign: 'top', textAlign: 'center', paddingLeft: '0px' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'normal', minWidth: '125px', maxWidth: '125px' }}),
        display: colState.story
      }
    },
    {
      name: "enterprise_average_stories_per_user",
      label: "Average Stories Per User (Enterprise)",
      options: {
        filter: true,
        filterType: 'textField',
        setCellProps: () => ({ style: { whiteSpace:'normal', verticalAlign: 'top', textAlign: 'center', paddingLeft: '0px' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'normal', minWidth: '125px', maxWidth: '125px' }}),
        display: toggleState.storyPercent
      }
    },
    {
      name: "average_stories_done_per_user",
      label: "Average Stories Closed Per User",
      options: {
        filter: true,
        filterType: 'textField',
        setCellProps: () => ({ style: { whiteSpace:'normal', verticalAlign: 'top', textAlign: 'center', paddingLeft: '0px' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'normal', minWidth: '130px', maxWidth: '130px' }}),
        display: colState.story
      } 
    },
    {
      name: "enterprise_average_stories_done_per_user",
      label: "Average Stories Closed Per User (Enterprise)",
      options: {
        filter: true,
        filterType: 'textField',
        setCellProps: () => ({ style: { whiteSpace:'normal', verticalAlign: 'top', textAlign: 'center', paddingLeft: '0px' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'normal', minWidth: '140px', maxWidth: '140px' }}),
        display: toggleState.storyPercent
      }
    },
    {
      name: "average_story_points_per_user",
      label: "Average Story Points Per User",
      options: {
        filter: true,
        filterType: 'textField',
        setCellProps: () => ({ style: { whiteSpace:'normal', verticalAlign: 'top', textAlign: 'center', paddingLeft: '2px' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'normal', minWidth: '130px', maxWidth: '130px' }}),
        display: colState.story
      } 
    },
    {
      name: "enterprise_average_story_points_per_user",
      label: "Average Story Points Per User (Enterprise)",
      options: {
        filter: true,
        filterType: 'textField',
        setCellProps: () => ({ style: { whiteSpace:'normal', verticalAlign: 'top', textAlign: 'center', paddingLeft: '2px' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'normal', minWidth: '135px', maxWidth: '135px' }}),
        display: toggleState.storyPercent
      }
    },
    {
      name: "average_story_points_closed_per_user",
      label: "Average Story Points Closed Per User",
      options: {
        filter: true,
        filterType: 'textField',
        setCellProps: () => ({ style: { whiteSpace:'normal', verticalAlign: 'top', textAlign: 'center', paddingLeft: '2px' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'normal', minWidth: '155px', maxWidth: '155px' }}),
        display: colState.story
      } 
    },
    {
      name: "enterprise_average_story_points_closed_per_user",
      label: "Average Story Points Closed Per User (Enterprise)",
      options: {
        filter: true,
        filterType: 'textField',
        setCellProps: () => ({ style: { whiteSpace:'normal', verticalAlign: 'top', textAlign: 'center', paddingLeft: '5px' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'normal', minWidth: '155px', maxWidth: '155px' }}),
        display: toggleState.storyPercent
      }
    },
    {
      name: "total_issues",
      label: "Total Issues",
      options: {
        filter: true,
        filterType: 'textField',
        setCellProps: () => ({ style: { whiteSpace:'normal', verticalAlign: 'top', textAlign: 'center', paddingLeft: '0px' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'normal', minWidth: '75px', maxWidth: '75px' }}),
        display: colState.issue
      }
    },
    {
      name: "total_issues_percentage",
      label: "Total Issues (%)",
      options: {
        filter: true,   
        filterType: 'textField',
        setCellProps: () => ({ style: { whiteSpace:'normal', verticalAlign: 'top', textAlign: 'center', paddingLeft: '0px' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'normal', minWidth: '105px', maxWidth: '105px' }}),
        display: toggleState.issuePercent
      }
    },
    {
      name: "total_closed_issues",
      label: "Total Closed Issues",
      options: {
        filter: true,
        filterType: 'textField',
        setCellProps: () => ({ style: { whiteSpace:'normal', verticalAlign: 'top', textAlign: 'center', paddingLeft: '0px' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'normal', minWidth: '110px', maxWidth: '110px' }}),
        display: colState.issue
      }
    },
    {
      name: "total_closed_issues_percentage",
      label: "Total Closed Issues (%)",
      options: {
        filter: true,
        filterType: 'textField',
        setCellProps: () => ({ style: { whiteSpace:'normal', verticalAlign: 'top', textAlign: 'center', paddingLeft: '0px' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'normal', minWidth: '110px', maxWidth: '110px' }}),
        display: toggleState.issuePercent
      }
    },
    {
      name: "total_story_points_issues",
      label: "Total Issue Points",
      options: {
        filter: true,
        filterType: 'textField',
        setCellProps: () => ({ style: { whiteSpace:'normal', verticalAlign: 'top', textAlign: 'center', paddingLeft: '0px' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'normal', minWidth: '110px', maxWidth: '110px' }}),
        display: colState.issue
      }
    },
    {
      name: "total_story_points_percentage_issues",
      label: "Total Issue Points (%)",
      options: {
        filter: true,
        filterType: 'textField',
        setCellProps: () => ({ style: { whiteSpace:'normal', verticalAlign: 'top', textAlign: 'center', paddingLeft: '0px' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'normal', minWidth: '110px', maxWidth: '110px' }}),
        display: toggleState.issuePercent
      }
    },
    {
      name: "total_closed_story_points_issues",
      label: "Total Closed Issue Points",
      options: {
        filter: true,
        filterType: 'textField',
        setCellProps: () => ({ style: { whiteSpace:'normal', verticalAlign: 'top', textAlign: 'center', paddingLeft: '0px' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'normal', minWidth: '140px', maxWidth: '140px' }}),
        display: colState.issue
      } 
    },
    {
      name: "total_closed_story_points_percentage_issues",
      label: "Total Closed Issue Points (%)",
      options: {
        filter: true,
        filterType: 'textField',
        setCellProps: () => ({ style: { whiteSpace:'normal', verticalAlign: 'top', textAlign: 'center', paddingLeft: '0px' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'normal', minWidth: '110px', maxWidth: '110px' }}),
        display: toggleState.issuePercent
      }
    },
    {
      name: "average_lead_time_per_user",
      label: "Average Issue Lead Time Per User",
      options: {
        filter: true,
        filterType: 'textField',
        setCellProps: () => ({ style: { whiteSpace:'normal', verticalAlign: 'top', textAlign: 'center', paddingLeft: '0px' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'normal', minWidth: '145px', maxWidth: '145px' }}),
        display: colState.issue
      }
    },
    {
      name: "enterprise_average_lead_time",
      label: "Average Issue Lead Time (Enterprise)",
      options: {
        filter: true,
        filterType: 'textField',
        setCellProps: () => ({ style: { whiteSpace:'normal', verticalAlign: 'top', textAlign: 'center', paddingLeft: '0px' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'normal', minWidth: '125px', maxWidth: '125px' }}),
        display: toggleState.issuePercent
      }
    },
    {
      name: "average_issues_per_user",
      label: "Average Issue Per User",
      options: {
        filter: true,
        filterType: 'textField',
        setCellProps: () => ({ style: { whiteSpace:'normal', verticalAlign: 'top', textAlign: 'center', paddingLeft: '0px' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'normal', minWidth: '125px', maxWidth: '125px' }}),
        display: colState.issue
      }
    },
    {
      name: "enterprise_average_issues_per_user",
      label: "Average Issue Per User (Enterprise)",
      options: {
        filter: true,
        filterType: 'textField',
        setCellProps: () => ({ style: { whiteSpace:'normal', verticalAlign: 'top', textAlign: 'center', paddingLeft: '0px' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'normal', minWidth: '125px', maxWidth: '125px' }}),
        display: toggleState.issuePercent
      }
    },
    {
      name: "average_issues_done_per_user",
      label: "Average Issue Closed Per User",
      options: {
        filter: true,
        filterType: 'textField',
        setCellProps: () => ({ style: { whiteSpace:'normal', verticalAlign: 'top', textAlign: 'center', paddingLeft: '0px' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'normal', minWidth: '130px', maxWidth: '130px' }}),
        display: colState.issue
      } 
    },
    {
      name: "enterprise_average_issues_done_per_users",
      label: "Average Issue Closed Per User (Enterprise)",
      options: {
        filter: true,
        filterType: 'textField',
        setCellProps: () => ({ style: { whiteSpace:'normal', verticalAlign: 'top', textAlign: 'center', paddingLeft: '0px' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'normal', minWidth: '140px', maxWidth: '140px' }}),
        display: toggleState.issuePercent
      }
    },
    {
      name: "average_story_points_per_user_issues",
      label: "Average Issue Points Per User",
      options: {
        filter: true,
        filterType: 'textField',
        setCellProps: () => ({ style: { whiteSpace:'normal', verticalAlign: 'top', textAlign: 'center', paddingLeft: '2px' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'normal', minWidth: '145px', maxWidth: '145px' }}),
        display: colState.issue
      }
    },
    {
      name: "enterprise_average_story_points_per_user_issues",
      label: "Average Issue Points Per User (Enterprise)",
      options: {
        filter: true,
        filterType: 'textField',
        setCellProps: () => ({ style: { whiteSpace:'normal', verticalAlign: 'top', textAlign: 'center', paddingLeft: '2px' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'normal', minWidth: '145px', maxWidth: '145px' }}),
        display: toggleState.issuePercent
      }
    },
    {
      name: "average_story_points_closed_per_user_issues",
      label: "Average Issue Points Closed Per User",
      options: {
        filter: true,
        filterType: 'textField',
        setCellProps: () => ({ style: { whiteSpace:'normal', verticalAlign: 'top', textAlign: 'center', paddingLeft: '2px' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'normal', minWidth: '155px', maxWidth: '155px' }}),
        display: colState.issue
      }
    },
    {
      name: "enterprise_average_story_points_closed_per_user_issues",
      label: "Average Issue Points Closed Per User (Enterprise)",
      options: {
        filter: true,
        filterType: 'textField',
        setCellProps: () => ({ style: { whiteSpace:'normal', verticalAlign: 'top', textAlign: 'center', paddingLeft: '5px' }}),
        setCellHeaderProps: () => ({ style: { whiteSpace: 'normal', minWidth: '155px', maxWidth: '155px' }}),
        display: toggleState.issuePercent
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
      filename: "Team Activity.csv",
      filterOptions: {
        useDisplayedColumnsOnly: true,
        useDisplayedRowsOnly: true,
      }
    }
  };


  return (
    <Box>
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
              manager_lastrun && <LastUpdatedOnComponent props={props} date={manager_lastrun}/>
            )
          }}
        />
      </Box>
    </Box>
  );
};

export default TeamTable;