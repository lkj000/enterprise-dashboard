import { React } from "react";
import { Box } from '@mui/material';
import TileBox from "../../../../components/TileBox";
import { formatDate } from "../../../../utils";
import { formatAvgTime, getWeekendData } from "./TileInfo";


const SprintTile = ({ data, weekend }) => {

  const [daysRemain, totCapacity, remainCapacity] = data ? getWeekendData(weekend, data?.startDate, data?.endDate, data?.resources) : ["-", "-", "-"];


  const tileData = [
    {  title: "Active Sprint", text: data?.name ?? "-"  },
    {  title: "Start Date", text: data?.startDate ? formatDate(data.startDate) : "-" },
    {  title: "End Date", text: data?.endDate ? formatDate(data.endDate) : "-" },
    // These below three are affected by the noWeekend state
    {  title: "No. Days Left", text: daysRemain  },
    { title: "Total Capacity", text: totCapacity + " hours"  },
    { title: "Remaining Capacity", text: remainCapacity + " hours"  },
    { title: "No. Resources", text: data?.resources ?? "-" },
    { title: "Issues not Started", text: data?.sprintData?.notStarted ?? "-"  },
    { title: "Issues Expired", text: data?.sprintData?.expiredDue ?? "-"  },
    { title: "Total Issues", text: data?.sprintData?.issueCount ?? "-"  },
    { title: "Total Issues Closed", text: data?.sprintData?.totalIssuesClosed ?? "-"  },
    { title: "Total Issue Points (Pts.)", text: data?.sprintData?.storyPoints  ?? "-"  },
    { title: "Total Issue Pts. Closed", text: data?.sprintData?.totalIssuesClosedPoints ?? "-"  },
    { title: "Total Stories", text: data?.sprintData?.totalStoryCount ?? "-"  },
    { title: "Total Stories Closed", text: data?.sprintData?.totalStoriesClosed ?? "-"  },
    { title: "Total Story Points (Pts.)", text: data?.sprintData?.totalStoryPoints ?? "-"  },
    { title: "Total Story Pts. Closed", text: data?.sprintData?.totalStoriesClosedPoints ?? "-"  },
    { title: "Issues Without Estimate", text: data?.sprintData?.issuesWithoutEstimate ?? "-"  },
    { title: "Average Stories lead time", text: formatAvgTime(data?.sprintData?.leadTimeAvg) ?? "-"  },
    { title: "Scope Creep Issues", text: data?.createdAfterStart ?? "-"  },
    { title: "Scope Creep Stories", text: data?.createdAfterStartStories ?? "-"  },
  ];



  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      sx={{ positionLeft: 15 }}
    >
      {Object.values(data).length > 0 && (
      <Box
        display="grid"
        gridTemplateColumns="repeat(16, 1fr)"
        gridAutoRows="100px"
        gap="10px"
      >
        <TileBox actionIcon={null} title="Goal" text={data.goal && data.goal.length > 200 ? data.goal.substring(0, 200) + "..." : data.goal} size="16" info={false} value={[]} />
        {tileData.map((item, index) => (
            <TileBox key={index} actionIcon={null} title={item.title} text={item.text} size="4" info={false} value={[]} />
        ))}
      </Box>
      )}
    </Box>
  );
}

export default SprintTile;