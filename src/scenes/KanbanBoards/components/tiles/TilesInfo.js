export const getTilesData = (input) => {
  return [
    { title: "Open Issues", text: input?.openIssues ?? 0 },
    { title: "Completed Issues", text: input?.completedIssues ?? 0 },
    { title: "Blocked Issues", text: input?.blockedIssues ?? 0 },
    { title: "Issues not Assigned", text: input?.notAssigned ?? 0 },
    { title: "Total Issues", text: input?.totalIssues ?? 0 },
    { title: "Issues not Estimated", text: input?.notEstimated ?? 0 },
    { title: "Resources", text: input?.resources ?? 0 },
    { title: "Total Points", text: input?.totalPoints ?? 0 },
    { title: "Average Cycle Time", text: input?.averageCycleTime ?? '-' },
    { title: "Average Lead Time", text: input?.averageLeadTime ?? '-' },
  ];
};