import React from 'react';
import { Box } from '@mui/material';
import TileBox from '../../../../components/TileBox';
import { getTilesData } from './TilesInfo';


const KanbanTiles = ({ input }) => {

  const tilesList = Object.keys(input).length > 0 ? getTilesData(input) : [];


  return (
    <Box>
      {tilesList.length > 0 && (<Box
        display="grid"
        gridTemplateColumns="repeat(16, 1fr)"
        gridAutoRows="100px"
        gap="10px"
        marginBottom="10px"
      >
        {tilesList.map((data, index) => (
          <TileBox key={index} actionIcon={null} title={data.title} text={data.text} size={4} info={false} value={[]} />
        ))}
      </Box> )}
    </Box>
  );
};

export default KanbanTiles;