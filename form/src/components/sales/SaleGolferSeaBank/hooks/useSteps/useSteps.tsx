import React, { useCallback, useEffect, useMemo } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { useMediaQuery, Typography, Divider } from "@mui/material";
import { useTheme } from "@mui/styles";
import dayjs from "dayjs";

import {
  invoiceIsCompanyOptions,
  paymentMethodLoadingOptions,
} from "helper/options";

import Fee from "components/Fee";
import CheckboxLabelRule from "components/inputs/InputCheckbox/checkBoxLabels/CheckboxLabelRule";
import SummaryInfo from "components/SummaryInfo";
import RadioLabelPaymentMethodLong from "components/inputs/InputRadio/radioLabels/RadioLabelPaymentMethodLong";
import { paymentMethodMapping } from "helper/mapping";

import fields from "../../help/fields";
import useStyles from "../useStyles";
import ConfirmInfo from "./ConfirmInfo";
import TotalFee from "components/TotalFee";
import { getCouponsType } from "components/sales/types";

type useStepsProps = {
  useFormResult: UseFormReturn<FieldValues, any>;
  // init data
  orderConfigData: any;
  resourceCode: string;
  // mutation
  checkPriceMutation: any;
  // query
  checkCouponQuery: any;
  getPaymentInfoQuery: any;
  checkPriceHandle: any;
  getCouponsService: getCouponsType;
};

