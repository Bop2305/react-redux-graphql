import React, { useState } from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import InputEditor from "./InputEditor";

import uploadService from "./services/uploadFiles";

export default {
  title: "components/inputs/InputEditor",
  component: InputEditor,
  argTypes: {
    onChange: {},
    onFocus: {},
    onBlur: {},
  },
} as ComponentMeta<typeof InputEditor>;

const Template: ComponentStory<typeof InputEditor> = (args) => {
  const [value, setValue] = useState(args?.defaultValue);

  if (!value) {
    setTimeout(() => {
      setValue("234123");
    }, 3000);
  }

  return (
    <>
      <button type="button" onClick={() => setValue("<p>123121</p>")}>
        123
      </button>
      <InputEditor
        {...args}
        value={value}
        onChange={(e) => {
          setValue(e?.target?.value);
        }}
      />
    </>
  );
};
export const Default = Template.bind({});
Default.args = {
  id: "label",
  label: "Label",
  helperText: "Label helper",
  error: false,
  disabled: false,
  // defaultValue: "Label value",
  autoFocus: true,
  uploadService: uploadService,
};
