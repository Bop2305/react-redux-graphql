import React, {
  useCallback,
  Children,
  isValidElement,
  cloneElement,
  createElement,
} from "react";
import { FieldValues, useForm, UseFormReturn } from "react-hook-form";

type FormControlProps = {
  children:
    | ((
        useFormResult?: UseFormReturn<FieldValues, any>
      ) => React.ReactElement | React.ReactElement[])
    | React.ReactElement
    | React.ReactElement[];
  component?: string;
  className?: string;
  defaultValues?: any;
  onSubmit?: (data: any) => void;
  useFormResult?: UseFormReturn<FieldValues, any>;
};

const FormControl = ({
  children,
  component = "form",
  className,
  defaultValues,
  onSubmit,
  useFormResult,
}: FormControlProps) => {
  const useFormResultCurrent =
    useFormResult ||
    useForm({
      defaultValues: defaultValues,
      mode: "onTouched",
    });

  const childrenWithProps = useCallback(
    (_props) =>
      Children.map(children, (child) => {
        if (isValidElement(child)) {
          return cloneElement(child, {
            ..._props,
            ...(child?.props as any),
          });
        }
        return child;
      }),
    [children]
  );

  return createElement(
    component,
    {
      ...(component === "form"
        ? { onSubmit: useFormResultCurrent?.handleSubmit(onSubmit as any) }
        : {}),
      className: className,
    },
    typeof children === "function"
      ? (
          children as (
            useFormResult?: UseFormReturn<FieldValues, any>
          ) => React.ReactElement | React.ReactElement[]
        )(useFormResultCurrent)
      : childrenWithProps({
          control: useFormResultCurrent?.control,
        })
  );
};

export default FormControl;
