import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import Transfer from "./Transfer";

import getPaymentInfoService from "services/getPaymentInfo";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient();

export default {
  title: "components/Transfer",
  component: Transfer,
} as ComponentMeta<typeof Transfer>;

const Template: ComponentStory<typeof Transfer> = (args) => (
  <QueryClientProvider client={queryClient}>
    <Transfer {...args} />
    <ToastContainer limit={3} />
  </QueryClientProvider>
);

export const Default = Template.bind({});
Default.args = {
  minHeight: "calc(100vh - 40px)",
  getPaymentInfoService,
  goodCode: "OPESD2C.PA01.G2323075",
};
