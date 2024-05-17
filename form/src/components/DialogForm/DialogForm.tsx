import React from "react";
import { makeStyles } from "@mui/styles";
import {
  Breakpoint,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import createDefaultValues from "helper/createDefaultValues";
import Button from "components/Button";
import FormControl from "components/FormControl";
import InputsRender from "components/InputsRender";
import { FieldValues, UseFormReturn } from "react-hook-form";
import withTheme from "hoc/withTheme";

const useStyles = makeStyles((theme) => ({
  wrapper: {},
  dialogTitleRoot: {
    display: "flex",
    gap: theme.spacing(5),
    justifyContent: "space-between",
    alignItems: "center",
  },
  fieldsWrapper: {
    display: "grid",
    gap: theme.spacing(10),
  },
  paperScrollPaper: {
    overflowY: "unset !important" as any,
  },
  formControl: {
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
  },
}));

type DialogFormProps = {
  title: string;
  submitLabel?: string;
  open: boolean;
  onClose: () => void;
  onSubmit?: (data: any) => void;
  inputsConfig: any;
  maxWidth?: Breakpoint | false;
  loading?: boolean;
  useFormResult?: UseFormReturn<FieldValues, any>;
  hideSubmitLabel?: boolean;
  fullScreen?: boolean;
  component?: string;
};
//
const DialogForm = (props: DialogFormProps) => {
  const classes = useStyles();

  return (
    <Dialog
      open={props.open}
      classes={{ paperScrollPaper: classes.paperScrollPaper }}
      onClose={(e, r) => {
        if (r !== "backdropClick") {
          props.onClose();
        }
      }}
      fullScreen={props.fullScreen}
      maxWidth={props.maxWidth}
      fullWidth={true}
    >
      <FormControl
        className={classes.formControl}
        onSubmit={props.onSubmit}
        defaultValues={createDefaultValues(props.inputsConfig)}
        useFormResult={props.useFormResult}
        component={props.component}
      >
        {(useFormResult) => {
          return (
            <>
              <DialogTitle classes={{ root: classes.dialogTitleRoot }}>
                {props.title}
                <IconButton onClick={props.onClose}>
                  <CloseIcon />
                </IconButton>
              </DialogTitle>
              <DialogContent>
                <InputsRender
                  className={classes.fieldsWrapper}
                  inputsConfig={props.inputsConfig}
                  control={useFormResult?.control}
                />
              </DialogContent>
              <DialogActions>
                <Button
                  color="inherit"
                  variant="outlined"
                  onClick={props.onClose}
                >
                  Đóng
                </Button>
                {!props.hideSubmitLabel && (
                  <Button
                    type="button"
                    color="secondary"
                    loading={props.loading}
                    onClick={
                      props.onSubmit
                        ? useFormResult?.handleSubmit(props.onSubmit)
                        : undefined
                    }
                  >
                    {props.submitLabel || "Gửi"}
                  </Button>
                )}
              </DialogActions>
            </>
          );
        }}
      </FormControl>
    </Dialog>
  );
};

export default withTheme<DialogFormProps>(DialogForm);
