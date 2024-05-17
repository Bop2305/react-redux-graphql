import React from "react";

import { SelectChangeEvent } from "@mui/material";

import InputText from "components/inputs/InputText";
import InputSelect from "components/inputs/InputSelect";
import InputRadio from "components/inputs/InputRadio";
import InputCheckbox from "components/inputs/InputCheckbox";
import InputDate from "components/inputs/InputDate";
import InputAutocomplete from "components/inputs/InputAutocomplete";
import InputSwitch from "components/inputs/InputSwitch";
import InputOtp from "components/inputs/InputOtp";
import InputList from "components/inputs/InputList";
import InputDateTime from "components/inputs/InputDateTime";
import InputAction from "components/inputs/InputAction";
import InputEditor from "components/inputs/InputEditor";
//

type InputControlProps = {
  id: string;
  type: string;
  label?: string;
  hideLabel?: boolean;
  helperText?: string;
  error?: boolean;
  disabled?: boolean;
  value?:
    | Array<string | number | boolean>
    | string
    | number
    | boolean
    | undefined;
  defaultValue?:
    | Array<string | number | boolean>
    | string
    | number
    | boolean
    | undefined;
  icon?: React.ReactNode;
  iconPosition?: "start" | "end";
  rows?: number;
  row?: boolean;
  classItem?: string;
  classGroup?: string;
  options?: {
    group?: string;
    label: string | React.ReactElement;
    value: string | number | boolean;
    disabled?: boolean;
    fixed?: boolean;
    [key: string]: any;
  }[];
  min?: any;
  max?: any;
  openTo?: "day" | "year";
  multiple?: boolean;
  limitTags?: number;
  freeSolo?: boolean;
  custom?: React.ReactElement;
  group?: boolean;
  filterSelectedOptions?: boolean;
  checkbox?: boolean;
  switchLabel?: string;
  checkedValue?: string | number | boolean;
  unCheckedValue?: string | number | boolean;
  numFields?: number;
  focus?: boolean;
  onClick?: any;
  seconds?: number;
  start?: boolean;
  showNone?: boolean;
  uppercase?: boolean;
  fullWidth?: boolean;
  inputsConfig?: any;
  variant?: "space-between" | "full-width" | "year" | any;
  onChange?:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | ((
        event: SelectChangeEvent<string | number>,
        child: React.ReactNode
      ) => void);
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onTick?: any;
  onComplete?: any;
  labelAction?: any;
  required?: boolean;
  loading?: boolean;
  services?: { uploadService?: any };
};

