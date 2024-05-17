import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import InputCheckbox from "./InputCheckbox";
import CheckboxLabelBox from "./checkBoxLabels/CheckboxLabelBox";

export default {
  title: "components/inputs/InputCheckbox",
  component: InputCheckbox,
  argTypes: {
    onChange: {},
  },
} as ComponentMeta<typeof InputCheckbox>;

const Template: ComponentStory<typeof InputCheckbox> = (args) => (
  <InputCheckbox {...args} />
);

export const DefaultMultiple = Template.bind({});
DefaultMultiple.args = {
  id: "label",
  options: [
    { label: "1", value: 1 },
    { label: "2", value: 2 },
  ],
  label: "Label",
  helperText: "Label helper",
  error: false,
  defaultValue: [2],
  disabled: false,
  row: false,
};

export const DefaultSingle = Template.bind({});
DefaultSingle.args = {
  id: "label",
  options: [{ label: "1", value: true }],
  label: "Label",
  helperText: "Label helper",
  error: false,
  defaultValue: true,
  disabled: false,
  row: false,
};

export const LabelBoxMultiple = Template.bind({});
LabelBoxMultiple.args = {
  id: "label",
  options: [
    { label: <CheckboxLabelBox label="1" />, value: 1 },
    { label: <CheckboxLabelBox label="2" />, value: 2 },
  ],
  label: "Label",
  helperText: "Label helper",
  error: false,
  defaultValue: [1, 2],
  disabled: false,
  row: false,
};

export const LabelBoxSingle = Template.bind({});
LabelBoxSingle.args = {
  id: "label",
  options: [{ label: <CheckboxLabelBox label="1" />, value: true }],
  label: "Label",
  helperText: "Label helper",
  error: false,
  defaultValue: true,
  disabled: false,
  row: false,
};
