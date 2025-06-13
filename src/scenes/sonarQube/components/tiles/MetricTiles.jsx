import { React } from "react";
import { Box } from '@mui/material';
import TileBox from "../../../../components/TileBox";
import { getTilesData } from "./TilesInfo";


const MetricTiles = ({ data }) => {

  const tileData = getTilesData(data);

  return (
    <>
    {tileData.length > 0 && (
      <Box display="flex" flexDirection="column" justifyContent="space-between" sx={{ positionLeft:15, marginBottom: 5 }}>
        <Box
          display="grid"
          gridTemplateColumns="repeat(16, 1fr)"
          gridAutoRows="100px"
          gap="10px"
          marginBottom="20px"
        >        
          {tileData.map((item, index) => {
            return (
              <TileBox key={index} actionIcon={null} title={item.title} text={item.text} size="4" info={false} value={[]} />
            )
          })}
        </Box>
      </Box>)}
    </>
  );
};

export default MetricTiles;