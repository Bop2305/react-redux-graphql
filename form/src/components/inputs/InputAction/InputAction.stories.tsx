import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import InputText from "./InputAction";

export default {
  title: "components/inputs/InputAction",
  component: InputText,
  argTypes: {
    onChange: {},
    onFocus: {},
    onBlur: {},
  },
} as ComponentMeta<typeof InputText>;

const Template: ComponentStory<typeof InputText> = (args) => (
  <InputText {...args} />
);

export const Default = Template.bind({});
Default.args = {
  id: "label",
  label: "Label",
  helperText: "Label helper",
  error: false,
  disabled: true,
  defaultValue: "Label value",
  labelAction: "Click",
  onClick: (value) => {
    console.log(value);
  },
};
