import { React, useState, useMemo } from "react";
import { Grid } from '@mui/material';
import CustomAccordion from "../../../../common-components/Accordion/CustomAccordion";
import Dropdown from "../../../../common-components/Dropdown";
import { set1DataFilter, set2DataFilter, set3DataFilter, set4DataFilter, handleDropdownFilter } from "../../../../utils";


const RepoDropdown = ({ input, objDefaultFilter, port, setPort, selectVP, setSelectVP, director, setDirector, owner, setOwner, selectAppcode, setSelectAppcode, userID, setUserID, setGraphData, theme, colors}) => {

    const [VPFilter, setVPFilter] = useState(objDefaultFilter['VP']);
    const [DirectorFilter, setDirectorFilter] = useState(objDefaultFilter['department']);
    const [AppOwnerFilter, setAppOwnerFilter] = useState(objDefaultFilter['AppOwner']);
    const [AppCodeFilter, setAppCodeFilter] = useState(objDefaultFilter['appcode']);
    const [IDFilter, setIDFilter] = useState(objDefaultFilter['user']);


    // Based on the dropdown
    var functionMap = useMemo(() => ({
        "set1DataFilter": set1DataFilter,
        "set2DataFilter": set2DataFilter,
        "set3DataFilter": set3DataFilter,
        "set4DataFilter": set4DataFilter
    }), []);

    var filterData = useMemo(() => ({
        "Portfolio": port,
        "VP": selectVP,
        "department": director,
        "AppOwner": owner,
        "appcode": selectAppcode,
        "user": userID
    }), [port, selectVP, director, owner, selectAppcode, userID]);



    // PORTFOLIO
    const handleChangePort = (event, newPort) => {
        setPort(newPort);
        setSelectVP('All');
        setDirector('All');
        setOwner('All');
        setSelectAppcode('All');
        setUserID('All');

        if(newPort === 'All' || !newPort) {
            setPort('All');
            setVPFilter(objDefaultFilter['VP']);
            setDirectorFilter(objDefaultFilter['department']);
            setAppOwnerFilter(objDefaultFilter['AppOwner']);
            setAppCodeFilter(objDefaultFilter['appcode']);
            setIDFilter(objDefaultFilter['user']);
        }else{
            setVPFilter(set1DataFilter(input, 'Portfolio', newPort, 'VP'));
            setDirectorFilter(set1DataFilter(input, 'Portfolio', newPort, 'department'));
            setAppOwnerFilter(set1DataFilter(input, 'Portfolio', newPort, 'AppOwner'));
            setAppCodeFilter(set1DataFilter(input, 'Portfolio', newPort, 'appcode'));
            setIDFilter(set1DataFilter(input, 'Portfolio', newPort, 'user'));
        }
    };

    // VP
    const handleChangeVP = (event, newVP) => {
        setSelectVP(newVP);
        setDirector('All');
        setOwner('All');
        setSelectAppcode('All');
        setUserID('All');

        if(newVP === 'All' || !newVP) {
            setSelectVP('All');
            const obj = ['VP', 'department', 'AppOwner', 'appcode', 'user'];
            obj.forEach(prop => filterData[prop] = 'All');
            const [args, name] = handleDropdownFilter(filterData);

            if(args.length > 0){
                setDirectorFilter(functionMap[name](input, ...args, 'department'));
                setAppOwnerFilter(functionMap[name](input, ...args, 'AppOwner'));
                setAppCodeFilter(functionMap[name](input, ...args, 'appcode'));
                setIDFilter(functionMap[name](input, ...args, 'user'));
            }else {
                setDirectorFilter(objDefaultFilter['department']);
                setAppOwnerFilter(objDefaultFilter['AppOwner']);
                setAppCodeFilter(objDefaultFilter['appcode']);
                setIDFilter(objDefaultFilter['user']);
            }
        }else{
            setDirectorFilter(set1DataFilter(input, 'VP', newVP, 'department'));
            setAppOwnerFilter(set1DataFilter(input, 'VP', newVP, 'AppOwner'));
            setAppCodeFilter(set1DataFilter(input, 'VP', newVP, 'appcode'));
            setIDFilter(set1DataFilter(input, 'VP', newVP, 'user'));
        }
    };

    // DIRECTOR
    const handleChangeDirector = (event, newDirector) => {
        setDirector(newDirector);
        setOwner('All');
        setSelectAppcode('All');
        setUserID('All');

        if(newDirector === 'All' || !newDirector) {
            setDirector('All');
            const obj = ['department', 'AppOwner', 'appcode', 'user'];
            obj.forEach(prop => filterData[prop] = 'All');
            const [args, name] = handleDropdownFilter(filterData);

            if(args.length > 0){
                setAppOwnerFilter(functionMap[name](input, ...args, 'AppOwner'));
                setAppCodeFilter(functionMap[name](input, ...args, 'appcode'));
                setIDFilter(functionMap[name](input, ...args, 'user'));
            }else {
                setAppOwnerFilter(objDefaultFilter['AppOwner']);
                setAppCodeFilter(objDefaultFilter['appcode']);
                setIDFilter(objDefaultFilter['user']);
            }
        }else{
            setAppOwnerFilter(set1DataFilter(input, 'department', newDirector, 'AppOwner'));
            setAppCodeFilter(set1DataFilter(input, 'department', newDirector, 'appcode'));
            setIDFilter(set1DataFilter(input, 'department', newDirector, 'user'));
        }
    };

    // APP OWNER
    const handleChangeOwner = (event, newAppOwner) => {
        setOwner(newAppOwner);
        setSelectAppcode('All');
        setUserID('All');

        if(newAppOwner === 'All' || !newAppOwner) {
            setOwner('All');
            filterData.AppOwner = 'All';
        }else{
            filterData.AppOwner = newAppOwner;
        }

        const obj = ['appcode', 'user'];
        obj.forEach(prop => filterData[prop] = 'All');
        const [args, name] = handleDropdownFilter(filterData);
        if(args.length > 0){
            setAppCodeFilter(functionMap[name](input, ...args, 'appcode'));
            setIDFilter(functionMap[name](input, ...args, 'user'));
        }else {
            setAppCodeFilter(objDefaultFilter['appcode']);
            setIDFilter(objDefaultFilter['user']);
        }
    };

    // APP CODE
    const handleChangeAppcode = (event, newAppcode) => {
        setSelectAppcode(newAppcode);
        setUserID('All');

        if(newAppcode === 'All' || !newAppcode) {
            setSelectAppcode('All');
            setGraphData([]);
            const obj = ['appcode', 'user'];
            obj.forEach(prop => filterData[prop] = 'All');

            const [args, name] = handleDropdownFilter(filterData);
            if(args.length > 0){
                setIDFilter(functionMap[name](input, ...args, 'user'));
            }else {
                setIDFilter(objDefaultFilter['user']);
            }
        }else{
            setIDFilter(set1DataFilter(input, 'appcode', newAppcode, 'user'));
            setGraphData(input.filter(item => item.appcode === newAppcode).sort((a, b) => a.user.localeCompare(b.user)));
        }
    };

    // USER ID
    const handleChangeUser = (event, newUserID) => {
        setUserID(newUserID);

        if(newUserID === 'All' || !newUserID) {
            setUserID('All');
            filterData['user'] = 'All';
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
                        options={objDefaultFilter["Portfolio"]}
                        value={port}
                        handleChange={handleChangePort}
                        theme={theme}
                        colors={colors}
                    />
                    <Dropdown
                        title="Department"
                        subtitle="Department"
                        options={VPFilter}
                        value={selectVP}
                        handleChange={handleChangeVP}
                        theme={theme}
                        colors={colors}
                    />
                    <Dropdown
                        title="Team"
                        subtitle="Team"
                        options={DirectorFilter}
                        value={director}
                        handleChange={handleChangeDirector}
                        theme={theme}
                        colors={colors}
                    />
                    <Dropdown
                        title="App Owner"
                        subtitle="App Owner"
                        options={AppOwnerFilter}
                        value={owner}
                        handleChange={handleChangeOwner}
                        theme={theme}
                        colors={colors}
                    />
                    <Dropdown
                        title="App Code"
                        subtitle="App Code"
                        options={AppCodeFilter}
                        value={selectAppcode}
                        handleChange={handleChangeAppcode}
                        theme={theme}
                        colors={colors}
                    />
                    <Dropdown
                        title="User ID"
                        subtitle="UserID"
                        options={IDFilter}
                        value={userID}
                        handleChange={handleChangeUser}
                        theme={theme}
                        colors={colors}
                    />
                </Grid>
            </CustomAccordion>
    );

}

export default RepoDropdown;