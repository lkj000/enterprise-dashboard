import { Box, Typography } from '@mui/material';
import TileBox from "../../../../components/TileBox";
import { getTilesData } from './TilesFunc';


const TileCard = ({ input, usage, usageDays, dataState, colors }) => {

  const tileData = getTilesData(input, usage, usageDays, dataState);

  return (
    <>
    {tileData.map((data, inx) => {
      const tileType = Object.keys(data)[0];
      return (
      <Box key={inx}>
        <Typography fontSize={18} sx={{ color: colors.tertiary[400], fontWeight: 600, mb: 2 }}>
          {tileType}
        </Typography>

        <Box display="flex" flexDirection="column" justifyContent="space-between" sx={{ positionLeft:15, marginBottom: 5 }}>
          <Box
            display="grid"
            gridTemplateColumns="repeat(16, 1fr)"
            gridAutoRows="100px"
            gap="10px"
            marginBottom="20px"
          >   
            {data[tileType].map((item, index) => {
              return (
                <TileBox key={index} actionIcon={null} title={item.title} text={item.text} size="4" info={false} value={[]} />
              )
            })} 
          </Box>
        </Box>
      </Box>)})}
    </>
  );
}

export default TileCard;