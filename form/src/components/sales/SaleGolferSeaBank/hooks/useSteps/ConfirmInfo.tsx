import React from "react";
import { makeStyles } from "@mui/styles";

import SummaryInfo from "components/SummaryInfo";
import Line from "components/Line";
import convertDateToString from "helper/converts/convertDateToString";

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
  buyerName: "buyerName";
  buyerIdNo: "buyerIdNo";
  buyerAddress: "buyerAddress";
  buyerEmail: "buyerEmail";
  custName: "custName";
  custPhone: "custPhone";
  custEmail: "custEmail";
  custAddress: "custAddress";
  beginDate: "beginDate";
};

const ConfirmInfo = (props: ConfirmInfoType) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <SummaryInfo
        title="Thông tin sân golf"
        rowsData={[
          {
            label: "Đại diện pháp nhân",
            value: props.buyerName,
          },
          {
            label: "Số Đăng ký kinh doanh",
            value: props.buyerIdNo,
          },
          {
            label: "Địa chỉ",
            value: props.buyerAddress,
          },
          {
            label: "Email",
            value: props.buyerEmail,
          },
        ]}
      />
      <Line />
      <SummaryInfo
        title="Thông tin người chơi"
        rowsData={[
          {
            label: "Họ tên",
            value: props.custName,
          },
          {
            label: "Điện thoại",
            value: props.custPhone,
          },
          {
            label: "Email",
            value: props.custEmail,
          },
          {
            label: "Địa chỉ",
            value: props.custAddress,
          },
          {
            label: "Thời điểm phát bóng",
            value: convertDateToString(props.beginDate),
          },
        ]}
      />
      <Line />
    </div>
  );
};

export default ConfirmInfo;
