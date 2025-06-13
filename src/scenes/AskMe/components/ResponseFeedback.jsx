import React, { useState } from "react";
import {
  IconButton,
  Tooltip,
  TextField,
  DialogContentText,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Dialog,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

import { addPredictionScore } from "../mutation";
import { HttpStatusCodes } from "../../../utils";
import SnackbarAlert from "../../../components/SnackbarAlert";

const ResponseFeedback = ({ correlationId }) => {
  const [feedbackType, setFeedbackType] = useState(null); // "up" or "down"
  const [open, setOpen] = useState(false);
  const [finalFeedbackType, setFinalFeedbackType] = useState(null);
  const [comment, setComment] = useState("");
  const [snackbarAlertOpen, setSnackbarAlertOpen] = useState(false);
  const [snackbarAlertSeverety, setSnackbarAlertSeverety] = useState("success");
  const [snackbarAlertTitle, setSnackbarAlertTitle] = useState("");

  const handleDialogClose = (event, reason) => {
    if (reason === "backdropClick" || reason === "escapeKeyDown") return;
    setOpen(false);
    setComment("");
  };

  const handleFeedbackClick = (type) => {
    if (type === finalFeedbackType) return;
    setFeedbackType(type);
    setOpen(true);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setFinalFeedbackType(feedbackType);
    setOpen(false);

    try {
      const { status } = await addPredictionScore({
        session_id: correlationId,
        value: feedbackType === "up" ? 1 : 0,
        comment,
      });

      setComment("");

      if (status === HttpStatusCodes.OK) {
        openSnackbarAlert("success", "Thank you for your feedback! It has been recorded.");
        return;
      }

      setFeedbackType(null);
      setFinalFeedbackType(null);
      openSnackbarAlert("error", "Failed to submit feedback. Please try again.");
    } catch (error) {
      console.error("Error submitting feedback:", error);
      openSnackbarAlert(
        "error",
        "Failed to submit feedback. Please try again."
      );
    }
  };

  const handleCloseSnackbarAlert = () => {
    setSnackbarAlertOpen(false);
  };

  const openSnackbarAlert = (severity, title) => {
    setSnackbarAlertSeverety(severity);
    setSnackbarAlertTitle(title);
    setSnackbarAlertOpen(true);
  };

  return (
    <div>
      <Tooltip title="Helpful" arrow>
        <IconButton
          color={finalFeedbackType === "up" ? "secondary" : "default"}
          sx={{ left: "-7px", position: "relative" }}
          onClick={() => handleFeedbackClick("up")}
          aria-label="Mark as helpful"
        >
          <ThumbUpIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Unhelpful" arrow>
        <IconButton
          color={finalFeedbackType === "down" ? "secondary" : "default"}
          onClick={() => handleFeedbackClick("down")}
          aria-label="Mark as unhelpful"
        >
          <ThumbDownIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleDialogClose}>
        <DialogTitle>
          <Typography variant="h6" fontWeight="bold">
            Enter your feedback (Optional)
          </Typography>
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent dividers>
            <DialogContentText>
              Help us improve by sharing your thoughts. Your feedback is
              valuable and will enhance the user experience.
            </DialogContentText>
            <TextField
              color="secondary"
              autoFocus
              multiline
              rows={4}
              margin="dense"
              id="userFeedback"
              name="userFeedback"
              label="Feedback"
              type="text"
              fullWidth
              value={comment}
              onChange={handleCommentChange}
            />
          </DialogContent>
          <DialogActions>
            <Button type="submit" color="secondary" variant="contained">
              Close
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <SnackbarAlert
        open={snackbarAlertOpen}
        onClose={handleCloseSnackbarAlert}
        severity={snackbarAlertSeverety}
        title={snackbarAlertTitle}
        autoHideDuration={10000}
      />
    </div>
  );
};

export default ResponseFeedback;
