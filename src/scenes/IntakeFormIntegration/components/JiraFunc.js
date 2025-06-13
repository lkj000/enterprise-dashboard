import { escapeForGitHubWorkflow } from "../../../common-components/IntakeJiraForm/ModalFunc";

export const compTypes = ["AH26754 Support", "PD26754 Data Integration", "RI26754 RAID and Impediments", "TM26754 Barycenter", "TM26754 Interstellar Overdrive", "TM26754 Titans"];
export const defaultFields = { project: "PDI", issueType: "Story", componentType: [compTypes[0]] };


export const getJiraFields = (formValues) => {
  const summary = formValues["summary"];
  const description = formValues["description"];
  const componentType = formValues["componentType"].join(",");

  const combinedDescription = [
    `This ticket is created by ${localStorage.getItem("fname")} ${localStorage.getItem("lname")}, ${localStorage.getItem("userid")}`,
    description
  ].filter(Boolean).join("\\n\\n");

  return {
    'project_key': formValues["project"],
    'issue_type': formValues["issueType"],
    'summary': escapeForGitHubWorkflow(summary),
    'description': escapeForGitHubWorkflow(combinedDescription),
    'components': componentType,
    "relates_to_issue_id": formValues["linkIssue"],
    "relation_type": formValues["linkIssueType"]
  };
};