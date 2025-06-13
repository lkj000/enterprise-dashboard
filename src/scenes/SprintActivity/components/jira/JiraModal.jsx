import { React, useEffect, useState } from "react";
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Grid, MenuItem, TextField, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import SnackbarAlert from "../../../../components/SnackbarAlert";
import { createJiraIssue, IssueTypes, getJiraFields } from "./ModalFunc";


const JiraModal = ({ extractData, isOpen, setModalOpen, colors }) => {

  const [formValues, setFormValues] = useState(extractData);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("");
  const [alertTitle, setAlertTitle] = useState("");


  useEffect(() => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      ...extractData
    }));
  }, [extractData]);


  const handleSubmit = (event) => {
    event.preventDefault();
    const inputData = getJiraFields(formValues);
    createJiraIssue(inputData, extractData, setFormValues, setModalOpen, setAlertOpen, setAlertSeverity, setAlertTitle);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value
    }));
  };

  const handleClose = () => {
    setModalOpen(false);
    setFormValues(extractData);
  };

  const handleAlert = () => {
    setAlertOpen(false);
  };


  return (
    <Box>
      <Dialog
        open={isOpen}
        onClose={() => {
          setModalOpen(false);
          setFormValues(extractData);
        }}
        scroll={'paper'}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id='scroll-dialog-title'>
          <Typography variant="h4" style={{ fontWeight: "bold" }}>
            Create JIRA Ticket
          </Typography>
        </DialogTitle>

        <form onSubmit={handleSubmit} id="form-id">
          <DialogContent dividers={true} >
              <Grid container spacing={1}>
                <Grid item sx={{ maxHeight:500, overflowY: 'auto' }}>

                  <TextField
                    fullWidth
                    required
                    select
                    className="form-field-label"
                    label="Project"
                    margin="normal"
                    name="project"
                    placeholder="Project"
                    value={formValues.project}
                    onChange={handleChange}
                  >
                    <MenuItem value={extractData.project}> {extractData.project} </MenuItem>
                  </TextField>

                  <TextField
                    fullWidth
                    required
                    select
                    className="form-field-label"
                    label="Issue Type"
                    margin="normal"
                    name="issueType"
                    placeholder="Issue Type"
                    value={formValues.issueType}
                    onChange={handleChange}
                  >
                    {IssueTypes.map((key) => (
                      <MenuItem value={key}> {key} </MenuItem>
                    ))}
                  </TextField>

                  {formValues.issueType === 'Epic' && <TextField
                    fullWidth
                    required
                    className="form-field-label"
                    label="Epic Name"
                    margin="normal"
                    name="epic_name"
                    placeholder="Epic Name"
                    value={formValues.epic_name}
                    onChange={handleChange}
                  />}

                  <TextField
                    fullWidth
                    required
                    className="form-field-label"
                    label="Summary"
                    margin="normal"
                    name="summary"
                    placeholder="Summary"
                    value={formValues.summary}
                    onChange={handleChange}
                  />

                  <TextField
                    fullWidth
                    multiline
                    required
                    rows={4}
                    className="form-field-label"
                    label="Description"
                    margin="normal"
                    name="description"
                    placeholder="Description"
                    value={formValues.description}
                    onChange={handleChange}
                  />

                </Grid>
              </Grid>
          </DialogContent>

          <DialogActions className="dialog-actions">
            <IconButton aria-label="cancel" onClick={handleClose}>
              <ClearIcon style={{ color: "red" }} fontSize="large" />
            </IconButton>
            <IconButton aria-label="create" type="submit" form="form-id">
              <CheckIcon style={{ color: colors.tertiary[400] }} fontSize="large" />
            </IconButton>
          </DialogActions>
        </form>
      </Dialog>

      <SnackbarAlert
        open={alertOpen}
        onClose={handleAlert}
        severity={alertSeverity}
        title={alertTitle}
        autoHideDuration={10000}
      />
    </Box>
  );
};

export default JiraModal;