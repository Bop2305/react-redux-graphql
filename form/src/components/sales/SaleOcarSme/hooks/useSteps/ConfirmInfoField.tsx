import React from "react";
import SummaryInfo from "components/SummaryInfo";
import TotalFee from "components/TotalFee";
import CarImageListBlock from "components/CarImageListBlock";
import { makeStyles } from "@mui/styles";

import { carUsingMapping } from "helper/mapping";
import convertDateToString from "helper/converts/convertDateToString";
import convertCurrency from "helper/converts/convertCurrency";
import Line from "components/Line";

const useStyles = makeStyles((theme) => {
  return {
    deductSuffix: {
      // color: theme.palette.grey[500],
      fontWeight: "normal",
    },
  };
});

const ConfirmInfoField = ({
  buyerIsCompany,
  buyerName,
  buyerPhone,
  buyerEmail,
  ownerFullName,
  ownerPhoneNumber,
  ownerEmail,
  carUsing,
  carBrandName,
  carLineName,
  carVersionName,
  carYear,
  carPlateNo,
  carValue,
  sumInsurance,
  pkgName,
  duration,
  effectiveDate,
  expireDate,
  deductibleExcess,
  oldFee,
  fee,
  domainLinkFile,
  carCaptureFrontLeft,
  carCaptureFrontRight,
  carCaptureRearLeft,
  carCaptureRearRight,
}: any) => {
  const classes = useStyles();

  return (
    <div>
      {buyerIsCompany && (
        <SummaryInfo
          title={"Thông tin bên mua"}
          rowsData={[
            {
              label: "Tên doanh nghiệp",
              value: buyerName,
            },
            {
              label: "SĐT",
              value: buyerPhone,
            },
            {
              label: "Email",
              value: buyerEmail,
            },
          ]}
        />
      )}
      <Line />
      <SummaryInfo
        title={"Thông tin chủ xe"}
        rowsData={[
          {
            label: "Họ và tên",
            value: ownerFullName,
          },
          {
            label: "SĐT",
            value: ownerPhoneNumber,
          },
          {
            label: "Email",
            value: ownerEmail,
          },
        ]}
      />
      <Line />
      <SummaryInfo
        title={"Thông tin xe được bảo hiểm"}
        rowsData={[
          {
            label: "Mục đích sử dụng",
            value: (carUsingMapping as any)[carUsing],
          },
          {
            label: "Thông tin xe",
            value: `${carBrandName} - ${carLineName} - ${
              carVersionName ? carVersionName + " - " : ""
            }${carYear}`,
          },
          {
            label: "",
            value: "",
          },
          {
            label: "Biển kiểm soát",
            value: carPlateNo,
          },
          {
            label: "Giá trị khai báo",
            value: carValue,
            isMoney: true,
          },
          {
            label: "Số tiền bảo hiểm",
            value: sumInsurance,
            isMoney: true,
          },
        ]}
      />
      <Line />
      <SummaryInfo
        rightTitle={pkgName}
        title="Chương trình bảo hiểm"
        rowsData={[
          {
            label: "Thời hạn bảo hiểm",
            value: `${
              duration ? `${duration} Tháng\n` : ""
            }(Từ ${convertDateToString(
              effectiveDate
            )} đến ${convertDateToString(expireDate)})`,
          },
          {
            label: "Mức khấu trừ",
            value: (
              <>
                {convertCurrency(deductibleExcess)}{" "}
                <span className={classes.deductSuffix}>đ/vụ</span>
              </>
            ),
          },
        ]}
      />
      <Line />
      <CarImageListBlock
        title={"Hình ảnh xe"}
        items={[
          {
            src: carCaptureFrontLeft
              ? `${domainLinkFile}/${carCaptureFrontLeft}`
              : "",
            title: "trước - LÁI",
          },
          {
            src: carCaptureFrontRight
              ? `${domainLinkFile}/${carCaptureFrontRight}`
              : "",
            title: "trước - PHỤ",
          },
          {
            src: carCaptureRearLeft
              ? `${domainLinkFile}/${carCaptureRearLeft}`
              : "",
            title: "SAU - LÁI",
          },
          {
            src: carCaptureRearRight
              ? `${domainLinkFile}/${carCaptureRearRight}`
              : "",
            title: "SAU - PHỤ",
          },
        ]}
      />
    </div>
  );
};

export default ConfirmInfoField;
