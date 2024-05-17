import React, { useState, cloneElement, useCallback } from "react";
import { makeStyles } from "@mui/styles";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import NumberFormat, { InputAttributes } from "react-number-format";

import withTheme from "hoc/withTheme";

import InputWrapper from "../InputWrapper";

const useStyles = makeStyles((theme) => ({
  disabled: {
    backgroundColor: theme.palette.action.disabledBackground,
    borderRadius: theme.spacing(1),
  },
  currencyUnit: {
    color: theme.palette.grey[500],
  },
}));

type InputTextProps = {
  id: string;
  label?: string;
  hideLabel?: boolean;
  helperText?: string;
  error?: boolean;
  disabled?: boolean;
  value: string;
  defaultValue: string;
  icon?: React.ReactNode;
  iconPosition?: "start" | "end";
  rows?: number;
  multiline?: boolean;
  isCurrency?: boolean;
  type?: string;
  uppercase?: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onClick?: () => void;
  required?: boolean;
};

interface CustomProps {
  onChange: (event: {
    target: { name: string; value: string | number | undefined };
  }) => void;
  name: string;
}

const NumberFormatCustom = React.forwardRef<
  NumberFormat<InputAttributes>,
  CustomProps
>((props, ref) => {
  const { onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: !isNaN(Number(values.floatValue)) ? values.floatValue : "",
          },
        });
      }}
      isNumericString
      decimalSeparator=","
      thousandSeparator="."
    />
  );
});

const InputText = (props: InputTextProps) => {
  const { iconPosition = "end" } = props;
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);

  const cloneElementIcon = useCallback(() => {
    return typeof props.onClick === "function" ? (
      <IconButton
        disabled={props.disabled}
        onClick={props.onClick}
        size="small"
      >
        {props.icon}
      </IconButton>
    ) : (
      props.icon
    );
  }, [props.icon, props.onClick, props.disabled]);

  return (
    <InputWrapper
      htmlFor={props.id}
      label={props.label}
      hideLabel={props.hideLabel}
      helperText={props.helperText}
      error={props.error}
      required={props.required}
    >
      <TextField
        id={props.id}
        name={props.id}
        label=""
        type={
          props.type === "password"
            ? showPassword
              ? "text"
              : "password"
            : props.type
        }
        error={props.error}
        value={props.value}
        defaultValue={props.defaultValue}
        classes={{ root: props.disabled ? classes.disabled : undefined }}
        size="small"
        variant="outlined"
        fullWidth={true}
        disabled={props.disabled}
        onChange={(e) =>
          props.onChange({
            ...e,
            target: {
              ...e?.target,
              value: props.uppercase
                ? e?.target?.value?.toUpperCase()
                : e?.target?.value,
              name: e?.target?.name,
            },
          })
        }
        onBlur={(e) =>
          (props.onBlur as any)({
            ...e,
            target: {
              ...e?.target,
              value:
                props.type === "currency"
                  ? Number(e?.target?.value?.split(".")?.join(""))
                  : e?.target?.value,
              name: e?.target?.name,
            },
          })
        }
        onFocus={props.onFocus}
        multiline={props.multiline}
        rows={props.rows}
        InputProps={{
          startAdornment:
            iconPosition === "start" && !!props.icon ? (
              <InputAdornment position="start">
                {cloneElementIcon()}
              </InputAdornment>
            ) : undefined,
          endAdornment:
            iconPosition === "end" && !!props.icon ? (
              <InputAdornment position="end">
                {cloneElementIcon()}
              </InputAdornment>
            ) : props.type === "password" ? (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ) : props.type === "currency" ? (
              <span className={classes.currencyUnit}>đ</span>
            ) : undefined,
          inputComponent: props.isCurrency
            ? (NumberFormatCustom as any)
            : undefined,
        }}
        inputProps={{
          style: { textTransform: props.uppercase ? "uppercase" : undefined },
        }}
      />
    </InputWrapper>
  );
};

export default withTheme<InputTextProps>(InputText);
