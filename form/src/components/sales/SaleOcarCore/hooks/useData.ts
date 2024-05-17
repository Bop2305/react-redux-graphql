import { useCallback, useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import toaster from "helper/toaster";

import {
  checkCouponServiceType,
  createPolicyServiceType,
  createPoolServiceType,
  getCarBrandsServiceType,
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
  pricingOcarCoreServiceType,
  getPaymentInvoiceCoreServiceType,
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
import { carUsingMappingCore } from "helper/mapping";

type useDataProps = {
  getProgramsService: getProgramsServiceType;
  getPlaceOrderInitService: getPlaceOrderInitServiceType;
  getProvincesService: getProvincesServiceType;
  getCarBrandsService: getCarBrandsServiceType;
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
  getPricingOcarCoreService: pricingOcarCoreServiceType;
  getPaymentInvoiceCoreService: getPaymentInvoiceCoreServiceType;
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
  currentStepIndex: any;
  domainLinkFile: any;
  refStepper: any,
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

  const getPricingOcarCoreQuery = useQuery(
    ["getPricingOcarCore", resourceCode, props.orderId, useFormResult?.watch(fields.carVersion), useFormResult?.watch(fields.duration), props.currentStepIndex, useFormResult?.watch(fields.sumInsurance), useFormResult?.watch(fields.deductibleExcess)],
    () => {
      return props.getPricingOcarCoreService({
        resourceCode: resourceCode as string,
        orderId: props.orderId as string,
        carYearExternalCode: carsData?.filter((item: any) => item.manufactureId === useFormResult?.getValues(fields.carBrand)).find((it: any) => it.mainModelId == useFormResult?.getValues(fields.carLine) && it.modelId == useFormResult?.getValues(fields.carVersion) && it.modelYear == useFormResult?.getValues(fields.carYear))?.externalCode,
        ...useFormResult?.getValues()
      })
    },
    {
      refetchOnWindowFocus: false,
      enabled: !!resourceCode && !!useFormResult.getValues(fields.carVersion) && !!useFormResult.getValues(fields.duration),
    }
  );

  // console.log("getPricingOcarCoreQuery: ", getPricingOcarCoreQuery.data)
  const listPkg = [
    {
      value: 1000005,
      label: "Vàng"
    },
    {
      value: 1000004,
      label: "Bạc"
    },
    {
      value: 1000006,
      label: "Kim Cương"
    }
  ]

  const packageCodeData = useMemo(
    () => {

      if (getPricingOcarCoreQuery?.data?.content?.content?.length > 0) {
        let packageData = getPricingOcarCoreQuery?.data?.content?.content.map((item: any) => {
          let pkgCode = item?.insuredObjects[0]?.coverPlanCode;
          let pkgName = listPkg.find((pkg: any) => pkg.value == pkgCode)?.label;
          let listCover = item?.insuredObjects[0]?.covers?.length > 0 ? item?.insuredObjects[0]?.covers.map((cov: any) => {
            return {
              text: cov?.coverOptions[0]?.description,
              covCode: cov?.coverOptions[0]?.id,
              productLineType: cov?.productLineType
            }
          }) : [];
          return {
            pkgCode: pkgCode,
            pkgName: pkgName,
            totalPremium: Math.round(item?.premiumForColl * 1.1),
            displayInfo: [
              {
                "title": "Quyền lợi bảo hiểm chính",
                "type": "CAR_BASE",
                "texts": listCover.filter((cv: any) => cv.productLineType == 1)
              },
              {
                "title": "Quyền lợi bảo hiểm bổ sung",
                "type": "CAR_ADD_ON",
                "texts": listCover.filter((cv: any) => cv.productLineType != 1)
              }
            ]
          }
        })
        return packageData;
      }
      return [];
    },
    [getPricingOcarCoreQuery?.data]
  );

  console.log("packageCodeData: ", packageCodeData)

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
    () => {
      if (getPlaceOrderInitQuery?.data?.content?.orderSpecs?.businessUsing) {
        return getPlaceOrderInitQuery?.data?.content?.orderSpecs?.businessUsing?.map((item: any) => {
          return {
            value: item.id,
            label: (carUsingMappingCore as any)[item.description],
            ...item
          }
        })
      }
      return null;
    },
    [getPlaceOrderInitQuery?.data?.content?.orderSpecs?.businessUsing]
  );

  const getCarTypeDataByCarUsing = useCallback(
    (value) => {
      if (getPlaceOrderInitQuery?.data?.content?.orderSpecs?.vehicleTypes) {
        return getPlaceOrderInitQuery?.data?.content?.orderSpecs?.vehicleTypes.filter((type: any) => type.vehicleUsageId == value).map((item: any) => ({
          value: item.id,
          label: item.description
        }))
      }
      return null;
    },
    [getPlaceOrderInitQuery?.data?.content?.orderSpecs?.vehicleTypes]
  );

  const carTypeDataByCarUsing = useMemo(
    () => getCarTypeDataByCarUsing(useFormResult?.getValues(fields.carUsing)),
    [getCarTypeDataByCarUsing, useFormResult?.watch(fields.carUsing)]
  );

  // const carYearDataAll = useMemo(
  //   () =>
  //     getPlaceOrderInitQuery?.data?.content?.orderSpecs?.manufactureYear?.items,
  //   [getPlaceOrderInitQuery?.data?.content?.orderSpecs?.manufactureYear?.items]
  // );

  const carWeightData = useMemo(
    () => getPlaceOrderInitQuery?.data?.content?.orderSpecs?.weights?.items,
    [getPlaceOrderInitQuery?.data?.content?.orderSpecs?.weights?.items]
  );

  const genderData = useMemo(
    () => {
      return [
        {
          value: 1,
          label: "Anh"
        },
        {
          value: 2,
          label: "Chị"
        }
      ]
    },
    [getPlaceOrderInitQuery?.data?.content?.orderSpecs]
  );

  // const durationData = useMemo(
  //   () =>
  //     getPlaceOrderInitQuery?.data?.content?.orderSpecs?.insuranceDuration
  //       ?.items,
  //   [
  //     getPlaceOrderInitQuery?.data?.content?.orderSpecs?.insuranceDuration
  //       ?.items,
  //   ]
  // );

  const durationData = useMemo(
    () => {
      return [
        {
          value: 1,
          label: 6
        },
        {
          value: 3,
          label: 12
        }
      ]
    },
    [getPlaceOrderInitQuery?.data?.content?.orderSpecs?.cars]
  );

  const benBanksData = useMemo(
    () => getPlaceOrderInitQuery?.data?.content?.orderSpecs?.benBankList?.items,
    [getPlaceOrderInitQuery?.data?.content?.orderSpecs?.benBankList?.items]
  );

  const orderConfigData = useMemo(
    () => getPlaceOrderInitQuery?.data?.content?.orderConfig,
    [getPlaceOrderInitQuery?.data?.content?.orderConfig]
  );

  // const deductibleData = useMemo(
  //   () =>
  //     getPlaceOrderInitQuery?.data?.content?.orderSpecs?.deductible?.items?.map(
  //       (it: any) => ({ ...it, name: it?.name?.replace(/,/g, ".") })
  //     ),
  //   [getPlaceOrderInitQuery?.data?.content?.orderSpecs?.deductible?.items]
  // );

  const deductibleData = useMemo(
    () => {
      return [
        {
          value: 1,
          label: "500.000 đồng"
        },
        {
          value: 2,
          label: "1.000.000 đồng"
        },
        // {
        //   value: 3,
        //   label: "2.000.000 đồng"
        // },
        // {
        //   value: 4,
        //   label: "5.000.000 đồng"
        // },
        // {
        //   value: 5,
        //   label: "10.000.000 đồng"
        // },
      ]
    },
    [getPlaceOrderInitQuery?.data?.content?.orderSpecs]
  );

  // const packageCodeData = useMemo(
  //   () => getPlaceOrderInitQuery?.data?.content?.packages,
  //   [getPlaceOrderInitQuery?.data?.content?.packages]
  // );

  // province data
  const cityData = useMemo(
    () => {
      if (getPlaceOrderInitQuery?.data?.content?.orderSpecs?.cities) {
        return getPlaceOrderInitQuery?.data?.content?.orderSpecs?.cities.map((item: any) => ({
          value: item.id,
          label: item.cityName
        }))
      }
      return []
    },
    [getPlaceOrderInitQuery?.data?.content?.orderSpecs?.cities]
  );

  const carsData = useMemo(
    () => getPlaceOrderInitQuery?.data?.content?.orderSpecs?.cars,
    [getPlaceOrderInitQuery?.data?.content?.orderSpecs?.cars]
  );

  // car data
  const carBrandData = useMemo(
    () => getPlaceOrderInitQuery?.data?.content?.orderSpecs?.cars,
    [getPlaceOrderInitQuery?.data?.content?.orderSpecs?.cars]
  );

  const groupByCarInfo = (list: any, key: any) => {
    let listGroupBy = list?.reduce((acc: any, curr: any) => {
      let findIndex = acc.findIndex((item: any) => item.value == curr[`${key}Id`]);
      if (findIndex == -1) {
        acc.push({
          value: curr[`${key}Id`],
          name: curr[`${key}Desc`],
          carValue: curr["carValue"],
          passenger: curr["passenger"],
          ...curr
        })
      }
      return acc;
    }, []);
    return listGroupBy;
  }

  const getCarBrandDataByCarType = useCallback(
    (value) => {
      const groupByBrandData = groupByCarInfo(carBrandData, "manufacture")
      return groupByBrandData;
    },
    [carBrandData]
  );


  const carBrandDataByCarType = useMemo(
    () => getCarBrandDataByCarType(useFormResult?.getValues(fields.carType)),
    [getCarBrandDataByCarType, useFormResult?.watch(fields.carType)]
  );

  const carYearDataByCarBrand = useMemo(
    () => {
      let listYearByBrand = carsData?.filter((item: any) => item.manufactureId === useFormResult?.getValues(fields.carBrand));
      let listGroupBy = listYearByBrand?.reduce((acc: any, curr: any) => {
        let findIndex = acc.findIndex((item: any) => item.value == curr[`modelYear`]);
        if (findIndex == -1) {
          acc.push({
            ...curr,
            value: curr[`modelYear`],
            label: curr[`modelYear`],
          })
        }
        return acc;
      }, []);
      return (listGroupBy || []).sort((a: any, b: any) => a.value - b.value);
    },
    [carBrandDataByCarType, useFormResult?.watch(fields.carBrand)]
  );

  const carLineDataByCarTypeCarBrandCarYear = useMemo(
    () => {
      let carBrand = useFormResult?.getValues(fields.carBrand)
      let carYear = useFormResult?.getValues(fields.carYear)
      let listLineByBrandAndCarYear = carsData?.filter((item: any) => item.manufactureId === carBrand && item.modelYear === carYear);
      let listGroupBy = listLineByBrandAndCarYear?.reduce((acc: any, curr: any) => {
        let findIndex = acc.findIndex((item: any) => item.value == curr[`mainModelId`]);
        if (findIndex == -1) {
          acc.push({
            value: curr[`mainModelId`],
            label: curr[`mainModelDesc`],
            ...curr
          })
        }
        return acc;
      }, []);
      return listGroupBy;
    },
    [carsData, useFormResult?.getValues(fields.carYear), useFormResult?.getValues(fields.carBrand)]
  );

  // console.log('carLineDataByCarTypeCarBrandCarYear: ', carLineDataByCarTypeCarBrandCarYear)

  // const getCarVersionDataByCarLine = useCallback(
  //   (value, carLineDataByCarTypeCarBrandCarYear) =>
  //     carLineDataByCarTypeCarBrandCarYear?.find(
  //       (it: any) => it?.value === value
  //     )?.child?.items,
  //   []
  // );

  const carVersionDataByCarLine = useMemo(
    () => {
      let carLine = useFormResult?.watch(fields.carLine);
      return carLineDataByCarTypeCarBrandCarYear?.filter((item: any) => item.value === carLine)?.map((line: any) => ({
        ...line,
        value: line.modelId,
        label: line.modelDesc
      }))
    },
    [carLineDataByCarTypeCarBrandCarYear, useFormResult?.watch(fields.carLine)]
  );

  // use mutate
  const verifyMutation = useMutation(
    (options) =>
      props.verifyPhoneExistsService?.(options as any) || ((() => { }) as any)
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
            cityData?.find((it: any) => it?.value === _activeRegionProvince)
              ?.label
          );
        }

        setPricingPackages((prev: any) => ({
          ...prev,
          ...data?.content?.pricing?.packages,
        }));

        //
        // useFormResult?.setValue(
        //   fields.tplTotalPremium,
        //   data?.content?.tplTotalPremium
        // );

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
        if (data?.content?.images) {
          let listInspections = []
          if (data?.content?.images?.[REAR_RIGHT_VIEW]?.status === "DONE") {
            listInspections.push(data?.content?.images?.[REAR_RIGHT_VIEW])
          }
          if (data?.content?.images?.[FRONT_LEFT_VIEW]?.status === "DONE") {
            listInspections.push(data?.content?.images?.[FRONT_LEFT_VIEW])
          }
          if (data?.content?.images?.[FRONT_RIGHT_VIEW]?.status === "DONE") {
            listInspections.push(data?.content?.images?.[FRONT_RIGHT_VIEW])
          }
          if (data?.content?.images?.[REAR_LEFT_VIEW]?.status === "DONE") {
            listInspections.push(data?.content?.images?.[REAR_LEFT_VIEW])
          }
          useFormResult?.setValue(fields.inspections, listInspections);
        }
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
      onSuccess: (data) => {
        console.log("createPolicyMutation: ", data)
        if (data && data) {

        }
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
    let carYearExternalCode = carsData?.filter((item: any) => item.manufactureId === useFormResult?.getValues(fields.carBrand)).find((it: any) => it.mainModelId == useFormResult?.getValues(fields.carLine) && it.modelId == useFormResult?.getValues(fields.carVersion) && it.modelYear == useFormResult?.getValues(fields.carYear))?.externalCode;
    let inspectionsData = (useFormResult.getValues(fields.inspections) || []).map((item: any) => {
      return {
        "fileName": `${item.tags.toUpperCase()}.png`,
        "uri": `${props.domainLinkFile}/${item.imageFCode}`,
        "result": {
          "inspecMessage": item?.inspectionResult?.inspecMessage,
          "inspecImageResult": item?.inspectionResult?.maskUrl,
          "damageData": item?.inspectionResult?.damages
        }
      }
    })
    createPolicyMutation.mutate({
      resourceCode,
      orderId: pendingOrderData?.orderId || props.orderId,
      ...useFormResult?.getValues(),
      carYearExternalCode: carYearExternalCode,
      inspections: inspectionsData,
      carIsNew:
        useFormResult?.getValues(fields.carRegister) === true
          ? false
          : useFormResult?.getValues(fields.carRegister) === false
            ? true
            : useFormResult?.getValues(fields.carRegister)
    } as any);
  }, [
    pendingOrderData?.orderId,
    resourceCode
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
      paymentTriggerBy: "d2c",
      refPaymentId: "",
      consolidatedInstalmentNo: getPaymentInvoiceCoreQuery.data?.content?.content[0]?.consolidationId,
      discountCodes: useFormResult?.getValues(fields.discountCode),
      paymentMethod: useFormResult?.getValues(fields.paymentMethod),
      successUrl: `${props.successEndpoint?.indexOf("http") !== -1
        ? ""
        : window?.location?.origin
        }${props.successEndpoint}?id=${createPolicyMutation?.data?.content?.externalID
        }`,
      failureUrl: `${window?.location?.origin}${props.currentEndpoint}${props.currentEndpoint && props.currentEndpoint.indexOf("?") >= 0
        ? "&status=failed"
        : "?status=failed"
        }${pendingOrderData?.orderId ? `&orderId=${pendingOrderData?.orderId}` : ""
        }`,
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

  // get payment invoice core info
  const getPaymentInvoiceCoreQuery = useQuery(
    [
      "getPaymentInvoiceCore",
      createPolicyMutation?.data?.content?.externalID
    ],
    () =>
      props.getPaymentInvoiceCoreService({
        polNo: createPolicyMutation?.data?.content?.externalID
      }),
    {
      refetchOnWindowFocus: false,
      enabled: !!createPolicyMutation?.data?.content?.externalID,
      retryDelay: 3000,
      retry: (failureCount, error) => {
        if ((getPaymentInvoiceCoreQuery.data?.content?.content?.length > 0 && getPaymentInvoiceCoreQuery.data?.content?.content[0]?.consolidationId)) {
          return false;
        }
        if (failureCount > 25) {
          props.refStepper?.back();
          toaster.error("Có lỗi trong quá trình tạo thanh toán, xin quý khách vui lòng thử lại!")
          return false;
        }
        return true;
      },

    }
  );

  // get payment info
  const getPaymentInfoQuery = useQuery(
    [
      "getPaymentInfo",
      getPaymentInvoiceCoreQuery.data?.content?.content[0]?.consolidationId,
      useFormResult?.getValues(fields.discountCode) || props.discountCodes,
    ],
    () =>
      props.getPaymentInfoService({
        goodCode: "13963",
        discountCodes:
          useFormResult?.getValues(fields.discountCode) || props.discountCodes,
      }),
    {
      refetchOnWindowFocus: false,
      enabled: !!getPaymentInvoiceCoreQuery.data?.content?.content[0]?.consolidationId,
    }
  );

  // console.log("createPolicyMutation?.data?.content?.externalID: ", createPolicyMutation?.data?.content)



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
    // carYearDataAll,
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
    carLineDataByCarTypeCarBrandCarYear,
    // getCarVersionDataByCarLine,
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
    carsData
  };
};

export default useData;
