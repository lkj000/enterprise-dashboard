import React, { useRef, useEffect } from "react";
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";
import { Dialog, useTheme } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { tokens } from "../theme.js";


const Modal = ({ title, handleSubmit, isOpen, setModalOpen, children }) => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const descriptionElementRef = useRef(null);

  const handleClose = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [isOpen]);


  return (
    <Dialog
      open={isOpen}
      onClose={() => setModalOpen(false)}
      scroll={'paper'}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"

    >
      <DialogTitle id='scroll-dialog-title'>
        <Typography variant="h4" component="div" style={{ fontWeight: "bold" }}>
          {title}
        </Typography>
      </DialogTitle>
      <form onSubmit={handleSubmit} id="form-id">
        <DialogContent dividers={true} >
          <div
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {children}
          </div>
        </DialogContent>
        <DialogActions className="dialog-actions">
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
  );
};

export default Modal;