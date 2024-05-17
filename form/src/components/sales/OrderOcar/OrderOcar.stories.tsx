import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { OrderOcarProps } from "./OrderOcar";
import OrderOcar from "./OrderOcar";

import getProgramsService from "../SaleOcarRb/services/getPrograms";
import getPlaceOrderInitService from "../SaleOcarRb/services/getPlaceOrderInit";
import getProvincesService from "../SaleOcarRb/services/getProvinces";
import getCarBrandsService from "../SaleOcarRb/services/getCarBrands";
import getCarDataByCarTypeCarBrandCarYearService from "../SaleOcarRb/services/getCarDataByCarTypeCarBrandCarYear";
import feedbackInfoCarService from "../SaleOcarRb/services/feedbackInfoCar";
import savePlaceOrderService from "../SaleOcarRb/services/savePlaceOrder";
import checkCouponService from "../SaleOcarRb/services/checkCoupon";
import createPoolService from "../SaleOcarRb/services/createPool";
import submitCarInspectionImageService from "../SaleOcarRb/services/submitCarInspectionImage";
import getCarInspectionResultService from "../SaleOcarRb/services/getCarInspectionResult";
import createPolicyService from "../SaleOcarRb/services/createPolicy";
import getPaymentInfoService from "../SaleOcarRb/services/getPaymentInfo";
import paymentService from "../SaleOcarRb/services/payment";
import getStaffContractByCodeService from "../SaleOcarRb/services/getStaffContractByCode";
import getPaymentMethodsService from "../SaleOcarRb/services/getPaymentMethods";
import getPremiumEstService from "../SaleOcarRb/services/getPremiumEst";

const queryClient = new QueryClient();
const OrderOcarWrapper = (props: OrderOcarProps) => {
  return <OrderOcar {...props} />;
};

export default {
  title: "components/sales/OrderOcar",
  component: OrderOcarWrapper,
  argTypes: {
    onChange: {},
    onClick: {},
    channelCode: {
      options: ["OPESD2C", "VPBRB", "VPBSME"],
      control: {
        type: "select",
        labels: {
          OPESD2C: "OPESD2C",
          VPBRB: "VPBRB",
          VPBSME: "VPBSME",
        },
      },
    },
  },
} as ComponentMeta<typeof OrderOcarWrapper>;

const Template: ComponentStory<typeof OrderOcarWrapper> = (args) => (
  <QueryClientProvider client={queryClient}>
    <OrderOcarWrapper {...args} />
    <ToastContainer limit={3} />
  </QueryClientProvider>
);

export const Example = Template.bind({});
Example.args = {
  channelCode: "VPBSME",
  getProgramsService: getProgramsService,
  getPlaceOrderInitService: getPlaceOrderInitService,
  getProvincesService: getProvincesService,
  getCarBrandsService: getCarBrandsService,
  getCarDataByCarTypeCarBrandCarYearService:
    getCarDataByCarTypeCarBrandCarYearService,
  feedbackInfoCarService: feedbackInfoCarService,
  savePlaceOrderService: savePlaceOrderService,
  checkCouponService: checkCouponService,
  createPoolService: createPoolService,
  submitCarInspectionImageService: submitCarInspectionImageService,
  getCarInspectionResultService: getCarInspectionResultService,
  createPolicyService: createPolicyService,
  getPaymentInfoService: getPaymentInfoService,
  paymentService: paymentService,
  getStaffContractByCodeService: getStaffContractByCodeService,
  getPaymentMethodsService: getPaymentMethodsService,
  getPremiumEstService: getPremiumEstService,
  defaultStepIndex: 1,
  limitTimeToCheckCoupon: 10000,
  currentEndpoint: "/?path=/story/components-sales-saleocar--default",
  domainLinkFile: "https://staging-url.opes.com.vn",
  onlyCapture: false,
  onCheckSaleDao: (value: string) => {
    console.log(value);
  },
  onSuccess: (data: any) => {
    console.log(data);
  },
  resourceCode: "PROG_OPES_CAR.1646025804100",
};

// export const VPBRB = Template.bind({});

// VPBRB.args = {
//   channelCode: "VPBRB",
//   getProgramsService: getProgramsService,
//   getPlaceOrderInitService: getPlaceOrderInitService,
//   getProvincesService: getProvincesService,
//   getCarBrandsService: getCarBrandsService,
//   getCarDataByCarTypeCarBrandCarYearService:
//     getCarDataByCarTypeCarBrandCarYearService,
//   feedbackInfoCarService: feedbackInfoCarService,
//   savePlaceOrderService: savePlaceOrderService,
//   checkCouponService: checkCouponService,
//   createPoolService: createPoolService,
//   submitCarInspectionImageService: submitCarInspectionImageService,
//   getCarInspectionResultService: getCarInspectionResultService,
//   createPolicyService: createPolicyService,
//   getPaymentInfoService: getPaymentInfoService,
//   paymentService: paymentService,
//   getPaymentMethodsService: getPaymentMethodsService,
//   getPremiumEstService: getPremiumEstService,
//   defaultStepIndex: 1,
//   polSumId: 100437,
//   localstorageCouponCountdownKey: "fucccc",
//   limitTimeToCheckCoupon: 10000,
//   currentEndpoint: "/?path=/story/components-sales-saleocar--default",
//   domainLinkFile: "https://staging-url.opes.com.vn",
//   onlyCapture: false,
//   onlyCarUsingBusiness: false,
//   isVpbStaff: true,
//   showHasBankLoan: true,
//   domainLinkSendCustomer: "https://staging-e.opes.com.vn/VPBRB/ccar/sale",
// };

// export const OPESD2C = Template.bind({});

// OPESD2C.args = {
//   channelCode: "OPESD2C",
//   getProgramsService: getProgramsService,
//   getPlaceOrderInitService: getPlaceOrderInitService,
//   getProvincesService: getProvincesService,
//   getCarBrandsService: getCarBrandsService,
//   getCarDataByCarTypeCarBrandCarYearService:
//     getCarDataByCarTypeCarBrandCarYearService,
//   feedbackInfoCarService: feedbackInfoCarService,
//   savePlaceOrderService: savePlaceOrderService,
//   checkCouponService: checkCouponService,
//   createPoolService: createPoolService,
//   submitCarInspectionImageService: submitCarInspectionImageService,
//   getCarInspectionResultService: getCarInspectionResultService,
//   createPolicyService: createPolicyService,
//   getPaymentInfoService: getPaymentInfoService,
//   paymentService: paymentService,
//   defaultStepIndex: 1,
//   localstorageCouponCountdownKey: "fucccc",
//   limitTimeToCheckCoupon: 10000,
//   currentEndpoint: "/?path=/story/components-sales-saleocar--default",
//   domainLinkFile: "https://staging-url.opes.com.vn",
//   onlyCapture: false,
//   onlyCarUsingBusiness: false,
//   isVpbStaff: true,
//   showHasBankLoan: true,
// };
