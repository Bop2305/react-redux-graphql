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
import fields from "../help/fields";
import convertCurrency from "helper/converts/convertCurrency";

type useDataProps = {
  resourceCode: string;
  createPolicyService: createPolicyServiceType;
  getPaymentInfoService: getPaymentInfoServiceType;
  paymentService: paymentServiceType;
  updatePolicyFuncService?: any;
  getPolicyService: any;
  successEndpoint?: string;
  currentEndpoint?: string;
  polSumId?: number;
};

const useData = (props: useDataProps) => {
  const useFormResult = useForm({ mode: "onTouched" });

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
      onError: () => {
        toaster.error("Có lỗi xảy ra");
      },
    }
  );

  const checkPriceMutation = useMutation(
    (options) => props.createPolicyService(options as any),
    {
      onSuccess: (data) => {
        // if (data?.statusCode !== 0) {
        //   const _error = (data as any)?.errors?.find(
        //     (it: any) => it?.reason?.indexOf("field [insAmount]") >= 0
        //   );

        //   if (_error?.reason) {
        //     const _reasonArr = _error?.reason?.split(" ");

        //     toaster.error(
        //       `Số tiền bảo hiểm tối đa ${convertCurrency(_reasonArr[9])}đ`
        //     );
        //   } else {
        //     toaster.error("Có lỗi xảy ra");
        //   }
        // }
        if (data?.statusCode !== 0) {
          if (data?.message?.indexOf("Remaining insurance") >= 0) {
            toaster.error(
              `Số tiền bảo hiểm còn lại ${convertCurrency(
                data?.message?.split(" - ")?.[1]
              )}`
            );
          } else if (
            data?.message?.indexOf(
              "The insurance amount has reached the limit"
            ) >= 0
          ) {
            toaster.error(
              `Số tiền bảo hiểm tối đa là ${convertCurrency(
                data?.message?.split(" - ")?.[1]
              )}`
            );
          } else {
            toaster.error("Có lỗi xảy ra");
          }
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
      body: { ...useFormResult?.getValues(), pkgCode: "PKG_RB_CRL_MOR" },
    } as any);
  }, [props.resourceCode]);

  const checkPriceHandle = useCallback(
    (insStartDate, insEndDate, insAmount) => {
      if (
        useFormResult?.getValues(fields.insStartDate) &&
        useFormResult?.getValues(fields.insEndDate) &&
        useFormResult?.getValues(fields.insAmount)
      ) {
        checkPriceMutation.mutate({
          contextMode: VALIDATE, //CHECK_PRICE,
          resourceCode: props.resourceCode,
          body: { ...useFormResult?.getValues(), pkgCode: "PKG_RB_CRL_MOR" },
        } as any);
      } else if (insStartDate && insEndDate && insAmount) {
        checkPriceMutation.mutate({
          contextMode: VALIDATE, //CHECK_PRICE,
          resourceCode: props.resourceCode,
          body: {
            insStartDate,
            insEndDate,
            insAmount,
            pkgCode: "PKG_RB_CRL_MOR",
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
    paymentHandle,
    paymentMutation,
    policy,
    updatePolicyHandle,
  };
};

export default useData;
