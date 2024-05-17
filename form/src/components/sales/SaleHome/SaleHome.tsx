import React from "react";

import withTheme from "hoc/withTheme";
import Stepper from "components/Stepper";

import useStyles from "./hooks/useStyles";
import useSteps from "./hooks/useSteps";
import useData from "./hooks/useData";
import {
  checkCouponServiceType,
  createPolicyServiceType,
  defaultValuesType,
  getCouponsType,
  getPaymentInfoServiceType,
  getPlaceOrderInitServiceType,
  getProgramsServiceType,
  getProvincesServiceType,
  paymentServiceType,
  verifyPhoneExistsType,
} from "../types";
import { CHECK_PRICE, EXECUTION } from "helper/const";
import fields from "./help/fields";
import toaster from "helper/toaster";

type SaleHomeProps = {
  getProgramsService: getProgramsServiceType;
  getPlaceOrderInitService: getPlaceOrderInitServiceType;
  getCouponsService: getCouponsType;
  createPolicyService: createPolicyServiceType;
  checkCouponService: checkCouponServiceType;
  getProvincesService: getProvincesServiceType;
  verifyPhoneExistsService?: verifyPhoneExistsType;
  paymentService: paymentServiceType;
  getPaymentInfoService: getPaymentInfoServiceType;
  onVerifyPhoneExists?: any;
  className?: string;
  blocked?: boolean;
  defaultValues?: defaultValuesType;
  successEndpoint: string;
  currentEndpoint: string;
  transferEndpoint?: string;
  onTransfer?: any;
};

const SaleHome = (props: SaleHomeProps) => {
  const classes = useStyles();
  const {
    useFormResult,
    resourceCode,
    popupInfoList,
    assetValueData,
    additionalBenefitsData,
    orderConfigData,
    homeTypeData,
    listYearBuildHomeData,
    listDurationInsuranceData,
    createPolicyHandle,
    createPolicyMutation,
    fee,
    oldFee,
    cityData,
    districtData,
    wardData,
    homeBuyerRelationshipD2cData,
    verifyPhoneExistsHandle,
    defaultDeductionData,
    program,
    getPaymentInfoQuery,
    paymentHandle,
    getFeeAddOnByPkgCode,
  } = useData({
    getProgramsService: props.getProgramsService,
    getPlaceOrderInitService: props.getPlaceOrderInitService,
    createPolicyService: props.createPolicyService,
    checkCouponService: props.checkCouponService,
    getProvincesService: props.getProvincesService,
    verifyPhoneExistsService: props.verifyPhoneExistsService,
    paymentService: props.paymentService,
    successEndpoint: props.successEndpoint,
    currentEndpoint: props.currentEndpoint,
    getPaymentInfoService: props.getPaymentInfoService,
  });
  const steps = useSteps({
    useFormResult,
    resourceCode,
    popupInfoList,
    assetValueData,
    additionalBenefitsData,
    orderConfigData,
    homeTypeData,
    listYearBuildHomeData,
    listDurationInsuranceData,
    getCouponsService: props.getCouponsService,
    fee,
    oldFee,
    createPolicyHandle,
    cityData,
    districtData,
    wardData,
    homeBuyerRelationshipD2cData,
    defaultValues: props.defaultValues,
    blocked: props.blocked,
    defaultDeductionData,
    program,
    getPaymentInfoQuery,
    getFeeAddOnByPkgCode,
  });

  return (
    <div className={`${classes.wrapper} ${props.className}`}>
      <Stepper
        inputsWrapperClass={classes.inputsWrapperClass}
        steps={steps}
        useFormResult={useFormResult}
        defaultStepIndex={1}
        defaultScreenIndexOfStep={1}
        autoNext={false}
        loading={createPolicyMutation.isLoading}
        onBack={(_data, _currentStepIndex, _currentScreenIndexOfStep, back) => {
          useFormResult?.setValue(fields.currentStep, _currentStepIndex - 1);
        }}
        onNext={async (
          _data,
          _currentStepIndex,
          _currentScreenIndexOfStep,
          next
        ) => {
          if (_currentStepIndex === 1) {
            const result = await createPolicyHandle(CHECK_PRICE);

            if (result?.content?.response?.polTotalFee) {
              useFormResult?.setValue(
                fields.currentStep,
                _currentStepIndex + 1
              );
              next();
            }
          } else if (_currentStepIndex === 3) {
            let resVerify;
            if (!!props.verifyPhoneExistsService) {
              resVerify = await verifyPhoneExistsHandle();
            }

            if ((resVerify as any)?.content?.exist && !props.blocked) {
              props.onVerifyPhoneExists((resVerify as any)?.content?.exist);
              return;
            }

            useFormResult?.setValue(fields.currentStep, _currentStepIndex + 1);
            next();
          } else if (_currentStepIndex === 4) {
            const _res = await createPolicyHandle(EXECUTION);
            if (_res?.message?.indexOf("UNIQUE_TPL_DATA") >= 0) {
              toaster.error("Biển kiểm soát đã có hợp đồng");
            } else if (_res?.statusCode === 0) {
              useFormResult?.setValue(
                fields.currentStep,
                _currentStepIndex + 1
              );
              next();
            } else {
              toaster.error("Có lỗi xảy ra");
            }
          } else if (_currentStepIndex === 5) {
            const res = await paymentHandle();
            if (res?.content?.paymentUrl) {
              window?.location?.replace(res?.content?.paymentUrl);
            } else if (res?.content?.virtualAccount) {
              if (props.transferEndpoint) {
                window.location.href = `${window?.location?.origin}${props.transferEndpoint}?goodCode=${res?.content?.goodCode}`;
              } else {
                if (typeof props.onTransfer === "function")
                  props.onTransfer(res?.content);
              }
            }
          } else {
            useFormResult?.setValue(fields.currentStep, _currentStepIndex + 1);
            next();
          }
        }}
      />
    </div>
  );
};

export default withTheme<SaleHomeProps>(SaleHome);
