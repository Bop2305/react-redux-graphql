import React, { useEffect, useMemo, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { makeStyles, useTheme } from "@mui/styles";
import { Typography } from "@mui/material";

import toaster from "helper/toaster";
import DialogForm from "components/DialogForm";

import fields from "../../help/fields";
import { feedbackInfoCarServiceType } from "../../../types";
import { TRUCK } from "../../../../../helper/const";

const useStyles = makeStyles((theme) => ({
  wrapper: {},
}));

type FeedbackCarInfoProps = {
  data: any;
  // carBrandDataByRefSpecs: any;
  carBrandDataByCarType: any;
  carLineDataByCarTypeCarBrandCarYear: any;
  carVersionDataByCarLine: any;
  carYearDataAll: any;
  feedbackInfoCarService: feedbackInfoCarServiceType;
  open?: boolean;
};

const FeedbackCarInfo = (props: FeedbackCarInfoProps) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(!!props.open);

  useEffect(() => {
    setOpen(!!props.open);
  }, [props.open]);

  const feedbackInfoCarMutation = useMutation(
    (options) => props.feedbackInfoCarService(options as any),
    {
      onSuccess: (data) => {
        if (data?.statusCode === 0) {
          toaster.success("Gửi thông tin xe của bạn thành công");
          setOpen(false);
        }
      },
      onError: (err) => {
        toaster.error("Gửi thông tin xe của bạn không thành công");
      },
    }
  );

  const filteredCarYear = useMemo(() => {
    return (
      props?.carYearDataAll?.filter((it: { value: number }) => {
        return it?.value > 2006;
      }) || []
    );
  }, [props?.carYearDataAll]);

  return (
    <div className={classes.wrapper}>
      <Typography>
        Không tìm thấy xe của bạn? Vui lòng cập nhật{" "}
        <span
          style={{
            color: theme.palette.secondary.main,
            textDecoration: "underline",
            cursor: "pointer",
            fontWeight: theme.typography.fontWeightBold,
          }}
          onClick={() => {
            setOpen(true);
          }}
        >
          TẠI ĐÂY
        </span>
      </Typography>
      <DialogForm
        title="Nhập thông tin xe"
        submitLabel="Cập nhật"
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={(_data) => {
          feedbackInfoCarMutation.mutate({ ..._data } as any);
        }}
        loading={feedbackInfoCarMutation?.isLoading}
        inputsConfig={[
          {
            id: fields.carBrand,
            type: "text",
            label: "Hãng xe",
            validations: ["required"],
            // defaultValue:
            //   props.carBrandDataByRefSpecs?.length > 0 &&
            //   props.carBrandDataByRefSpecs?.find(
            //     (it: any) => it?.value === props.data?.[fields.carBrand]
            //   )?.name,
            defaultValue:
              props.carBrandDataByCarType?.length > 0 &&
              props.carBrandDataByCarType?.find(
                (it: any) => it?.value === props.data?.[fields.carBrand]
              )?.name,
          },
          {
            id: fields.carYear,
            type: "select",
            label: "Năm sản xuất",
            validations: ["required"],
            defaultValue: props.data?.[fields.carYear],
            options: filteredCarYear?.map((it: any) => ({
              value: it?.value,
              label: it?.name,
            })),
          },
          {
            id: fields.carLine,
            type: "text",
            label: "Dòng xe",
            validations: ["required"],
            defaultValue: props.carLineDataByCarTypeCarBrandCarYear?.find(
              (it: any) => it?.value === props.data?.[fields.carLine]
            )?.name,
          },
          {
            id: fields.carVersion,
            type: "text",
            label: "Phiên bản",
            defaultValue: props.carVersionDataByCarLine?.find(
              (it: any) => it?.value === props.data?.[fields.carVersion]
            )?.name,
            // hide: !!props.data?.[fields.refSpecs]?.find(
            //   (v: any) => v?.indexOf(TRUCK) !== -1
            // ),
          },
          {
            id: fields.carValue,
            type: "currency",
            label: "Giá trị xe",
            validations: ["required"],
            defaultValue: props.data?.[fields.carValue],
          },
          {
            id: fields.customerPhoneNumber,
            type: "text",
            label: "Số điện thoại người yêu cầu",
            validations: ["required", "phone"],
          },
        ]}
      />
    </div>
  );
};

export default FeedbackCarInfo;
