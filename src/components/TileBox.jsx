import React, { useRef } from "react";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import { tokens } from "../theme";

const TileBox = ({
  actionIcon: ActionIcon,
  text,
  title,
  size,
  info,
  value,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const textRef = useRef(null);

  var colorType = colors.grey[100];
  if (info) {
    colorType = colors.tertiary[600];
  } else {
    colorType = colors.grey[100];
  }

  return (
    <Box
      gridColumn={`span ${size}`}
      backgroundColor={colors.primary[400]}
      maxHeight="150px"
      marginTop="5px"
      marginbottom="0px"
      display="flex"
      sx={{
        filter: "drop-shadow(0px 4px 3px rgba(0, 0, 0, 0.2))",
        borderRadius: "5px",
      }}
    >
      <Box display="flex" flexDirection="column" width="100%">
        <Typography
          variant="h5"
          fontWeight="bold"
          color={colorType}
          sx={{ margin: 1, textAlign: "center" }}
        >
          {title}
        </Typography>

        <Divider
          sx={{
            width: "80%",
            fontSize: 16,
            backgroundColor: colors.tertiary[600],
            marginTop: "-5px",
            alignSelf: "center",
          }}
        />

        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          width="100%"
          marginTop="1px"
          height="50px"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "pre-wrap",
            overflowWrap: "break-word",
            fontSize: "20px",
            lineHeight: "1.2",
          }}
        >
          <Typography
            ref={textRef}
            variant="h2"
            style={{ fontSize: "20px", width: "100%", textAlign: "center" }}
          >
            {text}
          </Typography>
        </Box>
        {value.length > 0 ? (
          <>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              width="100%"
            >
              {/*    <Divider sx={{ width: '95%', fontSize: 16, backgroundColor: colors.tertiary[600] }} /> */}
            </Box>
            <Typography
              variant="h5"
              color={colors.tertiary[600]}
              sx={{ margin: 1, textAlign: "center", fontSize: "17px" }}
            >
              {value[0]}
            </Typography>
          </>
        ) : null}
      </Box>
    </Box>
  );
};

export default TileBox;
