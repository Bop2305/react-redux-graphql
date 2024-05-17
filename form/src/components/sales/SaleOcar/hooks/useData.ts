import { useCallback, useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import toaster from "helper/toaster";

import {
  checkCouponServiceType,
  createPolicyServiceType,
  createPoolServiceType,
  getCarBrandsServiceType,
  getCarDataByCarTypeCarBrandCarYearServiceType,
  getPaymentInfoServiceType,
  getPlaceOrderInitServiceType,
  getProgramsServiceType,
  getProvincesServiceType,
  paymentServiceType,
  savePlaceOrderServiceType,
  getPremiumEstType,
  verifyPhoneExistsType,
  newMainProfileType,
  defaultValuesType,
  getCouponsType,
  submitReinsuranceServiceType,
} from "../../types";
import fields from "../help/fields";
import {
  EXECUTION,
  FRONT_LEFT_VIEW,
  FRONT_RIGHT_VIEW,
  REAR_LEFT_VIEW,
  REAR_RIGHT_VIEW,
  TRUCK,
} from "helper/const";
import convertDateToString from "helper/converts/convertDateToString";

type useDataProps = {
  getProgramsService: getProgramsServiceType;
  getPlaceOrderInitService: getPlaceOrderInitServiceType;
  getProvincesService: getProvincesServiceType;
  getCarBrandsService: getCarBrandsServiceType;
  getCarDataByCarTypeCarBrandCarYearService: getCarDataByCarTypeCarBrandCarYearServiceType;
  savePlaceOrderService: savePlaceOrderServiceType;
  checkCouponService: checkCouponServiceType;
  createPoolService: createPoolServiceType;
  createPolicyService: createPolicyServiceType;
  getPaymentInfoService: getPaymentInfoServiceType;
  paymentService: paymentServiceType;
  getPremiumEstService: getPremiumEstType;
  verifyPhoneExistsService?: verifyPhoneExistsType;
  newMainProfileService: newMainProfileType;
  submitReinsuranceService: submitReinsuranceServiceType;
  orderId?: string;
  goodCode?: string;
  discountCodes?: string;
  successEndpoint?: string;
  currentEndpoint?: string;
  localstorageCouponCountdownKey: string;
  resourceCode?: string;
  blocked?: boolean;
  defaultValues?: defaultValuesType;
  onCreatePolicyReInsurance?: any;
};

const useData = (props: useDataProps) => {
  const useFormResult = useForm({ mode: "onTouched" });
  const [resourceCode, setResourceCode] = useState<string>();
  const [pricingPackages, setPricingPackages] = useState();
  const [isShowCountdown, setIsShowCountDown] = useState(false);

  useEffect(() => {
    setResourceCode(props.resourceCode);
  }, [props.resourceCode, useFormResult.setValue]);

  // use query
  const getCarBrandsQuery = useQuery(
    ["getCarBrands"],
    props.getCarBrandsService,
    {
      refetchOnWindowFocus: false,
    }
  );

  const getCarDataByCarTypeCarBrandCarYearQuery = useQuery(
    [
      "getCarDataByCarTypeCarBrandCarYear",
      useFormResult?.getValues(fields.carType),
      useFormResult?.getValues(fields.carBrand),
      useFormResult?.getValues(fields.carYear),
    ],
    () =>
      props.getCarDataByCarTypeCarBrandCarYearService({
        carType: useFormResult?.getValues(fields.carType),
        carBrand: useFormResult?.getValues(fields.carBrand),
        carYear: useFormResult?.getValues(fields.carYear),
      }),
    {
      refetchOnWindowFocus: false,
      enabled:
        !!useFormResult?.watch(fields.carType) &&
        !!useFormResult?.watch(fields.carBrand) &&
        !!useFormResult?.watch(fields.carYear),
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
    enabled: !props.resourceCode,
    onSuccess: (data) => {
      if (data?.statusCode === 0 && !props.resourceCode) {
        const _rs = data?.content?.find(
          (it) => it?.progLine === "CAR"
        )?.resourceCode;
        setResourceCode(_rs);
      }
    },
  });

  const getPlaceOrderInitQuery = useQuery(
    ["getPlaceOrderInit", resourceCode, props.orderId],
    () =>
      props.getPlaceOrderInitService({
        resourceCode: resourceCode as string,
        orderId: props.orderId as string,
      }),
    {
      refetchOnWindowFocus: false,
      enabled: !!resourceCode,
    }
  );

  useEffect(() => {
    if (props.discountCodes) {
      useFormResult?.setValue(fields.callCheckDiscount, true);
      useFormResult?.setValue(fields.discountCode, props.discountCodes);
    }
  }, [props.discountCodes]);

  const checkCouponServiceQuery = useQuery(
    [
      "checkCouponService",
      useFormResult?.getValues(fields.discountCode) || props.discountCodes,
      resourceCode,
    ],
    () =>
      props.checkCouponService({
        discountCode:
          useFormResult?.getValues(fields.discountCode) || props.discountCodes,
        resourceCode: resourceCode as string,
      }),
    {
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!useFormResult?.watch(fields.callCheckDiscount),
      onSuccess: (data: any) => {
        useFormResult?.setValue(fields.callCheckDiscount, false);
        if (
          data?.message === "coupon not found" &&
          !!useFormResult?.getValues(fields.discountCode)
        ) {
          toaster.error("Không tìm thấy mã khuyến mại!");
          savePlaceOrderHandle();
        } else if (data?.message === "CONSTRAINT_VIOLATION") {
          setIsShowCountDown(true);
          return toaster.error(
            "Bạn nhập sai mã quá nhiều lần, vui lòng thử lại sau ít phút"
          );
        } else if (
          !data?.content?.couponInfo?.couIsActive &&
          !!useFormResult?.getValues(fields.discountCode)
        ) {
          toaster.error("Mã khuyến mại hết hiệu lực!");
          savePlaceOrderHandle();
        } else if (data?.content?.couponInfo?.couIsActive) {
          useFormResult?.setValue(
            fields.discountCode,
            data?.content?.discountCode || undefined
          );

          savePlaceOrderHandle({
            target: {
              name: fields.discountCode,
              value: data?.content?.discountCode,
            },
          });
        }
      },
      onError: () => {
        useFormResult?.setValue(fields.callCheckDiscount, false);
        savePlaceOrderHandle();
      },
    }
  );

  // convert data
  // init order data
  const pendingOrderData = useMemo(
    () =>
      getPlaceOrderInitQuery?.data?.content?.pendingOrders?.find(
        (it: any) => it?.resourceCode === resourceCode
      ),
    [getPlaceOrderInitQuery?.data?.content?.pendingOrders, resourceCode]
  );

  const carUsingData = useMemo(
    () =>
      getPlaceOrderInitQuery?.data?.content?.orderSpecs?.businessUsing?.items,
    [getPlaceOrderInitQuery?.data?.content?.orderSpecs?.businessUsing?.items]
  );

  const getCarTypeDataByCarUsing = useCallback(
    (value) =>
      carUsingData?.find((it: any) => it?.value === value)?.child?.items,
    [carUsingData]
  );

  const carTypeDataByCarUsing = useMemo(
    () => getCarTypeDataByCarUsing(useFormResult?.getValues(fields.carUsing)),
    [getCarTypeDataByCarUsing, useFormResult?.watch(fields.carUsing)]
  );

  const carYearDataAll = useMemo(
    () =>
      getPlaceOrderInitQuery?.data?.content?.orderSpecs?.manufactureYear?.items,
    [getPlaceOrderInitQuery?.data?.content?.orderSpecs?.manufactureYear?.items]
  );

  const carWeightData = useMemo(
    () => getPlaceOrderInitQuery?.data?.content?.orderSpecs?.weights?.items,
    [getPlaceOrderInitQuery?.data?.content?.orderSpecs?.weights?.items]
  );

  const genderData = useMemo(
    () => getPlaceOrderInitQuery?.data?.content?.orderSpecs?.gender?.items,
    [getPlaceOrderInitQuery?.data?.content?.orderSpecs?.gender?.items]
  );

  const durationData = useMemo(
    () =>
      getPlaceOrderInitQuery?.data?.content?.orderSpecs?.insuranceDuration
        ?.items,
    [
      getPlaceOrderInitQuery?.data?.content?.orderSpecs?.insuranceDuration
        ?.items,
    ]
  );

  const benBanksData = useMemo(
    () => getPlaceOrderInitQuery?.data?.content?.orderSpecs?.benBankList?.items,
    [getPlaceOrderInitQuery?.data?.content?.orderSpecs?.benBankList?.items]
  );

  const orderConfigData = useMemo(
    () => getPlaceOrderInitQuery?.data?.content?.orderConfig,
    [getPlaceOrderInitQuery?.data?.content?.orderConfig]
  );

  const deductibleData = useMemo(
    () =>
      getPlaceOrderInitQuery?.data?.content?.orderSpecs?.deductible?.items?.map(
        (it: any) => ({ ...it, name: it?.name?.replace(/,/g, ".") })
      ),
    [getPlaceOrderInitQuery?.data?.content?.orderSpecs?.deductible?.items]
  );

  const packageCodeData = useMemo(
    () => getPlaceOrderInitQuery?.data?.content?.packages,
    [getPlaceOrderInitQuery?.data?.content?.packages]
  );

  // province data
  const cityData = useMemo(
    () => getProvincesQuery?.data?.content,
    [getProvincesQuery?.data?.content]
  );

  // car data
  const carBrandData = useMemo(
    () => getCarBrandsQuery?.data?.content,
    [getCarBrandsQuery?.data?.content]
  );

  // const getCarBrandDataByRefSpecs = useCallback(
  //   (value) => {
  //     if (!value) {
  //       return [];
  //     } else if (value?.find((v: any) => v?.indexOf(TRUCK) !== -1)) {
  //       return carBrandData?.truck;
  //     } else {
  //       return carBrandData?.normalCar;
  //     }
  //   },
  //   [carBrandData?.truck, carBrandData?.normalCar]
  // );

  // const carBrandDataByRefSpecs = useMemo(
  //   () => getCarBrandDataByRefSpecs(useFormResult?.getValues(fields.refSpecs)),
  //   [getCarBrandDataByRefSpecs, useFormResult?.watch(fields.refSpecs)]
  // );

  const getCarBrandDataByCarType = useCallback(
    (value) => {
      return (
        carBrandData?.find(
          (it: any) => !!it?.vehicleTypes?.find((vt: any) => vt === value)
        )?.brands || []
      );
    },
    [carBrandData]
  );

  const carBrandDataByCarType = useMemo(
    () => getCarBrandDataByCarType(useFormResult?.getValues(fields.carType)),
    [getCarBrandDataByCarType, useFormResult?.watch(fields.carType)]
  );

  // const carYearDataByCarBrand = useMemo(
  //   () =>
  //     carBrandDataByRefSpecs?.find(
  //       (it: any) => it?.value === useFormResult?.getValues(fields.carBrand)
  //     )?.years,
  //   [carBrandDataByRefSpecs, useFormResult?.watch(fields.carBrand)]
  // );

  const carYearDataByCarBrand = useMemo(
    () =>
      carBrandDataByCarType?.find(
        (it: any) => it?.value === useFormResult?.getValues(fields.carBrand)
      )?.years,
    [carBrandDataByCarType, useFormResult?.watch(fields.carBrand)]
  );

  const getCarLineDataByCarTypeCarBrandCarYear = useCallback(
    async (carType, carBrand, carYear) => {
      return await props.getCarDataByCarTypeCarBrandCarYearService({
        carType: carType,
        carBrand: carBrand,
        carYear: carYear,
      });
    },
    [props.getCarDataByCarTypeCarBrandCarYearService]
  );

  const carLineDataByCarTypeCarBrandCarYear = useMemo(
    () => getCarDataByCarTypeCarBrandCarYearQuery?.data?.content,
    [getCarDataByCarTypeCarBrandCarYearQuery?.data?.content]
  );

  const getCarVersionDataByCarLine = useCallback(
    (value, carLineDataByCarTypeCarBrandCarYear) =>
      carLineDataByCarTypeCarBrandCarYear?.find(
        (it: any) => it?.value === value
      )?.child?.items,
    []
  );

  const carVersionDataByCarLine = useMemo(
    () =>
      carLineDataByCarTypeCarBrandCarYear?.find(
        (it: any) => it?.value === useFormResult?.getValues(fields.carLine)
      )?.child?.items,
    [carLineDataByCarTypeCarBrandCarYear, useFormResult?.watch(fields.carLine)]
  );

  // use mutate
  const verifyMutation = useMutation(
    (options) =>
      props.verifyPhoneExistsService?.(options as any) || ((() => {}) as any)
  );

  const verifyPhoneExistsHandle = useCallback(
    async (e?: any) => {
      if (useFormResult?.getValues(fields.ownerPhoneNumber)) {
        return await verifyMutation.mutateAsync({
          phone: useFormResult?.getValues(fields.ownerPhoneNumber),
        } as any);
      }
    },
    [useFormResult?.watch(fields.ownerPhoneNumber)]
  );

  // save place order
  const savePlaceOrderMutation = useMutation(
    (options) => props.savePlaceOrderService(options as any),
    {
      onSuccess: (data, variables: any) => {
        useFormResult?.setValue(
          fields.passLimitSumInsurance,
          data?.content?.passLimitSumInsurance
        );

        if (
          variables?.[fields.activeRegionProvince] ||
          data?.content?.update?.activeRegionProvinceCode
        ) {
          // active region province
          const _activeRegionProvince =
            variables?.[fields.activeRegionProvince] ||
            data?.content?.update?.activeRegionProvinceCode;
          useFormResult?.setValue(
            fields.activeRegionProvince,
            _activeRegionProvince
          );
          useFormResult?.setValue(
            fields.activeRegionProvinceName,
            cityData?.find((it: any) => it?.code === _activeRegionProvince)
              ?.name
          );
        }

        // car value
        const _carValue =
          data?.content?.estCarValue ||
          useFormResult?.getValues(fields.carValue);
        useFormResult?.setValue(fields.carValue, _carValue);

        //// sum insurance
        // sum insurance
        useFormResult?.setValue(
          fields.sumInsurance,
          useFormResult?.getValues(fields.carVersionChanged)
            ? _carValue
            : !useFormResult?.getValues?.(fields.sumInsurance)
            ? _carValue
            : useFormResult?.getValues?.(fields.sumInsurance)
        );
        useFormResult?.setValue(fields.carVersionChanged, false);

        setPricingPackages((prev: any) => ({
          ...prev,
          ...data?.content?.pricing?.packages,
        }));

        //
        useFormResult?.setValue(
          fields.tplTotalPremium,
          data?.content?.tplTotalPremium
        );

        if (useFormResult.getValues(fields.callCreatePolicy)) {
          createPolicyHandle();
        }

        //
        if (!useFormResult?.getValues(fields.discountCode)) {
          useFormResult?.setValue(
            fields.discountCode,
            data?.content?.pricing?.packages?.PKG_CAR_SIL_1?.discounts?.[0]
              ?.discountCode || ""
          );
        }
      },
    }
  );

  const savePlaceOrderHandle = useCallback(
    async (e?: any) => {
      if (
        !!(
          useFormResult?.getValues(fields.expireDate) &&
          useFormResult?.getValues(fields.expireDate)?.toString() !==
            "Invalid Date"
        ) ||
        (e?.target?.name === fields.expireDate && !!e?.target?.value)
      ) {
        return await savePlaceOrderMutation.mutateAsync({
          resourceCode,
          orderId: pendingOrderData?.orderId || props.orderId,
          ...useFormResult?.getValues(),
          carIsNew:
            useFormResult?.getValues(fields.carRegister) === true
              ? false
              : useFormResult?.getValues(fields.carRegister) === false
              ? true
              : useFormResult?.getValues(fields.carRegister),
          [e?.target?.name]: e?.target?.value,
          // discountCode: useFormResult?.getValues(fields.discountCode) || "NONE",
        } as any);
      }
    },
    [
      savePlaceOrderMutation.mutateAsync,
      pendingOrderData?.orderId,
      props.orderId,
      // useFormResult?.watch(),
      resourceCode,
    ]
  );

  // create pool
  const createPoolMutation = useMutation(
    (options) => props.createPoolService(options as any),
    {
      onSuccess: (data) => {
        useFormResult?.setValue(
          fields.carCaptureFrontLeft,
          data?.content?.images?.[FRONT_LEFT_VIEW]?.status === "DONE"
            ? data?.content?.images?.[FRONT_LEFT_VIEW]?.imageFCode
            : undefined
        );
        useFormResult?.setValue(
          fields.carCaptureFrontRight,
          data?.content?.images?.[FRONT_RIGHT_VIEW]?.status === "DONE"
            ? data?.content?.images?.[FRONT_RIGHT_VIEW]?.imageFCode
            : undefined
        );
        useFormResult?.setValue(
          fields.carCaptureRearLeft,
          data?.content?.images?.[REAR_LEFT_VIEW]?.status === "DONE"
            ? data?.content?.images?.[REAR_LEFT_VIEW]?.imageFCode
            : undefined
        );
        useFormResult?.setValue(
          fields.carCaptureRearRight,
          data?.content?.images?.[REAR_RIGHT_VIEW]?.status === "DONE"
            ? data?.content?.images?.[REAR_RIGHT_VIEW]?.imageFCode
            : undefined
        );
      },
    }
  );

  const createPoolHandle = useCallback(() => {
    if (pendingOrderData?.orderId) {
      createPoolMutation.mutate({
        orderId: pendingOrderData?.orderId,
      } as any);
    }
  }, [pendingOrderData?.orderId, createPoolMutation.mutate]);

  // create policy
  const createPolicyMutation = useMutation(
    (options) => props.createPolicyService(options as any),
    {
      onSuccess: () => {
        if (props.blocked && !!props.newMainProfileService) {
          const _body = {} as any;
          if (!props.defaultValues?.ownerFullName) {
            _body.fullName = useFormResult?.getValues(fields.ownerFullName);
          }
          if (!props.defaultValues?.ownerIdNo) {
            _body.cic = useFormResult?.getValues(fields.ownerIdNo);
          }
          if (!props.defaultValues?.ownerBirthday) {
            _body.dateOfBirth = convertDateToString(
              useFormResult?.getValues(fields.ownerBirthday)
            );
          }
          if (!props.defaultValues?.ownerEmail) {
            _body.email = useFormResult?.getValues(fields.ownerEmail);
          }

          if (Object.keys(_body).length > 0) props.newMainProfileService(_body);
        }

        if (
          useFormResult.getValues(fields.passLimitSumInsurance) === false &&
          !!props.onCreatePolicyReInsurance
        ) {
          props.onCreatePolicyReInsurance();
        }
      },
    }
  );

  const createPolicyHandle = useCallback(() => {
    createPolicyMutation.mutate({
      contextMode: EXECUTION,
      resourceCode: resourceCode,
      orderId: pendingOrderData?.orderId,
      invoiceExport: useFormResult.getValues(fields.invoiceExport),
      invoiceIsCompany: useFormResult.getValues(fields.invoiceIsCompany),
      invoiceCompanyName: useFormResult.getValues(fields.invoiceCompanyName),
      invoiceBuyerName: useFormResult.getValues(fields.invoiceBuyerName),
      invoiceTaxCode: useFormResult.getValues(fields.invoiceTaxCode),
      invoiceEmail: useFormResult.getValues(fields.invoiceEmail),
      invoiceAddress: useFormResult.getValues(fields.invoiceAddress),
      hasTplBundle: useFormResult.getValues(fields.hasTplBundle),
      ...(useFormResult.getValues(fields.hasBen)
        ? { beneficiaries: useFormResult.getValues(fields.beneficiaries) }
        : {}),
    } as any);
  }, [
    pendingOrderData?.orderId,
    resourceCode,
    useFormResult.watch(fields.invoiceExport),
    useFormResult.watch(fields.invoiceIsCompany),
    useFormResult.watch(fields.invoiceCompanyName),
    useFormResult.watch(fields.invoiceBuyerName),
    useFormResult.watch(fields.invoiceTaxCode),
    useFormResult.watch(fields.invoiceEmail),
    useFormResult.watch(fields.invoiceAddress),
    useFormResult.watch(fields.hasTplBundle),
    useFormResult.watch(fields.hasBen),
    useFormResult.watch(fields.beneficiaries),
  ]);

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
      goodCode:
        createPolicyMutation?.data?.content?.response?.goodCode ||
        props.goodCode,
      discountCodes: useFormResult?.getValues(fields.discountCode),
      paymentMethod: useFormResult?.getValues(fields.paymentMethod),
      successUrl: `${
        props.successEndpoint?.indexOf("http") !== -1
          ? ""
          : window?.location?.origin
      }${props.successEndpoint}?id=${
        createPolicyMutation?.data?.content?.response?.polSumId
      }`,
      failureUrl: `${window?.location?.origin}${props.currentEndpoint}${
        props.currentEndpoint && props.currentEndpoint.indexOf("?") >= 0
          ? "&status=failed"
          : "?status=failed"
      }${
        pendingOrderData?.orderId ? `&orderId=${pendingOrderData?.orderId}` : ""
      }`,
      // `${window?.location?.origin}${props.currentEndpoint}?s=1&gc=${
      //   createPolicyMutation?.data?.content?.response?.goodCode ||
      //   props.goodCode
      // }${
      //   pendingOrderData?.orderId ? `&orderId=${pendingOrderData?.orderId}` : ""
      // }${
      //   useFormResult?.getValues(fields.discountCode)
      //     ? `&discountCode=${useFormResult?.getValues(fields.discountCode)}`
      //     : ""
      // }`,
    } as any);
  }, [
    useFormResult?.watch(fields.discountCode),
    useFormResult?.watch(fields.paymentMethod),
    createPolicyMutation?.data?.content?.response?.goodCode,
    pendingOrderData?.orderId,
    props.goodCode,
    props.successEndpoint,
    props.currentEndpoint,
  ]);

  // get payment info
  const getPaymentInfoQuery = useQuery(
    [
      "getPaymentInfo",
      createPolicyMutation?.data?.content?.response?.goodCode || props.goodCode,
      useFormResult?.getValues(fields.discountCode) || props.discountCodes,
    ],
    () =>
      props.getPaymentInfoService({
        goodCode:
          createPolicyMutation?.data?.content?.response?.goodCode ||
          props.goodCode,
        discountCodes:
          useFormResult?.getValues(fields.discountCode) || props.discountCodes,
      }),
    {
      refetchOnWindowFocus: false,
      enabled: !!(
        createPolicyMutation?.data?.content?.response?.goodCode ||
        props.goodCode
      ),
    }
  );

  const submitReinsuranceMutation = useMutation((options) =>
    props.submitReinsuranceService(options as any)
  );

  // const getPremiumEstQuery = useQuery(
  //   [
  //     "getPremiumEst",
  //     resourceCode,
  //     pendingOrderData?.orderId,
  //     useFormResult?.watch(fields.discountCode),
  //     useFormResult?.watch(fields.carVersion),
  //   ],
  //   () =>
  //     props.getPremiumEstService({
  //       resourceCode: resourceCode as string,
  //       orderId: pendingOrderData?.orderId as string,
  //       discountCode: useFormResult?.watch(fields.discountCode),
  //       data: useFormResult.getValues(),
  //     }),
  //   {
  //     refetchOnWindowFocus: false,
  //     enabled: !!resourceCode && !!pendingOrderData?.orderId,
  //     onSuccess: (data) => {
  //       if (
  //         useFormResult.getValues(fields.activeRegionProvince) ||
  //         data?.content?.update?.activeRegionProvinceCode
  //       ) {
  //         // active region province
  //         const _activeRegionProvince =
  //           useFormResult.getValues(fields.activeRegionProvince) ||
  //           data?.content?.update?.activeRegionProvinceCode;
  //         useFormResult?.setValue(
  //           fields.activeRegionProvince,
  //           _activeRegionProvince
  //         );
  //         useFormResult?.setValue(
  //           fields.activeRegionProvinceName,
  //           cityData?.find((it: any) => it?.code === _activeRegionProvince)
  //             ?.name
  //         );
  //       }

  //       // car value
  //       const _carValue =
  //         data?.content?.estCarValue ||
  //         useFormResult?.getValues(fields.carValue);
  //       useFormResult?.setValue(fields.carValue, _carValue);

  //       //// sum insurance
  //       // useFormResult?.setValue(
  //       //   fields.sumInsurance,
  //       //   useFormResult?.getValues(fields.carVersionChanged)
  //       //     ? _carValue
  //       //     : !useFormResult?.getValues?.(fields.sumInsurance)
  //       //     ? _carValue
  //       //     : useFormResult?.getValues?.(fields.sumInsurance)
  //       // );
  //       // useFormResult?.setValue(fields.carVersionChanged, false);

  //       setPricingPackages((prev: any) => ({
  //         ...prev,
  //         ...data?.content?.pricing?.packages,
  //       }));

  //       //
  //       useFormResult?.setValue(
  //         fields.tplTotalPremium,
  //         data?.content?.tplTotalPremium
  //       );
  //     },
  //   }
  // );

  return {
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
    savePlaceOrderLoading: savePlaceOrderMutation?.isLoading,
    pricingPackages,
    // create pool
    createPoolHandle,
    poolId: createPoolMutation?.data?.content?.poolId,
    // create policy
    createPolicyHandle,
    createPolicyLoading: createPolicyMutation?.isLoading,
    // get payment info
    getPaymentInfoQuery,
    // payment
    paymentHandle,
    paymentLoadding: paymentMutation?.isLoading,
    // submit reinsurance
    submitReinsuranceMutation,
    // check coupon
    checkCouponLoading: checkCouponServiceQuery?.isInitialLoading,
    isShowCountdown,
    setIsShowCountDown,
    // verify
    verifyPhoneExistsHandle,
    resourceCode,
  };
};

export default useData;
