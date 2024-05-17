import React, { useCallback, useEffect, useState } from "react";

import toaster from "helper/toaster";
import withTheme from "hoc/withTheme";
import Stepper from "components/Stepper";

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
  getPremiumEstType,
  defaultValuesType,
  verifyPhoneExistsType,
  newMainProfileType,
  getCouponsType,
  submitReinsuranceServiceType,
} from "../types";
import fields from "./help/fields";
import useSteps from "./hooks/useSteps";
import useData from "./hooks/useData";
import { TRUCK } from "../../../helper/const";
import EffectiveDateTplModal from "../OrderOcar/EffectiveDateTplModal";
import BenModal from "../OrderOcar/BenModal";
import DialogConfirm from "../../DialogConfirm";

export type SaleOcarProps = {
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
  getPremiumEstService: getPremiumEstType;
  verifyPhoneExistsService?: verifyPhoneExistsType;
  newMainProfileService: newMainProfileType;
  getCouponsService: getCouponsType;
  submitReinsuranceService: submitReinsuranceServiceType;
  ocrService: any;
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
  saleCode?: string;
  resourceCode?: string;
  defaultValues?: defaultValuesType;
  blocked?: boolean;
  loggedIn?: boolean;
  onVerifyPhoneExists?: any;
  backendUpdateOrder?: boolean;
  onBackendUpdateOrder?: any;
  onNextStep?: any;
  showBen?: boolean;
  saleNoPlate?: boolean;
  reinsurance?: boolean;
  onCreatePolicyReInsurance?: any;
};

const refStepper = {};

