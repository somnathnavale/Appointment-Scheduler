import { Alert } from "@mui/material";
import React, { forwardRef } from "react";

const ErrorAlert = forwardRef((props, ref) => {
  const { onClose, message, severity, style } = props;
  return (
    <Alert
      ref={ref}
      severity={severity ? severity : "error"}
      onClose={onClose}
      variant="standard"
      sx={{ ...style }}
    >
      {message}
    </Alert>
  );
});

ErrorAlert.displayName = "ErrorAlert";

export default ErrorAlert;
