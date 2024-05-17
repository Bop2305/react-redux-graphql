import React from "react";

import withTheme from "hoc/withTheme";
import { EXECUTION, VALIDATE } from "helper/const";
import toaster from "helper/toaster";
import Stepper from "components/Stepper";

import useStyles from "./hooks/useStyles";
import useSteps from "./hooks/useSteps";
import useData from "./hooks/useData";
import {
  createPolicyServiceType,
  getPaymentInfoServiceType,
  paymentServiceType,
} from "../types";
import fields from "./help/fields";

type SaleCrlMorRbProps = {
  className?: string;
  resourceCode: string;
  createPolicyService: createPolicyServiceType;
  getPaymentInfoService: getPaymentInfoServiceType;
  paymentService: paymentServiceType;
  getPolicyService?: any;
  updatePolicyFuncService?: any;
  polSumId?: number;
  successEndpoint?: string;
  currentEndpoint?: string;
  transferEndpoint?: string;
  onTransfer?: any;
  onCreated: any;
};

const SaleCrlMorRb = (props: SaleCrlMorRbProps) => {
  const classes = useStyles();
  const {
    useFormResult,
    checkPriceHandle,
    checkPriceMutation,
    createPolicyHandle,
    createPolicyMutation,
    getPaymentInfoQuery,
    paymentHandle,
    paymentMutation,
    policy,
    updatePolicyHandle,
  } = useData({
    resourceCode: props.resourceCode,
    createPolicyService: props.createPolicyService,
    getPaymentInfoService: props.getPaymentInfoService,
    paymentService: props.paymentService,
    updatePolicyFuncService: props.updatePolicyFuncService,
    getPolicyService: props.getPolicyService,
    successEndpoint: props.successEndpoint,
    currentEndpoint: props.currentEndpoint,
    polSumId: props.polSumId,
  });
  const steps = useSteps({
    useFormResult,
    checkPriceHandle,
    checkPriceMutation,
    getPaymentInfoQuery,
    policy,
  });

  return (
    <div className={`${classes.wrapper} ${props.className}`}>
      <input placeholder="Test" />
      <Stepper
        inputsWrapperClass={classes.inputsWrapperClass}
        steps={steps}
        useFormResult={useFormResult}
        defaultStepIndex={1}
        defaultScreenIndexOfStep={1}
        autoNext={false}
        loading={
          createPolicyMutation?.isLoading ||
          paymentMutation?.isLoading ||
          checkPriceMutation?.isLoading
        }
        onBack={(_data, _currentStepIndex, _currentScreenIndexOfStep, back) => {
          useFormResult?.setValue(fields.currentStepIndex, _currentStepIndex);
        }}
        onNext={async (
          _data,
          _currentStepIndex,
          _currentScreenIndexOfStep,
          next
        ) => {
          useFormResult?.setValue(fields.currentStepIndex, _currentStepIndex);
          if ([1, 2].includes(_currentStepIndex)) {
            next();
          } else if (_currentStepIndex === 3) {
            if (props.polSumId) {
              const _res = (await updatePolicyHandle()) as any;
              if (_res?.statusCode === 0) {
                props.onCreated({
                  polSumId: props.polSumId,
                });
                // next();
              } else {
                toaster.error("Có lỗi xảy ra");
              }
            } else {
              const _res = await createPolicyHandle();
              if (_res?.statusCode === 0) {
                props.onCreated({
                  polSumId: _res?.content?.response?.polSumId,
                });
                // next();
              } else {
                toaster.error("Có lỗi xảy ra");
              }
            }
          }
          // else if (_currentStepIndex === 4) {
          //   const res = await paymentHandle();
          //   if (res?.content?.paymentUrl) {
          //     window?.location?.replace(res?.content?.paymentUrl);
          //   } else if (
          //     res?.content?.virtualAccount ||
          //     (props.polSumId && res?.statusCode === 0)
          //   ) {
          //     if (props.transferEndpoint) {
          //       window.location.href = `${window?.location?.origin}${props.transferEndpoint}?goodCode=${res?.content?.goodCode}`;
          //     } else {
          //       if (typeof props.onTransfer === "function")
          //         props.onTransfer({
          //           polSumId:
          //             createPolicyMutation?.data?.content?.response?.polSumId ||
          //             props.polSumId,
          //           ...res?.content,
          //         });
          //     }
          //   }
          // }
        }}
      />
    </div>
  );
};

export default withTheme<SaleCrlMorRbProps>(SaleCrlMorRb);
