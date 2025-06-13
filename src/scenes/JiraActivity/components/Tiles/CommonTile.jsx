import { React } from "react";
import { Box } from '@mui/material';
import TileBox from "../../../../components/TileBox";
import ProjectTileBox from "../../../../components/ProjectTileBox";
import Enterprise from "../../../../data-json/Enterprise_jira.json";

const getPercent = (field, EnterpriseData) => {
    const percentage = (field / EnterpriseData * 100).toFixed(2);
    return `${percentage} % of Enterprise`;
};

const getAvg = (data1, data2) => {
    return `Enterprise - ${(data1 / data2).toFixed(2)}`;
}

const metricsPercent = (data) => {
    return data.map(item => {
        const [key, value] = Object.entries(item)[0];
        return `${key}  -  ${value} %`;
    });
};

const CommonTile = ({ tileData, selectedManager, IssueColumn, StoryColumn }) => {

    // Portfolio, VP, Director (fields)
    const field1 = ["totalJiraCount", "totalClosedStories", "total_closed_story", "totalStoryPoints", "totalStoryPointsClosed",
        "total_stories_points", "userCount", "averageLeadDays", "averageCycleTime", "averageStoryLeadDays", "averageStoryCycleTime"];
    // Manager (fields)
    const field2 = ["total_issues", "total_closed_issues", "total_closed_stories", "total_story_points_issues", "total_closed_story_points_issues",
        "total_story_points", "total_users", "average_lead_time_manager", "average_cycle_time_manager", "average_lead_time_stories_manager", "average_cycle_time_stories_manager"];

    const data = selectedManager !== 'All' && selectedManager ? field2 : field1;

    const tileDataArray = Object.keys(tileData).length > 0 ? [
        { column: IssueColumn, title: "Total Issues Assigned", text: tileData[data[0]], value: getPercent(tileData[data[0]], Enterprise.totalJiraCount) },
        { column: IssueColumn, title: "Total Issues Closed", text: tileData[data[1]], value: getPercent(tileData[data[1]], Enterprise.totalClosedStories) },
        { column: StoryColumn, title: "Total Stories Assigned", text: tileData["total_stories"], value: getPercent(tileData["total_stories"], Enterprise.total_stories) },
        { column: StoryColumn, title: "Total Stories Closed", text: tileData[data[2]], value: getPercent(tileData[data[2]], Enterprise.total_closed_story) },
        { column: IssueColumn, title: "Avg. Issues per Rsc.", text: tileData["average_issues_per_user"], value: getAvg(Enterprise.totalJiraCount, Enterprise.userCount) },
        { column: IssueColumn, title: "Avg. Issues Resolved per Rsc.", text: tileData["average_issues_done_per_user"], value: getAvg(Enterprise.totalClosedStories, Enterprise.userCount) },
        { column: StoryColumn, title: "Avg. Stories per Rsc.", text: tileData["average_stories_per_user"], value: getAvg(Enterprise.total_stories, Enterprise.userCount) },
        { column: StoryColumn, title: "Avg. Stories Resolved per Rsc.", text: tileData["average_stories_done_per_user"], value: getAvg(Enterprise.total_closed_story, Enterprise.userCount) },
        { column: IssueColumn, title: "Total Issues Points (Pts.)", text: tileData[data[3]], value: getPercent(tileData[data[3]], Enterprise.totalStoryPoints) },
        { column: IssueColumn, title: "Total Issues Pts. Closed", text: tileData[data[4]], value: getPercent(tileData[data[4]], Enterprise.totalStoryPointsClosed) },
        { column: IssueColumn, title: "Avg. Issues Pts. per Rsc.", text: tileData["average_story_points_per_user_issues"], value: getAvg(Enterprise.totalStoryPoints, Enterprise.userCount) },
        { column: IssueColumn, title: "Avg. Issues Pts. Resolved per Rsc.", text: tileData["average_story_points_closed_per_user_issues"], value: getAvg(Enterprise.totalStoryPointsClosed, Enterprise.userCount) },
        { column: StoryColumn, title: "Total Story Points (Pts.)", text: tileData[data[5]], value: getPercent(tileData[data[5]], Enterprise.total_stories_points) },
        { column: StoryColumn, title: "Total Story Pts. Closed", text: tileData["total_closed_story_points"], value: getPercent(tileData["total_closed_story_points"], Enterprise.total_closed_story_points) },
        { column: StoryColumn, title: "Avg. Story Pts. per Rsc.", text: tileData["average_story_points_per_user"], value: getAvg(Enterprise.total_stories_points, Enterprise.userCount) },
        { column: StoryColumn, title: "Avg. Story Pts. Resolved per Rsc.", text: tileData["average_story_points_closed_per_user"], value: getAvg(Enterprise.total_closed_story_points, Enterprise.userCount) },
        { column: true, title: "No. of Resources (Rsc.)", text: tileData[data[6]], value: getPercent(tileData[data[6]], Enterprise.userCount) },
        { column: IssueColumn, title: "Avg. Issue Lead Time", text: tileData[data[7]], value: `Enterprise - ${Enterprise.averageLeadDays}` },
        { column: IssueColumn, title: "Avg. Issue Cycle Time", text: tileData[data[8]], value: `Enterprise - ${Enterprise.averageCycleTime}` },
        { column: StoryColumn, title: "Avg. Story Lead Time", text: tileData[data[9]], value: `Enterprise - ${Enterprise.averageStoryLeadDays}` },
        { column: StoryColumn, title: "Avg. Story Cycle Time", text: tileData[data[10]], value: `Enterprise - ${Enterprise.averageStoryCycleTime}` },
        { column: IssueColumn, title: "Weekly Closed Issues", value: (Enterprise.current_week_sum_data?.issues_closed ?? '-') === 0 
            ? 0 
            :  getPercent(tileData.current_week_sum_data?.issues_closed ?? '-', Enterprise.current_week_sum_data?.issues_closed ?? '-'), text: tileData.current_week_sum_data?.issues_closed ?? '-'},
        { column: IssueColumn, title: "Weekly Issue Points Closed", value: (Enterprise.current_week_sum_data?.issue_points_closed ?? '-') === 0 
            ? 0 
            : getPercent(tileData.current_week_sum_data?.issue_points_closed ?? '-', Enterprise.current_week_sum_data?.issue_points_closed ?? '-'), text: tileData.current_week_sum_data?.issue_points_closed ?? '-'},
        { column: StoryColumn, title: "Weekly Closed Stories", value: (Enterprise.current_week_sum_data?.stories_closed ?? '-') === 0 
            ? 0 
            : getPercent(tileData.current_week_sum_data?.stories_closed ?? '-', Enterprise.current_week_sum_data?.stories_closed ?? '-'), text: tileData.current_week_sum_data?.stories_closed ?? '-'},
        { column: StoryColumn, title: "Weekly Story Points Closed", value: (Enterprise.current_week_sum_data?.story_points_closed ?? '-') === 0 
            ? 0 
            :  getPercent(tileData.current_week_sum_data?.story_points_closed ?? '-', Enterprise.current_week_sum_data?.story_points_closed ?? '-'), text: tileData.current_week_sum_data?.story_points_closed ?? '-'}
    ] : [];

    return (
        <>
            {Object.keys(tileData).length > 0 ?
                <>
                    <Box display="flex" flexDirection="column" justifyContent="space-between" sx={{ positionLeft: 15, marginBottom: 5 }}>
                        {selectedManager !== 'All' && selectedManager && tileData.project_percentages.length > 0 ? <Box marginBottom="10px">
                            <ProjectTileBox actionIcon={null} title="Project(s)" text={metricsPercent(tileData.project_percentages)} size="4" info={false} value={[]} />
                        </Box> : null}

                        <Box
                            display="grid"
                            gridTemplateColumns="repeat(16, 1fr)"
                            gridAutoRows="100px"
                            gap="10px"
                            marginBottom="10px"
                        >
                            {tileDataArray.map((item, index) => {
                                return (
                                    item.column ?
                                        <TileBox key={index} actionIcon={null} title={item.title} text={item.text} size="4" info={false} value={[item.value]} /> : null
                                )
                            })}
                        </Box>

                    </Box>
                </> : null}
        </>
    );
}

export default CommonTile;