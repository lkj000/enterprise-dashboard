import {React} from "react";
import { Box, useTheme } from '@mui/material';
import Header from "../../components/Header";
import KanbanAct from "./components/KanbanAct";
import { KanbanData } from "./requests";
import { tokens } from "../../theme";


const KanbanBoards = () => {
    
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
    

  return (
    <Box m="25px">

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Kanban Activity" subtitle="Kanban Activity in last 4 Weeks" />
      </Box>

      <KanbanAct data={KanbanData} theme={theme} colors={colors} />  
    </Box>
  );
}

export default KanbanBoards;