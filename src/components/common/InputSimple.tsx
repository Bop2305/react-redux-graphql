/**
 * props
 * style
 * icon
 */

import { BaseTextFieldProps, Input, InputBaseProps, TextField } from "@mui/material";
import { styled } from "@mui/styles";

type Props = {
  icon?: React.ReactNode;
  label: string;
  size?: string;
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
    // height: "40px",
    // border: "1px solid",
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
  ...props
}) => {
  return (
    <InputWrapper>
      <label className="label">{label}</label>
      <TextField className="input" size={size} fullWidth {...props} />
      <div className="iconWrapper">{icon}</div>
    </InputWrapper>
  );
};

export default InputSimple;
