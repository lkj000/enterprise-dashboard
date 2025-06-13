import { React, useState } from "react";
import { Box } from '@mui/material';
import ProjectDropdown from "./ProjectDropdown";
import SprintCharts from "./charts/SprintCharts";
import CurrentSprint from "./tables/CurrentSprint";
import EpicTable from "./tables/EpicTable";
import FeatureTable from "./tables/FeatureTable";
import JiraBacklog from "./tables/JiraBacklog";
import SprintTile from "./tiles/SprintTile";


const ProjectCard = ({ data, theme, colors }) => {

  const [ projKey, setProjKey ] = useState(null);
  const [ projData, setProjData ] = useState([]);
  const [ selectSprint, setSelectSprint ] = useState(null);
  const [ sprintData, setSprintData ] = useState([]);
  const [ projTables, setProjTables ] = useState([]);
  const [ weekend, setWeekend ] = useState(false);


  return (
    <Box>
      <ProjectDropdown
        input={data}
        projKey={projKey}
        setProjKey={setProjKey}
        setProjData={setProjData}
        selectSprint={selectSprint}
        setSelectSprint={setSelectSprint}
        setSprintData={setSprintData}
        setProjTables={setProjTables}
        weekend={weekend}
        setWeekend={setWeekend}
        theme={theme}
        colors={colors}
      />

      {/* Sprints */}
      {projKey ? (<Box>
        <SprintTile data={sprintData} weekend={weekend} />
        <SprintCharts data={sprintData} projData={projData} colors={colors} />
      </Box> ) : null }

      {/*Tables */}
      <CurrentSprint projKey={projKey} sprintData={sprintData} /> 
      <EpicTable input={projTables} />
      <FeatureTable input={projTables} />
      <JiraBacklog input={projTables} />

    </Box>
  );
}

export default ProjectCard;