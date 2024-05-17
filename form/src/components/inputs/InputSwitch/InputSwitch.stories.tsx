import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import InputSwitch from "./InputSwitch";

export default {
  title: "components/inputs/InputSwitch",
  component: InputSwitch,
  argTypes: {
    onChange: {},
  },
} as ComponentMeta<typeof InputSwitch>;

const Template: ComponentStory<typeof InputSwitch> = (args) => (
  <InputSwitch {...args} />
);

export const Default = Template.bind({});
Default.args = {
  id: "label",
  label: "Label",
  helperText: "Label helper",
  error: false,
  disabled: false,
  switchLabel: "Switch label",
  checkedValue: true,
  unCheckedValue: false,
};
