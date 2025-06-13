import {React, useState, useMemo} from "react";
import {Grid} from '@mui/material';
import CustomAccordion from "../../../../common-components/Accordion/CustomAccordion";
import Dropdown from "../../../../common-components/Dropdown";
import ToggleSwitch from "../../../../common-components/ToggleSwitch";
import { set1DataFilter, set2DataFilter, set3DataFilter, set4DataFilter, handleDropdownFilter } from "../../../../utils";


const UserDropdown = ({ input, objDefaultFilter, port, setPort, selectVP, setSelectVP, selectDirector, setSelectDirector, selectManager, setSelectManager, userID, setUserID, status, setStatus, showCol, setShowCol, setSelectIndex, theme, colors}) => {

    const [ VPFilter, setVPFilter ] = useState(objDefaultFilter['vp']);
    const [ DirectorFilter, setDirectorFilter ] = useState(objDefaultFilter['director']);
    const [ ManagerFilter, setManagerFilter ] = useState(objDefaultFilter['manager']);
    const [ UserFilter, setUserFilter ] = useState(objDefaultFilter['user']);
    const [ StatusFilter, setStatusFilter ] = useState(objDefaultFilter['user_status']);


    // Based on the dropdown
    var functionMap = useMemo(() => ({
        "set1DataFilter": set1DataFilter,
        "set2DataFilter": set2DataFilter,
        "set3DataFilter": set3DataFilter,
        "set4DataFilter": set4DataFilter
    }), []);

    var filterData = useMemo(() => ({
        portfolio: port,
        vp: selectVP,
        director: selectDirector,
        manager: selectManager,
        user: userID,
        user_status: status
    }), [port, selectVP, selectDirector, selectManager, userID, status]);



    // PORTFOLIO
    const handleChangePort = (event, newPort) => {
        setPort(newPort);
        setSelectVP('All');
        setSelectDirector('All');
        setSelectManager('All');
        setUserID('All');
        setStatus('Active');

        if(newPort === 'All' || !newPort) {
            setPort('All');
            setVPFilter(objDefaultFilter['vp']);
            setDirectorFilter(objDefaultFilter['director']);
            setManagerFilter(objDefaultFilter['manager']);
            setUserFilter(objDefaultFilter['user']);
            setStatusFilter(objDefaultFilter['user_status']);
        } else {
            setVPFilter(set1DataFilter(input, 'portfolio', newPort, 'vp'));
            setDirectorFilter(set1DataFilter(input, 'portfolio', newPort, 'director'));
            setManagerFilter(set1DataFilter(input, 'portfolio', newPort, 'manager'));
            setUserFilter(set1DataFilter(input, 'portfolio', newPort, 'user'));
            setStatusFilter(set1DataFilter(input, 'portfolio', newPort, 'user_status'));
        }
    };

    // VP
    const handleChangeVP = (event, newVP) => {
        setSelectVP(newVP);
        setSelectDirector('All');
        setSelectManager('All');
        setUserID('All');
        setStatus('Active');

        if(newVP === 'All' || !newVP) {
            setSelectVP('All');
            const obj = ['vp', 'director', 'manager', 'user', 'user_status'];
            obj.forEach((item) => filterData[item] = 'All');

            const [args, name] = handleDropdownFilter(filterData);
            if (args.length > 0) {
                setDirectorFilter(functionMap[name](input, ...args, 'director'));
                setManagerFilter(functionMap[name](input, ...args, 'manager'));
                setUserFilter(functionMap[name](input, ...args, 'user'));
                setStatusFilter(functionMap[name](input, ...args, 'user_status'));
            }else{
                setDirectorFilter(objDefaultFilter['director']);
                setManagerFilter(objDefaultFilter['manager']);
                setUserFilter(objDefaultFilter['user']);
                setStatusFilter(objDefaultFilter['user_status']);
            }
        } else {
            setDirectorFilter(set1DataFilter(input, 'vp', newVP, 'director'));
            setManagerFilter(set1DataFilter(input, 'vp', newVP, 'manager'));
            setUserFilter(set1DataFilter(input, 'vp', newVP, 'user'));
            setStatusFilter(set1DataFilter(input, 'vp', newVP, 'user_status'));
        }
    };

    // DIRECTOR
    const handleChangeDirector = (event, newDirector) => {
        setSelectDirector(newDirector);
        setSelectManager('All');
        setUserID('All');
        setStatus('Active');

        if(newDirector === 'All' || !newDirector) {
            setSelectDirector('All');
            const obj = ['director', 'manager', 'user', 'user_status'];
            obj.forEach((item) => filterData[item] = 'All');

            const [args, name] = handleDropdownFilter(filterData);
            if (args.length > 0) {
                setManagerFilter(functionMap[name](input, ...args, 'manager'));
                setUserFilter(functionMap[name](input, ...args, 'user'));
                setStatusFilter(functionMap[name](input, ...args, 'user_status'));
            } else{
                setManagerFilter(objDefaultFilter['manager']);
                setUserFilter(objDefaultFilter['user']);
                setStatusFilter(objDefaultFilter['user_status']);
            }
        } else {
            setManagerFilter(set1DataFilter(input, 'director', newDirector, 'manager'));
            setUserFilter(set1DataFilter(input, 'director', newDirector, 'user'));
            setStatusFilter(set1DataFilter(input, 'director', newDirector, 'user_status'));
        }
    }

    // MANAGER
    const handleChangeManager = (event, newManager) => {
        setSelectManager(newManager);
        setUserID('All');
        setStatus('Active');

        if(newManager === 'All' || !newManager) {
            setSelectManager('All');
            const obj = ['manager', 'user', 'user_status'];
            obj.forEach((item) => filterData[item] = 'All');

            const [args, name] = handleDropdownFilter(filterData);
            if (args.length > 0) {
                setUserFilter(functionMap[name](input, ...args, 'user'));
                setStatusFilter(functionMap[name](input, ...args, 'user_status'));
            } else {
                setUserFilter(objDefaultFilter['user']);
                setStatusFilter(objDefaultFilter['user_status']);
            }
        } else {
            setUserFilter(set1DataFilter(input, 'manager', newManager, 'user'));
            setStatusFilter(set1DataFilter(input, 'manager', newManager, 'user_status'));
        }
    }

    // USER ID
    const handleChangeUser = (event, newUser) => {
        setUserID(newUser);
        setStatus('All');

        if(newUser === 'All' || !newUser) {
            setUserID('All');
            setSelectIndex(null);
            const obj = ['user', 'user_status'];
            obj.forEach((item) => filterData[item] = 'All');

            const [args, name] = handleDropdownFilter(filterData);
            if (args.length > 0) {
                setStatusFilter(functionMap[name](input, ...args, 'user_status'));
            } else {
                setStatusFilter(objDefaultFilter['user_status']);
            }
        }else{
            setSelectIndex(input.findIndex(item => item.user === newUser));
            setStatusFilter(set1DataFilter(input, 'user', newUser, 'user_status'));
        }
    };

    // USER STATUS
    const handleChangeStatus = (event, newStatus) => {
        setStatus(newStatus);
        if(newStatus === 'All' || !newStatus){
            setStatus('All');
            filterData['user_status'] = 'All';
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
                        value={selectDirector}
                        handleChange={handleChangeDirector}
                        theme={theme}
                        colors={colors}
                    />
                    <Dropdown
                        title="Line Managers"
                        subtitle="line Manager"
                        options={ManagerFilter}
                        value={selectManager}
                        handleChange={handleChangeManager}
                        theme={theme}
                        colors={colors}
                    />
                    <Dropdown
                        title="User ID"
                        subtitle="User ID"
                        options={UserFilter}
                        value={userID}
                        handleChange={handleChangeUser}
                        theme={theme}
                        colors={colors}
                    />
                    <Dropdown
                        title="User Status"
                        subtitle="User Status"
                        options={StatusFilter}
                        value={status}
                        handleChange={handleChangeStatus}
                        theme={theme}
                        colors={colors}
                    />

                    {/* TOGGLE - CONTRIBUTION STATUS */} 
                    <ToggleSwitch
                        title="Show Daily Contribution"
                        value={showCol}
                        handleChange={(value) => setShowCol(value)}
                    />
                </Grid>
            </CustomAccordion>
    );

}

export default UserDropdown;