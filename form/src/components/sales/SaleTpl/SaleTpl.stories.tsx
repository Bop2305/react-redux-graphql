import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import SaleTpl from "./SaleTpl";

import getProgramsService from "services/getPrograms";
import getPlaceOrderInitService from "services/getPlaceOrderInit";
import getProvincesService from "services/getProvinces";
import createPolicyService from "services/createPolicy";
import checkCoupon from "services/checkCoupon";
import getPaymentInfoService from "services/getPaymentInfo";
import paymentService from "services/payment";
import verifyPhoneExistsService from "services/verifyPhoneExists";
import newMainProfileService from "services/newMainProfile";
import getCouponsService from "services/getCoupons";
import ocrService from "services/ocr";

const queryClient = new QueryClient();

export default {
  title: "components/sales/SaleTpl",
  component: SaleTpl,
  argTypes: {
    onChange: {},
    onClick: {},
  },
} as ComponentMeta<typeof SaleTpl>;

const Template: ComponentStory<typeof SaleTpl> = (args) => (
  <QueryClientProvider client={queryClient}>
    <SaleTpl {...args} />
    <ToastContainer limit={3} />
  </QueryClientProvider>
);

export const TplZutto = Template.bind({});
TplZutto.args = {
  getProgramsService: getProgramsService,
  getPlaceOrderInitService: getPlaceOrderInitService,
  getProvincesService: getProvincesService,
  createPolicyService: createPolicyService,
  checkCouponService: checkCoupon,
  getPaymentInfoService: getPaymentInfoService,
  paymentService: paymentService,
  // verifyPhoneExistsService: verifyPhoneExistsService,
  newMainProfileService: newMainProfileService,
  getCouponsService: getCouponsService,
  onNextStep: (step: any, screen: any) => {},
  // defaultValues: {
  //   ownerFullName: "OPES2",
  //   ownerEmail: "tungpt260794@gmail.com",
  //   ownerPhoneNumber: "0352587591",
  // },
  // blocked: true,
  typeFlow: "moto-zutto",
  onVerifyPhoneExists: () => {},
  hideConfirm: true,
  ocrService: async ({ file }: any) =>
    await ocrService({
      file: file,
      fileKey: "file",
      ocrType: "cert",
    }),
};

export const TplMoto = Template.bind({});
TplMoto.args = {
  getProgramsService: getProgramsService,
  getPlaceOrderInitService: getPlaceOrderInitService,
  getProvincesService: getProvincesService,
  createPolicyService: createPolicyService,
  checkCouponService: checkCoupon,
  getPaymentInfoService: getPaymentInfoService,
  paymentService: paymentService,
  verifyPhoneExistsService: verifyPhoneExistsService,
  newMainProfileService: newMainProfileService,
  getCouponsService: getCouponsService,
  onNextStep: (step: any, screen: any) => {},
  defaultValues: {
    ownerFullName: "OPES2",
    ownerEmail: "tungpt260794@gmail.com",
    ownerPhoneNumber: "0352587591",
  },
  blocked: true,
  typeFlow: "car",
  onVerifyPhoneExists: () => {},
  ocrService: async ({ file }: any) =>
    await ocrService({
      file: file,
      fileKey: "file",
      ocrType: "cert",
    }),
};

export const TplCar = Template.bind({});
TplCar.args = {
  getProgramsService: getProgramsService,
  getPlaceOrderInitService: getPlaceOrderInitService,
  getProvincesService: getProvincesService,
  createPolicyService: createPolicyService,
  checkCouponService: checkCoupon,
  getPaymentInfoService: getPaymentInfoService,
  paymentService: paymentService,
  verifyPhoneExistsService: verifyPhoneExistsService,
  newMainProfileService: newMainProfileService,
  getCouponsService: getCouponsService,
  onNextStep: (step: any, screen: any) => {},
  // defaultValues: {
  //   ownerFullName: "OPES2",
  //   ownerEmail: "tungpt260794@gmail.com",
  //   ownerPhoneNumber: "0352587591",
  // },
  blocked: true,
  typeFlow: "car",
  onVerifyPhoneExists: () => {},
  ocrService: async ({ file }: any) =>
    await ocrService({
      file: file,
      fileKey: "file",
      ocrType: "cert",
    }),
};
