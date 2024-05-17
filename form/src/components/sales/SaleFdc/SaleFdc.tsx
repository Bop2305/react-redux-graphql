import React from "react";

import { CHECK_PRICE, EXECUTION } from "helper/const";
import withTheme from "hoc/withTheme";
import Stepper from "components/Stepper";

import useStyles from "./hooks/useStyles";
import useSteps from "./hooks/useSteps";
import useData from "./hooks/useData";
import {
  getListFlightNoServiceType,
  getPlaceOrderInitServiceType,
  getProgramsServiceType,
  checkPriceServiceType,
  createPolicyServiceType,
  checkCouponServiceType,
  getPaymentInfoServiceType,
  paymentServiceType,
  defaultValuesType,
  verifyPhoneExistsType,
  newMainProfileType,
  getCouponsType,
} from "../types";
import fields from "./help/fields";

type SaleTplProps = {
  getProgramsService: getProgramsServiceType;
  getPlaceOrderInitService: getPlaceOrderInitServiceType;
  getListFlightNoService: getListFlightNoServiceType;
  checkPriceService: checkPriceServiceType;
  createPolicyService: createPolicyServiceType;
  checkCouponService: checkCouponServiceType;
  getPaymentInfoService: getPaymentInfoServiceType;
  paymentService: paymentServiceType;
  verifyPhoneExistsService: verifyPhoneExistsType;
  newMainProfileService: newMainProfileType;
  getCouponsService: getCouponsType;
  className?: string;
  transferEndpoint?: string;
  successEndpoint?: string;
  currentEndpoint?: string;
  onTransfer?: (data: any) => void;
  defaultValues?: defaultValuesType;
  blocked?: boolean;
  onVerifyPhoneExists?: any;
  onNextStep?: any;
};

const SaleTpl = (props: SaleTplProps) => {
  const classes = useStyles();
  const {
    useFormResult,
    coveragesData,
    // init data
    configData,
    // data
    flightsDepData,
    flightsDepDataLoading,
    flightsReturnData,
    flightsReturnDataLoading,
    priceDepData,
    priceReturnData,
    resourceCode,
    // mutation
    checkPriceMutation,
    checkPriceHandle,
    createPolicyMutation,
    createPolicyHandle,
    paymentMutation,
    paymentHandle,
    verifyPhoneExistsHandle,
    // query
    getPaymentInfoQuery,
  } = useData({
    getProgramsService: props.getProgramsService,
    getPlaceOrderInitService: props.getPlaceOrderInitService,
    getListFlightNoService: props.getListFlightNoService,
    checkPriceService: props.checkPriceService,
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
  });
  const steps = useSteps({
    useFormResult,
    // init data
    coveragesData,
    configData,
    flightsDepData,
    flightsDepDataLoading,
    flightsReturnData,
    flightsReturnDataLoading,
    priceDepData,
    priceReturnData,
    resourceCode: resourceCode as string,
    // props
    defaultValues: props.defaultValues,
    blocked: props.blocked,
    // use query
    getPaymentInfoQuery,
    checkPriceHandle,
    getCouponsService: props.getCouponsService,
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

          if (_currentStepIndex === 2) {
            let resVerify;
            if (!!props.verifyPhoneExistsService && !props.blocked) {
              resVerify = await verifyPhoneExistsHandle();
            }

            if ((resVerify as any)?.content?.exist) {
              props.onVerifyPhoneExists((resVerify as any)?.content?.exist);
              return;
            }

            const _res = await checkPriceHandle(CHECK_PRICE, null);

            if (_res?.statusCode === 0) {
              if (!!props.onNextStep) {
                props.onNextStep(_currentStepIndex, _currentScreenIndexOfStep);
              }
              next();
            }
          } else if (_currentStepIndex === 3) {
            await createPolicyHandle(EXECUTION, null);
            if (!!props.onNextStep) {
              props.onNextStep(_currentStepIndex, _currentScreenIndexOfStep);
            }
            next();
          } else if (_currentStepIndex === 4) {
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
                  props.onTransfer(res?.content);
              }
            }
          } else {
            if (!!props.onNextStep) {
              props.onNextStep(_currentStepIndex, _currentScreenIndexOfStep);
            }
            next();
          }
        }}
      />
    </div>
  );
};

export default withTheme<SaleTplProps>(SaleTpl);
