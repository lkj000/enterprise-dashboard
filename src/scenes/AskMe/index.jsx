import React, { useEffect, useState, useRef } from "react";
// API Call
import { chatLlmResponse, executeChatCommand } from "./mutation";
// Icons
import {
  Box,
  Divider,
  TextField,
  Grid,
  Paper,
  List,
  useTheme,
  Autocomplete,
  Tooltip
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import SettingsIcon from "@mui/icons-material/Settings";
import AttachFileIcon from "@mui/icons-material/AttachFile"; // Import the attachment icon
import IconButton from "@mui/material/IconButton";
import LinearProgress from "@mui/material/LinearProgress";
import axios from "axios";
import jira from "../../Assets/jira.png";
import ReactMarkdown from "react-markdown";
// Jira Modal
import JiraModal from "./components/JiraModal";

import SettingsModal from "./components/SettingsModal";

// Styles
import { tokens } from "../../theme";
import "./style.css";

// Header Component
import Header from "../../components/Header";
import ChatList from "./components/chatList";
// Show Message component to show the message
import { commands, promptPresets } from "./command-list";
import SnackbarAlert from "../../components/SnackbarAlert";

const Chat = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [jiraPath, setJira] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [banner, setBanner] = useState(null);
  const [jiraTicketModalOpen, setJiraTicketModalOpen] = useState(false);
  const [sendDisable, setSendDisable] = useState(false);
  const [jiraContent, setJiraContent] = useState({});
  const [svgDataUri, setSvgDataUri] = useState("");
  const [selectedCommand, setSelectedCommand] = useState(null);
  const [selectedPreset, setSelectedPreset] = useState(null);
  const [askmeSettings, setAskmeSettings] = useState({
    codeSuggestion: true,
    mermaidDiagram: true,
  });
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [projectKeys, setProjectKeys] = useState([]);

  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const boxRef = useRef(null);
  const handleJiraTicket = () => {
    setJiraTicketModalOpen(true);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("./svg/banner.svg", {
        "Content-Type": "application/xml; charset=utf-8",
      });
      setBanner(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handleClose = () => {
    setNotificationOpen(false);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() && selectedPreset == null) return;
    setMessages((prevMessages) => [
      ...prevMessages,
      { prompt: "yes", text: getMessageText(inputValue) },
    ]);
    setInputValue("");
    setLoading(true);

    try {
      setSendDisable(true);
      const command = checkAndParseCommand();
      if (command !== null) {
        executeCommand(command);
        cleanupTextBox();
        return;
      }
      const { preset, query } = checkAndExtractPreset();
      if (preset && preset.isFileRequired && !selectedFile) {
        setNotificationOpen(true);
        setErrorMessage("Please attach a file.");
        setLoading(false);
        cleanupTextBox();
        return;
      }
      const {data, correlationId} = await chatLlmResponse({
        summaryAdd: query,
        checkbox: false,
        askmeSettings,
        preset: preset?.action,
        file: selectedFile || null,
      });

      let formattedMessage = "";
      if (data.model === 'jira-prediction') {

        const { extractedData } = await jiraCreateTicket(
          data.response,
        );
        setJiraContent({ extractedData });
        setJira(true);
        formattedMessage = formateLLMResponseJira(extractedData);

      }
      else {
        setJira(false);
        formattedMessage = formatLLMResponse(data.response);
      }


      setLoading(false);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          prompt: "no",
          text: '\n' + formattedMessage,
          correlationId,
        },
      ]);
    } catch (error) {
      setSendDisable(false);
      setNotificationOpen(true);
      setLoading(false);
      setErrorMessage(error?.message);
      console.error("Error: ", error);
    }
    cleanupTextBox();
  };


  const cleanupTextBox = () => {
    setSendDisable(false);
    setSelectedCommand(null);
    setSelectedPreset(null);
    // Clear the selected file after sending the message
    if (selectedFile) {
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const getMessageText = (inputValue) => {
    let messageText = '';
    if (selectedCommand)
      messageText += "***`" + selectedCommand.command + "`*** \n\n";
    if (selectedPreset)
      messageText += "***`" + selectedPreset.preset + "`*** \n\n";
    messageText += inputValue;
    if (selectedFile) {
      messageText += `\n\n**Attachment:** ${selectedFile.name}`;
    }
    return (<ReactMarkdown>{messageText}</ReactMarkdown>);

  }

  const checkAndExtractPreset = () => {
    if (selectedPreset) {
      return { preset: selectedPreset, query: inputValue };
    }
    if (inputValue.startsWith('/')) {
      const presetName = inputValue.split(' ')[0];
      const preset = promptPresets.find(preset => preset.preset === presetName);
      if (preset) {
        return { preset: preset, query: inputValue.replace(`${presetName}`, '').trim() };
      }
    }
    return { preset: null, query: inputValue };
  }

  const checkAndParseCommand = () => {
    if (inputValue.startsWith('@')) {
      const commandName = inputValue.split(' ')[0];
      const command = commands.find(cmd => cmd.command === commandName);
      if (command) {
        return { commandAction: command.action, commandParams: inputValue.replace(`${commandName}`, '').trim() };
      }
    }
    else if (selectedCommand) {
      return { commandAction: selectedCommand.action, commandParams: inputValue };
    }
    return null;
  }

  const executeCommand = async (command) => {
    try {
      let responseMessage = '';
      const {data: response, correlationId } = await executeChatCommand(command);
      if (response && response.success) {
        responseMessage = formatLLMResponse(response.message);
      }
      else {
        responseMessage = `Error: ${response.message} \n ${response.data}`;
      }
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          prompt: "no",
          text: '\n' + responseMessage,
          correlationId,
        },
      ]);
      setLoading(false);
    } catch (error) {
      setSendDisable(false);
      setNotificationOpen(true);
      setLoading(false);
      console.error("Error: ", error);
    }
    setSendDisable(false);
    setSelectedCommand(null);

  };

  const handleCommandChange = (event, newValue) => {
    const matchedCommand = commands.find(cmd => cmd.command === newValue?.command);
    const matchedPreset = promptPresets.find(preset => preset.preset === newValue?.preset);
    if (matchedCommand) {
      setSelectedCommand(matchedCommand);
      setInputValue('');
    }
    else if (matchedPreset) {
      setSelectedPreset(matchedPreset);
      setInputValue('');
    }
  };

  const jiraCreateTicket = async (response) => {
    let extractedData = {};
    let json_data = JSON.parse(response);
    if (Array.isArray(json_data))
      json_data = json_data[0];

    const data = flattenObject(json_data);
    extractedData.summary = data.title || data.summary;
    extractedData.description = data.description;
    extractedData.acceptance_criteria = data.acceptance_criteria;
    extractedData.story_points = isNaN(Number(data.story_points)) ? '' : Number(data.story_points);
    extractedData.test_cases = data.test_cases;
    extractedData.test_data = data.test_data;
    extractedData.code_suggestion = data.code_suggestion;
    extractedData.other_fields = data.other_fields;
    return { extractedData };
  };

  const handleOpenSettingsModal = () => {
    setSettingsModalVisible(true);
  };

  const handleCloseSettingsModal = () => {
    setSettingsModalVisible(false);
  };

  const handleSaveSettings = (newSettings) => {
    setAskmeSettings(newSettings);
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileExtension = file.name.split('.').pop().toLowerCase();
      const allowedExtensions = ['pdf', 'docx', 'txt', 'md'];
      const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB

      if (!allowedExtensions.includes(fileExtension)) {
        setNotificationOpen(true);
        setErrorMessage("Only PDF, DOCX, TXT, and MD files are allowed.");
        return;
      }

      if (file.size > maxSizeInBytes) {
        setNotificationOpen(true);
        setErrorMessage("File size exceeds the limit of 5 MB.");
        return;
      }

      setSelectedFile(file);
    }
  };

  const handleAttachmentClick = () => {
    fileInputRef.current.click();
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    fileInputRef.current.value = "";
  };

  function flattenObject(obj) {
    const result = {};

    // Recursive helper function
    function flattenHelper(currentObj, parentKey = '') {
      for (let key in currentObj) {
        if (currentObj.hasOwnProperty(key)) {
          const newKey = parentKey ? `${parentKey}` : key;

          if (Array.isArray(currentObj[key])) {
            // Handle arrays by concatenating them into a string
            result[newKey] = currentObj[key]
              .map((item, index) => {
                if (typeof item === 'object') {
                  return `${index + 1}- ${Object.entries(item)
                    .map(([k, v]) => `${capitalizeFirstLetter(k)}: ${v}`)
                    .join(', \n')}`;
                } else {
                  return `${index + 1}- ${item}`;
                }
              })
              .join('\n\n ');
          } else if (typeof currentObj[key] === 'object' && currentObj[key] !== null) {
            // Handle nested objects
            result[newKey] = Object.entries(currentObj[key])
              .map(([k, v]) => `${capitalizeFirstLetter(k)}: ${v}`)
              .join('\n\n ');
          } else {
            // Handle primitive values (strings, numbers, etc.)
            result[newKey] = currentObj[key];
          }
        }
      }
    }
    flattenHelper(obj);
    return result;
  }
  function capitalizeFirstLetter(string) {
    return string.replace(/_/g, ' ').toLowerCase().replace(/^\w/, (c) => c.toUpperCase());
  }

  const formateLLMResponseJira = (extractedData) => {
    let jiraMessageParts = Object.keys(extractedData).map(key => {
      if (extractedData[key]) {
        const cleanedKey = key.replace(/_/g, ' ').toLowerCase().replace(/^\w/, (c) => c.toUpperCase());
        let value = extractedData[key];
        if (typeof value === 'object') {
          value = formateLLMResponseJira(value);
        }
        return `**${cleanedKey}:**\n ${value}`;
      }
      return null;
    }).filter(part => part !== null);

    if (jiraMessageParts.length === 0) {
      return "";
    }
    return formatLLMResponse(jiraMessageParts.join("\n\n"));
  };


  const formatLLMResponse = (data) => {
    // Making the links clickable
    let formattedText = data.replace(
      /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|\b(https?:\/\/[^\s)]+)\b/g,
      (match, text, url1, url2) => {
        const url = url1 || url2;  // Use url1 if it's a markdown link, otherwise use url2 (plain URL)
        const linkText = text || url;  // Use the markdown text if it exists, otherwise use the URL as the text
        return `[${linkText}](${url})`;
        //return `<a href="${url}" target="_blank" rel="noopener noreferrer">${linkText}</a>`;
      }
    );
    return formattedText;
  };


  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    fetchData()
    setSvgDataUri("data:image/svg+xml;base64," + btoa(banner));
  }, [messages, banner]);

  useEffect(() => {
    const savedSettings = JSON.parse(localStorage.getItem('askme-settings'));
    if (savedSettings) {
      setAskmeSettings(savedSettings);
    }

    // Loading project keys asynchronously
    Promise.all([
      import("../../data-json/sprint_project_keys.json"),
      import("../../data-json/kanban_project_keys.json"),
    ])
      .then(([sprintProjectKeys, kanbanProjectKeys]) => {
        const combinedProjectKeys = new Set([...sprintProjectKeys.default, ...kanbanProjectKeys.default]);
        setProjectKeys([...combinedProjectKeys].sort());
      })
      .catch(error => console.error("Error loading project keys:", error));

  }, []);


  return (
    <Box m="20px" container className="main-box">
      {/* HEADER */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,

            backgroundImage: `url("${svgDataUri}")`,
            backgroundSize: "full",
            backgroundPosition: "left",
            backgroundRepeat: "no-repeat",
            zIndex: -1,
          },
        }}
      >
        <Header title="Ask Me" subtitle="Ada" />
      </Box>
      {/*  Notification Snackbar */}
      <SnackbarAlert
        open={notificationOpen}
        onClose={handleClose}
        severity="error"
        title={errorMessage || "Something went wrong. Please try again."}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      />
      <Box
        marginBottom="2px"
        sx={{
          backgroundColor: colors.primary[400],
          width: "100%",
          height: "calc(100vh - 120px)",
        }}
        className="inner-box"
      >
        <Grid container component={Paper} className="grid-main" >
          <Grid item xs={10} style={{ width: "100%", flexBasis: '100%', maxWidth: 'none' }} >
            <Box display="flex" flexDirection="column" width="100%" maxWidth="100%" margin="auto">
              <Box style={{ height: 'calc(100vh - 284px)', overflowY: 'auto', scrollbarWidth: 'none' }} ref={boxRef}>
                <List className="ul-list" style={{ margin: '0 auto', width: '70%' }}>
                  {messages.length === 0 ? (
                    <Box className="centered-box">
                      <p>No Chat History</p>
                    </Box>
                  ) : (
                    <Box >
                      <ChatList
                        messagesEndRef={messagesEndRef}
                        boxRef={boxRef}
                        Messages={messages}
                        setSendDisable={setSendDisable}
                        colors={colors} />
                    </Box>
                  )}
                </List>
              </Box>
            </Box>
            {/* LOADING */}
            {loading ? (
              <LinearProgress
                className="test-bil"
                sx={{ backgroundColor: colors.tertiary[600] }}
              />
            ) : null}
            <Divider />
            {messages.length !== 0 ? (
              // Jira Code
              <></>
            ) : null}
            <Grid container style={{ padding: "10px 0px", alignItems: "center" }}>
              <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {jiraPath === true ? (
                  <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                    <img
                      className="jira-img"
                      src={jira}
                      alt="jira"
                      width="60px"
                      onClick={() => handleJiraTicket()}
                      style={{ cursor: 'pointer' }}
                    />
                    <JiraModal
                      jiraContent={jiraContent}
                      projectKeys={projectKeys}
                      isOpen={jiraTicketModalOpen}
                      setModalOpen={setJiraTicketModalOpen}
                    />
                  </div>
                ) : null}
              </Grid>
              <Grid item xs={9} className="grid-text-field">
                <Box sx={{ position: 'relative' }}>
                  <Autocomplete
                    freeSolo
                    disableClearable={true} // Disable the default clear button
                    options={inputValue.startsWith('@') ? commands : inputValue.startsWith('/') ? promptPresets : []}
                    getOptionLabel={(option) => option.command || option.preset || ""}
                    onChange={handleCommandChange}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue, reason) => {
                      // Don't clear inputValue when focus is lost or when blur happens
                      if (reason !== 'reset' && reason !== 'blur') {
                        setInputValue(newInputValue);
                      }
                      // If we're clearing a preset selection, ensure the dropdown is reset properly
                      if (selectedPreset && newInputValue === '') {
                        setSelectedPreset(null);
                      }
                    }}
                    autoHighlight
                    autoSelect
                    disabled={sendDisable}
                    // Prevent the input from being cleared on blur
                    blurOnSelect={false}
                    clearOnBlur={false}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        id="input-field"
                        className="input-field-label"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '&.Mui-focused fieldset': {
                              borderColor: colors.primary[100],
                            },
                            paddingBottom: '40px', // Add space at bottom for buttons
                          },
                          '& .MuiInputBase-inputMultiline': {
                            display: 'inline', // Ensure text and chips are inline
                          }
                        }}
                        placeholder={selectedCommand ? selectedCommand.description : 'Type Something'}
                        fullWidth
                        multiline
                        rows={2}
                        // Remove the onChange handler here - use onInputChange from Autocomplete instead
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && e.shiftKey) {
                            // Allow Shift+Enter for new line
                            e.preventDefault();
                            setInputValue(inputValue + '\n');
                            return;
                          }
                          if (!sendDisable && e.key === "Enter" && !params.inputProps['aria-expanded']) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                          else if (e.key === "Backspace" && inputValue === '') {
                            setSelectedCommand(null);
                            setSelectedPreset(null);
                          }
                        }}
                        InputProps={{
                          ...params.InputProps,
                          startAdornment: (
                            <>
                              {selectedCommand && selectedCommand.command ? (
                                <span
                                  className="grid-text-chip"
                                  style={{
                                    backgroundColor: colors.greenAccent[700],
                                    color: colors.grey[100],
                                  }}
                                  onClick={() => setSelectedCommand(null)}
                                >
                                  {selectedCommand.command} <span style={{ fontSize: '0.9em', marginLeft: '2px' }}>×</span>
                                </span>
                              ) : null}
                              {selectedPreset && selectedPreset.preset ? (
                                <span
                                  className="grid-text-chip"
                                  style={{
                                    backgroundColor: colors.blueAccent[600],
                                    color: colors.grey[100],
                                  }}
                                  onClick={() => setSelectedPreset(null)}
                                >
                                  {selectedPreset.preset} <span style={{ fontSize: '0.9em', marginLeft: '2px' }}>×</span>
                                </span>
                              ) : null}
                            </>
                          ),
                        }}
                      />
                    )}
                  />

                  {/* File attachment chip at bottom left */}
                  {selectedFile && (
                    <Box sx={{
                      position: 'absolute',
                      bottom: '8px',
                      left: '8px',
                      zIndex: 1
                    }}>
                      <span
                        style={{
                          display: 'inline-block',
                          padding: '2px 5px',
                          backgroundColor: colors.primary[100],
                          color: theme.palette.getContrastText(colors.primary[100]),
                          borderRadius: '4px',
                          fontSize: '0.85em',
                          cursor: 'pointer'
                        }}
                        onClick={handleRemoveFile}
                      >
                        📎 {selectedFile.name} <span style={{ fontSize: '0.9em', marginLeft: '2px' }}>×</span>
                      </span>
                    </Box>
                  )}

                  {/* Buttons positioned at bottom right */}
                  <Box sx={{
                    position: 'absolute',
                    bottom: '8px',
                    right: '8px',
                    display: 'flex',
                    gap: '4px'
                  }}>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileSelect}
                      style={{ display: 'none' }}
                      accept=".pdf,.docx,.txt,.md"
                    />
                    <Tooltip title="Attach File (.pdf, .docx, .txt, .md - max 5 MB)" placement="top" arrow>
                      <IconButton
                        disabled={sendDisable}
                        onClick={handleAttachmentClick}
                        size="small"
                      >
                        <AttachFileIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <IconButton
                      disabled={sendDisable}
                      onClick={handleSendMessage}
                      size="small"
                    >
                      <SendIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              </Grid>

              {/* <Grid item xs={2} className="switch-center">
                <Checkbox
                  checked={checkbox}
                  color="success"
                  onChange={(e) => {
                    setCheckbox(e.target.checked);
                  }}
                  defaultChecked
                  sx={{
                    "& .MuiSvgIcon-root": { fontSize: 28 },
                  }}
                />
                <FormControlLabel
                  className="switch-label-2"
                  control={<span />}
                  labelPlacement="end"
                  label="DevOps/Developer"
                />
              </Grid> */}
              <Grid item xs={1} className="settings-icon">
                <Tooltip title="Settings" placement="top" arrow>
                  <IconButton
                    size="large"
                    sx={{ color: colors.primary[100] }}
                    onClick={handleOpenSettingsModal}
                  >
                    <SettingsIcon fontSize="inherit" />
                  </IconButton>
                </Tooltip>
                <SettingsModal
                  visible={settingsModalVisible}
                  onClose={handleCloseSettingsModal}
                  onSave={handleSaveSettings}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default React.memo(Chat);