const InputControl = (props: InputControlProps) => {
  switch (props.type) {
    case "text":
      return (
        <InputText
          id={props.id}
          label={props.label}
          hideLabel={props.hideLabel}
          helperText={props.helperText}
          error={props.error}
          disabled={props.disabled}
          value={props.value as string}
          defaultValue={props.defaultValue as string}
          icon={props.icon}
          iconPosition={props.iconPosition}
          onChange={
            props.onChange as React.ChangeEventHandler<
              HTMLInputElement | HTMLTextAreaElement
            >
          }
          uppercase={props.uppercase}
          onBlur={props.onBlur}
          onFocus={props.onFocus}
          onClick={props.onClick}
          required={props.required}
        />
      );
    case "action":
      return (
        <InputAction
          id={props.id}
          label={props.label}
          hideLabel={props.hideLabel}
          helperText={props.helperText}
          error={props.error}
          disabled={props.disabled}
          loading={props.loading}
          value={props.value as string}
          defaultValue={props.defaultValue as string}
          labelAction={props.labelAction}
          onChange={
            props.onChange as React.ChangeEventHandler<
              HTMLInputElement | HTMLTextAreaElement
            >
          }
          onBlur={props.onBlur}
          onFocus={props.onFocus}
          onClick={props.onClick}
          required={props.required}
        />
      );

    case "password":
      return (
        <InputText
          id={props.id}
          label={props.label}
          hideLabel={props.hideLabel}
          helperText={props.helperText}
          error={props.error}
          disabled={props.disabled}
          value={props.value as string}
          defaultValue={props.defaultValue as string}
          type={props.type}
          onChange={
            props.onChange as React.ChangeEventHandler<
              HTMLInputElement | HTMLTextAreaElement
            >
          }
          onBlur={props.onBlur}
          onFocus={props.onFocus}
          required={props.required}
        />
      );
    case "textarea":
      return (
        <InputText
          id={props.id}
          label={props.label}
          hideLabel={props.hideLabel}
          helperText={props.helperText}
          error={props.error}
          disabled={props.disabled}
          value={props.value as string}
          defaultValue={props.defaultValue as string}
          icon={props.icon}
          iconPosition={props.iconPosition}
          multiline={true}
          rows={props.rows || 3}
          onChange={
            props.onChange as React.ChangeEventHandler<
              HTMLInputElement | HTMLTextAreaElement
            >
          }
          onBlur={props.onBlur}
          onFocus={props.onFocus}
          required={props.required}
        />
      );
    case "currency":
      return (
        <InputText
          id={props.id}
          label={props.label}
          type={props.type}
          hideLabel={props.hideLabel}
          helperText={props.helperText}
          error={props.error}
          disabled={props.disabled}
          value={props.value as string}
          defaultValue={props.defaultValue as string}
          icon={props.icon}
          iconPosition={props.iconPosition}
          onChange={
            props.onChange as React.ChangeEventHandler<
              HTMLInputElement | HTMLTextAreaElement
            >
          }
          onBlur={props.onBlur}
          onFocus={props.onFocus}
          isCurrency={true}
          required={props.required}
        />
      );
    case "select":
      return (
        <InputSelect
          id={props.id}
          value={props.value as string | number}
          defaultValue={props.defaultValue as string | number}
          options={
            props.options as {
              label: string;
              value: string | number;
            }[]
          }
          label={props.label}
          hideLabel={props.hideLabel}
          helperText={props.helperText}
          error={props.error}
          disabled={props.disabled}
          showNone={props.showNone}
          onChange={
            props.onChange as (
              event: SelectChangeEvent<string | number>,
              child: React.ReactNode
            ) => void
          }
          required={props.required}
        />
      );
    case "radio":
      return (
        <InputRadio
          id={props.id}
          label={props.label}
          hideLabel={props.hideLabel}
          helperText={props.helperText}
          error={props.error}
          value={props.value as string | number}
          defaultValue={props.defaultValue as string | number}
          options={
            props.options as {
              label: string | React.ReactElement;
              value: string | number;
            }[]
          }
          fullWidth={props.fullWidth}
          disabled={props.disabled}
          row={props.row}
          classRadio={props.classItem}
          classRadioGroup={props.classGroup}
          onChange={props.onChange}
          required={props.required}
        />
      );
    case "date":
      return (
        <InputDate
          id={props.id}
          label={props.label}
          hideLabel={props.hideLabel}
          helperText={props.helperText}
          error={props.error}
          value={props.value}
          disabled={props.disabled}
          onChange={props.onChange}
          onBlur={props.onBlur}
          onFocus={props.onFocus}
          minDate={props.min}
          maxDate={props.max}
          openTo={props.openTo}
          required={props.required}
          variant={props.variant}
        />
      );
    case "datetime":
      return (
        <InputDateTime
          id={props.id}
          label={props.label}
          hideLabel={props.hideLabel}
          helperText={props.helperText}
          error={props.error}
          value={props.value}
          disabled={props.disabled}
          onChange={props.onChange}
          onBlur={props.onBlur}
          onFocus={props.onFocus}
          minDate={props.min}
          maxDate={props.max}
          openTo={props.openTo}
          required={props.required}
        />
      );
    case "checkbox":
      return (
        <InputCheckbox
          id={props.id}
          label={props.label}
          hideLabel={props.hideLabel}
          helperText={props.helperText}
          error={props.error}
          options={props.options}
          value={props.value}
          defaultValue={props.defaultValue}
          disabled={props.disabled}
          row={props.row}
          classCheckbox={props.classItem}
          classCheckboxGroup={props.classGroup}
          onChange={props.onChange}
          required={props.required}
          variant={props.variant}
        />
      );
    case "autocomplete":
      return (
        <InputAutocomplete
          id={props.id}
          label={props.label}
          hideLabel={props.hideLabel}
          helperText={props.helperText}
          error={props.error}
          options={
            props.options as {
              group?: string;
              label: string;
              value: string | number;
              disabled?: boolean;
              fixed?: boolean;
              [key: string]: any;
            }[]
          }
          limitTags={props.limitTags}
          freeSolo={props.freeSolo}
          disabled={props.disabled}
          value={props.value as string | number | Array<string | number>}
          defaultValue={
            props.defaultValue as string | number | Array<string | number>
          }
          onChange={props.onChange}
          optionCustom={props.custom}
          group={props.group}
          multiple={props.multiple}
          filterSelectedOptions={props.filterSelectedOptions}
          checkbox={props.checkbox}
          onBlur={props.onBlur}
          onFocus={props.onFocus}
          required={props.required}
          loading={props.loading}
          onClickChip={props.onClick}
        />
      );
    case "switch":
      return (
        <InputSwitch
          id={props.id}
          label={props.label}
          hideLabel={props.hideLabel}
          helperText={props.helperText}
          error={props.error}
          disabled={props.disabled}
          switchLabel={props.switchLabel as string}
          checkedValue={props.checkedValue as string | number | boolean}
          unCheckedValue={props.unCheckedValue as string | number | boolean}
          value={props.value as string | number | boolean}
          defaultValue={props.defaultValue as string | number | boolean}
          onChange={props.onChange}
          required={props.required}
          variant={props.variant}
        />
      );
    case "otp":
      return (
        <InputOtp
          id={props.id}
          label={props.label}
          hideLabel={props.hideLabel}
          helperText={props.helperText}
          error={props.error}
          value={props.value as string}
          numFields={props.numFields}
          onChange={props.onChange}
          focus={props.focus}
          disabled={props.disabled}
          onClick={props.onClick}
          seconds={props.seconds as number}
          start={props.start}
          onTick={props.onTick}
          onComplete={props.onComplete}
          required={props.required}
        />
      );
    case "list":
      return (
        <InputList
          id={props.id}
          value={props.value}
          defaultValue={props.defaultValue}
          label={props.label}
          hideLabel={props.hideLabel}
          helperText={props.helperText}
          error={props.error}
          itemCustom={props.custom}
          inputsConfig={props.inputsConfig}
          onChange={props.onChange as any}
          required={props.required}
        />
      );
    case "editor":
      return (
        <InputEditor
          id={props.id}
          label={props.label}
          hideLabel={props.hideLabel}
          helperText={props.helperText}
          error={props.error}
          disabled={props.disabled}
          value={props.value as any}
          defaultValue={props.defaultValue as any}
          autoFocus={props.focus}
          onChange={props.onChange as any}
          onBlur={props.onBlur}
          onFocus={props.onFocus}
          required={props.required}
          loading={props.loading}
          uploadService={props.services?.uploadService}
        />
      );
    case "custom":
      return React.cloneElement(props.custom as React.ReactElement, {
        id: props.id,
        label: props.label,
        ...(props.helperText
          ? { helperText: props.helperText || undefined }
          : {}),
        ...(props.error ? { error: props.error || undefined } : {}),
        onChange: props.onChange,
        value: props.value,
        ...(props.custom as React.ReactElement).props,
      });

    default:
      return <div></div>;
  }
};

export default InputControl;
