import {React, useState} from "react";
import { Box, Typography, useTheme, useMediaQuery, Grid, Autocomplete, TextField } from '@mui/material';
import MUIDataTable from "mui-datatables";
import TileBox from './TileBox';
import '../scenes/global/custom-table.css';
import { tokens } from "../theme";


const OrgTable = ({input, tierInfo, objInfo, defaultFilter}) => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [Tier1FilterDrop, setTier1FilterDrop] = useState(["All", ...defaultFilter["Tier1"]]);
    const [Tier2FilterDrop, setTier2FilterDrop] = useState(["All", ...defaultFilter["Tier2"]]);
    const [Tier3FilterDrop, setTier3FilterDrop] = useState(["All", ...defaultFilter["Tier3"]]);
    const [Tier4FilterDrop, setTier4FilterDrop] = useState(["All", ...defaultFilter["Tier4"]]);
    const [Tier5FilterDrop, setTier5FilterDrop] = useState(["All", ...defaultFilter["Tier5"]]);
    const [Tier1Data, setTier1Data] = useState('All');
    const [Tier2Data, setTier2Data] = useState('All');
    const [Tier3Data, setTier3Data] = useState('All');
    const [Tier4Data, setTier4Data] = useState('All');
    const [Tier5Data, setTier5Data] = useState('All');
    const [TableTier1Filter, setTableTier1Filter] = useState([]);
    const [TableTier2Filter, setTableTier2Filter] = useState([]);
    const [TableTier3Filter, setTableTier3Filter] = useState([]);
    const [TableTier4Filter, setTableTier4Filter] = useState([]);
    const [TableTier5Filter, setTableTier5Filter] = useState([]);
    const [TableTier6Filter, setTableTier6Filter] = useState([]);
  //TILE DATA'S
    const [TotalUsers, setTotalUsers] = useState(input.length);
    const [FullTimeUsers, setFullTimeUsers] = useState(input.filter(item => !item.displayName.toLowerCase().includes('contractor')).length);
    const [ContractUsers, setContractUsers] = useState(input.filter(item => item.displayName.toLowerCase().includes('contractor')).length);
    const [ActiveGithub, setActiveGithub] = useState(input.filter(item => item.github_status === 'Active').length);
    const [ActiveJira, setActiveJira] = useState(input.filter(item => item.jira_status === 'Active').length);

    
    // TIER 1
    const handleSelectedTier1 = (event, newselectedTier1) => {
        setTier1Data(newselectedTier1);
        setTier2Data('All');
        setTier3Data('All');
        setTier4Data('All');
        setTier5Data('All');
        setTableTier3Filter([]);
        setTableTier4Filter([]);
        setTableTier5Filter([]);
        setTableTier6Filter([]);

        if(newselectedTier1 === 'All' || newselectedTier1 === null || newselectedTier1 === '') {
            setTableTier1Filter([]);
            setTableTier2Filter([]);
            setTier2FilterDrop(["All", ...defaultFilter["Tier2"]]);
            setTier3FilterDrop(["All", ...defaultFilter["Tier3"]]);
            setTier4FilterDrop(["All", ...defaultFilter["Tier4"]]);
            setTier5FilterDrop(["All", ...defaultFilter["Tier5"]]);
            setTotalUsers(input.length);
            setFullTimeUsers(input.filter(item => !item.displayName.toLowerCase().includes('contractor')).length);
            setContractUsers(input.filter(item => item.displayName.toLowerCase().includes('contractor')).length);
            setActiveGithub(input.filter(item => item.github_status === 'Active').length);
            setActiveJira(input.filter(item => item.jira_status === 'Active').length);
        } else {
            setTableTier1Filter([objInfo.Tier1[newselectedTier1].t1]);
            setTableTier2Filter(['Not Empty']);

            var t1data = objInfo.Tier1[newselectedTier1].t1;
            var t2List = tierInfo["Tier2"].filter(item => item.t1 === t1data).map(data => data.displayName).sort();
            var t3List = tierInfo["Tier3"].filter(item => item.t1 === t1data).map(data => data.displayName).sort();
            var t4List = tierInfo["Tier4"].filter(item => item.t1 === t1data).map(data => data.displayName).sort();
            var t5List = tierInfo["Tier5"].filter(item => item.t1 === t1data).map(data => data.displayName).sort();
            setTier2FilterDrop(["All", ...t2List]);
            setTier3FilterDrop(["All", ...t3List]);
            setTier4FilterDrop(["All", ...t4List]);
            setTier5FilterDrop(["All", ...t5List]);

            //TILES' DATA
            var tile1Data = input.filter(item => item.t1 === t1data && item.t2 !== undefined);
            setTotalUsers(tile1Data.length);
            setFullTimeUsers(tile1Data.filter(item => !item.displayName.toLowerCase().includes('contractor')).length);
            setContractUsers(tile1Data.filter(item => item.displayName.toLowerCase().includes('contractor')).length);
            setActiveGithub(tile1Data.filter(item => item.github_status === 'Active').length);
            setActiveJira(tile1Data.filter(item => item.jira_status === 'Active').length);
        }

    };

    // TIER 2
    const handleSelectedTier2 = (event, newselectedTier2) => {
        setTier2Data(newselectedTier2);
        setTier3Data('All');
        setTier4Data('All');
        setTier5Data('All');
        setTableTier4Filter([]);
        setTableTier5Filter([]);
        setTableTier6Filter([]);

        if(newselectedTier2 === 'All' || newselectedTier2 === null || newselectedTier2 === '') {
            setTableTier3Filter([]);
            setTableTier4Filter([]);
            setTableTier5Filter([]);
            setTableTier6Filter([]);

            if(Tier1Data === 'All' || Tier1Data === null || Tier1Data === '') {
                setTableTier1Filter([]);
                setTableTier2Filter([]);
                setTier1Data('All');
                setTier2FilterDrop(["All", ...defaultFilter["Tier2"]]);
                setTier3FilterDrop(["All", ...defaultFilter["Tier3"]]);
                setTier4FilterDrop(["All", ...defaultFilter["Tier4"]]);
                setTier5FilterDrop(["All", ...defaultFilter["Tier5"]]);

                //TILES' DATA
                setTotalUsers(input.length);
                setFullTimeUsers(input.filter(item => !item.displayName.toLowerCase().includes('contractor')).length);
                setContractUsers(input.filter(item => item.displayName.toLowerCase().includes('contractor')).length);
                setActiveGithub(input.filter(item => item.github_status === 'Active').length);
                setActiveJira(input.filter(item => item.jira_status === 'Active').length);

            } else if(Tier1Data !== 'All' || Tier1Data !== null || Tier1Data !== '') {
                setTableTier1Filter([objInfo.Tier1[Tier1Data].t1]);
                setTableTier2Filter(['Not Empty']);
                var t2Data = tierInfo["Tier2"].filter(item => item.t1 === objInfo.Tier1[Tier1Data].t1).map(data => data.displayName).sort();
                var t3Data = tierInfo["Tier3"].filter(item => item.t1 === objInfo.Tier1[Tier1Data].t1).map(data => data.displayName).sort();
                var t4Data = tierInfo["Tier4"].filter(item => item.t1 === objInfo.Tier1[Tier1Data].t1).map(data => data.displayName).sort();
                var t5Data = tierInfo["Tier5"].filter(item => item.t1 === objInfo.Tier1[Tier1Data].t1).map(data => data.displayName).sort();
                setTier2FilterDrop(["All", ...t2Data]);
                setTier3FilterDrop(["All", ...t3Data]);
                setTier4FilterDrop(["All", ...t4Data]);
                setTier5FilterDrop(["All", ...t5Data]);

                //TILES' DATA
                var tile1Data = input.filter(item => item.t1 === objInfo.Tier1[Tier1Data].t1 && item.t2 !== undefined);
                setTotalUsers(tile1Data.length);
                setFullTimeUsers(tile1Data.filter(item => !item.displayName.toLowerCase().includes('contractor')).length);
                setContractUsers(tile1Data.filter(item => item.displayName.toLowerCase().includes('contractor')).length);
                setActiveGithub(tile1Data.filter(item => item.github_status === 'Active').length);
                setActiveJira(tile1Data.filter(item => item.jira_status === 'Active').length);
            }
        } else {
            setTableTier2Filter([objInfo.Tier2[newselectedTier2].t2]);
            setTableTier3Filter(['Not Empty']);

            var t1data = objInfo.Tier2[newselectedTier2].t1;
            var t2data = objInfo.Tier2[newselectedTier2].t2;
            var t1Name = tierInfo["Tier1"].filter(item => item.t1 === t1data).map(data => data.displayName);
            var t2List = tierInfo["Tier2"].filter(item => item.t1 === t1data).map(data => data.displayName).sort();
            var t3List = tierInfo["Tier3"].filter(item => item.t1 === t1data && item.t2 === t2data).map(data => data.displayName).sort();
            var t4List = tierInfo["Tier4"].filter(item => item.t1 === t1data && item.t2 === t2data).map(data => data.displayName).sort();
            var t5List = tierInfo["Tier5"].filter(item => item.t1 === t1data && item.t2 === t2data).map(data => data.displayName).sort();

            setTableTier1Filter([objInfo.Tier2[newselectedTier2].t1]);
            setTier1FilterDrop(["All", ...defaultFilter["Tier1"]]);
            setTier1Data(t1Name[0]);
            setTier2FilterDrop(["All", ...t2List]);
            setTier3FilterDrop(["All", ...t3List]);
            setTier4FilterDrop(["All", ...t4List]);
            setTier5FilterDrop(["All", ...t5List]);

            //TILES' DATA
            var tile2Data = input.filter(item => item.t1 === t1data && item.t2 === t2data && item.t3 !== undefined);
            setTotalUsers(tile2Data.length);
            setFullTimeUsers(tile2Data.filter(item => !item.displayName.toLowerCase().includes('contractor')).length);
            setContractUsers(tile2Data.filter(item => item.displayName.toLowerCase().includes('contractor')).length);
            setActiveGithub(tile2Data.filter(item => item.github_status === 'Active').length);
            setActiveJira(tile2Data.filter(item => item.jira_status === 'Active').length);
        }

    };

    // TIER 3
    const handleSelectedTier3 = (event, newselectedTier3) => {
        setTier3Data(newselectedTier3);
        setTier4Data('All');
        setTier5Data('All');
        setTableTier5Filter([]);
        setTableTier6Filter([]);

        if(newselectedTier3 === 'All' || newselectedTier3 === null || newselectedTier3 === '') {
            setTableTier4Filter([]);
            setTableTier5Filter([]);
            setTableTier6Filter([]);

            // IF TIER 2 IS PRESENT THEN FILTER TIER 4
            if(Tier2Data !== 'All' && Tier2Data !== null && Tier2Data !== '' && Tier2Data !== undefined) {
                var datat1 = objInfo.Tier2[Tier2Data].t1;
                var datat2 = objInfo.Tier2[Tier2Data].t2;
                var List4 = tierInfo["Tier4"].filter(item => item.t1 === datat1 && item.t2 === datat2).map(data => data.displayName).sort();
                var List5 = tierInfo["Tier5"].filter(item => item.t1 === datat1 && item.t2 === datat2).map(data => data.displayName).sort();
                setTier4FilterDrop(["All", ...List4]);
                setTier5FilterDrop(["All", ...List5]);
                setTableTier3Filter(['Not Empty']);

                //TILES' DATA
                var tile2Data = input.filter(item => item.t1 === datat1 && item.t2 === datat2 && item.t3 !== undefined);
                setTotalUsers(tile2Data.length);
                setFullTimeUsers(tile2Data.filter(item => !item.displayName.toLowerCase().includes('contractor')).length);
                setContractUsers(tile2Data.filter(item => item.displayName.toLowerCase().includes('contractor')).length);
                setActiveGithub(tile2Data.filter(item => item.github_status === 'Active').length);
                setActiveJira(tile2Data.filter(item => item.jira_status === 'Active').length);

            }else if(Tier2Data === 'All' || Tier2Data === null || Tier2Data === '' || Tier2Data === undefined) {
                setTier4FilterDrop(["All", ...defaultFilter["Tier4"]]);
                setTier5FilterDrop(["All", ...defaultFilter["Tier5"]]);
                setTableTier3Filter([]);
            }

        } else {
            setTableTier3Filter([objInfo.Tier3[newselectedTier3].t3]);
            setTableTier4Filter(['Not Empty']);

            var t1data = objInfo.Tier3[newselectedTier3].t1;
            var t2data = objInfo.Tier3[newselectedTier3].t2;
            var t3data = objInfo.Tier3[newselectedTier3].t3;
            var t1Name = tierInfo["Tier1"].filter(item => item.t1 === t1data).map(data => data.displayName);
            var t2List = tierInfo["Tier2"].filter(item => item.t1 === t1data).map(data => data.displayName).sort();
            var t2Name = tierInfo["Tier2"].filter(item => item.t1 === t1data && item.t2 === t2data).map(data => data.displayName);
            var t3List = tierInfo["Tier3"].filter(item => item.t1 === t1data && item.t2 === t2data).map(data => data.displayName).sort();
            var t4List = tierInfo["Tier4"].filter(item => item.t1 === t1data && item.t2 === t2data && item.t3 === t3data).map(data => data.displayName).sort();
            var t5List = tierInfo["Tier5"].filter(item => item.t1 === t1data && item.t2 === t2data && item.t3 === t3data).map(data => data.displayName).sort();

            setTier1Data(t1Name[0]);
            setTier2Data(t2Name[0]);
            setTableTier1Filter([objInfo.Tier3[newselectedTier3].t1]);
            setTableTier2Filter([objInfo.Tier3[newselectedTier3].t2]);
            setTier1FilterDrop(["All", ...defaultFilter["Tier1"]]);
            setTier2FilterDrop(["All", ...t2List]);
            setTier3FilterDrop(["All", ...t3List]);
            setTier4FilterDrop(["All", ...t4List]);
            setTier5FilterDrop(["All", ...t5List]);

            //TILES' DATA
            var tile3Data = input.filter(item => item.t1 === t1data && item.t2 === t2data && item.t3 === t3data && item.t4 !== undefined);
            setTotalUsers(tile3Data.length);
            setFullTimeUsers(tile3Data.filter(item => !item.displayName.toLowerCase().includes('contractor')).length);
            setContractUsers(tile3Data.filter(item => item.displayName.toLowerCase().includes('contractor')).length);
            setActiveGithub(tile3Data.filter(item => item.github_status === 'Active').length);
            setActiveJira(tile3Data.filter(item => item.jira_status === 'Active').length);
        }
    }

    // TIER 4
    const handleSelectedTier4 = (event, newselectedTier4) => {
        setTier4Data(newselectedTier4);
        setTier5Data('All');
        setTableTier6Filter([]);
        
        if(newselectedTier4 === 'All' || newselectedTier4 === null || newselectedTier4 === '') {

            setTableTier5Filter([]);
            setTableTier6Filter([]);

            // IF TIER 3 IS PRESENT THEN FILTER TIER 5
            if(Tier3Data !== 'All' && Tier3Data !== null && Tier3Data !== '' && Tier3Data !== undefined) {
                var datat1 = objInfo.Tier3[Tier3Data].t1;
                var datat2 = objInfo.Tier3[Tier3Data].t2;
                var datat3 = objInfo.Tier3[Tier3Data].t3;
                var List5 = tierInfo["Tier5"].filter(item => item.t1 === datat1 && item.t2 === datat2 && item.t3 === datat3).map(data => data.displayName).sort();
                setTier5FilterDrop(["All", ...List5]);
                setTableTier4Filter(['Not Empty']);

                //TILES' DATA
                var tile3Data = input.filter(item => item.t1 === datat1 && item.t2 === datat2 && item.t3 === datat3 && item.t4 !== undefined);
                setTotalUsers(tile3Data.length);
                setFullTimeUsers(tile3Data.filter(item => !item.displayName.toLowerCase().includes('contractor')).length);
                setContractUsers(tile3Data.filter(item => item.displayName.toLowerCase().includes('contractor')).length);
                setActiveGithub(tile3Data.filter(item => item.github_status === 'Active').length);
                setActiveJira(tile3Data.filter(item => item.jira_status === 'Active').length);
            }

        }else{
            setTableTier4Filter([objInfo.Tier4[newselectedTier4].t4]);
            setTableTier5Filter(['Not Empty']);

            var testt1 = objInfo.Tier4[newselectedTier4].t1;
            var testt2 = objInfo.Tier4[newselectedTier4].t2;
            var testt3 = objInfo.Tier4[newselectedTier4].t3;
            var testt4 = objInfo.Tier4[newselectedTier4].t4;
            var Name1 = tierInfo["Tier1"].filter(item => item.t1 === testt1).map(data => data.displayName);
            var Name2 = tierInfo["Tier2"].filter(item => item.t1 === testt1 && item.t2 === testt2).map(data => data.displayName);
            var Name3 = tierInfo["Tier3"].filter(item => item.t1 === testt1 && item.t2 === testt2 && item.t3 === testt3).map(data => data.displayName);
            var list2 = tierInfo["Tier2"].filter(item => item.t1 === testt1).map(data => data.displayName).sort();  
            var list3 = tierInfo["Tier3"].filter(item => item.t1 === testt1 && item.t2 === testt2).map(data => data.displayName).sort();
            var list4 = tierInfo["Tier4"].filter(item => item.t1 === testt1 && item.t2 === testt2 && item.t3 === testt3).map(data => data.displayName).sort();
            var list5 = tierInfo["Tier5"].filter(item => item.t1 === testt1 && item.t2 === testt2 && item.t3 === testt3 && item.t4 === testt4).map(data => data.displayName).sort();

            setTier1Data(Name1[0]);
            setTier2Data(Name2[0]);
            setTier3Data(Name3[0]);
            setTableTier1Filter([testt1]);
            setTableTier2Filter([testt2]);
            setTableTier3Filter([testt3]);
            setTier2FilterDrop(["All", ...list2]);
            setTier3FilterDrop(["All", ...list3]);
            setTier4FilterDrop(["All", ...list4]);
            setTier5FilterDrop(["All", ...list5]);

            //TILES' DATA
            var tile4Data = input.filter(item => item.t1 === testt1 && item.t2 === testt2 && item.t3 === testt3 && item.t4 === testt4 && item.t5 !== undefined);
            setTotalUsers(tile4Data.length);
            setFullTimeUsers(tile4Data.filter(item => !item.displayName.toLowerCase().includes('contractor')).length);
            setContractUsers(tile4Data.filter(item => item.displayName.toLowerCase().includes('contractor')).length);
            setActiveGithub(tile4Data.filter(item => item.github_status === 'Active').length);
            setActiveJira(tile4Data.filter(item => item.jira_status === 'Active').length);
        }
    }

    // TIER 5
    const handleSelectedTier5 = (event, newselectedTier5) => {
        setTier5Data(newselectedTier5);

        if(newselectedTier5 === 'All' || newselectedTier5 === null || newselectedTier5 === '') {
            setTableTier6Filter([]);

            // IF TIER 4 IS PRESENT
            if(Tier4Data !== "All" && Tier4Data !== null && Tier4Data !== "" && Tier4Data !== undefined){
                setTableTier5Filter(['Not Empty']);

                //TILES' DATA
                var data_1 = objInfo.Tier4[Tier4Data].t1;
                var data_2 = objInfo.Tier4[Tier4Data].t2;
                var data_3 = objInfo.Tier4[Tier4Data].t3;
                var data_4 = objInfo.Tier4[Tier4Data].t4;
                var tile4Data = input.filter(item => item.t1 === data_1 && item.t2 === data_2 && item.t3 === data_3 && item.t4 === data_4 && item.t5 !== undefined);
                setTotalUsers(tile4Data.length);
                setFullTimeUsers(tile4Data.filter(item => !item.displayName.toLowerCase().includes('contractor')).length);
                setContractUsers(tile4Data.filter(item => item.displayName.toLowerCase().includes('contractor')).length);
                setActiveGithub(tile4Data.filter(item => item.github_status === 'Active').length);
                setActiveJira(tile4Data.filter(item => item.jira_status === 'Active').length);
            }

        }else{
            setTableTier5Filter([objInfo.Tier5[newselectedTier5].t5]);
            setTableTier6Filter(['Not Empty']);

            var testt1 = objInfo.Tier5[newselectedTier5].t1;
            var testt2 = objInfo.Tier5[newselectedTier5].t2;
            var testt3 = objInfo.Tier5[newselectedTier5].t3;
            var testt4 = objInfo.Tier5[newselectedTier5].t4;
            var Name1 = tierInfo["Tier1"].filter(item => item.t1 === testt1).map(data => data.displayName);
            var Name2 = tierInfo["Tier2"].filter(item => item.t1 === testt1 && item.t2 === testt2).map(data => data.displayName);
            var Name3 = tierInfo["Tier3"].filter(item => item.t1 === testt1 && item.t2 === testt2 && item.t3 === testt3).map(data => data.displayName);
            var Name4 = tierInfo["Tier4"].filter(item => item.t1 === testt1 && item.t2 === testt2 && item.t3 === testt3 && item.t4 === testt4).map(data => data.displayName);
            var list2 = tierInfo["Tier2"].filter(item => item.t1 === testt1).map(data => data.displayName).sort();
            var list3 = tierInfo["Tier3"].filter(item => item.t1 === testt1 && item.t2 === testt2).map(data => data.displayName).sort();
            var list4 = tierInfo["Tier4"].filter(item => item.t1 === testt1 && item.t2 === testt2 && item.t3 === testt3).map(data => data.displayName).sort();
            var list5 = tierInfo["Tier5"].filter(item => item.t1 === testt1 && item.t2 === testt2 && item.t3 === testt3 && item.t4 === testt4).map(data => data.displayName).sort();

            setTier1Data(Name1[0]);
            setTier2Data(Name2[0]);
            setTier3Data(Name3[0]);
            setTier4Data(Name4[0]);
            setTableTier1Filter([testt1]);
            setTableTier2Filter([testt2]);
            setTableTier3Filter([testt3]);
            setTableTier4Filter([testt4]);
            setTier2FilterDrop(["All", ...list2]);
            setTier3FilterDrop(["All", ...list3]);
            setTier4FilterDrop(["All", ...list4]);
            setTier5FilterDrop(["All", ...list5]);

            //TILES' DATA
            var tile5Data = input.filter(item => item.t1 === testt1 && item.t2 === testt2 && item.t3 === testt3 && item.t4 === testt4 && item.t5 === objInfo.Tier5[newselectedTier5].t5 && item.t6 !== undefined);
            setTotalUsers(tile5Data.length);
            setFullTimeUsers(tile5Data.filter(item => !item.displayName.toLowerCase().includes('contractor')).length);
            setContractUsers(tile5Data.filter(item => item.displayName.toLowerCase().includes('contractor')).length);
            setActiveGithub(tile5Data.filter(item => item.github_status === 'Active').length);
            setActiveJira(tile5Data.filter(item => item.jira_status === 'Active').length);

        }
    }


    //ORG - ACTIVITY DROPDOWN/TABLE (SIZE)
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const isMediumScreen = useMediaQuery(theme.breakpoints.between('md', 'lg'));
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('xl'));
    
    let dropdownHeight = "280px";
    if (isSmallScreen) {
        dropdownHeight = "100px";
    } else if (isMediumScreen) {
        dropdownHeight = "400px";
    } else if (isLargeScreen) {
        dropdownHeight = "400px";
    }

    //TABLE COLUMN FILTER NAMES
    const uniqueT2Values = [...new Set(input.map(item => item.t2))];
    const uniqueT3Values = [...new Set(input.map(item => item.t3))];
    const uniqueT4Values = [...new Set(input.map(item => item.t4))];
    const uniqueT5Values = [...new Set(input.map(item => item.t5))];
    const uniqueT6Values = [...new Set(input.map(item => item.t6))];

    const columns = [
        { 
            name: "id", 
            label: "S.No",
            options: {
                filter: false,
                setCellProps: () => ({style: {whiteSpace:'nowrap', verticalAlign: 'top'}}),
                setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}})
            },
            alwaysVisible: true 
        },
        {
            name: "userPrincipalName",
            label: "User ID",
            options:{
                filter: true,
                filterType: 'textField',
                customFilterListOptions: {render: v =>  `User ID: ${v}`},
                setCellProps: () => ({style: {whiteSpace:'nowrap', verticalAlign: 'top'}}),
                setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}})
            }
        },
        {
            name: "displayName",
            label: "Full Name",
            options:{
                filter: true,
                filterType: 'textField',
                customFilterListOptions: {render: v =>  `Full Name: ${v}`},
                setCellProps: () => ({style: {whiteSpace:'nowrap', verticalAlign: 'top'}}),
                setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}})
            }
        },
        {
            name: "jobTitle",
            label: "Title",
            options:{
                filter: true,
                filterType: 'dropdown',
                customFilterListOptions: {render: v =>  `Title: ${v}`},
                setCellProps: () => ({style: {whiteSpace:'nowrap', verticalAlign: 'top'}}),
                setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}})
            }
        },
        {
            name: "t1",
            label: "Tier 1",
            options:{
                filter: true,
                filterType: 'dropdown',
                filterList: TableTier1Filter,   
                customFilterListOptions: {render: v =>  `Tier 1: ${v}`},
                setCellProps: () => ({style: {whiteSpace:'nowrap', verticalAlign: 'top'}}),
                setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}}),
                display: false
            }
        },
        {
            name: "t2",
            label: "Tier 2",
            options:{
                filter: true,
                filterType: 'dropdown',
                filterList: TableTier2Filter,
                filterOptions: {
                    names: [...uniqueT2Values,'Not Empty'],
                    logic(t2, filters) {
                        if (filters.indexOf('Not Empty') !== -1) {
                            return t2 === null || t2 === '' || t2 === undefined;
                        }
                        return !filters.includes(t2);
                    },
                },
                customFilterListOptions: {render: v =>  `Tier 2: ${v}`},
                setCellProps: () => ({style: {whiteSpace:'nowrap', verticalAlign: 'top'}}),
                setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}}),
                display: false
            }
        },
        {
            name: "t3",
            label: "Tier 3",
            options:{
                filter: true,
                filterType: 'dropdown',
                filterList: TableTier3Filter,   
                filterOptions: {
                    names: [...uniqueT3Values,'Not Empty'],
                    logic(t3, filters) {
                        if (filters.indexOf('Not Empty') !== -1) {
                            return t3 === null || t3 === '' || t3 === undefined;
                        }
                        return !filters.includes(t3);
                    },
                },
                customFilterListOptions: {render: v =>  `Tier 3: ${v}`},
                setCellProps: () => ({style: {whiteSpace:'nowrap', verticalAlign: 'top'}}),
                setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}}),
                display: false
            }
        },
        {
            name: "t4",
            label: "Tier 4",
            options:{
                filter: true,
                filterType: 'dropdown',
                filterList: TableTier4Filter, 
                filterOptions: {
                    names: [...uniqueT4Values,'Not Empty'],
                    logic(t4, filters) {
                        if (filters.indexOf('Not Empty') !== -1) {
                            return t4 === null || t4 === '' || t4 === undefined;
                        }
                        return !filters.includes(t4);
                    },
                },  
                customFilterListOptions: {render: v =>  `Tier 4: ${v}`},
                setCellProps: () => ({style: {whiteSpace:'nowrap', verticalAlign: 'top'}}),
                setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}}),
                display: false
            }
        },
        {
            name: "t5",
            label: "Tier 5",
            options:{
                filter: true,
                filterType: 'dropdown',
                filterList: TableTier5Filter, 
                filterOptions: {
                    names: [...uniqueT5Values,'Not Empty'],
                    logic(t5, filters) {
                        if (filters.indexOf('Not Empty') !== -1) {
                            return t5 === null || t5 === '' || t5 === undefined;
                        }
                        return !filters.includes(t5);
                    },
                },    
                customFilterListOptions: {render: v =>  `Tier 5: ${v}`},
                setCellProps: () => ({style: {whiteSpace:'nowrap', verticalAlign: 'top'}}),
                setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}}),
                display: false
            }
        },
        {
            name: "t6",
            label: "Tier 6",
            options:{
                filter: true,
                filterType: 'dropdown',
                filterList: TableTier6Filter,
                filterOptions: {
                    names: [...uniqueT6Values,'Not Empty'],
                    logic(t6, filters) {
                        if (filters.indexOf('Not Empty') !== -1) {
                            return t6 === null || t6 === '' || t6 === undefined;
                        }
                        return !filters.includes(t6);
                    },
                },    
                customFilterListOptions: {render: v =>  `Tier 6: ${v}`},
                setCellProps: () => ({style: {whiteSpace:'nowrap', verticalAlign: 'top'}}),
                setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}}),
                display: false
            }
        },
        {
            name: "manager",
            label: "Line Manager",
            options:{
                filter: true,
                filterType: 'dropdown',
                customFilterListOptions: {render: v =>  `Line Manager: ${v}`},
                setCellProps: () => ({style: {whiteSpace:'nowrap', verticalAlign: 'top'}}),
                setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}})
            }
        },
        {
            name: "github_status",
            label: "GitHub Status",
            options:{
                filter: true,
                filterType: 'dropdown',
                customFilterListOptions: {render: v =>  `GitHub Status: ${v}`},
                setCellProps: () => ({style: {whiteSpace:'nowrap', verticalAlign: 'top'}}),
                setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}})
            }
        },
        {
            name: "jira_status",
            label: "Jira Status",
            options:{
                filter: true,
                filterType: 'dropdown',
                customFilterListOptions: {render: v =>  `Jira Status: ${v}`},
                setCellProps: () => ({style: {whiteSpace:'nowrap', verticalAlign: 'top'}}),
                setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}})
            }
        }   
    ];

    const options = {
        fixedHeader: true,
        filter: true,
        responsive: 'vertical',
        tableBodyHeight: 'auto',
        rowsPerPage: 15,
        rowsPerPageOptions: [15,25,50,100],
        sort: true,
        downloadOptions: {
            filename: "Organization Chart.csv",
            filterOptions: {
            useDisplayedColumnsOnly: true,
            useDisplayedRowsOnly: true,
            }
        }
    };


  return (
    <Box>

        {/* DROPDOWN */}
        <Box
          display="flex"
          marginBottom="40px"
          sx={{ backgroundColor: colors.primary[400], width: '100%', height: 'auto' }}
        >                
            <Grid container>
                {/* FILTER -TIER 1 */} 
                <Grid item sx={{ 
                  display: 'flex', 
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start'
                }}>
                    <Box
                      direction="column"
                      justifyContent="space-evenly"
                      alignItems="flex-start"
                      m={2}
                    >
                        <Typography variant="h5" fontWeight="600" color={colors.grey[100]} mb={3}>
                            Tier 1
                        </Typography>
                        <Autocomplete
                          options={Tier1FilterDrop}
                          value={Tier1Data}
                          onChange={handleSelectedTier1}
                          renderInput={(params) => (
                            <div style={{ marginLeft: '20px', marginBottom: '20px', width: dropdownHeight }}>
                                <TextField
                                  {...params}
                                  variant="outlined"
                                  label="Select Tier 1"
                                  color="secondary"
                                />
                            </div>
                          )}
                        />
                    </Box>
                </Grid>

                {/* FILTER -TIER 2 */} 
                <Grid item sx={{ 
                  display: 'flex', 
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start'
                }}>
                    <Box
                      direction="column"
                      justifyContent="space-evenly"
                      alignItems="flex-start"
                      m={2}
                    >
                        <Typography variant="h5" fontWeight="600" color={colors.grey[100]} mb={3}>
                            Tier 2
                        </Typography>
                        <Autocomplete
                          options={Tier2FilterDrop}
                          value={Tier2Data}
                          onChange={handleSelectedTier2}
                          renderInput={(params) => (
                            <div style={{ marginLeft: '20px', marginBottom: '20px', width: dropdownHeight }}>
                                <TextField
                                  {...params}
                                  variant="outlined"
                                  label="Select Tier 2"
                                  color="secondary"
                                />
                            </div>
                          )}
                        />
                    </Box>
                </Grid>

                {/* FILTER -TIER 3 */} 
                <Grid item sx={{ 
                  display: 'flex', 
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start'
                }}>
                    <Box
                      direction="column"
                      justifyContent="space-evenly"
                      alignItems="flex-start"
                      m={2}
                    >
                        <Typography variant="h5" fontWeight="600" color={colors.grey[100]} mb={3}>
                            Tier 3
                        </Typography>
                        <Autocomplete
                          options={Tier3FilterDrop}
                          value={Tier3Data}
                          onChange={handleSelectedTier3}
                          renderInput={(params) => (
                            <div style={{ marginLeft: '20px', marginBottom: '20px', width: dropdownHeight }}>
                                <TextField
                                  {...params}
                                  variant="outlined"
                                  label="Select Tier 3"
                                  color="secondary"
                                />
                            </div>
                          )}
                        />
                    </Box>
                </Grid>

                {/* FILTER -TIER 4 */} 
                <Grid item sx={{ 
                  display: 'flex', 
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start'
                }}>
                    <Box
                      direction="column"
                      justifyContent="space-evenly"
                      alignItems="flex-start"
                      m={2}
                    >
                        <Typography variant="h5" fontWeight="600" color={colors.grey[100]} mb={3}>
                            Tier 4
                        </Typography>
                        <Autocomplete
                          options={Tier4FilterDrop}
                          value={Tier4Data}
                          onChange={handleSelectedTier4}
                          renderInput={(params) => (
                            <div style={{ marginLeft: '20px', marginBottom: '20px', width: dropdownHeight }}>
                                <TextField
                                  {...params}
                                  variant="outlined"
                                  label="Select Tier 4"
                                  color="secondary"
                                />
                            </div>
                          )}
                        />
                    </Box>
                </Grid>

                {/* FILTER -TIER 5 */} 
                <Grid item sx={{ 
                  display: 'flex', 
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start'
                }}>
                    <Box
                      direction="column"
                      justifyContent="space-evenly"
                      alignItems="flex-start"
                      m={2}
                    >
                        <Typography variant="h5" fontWeight="600" color={colors.grey[100]} mb={3}>
                            Tier 5
                        </Typography>
                        <Autocomplete
                          options={Tier5FilterDrop}
                          value={Tier5Data}
                          onChange={handleSelectedTier5}
                          renderInput={(params) => (
                            <div style={{ marginLeft: '20px', marginBottom: '20px', width: dropdownHeight }}>
                                <TextField
                                  {...params}
                                  variant="outlined"
                                  label="Select Tier 5"
                                  color="secondary"
                                />
                            </div>
                          )}
                        />
                    </Box>
                </Grid>

            </Grid>
        </Box>

        {/* TILES */}
        <Box display="flex" flexDirection="column" justifyContent="space-between" sx={{positionLeft:15, marginBottom: 5}}>
            <Box
              display="grid"
              gridTemplateColumns="repeat(16, 1fr)"
              gridAutoRows="100px"
              gap="10px"
              marginBottom="20px"
            >    
                 <TileBox actionIcon={null} title="Total Employees" text={TotalUsers} size="4" info={false} value={[]} /> 
                <TileBox actionIcon={null} title="Full Time Employees" text={FullTimeUsers} size="4" info={false} value={[]} />   
                <TileBox actionIcon={null} title="Contractor Employees" text={ContractUsers} size="4" info={false} value={[]} />
                <TileBox actionIcon={null} title="Active GitHub Users" text={ActiveGithub} size="4" info={false} value={[]} />   
                <TileBox actionIcon={null} title="Active Jira Users" text={ActiveJira} size="4" info={false} value={[]} />  
            </Box>
        </Box>

        {/* TABLE */}
        <Box className="table" style={{
            width: '100%', 
            height: 'auto'
        }}>
            <MUIDataTable
                // title={<span className="custom-table-title"></span>}
                data={input}
                columns={columns}
                options={options}
                className="custom-table"
            />
        </Box>
    </Box>
  );
};

export default OrgTable;
