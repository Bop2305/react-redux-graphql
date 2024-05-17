import { useMemo, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "@tanstack/react-query";

import toaster from "helper/toaster";
import convertDateToString from "helper/converts/convertDateToString";
import {
  getPlaceOrderInitServiceType,
  getProgramsServiceType,
  getListFlightNoServiceType,
  checkPriceServiceType,
  createPolicyServiceType,
  checkCouponServiceType,
  getPaymentInfoServiceType,
  paymentServiceType,
  verifyPhoneExistsType,
  newMainProfileType,
  defaultValuesType,
} from "components/sales/types";

import fields from "../help/fields";
import { CHECK_PRICE } from "helper/const";

type useDataProps = {
  getProgramsService: getProgramsServiceType;
  getPlaceOrderInitService: getPlaceOrderInitServiceType;
  getListFlightNoService: getListFlightNoServiceType;
  checkPriceService: checkPriceServiceType;
  createPolicyService: createPolicyServiceType;
  checkCouponService: checkCouponServiceType;
  getPaymentInfoService: getPaymentInfoServiceType;
  paymentService: paymentServiceType;
  verifyPhoneExistsService: verifyPhoneExistsType;
  newMainProfileService: newMainProfileType;
  // props
  successEndpoint?: string;
  currentEndpoint?: string;
  blocked?: boolean;
  defaultValues?: defaultValuesType;
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

          checkPriceHandle(CHECK_PRICE, {
            target: {
              name: fields.discountCode,
              value: data?.content?.discountCode,
            },
          });
        }
      },
      onError: () => {
        toaster.error("Có lỗi xảy ra");
      },
    }
  );

  const checkPriceDepQuery = useQuery(
    [
      "checkPriceDep",
      useFormResult?.watch(fields.packageCode),
      useFormResult?.watch(fields.depFlightNo),
      useFormResult?.watch(fields.depDate),
    ],
    () =>
      props.checkPriceService({
        packageCode: useFormResult?.getValues(fields.packageCode),
        flightNo: useFormResult?.getValues(fields.depFlightNo),
        flightDate: useFormResult?.getValues(fields.depDate),
      }),
    {
      refetchOnWindowFocus: false,
      enabled:
        !!useFormResult?.watch(fields.packageCode) &&
        !!useFormResult?.watch(fields.depFlightNo) &&
        !!useFormResult?.watch(fields.depDate) &&
        useFormResult?.watch(fields.depDate)?.toString() !== "Invalid Date",
    }
  );

  const checkPriceReturnQuery = useQuery(
    [
      "checkPriceReturn",
      useFormResult?.watch(fields.packageCode),
      useFormResult?.watch(fields.returnFlightNo),
      useFormResult?.watch(fields.returnDate),
    ],
    () =>
      props.checkPriceService({
        packageCode: useFormResult?.getValues(fields.packageCode),
        flightNo: useFormResult?.getValues(fields.returnFlightNo),
        flightDate: useFormResult?.getValues(fields.returnDate),
      }),
    {
      refetchOnWindowFocus: false,
      enabled:
        !!useFormResult?.watch(fields.packageCode) &&
        !!useFormResult?.watch(fields.returnFlightNo) &&
        !!useFormResult?.watch(fields.returnDate) &&
        useFormResult?.watch(fields.returnDate)?.toString() !== "Invalid Date",
    }
  );

  const getListFlightNoDepQuery = useQuery(
    ["getListFlightNoDep", useFormResult?.watch(fields.depDate)],
    () =>
      props.getListFlightNoService({
        depDate: useFormResult?.getValues(fields.depDate),
      }),
    {
      refetchOnWindowFocus: false,
      enabled:
        !!useFormResult?.watch(fields.depDate) &&
        useFormResult?.watch(fields.depDate)?.toString() !== "Invalid Date",
    }
  );

  const getListFlightNoReturnQuery = useQuery(
    [
      "getListFlightNoDep",
      useFormResult?.watch(fields.returnDate),
      useFormResult?.watch(fields.depFlightNo),
      useFormResult?.watch(fields.depDate),
    ],
    () =>
      props.getListFlightNoService({
        depDate: useFormResult?.getValues(fields.returnDate),
        flightNo: useFormResult?.getValues(fields.depFlightNo),
        flightDate: useFormResult?.getValues(fields.depDate),
      }),
    {
      refetchOnWindowFocus: false,
      enabled:
        !!useFormResult?.watch(fields.depDate) &&
        useFormResult?.watch(fields.depDate)?.toString() !== "Invalid Date" &&
        !!useFormResult?.watch(fields.returnDate) &&
        useFormResult?.watch(fields.returnDate)?.toString() !==
          "Invalid Date" &&
        !!useFormResult?.watch(fields.depFlightNo),
    }
  );

  const getProgramsQuery = useQuery(["getPrograms"], props.getProgramsService, {
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      if (data?.statusCode === 0) {
        setResourceCode(
          data?.content?.find((it) => it?.progLine === "FDC")?.resourceCode
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
  const coveragesData = useMemo(
    () => getPlaceOrderInitQuery?.data?.content?.coverages,
    [getPlaceOrderInitQuery?.data?.content?.coverages]
  );

  const configData = useMemo(
    () => getPlaceOrderInitQuery?.data?.content,
    [getPlaceOrderInitQuery?.data?.content]
  );

  // data
  const flightsDepData = useMemo(
    () => getListFlightNoDepQuery?.data?.content?.flights,
    [getListFlightNoDepQuery?.data?.content?.flights]
  );

  const flightsReturnData = useMemo(
    () => getListFlightNoReturnQuery?.data?.content?.flights,
    [getListFlightNoReturnQuery?.data?.content?.flights]
  );

  const priceDepData = useMemo(
    () => checkPriceDepQuery?.data?.content,
    [checkPriceDepQuery?.data?.content]
  );

  const priceReturnData = useMemo(
    () => checkPriceReturnQuery?.data?.content,
    [checkPriceReturnQuery?.data?.content]
  );

  // useMutation
  const verifyMutation = useMutation(
    (options) =>
      props.verifyPhoneExistsService?.(options as any) || ((() => {}) as any)
  );

  const verifyPhoneExistsHandle = useCallback(
    async (e?: any) => {
      if (useFormResult?.getValues(fields.buyerPhoneNumber)) {
        return await verifyMutation.mutateAsync({
          phone: useFormResult?.getValues(fields.buyerPhoneNumber),
        } as any);
      }
    },
    []
    // [useFormResult?.watch(fields.buyerPhoneNumber)]
  );

  const checkPriceMutation = useMutation(
    (options) => props.createPolicyService(options as any),
    {
      onSuccess: (data: any) => {
        if (data?.statusCode === 0) {
          const _discountAmount =
            data?.content?.discounts?.[0]?.discountAmount || 0;

          useFormResult?.setValue(
            fields.fee,
            data?.content?.response?.polTotalFee - _discountAmount
          );

          if (_discountAmount) {
            if (!useFormResult?.getValues(fields.discountCode)) {
              useFormResult?.setValue(
                fields.discountCodeSubmit,
                data?.content?.discounts?.[0]?.discountCode
              );
            }

            useFormResult?.setValue(
              fields.oldFee,
              data?.content?.response?.polTotalFee
            );
          } else {
            useFormResult?.setValue(fields.oldFee, undefined);
          }
        } else if (data?.errors?.[0]?.reason === "policy fdc existed") {
          toaster.error("Hơp đồng của bạn đã tồn tại");
        } else {
          toaster.error("Có lỗi xảy ra");
        }
      },
      onError: () => {
        toaster.error("Có lỗi xảy ra");
      },
    }
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
      };

      const _res = await checkPriceMutation.mutateAsync(_data as any);

      return _res;
    },
    [resourceCode]
  );

  const createPolicyMutation = useMutation(
    (options) => props.createPolicyService(options as any),
    {
      onSuccess: () => {
        if (props.blocked && !!props.newMainProfileService) {
          const _body = {} as any;
          if (!props.defaultValues?.buyerName) {
            _body.fullName = useFormResult?.getValues(fields.buyerFullName);
          }
          if (!props.defaultValues?.buyerIdNo) {
            _body.cic = useFormResult?.getValues(fields.buyerIdNumber);
          }
          if (!props.defaultValues?.buyerBirthday) {
            _body.dateOfBirth = convertDateToString(
              useFormResult?.getValues(fields.buyerBirthday)
            );
          }
          if (!props.defaultValues?.buyerEmail) {
            _body.email = useFormResult?.getValues(fields.buyerEmail);
          }

          if (Object.keys(_body).length > 0) props.newMainProfileService(_body);
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
      };

      const _res = createPolicyMutation.mutateAsync(_data as any);

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

  return {
    useFormResult,
    // init data
    coveragesData,
    configData,
    // data
    flightsDepData,
    flightsDepDataLoading: getListFlightNoDepQuery?.isInitialLoading,
    flightsReturnData,
    flightsReturnDataLoading: getListFlightNoReturnQuery?.isInitialLoading,
    priceDepData,
    priceReturnData,
    resourceCode,
    // mutation
    checkPriceMutation,
    checkPriceHandle,
    createPolicyMutation,
    createPolicyHandle,
    paymentMutation,
    paymentHandle,
    verifyPhoneExistsHandle,
    // query
    checkCouponQuery,
    getPaymentInfoQuery,
  };
};

export default useData;
