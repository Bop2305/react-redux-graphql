import React, { useEffect } from "react";

import withTheme from "hoc/withTheme";

import {
  checkCouponServiceType,
  createPolicyServiceType,
  createPoolServiceType,
  feedbackInfoCarServiceType,
  getCarBrandsServiceType,
  getCarDataByCarTypeCarBrandCarYearServiceType,
  getCarInspectionResultServiceType,
  getPaymentInfoServiceType,
  getPlaceOrderInitServiceType,
  getProgramsServiceType,
  getProvincesServiceType,
  paymentServiceType,
  savePlaceOrderServiceType,
  submitCarInspectionImageServiceType,
  getPaymentMethodsType,
  getPremiumEstType,
  getStaffContractByCodeType,
  newMainProfileType,
  getCouponsType,
  submitReinsuranceServiceType,
} from "../types";
import { SaleOcar, SaleOcarRb, SaleOcarSme } from "../../../components";

export interface OrderOcarProps {
  channelCode: string;
  getProgramsService: getProgramsServiceType;
  getPlaceOrderInitService: getPlaceOrderInitServiceType;
  getProvincesService: getProvincesServiceType;
  getCarBrandsService: getCarBrandsServiceType;
  getCarDataByCarTypeCarBrandCarYearService: getCarDataByCarTypeCarBrandCarYearServiceType;
  feedbackInfoCarService: feedbackInfoCarServiceType;
  savePlaceOrderService: savePlaceOrderServiceType;
  checkCouponService: checkCouponServiceType;
  createPoolService: createPoolServiceType;
  submitCarInspectionImageService: submitCarInspectionImageServiceType;
  getCarInspectionResultService: getCarInspectionResultServiceType;
  createPolicyService: createPolicyServiceType;
  getPaymentInfoService: getPaymentInfoServiceType;
  paymentService: paymentServiceType;
  getPaymentMethodsService: getPaymentMethodsType;
  getPremiumEstService: getPremiumEstType;
  getStaffContractByCodeService: getStaffContractByCodeType;
  newMainProfileService: newMainProfileType;
  getCouponsService: getCouponsType;
  submitReinsuranceService: submitReinsuranceServiceType;
  orderId?: string;
  currentEndpoint?: string;
  defaultStepIndex?: number;
  domainLinkFile: string;
  goodCode?: string;
  discountCodes?: string;
  transferEndpoint?: string;
  successEndpoint?: string;
  onlyCapture?: boolean;
  className?: string;
  onTransfer?: (data: any) => void;
  onlyCarUsingBusiness?: boolean;
  isVpbStaff?: boolean;
  limitTimeToCheckCoupon?: number;
  localstorageCouponCountdownKey?: string;
  showHasBankLoan?: boolean;
  notRequireCapture?: boolean;
  polSumId?: number;
  onSuccess: any;
  domainLinkSendCustomer: string;
  saleCode: string;
  onCheckSaleDao?: any;
  resourceCode?: string;
  backendUpdateOrder?: boolean;
  onBackendUpdateOrder?: any;
  // [x: string]: any;
}

const OrderOcar = (props: OrderOcarProps) => {
  const getRenderByChannel = () => {
    switch (props.channelCode) {
      case "OPESD2C":
        return <SaleOcar {...props} loggedIn={true} />;
      case "VPBRB":
        return <SaleOcarRb {...props} />;
      case "VPBSME":
        return <SaleOcarSme {...props} />;
      default:
        return null;
    }
  };

  return getRenderByChannel();
};

export default withTheme<OrderOcarProps>(OrderOcar);
