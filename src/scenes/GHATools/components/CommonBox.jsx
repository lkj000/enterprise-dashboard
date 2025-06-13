import { React, Fragment, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import DynamicTabs from "./DynamicTabs";

const CommonBox = ({ input, subTabValue, workflowData, colors }) => {
  const lenData = Math.round(input.length / 2);

  // AUTO SCROLL TO SELECTED TAB
  useEffect(() => {
    if (subTabValue.subBoxName) {
      const getTitle = subTabValue.subBoxName.split("-")[0];
      const element = document.getElementById(getTitle);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [subTabValue]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      sx={{ width: "100%", height: "auto", borderRadius: "5px" }}
    >
      {Array.from(Array(lenData)).map((_, i) => (
        <Grid container key={i}>
          {input.slice(i * 2, i * 2 + 2).map((item, index) => (
            <Fragment key={index}>
              <Grid
                item
                xs
                id={item.title}
                sx={{
                  filter: "drop-shadow(0px 4px 3px rgba(0, 0, 0, 0.2))",
                  borderRadius: "5px",
                  margin: 1,
                  backgroundColor: colors.primary[400],
                }}
              >
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="center"
                  sx={{ marginTop: 1 }}
                >
                  {item.icon}
                  <Typography
                    variant="h4"
                    component="div"
                    sx={{ marginLeft: 1 }}
                  >
                    {item.title}
                  </Typography>
                </Box>

                <DynamicTabs
                  item={item}
                  subTabValue={subTabValue}
                  workflowData={workflowData}
                />
              </Grid>
              {input.length % 2 !== 0 && i === lenData - 1 ? (
                <Grid item xs sx={{ margin: 1 }}></Grid>
              ) : null}
            </Fragment>
          ))}
        </Grid>
      ))}
    </Box>
  );
};

export default CommonBox;
