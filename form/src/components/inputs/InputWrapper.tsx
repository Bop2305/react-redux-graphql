import React from "react";
import { makeStyles, useTheme } from "@mui/styles";
import { InputLabel, FormHelperText, Typography } from "@mui/material";

import withTheme from "hoc/withTheme";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: "fit-content",
  },
  labelWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  label: {
    cursor: "pointer",
  },
  helperText: {
    width: "fit-content",
    whiteSpace: "pre-line",
  },
}));

type InputWrapperProps = {
  htmlFor: string;
  label?: string;
  helperText?: string;
  error?: boolean;
  children: React.ReactNode;
  fullWidth?: boolean;
  hideLabel?: boolean;
  sub?: React.ReactNode;
  required?: boolean;
};

const InputWrapper = (props: InputWrapperProps) => {
  const { fullWidth = true } = props;
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className={fullWidth ? undefined : classes.wrapper}>
      {!props.hideLabel && (
        <div className={classes.labelWrapper}>
          <InputLabel
            className={classes.label}
            style={{
              color: props.error ? theme.palette.error.main : undefined,
            }}
            htmlFor={props.htmlFor}
          >
            {props.label}
            {props.required && (
              <Typography color="error" component="span">
                *
              </Typography>
            )}
          </InputLabel>
          {props.sub}
        </div>
      )}

      {props.children}
      {!!props.helperText && (
        <FormHelperText className={classes.helperText} error={!!props.error}>
          {props.helperText}
        </FormHelperText>
      )}
    </div>
  );
};

export default withTheme<InputWrapperProps>(InputWrapper);
