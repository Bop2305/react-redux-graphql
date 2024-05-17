import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import SaleTplCounter from "./SaleTplCounter";

import getProgramListService from "./services/getProgramList";
import getPlaceOrderInitService from "./services/getPlaceOrderInit";
import getProvincesService from "./services/getProvinces";
import createPolicyService from "./services/createPolicy";
import checkCoupon from "./services/checkCoupon";
import getCouponsService from "./services/getCoupons";
import getPaymentInfoService from "./services/getPaymentInfo";
import paymentService from "./services/payment";
import ocrService from "./services/ocr";
import bookVoucherPolicyService from "./services/bookVoucherPolicy";

const queryClient = new QueryClient();

export default {
  title: "components/sales/SaleTplCounter",
  component: SaleTplCounter,
  argTypes: {
    onChange: {},
    onClick: {},
  },
} as ComponentMeta<typeof SaleTplCounter>;

const Template: ComponentStory<typeof SaleTplCounter> = (args) => (
  <QueryClientProvider client={queryClient}>
    <SaleTplCounter {...args} />
    <ToastContainer limit={3} />
  </QueryClientProvider>
);

const gid = "og.opes-form";
const cid = "oc.opes-form";

export const TplZutto = Template.bind({});
TplZutto.args = {
  getProvincesService: async () =>
    (await getProvincesService({
      params: { channel: "BEG" },
      cookies: {
        gid: gid,
        cid: cid,
      },
    })) as any,
  getProgramsService: async () =>
    (await getProgramListService({
      params: { channel: "BEG" },
      cookies: {
        gid: gid,
        cid: cid,
      },
    })) as any,
  getPlaceOrderInitService: async ({ resourceCode }) =>
    (await getPlaceOrderInitService({
      params: { channel: "BEG", resourceCode },
      cookies: {
        gid: gid,
        cid: cid,
      },
    })) as any,
  checkCouponService: async ({ resourceCode, discountCode }) => {
    return await checkCoupon({
      params: { channel: "BEG", resourceCode, discountCode },
      cookies: {
        gid: gid,
        cid: cid,
      },
    });
  },
  getCouponsService: async ({ resourceCode }) => {
    return await getCouponsService({
      params: { channel: "BEG", resourceCode },
      cookies: {
        gid: gid,
        cid: cid,
      },
    });
  },
  createPolicyService: createPolicyService,
  getPaymentInfoService: getPaymentInfoService,
  paymentService: paymentService,
  typeFlow: "moto-zutto",
  hideConfirm: true,
};

export const TplMoto = Template.bind({});
TplMoto.args = {
  getProvincesService: async () =>
    (await getProvincesService({
      params: { channel: "BEG" },
      cookies: {
        gid: gid,
        cid: cid,
      },
    })) as any,
  getProgramsService: async () =>
    (await getProgramListService({
      params: { channel: "BEG" },
      cookies: {
        gid: gid,
        cid: cid,
      },
    })) as any,
  getPlaceOrderInitService: async ({ resourceCode }) =>
    (await getPlaceOrderInitService({
      params: { channel: "BEG", resourceCode },
      cookies: {
        gid: gid,
        cid: cid,
      },
    })) as any,
  checkCouponService: async ({ resourceCode, discountCode }) =>
    (await checkCoupon({
      params: { channel: "BEG", resourceCode, discountCode },
      cookies: {
        gid: gid,
        cid: cid,
      },
    })) as any,
  getCouponsService: async ({ resourceCode }) => {
    return await getCouponsService({
      params: { channel: "BEG", resourceCode },
      cookies: {
        gid: gid,
        cid: cid,
      },
    });
  },
  createPolicyService: createPolicyService,
  getPaymentInfoService: getPaymentInfoService,
  paymentService: paymentService,
  typeFlow: "moto",
};

export const TplCar = Template.bind({});
TplCar.args = {
  getProvincesService: async () =>
    (await getProvincesService({
      params: { channel: "BEG" },
      cookies: {
        gid: gid,
        cid: cid,
      },
    })) as any,
  getProgramsService: async () =>
    (await getProgramListService({
      params: { channel: "BEG" },
      cookies: {
        gid: gid,
        cid: cid,
      },
    })) as any,
  getPlaceOrderInitService: async ({ resourceCode }) =>
    (await getPlaceOrderInitService({
      params: { channel: "BEG", resourceCode },
      cookies: {
        gid: gid,
        cid: cid,
      },
    })) as any,
  checkCouponService: async ({ resourceCode, discountCode }) =>
    (await checkCoupon({
      params: { channel: "BEG", resourceCode, discountCode },
      cookies: {
        gid: gid,
        cid: cid,
      },
    })) as any,
  getCouponsService: async ({ resourceCode }) => {
    return await getCouponsService({
      params: { channel: "BEG", resourceCode },
      cookies: {
        gid: gid,
        cid: cid,
      },
    });
  },
  createPolicyService: async (data) => {
    return await createPolicyService({
      data: { ...data, body: data },
      params: { channel: "BEG" },
      query: { saleId: 3401 },
      cookies: {
        gid: gid,
        cid: cid,
      },
    });
  },
  getPaymentInfoService: async ({ goodCode, discountCodes }) =>
    await getPaymentInfoService({
      params: { goodCode: goodCode, channel: "BEG" },
      query: { discountCodes: discountCodes },
      cookies: {
        gid: gid,
        cid: cid,
      },
    }),
  paymentService: async ({
    goodCode,
    discountCodes,
    paymentMethod,
    failureUrl,
    successUrl,
  }: any) =>
    await paymentService({
      params: { goodCode: goodCode, channel: "BEG" },
      query: { discountCodes: discountCodes },
      data: {
        paymentMethod,
        failureUrl,
        successUrl,
      },
      cookies: {
        gid: gid,
        cid: cid,
      },
    }),
  ocrService: async ({ file }: any) =>
    await ocrService({
      params: { channel: "BEG" },
      file: file,
      fileKey: "image",
      ocrType: "cert",
      cookies: {
        gid: gid,
        cid: cid,
      },
    }),
  bookVoucherPolicyService: async ({ polSumId }: any) => {
    return await bookVoucherPolicyService({
      params: { channel: "BEG", polSumId },
      cookies: {
        gid: gid,
        cid: cid,
      },
    });
  },
  typeFlow: "car",
};
