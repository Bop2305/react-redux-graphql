import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import InputSelect from "./InputSelect";

export default {
  title: "components/inputs/InputSelect",
  component: InputSelect,
  argTypes: {
    onChange: {},
  },
} as ComponentMeta<typeof InputSelect>;

const Template: ComponentStory<typeof InputSelect> = (args) => (
  <InputSelect {...args} />
);

export const Default = Template.bind({});
Default.args = {
  id: "label",
  options: [
    { label: "1", value: 1 },
    { label: "2", value: 2 },
  ],
  label: "Label",
  helperText: "Label helper",
  error: false,
  disabled: false,
  defaultValue: 1,
};
