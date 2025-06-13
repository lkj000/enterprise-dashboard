import {
  escapeForGitHubWorkflow,
  parseRulesData,
} from "../../../../common-components/IntakeJiraForm/ModalFunc";
import { validateKeyValueStringFormat } from "../../../../utils";

export const getJiraFields = (formValues, rulesData) => {
  const description = formValues["description"];
  const rules = parseRulesData(rulesData);

  const combinedDescription = [
    `This ticket is created by ${localStorage.getItem(
      "fname"
    )} ${localStorage.getItem("lname")}, ${localStorage.getItem("userid")}`,
    description,
    rules,
  ]
    .filter(Boolean)
    .join("\\n\\n");

  return {
    project_key: formValues["project"],
    issue_type: formValues["issueType"],
    additional_fields:
      formValues["additionalFields"] &&
      validateKeyValueStringFormat(formValues["additionalFields"]) &&
      formValues["additionalFields"],
    summary: formValues["summary"],
    description: escapeForGitHubWorkflow(combinedDescription),
  };
};
