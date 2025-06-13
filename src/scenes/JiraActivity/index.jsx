import {React, useState, useEffect} from "react";
import {Box, useTheme} from '@mui/material';
import Header from "../../components/Header";
import ProgressIcon from "../../common-components/ProgressIcon";
import { tokens } from "../../theme";
import { callExpressServerEndpoint } from "../../utils";
import JiraUser from './JiraUser'
import LinearPercentageProgressBar from "../../common-components/LinearPercentageProgressBar";

const JiraData = ({ theme, colors }) => {
    const [userData, setUserData] = useState([]);
    const [progress, setProgress] = useState(0);
    const [lastRun, setLastRun] = useState("");

    const totalPages = 20;
    const progressPerPage = 100 / totalPages;

    useEffect(() => {
        const callbackFunction = (response) => {
            const data = response.data.data;
            setLastRun(response.data.update_date);
            setUserData(previousData => [...previousData, ...data]);
            setProgress((prevProgress) =>  prevProgress + progressPerPage);
        };
      
      // Loop through each number and fetch the data
      for (let number = 1; number <= totalPages; number++) {
        callExpressServerEndpoint('GET', `jiraIssueData?number=${number}`, null, callbackFunction);
      }
    }, [progressPerPage]);

    
    if (userData.length === 0) {
        return  <ProgressIcon />;
    }

    return (
        <div>
            {progress < 100 
            && 
            <Box sx={{ width: '100%' }}>
                <LinearPercentageProgressBar value={progress} />
            </Box>}
            <JiraUser data={userData} lastRun={lastRun} theme={theme} colors={colors} />
        </div>
    );
}


const JiraActivity = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box m="25px">

            {/* HEADER */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="User Activity" subtitle="Jira Activity in last 90 Days" />
            </Box>
            <JiraData theme={theme} colors={colors} />
            
        </Box>
    );

}

export default JiraActivity;