import React from 'react';
import { Box } from '@mui/material';
import TileBox from '../../../components/TileBox';
import SnowTable from './SnowTable';
import BarChartUser from '../../../components/BarChartUser';


const TilesGroup = ({ summary, filter, title, lastRun }) => {
  const filteredSummarySla = summary.filter(item => filter.madeSla === 'all' || item.made_sla === filter.madeSla);
  const filteredSummaryState = filteredSummarySla.filter(item => filter.state === 'all' || item.state === filter.state);
  const filteredSummaryAssignmentGroup = filteredSummaryState.filter(item => filter.assignmentGroup === 'all' || item.assignment_group === filter.assignmentGroup || (filter.assignmentGroup === "Not Specified" && !item.assignment_group));
  const filteredSummaryPortfolio = filteredSummaryAssignmentGroup.filter(item => filter.portfolio === 'all' || item.portfolio === filter.portfolio || (filter.portfolio === "Not Specified" && !item.portfolio));
  const filteredSummaryVp = filteredSummaryPortfolio.filter(item => filter.vp === 'all' || item.vp === filter.vp || (filter.vp === "Not Specified" && !item.vp));
  const filteredSummaryDirector = filteredSummaryVp.filter(item => filter.director === 'all' || item.director === filter.director || (filter.director === "Not Specified" && !item.director));
  const filteredSummary = filteredSummaryDirector.filter(item => filter.manager === 'all' || item.manager === filter.manager || (filter.manager === "Not Specified" && !item.manager));

  const closedStates = [
    'closed', 'closed complete', 'closed incomplete', 'closed skipped', 'resolved', 'awaiting vendor/resolved'
  ];
  let totalCount = 0, totalOpen = 0, totalClosed = 0, totalDraft = 0;
  filteredSummary.forEach(item => {
    totalCount += item.count;
    if (closedStates.includes(item.state.toLowerCase())) {
      totalClosed += item.count;
    } else if (item.state.toLowerCase() === 'unknown') {
      totalDraft += item.count;
    } else {
      totalOpen += item.count;
    }
  });

  // GET TILES, CHARTS DATA
  let tilesData = [
    {  id: "Total Count", value: totalCount },
    {  id: "Total Closed", value: totalClosed },
    {  id: "Total Open", value: totalOpen },
    {  id: "Total Draft", value: totalDraft },
  ];
  let graphData = tilesData.map(({ id, value }) => ({
    id: id === "Total Count" ? "Total" : id.split(" ")[1],
    value
  }));

  // Filter Tiles and charts (if all values are the same - show total count only)
  if (
    (totalCount === totalClosed && totalOpen === 0 && totalDraft === 0) ||
    (totalCount === totalOpen && totalClosed === 0 && totalDraft === 0) ||
    (totalCount === totalDraft && totalClosed === 0 && totalOpen === 0)
  ) {
    tilesData = [{ id: "Total Count", value: totalCount }];
    graphData = [{ id: "Total", value: totalCount }];
  }

  const totalValue = graphData.reduce((sum, item) => sum + item.value, 0);

  return (
    <Box>
      {/* Your component code here */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(16, 1fr)"
        gridAutoRows="100px"
        gap="10px"
        marginBottom="10px"
      >
        {tilesData.map(item => (
          <TileBox actionIcon={null} title={item.id} text={item.value} size="4" info={false} value={[]} />
        ))}
      </Box>
      {totalValue > 0 && (
        <div style={{ height: 500, position: "relative", marginTop: "50px" }}>
          <BarChartUser data={graphData} dataIndex="id" dataKeys={["value"]} mode="stacked" layout="vertical" marginCss={[20, 130, 130, 50]} colorType={["#50C878"]} legendX="Status" legendY="" XaxisRotate={-90} legendXOffset={120} translateX={120} topValue={true} label={false}/>
        </div>
      )}
      <SnowTable summary={filteredSummary} title={title} user={false} lastRun={lastRun} />
    </Box>
  );
};

export default TilesGroup;