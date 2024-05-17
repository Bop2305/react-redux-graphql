import React, { useCallback } from "react";
import { Switch, FormControlLabel } from "@mui/material";

import withTheme from "hoc/withTheme";

import InputWrapper from "../InputWrapper";

type InputSwitchProps = {
  id: string;
  label?: string;
  hideLabel?: boolean;
  helperText?: string;
  error?: boolean;
  disabled?: boolean;
  switchLabel: string;
  checkedValue: string | number | boolean;
  unCheckedValue: string | number | boolean;
  value: string | number | boolean;
  defaultValue: string | number | boolean;
  onChange: any;
  required?: boolean;
  variant?: "space-between" | any;
};

const InputSwitch = (props: InputSwitchProps) => {
  return (
    <InputWrapper
      htmlFor={props.id}
      label={props.label}
      hideLabel={props.hideLabel}
      helperText={props.helperText}
      error={props.error}
      required={props.required}
    >
      <FormControlLabel
        disabled={props.disabled}
        style={{
          marginLeft: 0,
          display: "flex",
          ...(props.variant === "space-between"
            ? {
                justifyContent: "space-between",
                flexDirection: "row-reverse",
                alignItems: "center",
              }
            : {}),
        }}
        control={
          <Switch
            id={props.id}
            name={props.id}
            size={props.variant === "space-between" ? "medium" : "small"}
            checked={
              props.value !== undefined
                ? props.value === props.checkedValue
                : undefined
            }
            defaultChecked={
              props.defaultValue !== undefined
                ? props.defaultValue === props.checkedValue
                : undefined
            }
            onChange={(e, checked) => {
              props.onChange({
                target: {
                  name: e?.target?.name,
                  value: checked ? props.checkedValue : props.unCheckedValue,
                },
              });
            }}
          />
        }
        label={props.switchLabel}
      />
    </InputWrapper>
  );
};

export default withTheme<InputSwitchProps>(InputSwitch);