const SaleOcar = (props: SaleOcarProps) => {
  const localstorageCouponCountdownKey =
    props.localstorageCouponCountdownKey || "totalCountdownRemaining";

  const [
    { isOpenEffectiveDateTplModal, currentStepIndex },
    setEffectiveDateTplModal,
  ] = useState({
    isOpenEffectiveDateTplModal: false,
    currentStepIndex: 0,
  });
  const [isOpenDialogConfirmOffTplBundle, setIsOpenDialogConfirmOffTplBundle] =
    useState(false);

  const openChangeTplEffectiveModal = useCallback(() => {
    setEffectiveDateTplModal((pre) => ({
      ...pre,
      isOpenEffectiveDateTplModal: true,
    }));
  }, []);

  const closeChangeTplEffectiveModal = useCallback(() => {
    setEffectiveDateTplModal((pre) => ({
      ...pre,
      isOpenEffectiveDateTplModal: false,
    }));
  }, []);

  const {
    isShowCountdown,
    setIsShowCountDown,
    useFormResult,
    // init order data
    pendingOrderData,
    carUsingData,
    getCarTypeDataByCarUsing,
    carTypeDataByCarUsing,
    carYearDataAll,
    carWeightData,
    genderData,
    durationData,
    orderConfigData,
    deductibleData,
    packageCodeData,
    benBanksData,
    // province data
    cityData,
    // car data
    carBrandData,
    // getCarBrandDataByRefSpecs,
    // carBrandDataByRefSpecs,
    getCarBrandDataByCarType,
    carBrandDataByCarType,
    carYearDataByCarBrand,
    getCarLineDataByCarTypeCarBrandCarYear,
    carLineDataByCarTypeCarBrandCarYear,
    getCarVersionDataByCarLine,
    carVersionDataByCarLine,
    // save order
    savePlaceOrderHandle,
    savePlaceOrderLoading,
    pricingPackages,
    // create pool
    createPoolHandle,
    poolId,
    // create policy
    createPolicyHandle,
    createPolicyLoading,
    // get payment info
    getPaymentInfoQuery,
    // payment
    paymentHandle,
    paymentLoadding,
    // submit reinsurance
    submitReinsuranceMutation,
    // check coupon
    checkCouponLoading,
    // verify
    verifyPhoneExistsHandle,
    resourceCode,
  } = useData({
    getProgramsService: props.getProgramsService,
    getPlaceOrderInitService: props.getPlaceOrderInitService,
    getProvincesService: props.getProvincesService,
    getCarBrandsService: props.getCarBrandsService,
    getCarDataByCarTypeCarBrandCarYearService:
      props.getCarDataByCarTypeCarBrandCarYearService,
    savePlaceOrderService: props.savePlaceOrderService,
    checkCouponService: props.checkCouponService,
    createPoolService: props.createPoolService,
    createPolicyService: props.createPolicyService,
    getPaymentInfoService: props.getPaymentInfoService,
    paymentService: props.paymentService,
    getPremiumEstService: props.getPremiumEstService,
    verifyPhoneExistsService: props.verifyPhoneExistsService,
    newMainProfileService: props.newMainProfileService,
    submitReinsuranceService: props.submitReinsuranceService,
    orderId: props.orderId,
    goodCode: props.goodCode,
    discountCodes: props.discountCodes,
    successEndpoint: props.successEndpoint,
    currentEndpoint: props.currentEndpoint,
    localstorageCouponCountdownKey: localstorageCouponCountdownKey,
    resourceCode: props.resourceCode,
    blocked: props.blocked,
    defaultValues: props.defaultValues,
    onCreatePolicyReInsurance: props.onCreatePolicyReInsurance,
  });

  const steps = useSteps({
    limitTimeToCheckCoupon: props.limitTimeToCheckCoupon,
    useFormResult,
    // service
    feedbackInfoCarService: props.feedbackInfoCarService,
    submitCarInspectionImageService: props.submitCarInspectionImageService,
    getCarInspectionResultService: props.getCarInspectionResultService,
    getCouponsService: props.getCouponsService,
    ocrService: props.ocrService,
    // init order data
    pendingOrderData,
    carUsingData,
    getCarTypeDataByCarUsing,
    carTypeDataByCarUsing,
    carYearDataAll,
    carWeightData,
    genderData,
    durationData,
    orderConfigData,
    deductibleData,
    packageCodeData,
    // province data
    cityData,
    // car data
    carBrandData,
    // getCarBrandDataByRefSpecs,
    // carBrandDataByRefSpecs,
    getCarBrandDataByCarType,
    carBrandDataByCarType,
    carYearDataByCarBrand,
    getCarLineDataByCarTypeCarBrandCarYear,
    carLineDataByCarTypeCarBrandCarYear,
    getCarVersionDataByCarLine,
    carVersionDataByCarLine,
    // save order
    savePlaceOrderHandle,
    savePlaceOrderLoading,
    pricingPackages,
    // create pool
    poolId,
    // other
    currentEndpoint: props.currentEndpoint,
    domainLinkFile: props.domainLinkFile,
    onlyCapture: props.onlyCapture,
    discountCodes: props.discountCodes,
    showHasBankLoan: props.showHasBankLoan,
    // get payment info
    getPaymentInfoQuery,
    onlyCarUsingBusiness: props?.onlyCarUsingBusiness,
    isVpbStaff: props.isVpbStaff,
    isShowCountdown,
    setIsShowCountDown,
    localstorageCouponCountdownKey: localstorageCouponCountdownKey,
    notRequireCapture: props.notRequireCapture,
    saleCode: props.saleCode,
    blocked: props.blocked,
    //
    defaultValues: props.defaultValues,
    backendUpdateOrder: props.backendUpdateOrder,
    onTplEffectiveDateClick: openChangeTplEffectiveModal,
    setIsOpenDialogConfirmOffTplBundle: setIsOpenDialogConfirmOffTplBundle,
    resourceCode: resourceCode as string,
    showBen: props.showBen,
    saleNoPlate: props.saleNoPlate,
  });

  useEffect(() => {
    if ((props.defaultStepIndex as number) >= 3) {
      createPoolHandle();
    }
  }, [createPoolHandle, props.defaultStepIndex]);

  useEffect(() => {
    const hasTplBundle = useFormResult.getValues(fields.hasTplBundle);
    if (hasTplBundle && currentStepIndex === 4) {
      setEffectiveDateTplModal((pre) => {
        return {
          ...pre,
          isOpenEffectiveDateTplModal: !!hasTplBundle,
        };
      });
      useFormResult.setValue(
        fields.effectiveDateTpl,
        useFormResult.getValues(fields.effectiveDate)
      );
    }
  }, [useFormResult.watch(fields.hasTplBundle), currentStepIndex]);

  const isLoading =
    savePlaceOrderLoading ||
    checkCouponLoading ||
    createPolicyLoading ||
    paymentLoadding;

  return (
    <div className={props.className}>
      <Stepper
        refStepper={refStepper}
        steps={steps}
        useFormResult={useFormResult}
        defaultStepIndex={props.defaultStepIndex || 1}
        defaultScreenIndexOfStep={1}
        autoNext={false}
        autoBack={false}
        loading={isLoading}
        onBack={async (
          _data,
          _currentStepIndex,
          _currentScreenIndexOfStep,
          back
        ) => {
          const res = await savePlaceOrderHandle();

          if (res?.statusCode === 0) {
            back();
          }
        }}
        onNext={async (
          _data,
          _currentStepIndex,
          _currentScreenIndexOfStep,
          next
        ) => {
          setEffectiveDateTplModal((pre) => ({
            ...pre,
            currentStepIndex: _currentStepIndex,
          }));
          if (_currentStepIndex === 1) {
            const res = await savePlaceOrderHandle();

            if (res?.statusCode === 0 && res?.content?.messages?.length === 0) {
              if (!!props.onNextStep) {
                props.onNextStep(_currentStepIndex, _currentScreenIndexOfStep);
              }
              next();
            } else if (res?.content?.messages?.length > 0) {
              let _passed = false;
              for (let i = 0; i < res?.content?.messages?.length; i++) {
                const mess = res?.content?.messages[i];

                if (mess?.field === "vehiclePlateNo") {
                  _passed = false;
                  toaster.error(mess?.reason);

                  break;
                } else {
                  _passed = true;
                }
              }

              if (_passed) {
                if (!!props.onNextStep) {
                  props.onNextStep(
                    _currentStepIndex,
                    _currentScreenIndexOfStep
                  );
                }
                next();
              }
            }
          } else if (_currentStepIndex === 2) {
            let resVerify;
            if (!!props.verifyPhoneExistsService && !props.loggedIn) {
              resVerify = await verifyPhoneExistsHandle();
            }

            if ((resVerify as any)?.content?.exist) {
              props.onVerifyPhoneExists((resVerify as any)?.content?.exist);
              return;
            }

            const res = await savePlaceOrderHandle();

            useFormResult?.setValue(
              fields.sumInsurance,
              res?.content?.estCarValue
            );

            if (
              res?.statusCode === 0 &&
              Object.keys(res?.content?.pricing?.packages || {})?.length > 0
              // ||
              //   useFormResult
              //     ?.getValues(fields.refSpecs)
              //     ?.find((v: any) => v?.indexOf(TRUCK) !== -1)
            ) {
              if (!!props.onNextStep) {
                props.onNextStep(_currentStepIndex, _currentScreenIndexOfStep);
              }
              next();
            } else {
              toaster.error("Có lỗi xảy ra!");
            }
          } else if (_currentStepIndex < 5) {
            savePlaceOrderHandle();
            if (!!props.onNextStep) {
              props.onNextStep(_currentStepIndex, _currentScreenIndexOfStep);
            }
            next();
          } else if (_currentStepIndex === 5) {
            useFormResult.setValue(fields.callCreatePolicy, true);
            await savePlaceOrderHandle();
            if (props.backendUpdateOrder) {
              props.onBackendUpdateOrder(useFormResult?.getValues());
            } else {
              if (!!props.onNextStep) {
                props.onNextStep(_currentStepIndex, _currentScreenIndexOfStep);
              }
              if (
                useFormResult.getValues(fields.passLimitSumInsurance) !== false
              ) {
                next();
              }
            }
          } else if (_currentStepIndex === 6) {
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
          }

          if (_currentStepIndex === 3) {
            createPoolHandle();
          }
        }}
      />
      <BenModal
        banks={benBanksData?.map((it: any) => ({
          value: it?.value,
          label: it?.name,
        }))}
        isOpen={!!useFormResult?.watch(fields.benModalOpen)}
        onClose={() => {
          useFormResult?.setValue(fields.benModalOpen, false);

          if (
            !useFormResult?.getValues(fields.beneficiaries) ||
            useFormResult?.getValues(fields.beneficiaries)?.length === 0
          ) {
            useFormResult?.setValue(
              fields.hasBen,
              !useFormResult?.getValues(fields.hasBen)
            );
          }
        }}
        defaultValues={useFormResult?.getValues(fields.beneficiaries)?.[0]}
        onSubmit={(values) => {
          useFormResult?.setValue(fields.beneficiaries, [values]);
          useFormResult?.setValue(fields.benModalOpen, false);
        }}
      />
      <EffectiveDateTplModal
        isOpen={isOpenEffectiveDateTplModal && !isLoading}
        onClose={closeChangeTplEffectiveModal}
        onSubmit={(values) => {
          useFormResult.setValue(
            fields.effectiveDateTpl,
            values?.effectiveDateTpl
          );
          closeChangeTplEffectiveModal();
        }}
        defaultValues={{
          effectiveDateTpl: useFormResult.getValues(fields.effectiveDateTpl),
        }}
      />
      <DialogConfirm
        fullScreen={false}
        title={"Bảo hiểm TNDS Ô tô"}
        open={isOpenDialogConfirmOffTplBundle}
        onClose={() => setIsOpenDialogConfirmOffTplBundle(false)}
        onConfirm={() => {
          useFormResult.setValue(fields.hasTplBundle, false);
        }}
        contentText={"Bạn muốn hủy mua bảo hiểm TNDS xe ô tô?"}
        confirmText={"ĐỒNG Ý"}
        cancelText={"KHÔNG"}
      />
      <DialogConfirm
        fullScreen={false}
        title="Thông báo"
        open={!!useFormResult?.watch(fields.over)}
        onClose={() => useFormResult?.setValue(fields.over, false)}
        onConfirm={async () => {
          if (props.reinsurance) {
            const res = await submitReinsuranceMutation.mutateAsync({
              orderId: pendingOrderData?.orderId,
            } as any);

            if (res.content) {
              createPoolHandle();
              (refStepper as any)?.next();
            } else {
              toaster.error("Có lỗi xảy ra");
            }
          }
          useFormResult.setValue(fields.hasTplBundle, false);
        }}
        hideCancel={true}
        closeWhenConfirm={true}
        confirmText={props.reinsurance ? "Đồng ý & chụp ảnh xe" : "Xác nhận"}
        contentText={
          props.reinsurance ? (
            <span>
              Cảm ơn bạn đã quan tâm đến bảo hiểm OCAR
              <br />
              <br />
              Thời gian xử lý yêu cầu bảo hiểm xe của bạn có thể kéo dài 01 ngày
            </span>
          ) : (
            <span>
              Cảm ơn bạn đã quan tâm đến bảo hiểm OCAR
              <br /> OPES sẽ cập nhật lại chương trình bảo hiểm và liên hệ với
              bạn trong thời gian sớm nhất
            </span>
          )
        }
      />
    </div>
  );
};

export default withTheme<SaleOcarProps>(SaleOcar);
