import React from "react";
import { makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    fontWeight: `${theme.typography.fontWeightBold} !important`,
    padding: theme.spacing(1, 3),
    textAlign: "center",
    borderRadius: 100,
  },
  selected: {
    height: "100%",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
}));

type RadioLabelRadiusProps = {
  label: string;
  selected?: boolean;
  className?: any
};

const RadioLabelRadius = (props: RadioLabelRadiusProps) => {
  const classes = useStyles();

  return (
    <Typography
      className={props.className}
      classes={{
        root: `${classes.root} ${props.selected ? classes.selected : ""}`,
      }}
    >
      {props.label}
    </Typography>
  );
};

export default RadioLabelRadius;
