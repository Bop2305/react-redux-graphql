import React, { cloneElement, useState, useEffect, useCallback } from "react";
import { makeStyles } from "@mui/styles";
import { IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

import withTheme from "hoc/withTheme";

import FormControl from "components/FormControl";
import InputsRender from "components/InputsRender";
import Button from "components/Button";

import InputWrapper from "../InputWrapper";
import ListItemDefault from "./listLabels/ListItemDefault";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: "grid",
  },
  viewWrapper: {
    display: "grid",
    gap: theme.spacing(2),
  },
  btnAdd: {
    width: "fit-content",
    "& svg": {
      fontSize: 36,
    },
  },
  btnWrapper: {
    display: "flex",
    justifyContent: "flex-end",
  },
  FormControl: {
    display: "grid",
    gap: theme.spacing(3),
  },
  inputsWrapper: {
    display: "grid",
    gap: theme.spacing(2),
  },
  btnFormWrapper: {
    display: "flex",
    justifyContent: "flex-end",
  },
}));

type InputListProps = {
  id: string;
  value: any;
  defaultValue: any;
  label?: string;
  hideLabel?: boolean;
  helperText?: string;
  error?: boolean;
  itemCustom?: React.ReactElement;
  inputsConfig: any;
  onChange: ({
    target: { name, value },
  }: {
    target: { name: string; value: any };
  }) => void;
  required?: boolean;
};

const InputList = (props: InputListProps) => {
  const classes = useStyles();
  const [stateValue, setStateValue] = useState(props.defaultValue);
  const [showForm, setShowForm] = useState(true);

  useEffect(() => {
    if (props.value) {
      setStateValue(props.value);
    }
  }, [props.value, setStateValue]);

  const closeHandle = useCallback(
    (index) => {
      let _stateValue = stateValue?.filter((it: any, i: number) => i !== index);
      _stateValue = _stateValue?.length > 0 ? _stateValue : undefined;

      props.onChange({
        target: {
          name: props.id,
          value: _stateValue,
        },
      });
      setStateValue(_stateValue);
    },
    [setStateValue, stateValue]
  );

  return (
    <InputWrapper
      htmlFor={props.id}
      label={props.label}
      hideLabel={props.hideLabel}
      helperText={props.helperText}
      error={props.error}
      required={props.required}
    >
      <div className={classes.wrapper}>
        <div className={classes.viewWrapper}>
          {stateValue &&
            stateValue?.map((v: any, i: number) =>
              props.itemCustom ? (
                cloneElement(props.itemCustom, {
                  key: i,
                  item: v,
                  inputsConfig: props.inputsConfig,
                  onClose: () => {
                    closeHandle(i);
                  },
                  ...props.itemCustom.props,
                })
              ) : (
                <ListItemDefault
                  key={i}
                  inputsConfig={props.inputsConfig}
                  item={v}
                  onClose={() => {
                    closeHandle(i);
                  }}
                />
              )
            )}
        </div>
        <div className={classes.btnWrapper}>
          <IconButton
            size="small"
            className={classes.btnAdd}
            color="secondary"
            onClick={() => {
              setShowForm((prev) => !prev);
            }}
          >
            {!showForm && <AddCircleIcon />}
            {showForm && <RemoveCircleIcon />}
          </IconButton>
        </div>
        {showForm && (
          <FormControl className={classes.FormControl} component="div">
            {(useFormResult) => (
              <>
                <InputsRender
                  className={classes.inputsWrapper}
                  inputsConfig={props.inputsConfig}
                  control={useFormResult?.control}
                />
                <div className={classes.btnFormWrapper}>
                  <Button
                    type="button"
                    onClick={useFormResult?.handleSubmit((data) => {
                      const _stateValue = [
                        ...(Array.isArray(stateValue) ? stateValue : []),
                        data,
                      ];

                      props.onChange({
                        target: {
                          name: props.id,
                          value: _stateValue,
                        },
                      });
                      setStateValue(_stateValue);
                      useFormResult.reset();
                    })}
                    color="secondary"
                    startIcon={<AddCircleIcon />}
                  >
                    Thêm
                  </Button>
                </div>
              </>
            )}
          </FormControl>
        )}
      </div>
    </InputWrapper>
  );
};

export default withTheme<InputListProps>(InputList);
