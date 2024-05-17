import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import SaleFdc from "./SaleFdc";

import getProgramsService from "services/getPrograms";
import getPlaceOrderInitService from "services/getPlaceOrderInit";
import getListFlightNoService from "services/getListFlightNo";
import checkPriceService from "services/checkPrice";
import createPolicyFdcService from "services/createPolicyFdc";
import checkCouponService from "services/checkCoupon";
import getPaymentInfoService from "services/getPaymentInfo";
import paymentService from "services/payment";
import verifyPhoneExistsService from "services/verifyPhoneExists";
import newMainProfileService from "services/newMainProfile";
import getCouponsService from "services/getCoupons";

const queryClient = new QueryClient();

export default {
  title: "components/sales/SaleFdc",
  component: SaleFdc,
  argTypes: {
    onChange: {},
    onClick: {},
  },
} as ComponentMeta<typeof SaleFdc>;

const Template: ComponentStory<typeof SaleFdc> = (args) => (
  <QueryClientProvider client={queryClient}>
    <SaleFdc {...args} />
    <ToastContainer limit={3} />
  </QueryClientProvider>
);

export const Default = Template.bind({});
Default.args = {
  getProgramsService: getProgramsService,
  getPlaceOrderInitService: getPlaceOrderInitService,
  getListFlightNoService: getListFlightNoService,
  checkPriceService: checkPriceService,
  createPolicyService: createPolicyFdcService,
  checkCouponService: checkCouponService,
  getPaymentInfoService: getPaymentInfoService,
  paymentService: paymentService,
  verifyPhoneExistsService: verifyPhoneExistsService,
  newMainProfileService: newMainProfileService,
  getCouponsService: getCouponsService,
  defaultValues: {
    // buyerName: "Đặng Thu Hoà",
    // buyerEmail: "hoa.dang@opes.com.vn",
    // buyerPhone: "0352587591",
    // buyerIdNo: "031094003945",
    // buyerBirthday: "1994-07-25T17:00:00Z",
  },
  blocked: true,
  onVerifyPhoneExists: () => {},
  onNextStep: (step: any) => {},
};
