import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import Stepper from "./Stepper";

export default {
  title: "components/Stepper",
  component: Stepper,
  argTypes: {},
} as ComponentMeta<typeof Stepper>;

const Template: ComponentStory<typeof Stepper> = (args) => (
  <Stepper {...args} />
);

export const Default = Template.bind({});
Default.args = {
  seconds: 10,
  steps: [
    {
      title: "step 1",
      screens: [
        {
          title: "step 1 screen 1",
          inputsConfig: [
            {
              type: "text",
              id: "text1",
              label: "Text",
              defaultValue: "Text",
              validations: ["required"],
            },
          ],
        },
        {
          title: "step 1 screen 2",
          inputsConfig: [
            {
              type: "text",
              id: "text2",
              label: "Text",
              defaultValue: "Text",
              validations: ["required"],
            },
          ],
        },
      ],
    },
    {
      title: "step 2",
      screens: [
        {
          title: "step 2 screen 1",
          inputsConfig: [
            {
              type: "text",
              id: "text3",
              label: "Text",
              defaultValue: "Text",
            },
          ],
        },
      ],
    },
  ],
};
