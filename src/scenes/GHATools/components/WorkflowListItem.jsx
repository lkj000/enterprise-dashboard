import {React, useState} from "react";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import CheckBox  from "@mui/material/Checkbox";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Divider from '@mui/material/Divider';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import InfoIcon from '@mui/icons-material/Info';
import GitHubIcon from '@mui/icons-material/GitHub';
import CopyIcon from '@mui/icons-material/ContentCopy';
import { useTheme } from '@mui/material/styles';
import { tokens } from "../../../theme";
import EditableDropdown from "./EditableDropdown";
import workflow_input from "../data/auto_generated_workflow_inputs.json"
import { callExpressServerEndpoint, getToken } from "../../../utils.js";
import { Button, CircularProgress } from "@mui/material";

const WorkflowListItem = ({ selectedText, actionIcon: ActionIcon, listItemText, githubUrl, wikiUrl, workflowData }) => {

    const theme = useTheme();
    const mode = theme.palette.mode;
    const tertiary = tokens(theme.palette.mode).tertiary[600];

    const [popupOpen, setPopupOpen] = useState(false);
    const [commonSelectValues, setCommonSelectValues] = useState({});
    const [commonCheckedValues, setCommonCheckedValues] = useState({});
    const [notificationOpen, setNotificationOpen] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("");
    const [notificationSeverity, setNotificationSeverity] = useState("success");
    const [editableDropdownValues, setEditableDropdownValues] = useState({});
    const [executionButtonDisabled, setExecutionButtonDisabled] = useState(false);

    // There should only be one workflow with the same name
    const selectedWorkflowList = workflow_input.filter(item => item.name.toLocaleLowerCase() === listItemText.toLocaleLowerCase());

    const handlePopupOpen = (event) => {
        event.stopPropagation();
        // Reset all Select and checkbox values beofre opening the popup
        setCommonSelectValues({});
        setCommonCheckedValues({});
        setEditableDropdownValues({});
        setPopupOpen(true);
    };
    
      const handlePopupClose = () => {
        setPopupOpen(false);
    };

      const handleNotificationClose = () => {
        setNotificationOpen(false);
    };

    const handleCommonDropdownChange = (event) => {
        const{ name, value} = event.target;
        setCommonSelectValues((prevValues) => ({
            ...prevValues,
            [name]: value
          }));
    };

    const handleCommonCheckboxChange = (event) => {
        setCommonCheckedValues((prevValues) => ({
            ...prevValues,
            [event.target.name]: event.target.checked
          }));
    };

    const handleCommonEditableDropdownValues = (name, value) => {
        editableDropdownValues[name] = value;
    }

    const openUrl = (url, event) => {
        event.stopPropagation();
        window.open(url, '_blank');
    };

    const handleCopyURL = async (item, event) => {
        event.stopPropagation();
        try {
            const host = window.location.origin;
            const urlPath = window.location.pathname;
            const paramsObj = new URLSearchParams({
                mainTab: item.mainTab,
                title: item.title,
                index: item.subIndex,
                text: item.text
            });
            const params = `?${paramsObj.toString()}`;
            const url = `${host}${urlPath}${params}`;
            await navigator.clipboard.writeText(url);
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };

    const triggerWorkflow = (event) => {
        event.preventDefault();

        const branch = 'master';
        const selectedWorkflow = selectedWorkflowList[0];

        // Get form data
        const formData = new FormData(event.target);
        for (const key in editableDropdownValues) {
            formData.append(key, editableDropdownValues[key]);
        }

        const inputFields = {};

        // Populate input fields
        selectedWorkflow.input
        .forEach((inputField) => {

            // Skip optional fields that are empty
            if(!inputField.required && (formData.get(inputField.name) === "" || formData.get(inputField.name) === null)) {
                return;
            }

            if(inputField.type === "boolean") {
                inputFields[inputField.name] = formData.get(inputField.name) === "on";
            }
            else {
                inputFields[inputField.name] = formData.get(inputField.name);
            }
        });

        const workflowId = selectedWorkflow.workflow_file;
        const payload = {};
        // Branch name will always be master
        payload['ref'] = branch;
        payload['inputs'] = inputFields;

        const body = {
            repoName: 'esgh-self-service',
            workflowId: workflowId,
            payload: payload
        }

        const setStateAfterGettingResponse = response => {
            if (response.status === 204) {
                setNotificationSeverity("success");
                setNotificationMessage("Your inputs are recieved. You will recieve status email.");
                setNotificationOpen(true);
                setPopupOpen(false);
                setTimeout(() => {
                    setExecutionButtonDisabled(false);
                }, 15 * 1000);
            } else {
                setNotificationSeverity("error");
                setNotificationMessage("Error triggering workflow");
                setNotificationOpen(true);
                setPopupOpen(false);
                setExecutionButtonDisabled(false);
                console.error(response);
            }
        };
        setExecutionButtonDisabled(true);
        getToken()
        .then((token) => {
            body.payload.inputs['USERID'] = token;
            callExpressServerEndpoint('POST', 'triggerWorkflow', body, setStateAfterGettingResponse, undefined, (e, cb) => {
                setStateAfterGettingResponse(e);
                if (e.message !== 'timeout of 3000ms exceeded' && e.message !== 'Network Error') {
                    cb(e);
                }
            }, { timeout: 3000 }); 
        });       
    }
      
    return(
        <>
            <Dialog open={popupOpen} 
            onClose={handlePopupClose}
            PaperProps={{
                style: {
                  width: '700px',
                  maxWidth: 'none',
                }
              }}>
                <DialogTitle variant="h3" style={{ textAlign: 'center' }}>{listItemText}</DialogTitle>
                <DialogContent>
                {selectedWorkflowList
                    .map((item, index) => (
                        <div key={index + item.workflow_file}>
                            <form onSubmit={triggerWorkflow}>
                            {item.input.filter(inputField => inputField.name.toLocaleLowerCase() !== 'userid').map((inputField, index) => (
                                <div key={index + item.workflow_file + inputField.name}>
                                    <Typography variant="h6" component="div" style={{ marginBottom: 6 }}>
                                        {inputField.description != null ? inputField.description : inputField.name}
                                    </Typography>

                                    {
                                    
                                    (inputField.type === "string" || inputField.type == null || inputField.type === "number") ?
                                        
                                        (inputField.default && inputField.default.toString().split(',').length > 1) ?
                                        
                                            (
                                                <EditableDropdown 
                                                    name={inputField.name} 
                                                    options={inputField.default.split(',')}
                                                    setStateToParent={handleCommonEditableDropdownValues}> 
                                                </EditableDropdown>
                                            )

                                        :

                                            (
                                                <TextField
                                                    name={inputField.name}
                                                    variant="outlined"
                                                    label={inputField.required ? "Required" : "Optional"}
                                                    style={{ marginBottom: 8 }}
                                                    defaultValue={inputField.default}
                                                    required={inputField.required}
                                                    sx={{
                                                        '& .MuiInputLabel-root': {
                                                            '&.Mui-focused': {
                                                              color: tertiary,
                                                              fontWeight: 'bold',
                                                            },
                                                          },
                                                      }}
                                                    fullWidth
                                                >
                                                </TextField>
                                            )

                                    : inputField.type === "choice" ?
                                        
                                        (
                                            <Select
                                                name={inputField.name}
                                                value={commonSelectValues[inputField.name]}
                                                label={inputField.required ? "Required" : "Optional"}
                                                labelId={inputField.name}
                                                required={inputField.required}
                                                onChange={handleCommonDropdownChange}
                                                style={{ marginBottom: 8 }}
                                                fullWidth
                                            >
                                                {inputField.options.map((option) => (
                                                <MenuItem key={option} value={option}>
                                                    {option}
                                                </MenuItem>
                                                ))}
                                            </Select>
                                        )

                                    : inputField.type === "boolean" ?

                                        (
                                            <CheckBox
                                                name={inputField.name}
                                                checked={commonCheckedValues[inputField.name] ? commonCheckedValues[inputField.name] : false}
                                                onChange={handleCommonCheckboxChange}
                                                color="primary"
                                                sx={{
                                                    marginRight: 8,
                                                    color: commonCheckedValues[inputField.name] ? tertiary : 'default',
                                                    '&.Mui-checked': {
                                                      color: tertiary,
                                                    },
                                                  }}
                                            />
                                        )

                                    :

                                    null
                                    
                                    }
                                </div>
                                ))}

                                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Tooltip title="Start Workflow" arrow>
                                        <IconButton
                                            type="submit"
                                            size="large"
                                            edge="end"
                                            disabled={executionButtonDisabled}
                                            style={{ marginTop: '15px', color: tertiary }}
                                        >
                                            <PlayCircleOutlineIcon style={{fontSize: 50, color: executionButtonDisabled ? "grey": tertiary}} />
                                        </IconButton>
                                    </Tooltip>
                                </Box>

                            </form>
                        
                        </div>
                    ))}

                </DialogContent>
            </Dialog>
            <ListItemButton disableRipple
                style={{ backgroundColor: selectedText === listItemText ? 
                  mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(4, 5, 9, 0.08)' : null ,
                  border: selectedText === listItemText ? `2px solid ${tertiary}` : null,
                  cursor: 'default'
                }}
            >
                <ListItemIcon>
                    <Tooltip title="Wiki" arrow>
                        <IconButton edge="end" onClick={(e) => openUrl(wikiUrl, e)}>
                            <InfoIcon />
                        </IconButton>
                    </Tooltip> 
                </ListItemIcon>
                <ListItemIcon sx={{ marginLeft: "-10px" }}>
                    <Tooltip title="History" arrow>
                        <IconButton edge="end" onClick={(e) => openUrl(githubUrl, e)}>
                            <GitHubIcon />
                        </IconButton>
                    </Tooltip> 
                </ListItemIcon>
                <ListItemText primary={listItemText} />
                <ListItemIcon>
                    <Tooltip title="Copy URL" arrow>
                        <IconButton edge="end" onClick={(e) => handleCopyURL(workflowData.find(item => item.text === listItemText), e)}>
                            <CopyIcon sx={{ color: tertiary }} />
                        </IconButton>
                    </Tooltip> 
                </ListItemIcon>
                <div>
                {selectedWorkflowList.length > 0 && process.env.REACT_APP_RUN_WORKFLOW_ENABLED === 'true' ? 
                    <Tooltip title="Start workflow here" arrow>
                        {
                            executionButtonDisabled ? 
                            <Button disabled variant={mode === 'light' ? 'outlined': 'contained'} sx={{paddingLeft: "32.5px", paddingRight: "32.5px"}}>
                                <CircularProgress size="1.3rem" sx={{color: tertiary}} />
                            </Button>
                            : 
                            <Button variant={mode === 'light' ? 'outlined': 'contained'} style={{color: tertiary}} endIcon={<PlayCircleOutlineIcon />} onClick={(e) => handlePopupOpen(e)}>
                            Start
                        </Button>
                        }
                    </Tooltip>
                :
                    <Button variant="contained" style={{color: tertiary}} endIcon={<PlayCircleOutlineIcon />} disabled>
                        Start
                    </Button>
                }
                </div>
                
            </ListItemButton>
            <Divider variant="fullWidth" component="li" />
            <Snackbar
                open={notificationOpen}
                autoHideDuration={5000}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                onClose={handleNotificationClose}
            >
                <Alert
                onClose={handleNotificationClose}
                severity={notificationSeverity}
                variant="filled"
                sx={{ width: "100%" }}
                >
                {notificationMessage}
                </Alert>
            </Snackbar>
        </>
    );
}

export default WorkflowListItem;
