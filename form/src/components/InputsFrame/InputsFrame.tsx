import React from "react";
import { makeStyles } from "@mui/styles";
import { Control, FieldValues } from "react-hook-form";

import InputsRender from "components/InputsRender";
import LabelFrame from "components/LabelFrame";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: "grid",
    gap: theme.spacing(3),
  },
  inputsWrapper: {
    borderRadius: theme.spacing(1),
    padding: theme.spacing(5),
    backgroundColor: theme.palette.common.white,
  },
  [theme.breakpoints.down("sm")]: {
    inputsWrapper: {
      padding: theme.spacing(3),
    },
  },
}));

type InputsFrameType = {
  inputsConfig: any;
  control: Control<FieldValues, any>;
  classInputsWrapper?: string;
  className?: string;
  label?: string;
};

const InputsFrame = (props: InputsFrameType) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      {!!props.label && <LabelFrame content={props.label} />}
      <div className={`${classes.inputsWrapper} ${props.className}`}>
        <InputsRender
          className={props.classInputsWrapper}
          inputsConfig={props.inputsConfig}
          control={props.control}
        />
      </div>
    </div>
  );
};

export default InputsFrame;
