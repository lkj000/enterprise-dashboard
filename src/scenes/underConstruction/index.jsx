import { Typography } from "@mui/material";
import React from 'react';
import ConstructionIcon from '@mui/icons-material/Construction';

const UnderConstruction = () => {

    return (
        // <Box
        // display="grid"
        // gridTemplateColumns="repeat(12, 1fr)"
        // gridAutoRows="140px"
        // gap="20px"

        // >   
        // <Box gridColumn="span 12"
        //   gridRow="span 3"
        //   display="flex"
        //   alignItems="center"
        //   justifyContent="center"></Box>
        // <Box gridColumn="span 4"

        //   display="flex"
        //   alignItems="center"
        //   justifyContent="center"></Box>
        // <Box
        //     gridColumn="span 4"
        //     backgroundColor={colors.primary[400]}
        //     display="flex"
        //     justifyContent="center"
        //     alignItems="center"
        //     >
        <dir style={{
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "Center",
            top: "50%",
            left: "50%",
            transform: "translateY(-50%)",
            paddingLeft: "10px",
        }}
        >

                <ConstructionIcon transform="scale(4)"/>


            <Typography><h1 position="absolute">UNDER CONSTRUCTION</h1>  </Typography>  
        </dir>

        //     </Box>
        // </Box>
    );
};


export default UnderConstruction;