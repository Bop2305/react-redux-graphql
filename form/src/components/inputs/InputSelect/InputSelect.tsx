import React from "react";
import { makeStyles } from "@mui/styles";
import { Select, MenuItem, SelectChangeEvent } from "@mui/material";

import withTheme from "hoc/withTheme";

import InputWrapper from "../InputWrapper";

const useStyles = makeStyles((theme) => ({
  disabled: {
    backgroundColor: `${theme.palette.action.disabledBackground} !important`,
    borderRadius: theme.spacing(1),
  },
}));

type InputSelectProps = {
  id: string;
  value: string | number;
  defaultValue: string | number;
  options: {
    label: string;
    value: string | number;
  }[];
  label?: string;
  hideLabel?: boolean;
  helperText?: string;
  error?: boolean;
  disabled?: boolean;
  onChange: (
    event: SelectChangeEvent<string | number>,
    child: React.ReactNode
  ) => void;
  showNone?: boolean;
  required?: boolean;
};

const InputSelect = (props: InputSelectProps) => {
  const classes = useStyles();

  return (
    <InputWrapper
      htmlFor={props.id}
      label={props.label}
      hideLabel={props.hideLabel}
      helperText={props.helperText}
      error={props.error}
      required={props.required}
    >
      <Select
        id={props.id}
        value={props.options?.length > 0 ? props.value : ""}
        defaultValue={props.defaultValue}
        onChange={props.onChange}
        fullWidth={true}
        size="small"
        error={!!props.error}
        disabled={props.disabled}
        classes={{
          outlined: props.disabled ? classes.disabled : undefined,
        }}
        name={props.id}
      >
        {props.showNone && (
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
        )}
        {props.options?.map((op) => (
          <MenuItem key={op?.value} value={op?.value}>
            {op?.label}
          </MenuItem>
        ))}
      </Select>
    </InputWrapper>
  );
};

export default withTheme<InputSelectProps>(InputSelect);
