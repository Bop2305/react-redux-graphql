import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import SalePa from "./SalePa";

import getProgramsService from "services/getPrograms";
import getPlaceOrderInitService from "services/getPlaceOrderInit";
import createPolicyService from "services/createPolicy";
import checkCouponService from "services/checkCoupon";
import getPaymentInfoService from "services/getPaymentInfo";
import paymentService from "services/payment";
import verifyPhoneExistsService from "services/verifyPhoneExists";
import newMainProfileService from "services/newMainProfile";
import getCouponsService from "services/getCoupons";

const queryClient = new QueryClient();

export default {
  title: "components/sales/SalePa",
  component: SalePa,
  argTypes: {
    onChange: {},
    onClick: {},
  },
} as ComponentMeta<typeof SalePa>;

const Template: ComponentStory<typeof SalePa> = (args) => (
  <QueryClientProvider client={queryClient}>
    <SalePa {...args} />
    <ToastContainer limit={3} />
  </QueryClientProvider>
);

export const Default = Template.bind({});
Default.args = {
  getProgramsService: getProgramsService,
  getPlaceOrderInitService: getPlaceOrderInitService,
  createPolicyService: createPolicyService,
  checkCouponService: checkCouponService,
  getPaymentInfoService: getPaymentInfoService,
  paymentService: paymentService,
  verifyPhoneExistsService: verifyPhoneExistsService,
  newMainProfileService: newMainProfileService,
  getCouponsService: getCouponsService,
  onNextStep: (step: any, screen: any) => {},
  // defaultValues: {
  //   ownerFullName: "PHAN THANH TÙNG",
  //   ownerEmail: "tungpt260794@gmail.com",
  //   ownerPhoneNumber: "0352587591",
  //   ownerIdNo: "031094003945",
  //   ownerBirthday: "1994-07-25T17:00:00Z",
  // },
  blocked: true,
  onVerifyPhoneExists: () => {},
};
