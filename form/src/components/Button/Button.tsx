import React from "react";
import { Button as ButtonMaterial, CircularProgress } from "@mui/material";
import { makeStyles, useTheme } from "@mui/styles";

import withTheme from "hoc/withTheme";

const useStyles = makeStyles((theme) => ({
  contained: {
    color: `${theme.palette.common.white} !important`,
  },
}));

type ButtonProps = {
  children: React.ReactNode;
  variant?: "text" | "outlined" | "contained";
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
  fullWidth?: boolean;
  type?: "button" | "submit";
  loading?: boolean;
  disabled?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  radius?: boolean;
  style?: any;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const Button = (props: ButtonProps) => {
  const { variant = "contained", type = "button" } = props;
  const classes = useStyles();
  const theme = useTheme();

  return (
    <ButtonMaterial
      className={(classes as any)[variant]}
      style={{
        width: props.fullWidth ? "100%" : "fit-content",
        borderRadius: props.radius ? 100 : undefined,
        boxShadow: "none",
        ...props.style,
      }}
      variant={variant}
      color={props.color}
      type={type}
      onClick={props.onClick}
      disabled={props.disabled || props.loading}
      startIcon={props.startIcon}
      endIcon={props.endIcon}
    >
      {props.children}
      {props.loading && (
        <CircularProgress
          size={16}
          style={{
            marginLeft: theme.spacing(1),
            color:
              variant === "contained"
                ? theme.palette.common.white
                : props.disabled || props.loading
                ? theme.palette.action.disabled
                : undefined,
          }}
        />
      )}
    </ButtonMaterial>
  );
};

export default withTheme<ButtonProps>(Button);
