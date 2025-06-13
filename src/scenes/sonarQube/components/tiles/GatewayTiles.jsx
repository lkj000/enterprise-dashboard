import { React } from "react";
import { Box, Typography } from '@mui/material';
import TileBox from "../../../../components/TileBox";
import { qualityCheck } from "../../requests";


const GatewayTiles = () => {

  return (
    <Box>
      <Typography variant="h4" component="div" sx={{ flexGrow: 1, my: "15px" }}>
        Sonar Quality Gateway Info
      </Typography>

      <Box display="flex" flexDirection="column" justifyContent="space-between" sx={{ positionLeft:15, marginBottom: 5 }}>
        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="100px"
          gap="10px"
          marginBottom="10px"
        >
          {qualityCheck.map((data,index) => (
            <TileBox key={index} actionIcon={null} title={data.metric} text={data.operator + " " + data.value} size="4" info={true} value={[]} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default GatewayTiles;