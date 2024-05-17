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

type insured = {
  relation: string;
  relationName: string;
  fullName: string;
  birthday: any;
};

type ConfirmInfoType = {
  ownerFullName: string;
  ownerPhoneNumber: string;
  ownerEmail: string;
  insureds: insured[];
  pkgName: string;
  pkgFee: number;
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
            value: props?.ownerFullName,
          },
          {
            label: "SĐT",
            value: props?.ownerPhoneNumber,
          },
          {
            label: "Email",
            value: props?.ownerEmail,
          },
        ]}
      />
      <Line />
      <SummaryInfo title="Thông tin người được bảo hiểm" />
      {props.insureds?.map((insured, i) => (
        <SummaryInfo
          key={`${insured?.relation}${i}`}
          title={`${i + 1}. ${insured?.relationName}`}
          rowsData={[
            { label: "Họ tên", value: insured?.fullName },
            {
              label: "Ngày sinh",
              value: convertDateToString(insured?.birthday),
            },
          ]}
        />
      ))}
      <Line />
      <SummaryInfo
        title="Chương trình bảo hiểm"
        rightTitle={props.pkgName}
        rowsData={[
          {
            label: "Phí bảo hiểm năm (đồng/người)",
            value: `${convertCurrency(props.pkgFee || 0)}đ`,
          },
        ]}
      />
    </div>
  );
};

export default ConfirmInfo;
