import React from "react";
import { makeStyles } from "@mui/styles";
import { StepLabel as StepLabelMaterial } from "@mui/material";

import withTheme from "hoc/withTheme";

const useStyles = makeStyles((theme) => ({
  wrapper: {},
  stepLabelIconContainer: {
    height: 7,
    backgroundColor: theme.palette.grey[100],
    borderRadius: 7,
    width: "100%",
    "& svg": {
      display: "none",
    },
  },
  stepLabel: {
    position: "absolute",
    left: 0,
    right: 0,
    fontSize: "1.4rem !important",
    color: `${theme.palette.primary.main} !important`,
  },
}));

type StepperProps = {
  title: string;
  active: boolean;
  classes: any
};

const StepLabel = React.forwardRef((props: StepperProps, ref) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <StepLabelMaterial
        ref={ref}
        classes={{
          iconContainer: classes.stepLabelIconContainer,
          label: classes.stepLabel,
          ...props.classes
        }}
      >
        {props.active && props.title}
      </StepLabelMaterial>
    </div>
  );
});

export default withTheme<StepperProps>(StepLabel);
