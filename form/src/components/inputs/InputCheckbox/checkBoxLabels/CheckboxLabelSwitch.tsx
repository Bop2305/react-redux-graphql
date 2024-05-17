import React from "react";
import { makeStyles } from "@mui/styles";
import { Switch } from "@mui/material";

import convertCurrency from "helper/converts/convertCurrency";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2, 2),
    border: `1px solid ${theme.palette.grey[300]}`,
    borderRadius: theme.spacing(1),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 60,
    "& img": {
      maxWidth: 36,
      height: "auto",
    },
  },
  selected: {
    border: `1px solid ${theme.palette.primary.main}`,
    padding: theme.spacing(0, 2),
    "& img": {
      filter: theme.palette.primary.filter,
    },
  },
  leftWrapper: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(2),
  },
  rightWrapper: {
    display: "grid",
    justifyItems: "flex-end",
  },
}));

type CheckboxLabelBoxProps = {
  label: string;
  src: string;
  fee: number;
  selected?: boolean;
};

const CheckboxLabelBox = (props: CheckboxLabelBoxProps) => {
  const classes = useStyles();

  return (
    <div
      className={`${classes.root} ${props.selected ? classes.selected : ""}`}
    >
      <div className={classes.leftWrapper}>
        <img src={props.src} alt={props.src} />{" "}
        <span style={{ lineHeight: 1 }}>{props.label}</span>
      </div>
      <div className={classes.rightWrapper}>
        <Switch sx={{ pointerEvents: "none" }} checked={props.selected} />

        {props.selected && !!props.fee && (
          <b style={{ marginTop: -5, textAlign: "right", paddingRight: 12 }}>
            +{convertCurrency(props.fee)}
          </b>
        )}
      </div>
    </div>
  );
};

export default CheckboxLabelBox;
