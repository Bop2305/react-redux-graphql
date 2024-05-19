import React, { useCallback, useMemo, useEffect } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { Divider, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/styles";
import dayjs from "dayjs";

import {
  genderOptions,
  invoiceIsCompanyOptions,
  paymentMethodLoadingOptions,
} from "helper/options";
import Fee from "components/Fee";
import CheckboxLabelRule from "components/inputs/InputCheckbox/checkBoxLabels/CheckboxLabelRule";
import getTimeText from "../../help/getTimeText";

import useStyles from "../useStyles";
import fields from "../../help/fields";
import ConfirmInfo from "./ConfirmInfo";
import SummaryInfo from "components/SummaryInfo";
import TotalFee from "components/TotalFee";
import RadioLabelPaymentMethodLong from "components/inputs/InputRadio/radioLabels/RadioLabelPaymentMethodLong";
import { paymentMethodMapping } from "helper/mapping";

type useStepsProps = {
  useFormResult: UseFormReturn<FieldValues, any>;
  checkPriceHandle: any;
  checkPriceMutation: any;
  getPaymentInfoQuery: any;
  policy: any;
  buyingCriteriaData: any;
};

const useSteps = (props: useStepsProps) => {
  const theme = useTheme();
  const classes = useStyles();
  const matchesDownSm = useMediaQuery(theme.breakpoints.down("sm"));

  console.log('[useSteps] [buyingCriteriaData]', props.buyingCriteriaData)

  const getInitValues = useCallback(() => {
    const _insStartDate = props.policy?.polEffectiveDate;
    const _insEndDate = props.policy?.polExpireDate;
    const _insAmount = props.policy?.polAmount;
    if (_insStartDate && _insEndDate && _insAmount) {
      props.checkPriceHandle(_insStartDate, _insEndDate, _insAmount);
    }

    return {
      [fields.custName]: props.policy?.polBuyerName,
      [fields.custDob]: props.policy?.polInsuredBirthday,
      [fields.custID]: props.policy?.polBuyerIdNo,
      [fields.custGender]: props.policy?.polInsuredGender,
      [fields.custEmail]: props.policy?.polBuyerEmail,
      [fields.custPhone]: props.policy?.polBuyerPhone,
      [fields.custAddress]: props.policy?.polBuyerAddress,
      [fields.creditNo]: props.policy?.polCreditNo,
      [fields.creditStartDate]: props.policy?.polCreditDisburDate,
      [fields.creditEndDate]: props.policy?.polCreditEnddate,
      [fields.insStartDate]: _insStartDate,
      [fields.insEndDate]: _insEndDate,
      [fields.insAmount]: _insAmount,
      [fields.buyingCriteria]: props.policy?.buyingCriteria,

      [fields.invoiceExport]: !!props.policy?.polInvoices?.[0]?.invoiceExport,
      [fields.invoiceIsCompany]:
        !!props.policy?.polInvoices?.[0]?.invoiceIsCompany,
      [fields.invoiceCompanyName]:
        props.policy?.polInvoices?.[0]?.invoiceCompanyName,
      [fields.invoiceBuyerName]:
        props.policy?.polInvoices?.[0]?.invoiceBuyerName,
      [fields.invoiceTaxCode]: props.policy?.polInvoices?.[0]?.invoiceTaxCode,
      [fields.invoiceEmail]: props.policy?.polInvoices?.[0]?.invoiceEmail,
      [fields.invoiceAddress]: props.policy?.polInvoices?.[0]?.invoiceAddress,
    };
  }, [props.policy, props.checkPriceHandle]);

  const getDefaultValues = useCallback(() => {
    const _initValues = getInitValues();

    return {
      ..._initValues,
    };
  }, [getInitValues]);

  useEffect(() => {
    props.useFormResult.reset(getDefaultValues());
  }, [getDefaultValues]);

  const fee = useMemo(
    () => props.checkPriceMutation?.data?.content?.response?.polTotalFee,
    [props.checkPriceMutation?.data?.content?.response?.polTotalFee]
  );

  const rangerText = useMemo(() => {
    return getTimeText(
      props.useFormResult.getValues(fields.insStartDate),
      props.useFormResult.getValues(fields.insEndDate)
    );
  }, [
    props.useFormResult.watch(fields.insStartDate),
    props.useFormResult.watch(fields.insEndDate),
  ]);

  return useMemo(
    () => [
      {
        screens: [
          {
            title:
              "BMBH đồng thời là NĐBH và là Bên vay trong Hợp đồng cho vay",
            inputsConfig: [
              {
                id: fields.custName,
                type: "text",
                label: "Họ tên",
                validations: ["required"],
                onBlur: (e: any) => {
                  props.useFormResult?.setValue(
                    fields.invoiceBuyerName,
                    e?.target?.value
                  );
                },
              },
              {
                id: fields.custDob,
                type: "date",
                label: "Ngày sinh",
                openTo: "year",
                validations: ["required", "date", "dateRanger"],
                min: dayjs().subtract(65, "years"),
                max: dayjs().subtract(18, "years"),
              },
              {
                id: fields.custID,
                type: "text",
                label: "Số giấy tờ tuỳ thân",
                validations: ["required", "idNo"],
              },
              {
                id: fields.custGender,
                type: "select",
                label: "Giới tính",
                validations: ["required"],
                options: genderOptions,
              },
              {
                id: fields.custEmail,
                type: "text",
                label: "Email",
                validations: ["required", "email"],
                onBlur: (e: any) => {
                  props.useFormResult?.setValue(
                    fields.invoiceEmail,
                    e?.target?.value
                  );
                },
              },
              {
                id: fields.custPhone,
                type: "text",
                label: "Số điện thoại",
                validations: ["required", "phone"],
              },
              {
                id: fields.custAddress,
                type: "text",
                label: "Địa chỉ",
                validations: ["required"],
                className: classes.areaFull,
                onBlur: (e: any) => {
                  props.useFormResult?.setValue(
                    fields.invoiceAddress,
                    e?.target?.value
                  );
                },
              },
            ],
          },
        ],
      },
      {
        screens: [
          {
            title: "Thông tin hợp đồng",
            inputsConfig: [
              {
                id: fields.buyingCriteria,
                type: "radio",
                label: "Mua bảo hiểm theo tiêu chí",
                validations: ["required"],
                options: props.buyingCriteriaData?.map((it: any) => ({
                  value: it?.value,
                  label: it?.name,
                })),
                className: classes.areaFull,
              },
              // {
              //   id: 'abcdefgh',
              //   type: "select",
              //   label: "Mua bảo hiểm theo tiêu chí",
              //   validations: ["required"],
              //   options: props.buyingCriteriaData?.map((it: any) => ({
              //     value: it?.value,
              //     label: it?.name,
              //   })),
              //   className: classes.areaFull,
              // },
              {
                id: fields.creditNo,
                type: "text",
                label: "Số hợp đồng cho vay",
                validations: [
                  "required",
                  (value: any, label: any) => {
                    const regExp = /^LN+([0-9]{13})$/gm;

                    if (value)
                      return regExp.test(value)
                        ? true
                        : `${label} sai định dạng LN+13 chữ số (VD: LN2676516726172)`;

                    return true;
                  },
                ],
                className: classes.areaFull,
              },
              {
                id: fields.creditStartDate,
                type: "date",
                label: "Ngày bắt đầu hợp đồng cho vay",
                validations: ["required", "date", "dateRanger"],
                // onChange: (e: any) => {
                //   props.useFormResult?.setValue(
                //     fields.insStartDate,
                //     dayjs(
                //       props.useFormResult?.getValues(fields.creditStartDate)
                //     ).diff(dayjs(), "days") < 0
                //       ? dayjs().toDate()
                //       : e?.target?.value
                //   );
                // },
              },
              {
                id: fields.creditEndDate,
                type: "date",
                label: "Ngày kết thúc hợp đồng cho vay",
                validations: ["required", "date", "dateRanger"],
                min: props.useFormResult?.getValues(fields.insStartDate),
                // onChange: (e: any) => {
                //   props.useFormResult?.setValue(
                //     fields.insEndDate,
                //     e?.target?.value
                //   );
                // },
              },
              {
                id: fields.creditAmount,
                type: "currency",
                label: "Số tiền giải ngân",
                validations: ["required"],
                className: classes.areaFull,
                // onBlur: (e: any) => {
                //   props.useFormResult?.setValue(
                //     fields.insAmount,
                //     e?.target?.value
                //   );
                //   props.checkPriceHandle();
                // },
              },
              {
                id: fields.insStartDate,
                type: "date",
                label: "Ngày bắt đầu hợp đồng",
                validations: ["required", "date", "dateRanger"],
                min:
                  dayjs(
                    props.useFormResult?.getValues(fields.creditStartDate)
                  ).diff(dayjs(), "days") < 0
                    ? dayjs()
                    : props.useFormResult?.getValues(fields.creditStartDate),
                max:
                  props.useFormResult?.getValues(fields.insEndDate) ||
                  props.useFormResult?.getValues(fields.creditEndDate),
                onBlur: (e: any) => {
                  props.checkPriceHandle();
                },
              },
              {
                id: fields.insEndDate,
                type: "date",
                label: "Ngày kết thúc hợp đồng",
                validations: ["required", "date", "dateRanger"],
                min:
                  props.useFormResult?.getValues(fields.insStartDate) ||
                  props.useFormResult?.getValues(fields.creditStartDate),
                max: dayjs(props.useFormResult?.getValues(fields.insStartDate))
                  .add(1, "years")
                  .subtract(1, "days"), //props.useFormResult?.getValues(fields.creditEndDate),
                onBlur: () => {
                  props.checkPriceHandle();
                },
              },
              {
                id: fields.insAmount,
                type: "currency",
                label: "Số tiền bảo hiểm",
                validations: ["required", "numberRanger"],
                max: props.useFormResult?.getValues(fields.creditAmount),
                className: classes.areaFull,
                onBlur: () => {
                  props.checkPriceHandle();
                },
              },
              {
                id: "rangerText",
                type: "custom",
                custom: (
                  <Typography
                    sx={{
                      color: theme.palette.secondary.main,
                      fontWeight: theme.typography.fontWeightBold,
                    }}
                  >
                    Thời hạn bảo hiểm: {rangerText}
                  </Typography>
                ),
              },
              {
                id: "fee1",
                type: "custom",
                className: classes.areaFull,
                custom: (
                  <Fee
                    fee={fee}
                    oldFee={0}
                    hideDiscount={true}
                    onSubmit={(data: any) => {}}
                    getCouponsService={() => {}}
                    resourceCode={""}
                    loading={props.checkPriceMutation?.isLoading}
                  />
                ),
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
                    custName={props.useFormResult?.getValues(fields.custName)}
                    custDob={props.useFormResult?.getValues(fields.custDob)}
                    custID={props.useFormResult?.getValues(fields.custID)}
                    custGender={props.useFormResult?.getValues(
                      fields.custGender
                    )}
                    custEmail={props.useFormResult?.getValues(fields.custEmail)}
                    custPhone={props.useFormResult?.getValues(fields.custPhone)}
                    custAddress={props.useFormResult?.getValues(
                      fields.custAddress
                    )}
                    buyingCriteria={props.useFormResult?.getValues(fields.buyingCriteria)}
                    creditNo={props.useFormResult?.getValues(fields.creditNo)}
                    creditStartDate={props.useFormResult?.getValues(
                      fields.creditStartDate
                    )}
                    creditEndDate={props.useFormResult?.getValues(
                      fields.creditEndDate
                    )}
                    insStartDate={props.useFormResult?.getValues(
                      fields.insStartDate
                    )}
                    insEndDate={props.useFormResult?.getValues(
                      fields.insEndDate
                    )}
                    insAmount={props.useFormResult?.getValues(fields.insAmount)}
                    creditAmount={props.useFormResult?.getValues(
                      fields.creditAmount
                    )}
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
              //         <CheckboxLabelRule regulationsAndTermAndConditionUrl="https://opes.com.vn/congbo/sanpham/crl" />
              //       ),
              //       showCheckIcon: true,
              //     },
              //   ],
              //   className: classes.areaFull,
              //   validations: ["required"],
              // },
              {
                id: "fee2",
                type: "custom",
                className: classes.areaFull,
                custom: (
                  <Fee
                    fee={fee}
                    oldFee={0}
                    hideDiscount={true}
                    onSubmit={(data: any) => {}}
                    getCouponsService={() => {}}
                    resourceCode=""
                  />
                ),
              },
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
                className: matchesDownSm ? classes.areaFull : null,
                hide:
                  !props.useFormResult?.getValues(fields.invoiceExport) ||
                  !props.useFormResult?.getValues(fields.invoiceIsCompany),
              },
              {
                id: fields.invoiceBuyerName,
                type: "text",
                label: "Họ và tên",
                validations: ["required"],
                className: matchesDownSm ? classes.areaFull : null,
                hide: !props.useFormResult?.getValues(fields.invoiceExport),
              },
              {
                id: fields.invoiceTaxCode,
                type: "text",
                label: "Mã số thuế",
                className: matchesDownSm ? classes.areaFull : null,
                validations: ["required", "taxCode"],
                hide:
                  !props.useFormResult?.getValues(fields.invoiceExport) ||
                  !props.useFormResult?.getValues(fields.invoiceIsCompany),
              },
              {
                id: fields.invoiceEmail,
                type: "text",
                label: "Email",
                className: matchesDownSm ? classes.areaFull : null,
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
      // {
      //   title: "Thanh toán",
      //   hideStepper: true,
      //   screens: [
      //     {
      //       btnNextLabel: "Thanh toán",
      //       inputsConfig: [
      //         {
      //           id: "paymentUserData",
      //           type: "custom",
      //           className: classes.areaFull,
      //           custom: (
      //             <div>
      //               <SummaryInfo
      //                 title={"Thông tin thanh toán"}
      //                 rowsData={[
      //                   {
      //                     label: "Họ và tên",
      //                     value: props.useFormResult?.getValues(
      //                       fields.custName
      //                     ),
      //                   },
      //                   {
      //                     label: "Số điện thoại",
      //                     value: props.useFormResult?.getValues(
      //                       fields.custPhone
      //                     ),
      //                   },
      //                   {
      //                     label: "Email",
      //                     value: props.useFormResult?.getValues(
      //                       fields.custEmail
      //                     ),
      //                   },
      //                 ]}
      //               />
      //               <br />
      //               <Divider />
      //             </div>
      //           ),
      //         },
      //         {
      //           id: "paymentFee",
      //           type: "custom",
      //           className: classes.areaFull,
      //           custom: (
      //             <div>
      //               <TotalFee
      //                 fee={fee}
      //                 oldFee={0}
      //                 title={"Tổng phí bảo hiểm"}
      //                 description={"(Đã bao gồm VAT)"}
      //               />
      //               <br />
      //               <Divider />
      //             </div>
      //           ),
      //         },
      //         {
      //           id: fields.paymentMethod,
      //           type: "radio",
      //           row: true,
      //           label: "Phương thức thanh toán",
      //           // hideLabel: true,
      //           validations: ["required"],
      //           className: classes.areaFull,
      //           classGroup: classes.classGroupPaymentMethod,
      //           options:
      //             props.getPaymentInfoQuery?.isInitialLoading ||
      //             !props.getPaymentInfoQuery?.data?.content?.paymentMethods
      //               ? paymentMethodLoadingOptions
      //               : props.getPaymentInfoQuery?.data?.content?.paymentMethods?.map(
      //                   (it: any) => ({
      //                     value: it?.method,
      //                     label: (
      //                       <RadioLabelPaymentMethodLong
      //                         label={
      //                           (paymentMethodMapping as any)?.[it?.method]
      //                             ?.label || it?.name
      //                         }
      //                         icon={
      //                           (paymentMethodMapping as any)?.[it?.method]
      //                             ?.icon
      //                         }
      //                       />
      //                     ),
      //                   })
      //                 ),
      //         },
      //       ],
      //     },
      //   ],
      // },
    ],
    [
      fee,
      rangerText,
      props.checkPriceMutation?.isLoading,
      props.getPaymentInfoQuery?.isInitialLoading,
      props.getPaymentInfoQuery?.data?.content?.paymentMethods,
      props.useFormResult?.watch(fields.creditStartDate),
      props.useFormResult?.watch(fields.creditAmount),
      props.useFormResult?.watch(fields.insAmount),
      props.useFormResult?.watch(fields.creditEndDate),
      props.useFormResult?.watch(fields.insStartDate),
      props.useFormResult?.watch(fields.insEndDate),
      props.useFormResult?.watch(fields.invoiceExport),
      props.useFormResult?.watch(fields.invoiceIsCompany),
      props.useFormResult?.watch(fields.currentStepIndex),
      props.useFormResult?.watch(fields.buyingCriteria),
    ]
  );
};

export default useSteps;
