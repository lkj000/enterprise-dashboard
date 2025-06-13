import React, { useState } from "react";
import { Grid, Button } from "@mui/material";
import JiraModal from "../../../../common-components/IntakeJiraForm/JiraModal";
import { defaultFields, getJiraFields } from "./JiraFunc";


const CommonContent = ({ input }) => {

  const [ ModalOpen , setModalOpen ] = useState(false);
  const [ jiraInfo, setJiraInfo ] = useState({
    summary: "",
    description: "",
    linkIssue: "",
    linkIssueType: ""
  });

  const handleButton = (item) => {
    setModalOpen(true);
    setJiraInfo({
      summary: item.jiraTicketSummary,
      description: item.jiraTicketDescription,
      linkIssue: item.jiraLinkIssue,
      linkIssueType: item.jiraLinkIssueType
    });
  };


  return (
    <Grid item>
      <Button
        variant="contained"
        color="secondary"
        onClick={() =>  handleButton(input)}
      >
        {input.buttonTitle}
      </Button>
      <JiraModal
        extractData={{ ...defaultFields, ...jiraInfo }}
        isOpen={ModalOpen}
        setModalOpen={setModalOpen}
        getJiraFields={getJiraFields}
      />
    </Grid>
  );
};

export default CommonContent;