import { Snackbar } from "@mui/material";
import React, { memo } from "react";
import ErrorAlert from "./ErrorAlert";

const styles = {
  alertStyle: { my: 0 },
};

const ErrorSnackbar = memo((props) => {
  const { open, onClose, message, severity, style } = props;

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      style={{ ...style }}
    >
      <ErrorAlert
        message={message}
        onClose={onClose}
        severity={severity}
        style={styles.alertStyle}
      />
    </Snackbar>
  );
});

ErrorSnackbar.displayName = "ErrorSnackbar";

export default ErrorSnackbar;
