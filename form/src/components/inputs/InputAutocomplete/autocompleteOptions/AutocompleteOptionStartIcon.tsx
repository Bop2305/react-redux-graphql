import React from "react";
import { makeStyles } from "@mui/styles";

import withTheme from "hoc/withTheme";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: "flex",
    gap: theme.spacing(2),
    alignItems: "center",
  },
}));

type AutocompleteOptionStartIconProps = {
  label?: JSX.Element;
  option?: {
    label: string;
    value: string | number;
    [key: string]: any;
  };
};

const AutocompleteOptionStartIcon = (
  props: AutocompleteOptionStartIconProps
) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      {props.option?.icon} {props.label}
    </div>
  );
};

export default withTheme<AutocompleteOptionStartIconProps>(
  AutocompleteOptionStartIcon
);
