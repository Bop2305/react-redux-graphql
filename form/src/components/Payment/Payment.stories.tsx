import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";

import Payment from "./Payment";

import getPaymentInfoService from "./services/getPaymentInfo";
import getCparamsService from "./services/getCparams";
import getProgramListService from "./services/getProgramList";
import getDetailSumidService from "./services/getDetailSumid";
import checkCouponService from "./services/checkCoupon";
import paymentService from "./services/payment";
import releasePaymentService from "./services/releasePayment";
import updateInvoiceInfoService from "./services/updateInvoiceInfo";

const queryClient = new QueryClient();

export default {
  title: "components/Payment",
  component: Payment,
} as ComponentMeta<typeof Payment>;

const Template: ComponentStory<typeof Payment> = (args) => (
  <QueryClientProvider client={queryClient}>
    <Payment {...args} />
    <ToastContainer limit={3} />
  </QueryClientProvider>
);

const gid = "og.opes-form";
const cid = "oc.opes-form";

export const Default = Template.bind({});
Default.args = {
  goodCode: "OPESD2C.OTPL.G2433275", //"TIKI.OTPL.G2210302",//"SAMO.OTPL.G2324763",//"MB.OTPL.G2320926",//"BIS.OTPL.G2327007", //"OPESD2C.OTPL.G2324583",
  // polSumId: "273413",
  successUrl: "123",
  failureUrl: "456",
  carUrl: "https://staging-url.opes.com.vn",
  onPayment: (data: any) => {
    console.log(data);
  },
  getPaymentInfoService: async ({ goodCode, discountCodes }) =>
    await getPaymentInfoService({
      params: { goodCode: goodCode, channel: goodCode?.split(".")?.[0] },
      query: { discountCodes: discountCodes },
      cookies: {
        gid: gid,
        cid: cid,
      },
    }),
  getCparamsService: async ({ goodCode }: any) =>
    await getCparamsService({
      params: { channel: goodCode?.split(".")?.[0] },
      cookies: {
        gid: gid,
        cid: cid,
      },
    }),
  getProgramListService: async ({ goodCode }: any) =>
    await getProgramListService({
      params: { channel: goodCode?.split(".")?.[0] },
      cookies: {
        gid: gid,
        cid: cid,
      },
    }),
  getDetailSumidService: async ({ goodCode, polSumId }: any) =>
    await getDetailSumidService({
      params: {
        channel: goodCode?.split(".")?.[0],
        polSumId: polSumId,
      },
      cookies: {
        gid: gid,
        cid: cid,
      },
    }),
  checkCouponService: async ({ goodCode, discountCode, resourceCode }: any) =>
    await checkCouponService({
      params: {
        channel: goodCode?.split(".")?.[0],
        discountCode,
        resourceCode,
      },
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
      params: { goodCode: goodCode, channel: goodCode?.split(".")?.[0] },
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
  releasePaymentService: async ({ goodCode }: any) =>
    await releasePaymentService({
      params: { goodCode: goodCode, channel: goodCode?.split(".")?.[0] },
      cookies: {
        gid: gid,
        cid: cid,
      },
    }),
  updateInvoiceInfoService: async ({
    goodCode,
    invoiceCompanyName,
    invoiceTaxCode,
    invoiceBuyerName,
    invoiceAddress,
    invoiceEmail,
    invoicePhone,
    invoiceIsCompany,
    invoiceExport,
  }: any) =>
    await updateInvoiceInfoService({
      params: { goodCode: goodCode, channel: goodCode?.split(".")?.[0] },
      data: {
        invoiceCompanyName,
        invoiceTaxCode,
        invoiceBuyerName,
        invoiceAddress,
        invoiceEmail,
        invoicePhone,
        invoiceIsCompany,
        invoiceExport,
      },
      cookies: {
        gid: gid,
        cid: cid,
      },
    }),
  //
};
