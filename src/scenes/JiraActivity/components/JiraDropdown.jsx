import {React, useState} from "react";
import {Grid} from '@mui/material';
import CustomAccordion from "../../../common-components/Accordion/CustomAccordion";
import Dropdown from "../../../common-components/Dropdown";
import RadioButton from "../../../common-components/RadioButton";
import PortfolioTile from "../../../data-json/portfolio_jira.json";
import VPTile from "../../../data-json/jira_vp_summary.json";
import DirectorTile from "../../../data-json/jira_directors_summary.json";
import ManagerTile from "../../../data-json/jira_managers_summary.json";
import { set1DataFilter } from "../../../utils";

const JiraDropdown = ({ input, objDefaultFilter, selectedPortfolio, setSelectedPortfolio, selectedVP, setSelectedVP, selectedDirector, setSelectedDirector, selectedManager, setSelectedManager, setIssueColumn, setStoryColumn, setTileData, theme, colors}) => {

    const [VPDropFilter, setVPDropFilter] = useState(objDefaultFilter["vp"]);
    const [DirectorDropFilter, setDirectorDropFilter] = useState(objDefaultFilter["director"]);
    const [ManagerDropFilter, setManagerDropFilter] = useState(objDefaultFilter["manager"]);
    const [viewState, setViewState] = useState("StoryBased");

    const handleChange = (event) => {
        setViewState(event.target.value); 
        if(event.target.value === "IssueBased"){
            setIssueColumn(true);
            setStoryColumn(false);
        }else if(event.target.value === "StoryBased"){
            setIssueColumn(false);
            setStoryColumn(true);
        }else{
            setIssueColumn(true);
            setStoryColumn(true);
        }
    };

    // PORTFOLIO
    const handleChangePortfolio = (event, newPortfolio) => {
        setSelectedPortfolio(newPortfolio);
        setSelectedVP("All");
        setSelectedDirector("All");
        setSelectedManager("All");

        if(newPortfolio === "All" || !newPortfolio) {
            setSelectedPortfolio("All");
            setVPDropFilter(objDefaultFilter["vp"]);
            setDirectorDropFilter(objDefaultFilter["director"]);
            setManagerDropFilter(objDefaultFilter["manager"]);
            setTileData({});
        }else{
            setTileData(PortfolioTile.portfolioData.filter(item => item.portfolio === newPortfolio)[0] || {});
            setVPDropFilter(set1DataFilter(input, "portfolio", newPortfolio, "vp"));
            setDirectorDropFilter(set1DataFilter(input, "portfolio", newPortfolio, "director"));
            setManagerDropFilter(set1DataFilter(input, "portfolio", newPortfolio, "manager"));
        }
    };

    // VP / DEPARTMENT
    const handleChangeVP = (event, newVP) => {
        setSelectedVP(newVP);
        setSelectedDirector("All");
        setSelectedManager("All");
        
        if(newVP === "All" || !newVP){
            setSelectedVP("All");
            if(selectedPortfolio === "All" || !selectedPortfolio){
                setTileData({});
                setDirectorDropFilter(objDefaultFilter["director"]);
                setManagerDropFilter(objDefaultFilter["manager"]);
            }else{
                setTileData(PortfolioTile.portfolioData.filter(item => item.portfolio === selectedPortfolio)[0] || {});
                setDirectorDropFilter(set1DataFilter(input, "portfolio", selectedPortfolio, "director"));
                setManagerDropFilter(set1DataFilter(input, "portfolio", selectedPortfolio, "manager"));
            }
        }else{
            setTileData(VPTile.find((item) => item.vp === newVP) || {});
            setDirectorDropFilter(set1DataFilter(input, "vp", newVP, "director"));
            setManagerDropFilter(set1DataFilter(input, "vp", newVP, "manager"));
        }
    };

    // DIRECTOR / TEAM
    const handleChangeDirector = (event, newDirector) => {
        setSelectedDirector(newDirector);
        setSelectedManager("All");

        if(newDirector === "All" || !newDirector){
            setSelectedDirector("All");
            if(selectedVP === "All" || !selectedVP){
                if(selectedPortfolio === "All" || !selectedPortfolio){
                    setTileData({});
                    setDirectorDropFilter(objDefaultFilter["director"]);
                    setManagerDropFilter(objDefaultFilter["manager"]);
                }else{
                    setTileData(PortfolioTile.portfolioData.filter(item => item.portfolio === selectedPortfolio)[0] || {});
                    setDirectorDropFilter(set1DataFilter(input, "portfolio", selectedPortfolio, "director"));
                    setManagerDropFilter(set1DataFilter(input, "portfolio", selectedPortfolio, "manager"));
                }
            }else{
                setTileData(VPTile.find((item) => item.vp === selectedVP) || {});
                setDirectorDropFilter(set1DataFilter(input, "vp", selectedVP, "director"));
                setManagerDropFilter(set1DataFilter(input, "vp", selectedVP, "manager"));
            }
        }else{
            setTileData(DirectorTile.find((item) => item.director === newDirector) || {});
            setManagerDropFilter(set1DataFilter(input, "director", newDirector, "manager"));
        }
    };

    // MANAGER
    const handleChangeManager = (event, newManager) => {
        setSelectedManager(newManager);
        
        if(newManager === "All" || !newManager){
            setSelectedManager("All");
            if(selectedDirector === "All" || !selectedDirector){
                if(selectedVP === "All" || !selectedVP){
                    if(selectedPortfolio === "All" || !selectedPortfolio){
                        setTileData({});
                        setVPDropFilter(objDefaultFilter["vp"]);
                        setDirectorDropFilter(objDefaultFilter["director"]);
                        setManagerDropFilter(objDefaultFilter["manager"]);
                    }else{
                        setTileData(PortfolioTile.portfolioData.filter(item => item.portfolio === selectedPortfolio)[0] || {});
                        setVPDropFilter(set1DataFilter(input, "portfolio", selectedPortfolio, "vp"));
                        setDirectorDropFilter(set1DataFilter(input, "portfolio", selectedPortfolio, "director"));
                        setManagerDropFilter(set1DataFilter(input, "portfolio", selectedPortfolio, "manager"));
                    }
                }else{
                    setTileData(VPTile.find((item) => item.vp === selectedVP) || {});
                    setDirectorDropFilter(set1DataFilter(input, "vp", selectedVP, "director"));
                    setManagerDropFilter(set1DataFilter(input, "vp", selectedVP, "manager"));
                }
            }else{
                setTileData(DirectorTile.find((item) => item.director === selectedDirector) || {});
                setManagerDropFilter(set1DataFilter(input, "director", selectedDirector, "manager"));
            }
        }else{
            setTileData(ManagerTile.data?.find((item) => item.manager === newManager && item.portfolio !== 'Business') || {});
        }
    };


    return (
            <CustomAccordion
                defaultValue={true}
                title="Filters"
                isDisplay={true}
                stylesInfo={{ marginBottom: '40px'}}
                colors={colors}
            >
                <Grid container>
                    <Dropdown
                        title="Portfolio"
                        subtitle="Portfolio"
                        options={objDefaultFilter["portfolio"]}
                        value={selectedPortfolio}
                        handleChange={handleChangePortfolio}
                        theme={theme}
                        colors={colors}
                    />
                    <Dropdown
                        title="Department"
                        subtitle="Department"
                        options={VPDropFilter}
                        value={selectedVP}
                        handleChange={handleChangeVP}
                        theme={theme}
                        colors={colors}
                    />
                    <Dropdown
                        title="Team"
                        subtitle="Team"
                        options={DirectorDropFilter}
                        value={selectedDirector}
                        handleChange={handleChangeDirector}
                        theme={theme}
                        colors={colors}
                    />
                    <Dropdown
                        title="Line Managers"
                        subtitle="line Manager"
                        options={ManagerDropFilter}
                        value={selectedManager}
                        handleChange={handleChangeManager}
                        theme={theme}
                        colors={colors}
                    />
                    {/* VIEW STATE */}
                    <RadioButton
                        title="Report Level"
                        value={viewState}
                        name={['StoryBased', 'IssueBased', 'Mix']}
                        label={['Story Based', 'Issue Based', 'Mix KPI']}
                        handleChange={handleChange}
                        colors={colors}
                    />
                </Grid>
            </CustomAccordion>
    );

}

export default JiraDropdown;