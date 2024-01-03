import { Alert, Snackbar } from "@mui/material";
import React from "react";
import ErrorAlert from "./ErrorAlert";

const ErrorSnackbar = (props) => {
  const { open, onClose, message, severity, style } = props;
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      style={{...style}}
    >
      <ErrorAlert message={message} onClose={onClose} severity={severity} style={{my:0}}/>
    </Snackbar>
  );
};

export default ErrorSnackbar;

