import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import InputOtp from "./InputOtp";

export default {
  title: "components/inputs/InputOtp",
  component: InputOtp,
  argTypes: {
    onChange: {},
    onClick: {},
  },
} as ComponentMeta<typeof InputOtp>;

const Template: ComponentStory<typeof InputOtp> = (args) => (
  <InputOtp {...args} />
);

export const Default = Template.bind({});
Default.args = {
  id: "label",
  label: "Label",
  helperText: "Label helper",
  error: false,
  numFields: 6,
  focus: true,
  disabled: false,
  seconds: 15,
  start: false,
  onComplete: () => {
    console.log(3);
  }
};
