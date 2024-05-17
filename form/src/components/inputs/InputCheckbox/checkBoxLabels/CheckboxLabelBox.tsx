import React from "react";
import { makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    fontWeight: `${theme.typography.fontWeightBold} !important`,
    backgroundColor: theme.palette.action.disabledBackground,
    padding: theme.spacing(2, 3),
    textAlign: "center",
  },
  selected: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
}));

type CheckboxLabelBoxProps = {
  label: string;
  selected?: boolean;
};

const CheckboxLabelBox = (props: CheckboxLabelBoxProps) => {
  const classes = useStyles();

  return (
    <Typography
      classes={{
        root: `${classes.root} ${props.selected ? classes.selected : ""}`,
      }}
    >
      {props.label}
    </Typography>
  );
};

export default CheckboxLabelBox;
