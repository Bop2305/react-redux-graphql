import { useCallback, useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { carUsingMappingCore } from "helper/mapping";

import toaster from "helper/toaster";
import flatHierarchies from "helper/flatHierarchies";

import {
  checkCouponServiceType,
  createPolicyServiceType,
  createPoolServiceType,
  getCarBrandsServiceType,
  getPaymentInfoServiceType,
  getPaymentMethodsType,
  getPlaceOrderInitServiceType,
  getPremiumEstType,
  getProgramsServiceType,
  getProvincesServiceType,
  getStaffContractByCodeType,
  savePlaceOrderServiceType,
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
import dayjs from "dayjs";

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
  getStaffContractByCodeService: getStaffContractByCodeType;
  getAgentExistService: any;
  getPaymentMethodsService: getPaymentMethodsType;
  getPremiumEstService: getPremiumEstType;
  getPricingOcarCoreService: any;
  orderId?: string;
  goodCode?: string;
  discountCodes?: string;
  successEndpoint?: string;
  currentEndpoint?: string;
  localstorageCouponCountdownKey: string;
  onCheckSaleDao?: any;
  onSuccess: any;
  polSumId?: number;
  polNo?: string;
  resourceCode?: string;
  coInsurances?: boolean;
  refStepper?: any;
  getStaffInfoService: any;
  getOrganizationHierarchiesService: any;
  getOrganizationAllService: any;
  saleId: number;
  currentStepIndex: any;
  cancelPolicyCoreService?: any;
};

const useData = (props: useDataProps) => {
  const useFormResult = useForm({ mode: "onTouched" });
  const [resourceCode, setResourceCode] = useState<string>();
  const [pricingPackages, setPricingPackages] = useState();
  const [isShowCountdown, setIsShowCountDown] = useState(false);
  const [payFrequencies, setPayFrequencies] = useState();
  const [packageCodeData, setPackageCodeData] = useState([]);

  useEffect(() => {
    setResourceCode(props.resourceCode);
  }, [props.resourceCode]);

  const getOrganizationAllQuery = useQuery(
    ["getOrganizationAllService"],
    props.getOrganizationAllService,
    {
      refetchOnWindowFocus: false,
    }
  );

  // const getOrganizationHierarchiesQuery = useQuery(
  //   ["getOrganizationHierarchies"],
  //   props.getOrganizationHierarchiesService,
  //   {
  //     refetchOnWindowFocus: false,
  //   }
  // );

  // const hierarchies = useMemo(
  //   () => (getOrganizationAllQuery as any)?.data?.content,
  //   [(getOrganizationAllQuery as any)?.data?.content]
  // );

  const getStaffInfoQuery = useQuery(
    ["getStaffInfo", props.saleId],
    () => props.getStaffInfoService({ saleId: props.saleId }),
    { enabled: !!props.saleId, refetchOnWindowFocus: false }
  );

  // use query
  const getCarBrandsQuery = useQuery(
    ["getCarBrands"],
    props.getCarBrandsService,
    {
      refetchOnWindowFocus: false,
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
      if (data?.statusCode === 0) {
        setResourceCode(
          data?.content?.find((it) => it?.progLine === "CAR")?.resourceCode
        );
      }
    },
  });

  const getPaymentMethodsQuery = useQuery(
    ["getPaymentMethods"],
    props.getPaymentMethodsService,
    {
      refetchOnWindowFocus: false,
    }
  );

  const getPlaceOrderInitQuery = useQuery(
    ["getPlaceOrderInit", resourceCode],
    () =>
      props.getPlaceOrderInitService({
        resourceCode: resourceCode as string,
        orderId: props.orderId as string,
        polSumId: props.polSumId as number,
        polNo: props.polNo as string,
      }),
    {
      refetchOnWindowFocus: false,
      enabled: !!resourceCode,
    }
  );

  const getPricingOcarCoreQuery = useQuery(
    [
      "getPricingOcarCore",
      resourceCode, props.orderId,
      useFormResult?.watch(fields.carVersion),
      useFormResult?.watch(fields.duration),
      props.currentStepIndex,
      useFormResult?.watch(fields.sumInsurance),
      useFormResult?.watch(fields.deductibleExcess)
    ],
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
      enabled: !!resourceCode && !!useFormResult.getValues(fields.carVersion) && !!useFormResult.getValues(fields.duration) && props.currentStepIndex < 5,
    }
  );

  // const getStaffContractByCodeQuery = useQuery(
  //   ["getStaffContractByCode", useFormResult.watch(fields.saleCode)],
  //   () =>
  //     props.getStaffContractByCodeService({
  //       code: useFormResult.watch(fields.saleCode),
  //     } as any),
  //   {
  //     refetchOnWindowFocus: false,
  //     enabled:
  //       !!useFormResult.watch(fields.callCheckStaffCode) &&
  //       !!useFormResult.watch(fields.saleCode),
  //     onSuccess: async (data) => {
  //       useFormResult.setValue(fields.callCheckStaffCode, false);
  //       props.onCheckSaleDao(data);
  //       if (
  //         data?.content?.profile?.contractKey &&
  //         !data?.content?.profile?.needToSignContract &&
  //         useFormResult.getValues(fields.callCreatePolicy)
  //       ) {
  //         await savePlaceOrderHandle({
  //           target: {
  //             value: data?.content?.profile?.email,
  //             name: fields.saleEmail,
  //           },
  //         });
  //         createPolicyHandle();
  //       }
  //     },
  //     onError: (err) => {
  //       useFormResult.setValue(fields.callCheckStaffCode, false);
  //       toaster.error("Có lỗi xảy ra");
  //     },
  //   }
  // );

  // const getAgentExistQuery = useQuery(
  //   ["getAgentExistQuery", useFormResult.watch(fields.saleCode)],
  //   () =>
  //     props.getAgentExistService({
  //       agentNumber: useFormResult.watch(fields.saleCode),
  //     } as any),
  //   {
  //     refetchOnWindowFocus: false,
  //     enabled:
  //       !!useFormResult.watch(fields.callCheckStaffCode) &&
  //       !!useFormResult.watch(fields.saleCode),
  //     onSuccess: async (data) => {
  //       useFormResult.setValue(fields.callCheckStaffCode, false);
  //       props.onCheckSaleDao(data);
  //       console.log("DATA: ", data)
  //       // if (
  //       //   data?.content?.profile?.contractKey &&
  //       //   !data?.content?.profile?.needToSignContract &&
  //       //   useFormResult.getValues(fields.callCreatePolicy)
  //       // ) {
  //       //   await savePlaceOrderHandle({
  //       //     target: {
  //       //       value: data?.content?.profile?.email,
  //       //       name: fields.saleEmail,
  //       //     },
  //       //   });
  //       //   createPolicyHandle();
  //       // }
  //       if (
  //         // data?.content?.profile?.contractKey &&
  //         // !data?.content?.profile?.needToSignContract &&
  //         useFormResult.getValues(fields.callCreatePolicy)
  //       ) {
  //         // await savePlaceOrderHandle();
  //         createPolicyHandle();
  //       }
  //     },
  //     onError: (err) => {
  //       useFormResult.setValue(fields.callCheckStaffCode, false);
  //       toaster.error("Có lỗi xảy ra");
  //     },
  //   }
  // );

  const getAgentExistQuery = useQuery(
    ["getAgentExistQuery", useFormResult.watch(fields.saleCode)],
    () =>
      props.getAgentExistService({
        body: {
          "data_info": {
            "action": "IDIT_OPES_AGENT",
            "dao": useFormResult.watch(fields.saleCode)
          }
        },
      } as any),
    {
      refetchOnWindowFocus: false,
      enabled:
        !!useFormResult.watch(fields.callCheckStaffCode) &&
        !!useFormResult.watch(fields.saleCode),
      onSuccess: async (data) => {
        useFormResult.setValue(fields.callCheckStaffCode, false);

        props.onCheckSaleDao(data);
        console.log("DATA: ", data)
        if (data?.content?.length > 0) {
          useFormResult.setValue(fields.staffId, data?.content[0]?.STAFF_ID);
          if (
            useFormResult.getValues(fields.callCreatePolicy)
          ) {
            // await savePlaceOrderHandle();
            createPolicyHandle();
          }
        } else {
          toaster.error("Mã DAO không tồn tại!")
        }
        // if (
        //   data?.content?.profile?.contractKey &&
        //   !data?.content?.profile?.needToSignContract &&
        //   useFormResult.getValues(fields.callCreatePolicy)
        // ) {
        //   await savePlaceOrderHandle({
        //     target: {
        //       value: data?.content?.profile?.email,
        //       name: fields.saleEmail,
        //     },
        //   });
        //   createPolicyHandle();
        // }

      },
      onError: (err) => {
        useFormResult.setValue(fields.callCheckStaffCode, false);
        toaster.error("Có lỗi xảy ra");
      },
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
      onSuccess: (data) => {
        useFormResult?.setValue(fields.callCheckDiscount, false);
        if (data?.message === "coupon not found") {
          toaster.error("Không tìm thấy mã khuyến mại!");
          savePlaceOrderHandle();
        } else if (data?.message === "CONSTRAINT_VIOLATION") {
          setIsShowCountDown(true);
          return toaster.error(
            "Bạn nhập sai mã quá nhiều lần, vui lòng thử lại sau ít phút"
          );
        } else if (!data?.content?.couponInfo?.couIsActive) {
          toaster.error("Mã khuyến mại hết hiệu lực!");
          savePlaceOrderHandle();
        } else if (data?.content?.couponInfo?.couIsActive) {
          useFormResult?.setValue(
            fields.discountCode,
            data?.content?.discountCode
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

  const hierarchies = useMemo(
    () => {
      if (getPlaceOrderInitQuery?.data?.content?.orderSpecs?.banks) {
        return getPlaceOrderInitQuery?.data?.content?.orderSpecs?.banks.map((item: any) => ({
          value: item.id,
          label: item.description,
          ...item
        }))
      }
      return []
    },
    [getPlaceOrderInitQuery?.data?.content?.orderSpecs?.banks]
  );

  // const paymentFrequencyData = useMemo(
  //   () =>
  //     getPlaceOrderInitQuery?.data?.content?.orderSpecs?.paymentFrequency
  //       ?.items,
  //   [getPlaceOrderInitQuery?.data?.content?.orderSpecs?.paymentFrequency?.items]
  // );

  const paymentFrequencyData = useMemo(
    () => {
      return [
        {
          value: 1,
          label: "1 Kỳ",
        },
        {
          value: 2,
          label: "2 Kỳ",
        }
      ]
    },
    [getPlaceOrderInitQuery?.data?.content?.orderSpecs?.paymentFrequency?.items]
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
        },
        // {
        //   value: 20000000,
        //   label: 24
        // },
        // {
        //   value: 1000028,
        //   label: 36
        // },
      ]
    },
    [getPlaceOrderInitQuery?.data?.content?.orderSpecs]
  );

  const frequencyCoreData = useMemo(
    () => {
      return [
        {
          method: "VACC_VPBANK",
          paymentTermOneTimeId: 1000009,
          paymentTermTwoTimeId: 1000008,
        },
        {
          method: "AUTO_DEBIT_VPBANK",
          paymentTermOneTimeId: 1000005,
          paymentTermTwoTimeId: 1000006,
        },
      ]
    },
    [getPlaceOrderInitQuery?.data?.content?.orderSpecs]
  );

  const orderConfigData = useMemo(
    () => getPlaceOrderInitQuery?.data?.content?.orderConfig,
    [getPlaceOrderInitQuery?.data?.content?.orderConfig]
  );

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

  useEffect(() => {
    if (props.currentStepIndex >= 4 && !getPricingOcarCoreQuery?.data?.content) {
      setPackageCodeData(packageCodeData);
    } else {
      if (getPricingOcarCoreQuery?.data?.content?.content?.length > 0) {
        let packageData = getPricingOcarCoreQuery?.data?.content?.content.map((item: any) => {
          let pkgCode = item?.insuredObjects[0]?.coverPlanCode;
          let pkgName = listPkg.find((pkg: any) => pkg.value == pkgCode)?.label;
          let listCover = item?.insuredObjects[0]?.covers?.length > 0 ? item?.insuredObjects[0]?.covers.map((cov: any) => {
            return {
              text: cov?.coverOptions[0]?.description,
              covCode: cov?.coverOptions[0]?.id,
              productLineType: cov?.productLineType,
              premiumForColl: cov?.premiumForColl,
              id: cov?.productLineOptionType?.id
            }
          }) : [];
          let delta = item?.delta < 0 ? Math.abs(item?.delta) : 0;
          return {
            pkgCode: pkgCode,
            pkgName: pkgName,
            totalPremium: Math.round((item?.premiumForColl + delta) * 1.1),
            originDelta: item?.delta,
            delta: delta,
            overwroteCovers: [
              {
                coverId: 1000027,
                premiumAdjustmentValue: listCover.find((cov: any) => cov.id === 1000027)?.premiumForColl + delta
              }
            ],
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
        setPackageCodeData(packageData);
      }

    }

  }, [getPricingOcarCoreQuery?.data])

  console.log("packageCodeData: ", packageCodeData)

  const loanContractTypeData = useMemo(
    () => {
      return [
        {
          value: "NEW",
          label: "Cấp mới"
        },
        {
          value: "RENEW",
          label: "Tái tục"
        }
      ]
    },
    [getPlaceOrderInitQuery?.data?.content?.orderSpecs]
  );

  // coInsurancesData
  const coInsurancesData = useMemo(
    () => {

      return getPlaceOrderInitQuery?.data?.content?.orderConfig?.coInsurances.map((item: any) => ({
        ...item,
        value: item.coinsuranceCompanyContactExtNum,
        label: item.name
      }))
    },
    [getPlaceOrderInitQuery?.data?.content?.orderConfig]
  );

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
    () => {
      if (getPlaceOrderInitQuery?.data?.content?.orderSpecs?.cars?.length > 0) {
        return getPlaceOrderInitQuery?.data?.content?.orderSpecs?.cars.filter((item: any) => item?.modelYear > dayjs().add(-16, "years").year());
      }
      return [];
    },
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
        useFormResult?.setValue(
          fields.tplTotalPremium,
          data?.content?.tplTotalPremium
        );
      },
    }
  );

  const cancelPolicyMutation = useMutation(
    (options) => props?.cancelPolicyCoreService(options as any),
    {
      onSuccess: (data, variables: any) => {
        console.log("cancelPolicyMutation success!", data)
      },
    }
  );

  const savePlaceOrderHandle = useCallback(
    async (e?: any) => {
      let payFreqs: any = [];
      if (useFormResult.getValues(fields.paymentFrequency) == 1) {
        payFreqs = [
          {
            freqIndex: 1,
            estPaymentDate: convertDateToString(
              dayjs().toDate(),
              "DD-MM-YYYY"
            ),
            fee: useFormResult?.getValues(fields.fee)
          }
        ]
      } else if (useFormResult.getValues(fields.paymentFrequency) == 2) {
        payFreqs = [
          {
            freqIndex: 1,
            estPaymentDate: convertDateToString(
              dayjs().toDate(),
              "DD-MM-YYYY"
            ),
            fee: Math.round(useFormResult?.getValues(fields.fee) / 2)
          },
          {
            freqIndex: 2,
            estPaymentDate: convertDateToString(
              dayjs().add(90, 'days').toDate(),
              "DD-MM-YYYY"
            ),
            fee: useFormResult?.getValues(fields.fee) - Math.round(useFormResult?.getValues(fields.fee) / 2)
          }
        ]
      }

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
        [fields.coInsurances]:
          useFormResult?.getValues(fields.coInsurances) && props.coInsurances
            ? [useFormResult?.getValues(fields.coInsurances)]
            : undefined,
        [fields.beneficiaries]:
          useFormResult?.getValues(fields.benIdNo) &&
            useFormResult?.getValues(fields.benName) &&
            useFormResult?.getValues(fields.hasBankLoan)
            ? [
              {
                benIdNo: useFormResult?.getValues(fields.benIdNo),
                benName: useFormResult?.getValues(fields.benName),
                benAddress: useFormResult?.getValues(fields.benAddress),
              },
            ]
            : [],
        [fields.payFreqs]: payFreqs,
        [fields.carPlateNo]: useFormResult.getValues(fields.carPlateNo) ? useFormResult.getValues(fields.carPlateNo) : "00D00000",
        [fields.purchaseDate]: e?.target?.name === fields.polNo ? dayjs().toDate() : null,
        [e?.target?.name]: e?.target?.value,
      } as any);
    },
    [
      savePlaceOrderMutation.mutateAsync,
      pendingOrderData?.orderId,
      props.orderId,
      // useFormResult?.watch(),
      resourceCode,
      props.coInsurances,
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
      onSuccess: async (data) => {
        if (data?.statusCode == 0 && data?.content?.externalID) {
          await savePlaceOrderHandle(
            {
              target: {
                value: data?.content?.externalID,
                name: fields.polNo,
              },
            }
          );
          if (props?.polNo && props?.cancelPolicyCoreService) {
            await cancelPolicyMutation.mutateAsync(
              {
                body: {
                  "polNo": props?.polNo,
                  "fromPolStartDate": true
                },
              } as any
            );
          }
          console.log("onSuccess data: ", data)
          props.onSuccess(data);
        } else if (data?.message?.includes("Bank account already exists")) {
          toaster.error("Tài khoản ngân hàng đã tồn tại, xin vui lòng nhập tài khoản khác!")
        } else if (data?.message?.includes("agent has no permission to sell policies")) {
          toaster.error("Cộng tác viên không có quyền bán sản phẩm này!")
        } else {
          toaster.error("Có lỗi xảy ra, xin vui lòng thử lại!")
        }
        console.log("data?.content?.externalID: ", data?.content?.externalID)

      },
    }
  );

  const createPolicyHandle = useCallback(() => {
    let carYearExternalCode = carsData?.filter((item: any) => item.manufactureId === useFormResult?.getValues(fields.carBrand)).find((it: any) => it.mainModelId == useFormResult?.getValues(fields.carLine) && it.modelId == useFormResult?.getValues(fields.carVersion) && it.modelYear == useFormResult?.getValues(fields.carYear))?.externalCode;
    let coInsurances = coInsurancesData.find((item: any) => item.value == useFormResult?.getValues(fields.coInsurances)) || {};
    let durationValue = durationData.find((item: any) => item.value == useFormResult.getValues(fields.duration));
    let frequencyCoreValue = frequencyCoreData.find((item: any) => item.method == useFormResult.getValues(fields.paymentMethod));
    let paymentTermId = useFormResult.getValues(fields.paymentFrequency) == 1 ? frequencyCoreValue?.paymentTermOneTimeId : frequencyCoreValue?.paymentTermTwoTimeId;
    let payFreqs: any = [];
    let packageValue: any = packageCodeData.find((item: any) => item.pkgCode === useFormResult?.getValues(fields.pkgCode));
    let overwroteCovers = packageValue?.delta > 0 ? packageValue?.overwroteCovers : [];
    // console.log("fields.fee: ", useFormResult?.getValues(fields.fee))
    // console.log("packageCodeData: ", packageCodeData)
    if (useFormResult.getValues(fields.paymentFrequency) == 1) {
      payFreqs = [
        {
          freqIndex: 1,
          estPaymentDate: convertDateToString(
            dayjs().toDate(),
            "DD-MM-YYYY"
          ),
          fee: useFormResult?.getValues(fields.fee)
        }
      ]
    } else if (useFormResult.getValues(fields.paymentFrequency) == 2) {
      payFreqs = [
        {
          freqIndex: 1,
          estPaymentDate: convertDateToString(
            dayjs().toDate(),
            "DD-MM-YYYY"
          ),
          fee: Math.round(useFormResult?.getValues(fields.fee) / 2)
        },
        {
          freqIndex: 2,
          estPaymentDate: convertDateToString(
            dayjs().add(90, 'days').toDate(),
            "DD-MM-YYYY"
          ),
          fee: useFormResult?.getValues(fields.fee) - Math.round(useFormResult?.getValues(fields.fee) / 2)
        }
      ]
    }

    createPolicyMutation.mutate({
      resourceCode,
      orderId: pendingOrderData?.orderId || props.orderId,
      ...useFormResult?.getValues(),
      paymentTermId: paymentTermId,
      overwroteCovers: overwroteCovers,
      coInsurances: [
        {
          "coinsuranceCompanyContactExtNum": coInsurances.value,
          "isLeader": coInsurances.isLeader,
          // "partnerPolicyNumber": "123",
          "sharePercentage": coInsurances.sharePercentage,
          "commission": coInsurances.commission
        }
      ],
      carYearExternalCode: carYearExternalCode,
      carIsNew:
        useFormResult?.getValues(fields.carRegister) === true
          ? false
          : useFormResult?.getValues(fields.carRegister) === false
            ? true
            : useFormResult?.getValues(fields.carRegister),
      [fields.carPlateNo]: useFormResult.getValues(fields.carPlateNo) ? useFormResult.getValues(fields.carPlateNo) : "00D00000",
      [fields.payFreqs]: payFreqs
    } as any);
  }, [
    createPolicyMutation.mutateAsync,
    pendingOrderData?.orderId,
    resourceCode,
    useFormResult.watch(fields.debitAccount),
    useFormResult.watch(fields.paymentMethod),
    useFormResult.watch(fields.fee)
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

  // const getPremiumEstQuery = useQuery(
  //   [
  //     "getPremiumEst",
  //     resourceCode,
  //     pendingOrderData?.orderId,
  //     // useFormResult?.watch(fields.paymentMethod),
  //     useFormResult?.watch(fields.discountCode),
  //     useFormResult?.watch(fields.paymentFrequency),
  //     JSON.stringify(useFormResult?.watch(fields.payFreqs)),
  //   ],
  //   () =>
  //     props.getPremiumEstService({
  //       resourceCode: resourceCode as string,
  //       orderId: pendingOrderData?.orderId as string,
  //       discountCode: useFormResult?.watch(fields.discountCode),
  //       // paymentMethod: useFormResult?.getValues(fields.paymentMethod),
  //       paymentFrequency: useFormResult?.getValues(fields.paymentFrequency),
  //       data: useFormResult.getValues(),
  //     }),
  //   {
  //     refetchOnWindowFocus: false,
  //     enabled:
  //       !!resourceCode &&
  //       !!pendingOrderData?.orderId &&
  //       // !!useFormResult?.watch(fields.paymentMethod) &&
  //       !!useFormResult?.watch(fields.paymentFrequency),
  //     onSuccess: (data) => {
  //       const _message = data?.content?.messages?.find(
  //         (it: any) => it?.field === "vehicleValue"
  //       )?.reason;
  //       if (_message && props.refStepper?.currentStepIndex === 3) {
  //         toaster.error(_message);
  //       }

  //       useFormResult?.setValue(
  //         fields.passLimitSumInsurance,
  //         data?.content?.passLimitSumInsurance
  //       );

  //       // active region province
  //       const _activeRegionProvince =
  //         useFormResult.getValues(fields.activeRegionProvince) ||
  //         data?.content?.update?.activeRegionProvinceCode;
  //       useFormResult?.setValue(
  //         fields.activeRegionProvince,
  //         _activeRegionProvince
  //       );
  //       useFormResult?.setValue(
  //         fields.activeRegionProvinceName,
  //         cityData?.find((it: any) => it?.code === _activeRegionProvince)?.name
  //       );

  //       // car value
  //       const _carValue =
  //         orderConfigData?.adjustingCarValueRate > 0
  //           ? useFormResult?.getValues(fields.carValue) ||
  //           data?.content?.estCarValue
  //           : data?.content?.estCarValue ||
  //           useFormResult?.getValues(fields.carValue);
  //       useFormResult?.setValue(fields.carValue, _carValue);
  //       useFormResult?.setValue(fields.estCarValue, data?.content?.estCarValue);

  //       // sum insurance
  //       useFormResult?.setValue(
  //         fields.sumInsurance,
  //         useFormResult?.getValues(fields.carVersionChanged)
  //           ? _carValue
  //           : !useFormResult?.getValues?.(fields.sumInsurance)
  //             ? _carValue
  //             : useFormResult?.getValues?.(fields.sumInsurance)
  //       );
  //       useFormResult?.setValue(fields.carVersionChanged, false);

  //       //

  //       setPricingPackages((prev: any) => ({
  //         ...prev,
  //         ...(!!data?.content?.pricing?.packages
  //           ? data?.content?.pricing?.packages
  //           : {}),
  //       }));
  //       setPayFrequencies(data?.content?.payFrequencies);
  //       const _datePeriod2 = data?.content?.payFrequencies?.find(
  //         (it: any) => it?.freqCode === "2_TIME_YEARLY_2"
  //       )?.estPaymentDate;
  //       useFormResult.setValue(fields.datePeriod2, _datePeriod2);
  //       useFormResult.setValue(
  //         fields.payFreqs,
  //         _datePeriod2
  //           ? [
  //             {
  //               estPaymentDate: convertDateToString(
  //                 dayjs().toDate(),
  //                 "DD-MM-YYYY"
  //               ),
  //             },
  //             {
  //               estPaymentDate: convertDateToString(
  //                 _datePeriod2,
  //                 "DD-MM-YYYY"
  //               ),
  //             },
  //           ]
  //           : [
  //             {
  //               estPaymentDate: convertDateToString(
  //                 dayjs().toDate(),
  //                 "DD-MM-YYYY"
  //               ),
  //             },
  //           ]
  //       );

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
    savePlaceOrderLoading: savePlaceOrderMutation?.isLoading,
    pricingLoading: getPricingOcarCoreQuery?.isLoading,
    pricingPackages,
    payFrequencies,
    // create pool
    createPoolHandle,
    poolId: createPoolMutation?.data?.content?.poolId,
    // create policy
    createPolicyHandle,
    createPolicyLoading: createPolicyMutation?.isLoading,
    cancelPolicyLoading: cancelPolicyMutation?.isLoading,
    // get payment info
    getPaymentInfoQuery,
    // check coupon
    checkCouponLoading: checkCouponServiceQuery?.isInitialLoading,
    isShowCountdown,
    setIsShowCountDown,
    // payment methods
    getPaymentMethodsQuery,
    // staff info
    getStaffContractByCodeData: getAgentExistQuery?.data,
    getStaffContractByCodeLoading:
      getAgentExistQuery?.isInitialLoading,
    // getPremiumEstQuery
    // getPremiumEstQuery,
    hierarchies,
    getStaffInfoQuery,
  };
};

export default useData;
