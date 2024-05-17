import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import SaleGolferSeaBank from "./SaleGolferSeaBank";

import getProgramListService from "./services/getProgramList";
import getPlaceOrderInitService from "./services/getPlaceOrderInit";
import createPolicyService from "./services/createPolicy";
import checkCoupon from "./services/checkCoupon";
import getCouponsService from "./services/getCoupons";
import getPaymentInfoService from "./services/getPaymentInfo";
import paymentService from "./services/payment";

const queryClient = new QueryClient();

export default {
  title: "components/sales/SaleGolferSeaBank",
  component: SaleGolferSeaBank,
  argTypes: {
    onChange: {},
    onClick: {},
  },
} as ComponentMeta<typeof SaleGolferSeaBank>;

const Template: ComponentStory<typeof SaleGolferSeaBank> = (args) => (
  <QueryClientProvider client={queryClient}>
    <SaleGolferSeaBank {...args} />
    <ToastContainer limit={3} />
  </QueryClientProvider>
);

const gid = "og.opes-form";
const cid = "oc.opes-form";

export const Default = Template.bind({});
Default.args = {
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
};
