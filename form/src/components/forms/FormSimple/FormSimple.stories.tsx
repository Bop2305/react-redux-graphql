import React from "react";
import { useForm } from "react-hook-form";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import FormSimple from "./FormSimple";

type FormSimpleProps = {
  inputsConfig: any;
  inputsWrapperClass: string;
  btnLabel: string;
  component: string;
  onSubmit: (data: any) => void;
};

const FormSimpleWrapper = (props: FormSimpleProps) => {
  const useFormResult = useForm();

  return (
    <FormSimple
      onSubmit={(data) => {
        console.log(data);
      }}
      component="div"
      // useFormResult={useFormResult}
      showResetButton={true}
      inputsConfig={[
        {
          type: "text",
          id: "√",
          label: "Text",
          defaultValue: "Text",
          validations: ["required"],
          onChange: (e: any) => {
            useFormResult.setValue("textarea", e?.target?.value);
          },
        },
        {
          type: "password",
          id: "password",
          label: "Password",
          validations: ["required"],
        },
        {
          type: "textarea",
          id: "textarea",
          label: "Textarea",
          validations: ["required"],
        },
        {
          type: "currency",
          id: "currency",
          label: "Currency",
          validations: ["required"],
        },
        {
          type: "select",
          id: "select",
          label: "Select",
          options: [
            { label: "1", value: 1 },
            { label: "2", value: 2 },
          ],
          validations: ["required"],
        },
        {
          type: "radio",
          id: "radio",
          label: "Radio",
          row: true,
          options: [
            { label: "1", value: 1 },
            { label: "2", value: 2 },
          ],
          validations: ["required"],
        },
        {
          type: "date",
          id: "date",
          label: "Date",
          validations: ["date"],
        },
        {
          type: "checkbox",
          id: "checkbox",
          label: "Checkbox",
          row: true,
          options: [
            { label: "1", value: 1 },
            { label: "2", value: 2 },
          ],
          validations: ["required"],
        },
        {
          type: "autocomplete",
          id: "autocomplete",
          label: "Autocomplete",
          options: [
            { label: "1", value: 1 },
            { label: "2", value: 2 },
          ],
          validations: ["required"],
        },
        {
          type: "switch",
          id: "switch",
          label: "Switch",
          switchLabel: "Switch label",
          checkedValue: true,
          unCheckedValue: false,
          validations: ["required"],
        },
        {
          type: "otp",
          id: "otp",
          label: "Otp",
          numFields: 6,
          seconds: 5,
          start: false,
          validations: ["required"],
        },
      ]}
    />
  );
};

export default {
  title: "components/forms/FormSimple",
  component: FormSimpleWrapper,
  argTypes: {},
} as ComponentMeta<typeof FormSimpleWrapper>;

const Template: ComponentStory<typeof FormSimpleWrapper> = (args) => (
  <FormSimpleWrapper {...args} />
);

export const Default = Template.bind({});
Default.args = {};
