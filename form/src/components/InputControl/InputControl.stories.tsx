import React, { useState } from "react";
import dayjs from "dayjs";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { SelectChangeEvent } from "@mui/material";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import RdLabelBox from "components/inputs/InputRadio/radioLabels/RadioLabelBox";
import CbLabelBox from "components/inputs/InputCheckbox/checkBoxLabels/CheckboxLabelBox";
import ImageInspectionC from "components/ImageInspection";

import InputControl from "./InputControl";

type InputControlWrapperProps = {
  id: string;
  type: string;
  label: string;
  helperText: string;
  error: boolean;
  disabled: boolean;
  value:
    | Array<string | number | boolean>
    | string
    | number
    | boolean
    | undefined;
  defaultValue:
    | Array<string | number | boolean>
    | string
    | number
    | boolean
    | undefined;
  icon: React.ReactNode;
  iconPosition: "start" | "end";
  rows: number;
  row: boolean;
  classItem: string;
  classGroup: string;
  options: {
    group?: string;
    label: string | React.ReactElement;
    value: string | number | boolean;
    disabled?: boolean;
    fixed?: boolean;
    [key: string]: any;
  }[];
  min: any;
  max: any;
  openTo: "day" | "year";
  multiple: boolean;
  limitTags: number;
  freeSolo: boolean;
  custom: React.ReactElement;
  group: boolean;
  filterSelectedOptions: boolean;
  checkbox: boolean;
  switchLabel: string;
  checkedValue: string | number | boolean;
  unCheckedValue: string | number | boolean;
  numFields: number;
  focus: boolean;
  onClick: any;
  seconds: number;
  start: boolean;
  labelAction?: any;
  onChange:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | ((
        event: SelectChangeEvent<string | number>,
        child: React.ReactNode
      ) => void);
  onBlur: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onFocus: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
};

const InputControlWrapper = (props: InputControlWrapperProps) => {
  const [value, setValue] = useState("");
  console.log(value);

  return (
    <InputControl
      {...props}
      value={value}
      onChange={(e: any) => {
        setValue(e?.target?.value);
      }}
    />
  );
};

export default {
  title: "components/InputControl",
  component: InputControlWrapper,
  argTypes: {
    onChange: {},
    onFocus: {},
    onBlur: {},
    iconPosition: {
      options: ["start", "end"],
      control: { type: "radio" },
    },
    openTo: {
      options: ["day", "year"],
      control: { type: "radio" },
    },
  },
} as ComponentMeta<typeof InputControlWrapper>;

const Template: ComponentStory<typeof InputControlWrapper> = (args) => (
  <InputControlWrapper {...args} />
);

export const Text = Template.bind({});
Text.args = {
  type: "text",
  id: "label",
  label: "Label",
  helperText: "Label helper",
  error: false,
  disabled: false,
};

export const Action = Template.bind({});
Action.args = {
  type: "action",
  id: "label",
  label: "Label",
  helperText: "Label helper",
  error: false,
  disabled: false,
  labelAction: "Click",
};

export const Password = Template.bind({});
Password.args = {
  type: "password",
  id: "label",
  label: "Label",
  helperText: "Label helper",
  error: false,
  disabled: false,
};

export const TextArea = Template.bind({});
TextArea.args = {
  type: "textarea",
  id: "label",
  label: "Label",
  helperText: "Label helper",
  error: false,
  disabled: false,
};

export const Currency = Template.bind({});
Currency.args = {
  type: "currency",
  id: "label",
  label: "Label",
  helperText: "Label helper",
  error: false,
  disabled: false,
};

export const Select = Template.bind({});
Select.args = {
  type: "select",
  id: "label",
  label: "Label",
  helperText: "Label helper",
  error: false,
  disabled: false,
  options: [
    { label: "1", value: 1 },
    { label: "2", value: 2 },
  ],
};

export const RadioDefault = Template.bind({});
RadioDefault.args = {
  type: "radio",
  id: "label",
  label: "Label",
  helperText: "Label helper",
  error: false,
  disabled: false,
  row: false,
  defaultValue: 1,
  options: [
    { label: "1", value: 1 },
    { label: "2", value: 2 },
  ],
};

