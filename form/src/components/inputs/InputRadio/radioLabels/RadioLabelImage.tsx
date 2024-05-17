import React from "react";
import { makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    fontWeight: `${theme.typography.fontWeightBold} !important`,
    padding: theme.spacing(1, 3),
    textAlign: "center",
    borderRadius: theme.spacing(1),
    border: `1px solid ${theme.palette.grey[300]}`,
    "& > img": {
      maxHeight: 50,
    },
  },
  selected: {
    height: "100%",
    border: `1px solid ${theme.palette.primary.main}`,
    color: theme.palette.primary.main,
    filter: theme.palette.primary.filter,
  },
}));

type RadioLabelImageProps = {
  label: string;
  src: string;
  selected?: boolean;
  className?: any;
};

const RadioLabelImage = (props: RadioLabelImageProps) => {
  const classes = useStyles();

  return (
    <Typography
      className={props.className}
      classes={{
        root: `${classes.root} ${props.selected ? classes.selected : ""}`,
      }}
      component="div"
    >
      <img src={props.src} alt={props.src} />
      <br />
      {props.label}
    </Typography>
  );
};

export default RadioLabelImage;
