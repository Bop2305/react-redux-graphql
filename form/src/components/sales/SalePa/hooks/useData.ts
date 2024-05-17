import { useState, useMemo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "@tanstack/react-query";

import {
  PERSONAL,
  PERSONAL_GROUP_CODE,
  EXECUTION,
  CHECK_PRICE,
} from "helper/const";
import toaster from "helper/toaster";

import {
  getProgramsServiceType,
  getPlaceOrderInitServiceType,
  createPolicyServiceType,
  getPaymentInfoServiceType,
  paymentServiceType,
  checkCouponServiceType,
  verifyPhoneExistsType,
  newMainProfileType,
  defaultValuesType,
} from "../../types";
import fields from "../help/fields";
import convertDateToString from "helper/converts/convertDateToString";

type useDataProps = {
  getProgramsService: getProgramsServiceType;
  getPlaceOrderInitService: getPlaceOrderInitServiceType;
  createPolicyService: createPolicyServiceType;
  checkCouponService: checkCouponServiceType;
  getPaymentInfoService: getPaymentInfoServiceType;
  paymentService: paymentServiceType;
  verifyPhoneExistsService: verifyPhoneExistsType;
  newMainProfileService: newMainProfileType;
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

          createPolicyHandle(CHECK_PRICE, {
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

  const getProgramsQuery = useQuery(["getPrograms"], props.getProgramsService, {
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      if (data?.statusCode === 0) {
        setResourceCode(
          data?.content?.find((it) => it?.progLine === "PA")?.resourceCode
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

  // convert data
  // init data
  const orderConfigData = useMemo(
    () => getPlaceOrderInitQuery?.data?.content?.orderConfig,
    [getPlaceOrderInitQuery?.data?.content?.orderConfig]
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

  const relationDataByGroupCode = useMemo(
    () =>
      useFormResult?.getValues(fields.buyFor) === PERSONAL
        ? getPlaceOrderInitQuery?.data?.content?.orderSpecs?.insuredRelation
            ?.items
        : getPlaceOrderInitQuery?.data?.content?.orderSpecs
            ?.insuredRelationFamily?.items,
    [
      getPlaceOrderInitQuery?.data?.content?.orderSpecs?.insuredRelation?.items,
      getPlaceOrderInitQuery?.data?.content?.orderSpecs?.insuredRelationFamily
        ?.items,
      useFormResult?.watch(fields.buyFor),
    ]
  );

  const groupPackageData = useMemo(
    () => getPlaceOrderInitQuery?.data?.content?.groupPackages,
    [getPlaceOrderInitQuery?.data?.content?.groupPackages]
  );

  const getPackageDataByGroupCode = useCallback(
    (buyFor, familyHas) =>
      groupPackageData?.find((it: any) =>
        buyFor === PERSONAL
          ? it?.groupCode === PERSONAL_GROUP_CODE
          : it?.groupCode === familyHas
      )?.groups,
    [groupPackageData]
  );

  const packageDataByGroupCode = useMemo(
    () =>
      getPackageDataByGroupCode(
        useFormResult?.getValues(fields.buyFor),
        useFormResult?.getValues(fields.familyHas)
      ),
    [
      getPackageDataByGroupCode,
      useFormResult?.watch(fields.buyFor),
      useFormResult?.watch(fields.familyHas),
    ]
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
    []
    // [useFormResult?.watch(fields.ownerPhoneNumber)]
  );

  // create policy
  const createPolicyMutation = useMutation(
    (options) => props.createPolicyService(options as any),
    {
      onSuccess: (data, variable: any) => {
        if (data?.statusCode === 0) {
          const _discountAmount =
            data?.content?.response?.discounts?.[0]?.discountAmount || 0;

          useFormResult?.setValue(
            fields.fee,
            data?.content?.response?.polTotalFee - _discountAmount
          );

          if (_discountAmount) {
            if (!useFormResult?.getValues(fields.discountCode)) {
              useFormResult?.setValue(
                fields.discountCodeSubmit,
                data?.content?.response?.discounts?.[0]?.discountCode
              );
            }
            useFormResult?.setValue(
              fields.oldFee,
              data?.content?.response?.polTotalFee
            );
          } else {
            useFormResult?.setValue(fields.oldFee, undefined);
          }
        } else {
          toaster.error("Có lỗi xảy ra");
        }

        if (!variable?.contextMode || variable?.contextMode === EXECUTION) {
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

            if (Object.keys(_body).length > 0)
              props.newMainProfileService(_body);
          }
        }
      },
      onError: () => {
        toaster.error("Có lỗi xảy ra");
      },
    }
  );

  const createPolicyHandle = useCallback(
    async (contextMode?: string, e?: any) => {
      const _name = e?.target?.name;
      const _value = e?.target?.value;

      const _data = {
        contextMode: contextMode || EXECUTION,
        resourceCode: resourceCode,
        ...useFormResult.getValues(),
        ...(_name && _value ? { [_name]: _value } : {}),
      };

      if (contextMode === CHECK_PRICE) {
        delete (_data as any).invoiceIsCompany;
      }

      return await createPolicyMutation.mutateAsync(_data as any);
    },
    [
      resourceCode,
      // useFormResult.watch(),
      packageDataByGroupCode,
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
    orderConfigData,
    durationData,
    relationDataByGroupCode,
    groupPackageData,
    getPackageDataByGroupCode,
    packageDataByGroupCode,
    resourceCode,
    // get payment info
    checkCouponQuery,
    getPaymentInfoQuery,
    // mutate
    createPolicyHandle,
    createPolicyLoading: createPolicyMutation?.isLoading,
    paymentHandle,
    paymentLoadding: paymentMutation?.isLoading,
    verifyPhoneExistsHandle,
  };
};

export default useData;
