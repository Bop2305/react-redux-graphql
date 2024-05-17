import React, { useCallback, useEffect, useState } from "react";
import { useTheme } from "@mui/styles";
import dayjs from "dayjs";

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
  getStaffContractByCodeType,
  getPaymentMethodsType,
  getPremiumEstType,
  defaultValuesType,
} from "../types";
import fields from "./help/fields";
import useSteps from "./hooks/useSteps";
import useData from "./hooks/useData";
import EffectiveDateTplModal from "../OrderOcar/EffectiveDateTplModal";
import DialogConfirm from "../../DialogConfirm";
import DialogForm from "components/DialogForm";

export type SaleOcarCoreSmeProps = {
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
  getStaffContractByCodeService: getStaffContractByCodeType;
  getPaymentMethodsService: getPaymentMethodsType;
  getPremiumEstService: getPremiumEstType;
  getAgentExistService: any;
  getPricingOcarCoreService: any;
  saveDocService: any;
  cancelPolicyCoreService?: any;
  getOrganizationAllService: any;
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
  saleNoPlate?: boolean;
  onTransfer?: (data: any) => void;
  onlyCarUsingBusiness?: boolean;
  isVpbStaff?: boolean;
  limitTimeToCheckCoupon?: number;
  localstorageCouponCountdownKey?: string;
  onCheckSaleDao?: any;
  onSuccess: any;
  polSumId?: number;
  polNo?: string;
  defaultValues?: defaultValuesType;
  resourceCode?: string;
  backendUpdateOrder?: boolean;
  onBackendUpdateOrder?: any;
  reinsurance?: boolean;
  coInsurances?: boolean;
  getStaffInfoService: any;
  getOrganizationHierarchiesService: any;
  saleId: number;
};

const refStepper = {};

