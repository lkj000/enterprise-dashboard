import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Modal,
  Box,
  MenuItem,
  Chip,
  Stack,
} from "@mui/material";
import { callExpressServerEndpoint } from "../../../utils.js";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../../theme";
import navigationData from "../data/sidebar-navigation.json";

const FeedbackModal = ({
  open,
  setOpen,
  setAlertOpen,
  setAlertMessage,
  setAlertSeverity,
}) => {
  const {
    palette: { mode },
  } = useTheme();
  const colors = tokens(mode);
  const isDarkMode = mode === "dark";
  const [feedback, setFeedback] = useState({
    sidebarSection: "",
    screenUnderSection: "",
    improvementAreas: [],
    details: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "screenUnderSection") {
      const parentSidebarSection = Object.keys(navigationData).find(
        (sidebarSection) => navigationData[sidebarSection].includes(value)
      );
      setFeedback({
        ...feedback,
        sidebarSection: parentSidebarSection || feedback.sidebarSection,
        screenUnderSection: value,
      });
    } else {
      setFeedback({
        ...feedback,
        [name]: value,
        ...(name === "sidebarSection" && { screenUnderSection: "" }),
      });
    }
  };

  const handleImprovementToggle = (area) => {
    if (!feedback.screenUnderSection) return;
    setFeedback((prev) => {
      const improvementAreas = prev.improvementAreas.includes(area)
        ? prev.improvementAreas.filter((a) => a !== area)
        : [...prev.improvementAreas, area];
      return { ...prev, improvementAreas };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    callExpressServerEndpoint(
      "POST",
      "feedback",
      feedback,
      feedbackSubmitResponse
    );
    setFeedback({
      details: "",
      sidebarSection: "",
      screenUnderSection: "",
      improvementAreas: [],
    });
    setOpen(false);
  };

  const feedbackSubmitResponse = (response) => {
    setAlertMessage(
      response.status === 200
        ? "Feedback submitted successfully"
        : "Feedback submission failed"
    );
    setAlertSeverity(response.status === 200 ? "success" : "error");
    setAlertOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
    setFeedback({
      details: "",
      sidebarSection: "",
      screenUnderSection: "",
      improvementAreas: [],
    });
  };

  const improvementAreas = ["Look and feel", "UI", "Data", "Charts", "Tables"];

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          backgroundColor: colors.primary[400],
        }}
      >
        <Typography variant="h4" gutterBottom>
          Submit Your Feedback
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            select
            fullWidth
            label="Select Sidebar Section"
            name="sidebarSection"
            value={feedback.sidebarSection}
            onChange={handleChange}
            margin="normal"
            sx={{
              "& .MuiOutlinedInput-root": {
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: isDarkMode ? "white" : colors.tertiary[600],
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: colors.tertiary[600],
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: colors.tertiary[600],
              },
            }}
          >
            {Object.keys(navigationData).map((key) => (
              <MenuItem key={key} value={key}>
                {key}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            fullWidth
            label="Select Screen Under Section"
            name="screenUnderSection"
            value={feedback.screenUnderSection}
            onChange={handleChange}
            margin="normal"
            disabled={!feedback.sidebarSection}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: isDarkMode ? "white" : colors.tertiary[600],
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: colors.tertiary[600],
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: colors.tertiary[600],
              },
            }}
          >
            {(navigationData[feedback.sidebarSection] || []).map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </TextField>

          <Typography variant="h6" sx={{ mt: 2 }}>
            Which areas need improvements?
          </Typography>
          <Stack
            direction="row"
            spacing={1}
            sx={{ mt: 1, mb: 2, flexWrap: "wrap" }}
          >
            {improvementAreas.map((area) => (
              <Chip
                key={area}
                label={area}
                onClick={() => handleImprovementToggle(area)}
                sx={{
                  backgroundColor: feedback.improvementAreas.includes(area)
                    ? colors.tertiary[600]
                    : isDarkMode
                    ? "#ffffff29"
                    : "#e9e9e9",
                  ":hover": {
                    backgroundColor: feedback.improvementAreas.includes(area)
                      ? colors.tertiary[600]
                      : isDarkMode
                      ? "#ffffff29"
                      : "#c8c8c8",
                  },
                }}
                clickable={Boolean(feedback.screenUnderSection)}
                disabled={!feedback.screenUnderSection}
              />
            ))}
          </Stack>

          <TextField
            fullWidth
            label="Feedback Details"
            name="details"
            value={feedback.details}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={4}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: isDarkMode ? "white" : colors.tertiary[600],
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: colors.tertiary[600],
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: colors.tertiary[600],
              },
            }}
          />

          <Button
            type="submit"
            fullWidth
            sx={{
              mt: 2,
              backgroundColor: colors.tertiary[600],
              "&:hover": { backgroundColor: colors.tertiary[600] },
            }}
          >
            Submit Feedback
          </Button>
        </form>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button
            onClick={handleModalClose}
            sx={{ color: colors.tertiary[600] }}
          >
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default FeedbackModal;
