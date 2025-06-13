import { escapeForGitHubWorkflow } from "../../../../common-components/IntakeJiraForm/ModalFunc";

export const defaultFields = {  project: "APIM", issueType: "Story" };

export const getJiraFields = (formValues) => {
  const summary = formValues["summary"];
  const description = formValues["description"];

  const combinedDescription = [
    `This ticket is created by ${localStorage.getItem("fname")} ${localStorage.getItem("lname")}, ${localStorage.getItem("userid")}`,
    description
  ].filter(Boolean).join("\\n\\n");

  return {
    'project_key': formValues["project"],
    'issue_type': formValues["issueType"],
    'summary': escapeForGitHubWorkflow(summary),
    'description': escapeForGitHubWorkflow(combinedDescription),
    "relates_to_issue_id": formValues["linkIssue"],
    "relation_type": formValues["linkIssueType"]
  };
};