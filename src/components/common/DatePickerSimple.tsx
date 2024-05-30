import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker, DatePickerProps } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";
import { BaseTextFieldProps, TextField } from "@mui/material";
import styled from "@emotion/styled";
import { FieldErrors, RegisterOptions } from "react-hook-form";

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
});

type Props = {
  label: string;
  register?: RegisterOptions;
  errors?: Record<string, FieldErrors>;
  options?: any;
  variant?: any;
  helperText?: any;
  size?: "small" | "medium";
} & Partial<DatePickerProps<Dayjs, Dayjs>>;

const DatePickerSimple: React.FC<Props> = ({
  label,
  register,
  errors,
  options,
  helperText,
  variant = "outline",
  size = "small",
  ...props
}) => {
  const [value, setValue] = React.useState(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        value={value}
        onChange={(newValue: any) => setValue(newValue)}
        renderInput={(params: BaseTextFieldProps) => (
          <InputWrapper>
            <label className="label">{label}</label>
            <TextField className="input" size={size} fullWidth {...params} />
          </InputWrapper>
        )}
        {...props}
      />
    </LocalizationProvider>
  );
};

export default DatePickerSimple;
