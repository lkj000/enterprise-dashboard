import React from 'react';
import { Box } from '@mui/material';
import Header from "../../components/Header";
import TileBox from "../../components/TileBox";
import status from "../../data-json/platformStatus.json";

const Infrastructure = () => {

    //STATUS
    var artStatus = status.artifactory_status.charAt(0).toUpperCase() + status.artifactory_status.slice(1);
    var gitStatus = status.github_status.charAt(0).toUpperCase() + status.github_status.slice(1);
    var sonarStatus = status.sonar_status.charAt(0).toUpperCase() + status.sonar_status.slice(1);
    var veracodeStatus = status.veracode_status.charAt(0).toUpperCase() + status.veracode_status.slice(1);

        return (
            <Box m="25px">

                {/* HEADER */}
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Header title="Infrastructure Status" subtitle="Overview" />
                </Box>

                {/* TILES */}
                <Box display="flex" flexDirection="column" justifyContent="space-between" sx={{positionLeft:15, marginBottom: 5}}>
                    <Box
                    display="grid"
                    gridTemplateColumns="repeat(16, 1fr)"
                    gridAutoRows="100px"
                    gap="10px"
                     marginBottom="10px"
                    >    
                        <TileBox actionIcon={null} title="Artifactory Status" text={artStatus} size="4" info={true} value={[]} /> 
                        <TileBox actionIcon={null} title="GitHub Status" text={gitStatus} size="4" info={true} value={[]} />   
                        <TileBox actionIcon={null} title="Sonar Status" text={sonarStatus} size="4" info={true} value={[]} />
                        <TileBox actionIcon={null} title="Veracode Status" text={veracodeStatus} size="4" info={true} value={[]} />  
                    </Box>
                </Box>
            </Box>
        );
    }


export default Infrastructure;