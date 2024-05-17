import React from "react";
import { makeStyles } from "@mui/styles";

import SummaryInfo from "components/SummaryInfo";
import Line from "components/Line";
import convertDateToString from "helper/converts/convertDateToString";
import convertCurrency from "helper/converts/convertCurrency";
import { genderMapping } from "helper/mapping";
import {
  hasBankLoanHomeOptions,
  buyerIsCompanyOptions,
  isInsuredOptions,
} from "helper/options";

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
  saleType: string;
  hasBankLoan: boolean;
  homeType: string;
  projectName: string;
  homeUsing: string;
  homeAddress: string;
  homeValue: number;
  sumInsurance: number;
  homeAddon: string;
  homeAddon2: string;
  durations: number;
  effectiveDate: string;
  expireDate: string;
  isInsured: number;
  buyerIsCompany: boolean;
  buyerCifNumber: string;
  buyerName: string;
  buyerIdNo: string;
  buyerDeputyName: string;
  buyerDeputyTitle: string;
  buyerPhone: string;
  buyerEmail: string;
  buyerAddress: string;
  buyerRelationship: string;
  insuredName: string;
  insuredIdNo: string;
  insuredPhone: string;
  insuredEmail: string;
};

const ConfirmInfo = (props: ConfirmInfoType) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <SummaryInfo
        title="Thông tin căn nhà được bảo hiểm"
        rowsData={[
          {
            label: "Kênh bán",
            value: props.saleType,
          },
          {
            label: "Loại tài sản",
            value: props.hasBankLoan,
          },
          {
            label: "Loại hình căn nhà",
            value: props.homeType,
          },
          {
            label: "Tên dự án",
            value: props.projectName,
          },
          {
            label: "Hiện trạng căn nhà sử dụng",
            value: props.homeUsing,
          },
          {
            label: "Địa điểm được bảo hiểm",
            value: props.homeAddress,
          },
          {
            label: "Giá trị căn nhà",
            value: `${convertCurrency(props.homeValue)}đ`,
          },
          {
            label: "Số tiền bảo hiểm",
            value: `${convertCurrency(props.sumInsurance)}đ`,
          },
          {
            label: "Gói BH tài sản trong nhà",
            value: props.homeAddon,
          },
          {
            label: "Gói quyền lợi bổ sung",
            value: props.homeAddon2,
          },
          {
            label: "Thời hạn bảo hiểm",
            value: props.durations,
          },
          {
            label: "Thời gian hiệu lực",
            value: `${convertDateToString(
              props.effectiveDate
            )} - ${convertDateToString(props.expireDate)}`,
          },
        ]}
      />
      <Line />
      <SummaryInfo
        title="Thông tin bên mua bảo hiểm"
        rowsData={[
          {
            label: "Bên mua bảo hiểm đồng thời là Người được bảo hiểm",
            value: isInsuredOptions?.find(
              (it: any) => it?.value === Number(props.isInsured)
            )?.label,
          },
          {
            label: "Bên mua bảo hiểm",
            value: buyerIsCompanyOptions?.find(
              (it: any) => it?.value === props.buyerIsCompany
            )?.label as any,
          },
          {
            label: "Số CIF",
            value: props.buyerCifNumber,
          },
          {
            label: props.buyerIsCompany ? "Tên công ty" : "Họ và tên",
            value: props.buyerName,
          },
          {
            label: props.buyerIsCompany ? "Mã số thuế" : "Số giấy tờ tùy thân",
            value: props.buyerIdNo,
          },
          {
            label: "Người đại diện",
            value: props.buyerDeputyName,
          },
          {
            label: "Chức vụ",
            value: props.buyerDeputyTitle,
          },
          {
            label: "Số điện thoại",
            value: props.buyerPhone,
          },
          {
            label: "Email",
            value: props.buyerEmail,
          },
          {
            label: "Địa chỉ liên lạc",
            value: props.buyerAddress,
          },
          {
            label: "Bên mua bảo hiểm là",
            value: props.buyerRelationship,
          },
        ]}
      />
      {Number(props.isInsured) === 0 && (
        <>
          <Line />
          <SummaryInfo
            title="Thông tin người được bảo hiểm"
            rowsData={[
              {
                label: "Họ và tên",
                value: props.insuredName,
              },
              {
                label: "Số giấy tờ tùy thân",
                value: props.insuredIdNo,
              },
              {
                label: "Số điện thoại",
                value: props.insuredPhone,
              },
              {
                label: "Email",
                value: props.insuredEmail,
              },
            ]}
          />
        </>
      )}
    </div>
  );
};

export default ConfirmInfo;
