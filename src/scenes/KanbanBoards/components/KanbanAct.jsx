import { React, useState } from "react";
import { Box } from '@mui/material';
import EpicTable from "../../SprintActivity/components/tables/EpicTable";
import FeatureTable from "../../SprintActivity/components/tables/FeatureTable";
import KanbanChart from "./charts/KanbanChart";
import KanbanDropdown from "./KanbanDropdown";
import KanbanIssues from "./tables/KanbanIssues";
import KanbanTiles from "./tiles/KanbanTiles";


const KanbanAct = ({ data, theme, colors }) => {

  const [ projKey, setProjKey ] = useState(null);
  const [ projData, setProjData ] = useState({});
  const [ selectBoard, setSelectBoard ] = useState(null);
  const [ boardData, setBoardData ] = useState({});


  return (
    <Box>
      <KanbanDropdown
        input={data}
        projKey={projKey}
        setProjKey={setProjKey}
        selectBoard={selectBoard}
        setSelectBoard={setSelectBoard}
        setBoardData={setBoardData}
        setProjData={setProjData}
        theme={theme}
        colors={colors}
      />

      {/* Tiles , Charts */}
      {projKey && selectBoard && ( <Box>
        <KanbanTiles input={boardData} />
        <KanbanChart input={boardData} colors={colors} />
      </Box> )}

      {/* Tables */}
      {projKey && selectBoard && (<KanbanIssues input={boardData} />)}
      <EpicTable input={projData} />
      <FeatureTable input={projData} />

    </Box>
  );
}

export default KanbanAct;