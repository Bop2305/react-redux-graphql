import { useState, useMemo, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "@tanstack/react-query";
import fields from "../help/fields";
import {
  FRONT_LEFT_VIEW,
  FRONT_RIGHT_VIEW,
  REAR_LEFT_VIEW,
  REAR_RIGHT_VIEW,
} from "helper/const";

type useDataProps = {
  getPlaceOrderInitService: any;
  getProgramsService: any;
  createPoolService: any;
  savePlaceOrderService: any;
  saveDraftService: any;
  resourceCode?: string;
  orderId?: string;
  getDraftByOrderIdService?: any;
};

const useData = (props: useDataProps) => {
  const useFormResult = useForm({ mode: "onTouched" });
  const [resourceCode, setResourceCode] = useState<string>();

  const draftByOrderIdQuery = useQuery(
    ["getDraftByOrderIdService", props.orderId],
    () => props.getDraftByOrderIdService({ orderId: props.orderId }),
    {
      refetchOnWindowFocus: false,
      enabled: !!props.orderId,
    }
  );

  const orderContentJson = useMemo(
    () =>
      draftByOrderIdQuery?.data?.content?.orderContentJson &&
      JSON.parse(draftByOrderIdQuery?.data?.content?.orderContentJson),
    [draftByOrderIdQuery?.data?.content?.orderContentJson]
  );

  const saveDraftMutation = useMutation((options) =>
    props.saveDraftService(options as any)
  );

  const savePlaceOrderMutation = useMutation(
    (options) => props.savePlaceOrderService(options as any),
    {
      onSuccess: (data: any) => {
        if (data?.statusCode === 0) {
          createPoolHandle();
        }
      },
    }
  );

  useQuery(["getPrograms"], props.getProgramsService, {
    refetchOnWindowFocus: false,
    enabled: !props.resourceCode,
    onSuccess: (data: any) => {
      if (data?.statusCode === 0) {
        setResourceCode(
          data?.content?.find((it: any) => it?.progLine === "CAR")?.resourceCode
        );
      }
    },
  });

  const getPlaceOrderInitQuery = useQuery(
    ["getPlaceOrderInit", resourceCode],
    () =>
      props.getPlaceOrderInitService({
        resourceCode: resourceCode as string,
        orderId: props.orderId as string,
      }),
    {
      refetchOnWindowFocus: false,
      enabled: !!resourceCode,
      onSuccess: (data) => {
        if (data?.statusCode === 0) {
          savePlaceOrderMutation.mutate({
            resourceCode,
            orderId: data?.content?.pendingOrders?.find(
              (it: any) => it?.resourceCode === resourceCode
            )?.orderId,
          } as any);
        }
      },
    }
  );

  const pendingOrderData = useMemo(
    () =>
      getPlaceOrderInitQuery?.data?.content?.pendingOrders?.find(
        (it: any) => it?.resourceCode === resourceCode
      ),
    [getPlaceOrderInitQuery?.data?.content?.pendingOrders, resourceCode]
  );

  // create pool
  const createPoolMutation = useMutation(
    (options) => props.createPoolService(options as any),
    {
      onSuccess: (data: any) => {
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

  return {
    useFormResult,
    pendingOrderData,
    poolId: createPoolMutation?.data?.content?.poolId,
    saveDraftMutation,
    resourceCode,
    orderContentJson,
  };
};

export default useData;
