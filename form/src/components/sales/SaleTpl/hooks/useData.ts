import { useState, useMemo, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "@tanstack/react-query";

import {
  checkCouponServiceType,
  createPolicyServiceType,
  defaultValuesType,
  getPaymentInfoServiceType,
  getPlaceOrderInitServiceType,
  getProgramsServiceType,
  getProvincesServiceType,
  newMainProfileType,
  paymentServiceType,
  verifyPhoneExistsType,
} from "components/sales/types";
import {
  BUSINESS,
  CAR,
  CHECK_PRICE,
  EXECUTION,
  MOTO,
  MOTO_ZUTTO,
  NONE_BUSINESS,
} from "helper/const";
import toaster from "helper/toaster";
import fields from "../help/fields";

const mapTypeFlow = {
  car: "tpl-car",
  moto: "tpl-moto",
  "moto-zutto": "tpl-moto-zutto",
};

type useDataProps = {
  getProgramsService: getProgramsServiceType;
  getPlaceOrderInitService: getPlaceOrderInitServiceType;
  getProvincesService: getProvincesServiceType;
  createPolicyService: createPolicyServiceType;
  checkCouponService: checkCouponServiceType;
  getPaymentInfoService: getPaymentInfoServiceType;
  paymentService: paymentServiceType;
  verifyPhoneExistsService?: verifyPhoneExistsType;
  newMainProfileService: newMainProfileType;
  // props
  successEndpoint?: string;
  currentEndpoint?: string;
  blocked?: boolean;
  defaultValues?: defaultValuesType;
  typeFlow: "moto" | "car" | "moto-zutto";
};

const useData = (props: useDataProps) => {
  const useFormResult = useForm({ mode: "onTouched" });
  const [resourceCode, setResourceCode] = useState<string>();

  // use query
  const checkCouponQuery = useQuery(
    [
      "checkCoupon",
      resourceCode,
      useFormResult?.watch(fields.discountCodeSubmit),
    ],
    () =>
      props.checkCouponService({
        resourceCode: resourceCode as any,
        discountCode: useFormResult?.getValues(fields.discountCodeSubmit),
      }),
    {
      refetchOnWindowFocus: false,
      enabled: !!useFormResult?.watch(fields.discountCodeSubmit),
      onSuccess: (data) => {
        if (
          data?.message === "coupon not found" ||
          data?.message?.indexOf("coupon is not for resource") >= 0
        ) {
          toaster.error(
            "Mã giảm giá đã hết hạn sử dụng hoặc không tồn tại. Bạn vui lòng nhập lại"
          );
        } else if (data?.content?.discountCode) {
          useFormResult?.setValue(
            fields.discountCode,
            data?.content?.discountCode
          );
        }
      },
      onError: () => {
        toaster.error("Có lỗi xảy ra");
      },
    }
  );

  const getProvincesQuery = useQuery(
    ["getProvinces"],
    props.getProvincesService,
    {
      refetchOnWindowFocus: false,
    }
  );

  const getProgramsQuery = useQuery(["getPrograms"], props.getProgramsService, {
    refetchOnWindowFocus: false,
    enabled: !!props.typeFlow,
    onSuccess: (data) => {
      if (data?.statusCode === 0) {
        setResourceCode(
          data?.content?.find(
            (it: any) => it?.name === mapTypeFlow[props.typeFlow]
          )?.resourceCode
        );
      }
    },
  });

  const getPlaceOrderInitQuery = useQuery(
    ["getPlaceOrderInit", resourceCode],
    () =>
      props.getPlaceOrderInitService({
        resourceCode: resourceCode as string,
      }),
    {
      refetchOnWindowFocus: false,
      enabled: !!resourceCode,
    }
  );

  // init data
  const provincesData = useMemo(
    () => getProvincesQuery?.data?.content,
    [getProvincesQuery?.data?.content]
  );

  const orderConfigData = useMemo(
    () => getPlaceOrderInitQuery?.data?.content?.orderConfig,
    [getPlaceOrderInitQuery?.data?.content?.orderConfig]
  );

  const orderSpecsData = useMemo(
    () => getPlaceOrderInitQuery?.data?.content?.orderSpecs,
    [getPlaceOrderInitQuery?.data?.content?.orderSpecs]
  );

  const vehicleUsingData = useMemo(
    () => orderSpecsData?.vehicleUsing?.items,
    [orderSpecsData?.vehicleUsing]
  );

  const vehicleTypeCarCommerialData = useMemo(
    () => orderSpecsData?.vehicleTypeCar?.items,
    [orderSpecsData?.vehicleTypeCar?.items]
  );

  const vehicleTypeCarNonCommerialData = useMemo(
    () => orderSpecsData?.vehicleTypeCarNonCommerial?.items,
    [orderSpecsData?.vehicleTypeCarNonCommerial?.items]
  );

  const vehicleTypeMotoData = useMemo(
    () => orderSpecsData?.vehicleTypeMoto?.items,
    [orderSpecsData?.vehicleTypeMoto?.items]
  );

  const getVehicleTypeByTypeFlowAndVehicleUsingData = useCallback(
    (typeFlow, vehicleUsing) => {
      if (typeFlow === CAR && vehicleUsing === BUSINESS) {
        return vehicleTypeCarCommerialData;
      } else if (typeFlow === CAR && vehicleUsing === NONE_BUSINESS) {
        return vehicleTypeCarNonCommerialData;
      } else if ([MOTO, MOTO_ZUTTO].includes(typeFlow)) {
        return vehicleTypeMotoData;
      }
    },
    [
      vehicleTypeCarCommerialData,
      vehicleTypeCarNonCommerialData,
      vehicleTypeMotoData,
    ]
  );

  const vehicleTypeByTypeFlowAndVehicleUsingData = useMemo(
    () =>
      getVehicleTypeByTypeFlowAndVehicleUsingData(
        useFormResult?.getValues(fields.typeFlow),
        useFormResult?.getValues(fields.vehicleUsing)
      ),

    [
      getVehicleTypeByTypeFlowAndVehicleUsingData,
      useFormResult?.watch(fields.typeFlow),
      useFormResult?.watch(fields.vehicleUsing),
    ]
  );

  const vehicleSeatCountsData = useMemo(
    () => orderSpecsData?.seatCounts?.items,
    [orderSpecsData?.seatCounts?.items]
  );

  const vehicleWeightData = useMemo(
    () => orderSpecsData?.vehicleWeight?.items,
    [orderSpecsData?.vehicleWeight?.items]
  );

  const durationCarData = useMemo(
    () => orderSpecsData?.insuranceDurationCar?.items,
    [orderSpecsData?.insuranceDurationCar?.items]
  );

  const durationMotoData = useMemo(
    () => orderSpecsData?.insuranceDurationMoto?.items,
    [orderSpecsData?.insuranceDurationMoto?.items]
  );

  const getDurationByTypeFlowData = useCallback(
    (typeFlow) => {
      if (typeFlow === CAR) {
        return durationCarData;
      } else if ([MOTO, MOTO_ZUTTO].includes(typeFlow)) {
        return durationMotoData;
      }
    },
    [durationCarData, durationMotoData]
  );

  const durationByTypeFlowData = useMemo(
    () => getDurationByTypeFlowData(useFormResult?.getValues(fields.typeFlow)),
    [getDurationByTypeFlowData, useFormResult?.watch(fields.typeFlow)]
  );

  // useMutation
  const verifyMutation = useMutation(
    (options) =>
      props.verifyPhoneExistsService?.(options as any) || ((() => {}) as any)
  );

  const verifyPhoneExistsHandle = useCallback(
    async (e?: any) => {
      if (useFormResult?.getValues(fields.ownerPhone)) {
        return await verifyMutation.mutateAsync({
          phone: useFormResult?.getValues(fields.ownerPhone),
        } as any);
      }
    },
    []
    // [useFormResult?.watch(fields.ownerPhone)]
  );

  const checkPriceMutation = useMutation((options) =>
    props.createPolicyService(options as any)
  );

  const checkPriceHandle = useCallback(
    async (contextMode, e) => {
      const _name = e?.target?.name;
      const _value = e?.target?.value;

      const _data = {
        resourceCode: resourceCode,
        contextMode: contextMode,
        ...useFormResult?.getValues(),
        ...(_name && _value ? { [_name]: _value } : {}),
        vehiclePlateNo: undefined,
        vehicleChassisNo: undefined,
        vehicleEngineNo: undefined,
        discountCode: useFormResult.getValues(fields.discountCode),
        // useFormResult.getValues(fields.typeFlow) === "moto" &&
        // useFormResult.getValues(fields.pkgCode) === "PKG_TPL_ZUTTO"
        //   ? useFormResult.getValues(fields.discountCode)
        //   : "NONE",
      } as any;

      delete _data.invoiceIsCompany;

      const _res = await checkPriceMutation.mutateAsync(_data as any);

      if (!useFormResult?.getValues(fields.discountCode)) {
        useFormResult?.setValue(
          fields.discountCodeSubmit,
          _res?.content?.response?.discounts?.[0]?.discountCode
        );
      }

      return _res;
    },
    [resourceCode]
  );

  const createPolicyMutation = useMutation(
    (options) => props.createPolicyService(options as any),
    {
      onSuccess: (data, variable: any) => {
        if (!variable?.contextMode || variable?.contextMode === EXECUTION) {
          if (props.blocked && !!props.newMainProfileService) {
            const _body = {} as any;
            if (!props.defaultValues?.ownerFullName) {
              _body.fullName = useFormResult?.getValues(fields.ownerName);
            }
            if (!props.defaultValues?.ownerEmail) {
              _body.email = useFormResult?.getValues(fields.ownerEmail);
            }

            if (Object.keys(_body).length > 0)
              props.newMainProfileService(_body);
          }
        }
      },
    }
  );

  const createPolicyHandle = useCallback(
    async (contextMode, e) => {
      const _name = e?.target?.name;
      const _value = e?.target?.value;

      const _data = {
        resourceCode: resourceCode,
        contextMode: contextMode,
        ...useFormResult?.getValues(),
        ...(_name && _value ? { [_name]: _value } : {}),
        discountCode: useFormResult.getValues(fields.discountCode),
        // useFormResult.getValues(fields.typeFlow) === "moto" &&
        // useFormResult.getValues(fields.pkgCode) === "PKG_TPL_ZUTTO"
        //   ? useFormResult.getValues(fields.discountCode)
        //   : "NONE",
      };

      const _res = await createPolicyMutation.mutateAsync(_data as any);

      return _res;
    },
    [resourceCode]
  );

  // get payment info
  const getPaymentInfoQuery = useQuery(
    ["getPaymentInfo", createPolicyMutation?.data?.content?.response?.goodCode],
    () =>
      props.getPaymentInfoService({
        goodCode: createPolicyMutation?.data?.content?.response?.goodCode,
      }),
    {
      refetchOnWindowFocus: false,
      enabled: !!createPolicyMutation?.data?.content?.response?.goodCode,
    }
  );

  // payment
  const paymentMutation = useMutation(
    (options) => props.paymentService(options as any),
    {
      onError: (error) => {
        toaster.error("Thanh toán không thành công");
      },
    }
  );

  const paymentHandle = useCallback(async () => {
    return await paymentMutation.mutateAsync({
      goodCode: createPolicyMutation?.data?.content?.response?.goodCode,
      discountCodes: useFormResult?.getValues(fields.discountCode),
      paymentMethod: useFormResult?.getValues(fields.paymentMethod),
      successUrl: `${
        props.successEndpoint?.indexOf("http") !== -1
          ? ""
          : window?.location?.origin
      }${props.successEndpoint}`,
      failureUrl: `${window?.location?.origin}${props.currentEndpoint}${
        props.currentEndpoint && props.currentEndpoint.indexOf("?") >= 0
          ? "&status=failed"
          : "?status=failed"
      }`,
    } as any);
  }, [
    useFormResult?.watch(fields.discountCode),
    useFormResult?.watch(fields.paymentMethod),
    createPolicyMutation?.data?.content?.response?.goodCode,
    props.successEndpoint,
    props.currentEndpoint,
  ]);

  useEffect(() => {
    checkPriceHandle(CHECK_PRICE, null);
  }, [
    useFormResult.watch(fields.typeFlow),
    useFormResult.watch(fields.durations),
    useFormResult.watch(fields.vehicleType),
    useFormResult.watch(fields.vehicleSeatCount),
    useFormResult.watch(fields.vehicleWeight),
    useFormResult.watch(fields.vehicleUsing),
    useFormResult.watch(fields.effectiveDate),
    useFormResult.watch(fields.pkgCode),
    useFormResult.watch(fields.discountCode),
  ]);

  return {
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
  };
};

export default useData;
