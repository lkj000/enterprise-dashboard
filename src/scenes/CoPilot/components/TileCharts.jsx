import { React } from "react";
import { Box } from '@mui/material';
import TileBox from "../../../components/TileBox";
import ActivityChart from "./CopilotAct/ActivityChart";
import UsageChart from "./UsageReport/UsageChart";
import { getTileData, getTab1TileFiles } from "./CopilotAct/TileInfo";
import { getTileReport, getTab2AllFiles } from "./UsageReport/TilesReport";


const TileCharts = ({ allData, tab, reportType, usageDays, dataState, selectStatus, viewState, colors }) => {

  const tileInfo = tab === 1 ? getTab1TileFiles(allData) : getTab2AllFiles(allData, usageDays);
  const tileDataArray = tab === 1 ? getTileData(tileInfo, dataState) : getTileReport(tileInfo, reportType, usageDays, dataState);


  return (

    <Box>

      {/* TILES */}
      <Box display="flex" flexDirection="column" justifyContent="space-between" sx={{ positionLeft:15, marginBottom: 5 }}>
        <Box
          display="grid"
          gridTemplateColumns="repeat(16, 1fr)"
          gridAutoRows="100px"
          gap="10px"
          marginBottom="20px"
        >        
          {tileDataArray.map((item, index) => {
            return (
              <TileBox key={index} actionIcon={null} title={item.title} text={item.text} size="4" info={false} value={[]} />
            )
          })}                
        </Box>
      </Box>

      {/* CHARTS */}
      {tab === 1 && (
        <ActivityChart allData={allData} dataState={dataState} selectStatus={selectStatus} viewState={viewState} colors={colors} />
      )}

      {tab === 2 && (
        <UsageChart tileInfo={tileInfo} reportType={reportType} dataState={dataState} colors={colors} />
      )}

    </Box>
  );
}

export default TileCharts;