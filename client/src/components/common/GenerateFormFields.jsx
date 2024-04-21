import React, { memo } from "react";
import CustomTextField from "./CustomTextField";
import CustomPasswordField from "./CustomPasswordField";
import CustomDropdown from "./CustomDropdown";
import CustomDatePicker from "./CustomDatePicker";
import CustomTextArea from "./CustomTextArea";
import CustomNumberField from "./CustomNumberField";

const GenerateFormFields = memo((props) => {
  if (props.type === "password") {
    return <CustomPasswordField {...props} />;
  }
  if (props.type === "dropdown") {
    return <CustomDropdown {...props} />;
  }
  if (props.type === "date") {
    return <CustomDatePicker {...props} />;
  }
  if (props.type === "textarea") {
    return <CustomTextArea {...props} />;
  }
  if (props.type === "number") {
    return <CustomNumberField {...props} />;
  }
  return <CustomTextField {...props} />;
});

GenerateFormFields.displayName = "GenerateFormFields";

export default GenerateFormFields;
