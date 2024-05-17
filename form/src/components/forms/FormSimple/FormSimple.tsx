import React from "react";
import { makeStyles } from "@mui/styles";

import withTheme from "hoc/withTheme";
import createDefaultValues from "helper/createDefaultValues";
import FormControl from "components/FormControl";
import InputsRender from "components/InputsRender";
import Button from "components/Button";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: "grid",
    gap: theme.spacing(3),
  },
}));

type FormSimpleProps = {
  inputsConfig: any;
  inputsWrapperClass?: string;
  className?: string;
  submitLabel?: string;
  component?: string;
  onSubmit: (data: any) => void;
  useFormResult?: any;
  loading?: boolean;
  disabledSubmitButton?: boolean;
  hideSubmitButton?: boolean;
  showResetButton?: boolean;
  btnWrapperClass?: string;
};

const FormSimple = (props: FormSimpleProps) => {
  const classes = useStyles();
  return (
    <FormControl
      className={`${classes.wrapper} ${props.className}`}
      onSubmit={props.onSubmit}
      component={props.component}
      defaultValues={createDefaultValues(props.inputsConfig)}
      useFormResult={props.useFormResult}
    >
      {(useFormResult) => (
        <>
          <InputsRender
            className={props.inputsWrapperClass}
            inputsConfig={props.inputsConfig}
            control={useFormResult?.control}
          />

          {!props.hideSubmitButton && (
            <div
              style={{ display: "flex", gap: 20 }}
              className={props.btnWrapperClass}
            >
              {props.showResetButton && (
                <Button
                  color="inherit"
                  variant="outlined"
                  fullWidth={true}
                  onClick={() => {
                    const obj = {} as any;

                    props.inputsConfig?.forEach((it: any) => {
                      obj[it?.id] = null;
                    });

                    useFormResult?.reset(obj);
                  }}
                >
                  Làm mới
                </Button>
              )}
              <Button
                disabled={props.disabledSubmitButton || false}
                type={
                  ["form", undefined, null, ""].includes(props.component)
                    ? "submit"
                    : "button"
                }
                fullWidth={true}
                color="secondary"
                loading={props.loading}
                onClick={
                  ["form", undefined, null, ""].includes(props.component)
                    ? undefined
                    : useFormResult?.handleSubmit(props.onSubmit)
                }
              >
                {props.submitLabel || "Gửi"}
              </Button>
            </div>
          )}
        </>
      )}
    </FormControl>
  );
};

export default withTheme<FormSimpleProps>(FormSimple);
