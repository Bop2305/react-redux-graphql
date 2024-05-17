import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { SaleOcarProps } from "./SaleOcar";
import SaleOcar from "./SaleOcar";

import getProgramsService from "services/getPrograms";
import getPlaceOrderInitService from "services/getPlaceOrderInit";
import getProvincesService from "services/getProvinces";
import getCarBrandsService from "services/getCarBrands";
import getCarDataByCarTypeCarBrandCarYearService from "services/getCarDataByCarTypeCarBrandCarYearService";
import feedbackInfoCarService from "services/feedbackInfoCar";
import savePlaceOrderService from "services/savePlaceOrder";
import checkCouponService from "services/checkCoupon";
import createPoolService from "services/createPool";
import submitCarInspectionImageService from "services/submitCarInspectionImage";
import getCarInspectionResultService from "services/getCarInspectionResult";
import createPolicyService from "services/createPolicy";
import getPaymentInfoService from "services/getPaymentInfo";
import paymentService from "services/payment";
import getPremiumEstService from "services/getPremiumEst";
import verifyPhoneExistsService from "services/verifyPhoneExists";
import newMainProfileService from "services/newMainProfile";
import getCouponsService from "services/getCoupons";
import submitReinsuranceService from "services/submitReinsurance";
import ocrService from "services/ocr";

const queryClient = new QueryClient();
const SaleOcarWrapper = (props: SaleOcarProps) => {
  return <SaleOcar {...props} />;
};

export default {
  title: "components/sales/SaleOcar",
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
  getPremiumEstService: getPremiumEstService,
  verifyPhoneExistsService: verifyPhoneExistsService,
  newMainProfileService: newMainProfileService,
  getCouponsService: getCouponsService,
  submitReinsuranceService: submitReinsuranceService,
  loggedIn: false,
  backendUpdateOrder: false,
  onBackendUpdateOrder: () => {},
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
  orderId: "25908e82b1f24d2a03dedf54e0b4f8a3",
  // goodCode: "OPESD2C.OCAR.G2215163",
  currentEndpoint: "/?path=/story/components-sales-saleocar--default",
  domainLinkFile: "https://staging-url.opes.com.vn",
  onlyCapture: true,
  onlyCarUsingBusiness: false,
  isVpbStaff: false,
  showHasBankLoan: true,
  onVerifyPhoneExists: (value: any) => {
    console.log(value);
  },
  onNextStep: (step: any) => {},
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
