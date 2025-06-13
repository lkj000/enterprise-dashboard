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
import { tokens } from "../../theme";
import "./styles.css";
import { callExpressServerEndpointSync } from "../../utils";

const convertToLink = (text) => {
  const urlRegex = /(https:\/\/[^\s]+)/g;
  return text.split(urlRegex).map((part, index) =>
    urlRegex.test(part) ? (
      <a key={index} href={part} target="_blank" rel="noopener noreferrer">
        {part}
      </a>
    ) : (
      part
    )
  );
};

const Announcements = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [contentData, setData] = useState({
    NewUpdate: [],
    Maintenance: [],
    Issue: [],
    FAQ: [],
  });

  const fetchData = async () => {
    try {
      const response = await callExpressServerEndpointSync(
        "GET",
        "announcements/key1"
      );
      setData(JSON.parse(response.data));
    } catch (error) {
      console.error("Error fetching data: ", error);
      setData({
        NewUpdate: [],
        Maintenance: [],
        Issue: [],
        FAQ: [],
      });
    }
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 300000);
    return () => clearInterval(intervalId);
  }, []);

  const newsUpdates = contentData[0]?.NewUpdate;
  const maintenance = contentData[0]?.Maintenance;
  const issues = contentData[0]?.Issue;
  const faq = contentData[0]?.FAQ;

  return (
    <Box
      gridColumn="span 5"
      gridRow="span 6"
      backgroundColor={colors.primary[400]}
      overflow="auto"
      paddingBottom="5.5%"
      sx={{
        filter: "drop-shadow(0px 4px 2px rgba(0, 0, 0, 0.2))",
        borderRadius: "5px",
        height: "auto",
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
        <Alert
          severity="info"
          className="hide-scrollbars"
          style={{
            backgroundColor: "transparent",
          }}
        >
          <AlertTitle sx={{ fontSize: "16px" }}>
            <strong>New Updates</strong>
          </AlertTitle>
          <hr />
          <ul style={{ paddingLeft: "15px" }}>
            {newsUpdates && newsUpdates.length > 0 ? (
              newsUpdates.map((contentText, index) => (
                <li key={index} style={{ listStyleType: "square" }}>
                  <Typography
                    color={colors.grey[100]}
                    variant="h5"
                    fontSize="15px"
                    className="content-text"
                  >
                    {contentText.title}:{" "}
                    {convertToLink(contentText.description)}
                  </Typography>

                  <hr />
                </li>
              ))
            ) : (
              <Typography
                color={colors.grey[100]}
                variant="body2"
                fontSize="15px"
                paddingLeft="15px"
              >
                No updates reported.
              </Typography>
            )}
          </ul>
        </Alert>
        <Divider />
        {/* Maintenance */}
        <Alert severity="warning" style={{ backgroundColor: "transparent" }}>
          <AlertTitle sx={{ fontSize: "16px" }}>
            <strong>Maintenance</strong>
          </AlertTitle>
          <hr />
          <ul style={{ paddingLeft: "15px" }}>
            {maintenance && maintenance.length > 0 ? (
              maintenance.map((contentText, index) => (
                <li key={index} style={{ listStyleType: "square" }}>
                  <Typography
                    color={colors.grey[100]}
                    variant="h5"
                    fontSize="15px"
                    className="content-text"
                  >
                    {contentText.title}:{convertToLink(contentText.description)}
                  </Typography>
                  <hr />
                </li>
              ))
            ) : (
              <Typography
                color={colors.grey[100]}
                variant="body2"
                fontSize="15px"
                paddingLeft="15px"
              >
                No updates reported.
              </Typography>
            )}
          </ul>
        </Alert>
        <Divider />
        {/* Error */}
        <Alert severity="error" style={{ backgroundColor: "transparent" }}>
          <AlertTitle sx={{ fontSize: "16px" }}>
            <strong>Issues/Error</strong>
          </AlertTitle>
          <hr />
          <ul style={{ paddingLeft: "15px" }}>
            {issues && issues.length > 0 ? (
              issues.map((contentText, index) => (
                <li key={index} style={{ listStyleType: "square" }}>
                  <Typography
                    color={colors.grey[100]}
                    variant="h5"
                    fontSize="15px"
                    className="content-text"
                  >
                    {contentText.title}:{" "}
                    {convertToLink(contentText.description)}
                  </Typography>
                  <hr />
                </li>
              ))
            ) : (
              <Typography
                color={colors.grey[100]}
                variant="body2"
                fontSize="15px"
                paddingLeft="15px"
              >
                No updates reported.
              </Typography>
            )}
          </ul>
        </Alert>
        <Divider />
        {/* ROW 2 - FAQ*/}
        <Alert severity="success" style={{ backgroundColor: "transparent" }}>
          <AlertTitle sx={{ fontSize: "16px" }}>
            <strong>FAQ</strong>
          </AlertTitle>
          <hr />
          {faq && faq.length > 0 ? (
            <ul style={{ paddingLeft: "15px" }}>
              {faq.map((contentText, index) => (
                <li key={index} style={{ listStyleType: "square" }}>
                  <a
                    href={contentText.url}
                    target="_blank"
                    className="faq-link"
                    rel="noreferrer"
                  >
                    <Typography
                      color={colors.grey[100]}
                      variant="body2"
                      fontSize="15px"
                      className="content-text"
                    >
                      {contentText.title}
                    </Typography>
                    <hr />
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <Typography
              color={colors.grey[100]}
              variant="body2"
              fontSize="15px"
              paddingLeft="15px"
            >
              No FAQ.
            </Typography>
          )}
        </Alert>
      </Stack>
    </Box>
  );
};

export default Announcements;
