import React, { cloneElement, useState, useCallback } from "react";
import { makeStyles } from "@mui/styles";
import { FormControlLabel, Checkbox } from "@mui/material";

import withTheme from "hoc/withTheme";

import InputWrapper from "../InputWrapper";

const useStyles = makeStyles((theme) => ({
  formControlLabelRoot: {
    marginLeft: `0px !important`,
    marginRight: `0px !important`,
  },
  checkboxGroup: {
    display: "flex",
    flexDirection: "column",
  },
  checkboxGroupElm: {
    gap: theme.spacing(2),
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
}));

type InputCheckboxProps = {
  id: string;
  label?: string;
  hideLabel?: boolean;
  helperText?: string;
  error?: boolean;
  options?: {
    label: string | React.ReactElement;
    value: string | number | boolean;
    [key: string]: any;
  }[];
  value:
    | Array<string | number | boolean>
    | string
    | number
    | boolean
    | undefined;
  defaultValue:
    | Array<string | number | boolean>
    | string
    | number
    | boolean
    | undefined;
  disabled?: boolean;
  row?: boolean;
  classCheckbox?: string;
  classCheckboxGroup?: string;
  onChange: any;
  required?: boolean;
  variant?: "full-width" | any;
};

const InputCheckbox = (props: InputCheckboxProps) => {
  const classes = useStyles();
  const [defaultValueState, setDefaultValueState] = useState(
    props.defaultValue
  );

  const checkedHandle = useCallback(
    (opValue) => {
      const _value = props.value || defaultValueState;

      if (props.options && props.options?.length > 1) {
        return !!(_value as Array<string | number | boolean>)?.find(
          (v) => v === opValue
        );
      } else {
        return _value === opValue;
      }
    },
    [props.options?.length, props.value, defaultValueState]
  );

  return (
    <InputWrapper
      htmlFor={props.id}
      label={props.label}
      hideLabel={props.hideLabel}
      helperText={props.helperText}
      error={props.error}
      required={props.required}
    >
      <div
        className={`${classes.checkboxGroup} ${props.row ? classes.row : ""} ${
          props.classCheckboxGroup
        } ${
          React.isValidElement(props.options?.[0]?.label)
            ? classes.checkboxGroupElm
            : undefined
        }`}
      >
        {props.options?.map((op) => (
          <FormControlLabel
            key={`${op?.value}`}
            id={props.id}
            name={props.id}
            onChange={(e, checked) => {
              let _value = (props.value || defaultValueState) as any;

              if (props.options && props.options?.length > 1) {
                if (checked)
                  _value = [
                    ...((_value as Array<string | number | boolean>)
                      ? (_value as Array<string | number | boolean>)
                      : []),
                    op?.value,
                  ];
                else
                  _value = (_value as Array<string | number | boolean>)?.filter(
                    (v) => v !== op?.value
                  );

                _value =
                  _value && _value?.length > 0
                    ? (_value as Array<string | number | boolean>)
                    : null;
              } else {
                if (checked) _value = op?.value;
                else _value = null;
              }

              setDefaultValueState(_value);
              props.onChange({ target: { name: props.id, value: _value } });
            }}
            style={props.variant === "full-width" ? { display: "block" } : {}}
            classes={{
              root: `${
                React.isValidElement(op?.label)
                  ? classes.formControlLabelRoot
                  : undefined
              } ${props.classCheckbox}`,
            }}
            control={
              <Checkbox
                value={op?.value}
                size="small"
                checked={checkedHandle(op?.value)}
                style={{
                  display:
                    React.isValidElement(op?.label) && !op?.showCheckIcon
                      ? "none"
                      : undefined,
                }}
              />
            }
            label={
              React.isValidElement(op?.label)
                ? cloneElement(op?.label, {
                    selected: checkedHandle(op?.value),
                  } as any)
                : op?.label
            }
            disabled={props.disabled}
          />
        ))}
      </div>
    </InputWrapper>
  );
};

export default withTheme<InputCheckboxProps>(InputCheckbox);
