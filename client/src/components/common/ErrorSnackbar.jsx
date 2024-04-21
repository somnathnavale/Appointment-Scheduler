import { Alert, Snackbar } from "@mui/material";
import React, { memo } from "react";

const ErrorSnackbar = memo((props) => {
  let { open, onClose, message, severity, variant, position, style, delay } =
    props;
  return (
    <Snackbar
      open={open}
      autoHideDuration={delay || 5000}
      onClose={onClose}
      anchorOrigin={{
        vertical: position?.y || "top",
        horizontal: position?.x || "center",
      }}
      sx={{ ...style }}
    >
      {open && message?.length ? (
        <Alert
          onClose={onClose}
          severity={severity}
          variant={variant || "standard"}
          sx={{ width: "100%", my: 0, fontSize: "16px" }}
        >
          {message}
        </Alert>
      ) : (
        <p></p>
      )}
    </Snackbar>
  );
});

ErrorSnackbar.displayName = "ErrorSnackbar";

export default ErrorSnackbar;
