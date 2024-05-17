import React from "react";

import Stepper from "components/Stepper";
import withTheme from "hoc/withTheme";
import useData from "./hooks/useData";
import useSteps from "./hooks/useSteps";
import fields from "./help/fields";
import toaster from "helper/toaster";

export type SaleOcarRbDeptProps = {
  getProgramsService: any;
  getPlaceOrderInitService: any;
  createPoolService: any;
  submitCarInspectionImageService: any;
  getCarInspectionResultService: any;
  savePlaceOrderService: any;
  saveDraftService: any;
  className?: string;
  domainLinkFile: string;
  onComplete?: any;
  orderId?: string;
  getDraftByOrderIdService?: any;
};

const SaleOcarRbDept = (props: SaleOcarRbDeptProps) => {
  const {
    useFormResult,
    pendingOrderData,
    poolId,
    saveDraftMutation,
    resourceCode,
    orderContentJson,
  } = useData({
    getProgramsService: props.getProgramsService,
    getPlaceOrderInitService: props.getPlaceOrderInitService,
    createPoolService: props.createPoolService,
    savePlaceOrderService: props.savePlaceOrderService,
    saveDraftService: props.saveDraftService,
    orderId: props.orderId,
    getDraftByOrderIdService: props.getDraftByOrderIdService,
  });
  const steps = useSteps({
    useFormResult,
    pendingOrderData,
    poolId,
    domainLinkFile: props.domainLinkFile,
    submitCarInspectionImageService: props.submitCarInspectionImageService,
    getCarInspectionResultService: props.getCarInspectionResultService,
    orderContentJson,
  });

  return (
    <div className={props.className}>
      <Stepper
        steps={steps}
        useFormResult={useFormResult}
        autoNext={false}
        loading={saveDraftMutation?.isLoading}
        onNext={async (
          data,
          currentStepIndex,
          currentScreenIndexOfStep,
          next
        ) => {
          if (currentScreenIndexOfStep == 2) {
            const res = await saveDraftMutation?.mutateAsync({
              ...data,
              orderId: props.orderId || pendingOrderData?.orderId,
              vehiclePlateNo: data?.[fields.carPlateNo],
              saleCode: data?.[fields.saleCode],
              resourceCode: resourceCode,
            });

            if ((res as any)?.statusCode === 0) {
              props.onComplete();
            } else if ([-2, -3].includes((res as any)?.statusCode)) {
              toaster.error("Biển số xe đã tồn tại");
            } else {
              toaster.error((res as any)?.message);
            }
          } else {
            next();
          }
        }}
      />
    </div>
  );
};

export default withTheme<SaleOcarRbDeptProps>(SaleOcarRbDept);
