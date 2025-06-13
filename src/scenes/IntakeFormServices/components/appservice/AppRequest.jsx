import { React } from "react";
import { Box, Divider, Grid, Typography } from '@mui/material';
import RequestContent from "./RequestContent";


const AppRequest = ({ tabContent, colors }) => {


  return (
    // CONTENT - BOXES
    <Grid container spacing={3}>
      {tabContent && tabContent.map((item, index) => (
        <Grid item xs={6} key={index}>
        <Box backgroundColor={colors.primary[400]} sx={{
          filter: "drop-shadow(0px 4px 3px rgba(0, 0, 0, 0.2))",
          borderRadius: "5px",
          height: "100%",
          padding: 2
        }}>
          <Typography variant="h4" component="div" mb="10px" sx={{ marginLeft: 1 }}>
            {item.tabTitle}
          </Typography>
          <Divider color={colors.tertiary[400]} sx={{ marginBottom: '10px'}} />
          <RequestContent input={item.formData} />
        </Box>
        </Grid>))}
      </Grid>
  );
};

export default AppRequest;