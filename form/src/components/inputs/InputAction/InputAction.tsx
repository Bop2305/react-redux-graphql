import React from "react";
import { makeStyles } from "@mui/styles";

import withTheme from "hoc/withTheme";
import Button from "components/Button";

import InputText from "../InputText";
import InputWrapper from "../InputWrapper";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: "grid",
    gridTemplateColumns: "1fr auto",
    gap: theme.spacing(2),
  },
}));

type InputActionProps = {
  id: string;
  label?: string;
  hideLabel?: boolean;
  helperText?: string;
  error?: boolean;
  disabled?: boolean;
  value: string;
  defaultValue: string;
  labelAction: string;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onClick?: (value: any) => void;
  required?: boolean;
  loading?: boolean;
};

const InputAction = (props: InputActionProps) => {
  const classes = useStyles();
  let _value = props.value || props.defaultValue;

  return (
    <InputWrapper
      htmlFor={props.id}
      label={props.label}
      hideLabel={props.hideLabel}
      helperText={props.helperText}
      error={props.error}
      required={props.required}
    >
      <div className={classes.wrapper}>
        <InputText
          id={props.id}
          value={props.value}
          defaultValue={props.defaultValue}
          onChange={(e) => {
            props.onChange(e);
            _value = e?.target?.value;
          }}
          onBlur={props.onBlur}
          onFocus={props.onFocus}
          disabled={props.disabled || props.loading}
        />

        <Button
          color="secondary"
          loading={props.loading}
          onClick={() =>
            (props.onClick as any)({
              target: { value: _value, name: props.id },
            })
          }
        >
          {props.labelAction}
        </Button>
      </div>
    </InputWrapper>
  );
};

export default withTheme<InputActionProps>(InputAction);
