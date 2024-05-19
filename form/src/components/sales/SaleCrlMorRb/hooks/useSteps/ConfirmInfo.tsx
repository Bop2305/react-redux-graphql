import React from "react";
import { makeStyles } from "@mui/styles";

import SummaryInfo from "components/SummaryInfo";
import Line from "components/Line";
import convertDateToString from "helper/converts/convertDateToString";
import convertCurrency from "helper/converts/convertCurrency";
import { genderMapping } from "helper/mapping";

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
  custName: string;
  custDob: string;
  custID: string;
  custGender: string;
  custEmail: string;
  custPhone: string;
  custAddress: string;
  creditNo: string;
  creditStartDate: string;
  creditEndDate: string;
  insStartDate: string;
  insEndDate: string;
  insAmount: number;
  creditAmount: number;
  buyingCriteria: string;
};

const ConfirmInfo = (props: ConfirmInfoType) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <SummaryInfo
        title="BMBH đồng thời là NĐBH và là Bên vay trong Hợp đồng cho vay"
        rowsData={[
          {
            label: "Họ và tên",
            value: props.custName,
          },
          {
            label: "Ngày sinh",
            value: convertDateToString(props.custDob),
          },
          {
            label: "Số giấy tờ tuỳ thân",
            value: props.custID,
          },
          {
            label: "Giới tính",
            value:
              props.custGender === "M"
                ? "Nam"
                : props.custGender === "F"
                ? "Nữ"
                : "",
          },
          {
            label: "Email",
            value: props.custEmail,
          },
          {
            label: "Số điện thoại",
            value: props.custPhone,
          },
          {
            label: "Địa chỉ",
            value: props.custAddress,
          },
        ]}
      />
      <Line />
      <SummaryInfo
        title="Thông tin hợp đồng"
        rowsData={[
          {
            label: "Mua bảo hiểm theo tiêu chí",
            value: props.buyingCriteria,
          },
          {
            label: "Số hợp đồng cho vay",
            value: props.creditNo,
          },
          {
            label: "Thời hạn hợp đồng cho vay",
            value: `${convertDateToString(
              props.creditStartDate
            )} - ${convertDateToString(props.creditEndDate)}`,
          },
          {
            label: "Số tiền giải ngân",
            value: convertCurrency(props.creditAmount),
          },
          {
            label: "Thời hạn hợp đồng bảo hiểm",
            value: `${convertDateToString(
              props.insStartDate
            )} - ${convertDateToString(props.insEndDate)}`,
          },
          {
            label: "Số tiền bảo hiểm",
            value: convertCurrency(props.insAmount),
          },
        ]}
      />
    </div>
  );
};

export default ConfirmInfo;
