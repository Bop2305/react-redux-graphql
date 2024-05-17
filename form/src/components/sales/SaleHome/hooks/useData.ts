import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import toaster from "helper/toaster";

import {
  checkCouponServiceType,
  createPolicyServiceType,
  getPaymentInfoServiceType,
  getPlaceOrderInitServiceType,
  getProgramsServiceType,
  getProvincesServiceType,
  paymentServiceType,
  verifyPhoneExistsType,
} from "components/sales/types";

import fields from "../help/fields";
import {
  HOME_TYPE_DEPARTMENT,
  HOME_TYPE_PRIVATE,
  PKG_APARTMENT_DEFAULT,
  PKG_HOUSE_DEFAULT,
} from "../help/const";
import { CHECK_PRICE } from "helper/const";
import getAddress from "../help/getAddress";

type useDataProps = {
  getProgramsService: getProgramsServiceType;
  getPlaceOrderInitService: getPlaceOrderInitServiceType;
  createPolicyService: createPolicyServiceType;
  checkCouponService: checkCouponServiceType;
  getProvincesService: getProvincesServiceType;
  verifyPhoneExistsService?: verifyPhoneExistsType;
  paymentService: paymentServiceType;
  successEndpoint: string;
  currentEndpoint: string;
  getPaymentInfoService: getPaymentInfoServiceType;
};

