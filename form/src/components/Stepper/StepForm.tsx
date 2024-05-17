import React from "react";
import { useMemo } from "react";
import { makeStyles, useTheme } from "@mui/styles";

import createDefaultValues from "helper/createDefaultValues";
import Button from "components/Button";
import FormControl from "components/FormControl";
import InputsRender from "components/InputsRender";
import Countdown from "components/Countdown";

const useStyles = makeStyles((theme) => ({
  wrapper: {},
  inputsWrapperClass: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: theme.spacing(5),
  },
  btnsWrapper: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: theme.spacing(10),
  },
}));

type StepFormProps = {
  inputsConfig: any;
  inputsWrapperClass?: string;
  useFormResult: any;
  btnsWrapperClasses: any;
  onBack: (data: any) => void;
  btnBackHide?: boolean;
  btnBackDisabled?: boolean;
  onNext: (data: any) => void;
  btnNextHide?: boolean;
  btnNextDisbled?: boolean;
  btnNextLabel?: string;
  btnBackLabel?: string;
  loading?: boolean;
  seconds?: number;
  onComplete?: any;
};

const StepForm = (props: StepFormProps) => {
  const classes = useStyles();
  const theme = useTheme();

  // const inputsConfigFlat = useMemo(() => {
  //   const _inputsConfig = props.inputsConfig ? [...props.inputsConfig] : [];
  //   const _inputsConfigFlat = [] as any;

  //   _inputsConfig.forEach((ipc) => {
  //     if (ipc?.inputsConfig?.length > 0) {
  //       ipc.fields.forEach((_ipc: any) => {
  //         _inputsConfigFlat.push(_ipc);
  //       });
  //     } else {
  //       _inputsConfigFlat.push(ipc);
  //     }
  //   });

  //   return _inputsConfigFlat;
  // }, [props.inputsConfig]);
  const defaultValues = useMemo(
    () => createDefaultValues(props.inputsConfig),
    [props.inputsConfig]
  );

  return (
    <FormControl
      component="div"
      className={classes.wrapper}
      useFormResult={props.useFormResult}
      onSubmit={props.onNext}
      defaultValues={defaultValues}
    >
      {(useFormResult) => (
        <>
          <InputsRender
            inputsConfig={props.inputsConfig}
            className={`${classes.inputsWrapperClass} ${
              props.inputsWrapperClass || ""
            }`}
            control={useFormResult?.control}
          />

          <div
            className={`${classes.btnsWrapper} ${
              props.btnsWrapperClasses || ""
            }`}
          >
            <div>
              {!props.btnBackHide && (
                <Button
                  color="secondary"
                  onClick={() => props.onBack(useFormResult?.getValues())}
                  variant="outlined"
                  radius={true}
                  loading={props.loading}
                  style={{ padding: theme.spacing(2, 10) }}
                >
                  {props?.btnBackLabel || "QUAY LẠI"}
                </Button>
              )}
            </div>

            {!props.btnNextHide && (
              <Countdown
                seconds={props.seconds || 0}
                start={!!props.seconds}
                // onClick={props.onClick}
                onComplete={props.onComplete}
              >
                <Button
                  style={{ padding: theme.spacing(2, 10) }}
                  radius={true}
                  color="secondary"
                  type="button"
                  loading={props.loading}
                  onClick={useFormResult?.handleSubmit((data) => {
                    props.onNext(data);
                  })}
                >
                  {props.btnNextLabel || "TIẾP THEO"}
                </Button>
              </Countdown>
            )}
          </div>
        </>
      )}
    </FormControl>
  );
};

export default StepForm;
