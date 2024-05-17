import { useState, useMemo, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "@tanstack/react-query";

import {
  checkCouponServiceType,
  createPolicyServiceType,
  getPaymentInfoServiceType,
  getPlaceOrderInitServiceType,
  getProgramsServiceType,
  paymentServiceType,
} from "components/sales/types";
import { CHECK_PRICE } from "helper/const";
import toaster from "helper/toaster";
import fields from "../help/fields";

type useDataProps = {
  getProgramsService: getProgramsServiceType;
  getPlaceOrderInitService: getPlaceOrderInitServiceType;
  createPolicyService: createPolicyServiceType;
  checkCouponService: checkCouponServiceType;
  getPaymentInfoService: getPaymentInfoServiceType;
  paymentService: paymentServiceType;

  // props
  successEndpoint?: string;
  currentEndpoint?: string;
};

const useData = (props: useDataProps) => {
  const useFormResult = useForm({ mode: "onTouched" });
  const [resourceCode, setResourceCode] = useState<string>();
  const [resourceCode2, setResourceCode2] = useState<string>();

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

  useQuery(["getPrograms"], props.getProgramsService, {
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      if (data?.statusCode === 0) {
        setResourceCode(
          data?.content?.find((it: any) => it?.name === "golfer")?.resourceCode
        );
        setResourceCode2(
          data?.content?.find((it: any) => it?.name === "hio")?.resourceCode
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
  const orderConfigData = useMemo(
    () => getPlaceOrderInitQuery?.data?.content?.orderConfig,
    [getPlaceOrderInitQuery?.data?.content?.orderConfig]
  );

  // useMutation
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
        discountCode: useFormResult.getValues(fields.discountCode),
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

  const createPolicyMutation = useMutation((options) =>
    props.createPolicyService(options as any)
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
      };

      const _res = await createPolicyMutation.mutateAsync(_data as any);

      if (_res.statusCode === 0) {
        await createPolicyMutation.mutateAsync({
          // resourceCode: resourceCode2,
          // contextMode: contextMode,
          // beginDate: useFormResult?.getValues(fields.beginDate),
          // buyerAddress: useFormResult?.getValues(fields.custAddress),
          // pkgCode: useFormResult?.getValues(fields.pkgCode),
          // buyerEmail: useFormResult?.getValues(fields.custEmail),
          // buyerName: useFormResult?.getValues(fields.custName),
          ..._data,
          resourceCode: resourceCode2,
          pkgCode: useFormResult?.getValues(fields.pkgCode2),
        } as any);
      }

      return _res;
    },
    [resourceCode, resourceCode2]
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
    if (resourceCode) {
      checkPriceHandle(CHECK_PRICE, null);
    }
  }, [useFormResult.watch(fields.discountCode)]);

  return {
    useFormResult,
    // init data
    orderConfigData,
    resourceCode,
    // mutation
    createPolicyMutation,
    createPolicyHandle,
    checkPriceMutation,
    checkPriceHandle,
    paymentMutation,
    paymentHandle,
    // query
    checkCouponQuery,
    getPaymentInfoQuery,
  };
};

export default useData;