export const RadioLabelBox = Template.bind({});
RadioLabelBox.args = {
  type: "radio",
  id: "label",
  label: "Label",
  helperText: "Label helper",
  error: false,
  disabled: false,
  row: false,
  defaultValue: 1,
  options: [
    { label: <RdLabelBox label="1" />, value: 1 },
    { label: <RdLabelBox label="2" />, value: 2 },
  ],
};

export const Date = Template.bind({});
Date.args = {
  type: "date",
  id: "label",
  label: "Label",
  helperText: "Label helper",
  error: false,
  disabled: false,
  min: dayjs().toDate(),
  max: dayjs().subtract(-5, "day").toDate(),
  openTo: "year",
};

export const DateTime = Template.bind({});
DateTime.args = {
  type: "datetime",
  id: "label",
  label: "Label",
  helperText: "Label helper",
  error: false,
  disabled: false,
};

export const CheckboxDefaultMultiple = Template.bind({});
CheckboxDefaultMultiple.args = {
  type: "checkbox",
  id: "label",
  label: "Label",
  helperText: "Label helper",
  error: false,
  disabled: false,
  row: false,
  defaultValue: [1],
  options: [
    { label: "1", value: 1 },
    { label: "2", value: 2 },
  ],
};

export const CheckboxDefaultSingle = Template.bind({});
CheckboxDefaultSingle.args = {
  type: "checkbox",
  id: "label",
  label: "Label",
  helperText: "Label helper",
  error: false,
  disabled: false,
  row: false,
  defaultValue: true,
  options: [{ label: "1", value: true }],
};

export const CheckboxLabelBoxMultiple = Template.bind({});
CheckboxLabelBoxMultiple.args = {
  type: "checkbox",
  id: "label",
  label: "Label",
  helperText: "Label helper",
  error: false,
  disabled: false,
  row: false,
  defaultValue: [1, 2],
  options: [
    { label: <CbLabelBox label="1" />, value: 1 },
    { label: <CbLabelBox label="2" />, value: 2 },
  ],
};

export const CheckboxLabelBoxSingle = Template.bind({});
CheckboxLabelBoxSingle.args = {
  type: "checkbox",
  id: "label",
  label: "Label",
  helperText: "Label helper",
  error: false,
  disabled: false,
  row: false,
  defaultValue: true,
  options: [{ label: <CbLabelBox label="1" />, value: true }],
};

export const Autocomplete = Template.bind({});
Autocomplete.args = {
  type: "autocomplete",
  id: "label",
  options: [
    { label: "The Shawshank Redemption", value: 1999 },
    { label: "The Godfather", value: 1972 },
    { label: "The Godfather: Part II", value: 1974 },
    { label: "The Dark Knight", value: 2008 },
    { label: "12 Angry Men", value: 1957 },
    { label: "Schindler's List", value: 1993 },
    { label: "Pulp Fiction", value: 1994 },
  ],
  label: "Label",
  helperText: "Label helper",
  error: false,
  disabled: false,
  defaultValue: 1974,
  multiple: true,
  filterSelectedOptions: true,
  onClick: (it: any) => {
    console.log(it);
  },
};

export const Switch = Template.bind({});
Switch.args = {
  type: "switch",
  id: "label",
  label: "Label",
  helperText: "Label helper",
  error: false,
  disabled: false,
  switchLabel: "Switch label",
  checkedValue: true,
  unCheckedValue: false,
};

export const Otp = Template.bind({});
Otp.args = {
  type: "otp",
  id: "label",
  label: "Label",
  helperText: "Label helper",
  error: false,
  numFields: 6,
  focus: true,
  disabled: false,
  seconds: 5,
  start: false,
};

const queryClient = new QueryClient();
export const ImageInspection = Template.bind({});
ImageInspection.args = {
  type: "custom",
  custom: (
    <QueryClientProvider client={queryClient}>
      <ImageInspectionC
        id="label"
        label="Label"
        helperText="Label helper"
        error={false}
        domainLinkFile={""}
      />
    </QueryClientProvider>
  ),
};
