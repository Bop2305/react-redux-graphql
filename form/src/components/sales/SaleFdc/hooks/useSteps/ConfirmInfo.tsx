import React from "react";
import { makeStyles } from "@mui/styles";

import convertDateToString from "helper/converts/convertDateToString";
import convertCurrency from "helper/converts/convertCurrency";
import SummaryInfo from "components/SummaryInfo";
import Line from "components/Line";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    backgroundColor: theme.palette.common.white,
    padding: theme.spacing(5),
  },
}));

type ConfirmInfoType = {
  buyerFullName: string;
  buyerPhoneNumber: string;
  buyerEmail: string;
  insureds: { insuredName: string }[];
  depDate: string;
  depFlightNo: string;
  pnr: string;
  programInsurance: string;
  depFee: number;
  returnDate: string;
  returnFlightNo: string;
  returnFee: number;
};

const ConfirmInfo = (props: ConfirmInfoType) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <SummaryInfo
        title="Thông tin người mua bảo hiểm"
        rowsData={[
          {
            label: "Họ và tên",
            value: props.buyerFullName,
          },
          {
            label: "Số điện thoại",
            value: props.buyerPhoneNumber,
          },
          {
            label: "Email",
            value: props.buyerEmail,
          },
        ]}
      />
      <Line />
      <SummaryInfo
        title="Thông tin người được bảo hiểm"
        rowsData={props.insureds?.map((it, i) => ({
          label: i + 1,
          value: it?.insuredName,
        }))}
      />
      <Line />
      <SummaryInfo
        title="Thông tin chuyến bay"
        rowsData={[
          {
            label: "Ngày đi",
            value: convertDateToString(props.depDate, "HH:mm - DD/MM/YYYY"),
          },
          {
            label: "Số hiệu chuyến bay",
            value: props.depFlightNo,
          },
          {
            label: "Mã đặt chỗ",
            value: props.pnr,
          },
          {
            label: "Chương trình bảo hiểm",
            value: props.programInsurance,
          },
          {
            label: "Phí bảo hiểm",
            value: `${convertCurrency(props.depFee)}đ/người`,
          },
        ]}
      />

      {!!props.returnFlightNo && (
        <>
          <br />
          <SummaryInfo
            rowsData={[
              {
                label: "Ngày về",
                value: convertDateToString(
                  props.returnDate,
                  "HH:mm - DD/MM/YYYY"
                ),
              },
              {
                label: "Số hiệu chuyến bay",
                value: props.returnFlightNo,
              },
              {
                label: "Mã đặt chỗ",
                value: props.pnr,
              },
              {
                label: "Chương trình bảo hiểm",
                value: props.programInsurance,
              },
              {
                label: "Phí bảo hiểm",
                value: `${convertCurrency(props.returnFee)}đ/người`,
              },
            ]}
          />
        </>
      )}
    </div>
  );
};

export default ConfirmInfo;
