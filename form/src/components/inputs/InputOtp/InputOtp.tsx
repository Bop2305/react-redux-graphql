import React, { useState, useEffect } from "react";
import OtpInput from "react-otp-input-rc-17";
import { makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";

import withTheme from "hoc/withTheme";
import Countdown from "components/Countdown";

import InputWrapper from "../InputWrapper";

const useStyles = makeStyles((theme) => ({
  separatorWrapper: {
    margin: theme.spacing(0, 1),
  },
  otpInput: {
    width: "fit-content",
  },
  inputStyle: {
    width: "50px !important",
    height: 40,
    border: 0,
    borderBottom: `2px solid ${theme.palette.divider}`,
    outline: 0,
    "&:focus": {
      borderBottom: `2px solid ${theme.palette.primary.main}`,
    },
    [theme.breakpoints.down("sm")]: {
      width: "32px !important",
    },
  },
  disabled: {
    backgroundColor: theme.palette.action.disabledBackground,
  },
  reSendOtpDisabled: {
    color: `${theme.palette.text.disabled} !important`,
    cursor: "auto !important",
  },
  reSendOtp: {
    fontSize: "0.8rem !important",
    fontWeight: `${theme.typography.fontWeightBold} !important`,
    color: theme.palette.secondary.main,
    cursor: "pointer",
  },
}));

type InputOtpProps = {
  id: string;
  label?: string;
  hideLabel?: boolean;
  helperText?: string;
  error?: boolean;
  value: string;
  numFields?: number;
  onChange: any;
  focus?: boolean;
  disabled?: boolean;
  onClick: any;
  seconds: number;
  start?: boolean;
  onTick?: any;
  onComplete?: any;
  required?: boolean;
};

const InputOtp = (props: InputOtpProps) => {
  const classes = useStyles();
  const [v, setV] = useState(props.value);

  useEffect(() => {
    if (props.value?.length === props.numFields) {
      setV(props.value);
    }
  }, [setV, props.value]);

  useEffect(() => {
    if (v?.length === props.numFields) {
      props.onChange({ target: { name: props.id, value: v } });
    }

    if (!v) {
      props.onChange({ target: { name: props.id, value: undefined } });
    }
  }, [v, props.onChange, props.id]);

  return (
    <InputWrapper
      htmlFor={props.id}
      label={props.label}
      hideLabel={props.hideLabel}
      helperText={props.helperText}
      error={props.error}
      required={props.required}
      sub={
        <Countdown
          onTick={props.onTick}
          seconds={props.seconds}
          start={props.start}
          onClick={props.onClick}
          onComplete={props.onComplete}
        >
          <ReSendOtp />
        </Countdown>
      }
      fullWidth={false}
    >
      <OtpInput
        value={v}
        onChange={(otp: any) => {
          setV(otp);
        }}
        numInputs={props.numFields}
        separator={<span className={classes.separatorWrapper}>-</span>}
        shouldAutoFocus={props.focus}
        isInputNum={true}
        inputStyle={`${classes.inputStyle} ${
          props.disabled ? classes.disabled : ""
        }`}
        isDisabled={props.disabled}
        className={classes.otpInput}
      />
    </InputWrapper>
  );
};

const ReSendOtp = ({ disabled }: { disabled?: boolean }) => {
  const classes = useStyles();

  return (
    <Typography
      className={`${classes.reSendOtp} ${
        disabled ? classes.reSendOtpDisabled : ""
      }`}
    >
      Gửi lại OTP
    </Typography>
  );
};

export default withTheme<InputOtpProps>(InputOtp);
