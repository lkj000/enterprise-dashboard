import { React, useEffect, useRef, useState } from "react";
import { Autocomplete, Box, Grid, TextField } from "@mui/material";
import Modal from "../Modal";
import SnackbarAlert from "../../components/SnackbarAlert";
import FirewallForm from "../../scenes/IntakeFormsNetwork/components/JiraModal/FirewallForm";
import { createJiraIssue } from "./ModalFunc";
import './styles.css';
import FileUploadButton from "../../components/FileUploadButton";
import FullScreenLoader from "../../components/FullScreenLoader";


const uploadingFileMessage = "Uploading files: ";
const creatingTicketMessage = "Creating ticket...";

const JiraModal = ({ extractData, compTypes = [], portfolioList = [], isOpen, setModalOpen, getJiraFields, isFirewallForm = false  }) => {

  const [formValues, setFormValues] = useState(extractData);
  const [rulesData, setRulesData] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("");
  const [alertTitle, setAlertTitle] = useState("");
  const uploadFileRef = useRef(null);
  const [backdropShown, setBackdropShown] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState(uploadingFileMessage);

  useEffect(() => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      ...extractData
    }));
  }, [extractData]);


  const handleSubmit = async (event) => {
    event.preventDefault();
    setProgress(undefined);
    setBackdropShown(true);
    setMessage(uploadingFileMessage);
    const result = await uploadFileRef.current.handleUpload();
    setProgress(undefined);
    setMessage(creatingTicketMessage);
    if (result.success) {   
      const inputData = getJiraFields(formValues, rulesData);
      if (result.fileNames.length) {
        const base64FileNames = btoa(unescape(encodeURIComponent(result.fileNames.join(","))));
        if (inputData['additional_fields']) {
          inputData['additional_fields'] += `, blobNames: ${base64FileNames}`;
        } else {
          inputData['additional_fields'] = `blobNames: ${base64FileNames}`;
        }
        inputData['additional_fields'] += `, blobEnv: ${result.environment}`;
      }
      await createJiraIssue(inputData, extractData, setFormValues, setRulesData, setModalOpen, setAlertOpen, setAlertSeverity, setAlertTitle);
    } else {
      setAlertSeverity("error");
      setAlertTitle("Error uploading files");
      setAlertOpen(true);
    }
    setBackdropShown(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value
    }));
  };

  const handleAlert = () => {
    setAlertOpen(false);
  };


  return (
    <>
      <Modal 
        title="Create JIRA Ticket"
        handleSubmit={handleSubmit}
        isOpen={isOpen}
        setModalOpen={setModalOpen}
      >
        <Box sx={{ maxHeight: 500, overflowY: 'auto' }}>
          <Grid container spacing={1}>
            <Grid item sx={{ width: '100%' }}>

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
                rows={12}
                className="form-field-label"
                label="Description"
                margin="normal"
                name="description"
                placeholder="Description"
                value={formValues.description}
                onChange={handleChange}
              />

              <FileUploadButton ref={uploadFileRef} setProgress={setProgress}/>

              {compTypes.length > 0 && (<Autocomplete
                multiple
                options={compTypes}
                value={formValues.componentType}
                onChange={(event, newValue) => handleChange({ target: { name: 'componentType', value: newValue } })}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required={params.InputProps.startAdornment === undefined}
                    fullWidth
                    label="Component/s"
                    margin="normal"
                    name="componentType"
                    variant="outlined"
                  />
                )}
                sx={{ width: '100%' }}
              />)}

              {portfolioList.length > 0 && (<Autocomplete
                options={portfolioList}
                value={formValues.portfolio}
                onChange={(event, newValue) => handleChange({ target: { name: 'portfolio', value: newValue } })}
                disableClearable
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    label="Portfolio"
                    margin="normal"
                    name="portfolio"
                    variant="outlined"
                  />
                )}
                sx={{ width: '50%' }}
              />)}

              {isFirewallForm && <FirewallForm setRulesData={setRulesData}/>}

            </Grid>
          </Grid>
        </Box>
      </Modal>


      <SnackbarAlert
        open={alertOpen}
        onClose={handleAlert}
        severity={alertSeverity}
        title={alertTitle}
        autoHideDuration={10000}
      />
      <FullScreenLoader open={backdropShown} progress={progress} message={message}/>
    </>
  );
};

export default JiraModal;