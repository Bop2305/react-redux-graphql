import React, { cloneElement, useState } from "react";
import { makeStyles } from "@mui/styles";
import { RadioGroup, Radio, FormControlLabel } from "@mui/material";

import withTheme from "hoc/withTheme";

import InputWrapper from "components/inputs/InputWrapper";

const useStyles = makeStyles((theme) => ({
  formControlLabelRoot: {
    marginLeft: `0px !important`,
    marginRight: `0px !important`,
    display: "block !important",
  },
  radioGroupRoot: {
    display: "flex",
    gap: theme.spacing(2),
  },
}));

type InputRadioProps = {
  id: string;
  label?: string;
  hideLabel?: boolean;
  helperText?: string;
  error?: boolean;
  value: string | number;
  defaultValue: string | number;
  options: { label: string | React.ReactElement; value: string | number }[];
  disabled?: boolean;
  row?: boolean;
  classRadio?: string;
  classRadioGroup?: string;
  fullWidth?: boolean;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => void;
  required?: boolean;
};

const InputRadio = (props: InputRadioProps) => {
  const classes = useStyles();
  const [defaultValueState, setDefaultValueState] = useState(
    props.defaultValue?.toString()
  );

  return (
    <InputWrapper
      htmlFor={props.id}
      label={props.label}
      hideLabel={props.hideLabel}
      helperText={props.helperText}
      error={props.error}
      fullWidth={props.fullWidth}
      required={props.required}
    >
      <RadioGroup
        id={props.id}
        name={props.id}
        value={props.value}
        defaultValue={props.defaultValue}
        row={props.row}
        classes={{
          root: `${
            React.isValidElement(props.options?.[0]?.label)
              ? classes.radioGroupRoot
              : undefined
          } ${props.classRadioGroup}`,
        }}
        onChange={(e, v) => {
          let _v: any = v;
          if (_v === "false") {
            _v = false;
          } else if (_v === "true") {
            _v = true;
          }

          setDefaultValueState(_v);
          if (typeof props.onChange === "function")
            props.onChange({ ...e, target: { ...e?.target, value: _v } }, _v);
        }}
      >
        {props.options?.map((op, i) => (
          <FormControlLabel
            key={`${op?.value}${i}`}
            value={op?.value}
            classes={{
              root: `${
                React.isValidElement(op?.label)
                  ? classes.formControlLabelRoot
                  : undefined
              } ${props.classRadio}`,
            }}
            control={
              <Radio
                size="small"
                style={{
                  display: React.isValidElement(op?.label) ? "none" : undefined,
                }}
              />
            }
            label={
              React.isValidElement(op?.label)
                ? cloneElement(op?.label, {
                    selected:
                      op?.value?.toString() ===
                      (props?.value?.toString() ||
                        defaultValueState?.toString()),
                  } as any)
                : op?.label
            }
            disabled={props.disabled}
          />
        ))}
      </RadioGroup>
    </InputWrapper>
  );
};

export default withTheme<InputRadioProps>(InputRadio);
