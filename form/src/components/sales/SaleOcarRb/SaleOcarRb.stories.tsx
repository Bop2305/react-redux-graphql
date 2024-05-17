import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { SaleOcarRbProps } from "./SaleOcarRb";
import SaleOcar from "./SaleOcarRb";

import getProgramsService from "./services/getPrograms";
import getPlaceOrderInitService from "./services/getPlaceOrderInit";
import getProvincesService from "./services/getProvinces";
import getCarBrandsService from "./services/getCarBrands";
import getCarDataByCarTypeCarBrandCarYearService from "./services/getCarDataByCarTypeCarBrandCarYear";
import feedbackInfoCarService from "./services/feedbackInfoCar";
import savePlaceOrderService from "./services/savePlaceOrder";
import checkCouponService from "./services/checkCoupon";
import createPoolService from "./services/createPool";
import submitCarInspectionImageService from "./services/submitCarInspectionImage";
import getCarInspectionResultService from "./services/getCarInspectionResult";
import createPolicyService from "./services/createPolicy";
import getPaymentInfoService from "./services/getPaymentInfo";
import paymentService from "./services/payment";
import getPaymentMethodsService from "./services/getPaymentMethods";
import getPremiumEstService from "./services/getPremiumEst";

const queryClient = new QueryClient();
const SaleOcarWrapper = (props: SaleOcarRbProps) => {
  return <SaleOcar {...props} />;
};

export default {
  title: "components/sales/SaleOcarRb",
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
  getPaymentMethodsService: getPaymentMethodsService,
  getPremiumEstService: getPremiumEstService,
  defaultStepIndex: 1,
  backendUpdateOrder: false,
  onBackendUpdateOrder: () => {},
  // polSumId: 100437,
  // orderId: "5f911441dc83c5cfe5ac46d83040459d",
  localstorageCouponCountdownKey: "fucccc",
  limitTimeToCheckCoupon: 10000,
  currentEndpoint: "/?path=/story/components-sales-saleocar--default",
  domainLinkFile: "https://staging-url.opes.com.vn",
  onlyCapture: false,
  onlyCarUsingBusiness: false,
  isVpbStaff: true,
  showHasBankLoan: true,
  notRequireCapture: true,
  domainLinkSendCustomer: "https://staging-e.opes.com.vn/VPBRB/ccar/sale",
  coInsurances: true,
  saleNoPlate: true,
};
