import { React } from "react";
import { Box, Grid, Typography } from "@mui/material";
import ChangeHistoryOutlinedIcon from "@mui/icons-material/ChangeHistoryOutlined";

const CWFBox = ({ count, input, colors }) => {
  return count > 0
    ? input.map((data, index) => {
        return (
          <Grid
            key={index}
            display="flex"
            flexDirection="column"
            alignItems="center"
            mb={6}
          >
            <Box
              display="flex"
              backgroundColor={colors.primary[400]}
              sx={{
                width: "70%",
                height: "auto",

                overflow: "auto",
                filter: "drop-shadow(0px 4px 3px rgba(0, 0, 0, 0.2))",
                borderRadius: "8px",
              }}
            >
              {/* TITLE */}
              <Box display="flex" flexDirection="column" margin={3} gap={0.6}>
                <ChangeHistoryOutlinedIcon />
                <Typography
                  variant="h6"
                  fontWeight="600"
                  fontSize="16px"
                  ml={0.3}
                >
                  {data.title}
                </Typography>
              </Box>

              {/* CONTENT */}
              <Box my={1} mr={2} ml={-3}>
                <ul>
                  {data.content.map((item, index) => {
                    return (
                      <li key={index} style={{ marginBottom: "14px" }}>
                        <Typography variant="p" fontSize="17px">
                          {item.issue}
                        </Typography>
                      </li>
                    );
                  })}
                </ul>
              </Box>
            </Box>
          </Grid>
        );
      })
    : null;
};

export default CWFBox;
