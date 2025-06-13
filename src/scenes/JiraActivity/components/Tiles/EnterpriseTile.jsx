import { React } from "react";
import { Box } from '@mui/material';
import TileBox from "../../../../components/TileBox";
import Enterprise from "../../../../data-json/Enterprise_jira.json";
import { formatNumber } from "../../../../utils";

const EnterpriseTile = ({ IssueColumn, StoryColumn }) => {

    const tileDataArray = [
        { column: IssueColumn, title: "Enterprise - Total Issues Assigned", text: Enterprise.totalJiraCount },
        { column: IssueColumn, title: "Enterprise - Total Issues Closed", text: Enterprise.totalClosedStories },
        { column: StoryColumn, title: "Enterprise - Total Stories Assigned", text: Enterprise.total_stories },
        { column: StoryColumn, title: "Enterprise - Total Stories Closed", text: Enterprise.total_closed_story },
        { column: IssueColumn, title: "Enterprise - Avg. Issues per Rsc.", text: Enterprise.average_issues_per_user },
        { column: IssueColumn, title: "Enterprise - Avg. Issues Resolved per Rsc.", text: Enterprise.average_issues_done_per_user },
        { column: StoryColumn, title: "Enterprise - Avg. Stories per Rsc.", text: Enterprise.average_stories_per_user },
        { column: StoryColumn, title: "Enterprise - Avg. Stories Resolved per Rsc.", text: Enterprise.average_stories_done_per_user },
        { column: IssueColumn, title: "Enterprise - Total Issue Points", text: (Enterprise.totalStoryPoints).toFixed(1) },
        { column: IssueColumn, title: "Enterprise - Issue Points Closed", text: Enterprise.totalStoryPointsClosed },
        { column: IssueColumn, title: "Enterprise - Avg. Issue Points per Rsc.", text: Enterprise.average_story_points_per_user_issues },
        { column: IssueColumn, title: "Enterprise - Avg. Issue Points Resolved per Rsc.", text: Enterprise.average_story_points_closed_per_user_issues },
        { column: StoryColumn, title: "Enterprise - Total Story Points", text: (Enterprise.total_stories_points).toFixed(1) },
        { column: StoryColumn, title: "Enterprise - Story Points Closed", text: (Enterprise.total_closed_story_points).toFixed(1) },
        { column: StoryColumn, title: "Enterprise - Avg. Story Points per Rsc.", text: Enterprise.average_story_points_per_user },
        { column: StoryColumn, title: "Enterprise - Avg. Story Points Resolved per Rsc.", text: Enterprise.average_story_points_closed_per_user },
        { column: true, title: "No. of Resources (Rsc.)", text: Enterprise.userCount },
        { column: IssueColumn, title: "Enterprise - Avg. Issue Lead Time", text: Enterprise.averageLeadDays },
        { column: IssueColumn, title: "Enterprise - Avg. Issue Cycle Time", text: Enterprise.averageCycleTime },
        { column: StoryColumn, title: "Enterprise - Avg. Story Lead Time", text: Enterprise.averageStoryLeadDays },
        { column: StoryColumn, title: "Enterprise - Avg. Story Cycle Time", text: Enterprise.averageStoryCycleTime },
        { column: IssueColumn, title: "Enterprise - Weekly Closed Issues", text: Enterprise.current_week_sum_data?.issues_closed ?? '-' },
        { column: IssueColumn, title: "Enterprise - Weekly Issue Points Closed", text: formatNumber(Enterprise.current_week_sum_data?.issue_points_closed ?? 0) },
        { column: StoryColumn, title: "Enterprise - Weekly Closed Stories", text: Enterprise.current_week_sum_data?.stories_closed ?? '-' },
        { column: StoryColumn, title: "Enterprise - Weekly Story Points Closed", text: formatNumber(Enterprise.current_week_sum_data?.story_points_closed ?? 0) }
    ]

    return (
        <Box display="flex" flexDirection="column" justifyContent="space-between" sx={{ positionLeft: 15, marginBottom: 5 }}>
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
                            <TileBox key={index} actionIcon={null} title={item.title} text={item.text} size="4" info={true} value={[]} /> : null
                    )
                })}
            </Box>
        </Box>
    );

}

export default EnterpriseTile;