import { escapeForGitHubWorkflow } from "../../../../common-components/IntakeJiraForm/ModalFunc";
import { validateKeyValueStringFormat } from "../../../../utils";

export const compTypes = ["AH26751 Ad Hoc Requests", "AH26751 API Repointing to STV2", "AH26751 Application DR", "AH26751 PCF to AKS", "Merchandising", "PD26751 App Services Integration", "TM26751 Samurai"];
export const portfolioList = ["None", "CIO", "Cloud and IT Operations", "Cloud Services Architecture", "Corp Services - Accounting & Finance", "Corp Services - HCM", "Corp Services - Other", "Corp Services - WFM", "Corporate Services", "Data Engineering", "Data Management", "Digital", "Digital & Data", "Digital Customer Experience", "Digital Customer Service", "Digital Engineering Ops", "Digital Fulfillment", "Digital Loyalty", "Digital Marketing", "Digital Shopper Experience", "Digital UX", "Digitize and AI Operations", "Enterprise Application Architecture", "Enterprise BI", "Enterprise Data and Analytics", "Enterprise Processes and Services", "Health and Wellness", "Human Resource", "Information Risk and Cyber Security", "Infosec", "IT Finance", "IT Operations", "Maintenance", "Maintenance and Purchasing Support", "Manufacturing", "Marketing", "Merchandising", "Merchandising and Marketing", "Omni and Schedule and Save", "Other", "Payments", "Pharmacy", "Platform and Apps Architecture", "Privacy and Compliance", "Procurement", "Real Estate", "Retail", "Retail Customer Experience", "Retail Field Services", "Retail Operations", "Supply Chain", "Tech Ops (COG)", "Technology Transformation", "United IT", "Workforce Talent and Payroll Mgmt"];

export const defaultFields = {  project: "APIM", issueType: "Story", componentType: [compTypes[0]], portfolio: portfolioList[0] };


export const getJiraFields = (formValues) => {
  const summary = formValues["summary"];
  const description = formValues["description"];
  const componentType = formValues["componentType"].join(",");
  const additionalFields = (formValues["portfolio"] === "None") ? "" 
    : `portfolio: ${formValues["portfolio"]}`;

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
    'additional_fields': validateKeyValueStringFormat(additionalFields) ? additionalFields : "",
    "relates_to_issue_id": formValues["linkIssue"],
    "relation_type": formValues["linkIssueType"]
  };
};