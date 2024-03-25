import React from "react";
import CustomTextField from "./CustomTextField";
import CustomPasswordField from "./CustomPasswordField";

const GenerateFormFields = (props) => {
  if (props.type === "password") {
    return <CustomPasswordField {...props} />;
  }
  return <CustomTextField {...props} />;
};

export default GenerateFormFields;
