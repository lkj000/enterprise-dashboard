import { React }  from 'react';
import { Box, Typography } from '@mui/material';
import { ACRPolicyData } from "../data/acrpolicy";

const ACRPolicy = ({ value, input }) => {
    return (
        <Box             
            display="flex"
            flexDirection="column"
            sx={{ width: '100%', height: '90vh'}}>
            {/* POLICY */}
            {value === '1' ? 
            <Box
                display="flex"
                flexDirection="column"
            >                
                {ACRPolicyData[0].policy.map((data,index) => {
                return (
                    <>
                    <Typography variant="p" fontSize="16px" paddingLeft="10px" fontWeight="bold">
                        {data.name}
                    </Typography>
                    <ul style={{ listStyleType: 'initial'}}>
                    {data.content.map((info, index1) => {
                        return(
                        <li key={index1}>
                            <Typography variant="p" fontSize="16px">
                            {info.title}
                            </Typography>
                        </li>
                        )})}
                    </ul>                    
                    <br/>
                    </>
                )})}
            </Box> : ""}
        </Box>
    );
}

export default ACRPolicy;
