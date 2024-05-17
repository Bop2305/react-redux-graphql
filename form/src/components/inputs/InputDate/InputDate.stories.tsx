import React from "react";
import dayjs from "dayjs";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import InputDate from "./InputDate";

export default {
  title: "components/inputs/InputDate",
  component: InputDate,
  argTypes: {
    onChange: {},
    onBlur: {},
    onFocus: {},
    openTo: {
      options: ["day", "year"],
      control: { type: "radio" },
    },
  },
} as ComponentMeta<typeof InputDate>;

const Template: ComponentStory<typeof InputDate> = (args) => (
  <InputDate {...args} />
);

export const Default = Template.bind({});
Default.args = {
  id: "label",
  label: "Label",
  helperText: "Label helper",
  error: false,
  disabled: false,
  minDate: dayjs().toDate(),
  maxDate: dayjs().subtract(-5, "day").toDate(),
  openTo: "year",
};
