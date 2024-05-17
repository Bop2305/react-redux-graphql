import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";

import {
  createPolicyServiceType,
  getPaymentInfoServiceType,
  paymentServiceType,
} from "components/sales/types";
import { CHECK_PRICE, EXECUTION, VALIDATE } from "helper/const";
import toaster from "helper/toaster";
import flatHierarchies from "helper/flatHierarchies";
import fields from "../help/fields";
import convertCurrency from "helper/converts/convertCurrency";
import getAddress from "../help/getAddress";

type useDataProps = {
  resourceCode: string;
  progCode: string;
  createPolicyService: createPolicyServiceType;
  getPaymentInfoService: getPaymentInfoServiceType;
  paymentService: paymentServiceType;
  getPaymentMethodsService: any;
  getCparamsService: any;
  getProvincesService: any;
  getPackagesService: any;
  updatePolicyFuncService?: any;
  getStaffInfoService: any;
  getPolicyService: any;
  getOrganizationHierarchiesService: any;
  getOrganizationAllService: any;
  successEndpoint?: string;
  currentEndpoint?: string;
  polSumId?: number;
  saleId: number;
};

const useData = (props: useDataProps) => {
  const useFormResult = useForm({ mode: "onTouched" });

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

  const hierarchies = useMemo(
    () => (getOrganizationAllQuery as any)?.data?.content,
    // flatHierarchies((getOrganizationHierarchiesQuery?.data as any)?.content),
    [(getOrganizationAllQuery as any)?.data?.content]
  );

  const getStaffInfoQuery = useQuery(
    ["getStaffInfo", props.saleId],
    () => props.getStaffInfoService({ saleId: props.saleId }),
    { enabled: !!props.saleId, refetchOnWindowFocus: false }
  );

  const paymentMethodsQuery = useQuery(
    ["getPaymentMethodsService"],
    () => props.getPaymentMethodsService(),
    {
      refetchOnWindowFocus: false,
    }
  );

  const packagesQuery = useQuery(
    ["getPackagesService"],
    () => props.getPackagesService({ progCode: props.progCode }),
    {
      refetchOnWindowFocus: false,
      enabled: !!props.progCode,
    }
  );

  const homeTypeData = useMemo(
    () =>
      packagesQuery?.data?.content?.filter(
        (it: any) => it?.pkgType === "PKG_BASIC"
      ),
    [packagesQuery?.data?.content]
  );

  const homeAddOnData = useMemo(
    () =>
      packagesQuery?.data?.content?.filter(
        (it: any) => it?.pkgType === "PKG_ADD_ON"
      ),
    [packagesQuery?.data?.content]
  );

  const homeAddOn2Data = useMemo(
    () =>
      packagesQuery?.data?.content?.filter(
        (it: any) => it?.pkgType === "PKG_ADD_ON2"
      ),
    [packagesQuery?.data?.content]
  );

  const cparamsQuery = useQuery(
    ["getCparamsService"],
    () => props.getCparamsService(),
    {
      refetchOnWindowFocus: false,
    }
  );

  const homeBuyerRelationshipData = useMemo(
    () => cparamsQuery?.data?.content?.homeOwns,
    [cparamsQuery?.data?.content?.homeOwns]
  );

  const homeUsingData = useMemo(
    () =>
      cparamsQuery?.data?.content?.homeUsing?.filter(
        (it: any) => !["mixed", "commercial"]?.includes(it?.value)
      ),
    [cparamsQuery?.data?.content?.homeUsing]
  );

  const saleTypesData = useMemo(
    () => cparamsQuery?.data?.content?.saleTypes,
    [cparamsQuery?.data?.content?.saleTypes]
  );

  const provincesQuery = useQuery(
    ["getProvincesService"],
    () => props.getProvincesService(),
    {
      refetchOnWindowFocus: false,
    }
  );

  // get cityData from provincesQuery
  const provinceData = useMemo(
    () => provincesQuery?.data?.content,
    [provincesQuery?.data?.content]
  );

  // get districtData from cityData
  const districtData = useMemo(
    () =>
      provinceData?.find(
        (it: any) => it?.code === useFormResult?.getValues(fields.provinceCode)
      )?.children,
    [provinceData, useFormResult?.watch(fields.provinceCode)]
  );

  // get wardData from districtData
  const communeData = useMemo(
    () =>
      districtData?.find(
        (it: any) => it?.code === useFormResult?.getValues(fields.districtCode)
      )?.children,
    [districtData, useFormResult?.watch(fields.districtCode)]
  );

  const policyQuery = useQuery(
    ["getPolicyService", props.polSumId],
    () => props.getPolicyService({ params: { id: props.polSumId } }),
    {
      refetchOnWindowFocus: false,
      enabled: !!props.polSumId,
    }
  );

  const policy = useMemo(
    () => policyQuery?.data?.content,
    [policyQuery?.data?.content]
  );

  const updatePolicyFunc = useMutation((data) =>
    props.updatePolicyFuncService(data)
  );

  const updatePolicyHandle = useCallback(async () => {
    return await updatePolicyFunc.mutateAsync({
      resourceCode: props.resourceCode,
      funcName: "SEL_POL_UPDATE",
      polSumId: props.polSumId,
      ...useFormResult?.getValues(),
    } as any);
  }, [props.resourceCode]);

  // create policy
  const createPolicyMutation = useMutation(
    (options) => props.createPolicyService(options as any),
    {
      onSuccess: (data) => {
        if (data?.statusCode !== 0) {
          toaster.error("Có lỗi xảy ra");
        }
      },
      onError: () => {
        toaster.error("Có lỗi xảy ra");
      },
    }
  );

  const checkPriceMutation = useMutation(
    (options) => props.createPolicyService(options as any),
    {
      onSuccess: (data) => {
        if (data?.statusCode !== 0) {
          toaster.error("Có lỗi xảy ra");
        }
      },
      onError: () => {
        toaster.error("Có lỗi xảy ra");
      },
    }
  );

  const createPolicyHandle = useCallback(async () => {
    return await createPolicyMutation.mutateAsync({
      contextMode: EXECUTION,
      resourceCode: props.resourceCode,
      body: {
        ...useFormResult?.getValues(),
        paymentChannel: useFormResult?.getValues(fields.paymentMethod),
        [fields.homeAddress]: getAddress(
          useFormResult?.getValues(fields.streetAddress),
          communeData?.find(
            (it: any) =>
              it?.code === useFormResult?.getValues(fields.communeCode)
          )?.name,
          districtData?.find(
            (it: any) =>
              it?.code === useFormResult?.getValues(fields.districtCode)
          )?.name,
          provinceData?.find(
            (it: any) =>
              it?.code === useFormResult?.getValues(fields.provinceCode)
          )?.name
        ),
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
      },
    } as any);
  }, [props.resourceCode, communeData, districtData, provinceData]);

  const checkPriceHandle = useCallback(
    (pkgCode, sumInsurance, durations) => {
      if (
        useFormResult?.getValues(fields.pkgCode) &&
        useFormResult?.getValues(fields.sumInsurance) &&
        useFormResult?.getValues(fields.durations)
      ) {
        checkPriceMutation.mutate({
          contextMode: CHECK_PRICE, //CHECK_PRICE,
          resourceCode: props.resourceCode,
          body: { ...useFormResult?.getValues() },
        } as any);
      } else if (pkgCode && sumInsurance && durations) {
        checkPriceMutation.mutate({
          contextMode: CHECK_PRICE, //CHECK_PRICE,
          resourceCode: props.resourceCode,
          body: {
            pkgCode,
            sumInsurance,
            durations,
          },
        } as any);
      }
    },
    [props.resourceCode]
  );

  // get payment info
  const getPaymentInfoQuery = useQuery(
    [
      "getPaymentInfo",
      createPolicyMutation?.data?.content?.response?.goodCode ||
        policy?.polPayment?.[0]?.goodCode,
    ],
    () =>
      props.getPaymentInfoService({
        goodCode:
          createPolicyMutation?.data?.content?.response?.goodCode ||
          policy?.polPayment?.[0]?.goodCode,
      }),
    {
      refetchOnWindowFocus: false,
      enabled:
        !!createPolicyMutation?.data?.content?.response?.goodCode ||
        !!policy?.polPayment?.[0]?.goodCode,
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
      goodCode:
        createPolicyMutation?.data?.content?.response?.goodCode ||
        policy?.polPayment?.[0]?.goodCode,
      discountCodes: useFormResult?.getValues(fields.discountCode),
      paymentMethod: useFormResult?.getValues(fields.paymentMethod),
      successUrl: `${
        props.successEndpoint?.indexOf("http") !== -1
          ? ""
          : window?.location?.origin
      }${props.successEndpoint}`,
      failureUrl: `${window?.location?.origin}${props.currentEndpoint}`,
    } as any);
  }, [
    useFormResult?.watch(fields.discountCode),
    useFormResult?.watch(fields.paymentMethod),
    createPolicyMutation?.data?.content?.response?.goodCode,
    policy?.polPayment?.[0]?.goodCode,
    props.successEndpoint,
    props.currentEndpoint,
  ]);

  return {
    useFormResult,
    checkPriceHandle,
    checkPriceMutation,
    createPolicyHandle,
    createPolicyMutation,
    getPaymentInfoQuery,
    paymentMethodsQuery,
    paymentHandle,
    paymentMutation,
    policy,
    updatePolicyHandle,
    homeTypeData,
    homeUsingData,
    provinceData,
    districtData,
    communeData,
    homeAddOnData,
    homeAddOn2Data,
    homeBuyerRelationshipData,
    saleTypesData,
    hierarchies,
    getStaffInfoQuery,
  };
};

export default useData;
