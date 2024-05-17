import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import TransferCore from "./TransferCore";

import getPaymentDetailService from "services/getPaymentDetail";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient();

export default {
  title: "components/TransferCore",
  component: TransferCore,
} as ComponentMeta<typeof TransferCore>;

const Template: ComponentStory<typeof TransferCore> = (args) => (
  <QueryClientProvider client={queryClient}>
    <TransferCore {...args} />
    <ToastContainer limit={3} />
  </QueryClientProvider>
);

export const Default = Template.bind({});
Default.args = {
  minHeight: "calc(100vh - 40px)",
  getPaymentDetailService,
  goodCode: "14143",
};
