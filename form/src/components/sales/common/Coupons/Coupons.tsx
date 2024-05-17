import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import withTheme from "hoc/withTheme";
import DialogForm from "components/DialogForm";
import { getCouponsType } from "components/sales/types";
import RadioLabelCoupon from "components/inputs/InputRadio/radioLabels/RadioLabelCoupon";

import useStyles from "./useStyles";
import fields from "./fields";

export type CouponsProps = {
  open: boolean;
  onClose: any;
  getCouponsService: getCouponsType;
  resourceCode: string;
  onSubmit: any;
  discountCode?: string;
};

const Coupons = (props: CouponsProps) => {
  const classes = useStyles();
  const useFormResult = useForm({
    mode: "onTouched",
  });

  const getCouponsQuery = useQuery(
    ["getCouponsQuery", props.resourceCode],
    () =>
      props.getCouponsService({ resourceCode: props.resourceCode as string }),
    {
      refetchOnWindowFocus: false,
      enabled: !!props.resourceCode,
    }
  );

  useEffect(() => {
    useFormResult?.setValue(fields.discountCode, props.discountCode);
    useFormResult?.setValue(fields.coupon, props.discountCode);
  }, [props.discountCode, useFormResult?.setValue]);

  return (
    <div className={classes.wrapper}>
      <DialogForm
        useFormResult={useFormResult}
        inputsConfig={[
          { id: fields.discountCode, type: "text", label: "Mã khuyến mại" },
          {
            id: fields.coupon,
            type: "radio",
            label: "Vui lòng chọn mã khuyến mại",
            options: getCouponsQuery?.data?.content?.map((c: any) => ({
              value: c?.discountCode,
              label: (
                <RadioLabelCoupon
                  couponCode={c?.discountCode}
                  couponName={c?.userDisplayTitle}
                  couponExpireDate={c?.endTime}
                />
              ),
            })),
            onChange: (e: any) => {
              useFormResult.setValue(fields.discountCode, e?.target?.value);
            },
          },
        ]}
        title="Mã khuyến mại"
        open={props.open}
        onClose={props.onClose}
        submitLabel="Áp dụng"
        onSubmit={props.onSubmit}
      />
    </div>
  );
};

export default withTheme<CouponsProps>(Coupons);
