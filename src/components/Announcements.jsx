import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Alert,
  AlertTitle,
  Stack,
  useTheme,
  Divider,
} from "@mui/material";
import { tokens } from "../theme";
import { Announcement } from "../data/announcement.js";
import FAQ from "../data/FAQ.md";
import MDReader from "./MDReader";

function Announcements(props) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [announcement, setAnnouncement] = useState([
    { NewUpdate: [], Maintenance: [], Issue: [] },
  ]);
  // const [error, setError] = useState(null);

  async function fetchData() {
    try {
      const response = await fetch("./src/data/announcement.js");
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
      const json = await response.json();
      setAnnouncement(json.Announcement);
      // setError(null);
    } catch (err) {
      // setError(err.message);
    }
  }

  useEffect(() => {
    setAnnouncement(Announcement);
    const interval = setInterval(fetchData, 300000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      gridColumn="span 5"
      gridRow="span 6"
      backgroundColor={colors.primary[400]}
      overflow="auto"
      paddingBottom="5.5%"
      sx={{
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.7)',
        borderRadius: '5px',
        height: 'auto',
    
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        borderBottom={`4px dashed ${colors.primary[400]}`}
        colors={colors.grey[100]}
        p="15px"
      >
        <Typography color={colors.grey[100]} variant="h3" fontWeight="600">
          Announcements
        </Typography>
      </Box>
      <Divider />
      <Stack spacing={2} mx={1}>
        {/* Information */}
        <Alert severity="info" style={{backgroundColor:"transparent"}}>
          <AlertTitle sx={{ fontSize: "16px" }}>
            <strong>New Updates</strong>
          </AlertTitle>
          {announcement[0].NewUpdate.length > 0 && (
            <ul style={{ paddingLeft: "25px" }}>
              {announcement[0].NewUpdate.map((e, index) => (
                <li key={index} style={{ listStyleType: "square", wordWrap: "break-word", whiteSpace: "normal"}}>
                  <Typography
                    color={colors.grey[100]}
                    variant="h5"
                    fontSize="15px"
                  >
                    {e.title}
                  </Typography>
                  <br />
                </li>
              ))}
            </ul>
          )}
          {announcement[0].NewUpdate.length === 0 && (
            <Typography
              color={colors.grey[100]}
              variant="h5"
              fontSize="15px"
              paddingLeft="15px"
            >
              No updates reported.
            </Typography>
          )}
        </Alert>
        <Divider />
        {/* Maintenance */}
        <Alert severity="warning" style={{backgroundColor:"transparent"}}>
          <AlertTitle sx={{ fontSize: "16px" }}>
            <strong>Maintenance</strong>
          </AlertTitle>
          {announcement[0].Maintenance.length > 0 && (
            <ul style={{ paddingLeft: "25px" }}>
              {announcement[0].Maintenance.map((e, index) => (
                <li key={index} style={{ listStyleType: "square" }}>
                  <Typography
                    color={colors.grey[100]}
                    variant="h5"
                    fontSize="15px"
                  >
                    {e.title}
                  </Typography>
                  <br />
                </li>
              ))}
            </ul>
          )}
          {announcement[0].Maintenance.length === 0 && (
            <Typography
              color={colors.grey[100]}
              variant="h5"
              fontSize="15px"
              paddingLeft="15px"
            >
              No maintenance reported.
            </Typography>
          )}
        </Alert>
<Divider />
        {/* Error */}
        <Alert severity="error" style={{backgroundColor:"transparent"}}>
          <AlertTitle sx={{ fontSize: "16px" }}>
            <strong>Issues/Error</strong>
          </AlertTitle>
          {announcement[0].Issue.length > 0 && (
            <ul style={{ paddingLeft: "25px" }}>
              {announcement[0].Issue.map((e, index) => (
                <li key={index} style={{ listStyleType: "square" }}>
                  <Typography
                    color={colors.grey[100]}
                    variant="h5"
                    fontSize="15px"
                  >
                    {e.title}
                  </Typography>
                  <br />
                </li>
              ))}
            </ul>
          )}
          {announcement[0].Issue.length === 0 && (
            <Typography
              color={colors.grey[100]}
              variant="h5"
              fontSize="15px"
              paddingLeft="15px"
            >
              No issues reported.
            </Typography>
          )}
        </Alert>
        <Divider />
        {/* ROW 2 - FAQ*/}
        <MDReader filePath={FAQ} />
        
      </Stack>
    </Box>
  );
}

export default Announcements;
