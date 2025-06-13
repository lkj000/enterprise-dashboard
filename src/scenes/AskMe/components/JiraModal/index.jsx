import React, { useState, useRef, useEffect } from "react";
import {
  MenuItem,
  TextField,
  DialogContentText,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Grid,
} from "@mui/material";
import { Dialog, useTheme } from "@mui/material";

import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import CheckBox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

import { Box } from "@mui/system";
import { tokens } from "../../../../theme.js";
import { callExpressServerEndpoint, getToken, HttpStatusCodes, validateKeyValueStringFormat } from "../../../../utils.js";
import SnackbarAlert from "../../../../components/SnackbarAlert.jsx";
import "./styles.css";

const JiraModal = ({ jiraContent, projectKeys, isOpen, setModalOpen }) => {
  
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const accentGreen = colors.tertiary[600];

  const {extractedData}=jiraContent
  const [formValues, setFormValues] = useState({
    project: extractedData.project || "",
    issueType:  extractedData.issueType || "",
  });

  const [snackbarAlertOpen, setSnackbarAlertOpen] = useState(false);
  const [snackbarAlertSeverety, setSnackbarAlertSeverety] = useState("");
  const [snackbarAlertTitle, setSnackbarAlertTitle] = useState("");
  const [linkIssueChecked, setLinkIssueChecked] = useState(false);

  const defaultLinkingTypes = [
    "Blocks", "Child", "Cloners", "Dependency", "Dev-Tasks", "Duplicate",
    "Has Defects", "Issue split", "Parent", "Relates", "Tests"
  ];

  // const jiraSummaryContent = jiraContent.extractedData.jiraSummary;
  // const remainingText = jiraContent.remainingText;

  useEffect(() => {
    setFormValues((prevValues) => ({
      ...prevValues,
      ...extractedData
    }));
  }, [extractedData]);

  const handleSubmit = (event) => {
    event.preventDefault();
    createJiraIssue();
  };

  const handleChange = (event) => {
    const target = event.target;

    if(!isInputValid(target)) {
      return;
    }

    const { name, value } = target;
    setFormValues((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const isInputValid = (inputObj) => {
    if(inputObj.name === 'story_points' 
       && inputObj.value 
       && inputObj.value <= 0) {

      return false;
    }

    return true;
  }

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleCloseSnackbarAlert = () => {
    setSnackbarAlertOpen(false);
  }

  const handleLinkIssueCheckboxChange = (event) => {
    setLinkIssueChecked(event.target.checked);
  }

  const borderColor = (notFocusedColor, hoverColor, focusedColor) => {
    return {
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: notFocusedColor, // Change border color when not focused
        },
        '&:hover fieldset': {
          borderColor: hoverColor, // Change border color when hovered
        },
        '&.Mui-focused fieldset': {
          borderColor: focusedColor,
        },
      },
    };
  }

  const escapeForGitHubWorkflow = (input) => {
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
}

  const createJiraIssue = () => {
    const summary = formValues["summary"];
    const acceptanceCriteria = formValues["acceptance_criteria"];
    const description = formValues["description"];
    const codeSuggestion = formValues["code_suggestion"];
    const testCases = formValues["test_cases"];
    const testData = formValues["test_data"];
    const otherFields = formValues["other_fields"];
    const story_points = formValues["story_points"];
    const existingIssueNumber = formValues["existing_issue_number"];
    const linkingType = formValues["linking_type"];
    const additionalFields = `epic_name: ${escapeForGitHubWorkflow(formValues["epic_name"])}`;

    const combinedDescription = [
      `This ticket is created by ${localStorage.getItem("fname")} ${localStorage.getItem("lname")}, ${localStorage.getItem("userid")}`,
      description,
      acceptanceCriteria ? "Acceptance criteria" : "",
      acceptanceCriteria,
      codeSuggestion ? "Code suggestions" : "",
      codeSuggestion,
      testCases ? "Test cases" : "",
      testCases,
      testData ? "Test data" : "",
      testData,
      otherFields ? "Other Fields" : "",
      otherFields
    ].filter(Boolean).join("\\n\\n");

    const body = {};
    const inputFields = {
      'summary': escapeForGitHubWorkflow(summary),
      'description': escapeForGitHubWorkflow(combinedDescription),
      'project_key': formValues["project"],
      'issue_type': formValues["issueType"],
      'additional_fields': validateKeyValueStringFormat(additionalFields) ? additionalFields : "",
      'story_points': String(story_points), // Convert to string if it's a number
    };

    if(linkIssueChecked) {
      inputFields['relates_to_issue_id'] = (typeof existingIssueNumber === 'string' && existingIssueNumber.trim() !== "")
      ? existingIssueNumber.trim().toUpperCase() : "";
      inputFields['relation_type'] = linkingType ? linkingType : "";
    }

    body["repoName"] = 'esgh-jira-integration';
    body["workflowId"] = 'jira_ticket_creation.yml';
    body["payload"] = {
      'ref': 'master',
      'inputs': inputFields
    };


    const responseCallback = response => {
      if(response.status === HttpStatusCodes.NO_CONTENT) {
        setSnackbarAlertSeverety("success");
        setSnackbarAlertTitle("Ticket request is created. You will get details in your email.");
      }
      else {
        console.log(response);
        setSnackbarAlertSeverety("error");
        setSnackbarAlertTitle("Ticket Not Created");
      }
      setModalOpen(false)
      setSnackbarAlertOpen(true);
    };

    getToken()
    .then((token) => {
      body.payload.inputs['user_jwt'] = token;
      callExpressServerEndpoint('POST', 'triggerWorkflow', body, responseCallback);
    });
  }

  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (isOpen) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [isOpen]);

  return (
    <>
    <Dialog
      open={isOpen}
      onClose={() => setModalOpen(false)}
      scroll={'paper'}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle   id='scroll-dialog-title'>
        <Typography variant="h4" style={{ fontWeight: "bold" }}>
          Create JIRA Ticket
        </Typography>
      </DialogTitle>
      <form onSubmit={handleSubmit} id="form-id">
        <DialogContent dividers={true} >
          <DialogContentText
           
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
           
            
          >
            <Box sx={{maxHeight:500, overflowY: 'auto'}}>
            <Grid container spacing={1}  >
              <Grid item>
              <TextField
                  select
                  required
                  className="form-field-label"
                  placeholder="Project"
                  label="Project"
                  name="project"
                  value={formValues.project}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                >
                  {projectKeys.map((key) => (
                  <MenuItem value={key}> {key} </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                required
                className="form-field-label"
                placeholder="Issue Type"
                label="Issue Type"
                name="issueType"
                value={formValues.issueType}
                onChange={handleChange}
                fullWidth
                margin="normal"
              >
                <MenuItem value="Retrospective">Retrospective</MenuItem>
                <MenuItem value="Epic">Epic</MenuItem>
                <MenuItem value="Task">Task</MenuItem>
                <MenuItem value="Feature">Feature</MenuItem>
                <MenuItem value="Initiative">Initiative</MenuItem>
                <MenuItem value="Story">Story</MenuItem>
                <MenuItem value="Risk">Risk</MenuItem>
                <MenuItem value="Test Case">Test Case</MenuItem>
                <MenuItem value="Spike">Spike</MenuItem>
                <MenuItem value="Bug">Bug</MenuItem>
                <MenuItem value="Action Item">Action Item</MenuItem>
              </TextField>
                {(extractedData.epic_name || formValues.issueType === 'Epic') && <TextField
                  required
                  className="form-field-label"
                  label="Epic Name"
                  name="epic_name"
                  value={formValues.epic_name}
                  placeholder="Epic Name"
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />}
                <TextField
                  required
                  className="form-field-label"
                  label="Summary"
                  name="summary"
                  value={formValues.summary}
                  placeholder="Summary"
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  className="form-field-label"
                  label="Story Points"
                  name="story_points"
                  value={formValues.story_points}
                  placeholder="Story Points"
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  type="number"
                  inputProps={{ min: 1 }}
                />

                <FormControlLabel
                  control={
                    <CheckBox
                      checked={linkIssueChecked}
                      onChange={handleLinkIssueCheckboxChange}
                      color="primary"
                      sx={{
                        '&.Mui-checked': {
                        color: accentGreen,
                      },
                    }}
                    />
                  }
                  label="Do you want to link this issue with other issue?"
                  labelPlacement="start"
                  sx={{
                    '& .MuiFormControlLabel-label': {
                      fontSize: '1rem', 
                      fontWeight: 'bold', 
                      color: accentGreen, 
                      marginLeft: '-1rem',
                    },
                  }}
                />

                {linkIssueChecked === true && <TextField
                  required
                  className="form-field-label"
                  label="Existing Issue Number"
                  name="existing_issue_number"
                  value={formValues.existing_issue_number}
                  placeholder="Existing Issue Number"
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  sx={borderColor(accentGreen, accentGreen, accentGreen)}
                />}

                {linkIssueChecked === true && <TextField
                  select
                  required
                  className="form-field-label"
                  placeholder="Linking Type"
                  label="Linking Type"
                  name="linking_type"
                  value={formValues.linkingType}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  sx={borderColor(accentGreen, accentGreen, accentGreen)}
                >
                  {defaultLinkingTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </TextField>
                }

                <TextField
                  required
                  className="form-field-label"
                  label="Description"
                  name="description"
                  value={formValues.description}
                  placeholder="Description"
                  onChange={handleChange}
                  fullWidth
                  multiline
                  rows={4}
                  margin="normal"
                />{extractedData.acceptance_criteria && <TextField
                  required
                  className="form-field-label"
                  label="Acceptance Criteria"
                  name="acceptance_criteria"
                  value={formValues.acceptance_criteria}
                  placeholder="Acceptance Criteria"
                  onChange={handleChange}
                  fullWidth
                  multiline
                  rows={4}
                  margin="normal"
                />}
                {extractedData.code_suggestion && <TextField
                  className="form-field-label"
                  label="Code Suggestion"
                  name="code_suggestion"
                  value={formValues.code_suggestion}
                  placeholder="Code Suggestion"
                  onChange={handleChange}
                  fullWidth
                  multiline
                  rows={4}
                  margin="normal"
                />}
                  {extractedData.test_cases&&<TextField
                  className="form-field-label"
                  label="Test Cases"
                  name="test_cases"
                  value={formValues.test_cases}
                  placeholder="Test Cases"
                  onChange={handleChange}
                  fullWidth
                  multiline
                  rows={4}
                  margin="normal"
                />}
                 {extractedData.test_data&& <TextField
                  className="form-field-label"
                  label="Test Data"
                  name="test_data"
                  value={formValues.test_data}
                  placeholder="Test Data"
                  onChange={handleChange}
                  fullWidth
                  multiline
                  rows={4}
                  margin="normal"
                />}
                {extractedData.other_fields&&  <TextField
                  className="form-field-label"
                  label="Other Fields"
                  name="other_fields"
                  value={formValues.other_fields}
                  placeholder="Other Fields"
                  onChange={handleChange}
                  fullWidth
                  multiline
                  rows={4}
                  margin="normal"
                />}

              </Grid>
            </Grid>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions className="dialog-actions">
          {/* <Button type="submit">Submit</Button> */}
          <IconButton aria-label="cancel" onClick={handleClose}>
            <ClearIcon style={{ color: "red" }} fontSize="large" />
          </IconButton>
          <IconButton aria-label="create" type="submit" form="form-id">
            <CheckIcon
              style={{ color: colors.tertiary[400] }}
              fontSize="large"
            />
          </IconButton>
        </DialogActions>
      </form>
    </Dialog>
    <SnackbarAlert
    open={snackbarAlertOpen}
    onClose={handleCloseSnackbarAlert}
    severity={snackbarAlertSeverety}
    title={snackbarAlertTitle}
    autoHideDuration={10000}
    >
      {/* <Box>
        {issueLink ? <Link href={issueLink} target="_blank" rel="noopener">
        Go to ticket
      </Link>
      :
      "Somthing went wrong to create the ticket"
      
      }
      
      </Box> */}
    </SnackbarAlert>
    </>
  );
};

export default JiraModal;
