import React, { useMemo, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";

import { CAR, MOTO, MOTO_ZUTTO } from "helper/const";
import SummaryInfo from "components/SummaryInfo";
import Line from "components/Line";

import Dialog from "components/Dialog";
import convertCurrency from "helper/converts/convertCurrency";
import Markdown from "components/Markdown";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    backgroundColor: theme.palette.common.white,
    padding: theme.spacing(5),
  },
  dialogContentTitle: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightBold,
  },
  dialogContentSub: {
    fontWeight: theme.typography.fontWeightBold,
  },
}));

type ConfirmInfoType = {
  durations: string | number;
  effectiveDate: string;
  expireDate: string;
  buyerName: string;
  buyerPhone: string;
  buyerEmail: string;
  homeType: string;
  pkgs: any;
  pkgsAddOn: any;
  homeAddress: string;
  homeBuildYear: string;
  homeValue: number;
  inHomeValue: string;
  defaultDeduction: any;
  buyerRelationship: string;
  detailCovMain: any;
};

const ConfirmInfo = (props: ConfirmInfoType) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  return (
    <div className={classes.wrapper}>
      <SummaryInfo title="Người mua bảo hiểm" />
      <b>{props.buyerRelationship}</b>
      <SummaryInfo
        rowsData={[
          {
            label: "Họ và Tên",
            value: props.buyerName,
          },
          {
            label: "Số điện thoại",
            value: props.buyerPhone,
          },
          {
            label: "Email",
            value: props.buyerEmail,
          },
        ]}
      />
      <Line />
      <b>{props.homeType}</b>
      <SummaryInfo
        rowsData={[
          {
            label: "Địa điểm",
            value: props.homeAddress,
          },
          {
            label: "Năm xây dựng",
            value: props.homeBuildYear,
          },
          ...props.pkgs?.map((v: any) => ({
            label: v,
            value: "Có",
          })),
          {
            label: "Giá trị căn nhà",
            value: `${convertCurrency(props.homeValue)}đ`,
          },
          {
            label: "Giá trị tài sản trong nhà",
            value: props.inHomeValue,
          },
        ]}
      />
      <Line />
      <SummaryInfo
        title="Chương trình bảo hiểm"
        rightTitle={"Nhà An Gia"}
        onClickRightTitle={() => {
          setOpen(true);
        }}
        rowsData={[
          {
            label: "Thời hạn bảo hiểm",
            value: (
              <span>
                {props.durations}
                <br />
                Từ {props.effectiveDate} đến {props.expireDate}
              </span>
            ),
          },
          {
            label: "Quyền lợi bổ sung",
            value:
              props.pkgsAddOn?.length > 0 ? (
                <div>
                  {props.pkgsAddOn?.map((v: any, i: number) => (
                    <div key={i}>{v}</div>
                  ))}
                </div>
              ) : (
                ""
              ),
          },
        ]}
      />
      <Line />
      <SummaryInfo
        title="Mức khấu trừ (mặc định)"
        rowsData={props.defaultDeduction?.map((it: any) => ({
          label: it?.name,
          value: it?.value,
        }))}
      />

      <Dialog
        open={open}
        title="Chương trình bảo hiểm"
        onClose={() => setOpen(false)}
        fullScreen={false}
      >
        <Markdown value={props.detailCovMain} />
      </Dialog>
    </div>
  );
};

export default ConfirmInfo;
