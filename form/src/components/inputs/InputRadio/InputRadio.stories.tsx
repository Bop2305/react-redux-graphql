import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import InputRadio from "./InputRadio";
import RadioLabelBox from "./radioLabels/RadioLabelBox";
import RadioLabelRadius from "./radioLabels/RadioLabelRadius";
import useStylesInputRadio from "./useStylesInputRadio";

export default {
  title: "components/inputs/InputRadio",
  component: InputRadio,
  argTypes: {
    onChange: {},
  },
} as ComponentMeta<typeof InputRadio>;

const Template: ComponentStory<typeof InputRadio> = (args) => {
  // const useStyles = makeStyles((theme) => ({
  //   classRadioGroupRadius: {
  //     display: "flex !important",
  //     border: `1px solid ${grey[300]}`,
  //     padding: 4,
  //     borderRadius: 100,
  //   },
  //   classRadioRadius: {
  //     flex: 1,
  //   },
  // }));
  const classes = useStylesInputRadio();

  return (
    <InputRadio
      {...args}
      classRadioGroup={(classes as any)?.[args.classRadioGroup as any]}
      classRadio={(classes as any)?.[args.classRadio as any]}
    />
  );
};

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
  defaultValue: 2,
  disabled: false,
  row: false,
};

export const LabelBox = Template.bind({});
LabelBox.args = {
  id: "label",
  options: [
    { label: <RadioLabelBox label="1" />, value: 1 },
    { label: <RadioLabelBox label="2" />, value: 2 },
  ],
  label: "Label",
  helperText: "Label helper",
  error: false,
  defaultValue: 2,
  disabled: false,
  row: false,
};

export const LabelRadius = Template.bind({});
LabelRadius.args = {
  id: "label",
  options: [
    { label: <RadioLabelRadius label="1" />, value: 1 },
    { label: <RadioLabelRadius label="2" />, value: 2 },
  ],
  label: "Label",
  helperText: "Label helper",
  error: false,
  defaultValue: 2,
  disabled: false,
  row: true,
  classRadioGroup: "classRadioGroupRadius",
  classRadio: "classRadioRadius",
};
