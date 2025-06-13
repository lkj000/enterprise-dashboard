import {React} from "react";
import { Box, useTheme } from '@mui/material';
import Header from "../../components/Header";
import GHARepo from "./GHARepo";
import { tokens } from "../../theme";
import processData from "./requests";

const GHARepository = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);        

    return (
    <Box m="25px">

        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Header title="GitHub Active Repositories" subtitle="Overview" />
        </Box>
    
        <GHARepo data={processData} theme={theme} colors={colors} />

    </Box>
    );
};

export default GHARepository;