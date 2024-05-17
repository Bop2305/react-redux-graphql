import React, { Fragment } from "react";
import { Controller } from "react-hook-form";

import validate from "helper/validate";

import InputControl from "../InputControl";

type InputsRenderProps = {
  inputsConfig: any;
  control?: any;
  className?: string;
};

const InputsRender = (props: InputsRenderProps) => {
  return (
    <div className={props.className}>
      {props.inputsConfig?.map((it: any, i: number) => (
        <Fragment key={it?.id + i}>
          {!it?.hide && (
            <Controller
              name={it?.id}
              control={props.control}
              rules={{
                validate: (value) => {
                  return validate(
                    value,
                    props.control?._formValues,
                    it?.label,
                    it?.validations,
                    it
                  );
                },
              }}
              render={({ field, fieldState, formState }) => {
                return (
                  <div
                    className={
                      typeof it?.className === "function"
                        ? it?.className(props.control?._formValues)
                        : it?.className
                    }
                  >
                    <InputControl
                      {...field}
                      {...it}
                      min={
                        typeof it?.min === "function"
                          ? it?.min(props.control?._formValues)
                          : it?.min
                      }
                      max={
                        typeof it?.max === "function"
                          ? it?.max(props.control?._formValues)
                          : it?.max
                      }
                      onChange={(e: any) => {
                        if (!it.disableDefaultOnChange) {
                          field?.onChange(e);
                        }
                        if (typeof it?.onChange === "function") it?.onChange(e);
                      }}
                      ref={null}
                      value={(() => {
                        if (it.hasOwnProperty("value")) {
                          return it.value;
                        }
                        if (field.value === false) return false;
                        else
                          return [null, undefined, ""].includes(field.value)
                            ? ""
                            : field.value;
                      })()}
                      defaultValue={undefined}
                      options={
                        typeof it?.options === "function"
                          ? it?.options(props.control?._formValues)
                          : it?.options
                      }
                      required={
                        !!it?.validations?.find((v: any) => v === "required")
                      }
                      error={!!formState?.errors?.[field?.name]?.message}
                      helperText={
                        formState?.errors?.[field?.name]?.message ||
                        it?.helperText
                      }
                    />
                  </div>
                );
              }}
            />
          )}
        </Fragment>
      ))}
    </div>
  );
};

export default InputsRender;
