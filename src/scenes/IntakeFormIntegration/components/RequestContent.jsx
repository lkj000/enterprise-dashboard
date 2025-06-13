import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import JiraModal from "../../../common-components/IntakeJiraForm/JiraModal";
import { compTypes, defaultFields, getJiraFields } from "./JiraFunc";


const RequestContent = ({ input }) => {

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
    <Box>
      <Button
        variant="contained"
        color="secondary"
        onClick={() =>  handleButton(input)}
        sx={{ marginBottom: 2, width: '200px' }}
      >
        {input.buttonTitle}
      </Button>
      <JiraModal
        extractData={{ ...defaultFields, ...jiraInfo }}
        compTypes={compTypes}
        isOpen={ModalOpen}
        setModalOpen={setModalOpen}
        getJiraFields={getJiraFields}
      />
    </Box>
  );
};

export default RequestContent;