const SaleOcarCoreSme = (props: SaleOcarCoreSmeProps) => {
  const theme = useTheme();

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
  const [tplOpenModal, setTplOpenModal] = useState(false);

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
    paymentFrequencyData,
    loanContractTypeData,
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
    carLineDataByCarTypeCarBrandCarYear,
    carVersionDataByCarLine,
    // save order
    savePlaceOrderHandle,
    savePlaceOrderLoading,
    pricingLoading,
    pricingPackages,
    payFrequencies,
    // create pool
    createPoolHandle,
    poolId,
    // create policy
    createPolicyHandle,
    createPolicyLoading,
    cancelPolicyLoading,
    // get payment info
    getPaymentInfoQuery,
    // check coupon
    checkCouponLoading,
    // payment methods
    getPaymentMethodsQuery,
    // staff info
    getStaffContractByCodeData,
    getStaffContractByCodeLoading,
    // getPremiumEstQuery
    // getPremiumEstQuery,
    hierarchies,
    getStaffInfoQuery,
  } = useData({
    getProgramsService: props.getProgramsService,
    getPlaceOrderInitService: props.getPlaceOrderInitService,
    getProvincesService: props.getProvincesService,
    getCarBrandsService: props.getCarBrandsService,
    savePlaceOrderService: props.savePlaceOrderService,
    checkCouponService: props.checkCouponService,
    createPoolService: props.createPoolService,
    createPolicyService: props.createPolicyService,
    getPaymentInfoService: props.getPaymentInfoService,
    getStaffContractByCodeService: props.getStaffContractByCodeService,
    getPaymentMethodsService: props.getPaymentMethodsService,
    getPremiumEstService: props.getPremiumEstService,
    getStaffInfoService: props.getStaffInfoService,
    getAgentExistService: props.getAgentExistService,
    getOrganizationHierarchiesService: props.getOrganizationHierarchiesService,
    getOrganizationAllService: props.getOrganizationAllService,
    orderId: props.orderId,
    goodCode: props.goodCode,
    discountCodes: props.discountCodes,
    successEndpoint: props.successEndpoint,
    currentEndpoint: props.currentEndpoint,
    localstorageCouponCountdownKey: localstorageCouponCountdownKey,
    onCheckSaleDao: props.onCheckSaleDao,
    onSuccess: props.onSuccess,
    polSumId: props.polSumId,
    polNo: props.polNo,
    resourceCode: props.resourceCode,
    coInsurances: props.coInsurances,
    refStepper: refStepper,
    saleId: props.saleId,
    currentStepIndex: currentStepIndex,
    getPricingOcarCoreService: props.getPricingOcarCoreService,
    cancelPolicyCoreService: props?.cancelPolicyCoreService,
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
    paymentFrequencyData,
    loanContractTypeData,
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
    carLineDataByCarTypeCarBrandCarYear,
    carVersionDataByCarLine,
    // save order
    savePlaceOrderHandle,
    savePlaceOrderLoading,
    pricingLoading,
    pricingPackages,
    payFrequencies,
    // create pool
    poolId,
    // other
    currentEndpoint: props.currentEndpoint,
    domainLinkFile: props.domainLinkFile,
    onlyCapture: props.onlyCapture,
    discountCodes: props.discountCodes,
    // get payment info
    getPaymentInfoQuery,
    onlyCarUsingBusiness: props?.onlyCarUsingBusiness,
    isVpbStaff: props.isVpbStaff,
    isShowCountdown,
    setIsShowCountDown,
    localstorageCouponCountdownKey: localstorageCouponCountdownKey,

    onCheckSaleDao: props.onCheckSaleDao,

    // payment methods
    getPaymentMethodsQuery,

    // staff info
    getStaffContractByCodeData,
    //
    defaultValues: props.defaultValues,
    // getPremiumEstQuery
    // getPremiumEstQuery,
    backendUpdateOrder: props.backendUpdateOrder,
    onTplEffectiveDateClick: openChangeTplEffectiveModal,
    setIsOpenDialogConfirmOffTplBundle: setIsOpenDialogConfirmOffTplBundle,
    saleNoPlate: props.saleNoPlate,
    reinsurance: props.reinsurance,
    coInsurances: props.coInsurances,
    hierarchies,
    getStaffInfoQuery,
    ocrService: props.ocrService,
    saveDocService: props.saveDocService,
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
    getStaffContractByCodeLoading ||
    cancelPolicyLoading;
  // getPremiumEstQuery.isInitialLoading ||
  // getPremiumEstQuery.isRefetching;

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
          setEffectiveDateTplModal((pre) => ({
            ...pre,
            currentStepIndex: _currentStepIndex - 1,
          }));
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

          // console.log("ON NEXT !!!!!!!!!", _currentStepIndex)

          if (_currentStepIndex === 1 && !props.polSumId) {
            console.log("savePlaceOrderHandle: ", savePlaceOrderHandle)
            const res = await savePlaceOrderHandle();

            if (res?.statusCode === 0 && res?.content?.messages?.length === 0) {
              next();
            } else if (res?.content?.messages?.length > 0) {
              let _passed = false;
              for (let i = 0; i < res?.content?.messages?.length; i++) {
                const mess = res?.content?.messages[i];

                if (mess?.field === "vehiclePlateNo") {
                  _passed = false;
                  useFormResult.setValue(fields.openEffectiveDate, true);
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

            next();

            // if (
            //   res?.statusCode === 0 &&
            //   (Object.keys(res?.content?.pricing?.packages || {})?.length > 0 ||
            //     !useFormResult.getValues(fields.carVersion))
            //   // (Object.keys(res?.content?.pricing?.packages || {})?.length > 0 ||
            //   //   (orderConfigData?.adjustingCarValueRate === -1 &&
            //   //     !useFormResult.getValues(fields.carVersion)))
            // ) {
            //   next();
            // } else {
            //   toaster.error("Có lỗi xảy ra!");
            // }
          } else if (_currentStepIndex === 3) {
            const res = await savePlaceOrderHandle();

            if (res?.statusCode === 0 && res?.content?.messages?.length === 0) {
              next();
            } else if (res?.content?.messages?.length > 0) {
              let _passed = false;
              for (let i = 0; i < res?.content?.messages?.length; i++) {
                const mess = res?.content?.messages[i];

                if (mess?.field === "vehicleValue") {
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
          } else if (
            ((_currentStepIndex === 5 && !orderConfigData?.pictureLate) ||
              (!!orderConfigData?.pictureLate && _currentStepIndex === 4)) &&
            !props.polSumId
          ) {
            await savePlaceOrderHandle();
            if (props.backendUpdateOrder) {
              props.onBackendUpdateOrder(useFormResult?.getValues());
            } else {
              if (
                useFormResult.getValues(fields.hasTplBundle) ||
                !useFormResult.getValues(fields.tplTotalPremium)
              ) {
                next();
              } else {
                setTplOpenModal(true);
              }
            }
          } else if (
            _currentStepIndex < 6 &&
            !props.polSumId &&
            !orderConfigData?.pictureLate
          ) {
            await savePlaceOrderHandle();
            next();
          } else if (
            (_currentStepIndex === 6 && !orderConfigData?.pictureLate) ||
            (_currentStepIndex === 5 && !!orderConfigData?.pictureLate)
          ) {
            useFormResult.setValue(fields.callCreatePolicy, true);
            useFormResult.setValue(fields.callCheckStaffCode, true);
          } else if (!props.polSumId) {
            next();
          }


          if (
            props.polSumId &&
            ((_currentStepIndex !== 5 && !!orderConfigData?.pictureLate) ||
              (_currentStepIndex !== 6 && !orderConfigData?.pictureLate))
          ) {
            // const _result = await getPremiumEstQuery.refetch();
            let _passed = true;

            // for (let i = 0; i < _result?.data?.content?.messages?.length; i++) {
            //   const mess = _result?.data?.content?.messages[i];

            //   if (
            //     (mess?.field === "vehicleValue" && _currentStepIndex === 3) ||
            //     mess?.field === "vehiclePlateNo"
            //   ) {
            //     _passed = false;
            //     toaster.error(mess?.reason);

            //     break;
            //   } else {
            //     _passed = true;
            //   }
            // }

            if (_passed) {
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
        title={"Bảo hiểm TNDS Ô tô"}
        open={tplOpenModal}
        onClose={() => {
          setTplOpenModal(false);
          (refStepper as any)?.next();
        }}
        closeWhenConfirm={false}
        onConfirm={() => {
          useFormResult.setValue(fields.hasTplBundle, true);
          setTplOpenModal(false);
        }}
        contentText={
          <div style={{ textAlign: "center" }}>
            Anh/Chị có mua thêm bảo hiểm trách nhiệm dân sự không?
            <br />
            <b style={{ fontSize: "1.2rem" }}>Incentive cho sản phẩm này là</b>
            <br />
            <b
              style={{
                fontSize: "1.2rem",
                color: theme.palette.primary.main,
              }}
            >
              25%
            </b>
          </div>
        }
        confirmText={"ĐỒNG Ý"}
        cancelText={"KHÔNG"}
      />
      <DialogConfirm
        fullScreen={false}
        title="Thông báo"
        open={!!useFormResult?.watch(fields.over)}
        onClose={() => useFormResult?.setValue(fields.over, false)}
        onConfirm={() => {
          if (props.reinsurance) {
            createPoolHandle();
            (refStepper as any)?.next();
          }
          // useFormResult.setValue(fields.hasTplBundle, false);
        }}
        hideCancel={true}
        closeWhenConfirm={true}
        confirmText={props.reinsurance ? "Đồng ý & tải ảnh xe" : "Xác nhận"}
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
      <DialogForm
        useFormResult={useFormResult}
        submitLabel="Xác nhận"
        inputsConfig={[
          {
            id: fields.effectiveDate,
            type: "date",
            label: "Dự kiến từ ngày",
            validations: ["required", "dateRanger"],
            min: dayjs().toDate(),
            max: dayjs().add(orderConfigData?.maxDayPurchase, "days").toDate(),
            onChange: (e: any) => {
              useFormResult?.setValue(
                fields.expireDate,
                dayjs(e?.target?.value).add(
                  useFormResult.getValues(fields.duration),
                  "months"
                )
              );
            },
          },
        ]}
        title="Cập nhật ngày hiệu lực"
        open={useFormResult.watch(fields.openEffectiveDate)}
        onClose={() => useFormResult?.setValue(fields.openEffectiveDate, false)}
        onSubmit={() =>
          useFormResult?.setValue(fields.openEffectiveDate, false)
        }
      />
    </div>
  );
};

export default withTheme<SaleOcarCoreSmeProps>(SaleOcarCoreSme);
