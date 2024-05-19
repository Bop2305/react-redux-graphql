import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import SaleCrlMorRb from "./SaleCrlMorRb";

import createPolicyService from "./services/createPolicy";
import getPaymentInfoService from "./services/getPaymentInfo";
import paymentService from "./services/payment";
import getPolicyService from "./services/getPolicy";
import updatePolicyFuncService from "./services/updatePolicyFunc";
import getCparamsService from "./services/getCparams";

const queryClient = new QueryClient();

export default {
  title: "components/sales/SaleCrlMorRb",
  component: SaleCrlMorRb,
  argTypes: {
    onChange: {},
    onClick: {},
  },
} as ComponentMeta<typeof SaleCrlMorRb>;

const Template: ComponentStory<typeof SaleCrlMorRb> = (args) => (
  <QueryClientProvider client={queryClient}>
    <SaleCrlMorRb {...args} />
    <ToastContainer limit={3} />
  </QueryClientProvider>
);

export const Default = Template.bind({});
Default.args = {
  resourceCode: "PROG_RB_CRL_MOR.1694490594440",
  // polSumId: 276618,
  createPolicyService,
  getPaymentInfoService,
  paymentService,
  getPolicyService,
  updatePolicyFuncService,
  getCparamsService,
};
