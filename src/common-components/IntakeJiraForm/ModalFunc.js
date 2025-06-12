import { callExpressServerEndpointSync, HttpStatusCodes } from "../../utils";

const repoName = 'esgh-jira-integration';
const workflowId = 'jira_ticket_creation.yml';


// ESCAPE GITHUB FUNC
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


// RULES FUNC
export const parseRulesData = (data) => {
  if(data.length === 0) {
    return '';
  }
  const markDown = data.map((row, index) => {
    return `| ${row.rules} | ${row.type} | ${row.action} | ${row.sourceHost} | ${row.destinationHost} |`;
  });
  return '\\nFirewall Request Form\\n|| Rules || Type || Action || Source Host || Destintion Host||\\n' + markDown.join("\\n");
};


// JIRA ISSUE CREATION
export const createJiraIssue = async (inputFields, extractData, setFormValues, setRulesData, setModalOpen, setAlertOpen, setAlertSeverity, setAlertTitle) => {
  const body = {};
  body["repoName"] = repoName;
  body["workflowId"] = workflowId;
  body["payload"] = {
    'ref': 'master',
    'inputs': inputFields
  };
  
  
  body.payload.inputs['user_jwt'] = "";
  const response = await callExpressServerEndpointSync('POST', 'triggerWorkflow', body);

  if (response.status === HttpStatusCodes.NO_CONTENT) {
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
  setRulesData([]);
};