import React, { useCallback, useMemo, useEffect } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { Divider, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/styles";
import dayjs from "dayjs";

import {
  invoiceIsCompanyOptions,
  paymentMethodLoadingOptions,
  typeFlowFdcOptions,
} from "helper/options";
import { CHECK_PRICE, ONEWAY, RETURN } from "helper/const";
import useStylesInputRadio from "components/inputs/InputRadio/useStylesInputRadio";
import RadioLabelRadius from "components/inputs/InputRadio/radioLabels/RadioLabelRadius";
import InputsFrame from "components/InputsFrame";
import LabelFrame from "components/LabelFrame";
import ListItemValue from "components/inputs/InputList/listLabels/ListItemValue";
import CheckboxLabelRule from "components/inputs/InputCheckbox/checkBoxLabels/CheckboxLabelRule";
import Fee from "components/Fee";
import ReadMore from "components/ReadMore";
import SummaryInfo from "components/SummaryInfo";

import fields from "../../help/fields";
import useStyles from "../useStyles";
import FeeFlight from "./FeeFlight";
import ConfirmInfo from "./ConfirmInfo";
import TotalFee from "components/TotalFee";
import RadioLabelPaymentMethod from "components/inputs/InputRadio/radioLabels/RadioLabelPaymentMethod";
import RadioLabelPaymentMethodLong from "components/inputs/InputRadio/radioLabels/RadioLabelPaymentMethodLong";
import { paymentMethodIconMapping, paymentMethodMapping } from "helper/mapping";
import { defaultValuesType, getCouponsType } from "components/sales/types";

type useStepsProps = {
  useFormResult: UseFormReturn<FieldValues, any>;
  // init data
  coveragesData: any;
  configData: any;
  // data
  flightsDepData: any;
  flightsDepDataLoading: boolean;
  flightsReturnData: any;
  flightsReturnDataLoading: boolean;
  priceDepData: any;
  priceReturnData: any;
  resourceCode: string;
  // props
  defaultValues?: defaultValuesType;
  blocked?: boolean;
  // query
  getPaymentInfoQuery: any;
  checkPriceHandle: any;
  getCouponsService: getCouponsType;
};

const useSteps = (props: useStepsProps) => {
  const classes = useStyles();
  const classesInputRadio = useStylesInputRadio();
  const theme = useTheme();
  const matchesDownSm = useMediaQuery(theme.breakpoints.down("sm"));

  const getInitValues = useCallback(() => {
    const _typeFlow = ONEWAY;
    const _depDate = dayjs()
      .add(props.configData?.startFilterDate, "days")
      .toDate();
    const _packageCode = props.coveragesData?.[0]?.coverageCode;
    const _buyerFullName = props.defaultValues?.buyerName;
    const _insureds = [{ fixed: true, insuredName: _buyerFullName }];

    return {
      [fields.typeFlow]: _typeFlow,
      [fields.depDate]: _depDate,
      [fields.packageCode]: _packageCode,
      [fields.insureds]: _insureds,
      [fields.buyerFullName]: _buyerFullName,
      [fields.buyerPhoneNumber]: props.defaultValues?.buyerPhone,
      [fields.buyerEmail]: props.defaultValues?.buyerEmail,
      [fields.buyerIdNumber]: props.defaultValues?.buyerIdNo,
      [fields.buyerBirthday]: props.defaultValues?.buyerBirthday,
      [fields.invoiceIsCompany]: invoiceIsCompanyOptions[0].value,
    };
  }, [
    props.configData?.startFilterDate,
    props.coveragesData,
    props.defaultValues,
  ]);

  const getDefaultValues = useCallback(() => {
    const _initValues = getInitValues();

    return {
      [fields.typeFlow]: _initValues?.[fields.typeFlow],
      [fields.depDate]: _initValues?.[fields.depDate],
      [fields.packageCode]: _initValues?.[fields.packageCode],
      [fields.insureds]: _initValues?.[fields.insureds],
      [fields.buyerFullName]: _initValues?.[fields.buyerFullName],
      [fields.buyerPhoneNumber]: _initValues?.[fields.buyerPhoneNumber],
      [fields.buyerEmail]: _initValues?.[fields.buyerEmail],
      [fields.buyerIdNumber]: _initValues?.[fields.buyerIdNumber],
      [fields.buyerBirthday]: _initValues?.[fields.buyerBirthday],
      [fields.invoiceIsCompany]: _initValues?.[fields.invoiceIsCompany],
    };
  }, [getInitValues]);

  useEffect(() => {
    props.useFormResult.reset(getDefaultValues());
  }, [getDefaultValues]);

  return useMemo(
    () => [
      {
        screens: [
          {
            inputsConfig: [
              {
                id: fields.typeFlow,
                type: "radio",
                row: true,
                classGroup: classesInputRadio.classRadioGroupRadius,
                classItem: classesInputRadio.classRadioRadius,
                className: matchesDownSm
                  ? classes.areaFull
                  : classes.areaCenter,
                options: typeFlowFdcOptions?.map((it: any) => ({
                  ...it,
                  label: <RadioLabelRadius label={it?.label} />,
                })),
                onChange: (e: any) => {
                  const _value = e?.target?.value;

                  if (_value === ONEWAY) {
                    props.useFormResult?.setValue(fields.returnDate, undefined);
                  } else if (_value === RETURN) {
                    props.useFormResult?.setValue(
                      fields.returnDate,
                      props.useFormResult?.getValues(fields.depDate)
                    );
                  }
                },
              },
              {
                id: "inputsFrameFlight",
                type: "custom",
                className: classes.areaFull,
                custom: (
                  <InputsFrame
                    inputsConfig={[
                      {
                        id: "inputsFrameFlightLeft",
                        type: "custom",
                        className:
                          props.useFormResult?.getValues(fields.typeFlow) ===
                          ONEWAY
                            ? classes.inputsFrameFlightAreaFull
                            : classes.inputsFrameFlightAreaHalfLeft,
                        custom: (
                          <InputsFrame
                            inputsConfig={[
                              {
                                id: "flightup",
                                type: "custom",
                                className:
                                  classes.inputsFrameFlightLeftAreaFull,
                                custom: (
                                  <div style={{ textAlign: "center" }}>
                                    <img
                                      className={classes.flightIcon}
                                      src="https://n-file.opes.com.vn/of/d/opp/pub/mails/marcom/miniweb/flightup.png"
                                      alt="flightup"
                                    />
                                  </div>
                                ),
                              },
                              {
                                id: fields.depDate,
                                type: "date",
                                label: "Ngày đi",
                                className:
                                  classes.inputsFrameFlightLeftAreaFull,
                                validations: ["required", "date", "dateRanger"],
                                min: dayjs().add(
                                  props.configData?.startFilterDate,
                                  "days"
                                ),
                                max: dayjs().add(
                                  props.configData?.limitFilterDate,
                                  "days"
                                ),
                                onChange: (e: any) => {
                                  const _value = e?.target?.value;

                                  if (
                                    !!_value &&
                                    dayjs(_value)
                                      .startOf("days")
                                      .diff(
                                        dayjs(
                                          props.useFormResult?.getValues(
                                            fields.returnDate
                                          )
                                        ).startOf("days"),
                                        "days"
                                      ) > 0
                                  ) {
                                    props.useFormResult?.setValue(
                                      fields.returnDate,
                                      _value
                                    );
                                  }
                                },
                              },
                              {
                                id: fields.depFlightNo,
                                type: "autocomplete",
                                label: "Chuyến bay",
                                className:
                                  props.useFormResult?.getValues(
                                    fields.typeFlow
                                  ) === RETURN
                                    ? classes.inputsFrameFlightLeftAreaFull
                                    : undefined,
                                validations: ["required"],
                                loading: props.flightsDepDataLoading,
                                options:
                                  props.flightsDepData?.map((it: any) => ({
                                    value: it?.icao,
                                    label: it?.iata,
                                  })) || [],
                              },
                              {
                                id: fields.pnr,
                                type: "text",
                                label: "Mã đặt chỗ",
                                validations: ["required", "lengthRanger"],
                                min: 6,
                                max: 6,
                                hide:
                                  props.useFormResult?.getValues(
                                    fields.typeFlow
                                  ) === RETURN,
                              },
                            ]}
                            control={props.useFormResult?.control}
                            className={classes.classFrameFlightLeft}
                            classInputsWrapper={
                              classes.classInputsFrameFlightLeft
                            }
                          />
                        ),
                      },
                      {
                        id: "inputsFrameFlightLeft",
                        type: "custom",
                        className: classes.inputsFrameFlightAreaHalfRight,
                        custom: (
                          <InputsFrame
                            inputsConfig={[
                              {
                                id: "flightdown",
                                type: "custom",
                                custom: (
                                  <div style={{ textAlign: "center" }}>
                                    <img
                                      className={classes.flightIcon}
                                      src="https://n-file.opes.com.vn/of/d/opp/pub/mails/marcom/miniweb/flightdown.png"
                                      alt="flightup"
                                    />
                                  </div>
                                ),
                                hide:
                                  props.useFormResult?.getValues(
                                    fields.typeFlow
                                  ) === ONEWAY,
                              },
                              {
                                id: fields.returnDate,
                                type: "date",
                                label: "Ngày về",
                                validations: ["required", "date", "dateRanger"],
                                min: (values: any) =>
                                  values?.[fields.depDate]
                                    ? values?.[fields.depDate]
                                    : dayjs().add(
                                        props.configData?.startFilterDate,
                                        "days"
                                      ),
                                max: (values: any) =>
                                  values?.[fields.depDate]
                                    ? dayjs(values?.[fields.depDate]).add(
                                        props.configData?.limitFilterDate,
                                        "days"
                                      )
                                    : dayjs().add(
                                        props.configData?.limitFilterDate,
                                        "days"
                                      ),
                                hide:
                                  props.useFormResult?.getValues(
                                    fields.typeFlow
                                  ) === ONEWAY,
                              },
                              {
                                id: fields.returnFlightNo,
                                type: "autocomplete",
                                label: "Chuyến bay",
                                validations: ["required"],
                                hide:
                                  props.useFormResult?.getValues(
                                    fields.typeFlow
                                  ) === ONEWAY,
                                loading: props.flightsReturnDataLoading,
                                options:
                                  props.flightsReturnData?.map((it: any) => ({
                                    value: it?.icao,
                                    label: it?.iata,
                                  })) || [],
                              },
                            ]}
                            control={props.useFormResult?.control}
                            className={classes.classFrameFlightRight}
                            classInputsWrapper={
                              classes.classInputsFrameFlightRight
                            }
                          />
                        ),
                      },
                      {
                        id: fields.pnr,
                        type: "text",
                        label: "Mã đặt chỗ",
                        className: classes.inputsFrameFlightAreaFull,
                        validations: ["required", "lengthRanger"],
                        min: 6,
                        max: 6,
                        hide:
                          props.useFormResult?.getValues(fields.typeFlow) ===
                          ONEWAY,
                      },
                      {
                        id: "labelPkgCide",
                        type: "custom",
                        className: matchesDownSm
                          ? classes.inputsFrameFlightAreaFull
                          : classes.inputsFrameFlightAreaCenter,
                        custom: <LabelFrame content="CHƯƠNG TRÌNH BẢO HIỂM" />,
                      },
                      {
                        id: fields.packageCode,
                        type: "radio",
                        row: true,
                        classGroup: classesInputRadio.classRadioGroupRadius,
                        classItem: classesInputRadio.classRadioRadius,
                        className: matchesDownSm
                          ? classes.inputsFrameFlightAreaFull
                          : classes.inputsFrameFlightAreaCenter,
                        options: props.coveragesData?.map((it: any) => ({
                          value: it?.coverageCode,
                          label: <RadioLabelRadius label={it?.name} />,
                        })),
                      },
                      {
                        id: "fee",
                        type: "custom",
                        className: matchesDownSm
                          ? classes.inputsFrameFlightAreaFull
                          : classes.inputsFrameFlightAreaCenter,
                        custom: (
                          <FeeFlight
                            depAmount={props.priceDepData?.insurance}
                            depFee={props.priceDepData?.fee}
                            returnAmount={props.priceReturnData?.insurance}
                            returnFee={props.priceReturnData?.fee}
                            showReturn={
                              props.useFormResult?.getValues(
                                fields.typeFlow
                              ) === RETURN
                            }
                          />
                        ),
                      },
                    ]}
                    control={props.useFormResult?.control}
                    classInputsWrapper={classes.classInputsFrameFlight}
                  />
                ),
              },
            ],
          },
        ],
      },
      {
        screens: [
          {
            inputsConfig: [
              {
                id: "inputsFrameBuyer",
                type: "custom",
                className: matchesDownSm ? classes.areaFull : classes.areaHalf,
                custom: (
                  <InputsFrame
                    label="THÔNG TIN NGƯỜI MUA BẢO HIỂM"
                    inputsConfig={[
                      {
                        id: fields.buyerFullName,
                        label: "Họ tên",
                        type: "text",
                        validations: ["required"],
                        disabled:
                          !!props.blocked && props.defaultValues?.buyerName,
                        onChange: (e: any) => {
                          const _value = e?.target?.value;

                          props.useFormResult?.setValue(fields.insureds, [
                            ...props.useFormResult
                              ?.getValues(fields.insureds)
                              ?.map((it: any) =>
                                it?.fixed
                                  ? { ...it, [fields.insuredName]: _value }
                                  : it
                              ),
                          ]);
                        },
                      },
                      {
                        id: fields.buyerPhoneNumber,
                        label: "Số điện thoại",
                        type: "text",
                        validations: ["required", "phone"],
                        disabled:
                          !!props.blocked && props.defaultValues?.buyerPhone,
                      },
                      {
                        id: fields.buyerIdNumber,
                        label: "Số CCCD/CMND",
                        type: "text",
                        validations: ["required", "idNo"],
                        disabled:
                          !!props.blocked && props.defaultValues?.buyerIdNo,
                      },
                      {
                        id: fields.buyerBirthday,
                        label: "Ngày sinh",
                        type: "date",
                        validations: ["required", "date", "dateRanger"],
                        openTo: "year",
                        disabled:
                          !!props.blocked && props.defaultValues?.buyerBirthday,
                        min: dayjs()
                          .startOf("days")
                          .subtract(100, "years")
                          .toDate(),
                        max: dayjs()
                          .startOf("days")
                          .subtract(18, "years")
                          .toDate(),
                      },
                      {
                        id: fields.buyerEmail,
                        label: "Email",
                        type: "text",
                        validations: ["required", "email"],
                      },
                    ]}
                    control={props.useFormResult?.control}
                    classInputsWrapper={classes.classInputsFrameBuyer}
                  />
                ),
              },
              {
                id: "inputsFrameInsureds",
                type: "custom",
                className: matchesDownSm ? classes.areaFull : classes.areaHalf,
                custom: (
                  <InputsFrame
                    label="THÔNG TIN NGƯỜI ĐƯỢC BẢO HIỂM"
                    inputsConfig={[
                      {
                        id: fields.insureds,
                        type: "list",
                        label: "Người được bảo hiểm",
                        hideLabel: true,
                        validations: ["required"],
                        custom: <ListItemValue />,
                        inputsConfig: [
                          {
                            id: fields.insuredName,
                            type: "text",
                            label: "Họ tên",
                            validations: ["required"],
                            fontWeight: "bold",
                          },
                        ],
                      },
                    ]}
                    control={props.useFormResult?.control}
                    classInputsWrapper={classes.classInputsFrameInsureds}
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
                    buyerFullName={props.useFormResult?.getValues(
                      fields.buyerFullName
                    )}
                    buyerPhoneNumber={props.useFormResult?.getValues(
                      fields.buyerPhoneNumber
                    )}
                    buyerEmail={props.useFormResult?.getValues(
                      fields.buyerEmail
                    )}
                    insureds={props.useFormResult?.getValues(fields.insureds)}
                    depDate={props.priceDepData?.flight?.depTime}
                    depFlightNo={
                      props.flightsDepData?.find(
                        (it: any) =>
                          it?.icao ===
                          props.useFormResult?.getValues(fields.depFlightNo)
                      )?.iata
                    }
                    pnr={props.useFormResult?.getValues(fields.pnr)}
                    programInsurance={
                      props.coveragesData?.find(
                        (it: any) =>
                          it?.coverageCode ===
                          props.useFormResult?.getValues(fields.packageCode)
                      )?.name
                    }
                    depFee={props.priceDepData?.fee}
                    returnDate={props.priceReturnData?.flight?.depTime}
                    returnFlightNo={
                      props.flightsReturnData?.find(
                        (it: any) =>
                          it?.icao ===
                          props.useFormResult?.getValues(fields.returnFlightNo)
                      )?.iata
                    }
                    returnFee={props.priceReturnData?.fee}
                  />
                ),
              },
              {
                id: fields.confirmed,
                type: "checkbox",
                label: "Cam kết",
                hideLabel: true,
                options: [
                  {
                    value: true,
                    label: (
                      <CheckboxLabelRule
                        regulationsUrl={props.configData?.regulationsUrl}
                        termAndConditionUrl={
                          props.configData?.termAndConditionUrl
                        }
                      />
                    ),
                    showCheckIcon: true,
                  },
                ],
                className: classes.areaFull,
                validations: ["required"],
              },
              {
                id: "readMore",
                type: "custom",
                className: classes.areaFull,
                custom: (
                  <div style={{ paddingLeft: 38 }}>
                    <ReadMore
                      description="Tôi và tất cả những Người được bảo hiểm của Hợp đồng bảo hiểm này đồng ý uỷ quyền cho 01 trong những Người được bảo hiểm là Người thụ hưởng - người thay mặt tất cả chúng tôi"
                      detail={
                        <ul>
                          <li>
                            Tôi và tất cả những Người được bảo hiểm của Hợp đồng
                            bảo hiểm này đồng ý uỷ quyền cho 01 trong những
                            Người được bảo hiểm là Người thụ hưởng - người thay
                            mặt tất cả chúng tôi để nhận quyền lợi bảo hiểm của
                            chúng tôi theo Hợp đồng bảo hiểm khi phát sinh sự
                            kiện bảo hiểm
                          </li>
                          <li>
                            Việc chỉ định Người thụ hưởng này sẽ được thực hiện
                            khi có yêu cầu giải quyết quyền lợi bảo hiểm.
                          </li>
                          <li>
                            Chúng tôi cam kết không có bất kì khiếu nại/ khiếu
                            kiện nào liên quan đến việc giải quyết quyền lợi bảo
                            hiểm của OPES cho Người thụ hưởng được chỉ định nêu
                            trên.
                          </li>
                        </ul>
                      }
                    />
                  </div>
                ),
              },
              {
                id: fields.fee,
                type: "custom",
                className: classes.areaFull,
                custom: (
                  <Fee
                    fee={props.useFormResult?.getValues(fields.fee)}
                    oldFee={props.useFormResult?.getValues(fields.oldFee)}
                    discountCode={
                      props.useFormResult?.getValues(fields.discountCode) ===
                      "NONE"
                        ? ""
                        : props.useFormResult?.getValues(fields.discountCode)
                    }
                    onSubmit={(data: any) => {
                      if (!data?.discountCode) {
                        props.useFormResult?.setValue(
                          fields.discountCode,
                          "NONE"
                        );
                        props.checkPriceHandle(CHECK_PRICE, {
                          target: {
                            name: fields.discountCode,
                            value: data?.discountCode,
                          },
                        });
                      }
                      props.useFormResult?.setValue(
                        fields.discountCodeSubmit,
                        data?.discountCode
                      );
                    }}
                    getCouponsService={props.getCouponsService}
                    resourceCode={props.resourceCode}
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
                            fields.buyerFullName
                          ),
                        },
                        {
                          label: "Số điện thoại",
                          value: props.useFormResult?.getValues(
                            fields.buyerPhoneNumber
                          ),
                        },
                        {
                          label: "Email",
                          value: props.useFormResult?.getValues(
                            fields.buyerEmail
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
                      fee={props.useFormResult?.getValues(fields.fee)}
                      oldFee={props.useFormResult?.getValues(fields.oldFee)}
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
      // init data
      props.coveragesData,
      props.configData?.startFilterDate,
      props.configData?.limitFilterDate,
      props.configData?.regulationsUrl,
      props.configData?.termAndConditionUrl,
      props.flightsDepData,
      props.flightsDepDataLoading,
      props.flightsReturnData,
      props.flightsReturnDataLoading,
      props.priceDepData?.flight?.depTime,
      props.priceDepData?.insurance,
      props.priceDepData?.fee,
      props.priceReturnData?.flight?.depTime,
      props.priceReturnData?.insurance,
      props.priceReturnData?.fee,
      // values
      props.useFormResult?.watch(fields.typeFlow),
      // props.useFormResult?.watch(fields.depDate),
      // props.useFormResult?.watch(fields.returnDate),
      // props.useFormResult?.watch(fields.insureds),
      props.useFormResult?.watch(fields.invoiceExport),
      props.useFormResult?.watch(fields.invoiceIsCompany),
      props.useFormResult?.watch(fields.countClickStep),
      props.useFormResult?.watch(fields.fee),
      props.useFormResult?.watch(fields.oldFee),
      props.useFormResult?.watch(fields.discountCode),
      // default values
      props.defaultValues?.buyerName,
      props.defaultValues?.buyerPhone,
      props.defaultValues?.buyerIdNo,
      props.defaultValues?.buyerBirthday,
      // query
      props.getPaymentInfoQuery?.isInitialLoading,
      props.getPaymentInfoQuery?.data?.content?.paymentMethods,
    ]
  );
};

export default useSteps;
