import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { SaleOcarCoreSmeProps } from "./SaleOcarCoreSme";
// import { SaleOcarCoreSme } from "../../../../dist/esm";
import SaleOcarCoreSme from "./SaleOcarCoreSme";

import getProgramsService from "./services/getPrograms";
import getPlaceOrderCoreInitService from "./services/getPlaceOrderCoreInit";
import getProvincesService from "./services/getProvinces";
import getCarBrandsService from "./services/getCarBrands";
import getCarDataByCarTypeCarBrandCarYearService from "./services/getCarDataByCarTypeCarBrandCarYear";
import feedbackInfoCarService from "./services/feedbackInfoCar";
import savePlaceOrderCoreService from "./services/savePlaceOrderCore";
import checkCouponService from "./services/checkCoupon";
import createPoolService from "./services/createPool";
import submitCarInspectionImageService from "./services/submitCarInspectionImage";
import getCarInspectionResultService from "./services/getCarInspectionResult";
import createPolicyService from "./services/createPolicy";
import getPaymentInfoService from "./services/getPaymentInfo";
import paymentService from "./services/payment";
import checkDaoExistService from "./services/checkDaoExist";
import getStaffContractByCodeService from "./services/getStaffContractByCode";
import getPaymentMethodsService from "./services/getPaymentMethods";
import getPremiumEstService from "./services/getPremiumEst";
import getStaffInfoService from "./services/getStaffInfo";
import getOrganizationHierarchiesService from "./services/getOrganizationHierarchies";
import ocrService from "./services/ocr";
import saveDocService from "./services/saveDoc";
import getOrganizationAllService from "./services/getOrganizationAll";
import pricingOcarCoreService from "./services/pricingOcarCore"
import createPolicyOcarCore from "./services/createPolicyOcarCore";
import cancelPolicyCoreService from "./services/cancelPolicyCore";

const queryClient = new QueryClient();
const SaleOcarCoreSmeWrapper = (props: SaleOcarCoreSmeProps) => {
  return <SaleOcarCoreSme {...props} />;
};

export default {
  title: "components/sales/SaleOcarCoreSme",
  component: SaleOcarCoreSmeWrapper,
  argTypes: {
    onChange: {},
    onClick: {},
  },
} as ComponentMeta<typeof SaleOcarCoreSmeWrapper>;

const Template: ComponentStory<typeof SaleOcarCoreSmeWrapper> = (args) => (
  <QueryClientProvider client={queryClient}>
    <SaleOcarCoreSmeWrapper {...args} />
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
  getPaymentInfoService: getPaymentInfoService,
  paymentService: paymentService,
  getStaffContractByCodeService: getStaffContractByCodeService,
  getPaymentMethodsService: getPaymentMethodsService,
  getPremiumEstService: getPremiumEstService,
  saveDocService: saveDocService,
  getOrganizationAllService: getOrganizationAllService,
  getPricingOcarCoreService: pricingOcarCoreService,
  getAgentExistService: checkDaoExistService,
  defaultStepIndex: 1,
  limitTimeToCheckCoupon: 10000,
  backendUpdateOrder: false,
  saleNoPlate: true,
  onBackendUpdateOrder: () => { },
  // orderId: "ef61a199efc7fe7737797f298bc82bff",
  reinsurance: true,
  // polSumId: 105482,
  // test case update before active policy
  // polNo: "PL-8000028846/00/00",
  // cancelPolicyCoreService: cancelPolicyCoreService,
  // defaultValues: {
  //   buyerIsCompany: true,
  //   buyerIsOwner: false,
  //   buyerName: "OPES",
  //   buyerCifNumber: "438347",
  //   buyerDeputyName: "tung",
  //   buyerDeputyTitle: "sep",
  //   ownerIsDriver: false,
  //   ownerFullName: "OPES1",
  //   ownerBirthday: "26-07-1994",
  //   ownerGender: "F",
  //   ownerIdNo: "031094003945",
  //   ownerPhoneNumber: "0352587591",
  //   ownerEmail: "tungpt260794@gmail.com",
  //   driverGender: "M",
  //   driverFullName: "tung123",
  //   driverBirthday: "26-07-1995",
  //   driverPhoneNumber: "0352587594",
  //   driverExperience: 6,
  //   activeRegionProvince: 60,
  //   invoiceExport: true,
  //   invoiceIsCompany: true,
  //   invoiceCompanyName: "OPES",
  //   invoiceBuyerName: "tung",
  //   invoiceTaxCode: "12345",
  //   buyerIdNo: "123",
  //   invoiceEmail: "tungpt@gmail.com",
  //   invoiceAddress: "HN",
  //   saleCode: "12345678",
  //   saleEmail: "tung@gmail.com",
  // },
  // polSumId: 97550,
  currentEndpoint: "/?path=/story/components-sales-saleocar--default",
  domainLinkFile: "https://staging-url.opes.com.vn",
  onlyCapture: false,
  coInsurances: true,
  onCheckSaleDao: (value: string) => {
    console.log(value);
  },
  onSuccess: (data: any) => {
    console.log(data);
  },
  getStaffInfoService,
  getOrganizationHierarchiesService,
  saleId: 2221,
  ocrService: async ({ file }: any) =>
    await ocrService({
      file: file,
      fileKey: "file",
      ocrType: "cert",
    }),
};
