import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import SaleTplSeaBank from "./SaleTplSeaBank";

import getProgramListService from "./services/getProgramList";
import getPlaceOrderInitService from "./services/getPlaceOrderInit";
import getProvincesService from "./services/getProvinces";
import createPolicyService from "./services/createPolicy";
import checkCoupon from "./services/checkCoupon";
import getCouponsService from "./services/getCoupons";
import getPaymentInfoService from "./services/getPaymentInfo";
import paymentService from "./services/payment";
import ocrService from "./services/ocr";

const queryClient = new QueryClient();

export default {
  title: "components/sales/SaleTplSeaBank",
  component: SaleTplSeaBank,
  argTypes: {
    onChange: {},
    onClick: {},
  },
} as ComponentMeta<typeof SaleTplSeaBank>;

const Template: ComponentStory<typeof SaleTplSeaBank> = (args) => (
  <QueryClientProvider client={queryClient}>
    <SaleTplSeaBank {...args} />
    <ToastContainer limit={3} />
  </QueryClientProvider>
);

const gid = "og.opes-form";
const cid = "oc.opes-form";

export const TplZutto = Template.bind({});
TplZutto.args = {
  getProvincesService: async () => await getProvincesService(),
  getProgramsService: async () => await getProgramListService(),
  getPlaceOrderInitService: async ({ resourceCode }) =>
    await getPlaceOrderInitService({
      resourceCode,
    }),
  checkCouponService: async ({ resourceCode, discountCode }) =>
    await checkCoupon({
      resourceCode,
      discountCode,
    }),
  getCouponsService: async ({ resourceCode }) => {
    return await getCouponsService({
      resourceCode,
    });
  },
  createPolicyService: async (data) => {
    return await createPolicyService({
      ...data,
      body: data,
    });
  },
  getPaymentInfoService: async ({ goodCode, discountCodes }) =>
    await getPaymentInfoService({
      goodCode,
      discountCodes,
    }),
  paymentService: async ({
    goodCode,
    discountCodes,
    paymentMethod,
    failureUrl,
    successUrl,
  }: any) =>
    await paymentService({
      goodCode,
      discountCodes,
      paymentMethod,
      failureUrl,
      successUrl,
    }),
  typeFlow: "moto-zutto",
  hideConfirm: true,
};

export const TplMoto = Template.bind({});
TplMoto.args = {
  getProvincesService: async () => await getProvincesService(),
  getProgramsService: async () => await getProgramListService(),
  getPlaceOrderInitService: async ({ resourceCode }) =>
    await getPlaceOrderInitService({
      resourceCode,
    }),
  checkCouponService: async ({ resourceCode, discountCode }) =>
    await checkCoupon({
      resourceCode,
      discountCode,
    }),
  getCouponsService: async ({ resourceCode }) => {
    return await getCouponsService({
      resourceCode,
    });
  },
  createPolicyService: async (data) => {
    return await createPolicyService({
      ...data,
      body: data,
    });
  },
  getPaymentInfoService: async ({ goodCode, discountCodes }) =>
    await getPaymentInfoService({
      goodCode,
      discountCodes,
    }),
  paymentService: async ({
    goodCode,
    discountCodes,
    paymentMethod,
    failureUrl,
    successUrl,
  }: any) =>
    await paymentService({
      goodCode,
      discountCodes,
      paymentMethod,
      failureUrl,
      successUrl,
    }),
  ocrService: async ({ file }: any) =>
    await ocrService({
      file: file,
      fileKey: "file",
      ocrType: "cert",
    }),
  typeFlow: "moto",
};

export const TplCar = Template.bind({});
TplCar.args = {
  getProvincesService: async () => await getProvincesService(),
  getProgramsService: async () => await getProgramListService(),
  getPlaceOrderInitService: async ({ resourceCode }) =>
    await getPlaceOrderInitService({
      resourceCode,
    }),
  checkCouponService: async ({ resourceCode, discountCode }) =>
    await checkCoupon({
      resourceCode,
      discountCode,
    }),
  getCouponsService: async ({ resourceCode }) => {
    return await getCouponsService({
      resourceCode,
    });
  },
  createPolicyService: async (data) => {
    return await createPolicyService({
      ...data,
      body: data,
    });
  },
  getPaymentInfoService: async ({ goodCode, discountCodes }) =>
    await getPaymentInfoService({
      goodCode,
      discountCodes,
    }),
  paymentService: async ({
    goodCode,
    discountCodes,
    paymentMethod,
    failureUrl,
    successUrl,
  }: any) =>
    await paymentService({
      goodCode,
      discountCodes,
      paymentMethod,
      failureUrl,
      successUrl,
    }),
  ocrService: async ({ file }: any) =>
    await ocrService({
      file: file,
      fileKey: "file",
      ocrType: "cert",
    }),
  typeFlow: "car",
};
