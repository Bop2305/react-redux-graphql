import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { BackendOcarProps } from "./BackendOcar";
import BackendOcar from "./BackendOcar";

const queryClient = new QueryClient();
const BackendOcarWrapper = (props: BackendOcarProps) => {
  return <BackendOcar {...props} />;
};

export default {
  title: "components/backend/BackendOcar",
  component: BackendOcarWrapper,
  argTypes: {
    onChange: {},
    onClick: {},
  },
} as ComponentMeta<typeof BackendOcarWrapper>;

const Template: ComponentStory<typeof BackendOcarWrapper> = (args) => (
  <QueryClientProvider client={queryClient}>
    <BackendOcarWrapper {...args} />
    <ToastContainer limit={3} />
  </QueryClientProvider>
);

export const Default = Template.bind({});
Default.args = {};
