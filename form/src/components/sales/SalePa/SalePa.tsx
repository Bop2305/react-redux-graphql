import React from "react";

import withTheme from "hoc/withTheme";
import Stepper from "components/Stepper";

import {
  getProgramsServiceType,
  getPlaceOrderInitServiceType,
  createPolicyServiceType,
  getPaymentInfoServiceType,
  paymentServiceType,
  checkCouponServiceType,
  defaultValuesType,
  verifyPhoneExistsType,
  newMainProfileType,
  getCouponsType,
} from "../types";
import useSteps from "./hooks/useSteps";
import useData from "./hooks/useData";
import useStyles from "./hooks/useStyles";
import fields from "./help/fields";
import { CHECK_PRICE } from "helper/const";

type SalePaProps = {
  className?: string;
  getProgramsService: getProgramsServiceType;
  getPlaceOrderInitService: getPlaceOrderInitServiceType;
  createPolicyService: createPolicyServiceType;
  checkCouponService: checkCouponServiceType;
  getPaymentInfoService: getPaymentInfoServiceType;
  paymentService: paymentServiceType;
  verifyPhoneExistsService: verifyPhoneExistsType;
  newMainProfileService: newMainProfileType;
  getCouponsService: getCouponsType;
  transferEndpoint?: string;
  successEndpoint?: string;
  currentEndpoint?: string;
  onTransfer?: (data: any) => void;
  defaultValues?: defaultValuesType;
  blocked?: boolean;
  onVerifyPhoneExists?: any;
  onNextStep?: any;
};

const SalePa = (props: SalePaProps) => {
  const classes = useStyles();
  const {
    useFormResult,
    // init data
    orderConfigData,
    durationData,
    relationDataByGroupCode,
    groupPackageData,
    getPackageDataByGroupCode,
    packageDataByGroupCode,
    resourceCode,
    // get payment info
    getPaymentInfoQuery,
    // mutate
    createPolicyHandle,
    createPolicyLoading,
    paymentHandle,
    paymentLoadding,
    verifyPhoneExistsHandle,
  } = useData({
    getProgramsService: props.getProgramsService,
    getPlaceOrderInitService: props.getPlaceOrderInitService,
    createPolicyService: props.createPolicyService,
    checkCouponService: props.checkCouponService,
    getPaymentInfoService: props.getPaymentInfoService,
    paymentService: props.paymentService,
    verifyPhoneExistsService: props.verifyPhoneExistsService,
    newMainProfileService: props.newMainProfileService,
    successEndpoint: props.successEndpoint,
    currentEndpoint: props.currentEndpoint,
    blocked: props.blocked,
    defaultValues: props.defaultValues,
  });
  const steps = useSteps({
    useFormResult,
    orderConfigData,
    durationData,
    relationDataByGroupCode,
    groupPackageData,
    getPackageDataByGroupCode,
    packageDataByGroupCode,
    resourceCode: resourceCode as string,
    // get payment info
    getPaymentInfoQuery,
    // props
    defaultValues: props.defaultValues,
    blocked: props.blocked,
    createPolicyHandle,
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
        loading={createPolicyLoading || paymentLoadding}
        onNext={async (
          _data,
          _currentStepIndex,
          _currentScreenIndexOfStep,
          next
        ) => {
          if (_currentStepIndex === 2) {
            let resVerify;
            if (!!props.verifyPhoneExistsService && !props.blocked) {
              resVerify = await verifyPhoneExistsHandle();
            }

            if ((resVerify as any)?.content?.exist) {
              props.onVerifyPhoneExists((resVerify as any)?.content?.exist);
              return;
            }

            const res = await createPolicyHandle(CHECK_PRICE);
            if (res?.content?.response?.polTotalFee) {
              if (!!props.onNextStep) {
                props.onNextStep(_currentStepIndex, _currentScreenIndexOfStep);
              }
              next();
            }
          } else if (_currentStepIndex === 3) {
            const res = await createPolicyHandle();
            if (res?.content?.response?.goodCode) {
              if (!!props.onNextStep) {
                props.onNextStep(_currentStepIndex, _currentScreenIndexOfStep);
              }
              next();
            }
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

export default withTheme<SalePaProps>(SalePa);
