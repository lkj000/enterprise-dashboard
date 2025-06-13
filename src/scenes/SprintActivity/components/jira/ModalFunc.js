import { callExpressServerEndpoint, getToken, HttpStatusCodes } from "../../../../utils";

export const IssueTypes = ["Retrospective", "Epic", "Task", "Feature", "Initiative", "Story", "Risk", "Test Case", "Spike", "Bug", "Action Item"];
export const jiraModalFields = { issueType: "", epic_name: "", summary: "", description: "" };


// Functions
export const escapeForGitHubWorkflow = (input) => {
  if (!input) {
    return '';
  } 
  // Replace special characters with escaped versions
  return input
    .replace(/\\/g, '\\\\')      // Escape backslashes
    .replace(/\$/g, '\\$')        // Escape dollar signs
    .replace(/`/g, '\\`')         // Escape backticks
    .replace(/\n/g, '\\n')        // Replace newlines with escaped newlines
    .replace(/\r/g, '\\r')        // Replace carriage returns with escaped carriage returns
    .replace(/"/g, "'");        // Replace double quotes with single quotes
};


export const getJiraFields = (formValues) => {
  const summary = formValues["summary"];
  const description = formValues["description"];

  const combinedDescription = [
    `This ticket is created by ${localStorage.getItem("fname")} ${localStorage.getItem("lname")}, ${localStorage.getItem("userid")}`,
    description
  ].filter(Boolean).join("\\n\\n");

  return {
    'user_jwt': localStorage.getItem("token"),
    'project_key': formValues["project"],
    'issue_type': formValues["issueType"],
    'epic_name': escapeForGitHubWorkflow(formValues["epic_name"]),
    'summary': escapeForGitHubWorkflow(summary),
    'description': escapeForGitHubWorkflow(combinedDescription)
  };
};


// JIRA ISSUE CREATION
export const createJiraIssue = (inputFields, extractData, setFormValues, setModalOpen, setAlertOpen, setAlertSeverity, setAlertTitle) => {
    const body = {};
    body["repoName"] = 'esgh-jira-integration';
    body["workflowId"] = 'jira_ticket_creation.yml';
    body["payload"] = {
      'ref': 'master',
      'inputs': inputFields
    };
  
    const responseCallback = response => {
      if(response.status === HttpStatusCodes.NO_CONTENT) {
        setAlertSeverity("success");
        setAlertTitle("Ticket request is created. You will get details in your email.");
      } else {
        console.log(response);
        setAlertSeverity("error");
        setAlertTitle("Ticket Not Created");
      };
      setModalOpen(false);
      setAlertOpen(true);
      setFormValues(extractData);
    };
  
    getToken().then((token) => {
      body.payload.inputs['user_jwt'] = token;
      callExpressServerEndpoint('POST', 'triggerWorkflow', body, responseCallback);
    });
};