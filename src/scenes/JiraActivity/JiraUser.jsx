import {React, useState} from "react";
import {Box} from '@mui/material';
import EnterpriseTile from "./components/Tiles/EnterpriseTile";
import CommonTile from "./components/Tiles/CommonTile";
import JiraTable from "./components/JiraTable";
import JiraDropdown from "./components/JiraDropdown";
import JiraTileChart from "./components/charts/JiraTileChart";
import { getSortDataForDropdown } from "../../utils";


const JiraUser = ({ data, lastRun, theme, colors }) => { 
    
    const [selectedPortfolio, setSelectedPortfolio] = useState("All");
    const [selectedVP, setSelectedVP] = useState("All");
    const [selectedDirector, setSelectedDirector] = useState("All");
    const [selectedManager, setSelectedManager] = useState("All");
    const [tileData, setTileData] = useState({});
    const [IssueColumn, setIssueColumn] = useState(false);
    const [StoryColumn, setStoryColumn] = useState(true);
    const EnterpriseState = (selectedPortfolio === 'All' || !selectedPortfolio) && (selectedVP === 'All' || !selectedVP) && (selectedDirector === 'All' || !selectedDirector) && (selectedManager === 'All' || !selectedManager);
    const TileChartState = ((selectedVP !== 'All' && selectedVP) || (selectedDirector !== 'All' && selectedDirector) || (selectedManager !== 'All' && selectedManager));
    const objDefaultFilter = getSortDataForDropdown(data, ["portfolio", "vp", "director", "manager"]);

    return (
        <Box>

            {/* DEFAULT STATE */}
            {EnterpriseState ?
            <EnterpriseTile IssueColumn={IssueColumn} StoryColumn={StoryColumn} /> : null}

            <JiraDropdown 
                input={data}
                objDefaultFilter={objDefaultFilter}
                selectedPortfolio={selectedPortfolio}
                setSelectedPortfolio={setSelectedPortfolio}
                selectedVP={selectedVP}
                setSelectedVP={setSelectedVP}
                selectedDirector={selectedDirector}
                setSelectedDirector={setSelectedDirector}
                selectedManager={selectedManager}
                setSelectedManager={setSelectedManager}
                setTileData={setTileData}
                setIssueColumn={setIssueColumn}
                setStoryColumn={setStoryColumn}
                theme={theme}
                colors={colors}
            />

            {/* Port, VP, Director, Manager - Tiles */}
            {!EnterpriseState ?
            <CommonTile tileData={tileData} selectedManager={selectedManager} IssueColumn={IssueColumn} StoryColumn={StoryColumn} /> : null}

            {/* Only VP, Director, Managers Selected - Charts */}
            {TileChartState ?
            <JiraTileChart tileData={tileData} IssueColumn={IssueColumn} StoryColumn={StoryColumn} colors={colors} /> : null}

            <JiraTable
                input={data}
                lastRun={lastRun}
                selectedPortfolio={selectedPortfolio}
                selectedVP={selectedVP}
                selectedDirector={selectedDirector}
                selectedManager={selectedManager}
                IssueColumn={IssueColumn}
                StoryColumn={StoryColumn}
                theme={theme}
                colors={colors}
            />

        </Box>
    );

}

export default JiraUser;