const useSteps = (props: useStepsProps) => {
  const theme = useTheme();
  const classes = useStyles();
  const matchesDownSm = useMediaQuery(theme.breakpoints.down("sm"));

  const getInitValues = useCallback(() => {
    return {
      [fields.invoiceIsCompany]: invoiceIsCompanyOptions[0].value,
    };
  }, []);

  const getDefaultValues = useCallback(() => {
    const _initValues = getInitValues();

    return {
      [fields.pkgCode]: "PKG-SEABANK-GOLFER",
      [fields.pkgCode2]: "PKG-SEABANK-HIO",
      ..._initValues,
    };
  }, [getInitValues]);

  useEffect(() => {
    props.useFormResult.reset(getDefaultValues());
  }, [getDefaultValues]);

  const fee = useMemo(
    () =>
      props.checkPriceMutation?.data?.content?.response?.polTotalFee -
      (props.checkPriceMutation?.data?.content?.response?.discounts?.[0]
        ?.discountAmount || 0),
    [
      props.checkPriceMutation?.data?.content?.response?.polTotalFee,
      props.checkPriceMutation?.data?.content?.response?.discounts?.[0]
        ?.discountAmount,
    ]
  );

  const oldFee = useMemo(
    () =>
      props.checkPriceMutation?.data?.content?.response?.discounts?.[0]
        ?.discountAmount
        ? props.checkPriceMutation?.data?.content?.response?.polTotalFee
        : 0,
    [
      props.checkPriceMutation?.data?.content?.response?.polTotalFee,
      props.checkPriceMutation?.data?.content?.response?.discounts?.[0]
        ?.discountAmount,
    ]
  );

  return useMemo(
    () => [
      {
        screens: [
          {
            inputsConfig: [
              {
                id: fields.buyerName,
                type: "text",
                label: "Đại diện pháp nhân sân golf",
                validations: ["required"],
              },
              {
                id: fields.buyerId,
                type: "text",
                label: "Số Đăng ký kinh doanh",
                validations: ["required"],
              },
              {
                id: fields.buyerAddress,
                type: "text",
                label: "Địa chỉ sân",
                validations: ["required"],
              },
              {
                id: fields.buyerEmail,
                type: "text",
                label: "Email sân",
                validations: ["required", "email"],
              },
              {
                id: fields.custName,
                type: "text",
                label: "Họ tên người chơi",
                validations: ["required"],
              },
              {
                id: fields.custPhone,
                type: "text",
                label: "Điện thoại người chơi",
                validations: ["phone"],
              },
              {
                id: fields.custVgaId,
                type: "text",
                label: "VGA ID",
                validations: [],
              },
              {
                id: fields.custEmail,
                type: "text",
                label: "Email người chơi",
                validations: ["required", "email"],
              },
              {
                id: fields.custAddress,
                type: "text",
                label: "Địa chỉ người chơi",
                validations: ["required"],
              },
              {
                id: fields.beginDate,
                type: "date",
                label: "Thời điểm phát bóng",
                validations: ["required", "dateRanger"],
                min: dayjs().toDate(),
              },
            ],
          },
        ],
      },
      {
        title: "XÁC NHẬN YÊU CẦU BẢO HIỂM",
        screens: [
          {
            inputsConfig: [
              {
                id: "inputsFrameVehicleInfo",
                type: "custom",
                className: classes.areaFull,
                custom: (
                  <ConfirmInfo
                    buyerName={props.useFormResult?.getValues(fields.buyerName)}
                    buyerIdNo={props.useFormResult?.getValues(fields.buyerId)}
                    buyerAddress={props.useFormResult?.getValues(
                      fields.buyerAddress
                    )}
                    buyerEmail={props.useFormResult?.getValues(
                      fields.buyerEmail
                    )}
                    custName={props.useFormResult?.getValues(fields.custName)}
                    custPhone={props.useFormResult?.getValues(fields.custPhone)}
                    custEmail={props.useFormResult?.getValues(fields.custEmail)}
                    custAddress={props.useFormResult?.getValues(
                      fields.custAddress
                    )}
                    beginDate={props.useFormResult?.getValues(fields.beginDate)}
                  />
                ),
              },
              // {
              //   id: fields.confirmed,
              //   type: "checkbox",
              //   label: "Cam kết",
              //   hideLabel: true,
              //   options: [
              //     {
              //       value: true,
              //       label: (
              //         <CheckboxLabelRule
              //           regulationsAndTermAndConditionUrl={
              //             "123"
              //             // props.useFormResult?.getValues(fields.typeFlow) ===
              //             // CAR
              //             //   ? props.orderConfigData?.tncTplCarUrl
              //             //   : props.useFormResult?.getValues(fields.pkgCode)
              //             //   ? props.orderConfigData?.tncTplZutoUrl
              //             //   : props.orderConfigData?.tncTplMotoUrl
              //           }
              //         />
              //       ),
              //       showCheckIcon: true,
              //     },
              //   ],
              //   className: classes.areaFull,
              //   validations: ["required"],
              // },
              // {
              //   id: "fee2",
              //   type: "custom",
              //   className: classes.areaFull,
              //   custom: (
              //     <Fee
              //       fee={fee}
              //       oldFee={oldFee}
              //       discountCode={props.useFormResult?.getValues(
              //         fields.discountCode
              //       )}
              //       hideDiscount={true}
              //       onSubmit={(data: any) => {
              //         props.useFormResult?.setValue(
              //           fields.discountCodeSubmit,
              //           data?.discountCode
              //         );
              //       }}
              //       getCouponsService={props.getCouponsService}
              //       resourceCode={props.resourceCode}
              //     />
              //   ),
              // },
              {
                id: fields.invoiceExport,
                type: "switch",
                switchLabel: "YÊU CẦU XUẤT HOÁ ĐƠN",
                helperText:
                  "Hóa đơn điện tử sẽ chỉ được xuất trong ngày và gửi về email của bạn vào ngày tiếp theo.",
                checkedValue: true,
                unCheckedValue: false,
                className: classes.areaFull,
              },
              {
                id: fields.invoiceIsCompany,
                type: "radio",
                options: invoiceIsCompanyOptions,
                row: true,
                className: classes.areaFull,
                hide: !props.useFormResult?.getValues(fields.invoiceExport),
              },
              {
                id: fields.invoiceCompanyName,
                type: "text",
                label: "Tên công ty",
                validations: ["required"],
                className: matchesDownSm ? classes.areaFull : classes.areaHalf,
                hide:
                  !props.useFormResult?.getValues(fields.invoiceExport) ||
                  !props.useFormResult?.getValues(fields.invoiceIsCompany),
              },
              {
                id: fields.invoiceBuyerName,
                type: "text",
                label: "Họ và tên",
                validations: ["required"],
                className: matchesDownSm ? classes.areaFull : classes.areaHalf,
                hide: !props.useFormResult?.getValues(fields.invoiceExport),
              },
              {
                id: fields.invoiceTaxCode,
                type: "text",
                label: "Mã số thuế",
                className: matchesDownSm ? classes.areaFull : classes.areaHalf,
                validations: ["required", "taxCode"],
                hide:
                  !props.useFormResult?.getValues(fields.invoiceExport) ||
                  !props.useFormResult?.getValues(fields.invoiceIsCompany),
              },
              {
                id: fields.invoiceEmail,
                type: "text",
                label: "Email",
                className: matchesDownSm ? classes.areaFull : classes.areaHalf,
                validations: ["required", "email"],
                hide: !props.useFormResult?.getValues(fields.invoiceExport),
              },
              {
                id: fields.invoiceAddress,
                type: "text",
                label: "Địa chỉ",
                className: classes.areaFull,
                validations: ["required"],
                hide: !props.useFormResult?.getValues(fields.invoiceExport),
              },
            ],
          },
        ],
      },
      {
        title: "Thanh toán",
        hideStepper: true,
        screens: [
          {
            btnNextLabel: "Thanh toán",
            inputsConfig: [
              {
                id: "paymentUserData",
                type: "custom",
                className: classes.areaFull,
                custom: (
                  <div>
                    <SummaryInfo
                      title={"Thông tin thanh toán"}
                      rowsData={[
                        {
                          label: "Họ và tên",
                          value: props.useFormResult?.getValues(
                            fields.custName
                          ),
                        },
                        {
                          label: "Số điện thoại",
                          value: props.useFormResult?.getValues(
                            fields.custPhone
                          ),
                        },
                        {
                          label: "Email",
                          value: props.useFormResult?.getValues(
                            fields.custEmail
                          ),
                        },
                      ]}
                    />
                    <br />
                    <Divider />
                  </div>
                ),
              },
              {
                id: "paymentFee",
                type: "custom",
                className: classes.areaFull,
                custom: (
                  <div>
                    <TotalFee
                      fee={props.useFormResult?.getValues(fields.totalFee)}
                      // oldFee={oldFee}
                      title={"Tổng phí bảo hiểm"}
                      description={"(Đã bao gồm VAT)"}
                    />
                    <br />
                    <Divider />
                  </div>
                ),
              },
              {
                id: "titlePaymentMethod",
                type: "custom",
                className: classes.areaFull,
                custom: (
                  <Typography className={classes.title}>
                    Phương thức thanh toán
                  </Typography>
                ),
              },
              {
                id: fields.paymentMethod,
                type: "radio",
                row: true,
                label: "Phương thức thanh toán",
                hideLabel: true,
                validations: ["required"],
                className: classes.areaFull,
                classGroup: classes.classGroupPaymentMethod,
                options:
                  props.getPaymentInfoQuery?.isInitialLoading ||
                  !props.getPaymentInfoQuery?.data?.content?.paymentMethods
                    ? paymentMethodLoadingOptions
                    : props.getPaymentInfoQuery?.data?.content?.paymentMethods?.map(
                        (it: any) => ({
                          value: it?.method,
                          label: (
                            <RadioLabelPaymentMethodLong
                              label={
                                (paymentMethodMapping as any)?.[it?.method]
                                  ?.label || it?.name
                              }
                              icon={
                                (paymentMethodMapping as any)?.[it?.method]
                                  ?.icon
                              }
                            />
                          ),
                        })
                      ),
              },
            ],
          },
        ],
      },
    ],
    [
      // fields
      props.useFormResult?.watch(fields.discountCode),
      props.useFormResult?.watch(fields.invoiceExport),
      props.useFormResult?.watch(fields.invoiceIsCompany),
      props.useFormResult?.watch(fields.countClickStep),
      props.useFormResult?.watch(fields.totalFee),
      // other
      fee,
      props.getPaymentInfoQuery?.isInitialLoading,
      props.getPaymentInfoQuery?.data?.content?.paymentMethods,
    ]
  );
};

export default useSteps;
