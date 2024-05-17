import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import SaleHomeRb from "./SaleHomeRb";

import createPolicyService from "./services/createPolicy";
import getPaymentInfoService from "./services/getPaymentInfo";
import paymentService from "./services/payment";
import getPolicyService from "./services/getPolicy";
import updatePolicyFuncService from "./services/updatePolicyFunc";
import getCparamsService from "./services/getCparams";
import getPackagesService from "./services/getPackages";
import getProvincesService from "./services/getProvinces";
import getPaymentMethodsService from "./services/getPaymentMethods";
import getStaffInfoService from "./services/getStaffInfo";
import getOrganizationHierarchiesService from "./services/getOrganizationHierarchies";
import getOrganizationAllService from "./services/getOrganizationAll";

const queryClient = new QueryClient();

export default {
  title: "components/sales/SaleHomeRb",
  component: SaleHomeRb,
  argTypes: {
    onChange: {},
    onClick: {},
  },
} as ComponentMeta<typeof SaleHomeRb>;

const Template: ComponentStory<typeof SaleHomeRb> = (args) => (
  <QueryClientProvider client={queryClient}>
    <SaleHomeRb {...args} />
    <ToastContainer limit={3} />
  </QueryClientProvider>
);
//
export const Default = Template.bind({});
Default.args = {
  resourceCode: "PROG_RB_HOME_V2.1697255588441",
  progCode: "PROG_RB_HOME_V2",
  // polSumId: 276618,
  createPolicyService,
  getPaymentInfoService,
  paymentService,
  getPolicyService,
  updatePolicyFuncService,
  getCparamsService,
  getPackagesService,
  getProvincesService,
  getPaymentMethodsService,
  getStaffInfoService,
  getOrganizationHierarchiesService,
  saleId: 113,
  getOrganizationAllService,
};
