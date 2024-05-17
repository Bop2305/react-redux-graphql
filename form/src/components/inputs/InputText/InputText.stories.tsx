import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import InputText from "./InputText";

export default {
  title: "components/inputs/InputText",
  component: InputText,
  argTypes: {
    onChange: {},
    onFocus: {},
    onBlur: {},
    iconPosition: {
      options: ["start", "end"],
      control: { type: "radio" },
    },
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
  disabled: false,
  icon: "",
  defaultValue: "Label value",
  iconPosition: "end",
  multiline: false,
  rows: 1,
};
