import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import InputList from "./InputList";
import ListItemValue from "./listLabels/ListItemValue";

export default {
  title: "components/inputs/InputList",
  component: InputList,
  argTypes: {
    onChange: {},
  },
} as ComponentMeta<typeof InputList>;

const Template: ComponentStory<typeof InputList> = (args) => (
  <InputList {...args} />
);

export const Default = Template.bind({});
Default.args = {
  id: "label",
  label: "Label",
  helperText: "Label helper",
  error: false,
  inputsConfig: [
    { id: "name", type: "text", label: "Họ và tên", validations: ["required"] },
  ],
  defaultValue: [{ name: 123 }],
};

export const OnlyValue = Template.bind({});
OnlyValue.args = {
  id: "label",
  label: "Label",
  helperText: "Label helper",
  error: false,
  itemCustom: <ListItemValue />,
  inputsConfig: [
    {
      id: "name",
      type: "text",
      label: "Họ và tên",
      validations: ["required"],
      fontWeight: "bold",
    },
    {
      id: "age",
      type: "text",
      label: "Tuổi",
      validations: ["required"],
    },
  ],
  defaultValue: [{ name: 123 }],
};
