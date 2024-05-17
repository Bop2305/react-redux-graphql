import React from "react";
import dayjs from "dayjs";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import InputDateTime from "./InputDateTime";

export default {
  title: "components/inputs/InputDateTime",
  component: InputDateTime,
  argTypes: {
    onChange: {},
    onBlur: {},
    onFocus: {},
    openTo: {
      options: ["day", "year"],
      control: { type: "radio" },
    },
  },
} as ComponentMeta<typeof InputDateTime>;

const Template: ComponentStory<typeof InputDateTime> = (args) => (
  <InputDateTime {...args} />
);

export const Default = Template.bind({});
Default.args = {
  id: "label",
  label: "Label",
  helperText: "Label helper",
  error: false,
  disabled: false,
  openTo: "year",
};
