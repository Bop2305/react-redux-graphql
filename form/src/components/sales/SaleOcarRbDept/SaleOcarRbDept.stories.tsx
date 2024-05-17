import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { SaleOcarRbDeptProps } from "./SaleOcarRbDept";
import SaleOcarRbDept from "./SaleOcarRbDept";

import getProgramsService from "./services/getPrograms";
import getPlaceOrderInitService from "./services/getPlaceOrderInit";
import createPoolService from "./services/createPool";
import submitCarInspectionImageService from "./services/submitCarInspectionImage";
import getCarInspectionResultService from "./services/getCarInspectionResult";
import savePlaceOrderService from "./services/savePlaceOrder";
import saveDraftService from "./services/saveDraft";
import getDraftByOrderIdService from "./services/getDraftByOrderId";

const queryClient = new QueryClient();
const SaleOcarWrapper = (props: SaleOcarRbDeptProps) => {
  return <SaleOcarRbDept {...props} />;
};

export default {
  title: "components/sales/SaleOcarRbDept",
  component: SaleOcarWrapper,
  argTypes: {
    onChange: {},
    onClick: {},
  },
} as ComponentMeta<typeof SaleOcarWrapper>;

const Template: ComponentStory<typeof SaleOcarWrapper> = (args) => (
  <QueryClientProvider client={queryClient}>
    <SaleOcarWrapper {...args} />
    <ToastContainer limit={3} />
  </QueryClientProvider>
);

export const Default = Template.bind({});
Default.args = {
  getProgramsService,
  getPlaceOrderInitService,
  createPoolService,
  savePlaceOrderService,
  domainLinkFile: "https://staging-url.opes.com.vn",
  submitCarInspectionImageService,
  getCarInspectionResultService,
  getDraftByOrderIdService,
  saveDraftService,
  orderId: "aa569d02be12f9e747d88a92c0c39d09",
  onComplete: () => {
    console.log(123);
  },
};
