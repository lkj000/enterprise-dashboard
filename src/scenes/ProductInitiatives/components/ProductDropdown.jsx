import {React, useState, useMemo} from "react";
import {Grid} from '@mui/material';
import CustomAccordion from "../../../common-components/Accordion/CustomAccordion";
import Dropdown from "../../../common-components/Dropdown";
import { getSortDataForDropdown, set1DataFilter, set2DataFilter, handleDropdownFilter } from "../../../utils";
import { objDefaultFilter, projectOptions, filterByKey } from "../requests";


const ProductDropdown = ({ input, projKey, setProjKey, port, setPort, selectVP, setSelectVP, selectDirector, setSelectDirector, selectManager, setSelectManager, theme, colors}) => {

    const [ ProjFilter, setProjFilter ] = useState(input);
    const [ PortFilter, setPortFilter ] = useState(objDefaultFilter['portfolio']);
    const [ VPFilter, setVPFilter ] = useState(objDefaultFilter['vp']);
    const [ DirectorFilter, setDirectorFilter ] = useState(objDefaultFilter['director']);
    const [ ManagerFilter, setManagerFilter ] = useState(objDefaultFilter['manager']);


    // Based on the dropdown
    var functionMap = useMemo(() => ({
        "set1DataFilter": set1DataFilter,
        "set2DataFilter": set2DataFilter
    }), []);

    var filterData = useMemo(() => ({
        portfolio: port,
        vp: selectVP,
        director: selectDirector,
        manager: selectManager
    }), [port, selectVP, selectDirector, selectManager]);


    // PROJECT KEY
    const handleChangeKey = (event, newKey) => {
        setProjKey(newKey);
        setPort('All');
        setSelectVP('All');
        setSelectDirector('All');
        setSelectManager('All');
        
        if(newKey === 'All' || !newKey){
            setProjKey('All');
            setProjFilter(input);
            setPortFilter(objDefaultFilter['portfolio']);
            setVPFilter(objDefaultFilter['vp']);
            setDirectorFilter(objDefaultFilter['director']);
            setManagerFilter(objDefaultFilter['manager']);
        } else{
            const keyData = filterByKey(input, newKey);
            setProjFilter(keyData);
            setPortFilter((getSortDataForDropdown(keyData, ['portfolio']))['portfolio']);
            setVPFilter(getSortDataForDropdown(keyData, ['vp'])['vp']);
            setDirectorFilter(getSortDataForDropdown(keyData, ['director'])['director']);
            setManagerFilter(getSortDataForDropdown(keyData, ['manager'])['manager']);
        }
    }

    // PORTFOLIO
    const handleChangePort = (event, newPort) => {
        setPort(newPort);
        setSelectVP('All');
        setSelectDirector('All');
        setSelectManager('All');

        if(newPort === 'All' || !newPort){
            setPort('All');
            if(projKey !== 'All' && projKey){
                setVPFilter(getSortDataForDropdown(ProjFilter, ['vp'])['vp']);
                setDirectorFilter(getSortDataForDropdown(ProjFilter, ['director'])['director']);
                setManagerFilter(getSortDataForDropdown(ProjFilter, ['manager'])['manager']);
            }else{
                setVPFilter(objDefaultFilter['vp']);
                setDirectorFilter(objDefaultFilter['director']);
                setManagerFilter(objDefaultFilter['manager']);
            }
        }else{
            const data = projKey !== 'All' && projKey ? ProjFilter : input;
            setVPFilter(set1DataFilter(data, 'portfolio', newPort, 'vp'));
            setDirectorFilter(set1DataFilter(data, 'portfolio', newPort, 'director'));
            setManagerFilter(set1DataFilter(data, 'portfolio', newPort, 'manager'));
        }
    }

    // VP
    const handleChangeVP = (event, newVP) => {
        setSelectVP(newVP);
        setSelectDirector('All');
        setSelectManager('All');
        const data = projKey !== 'All' && projKey ? ProjFilter : input;

        if(newVP === 'All' || !newVP){
            setSelectVP('All');
            const obj = ['vp', 'director', 'manager'];
            obj.forEach((item) => filterData[item] = 'All');
            const [args, name] = handleDropdownFilter(filterData);
            if (args.length > 0) {
                setDirectorFilter(functionMap[name](data, ...args, 'director'));
                setManagerFilter(functionMap[name](data, ...args, 'manager'));
            }else{
                setDirectorFilter((projKey !== 'All' && projKey ? getSortDataForDropdown(ProjFilter, ['director']) : 
                  objDefaultFilter)['director']);
                setManagerFilter((projKey !== 'All' && projKey ? getSortDataForDropdown(ProjFilter, ['manager']) :
                  objDefaultFilter)['manager']);
            }
        }else{
            setDirectorFilter(set1DataFilter(data, 'vp', newVP, 'director'));
            setManagerFilter(set1DataFilter(data, 'vp', newVP, 'manager'));
        }
    }

    // DIRECTOR
    const handleChangeDirector = (event, newDirector) => {
        setSelectDirector(newDirector);
        setSelectManager('All');
        const data = projKey !== 'All' && projKey ? ProjFilter : input;

        if(newDirector === 'All' || !newDirector){
            setSelectDirector('All');
            const obj = ['director', 'manager'];
            obj.forEach((item) => filterData[item] = 'All');
            const [args, name] = handleDropdownFilter(filterData);
            if (args.length > 0) {
                setManagerFilter(functionMap[name](data, ...args, 'manager'));
            }else{
                setManagerFilter((projKey !== 'All' && projKey ? getSortDataForDropdown(ProjFilter, ['manager']) :
                  objDefaultFilter)['manager']);
            }
        }else{
            setManagerFilter(set1DataFilter(data, 'director', newDirector, 'manager'));
        }
    }

    // MANAGER
    const handleChangeManager = (event, newManager) => {
        setSelectManager(newManager);
        if(newManager === 'All' || !newManager){
            setSelectManager('All');
            filterData['manager'] = 'All';
        }
    }



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
                        title="Project Key"
                        subtitle="Project Key"
                        options={[...projectOptions]}
                        value={projKey}
                        handleChange={handleChangeKey}
                        theme={theme}
                        colors={colors}
                    />
                    <Dropdown
                        title="Portfolio"
                        subtitle="Portfolio"
                        options={PortFilter}
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

                </Grid>
        </CustomAccordion>
    );

}

export default ProductDropdown;