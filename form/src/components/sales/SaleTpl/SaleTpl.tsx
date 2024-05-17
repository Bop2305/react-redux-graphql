import React from "react";

import withTheme from "hoc/withTheme";
import { EXECUTION, VALIDATE } from "helper/const";
import toaster from "helper/toaster";
import Stepper from "components/Stepper";

import useStyles from "./hooks/useStyles";
import useSteps from "./hooks/useSteps";
import useData from "./hooks/useData";
import {
  checkCouponServiceType,
  createPoolServiceType,
  defaultValuesType,
  getCouponsType,
  getPaymentInfoServiceType,
  getPlaceOrderInitServiceType,
  getProgramsServiceType,
  getProvincesServiceType,
  newMainProfileType,
  paymentServiceType,
  verifyPhoneExistsType,
} from "../types";
import fields from "./help/fields";

type SaleTplProps = {
  getProgramsService: getProgramsServiceType;
  getPlaceOrderInitService: getPlaceOrderInitServiceType;
  getProvincesService: getProvincesServiceType;
  createPolicyService: createPoolServiceType;
  checkCouponService: checkCouponServiceType;
  getPaymentInfoService: getPaymentInfoServiceType;
  paymentService: paymentServiceType;
  verifyPhoneExistsService: verifyPhoneExistsType;
  newMainProfileService: newMainProfileType;
  getCouponsService: getCouponsType;
  ocrService: any;
  className?: string;
  typeFlow: "moto" | "car" | "moto-zutto";
  transferEndpoint?: string;
  successEndpoint?: string;
  currentEndpoint?: string;
  onTransfer?: (data: any) => void;
  defaultValues?: defaultValuesType;
  blocked?: boolean;
  onVerifyPhoneExists?: any;
  onNextStep?: any;
  onPayment?: any;
  hideConfirm?: boolean;
};

const SaleTpl = (props: SaleTplProps) => {
  const classes = useStyles();
  const {
    useFormResult,
    // init data
    provincesData,
    orderConfigData,
    vehicleUsingData,
    getVehicleTypeByTypeFlowAndVehicleUsingData,
    vehicleTypeByTypeFlowAndVehicleUsingData,
    vehicleSeatCountsData,
    vehicleWeightData,
    getDurationByTypeFlowData,
    durationByTypeFlowData,
    resourceCode,
    // mutation
    createPolicyMutation,
    createPolicyHandle,
    checkPriceMutation,
    checkPriceHandle,
    paymentMutation,
    paymentHandle,
    verifyPhoneExistsHandle,
    // query
    checkCouponQuery,
    getPaymentInfoQuery,
  } = useData({
    getProgramsService: props.getProgramsService,
    getPlaceOrderInitService: props.getPlaceOrderInitService,
    getProvincesService: props.getProvincesService,
    createPolicyService: props.createPolicyService,
    checkCouponService: props.checkCouponService,
    getPaymentInfoService: props.getPaymentInfoService,
    paymentService: props.paymentService,
    verifyPhoneExistsService: props.verifyPhoneExistsService,
    newMainProfileService: props.newMainProfileService,
    // props
    successEndpoint: props.successEndpoint,
    currentEndpoint: props.currentEndpoint,
    blocked: props.blocked,
    defaultValues: props.defaultValues,
    typeFlow: props.typeFlow,
  });
  const steps = useSteps({
    useFormResult,
    // init data
    provincesData,
    orderConfigData,
    vehicleUsingData,
    getVehicleTypeByTypeFlowAndVehicleUsingData,
    vehicleTypeByTypeFlowAndVehicleUsingData,
    vehicleSeatCountsData,
    vehicleWeightData,
    getDurationByTypeFlowData,
    durationByTypeFlowData,
    resourceCode: resourceCode as string,
    // props
    typeFlow: props.typeFlow,
    defaultValues: props.defaultValues,
    blocked: props.blocked,
    // mutation
    checkPriceMutation,
    // query
    checkCouponQuery,
    getPaymentInfoQuery,
    checkPriceHandle,
    getCouponsService: props.getCouponsService,
    hideConfirm: props.hideConfirm,
    ocrService: props.ocrService,
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
        loading={
          createPolicyMutation?.isLoading ||
          checkPriceMutation?.isLoading ||
          paymentMutation?.isLoading
        }
        onNext={async (
          _data,
          _currentStepIndex,
          _currentScreenIndexOfStep,
          next
        ) => {
          useFormResult?.setValue(
            fields.countClickStep,
            (useFormResult?.getValues(fields.countClickStep) || 0) + 1
          );
          if (_currentStepIndex === 1) {
            let resVerify;
            if (!!props.verifyPhoneExistsService && !props.blocked) {
              resVerify = await verifyPhoneExistsHandle();
            }

            if ((resVerify as any)?.content?.exist) {
              props.onVerifyPhoneExists((resVerify as any)?.content?.exist);
              return;
            }

            const _res = await createPolicyHandle(VALIDATE, null);
            if (_res?.message?.indexOf("UNIQUE_TPL_DATA") >= 0) {
              toaster.error("Biển kiểm soát đã có hợp đồng");
            } else if (_res?.statusCode === 0) {
              if (!!props.onNextStep) {
                props.onNextStep(_currentStepIndex, _currentScreenIndexOfStep);
              }

              next();
            } else {
              toaster.error("Có lỗi xảy ra");
            }
          } else if (_currentStepIndex === 2) {
            const _res = await createPolicyHandle(EXECUTION, null);
            if (_res?.message?.indexOf("UNIQUE_TPL_DATA") >= 0) {
              toaster.error("Biển kiểm soát đã có hợp đồng");
            } else if (_res?.statusCode === 0) {
              if (!!props.onNextStep) {
                props.onNextStep(_currentStepIndex, _currentScreenIndexOfStep);
              }
              next();
            } else {
              toaster.error("Có lỗi xảy ra");
            }
          } else if (_currentStepIndex === 3) {
            const res = await paymentHandle();
            if (res?.content?.paymentUrl) {
              if (!!props.onNextStep) {
                props.onNextStep(_currentStepIndex, _currentScreenIndexOfStep);
              }
              window?.location?.replace(res?.content?.paymentUrl);
            } else if (res?.content?.virtualAccount) {
              if (!!props.onNextStep) {
                props.onNextStep(_currentStepIndex, _currentScreenIndexOfStep);
              }
              if (props.transferEndpoint) {
                window.location.href = `${window?.location?.origin}${props.transferEndpoint}?goodCode=${res?.content?.goodCode}`;
              } else {
                if (typeof props.onTransfer === "function")
                  props.onTransfer({
                    polSumId:
                      createPolicyMutation?.data?.content?.response?.polSumId,
                    ...res?.content,
                  });
              }
            } else {
              if (typeof props.onPayment === "function")
                props.onPayment({
                  polSumId:
                    createPolicyMutation?.data?.content?.response?.polSumId,
                  ...res?.content,
                });
            }
          }
        }}
      />
    </div>
  );
};

export default withTheme<SaleTplProps>(SaleTpl);
