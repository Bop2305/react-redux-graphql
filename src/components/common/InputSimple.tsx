/**
 * props
 * style
 * icon
 */

import { BaseTextFieldProps, Input, InputBaseProps, TextField } from "@mui/material";
import { styled } from "@mui/styles";
import { ErrorOption, RegisterOptions } from "react-hook-form";

type Props = {
  icon?: React.ReactNode;
  label: string;
  size?: string;
  register?: RegisterOptions;
  errors?: Record<string, ErrorOption>;
} & BaseTextFieldProps;

const InputWrapper = styled("div")({
  position: "relative",
  "& .label": {
    position: "absolute",
    top: "-15px",
    left: "5px",
    background: "white",
    zIndex: 10,
  },
  "& .input": {
    borderRadius: "5px",
  },
  "& .iconWrapper": {
    position: "absolute",
    top: "50%",
    right: "20px",
    transform: "translate(50%,-50%)",
  },
});

const InputSimple: React.FC<Props> = ({
  icon,
  label,
  size = "small",
  register,
  errors,
  ...props
}) => {
  return (
    <InputWrapper>
      <label className="label">{label}</label>
      <TextField className="input" size={size} fullWidth variant="outlined" {...props} />
      <div className="iconWrapper">{icon}</div>
    </InputWrapper>
  );
};

export default InputSimple;
