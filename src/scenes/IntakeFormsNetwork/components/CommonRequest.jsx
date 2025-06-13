import {
  Alert,
  Box,
  Button,
  Divider,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import JiraModal from "../../../common-components/IntakeJiraForm/JiraModal";
import { getJiraFields } from "./JiraModal/JiraFunc";
import { tokens } from "../../../theme";
import { parseHtml } from "../utils";

const CommonRequest = ({ input }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [openJiraModal, setOpenJiraModal] = useState(false);
  const [jiraDetails, setJiraDetails] = useState({});
  const [isFirewallForm, setIsFirewallForm] = useState(false);

  const handleCreateJiraStory = (item) => {
    setOpenJiraModal(true);
    setJiraDetails({
      description: item.jiraTicketDescription,
      project: item.jiraProjectKey,
      additionalFields:
        item.jiraProjectLabels && `labels:${item.jiraProjectLabels}`,
    });
    setIsFirewallForm(item.isFirewallForm);
  };

  return (
    <>
      <Grid container spacing={2}>
        {input &&
          input.map((item, index) => {
            return (
              <Grid item xs={6} key={index}>
                <Box
                  backgroundColor={colors.primary[400]}
                  sx={{
                    filter: "drop-shadow(0px 4px 3px rgba(0, 0, 0, 0.2))",
                    borderRadius: "5px",
                    height: "100%",
                    padding: 2,
                  }}
                >
                  <Typography
                    variant="h4"
                    component="div"
                    sx={{ marginLeft: 1 }}
                    mb="10px"
                  >
                    {item.title}
                  </Typography>
                  <Divider color={colors.tertiary[400]} />
                  <Box marginTop={1}>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleCreateJiraStory(item)}
                      sx={{ marginTop: 1, marginBottom: 1 }}
                    >
                      {item.buttonTitle}
                    </Button>
                    {item.descriptions &&
                      item.descriptions.map((description, index) => {
                        return (
                          <Typography marginBottom="5px" key={index}>
                            {parseHtml(description)}
                          </Typography>
                        );
                      })}
                    {item.instructions && (
                      <>
                        <Typography>{item.instructions.description}</Typography>
                        <ul style={{ marginTop: "5px" }}>
                          {item.instructions.steps.map((step, index) => {
                            return (
                              <li key={index}>
                                <Typography>{parseHtml(step)}</Typography>
                              </li>
                            );
                          })}
                        </ul>
                      </>
                    )}
                    {item.notes && (
                      <Alert
                        severity="info"
                        icon={false}
                        variant="outlined"
                        style={{ width: "100%" }}
                        sx={{ marginBottom: 1 }}
                      >
                        {item.notes.map((note, index) => {
                          return (
                            <Typography key={index}>
                              {parseHtml(note)}
                            </Typography>
                          );
                        })}
                      </Alert>
                    )}
                  </Box>
                </Box>
              </Grid>
            );
          })}
      </Grid>
      <JiraModal
        extractData={{ issueType: "Story", summary: "", ...jiraDetails }}
        isOpen={openJiraModal}
        setModalOpen={setOpenJiraModal}
        getJiraFields={getJiraFields}
        isFirewallForm={isFirewallForm}
      />
    </>
  );
};

export default CommonRequest;
