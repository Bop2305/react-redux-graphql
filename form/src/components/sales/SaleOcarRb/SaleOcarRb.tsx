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
  getPaymentMethodsType,
  getPremiumEstType,
} from "../types";
import fields from "./help/fields";
import useSteps from "./hooks/useSteps";
import useData from "./hooks/useData";
import { TRUCK } from "../../../helper/const";
import EffectiveDateTplModal from "../OrderOcar/EffectiveDateTplModal";
import DialogConfirm from "../../DialogConfirm";

export type SaleOcarRbProps = {
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
  resourceCode?: string;
  backendUpdateOrder?: boolean;
  onBackendUpdateOrder?: any;
  coInsurances?: boolean;
  saleNoPlate?: boolean;
};

const SaleOcarRb = (props: SaleOcarRbProps) => {
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
    coInsurancesData,
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
    // check coupon
    checkCouponLoading,
    // payment methods
    getPaymentMethodsQuery,
    // getPremiumEstQuery
    getPremiumEstQuery,
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
    getPaymentMethodsService: props.getPaymentMethodsService,
    getPremiumEstService: props.getPremiumEstService,
    orderId: props.orderId,
    goodCode: props.goodCode,
    discountCodes: props.discountCodes,
    successEndpoint: props.successEndpoint,
    currentEndpoint: props.currentEndpoint,
    localstorageCouponCountdownKey: localstorageCouponCountdownKey,
    onSuccess: props.onSuccess,
    polSumId: props.polSumId,
    domainLinkSendCustomer: props.domainLinkSendCustomer,
    saleCode: props.saleCode,
    resourceCode: props.resourceCode,
    coInsurances: props.coInsurances,
  });

  const steps = useSteps({
    limitTimeToCheckCoupon: props.limitTimeToCheckCoupon,
    useFormResult,
    // service
    feedbackInfoCarService: props.feedbackInfoCarService,
    submitCarInspectionImageService: props.submitCarInspectionImageService,
    getCarInspectionResultService: props.getCarInspectionResultService,
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
    coInsurancesData,
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
    // payment methods
    getPaymentMethodsQuery,
    domainLinkSendCustomer: props.domainLinkSendCustomer,
    saleCode: props.saleCode,
    // getPremiumEstQuery
    getPremiumEstQuery,
    backendUpdateOrder: props.backendUpdateOrder,
    onTplEffectiveDateClick: openChangeTplEffectiveModal,
    setIsOpenDialogConfirmOffTplBundle: setIsOpenDialogConfirmOffTplBundle,
    coInsurances: props.coInsurances,
    saleNoPlate: props.saleNoPlate,
  });

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
          if (!props.polSumId) {
            const res = await savePlaceOrderHandle();

            if (res?.statusCode === 0) {
              back();
            }
          } else {
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

          if (_currentStepIndex === 1 && !props.polSumId) {
            const res = await savePlaceOrderHandle();

            if (res?.statusCode === 0 && res?.content?.messages?.length === 0) {
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
                next();
              }
            }
          } else if (_currentStepIndex === 2 && !props.polSumId) {
            const res = await savePlaceOrderHandle();

            useFormResult?.setValue(
              fields.sumInsurance,
              res?.content?.estCarValue
            );

            if (
              res?.statusCode === 0 &&
              (Object.keys(res?.content?.pricing?.packages || {})?.length > 0 ||
                !useFormResult.getValues(fields.carVersion))
              // (Object.keys(res?.content?.pricing?.packages || {})?.length > 0 ||
              //   (orderConfigData?.adjustingCarValueRate === -1 &&
              //     !useFormResult.getValues(fields.carVersion)))
            ) {
              next();
            } else {
              toaster.error("Có lỗi xảy ra!");
            }
          } else if (_currentStepIndex < 5 && !props.polSumId) {
            await savePlaceOrderHandle();
            next();
          } else if (_currentStepIndex === 5 && !props.polSumId) {
            await savePlaceOrderHandle();
            if (props.backendUpdateOrder) {
              props.onBackendUpdateOrder(useFormResult?.getValues());
            } else {
              next();
            }
          } else if (_currentStepIndex === 6) {
            useFormResult.setValue(fields.callCreatePolicy, true);
            await savePlaceOrderHandle();
          } else {
            next();
          }

          if (_currentStepIndex === 2 && props.polSumId) {
            const _result = await getPremiumEstQuery.refetch();

            if (_result?.data?.content?.messages?.length > 0) {
              toaster.error(_result?.data?.content?.messages?.[0]?.reason);
            } else {
              next();
            }
          }

          if (_currentStepIndex === 3) {
            createPoolHandle();
          }
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
        onConfirm={() => {
          useFormResult.setValue(fields.hasTplBundle, false);
        }}
        hideCancel={true}
        closeWhenConfirm={true}
        contentText={
          <span>
            Cảm ơn bạn đã quan tâm đến bảo hiểm OCAR
            <br /> OPES sẽ cập nhật lại chương trình bảo hiểm và liên hệ với bạn
            trong thời gian sớm nhất
          </span>
        }
      />
    </div>
  );
};

export default withTheme<SaleOcarRbProps>(SaleOcarRb);
