import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import SaleHome from "./SaleHome";

import getProgramsService from "services/getPrograms";
import getPlaceOrderInitService from "services/getPlaceOrderInit";
import getCouponsService from "services/getCoupons";
import createPolicyService from "services/createPolicy";
import checkCouponService from "services/checkCoupon";
import getProvincesService from "services/getProvinces";
import verifyPhoneExistsService from "services/verifyPhoneExists";
import paymentService from "services/payment";
import getPaymentInfoService from "services/getPaymentInfo";

const queryClient = new QueryClient();

export default {
  title: "components/sales/SaleHome",
  component: SaleHome,
  argTypes: {
    onChange: {},
    onClick: {},
  },
} as ComponentMeta<typeof SaleHome>;

const Template: ComponentStory<typeof SaleHome> = (args) => (
  <QueryClientProvider client={queryClient}>
    <SaleHome {...args} />
    <ToastContainer limit={3} />
  </QueryClientProvider>
);

export const Default = Template.bind({});
Default.args = {
  getProgramsService,
  getPlaceOrderInitService,
  getCouponsService,
  createPolicyService,
  checkCouponService,
  getProvincesService,
  paymentService: paymentService,
  getPaymentInfoService: getPaymentInfoService,
  // verifyPhoneExistsService,
  defaultValues: {
    buyerName: "OPES2",
    buyerEmail: "tungpt260794@gmail.com",
    buyerPhone: "0352587591",
  },
  blocked: true,
  onVerifyPhoneExists: (value: any) => {
    console.log(value);
  },
};
