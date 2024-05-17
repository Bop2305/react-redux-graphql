import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { SaleOcarCoreProps } from "./SaleOcarCore";
import SaleOcarCore from "./SaleOcarCore";

import getProgramsService from "services/getPrograms";
import getPlaceOrderCoreInitService from "services/getPlaceOrderCoreInit";
import getProvincesService from "services/getProvinces";
import getCarBrandsService from "services/getCarBrands";
import getCarDataByCarTypeCarBrandCarYearService from "services/getCarDataByCarTypeCarBrandCarYearService";
import feedbackInfoCarService from "services/feedbackInfoCar";
import savePlaceOrderCoreService from "services/savePlaceOrderCore";
import checkCouponService from "services/checkCoupon";
import createPoolService from "services/createPool";
import submitCarInspectionImageService from "services/submitCarInspectionImage";
import getCarInspectionResultService from "services/getCarInspectionResult";
import createPolicyService from "services/createPolicy";
import getPaymentInfoService from "services/getPaymentInfo";
import getPaymentMethodCoreService from "services/getPaymentMethodCore";
import paymentService from "services/payment";
import paymentCoreService from "services/paymentCore";
import getPremiumEstService from "services/getPremiumEst";
import verifyPhoneExistsService from "services/verifyPhoneExists";
import newMainProfileService from "services/newMainProfile";
import getCouponsService from "services/getCoupons";
import submitReinsuranceService from "services/submitReinsurance";
import ocrService from "services/ocr";
import createPolicyOcarCore from "services/createPolicyOcarCore";
import pricingOcarCoreService from "services/pricingOcarCore";
import getPaymentInvoiceCoreService from "services/getPaymentInvoiceCore";

const queryClient = new QueryClient();
const SaleOcarCoreWrapper = (props: SaleOcarCoreProps) => {
  return <SaleOcarCore {...props} />;
};

export default {
  title: "components/sales/SaleOcarCore",
  component: SaleOcarCoreWrapper,
  argTypes: {
    onChange: {},
    onClick: {},
  },
} as ComponentMeta<typeof SaleOcarCoreWrapper>;

const Template: ComponentStory<typeof SaleOcarCoreWrapper> = (args) => (
  <QueryClientProvider client={queryClient}>
    <SaleOcarCoreWrapper {...args} />
    <ToastContainer limit={3} />
  </QueryClientProvider>
);

export const Default = Template.bind({});
Default.args = {
  getProgramsService: getProgramsService,
  getPlaceOrderInitService: getPlaceOrderCoreInitService,
  getProvincesService: getProvincesService,
  getCarBrandsService: getCarBrandsService,
  getCarDataByCarTypeCarBrandCarYearService:
    getCarDataByCarTypeCarBrandCarYearService,
  feedbackInfoCarService: feedbackInfoCarService,
  savePlaceOrderService: savePlaceOrderCoreService,
  checkCouponService: checkCouponService,
  createPoolService: createPoolService,
  submitCarInspectionImageService: submitCarInspectionImageService,
  getCarInspectionResultService: getCarInspectionResultService,
  createPolicyService: createPolicyOcarCore,
  getPaymentInfoService: getPaymentMethodCoreService,
  paymentService: paymentCoreService,
  getPremiumEstService: getPremiumEstService,
  verifyPhoneExistsService: verifyPhoneExistsService,
  newMainProfileService: newMainProfileService,
  getCouponsService: getCouponsService,
  submitReinsuranceService: submitReinsuranceService,
  getPricingOcarCoreService: pricingOcarCoreService,
  getPaymentInvoiceCoreService: getPaymentInvoiceCoreService,
  loggedIn: false,
  backendUpdateOrder: false,
  onBackendUpdateOrder: () => { },
  defaultValues: {
    // ownerFullName: "OPES2",
    // ownerBirthday: "27-07-1994",
    // ownerIdNo: "031094003945",
    // ownerPhoneNumber: "0352587591",
    // ownerEmail: `tungpt260794@gmail.com`,
  },
  blocked: true,
  defaultStepIndex: 1,
  showBen: true,
  saleNoPlate: true,
  resourceCode: "PROG_OPES_CAR.1644923708648",
  localstorageCouponCountdownKey: "rty5y4y",
  limitTimeToCheckCoupon: 10000,
  reinsurance: true,
  orderId: "b3f5923c606cf453c6c4f3ac7237bd65",
  // goodCode: "OPESD2C.OCAR.G2215163",
  currentEndpoint: "/?path=/story/components-sales-saleocar--default",
  domainLinkFile: "https://staging-url.opes.com.vn",
  successEndpoint: "/sales/ocar/payment-success",
  transferEndpoint: "/sales/ocar/transfer",
  onlyCapture: true,
  onlyCarUsingBusiness: false,
  isVpbStaff: false,
  showHasBankLoan: true,
  onVerifyPhoneExists: (value: any) => {
    console.log(value);
  },
  onNextStep: (step: any) => { },
  onCreatePolicyReInsurance: () => {
    console.log(123);
  },
  ocrService: async ({ file }: any) =>
    await ocrService({
      file: file,
      fileKey: "file",
      ocrType: "cert",
    }),
};
