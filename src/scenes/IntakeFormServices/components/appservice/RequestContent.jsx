import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import JiraModal from "../../../../common-components/IntakeJiraForm/JiraModal";
import { compTypes, portfolioList, defaultFields, getJiraFields } from "./JiraFunc";
import { parseAllContents } from "../../../../common-components/IntakeJiraForm/utils";


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
    <>
      {input.map((item, index) => (
        <Box key={index}>

          {/* BUTTON */}
          {item.button &&  (<Box display="flex" flexDirection="column">
            {item.button.map((info, inc) => ( <Box key={inc}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleButton(info)}
                sx={{ marginTop: 1, marginBottom: 2 }}
              >
                {info.buttonTitle}
              </Button>
            </Box>))}
          </Box>)}

          {/* CONTENT */}
          {item.element && item.element.map((data, elementIdx) => (
            <Box key={elementIdx}>{parseAllContents(data)}</Box>
          ))}
        </Box>
      ))}

      <JiraModal
        extractData={{ ...defaultFields, ...jiraInfo }}
        compTypes={compTypes}
        portfolioList={portfolioList}
        isOpen={ModalOpen}
        setModalOpen={setModalOpen}
        getJiraFields={getJiraFields}
      />

    </>
  );
};

export default RequestContent;