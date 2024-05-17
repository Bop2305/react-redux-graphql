import React from "react";
import { makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    color: theme.palette.common.purple,
    fontWeight: `${theme.typography.fontWeightBold} !important`,
  },
}));

const TitleInfo = ({ label }: { label: string }) => {
  const classes = useStyles();

  return <Typography className={classes.wrapper}>{label}</Typography>;
};

export default TitleInfo;
