import { React, useEffect, useState } from "react";
import { Box, Divider, Grid, Typography, useTheme } from '@mui/material';
import Header from "../../components/Header";
import RequestContent from "./components/RequestContent";
import autoData from "./data/automated-forms-requests.json";
import { parseAllContents } from "../../common-components/IntakeJiraForm/utils";
import { tokens } from "../../theme";


const IntakeFormB2B = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode); 

  const [ tabsData, setTabsData ] = useState([]);

  useEffect(() => {
    setTabsData(autoData.data);
  }, []);


  return (
    <Box m="25px">

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title={autoData.title} subtitle={autoData.subTitle} />
      </Box>

      {/* NOTES */}
      {autoData.notes && (
         <Box 
            display="flex"
            flexDirection={"column"}
            mb={5}
            backgroundColor={colors.primary[400]}
            sx={{
              width: "100%",
              height: "96%",
              filter: "drop-shadow(0px 4px 3px rgba(0, 0, 0, 0.2))",
              borderRadius: "5px",            
              padding: 2,
            }}
          >
          <Grid container spacing={3} >
            {autoData.notes.map((data, index) => (
              <Grid item xs={12} sm={index === 0 ? 12 : 6} key={index}>
                <Box width="100%">{parseAllContents(data)}</Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* CONTENT - BOXES */}
      <Grid container spacing={3} marginTop={4} marginBottom={4}>
        {tabsData && tabsData.map((item, index) => (
          <Grid item xs={6} key={index}>
          <Box backgroundColor={colors.primary[400]} sx={{
            filter: "drop-shadow(0px 4px 3px rgba(0, 0, 0, 0.2))",
            borderRadius: "5px",
            height: "100%",
            padding: 2
          }}
          >
            <Typography variant="h4" component="div" mb="10px" sx={{ marginLeft: 1 }}>
              {item.tabTitle}
            </Typography>
            <Divider color={colors.tertiary[400]} sx={{ marginBottom: '10px'}} />
            <RequestContent input={item.formData} />
          </Box>
        </Grid>))}
      </Grid>

    </Box>
  );
};

export default IntakeFormB2B;