const useData = (props: useDataProps) => {
  const useFormResult = useForm({ mode: "onTouched" });

  // get provincesQuery from api
  const provincesQuery = useQuery(["getProvinces"], props.getProvincesService, {
    refetchOnWindowFocus: false,
  });

  // get cityData from provincesQuery
  const cityData = useMemo(
    () => provincesQuery?.data?.content,
    [provincesQuery?.data?.content]
  );

  // get districtData from cityData
  const districtData = useMemo(
    () =>
      cityData?.find(
        (it: any) => it?.code === useFormResult?.getValues(fields.city)
      )?.children,
    [cityData, useFormResult?.watch(fields.city)]
  );

  // get wardData from districtData
  const wardData = useMemo(
    () =>
      districtData?.find(
        (it: any) => it?.code === useFormResult?.getValues(fields.district)
      )?.children,
    [districtData, useFormResult?.watch(fields.district)]
  );

  // get programsQuery from api
  const programsQuery = useQuery(["getPrograms"], props.getProgramsService, {
    refetchOnWindowFocus: false,
  });

  // get program from programsQuery
  const program = useMemo(
    () =>
      programsQuery?.data?.content?.find(
        (it) => it?.progLine === "HOME"
      ) as any,
    [programsQuery?.data?.content]
  );

  // get resourceCode from program
  const popupInfoList = useMemo(
    () => (program?.popupInfoList ? JSON.parse(program?.popupInfoList) : null),
    [program?.popupInfoList]
  );

  // get resourceCode from program
  const resourceCode = useMemo(
    () => program?.resourceCode,
    [program?.resourceCode]
  );

  // get placeOrderInitQuery from api
  const placeOrderInitQuery = useQuery(
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

  // get placeOrderInitData from placeOrderInitQuery
  const placeOrderInitData = useMemo(
    () => placeOrderInitQuery?.data?.content,
    [placeOrderInitQuery?.data?.content]
  );

  // get groupPackagesData from placeOrderInitData
  const groupPackagesData = useMemo(
    () => placeOrderInitData?.groupPackages,
    [placeOrderInitData?.groupPackages]
  );

  // get assetValue from groupPackagesData
  const assetValueData = useMemo(
    () =>
      groupPackagesData?.find((it: any) => it?.groupCode === "AssetValue")
        ?.groups,
    [groupPackagesData]
  );

  // get additionalBenefits from groupPackagesData
  const additionalBenefitsData = useMemo(
    () =>
      groupPackagesData?.find(
        (it: any) => it?.groupCode === "AdditionalBenefits"
      )?.groups,
    [groupPackagesData]
  );

  // get orderConfigData from placeOrderInitData
  const orderConfigData = useMemo(
    () => placeOrderInitData?.orderConfig,
    [placeOrderInitData?.orderConfig]
  );

  // get defaultDeductionData from orderConfigData
  const defaultDeductionData = useMemo(
    () => orderConfigData?.defaultDeduction,
    [orderConfigData?.defaultDeduction]
  );

  // get homeBuyerRelationshipD2cData from orderConfigData
  const homeBuyerRelationshipD2cData = useMemo(
    () => orderConfigData?.homeBuyerRelationshipD2c,
    [orderConfigData?.homeBuyerRelationshipD2c]
  );

  // get homeTypeData from orderConfigData
  const homeTypeData = useMemo(
    () => orderConfigData?.homeType,
    [orderConfigData?.homeType]
  );

  // get listYearBuildHomeData from orderConfigData
  const listYearBuildHomeData = useMemo(
    () => orderConfigData?.listYearBuildHome,
    [orderConfigData?.listYearBuildHome]
  );

  // get listDurationInsuranceData from orderConfigData
  const listDurationInsuranceData = useMemo(
    () => orderConfigData?.listDurationInsurance,
    [orderConfigData?.listDurationInsurance]
  );

  // createPolicyMutation
  const createPolicyMutation = useMutation((options) =>
    props.createPolicyService(options as any)
  );

  const getFeeAddOnByPkgCode = useCallback(
    (pkgCode) => {
      let _fee = 0;
      createPolicyMutation?.data?.content?.response?.polPackages
        ?.find((it: any) => it?.pkgCode === pkgCode)
        ?.pkgCoverages?.forEach((it: any) => (_fee += it?.polCovFeeVat));

      return _fee;
    },
    [createPolicyMutation?.data?.content?.response?.polPackages]
  );

  const getPkgCode = useCallback(() => {
    let _pkgCode = "";
    let _pkgs = [];
    let _isPkgBasic = false;

    if (useFormResult?.getValues(fields.homeType) === HOME_TYPE_DEPARTMENT) {
      _pkgs = homeTypeData?.find(
        (it: any) => it?.value === HOME_TYPE_DEPARTMENT
      )?.items;

      _pkgs?.forEach((it: any, i: number) => {
        if (useFormResult?.getValues(`${fields.departmentPkgCode}${i}`)) {
          _pkgCode += `${_pkgCode ? ";" : ""}${useFormResult?.getValues(
            `${fields.departmentPkgCode}${i}`
          )}`;
        }

        if (
          useFormResult?.getValues(`${fields.departmentPkgType}${i}`) ===
            "PKG_BASIC" &&
          useFormResult?.getValues(`${fields.departmentPkgCode}${i}`)
        ) {
          _isPkgBasic = true;
        }
      });

      if (!_isPkgBasic) {
        _pkgCode = _pkgCode
          ? _pkgCode + `;${PKG_APARTMENT_DEFAULT}`
          : PKG_APARTMENT_DEFAULT;
      }
    } else if (
      useFormResult?.getValues(fields.homeType) === HOME_TYPE_PRIVATE
    ) {
      _pkgCode = PKG_HOUSE_DEFAULT;
    }

    if (
      useFormResult?.getValues(fields.homeAddon) &&
      useFormResult?.getValues(fields.protectInHouse)
    ) {
      _pkgCode += `;${useFormResult?.getValues(fields.homeAddon)}`;
    }

    if (useFormResult?.getValues(fields.homeAddonMR)?.length > 0) {
      _pkgCode += `;${useFormResult?.getValues(fields.homeAddonMR)?.join(";")}`;
    }

    if (
      _pkgCode?.indexOf("PKG_HOME_CC1") >= 0 &&
      _pkgCode?.indexOf("PKG_HOME_CC3") < 0
    ) {
      _pkgCode = _pkgCode?.replace("PKG_HOME_CC1", "PKG_HOME_CC4");
    }
    return _pkgCode;
  }, [homeTypeData]);

  // checkPriceHandle
  const createPolicyHandle = useCallback(
    async (contextMode, e?: any) => {
      const _name = e?.target?.name;
      const _value = e?.target?.value;

      const _data = {
        resourceCode: resourceCode,
        contextMode: contextMode,
        ...(_name && _value ? { [_name]: _value } : {}),
        effectiveDate: useFormResult?.getValues(fields.effectiveDate),
        expireDate: useFormResult?.getValues(fields.expireDate),
        durations: useFormResult?.getValues(fields.durations),
        homeValue: useFormResult?.getValues(fields.homeValue),
        sumInsurance: useFormResult?.getValues(fields.homeValue),
        homeType: useFormResult?.getValues(fields.homeType),
        homeUsing: "non_commercial",
        homeBuildYear: useFormResult?.getValues(fields.homeBuildYear),
        pkgCode: getPkgCode(),
        discountCode: useFormResult?.getValues(fields.discountCode),
        discountCodeSubmit: useFormResult?.getValues(fields.discountCodeSubmit),
        buyerName: useFormResult?.getValues(fields.buyerName),
        buyerPhone: useFormResult?.getValues(fields.buyerPhone),
        buyerEmail: useFormResult?.getValues(fields.buyerEmail),
        homeAddress: getAddress(
          useFormResult?.getValues(fields.homeAddress),
          wardData?.find(
            (it: any) => it?.code === useFormResult?.getValues(fields.ward)
          )?.name,
          districtData?.find(
            (it: any) => it?.code === useFormResult?.getValues(fields.district)
          )?.name,
          cityData?.find(
            (it: any) => it?.code === useFormResult?.getValues(fields.city)
          )?.name
        ),
        buyerRelationship: useFormResult?.getValues(fields.buyerRelationship),
        invoiceExport: useFormResult?.getValues(fields.invoiceExport),
        invoiceIsCompany: useFormResult?.getValues(fields.invoiceIsCompany),
        invoiceCompanyName: useFormResult?.getValues(fields.invoiceCompanyName),
        invoiceBuyerName: useFormResult?.getValues(fields.invoiceBuyerName),
        invoiceTaxCode: useFormResult?.getValues(fields.invoiceTaxCode),
        invoiceEmail: useFormResult?.getValues(fields.invoiceEmail),
        invoiceAddress: useFormResult?.getValues(fields.invoiceAddress),
      } as any;

      delete _data.invoiceIsCompany;

      const result = await createPolicyMutation.mutateAsync(_data as any);

      if (!useFormResult?.getValues(fields.discountCode)) {
        useFormResult?.setValue(
          fields.discountCodeSubmit,
          result?.content?.response?.discounts?.[0]?.discountCode
        );
      }

      return result;
    },
    [resourceCode, getPkgCode, wardData, districtData, cityData]
  );

  // checkCouponQuery by resourceCode and discountCodeSubmit api
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
          createPolicyHandle(CHECK_PRICE);
        }
      },
      onError: () => {
        toaster.error("Có lỗi xảy ra");
      },
    }
  );

  // get fee oldFee by createPolicyMutation
  const fee = useMemo(
    () =>
      createPolicyMutation?.data?.content?.response?.polTotalFee -
      (createPolicyMutation?.data?.content?.response?.discounts?.[0]
        ?.discountAmount || 0),
    [
      createPolicyMutation?.data?.content?.response?.polTotalFee,
      createPolicyMutation?.data?.content?.response?.discounts?.[0]
        ?.discountAmount,
    ]
  );

  const oldFee = useMemo(
    () =>
      createPolicyMutation?.data?.content?.response?.discounts?.[0]
        ?.discountAmount
        ? createPolicyMutation?.data?.content?.response?.polTotalFee
        : 0,
    [
      createPolicyMutation?.data?.content?.response?.polTotalFee,
      createPolicyMutation?.data?.content?.response?.discounts?.[0]
        ?.discountAmount,
    ]
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

  // verifyMutation
  const verifyMutation = useMutation(
    (options) =>
      props.verifyPhoneExistsService?.(options as any) || ((() => {}) as any)
  );

  // verifyPhoneExistsHandle
  const verifyPhoneExistsHandle = useCallback(async (e?: any) => {
    if (useFormResult?.getValues(fields.buyerPhone)) {
      return await verifyMutation.mutateAsync({
        phone: useFormResult?.getValues(fields.buyerPhone),
      } as any);
    }
  }, []);

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

  return {
    useFormResult,
    resourceCode,
    popupInfoList,
    assetValueData,
    additionalBenefitsData,
    orderConfigData,
    homeTypeData,
    listYearBuildHomeData,
    listDurationInsuranceData,
    createPolicyHandle,
    createPolicyMutation,
    fee,
    oldFee,
    cityData,
    districtData,
    wardData,
    homeBuyerRelationshipD2cData,
    verifyPhoneExistsHandle,
    defaultDeductionData,
    program,
    getPaymentInfoQuery,
    paymentHandle,
    getFeeAddOnByPkgCode,
  };
};

export default useData;
