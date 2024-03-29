import React, { memo } from "react";
import CustomTextField from "./CustomTextField";
import CustomPasswordField from "./CustomPasswordField";
import { useMemo } from "react";

const GenerateFormFields = memo((props) => {
  if (props.type === "password") {
    return <CustomPasswordField {...props} />;
  }
  return <CustomTextField {...props} />;
});

GenerateFormFields.displayName = "GenerateFormFields";

export default GenerateFormFields;
