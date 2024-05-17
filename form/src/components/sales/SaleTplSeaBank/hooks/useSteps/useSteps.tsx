import React, { useCallback, useEffect, useMemo } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { useMediaQuery, Typography, Divider } from "@mui/material";
import { useTheme } from "@mui/styles";
import dayjs from "dayjs";

import {
  invoiceIsCompanyOptions,
  paymentMethodLoadingOptions,
  typeFlowTplOptions,
  vehicleRegisterOptions,
} from "helper/options";
import {
  BIKEO50,
  CAR,
  CHECK_PRICE,
  MOTO,
  MOTO_ZUTTO,
  SEAT_COUNTS,
  VEHICLE_WEIGHT,
} from "helper/const";
import convertDateToString from "helper/converts/convertDateToString";

import useStylesInputRadio from "components/inputs/InputRadio/useStylesInputRadio";
import RadioLabelRadius from "components/inputs/InputRadio/radioLabels/RadioLabelRadius";
import InputsFrame from "components/InputsFrame";
import DialogInfo from "components/DialogInfo";
import Fee from "components/Fee";
import CheckboxLabelRule from "components/inputs/InputCheckbox/checkBoxLabels/CheckboxLabelRule";
import SummaryInfo from "components/SummaryInfo";
import RadioLabelPaymentMethod from "components/inputs/InputRadio/radioLabels/RadioLabelPaymentMethod";
import RadioLabelPaymentMethodLong from "components/inputs/InputRadio/radioLabels/RadioLabelPaymentMethodLong";
import { paymentMethodIconMapping, paymentMethodMapping } from "helper/mapping";

import fields from "../../help/fields";
import useStyles from "../useStyles";
import ConfirmInfo from "./ConfirmInfo";
import TotalFee from "components/TotalFee";
import { defaultValuesType, getCouponsType } from "components/sales/types";
import LabelFrame from "components/LabelFrame";
import Ocr from "./Ocr";

type useStepsProps = {
  useFormResult: UseFormReturn<FieldValues, any>;
  // init data
  provincesData: any;
  orderConfigData: any;
  vehicleUsingData: any;
  getVehicleTypeByTypeFlowAndVehicleUsingData: any;
  vehicleTypeByTypeFlowAndVehicleUsingData: any;
  vehicleSeatCountsData: any;
  vehicleWeightData: any;
  getDurationByTypeFlowData: any;
  durationByTypeFlowData: any;
  resourceCode: string;
  // props
  typeFlow: "moto" | "car" | "moto-zutto";
  defaultValues?: defaultValuesType;
  blocked?: boolean;
  // mutation
  checkPriceMutation: any;
  // query
  checkCouponQuery: any;
  getPaymentInfoQuery: any;
  checkPriceHandle: any;
  getCouponsService: getCouponsType;
  hideConfirm?: boolean;
  ocrService: any;
  onChangeTypeFlow?: any;
};

const useSteps = (props: useStepsProps) => {
  const classesInputRadio = useStylesInputRadio();
  const theme = useTheme();
  const classes = useStyles();
  const matchesDownSm = useMediaQuery(theme.breakpoints.down("sm"));

  const getInitValues = useCallback(() => {
    const _typeFlow = props.typeFlow;
    const _vehicleUsing = props.vehicleUsingData?.find(
      (it: any) => it?.selected
    )?.value;
    // vehicleType
    const _vehicleTypeByTypeFlowAndVehicleUsingData =
      props.getVehicleTypeByTypeFlowAndVehicleUsingData(
        _typeFlow,
        _vehicleUsing
      );
    const _vehicleTypeSelected =
      _vehicleTypeByTypeFlowAndVehicleUsingData?.find(
        (it: any) => it?.selected
      );
    const _vehicleType = _vehicleTypeSelected?.value;
    // refSpecs
    let _refSpecs;
    // vehicleSeatCount
    let _vehicleSeatCount;
    // vehicleWeight
    let _vehicleWeight;
    if (_typeFlow === CAR) {
      _refSpecs = _vehicleTypeSelected?.refSpecs;
      _vehicleSeatCount = props.vehicleSeatCountsData?.find(
        (it: any) => it?.selected
      )?.value;
      _vehicleWeight = props.vehicleWeightData?.find(
        (it: any) => it?.selected
      )?.value;
    }
    // durations
    const _durations = props
      .getDurationByTypeFlowData(_typeFlow)
      ?.find((it: any) => it?.selected)?.value;
    // effectiveDate
    const _effectiveDate = dayjs().toDate();
    // expireDate
    const _expireDate = dayjs(_effectiveDate)
      .add(_durations, "months")
      .toDate();

    return {
      [fields.typeFlow]: _typeFlow,
      [fields.vehicleUsing]: _vehicleUsing,
      [fields.vehicleType]: _vehicleType,
      [fields.refSpecs]: _refSpecs,
      [fields.vehicleSeatCount]: _vehicleSeatCount,
      [fields.vehicleWeight]: _vehicleWeight,
      [fields.vehicleRegister]: true,
      [fields.durations]: _durations,
      [fields.effectiveDate]: _effectiveDate,
      [fields.expireDate]: _expireDate,
      [fields.ownerName]: props.defaultValues?.ownerFullName,
      [fields.ownerPhone]: props.defaultValues?.ownerPhoneNumber,
      [fields.ownerEmail]: props.defaultValues?.ownerEmail,
      [fields.pkgCode]: props.typeFlow === MOTO_ZUTTO ? "PKG_TPL_ZUTTO" : null,
      [fields.invoiceIsCompany]: invoiceIsCompanyOptions[0].value,
    };
  }, [
    props.typeFlow,
    props.vehicleUsingData,
    props.getVehicleTypeByTypeFlowAndVehicleUsingData,
    props.vehicleSeatCountsData,
    props.vehicleWeightData,
    props.getDurationByTypeFlowData,
    props.defaultValues,
  ]);

  const getDefaultValues = useCallback(() => {
    const _initValues = getInitValues();

    return {
      [fields.typeFlow]: _initValues?.[fields.typeFlow],
      [fields.vehicleUsing]: _initValues?.[fields.vehicleUsing],
      [fields.vehicleType]: _initValues?.[fields.vehicleType],
      [fields.refSpecs]: _initValues?.[fields.refSpecs],
      [fields.vehicleSeatCount]: _initValues?.[fields.vehicleSeatCount],
      [fields.vehicleWeight]: _initValues?.[fields.vehicleWeight],
      [fields.vehicleRegister]: _initValues?.[fields.vehicleRegister],
      [fields.durations]: _initValues?.[fields.durations],
      [fields.effectiveDate]: _initValues?.[fields.effectiveDate],
      [fields.expireDate]: _initValues?.[fields.expireDate],
      [fields.ownerName]: _initValues?.[fields.ownerName],
      [fields.ownerPhone]: _initValues?.[fields.ownerPhone],
      [fields.ownerEmail]: _initValues?.[fields.ownerEmail],
      [fields.pkgCode]: _initValues?.[fields.pkgCode],
      [fields.invoiceIsCompany]: _initValues?.[fields.invoiceIsCompany],
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
                id: fields.typeFlow,
                type: "radio",
                row: true,
                hide: true,
                classGroup: classesInputRadio.classRadioGroupRadius,
                classItem: classesInputRadio.classRadioRadius,
                className: matchesDownSm
                  ? classes.areaFull
                  : classes.areaCenter,
                options: typeFlowTplOptions?.map((it: any) => ({
                  ...it,
                  label: <RadioLabelRadius label={it?.label} />,
                })),
                onChange: (e: any) => {
                  const _value = e?.target?.value;

                  if (props.onChangeTypeFlow) {
                    props.onChangeTypeFlow(_value);
                  }

                  // vehicleUsing
                  let _vehicleUsing;
                  if (_value === CAR) {
                    _vehicleUsing = props.vehicleUsingData?.find(
                      (it: any) => it?.selected
                    )?.value;
                  } else {
                    _vehicleUsing = undefined;
                  }

                  props.useFormResult?.setValue(
                    fields.vehicleUsing,
                    _vehicleUsing
                  );

                  // vehicleType
                  const _vehicleTypeSelected = props
                    .getVehicleTypeByTypeFlowAndVehicleUsingData(
                      _value,
                      _vehicleUsing
                    )
                    ?.find((it: any) => it?.selected);
                  const _vehicleType = _vehicleTypeSelected?.value;

                  props.useFormResult?.setValue(
                    fields.vehicleType,
                    _vehicleType
                  );

                  // refSpecs
                  let _refSpecs;
                  // vehicleSeatCount
                  let _vehicleSeatCount;
                  // vehicleWeight
                  let _vehicleWeight;

                  if (_value === CAR) {
                    _refSpecs = _vehicleTypeSelected?.refSpecs;
                    _vehicleSeatCount = props.vehicleSeatCountsData?.find(
                      (it: any) => it?.selected
                    )?.value;
                    _vehicleWeight = props.vehicleWeightData?.find(
                      (it: any) => it?.selected
                    );

                    // pkgCode
                    props.useFormResult?.setValue(fields.pkgCode, "");
                  } else {
                    _refSpecs = undefined;
                    _vehicleSeatCount = undefined;
                    _vehicleWeight = undefined;
                  }

                  props.useFormResult?.setValue(fields.refSpecs, _refSpecs);

                  props.useFormResult?.setValue(
                    fields.vehicleSeatCount,
                    _vehicleSeatCount
                  );

                  props.useFormResult?.setValue(
                    fields.vehicleWeight,
                    _vehicleWeight
                  );

                  // durations
                  const _durations = props
                    .getDurationByTypeFlowData(_value)
                    ?.find((it: any) => it?.selected)?.value;
                  props.useFormResult?.setValue(fields.durations, _durations);
                  // expireDate
                  props.useFormResult?.setValue(
                    fields.expireDate,
                    dayjs(props.useFormResult?.getValues(fields.effectiveDate))
                      .add(_durations, "months")
                      .toDate()
                  );
                },
              },
              {
                id: "ocr",
                type: "custom",
                className: matchesDownSm
                  ? classes.areaFull
                  : classes.areaCenter,
                custom: <Ocr ocrService={props.ocrService} />,
                onChange: (e: any) => {
                  props.useFormResult?.setValue(
                    fields.ownerName,
                    e?.target?.value?.content?.ownerName
                  );
                  props.useFormResult?.setValue(
                    fields.vehiclePlateNo,
                    e?.target?.value?.content?.idNoPlate
                  );
                  props.useFormResult?.setValue(
                    fields.vehicleChassisNo,
                    e?.target?.value?.content?.chassisNo
                  );
                  props.useFormResult?.setValue(
                    fields.vehicleEngineNo,
                    e?.target?.value?.content?.engineNo
                  );
                },
              },
              {
                id: "labelFrameOwner",
                type: "custom",
                className: matchesDownSm
                  ? classes.areaFull
                  : classes.areaHalfLeft,
                custom: <LabelFrame content="THÔNG TIN XE" />,
                hide: props.useFormResult?.getValues(fields.typeFlow) === CAR,
              },
              {
                id: fields.vehicleUsing,
                type: "switch",
                switchLabel: props.vehicleUsingData?.[0]?.name,
                checkedValue: props.vehicleUsingData?.[0]?.value,
                unCheckedValue: props.vehicleUsingData?.[1]?.value,
                hide: [MOTO, MOTO_ZUTTO].includes(
                  props.useFormResult?.getValues(fields.typeFlow)
                ),
                className: matchesDownSm
                  ? classes.areaFull
                  : classes.areaHalfLeft,
                onChange: (e: any) => {
                  const _value = e?.target?.value;
                  // vehicleType
                  const _vehicleTypeSelected = props
                    .getVehicleTypeByTypeFlowAndVehicleUsingData(
                      props.useFormResult?.getValues(fields.typeFlow),
                      _value
                    )
                    ?.find((it: any) => it?.selected);
                  const _vehicleType = _vehicleTypeSelected?.value;

                  props.useFormResult?.setValue(
                    fields.vehicleType,
                    _vehicleType
                  );
                  // refSpecs
                  props.useFormResult?.setValue(
                    fields.refSpecs,
                    _vehicleTypeSelected?.refSpecs
                  );
                  // vehicleSeatCount
                  props.useFormResult?.setValue(
                    fields.vehicleSeatCount,
                    props.vehicleSeatCountsData?.find((it: any) => it?.selected)
                      ?.value
                  );
                  // vehicleWeight
                  props.useFormResult?.setValue(
                    fields.vehicleWeight,
                    props.vehicleWeightData?.find((it: any) => it?.selected)
                      ?.value
                  );
                },
              },
              {
                id: "inputsFrameVehicleInfo",
                type: "custom",
                className: matchesDownSm
                  ? classes.areaFull
                  : classes.areaHalfLeft,
                custom: (
                  <InputsFrame
                    inputsConfig={[
                      {
                        id: fields.vehicleType,
                        type: "select",
                        label: "Loại xe",
                        options:
                          props.vehicleTypeByTypeFlowAndVehicleUsingData?.map(
                            (it: any) => ({
                              value: it?.value,
                              label: it?.name,
                            })
                          ),
                        validations: ["required"],
                        disabled: props.typeFlow === MOTO_ZUTTO,
                        onChange: (e: any) => {
                          const _value = e?.target?.value;

                          // refSpecs
                          const _refSpecs =
                            props.vehicleTypeByTypeFlowAndVehicleUsingData?.find(
                              (it: any) => it?.value === _value
                            )?.refSpecs;
                          props.useFormResult?.setValue(
                            fields.refSpecs,
                            _refSpecs
                          );

                          if (_refSpecs?.includes(SEAT_COUNTS)) {
                            // vehicleSeatCount
                            props.useFormResult?.setValue(
                              fields.vehicleSeatCount,
                              props.vehicleSeatCountsData?.find(
                                (it: any) => it?.selected
                              )?.value
                            );
                            props.useFormResult?.setValue(
                              fields.vehicleWeight,
                              undefined
                            );
                          }

                          if (_refSpecs?.includes(VEHICLE_WEIGHT)) {
                            // vehicleWeight
                            props.useFormResult?.setValue(
                              fields.vehicleWeight,
                              props.vehicleWeightData?.find(
                                (it: any) => it?.selected
                              )?.value
                            );
                            props.useFormResult?.setValue(
                              fields.vehicleSeatCount,
                              undefined
                            );
                          }

                          if (_value !== BIKEO50) {
                            props.useFormResult?.setValue(fields.pkgCode, "");
                          }
                        },
                      },
                      {
                        id: fields.vehicleSeatCount,
                        type: "select",
                        label: "Số chỗ ngồi",
                        validations: ["required"],
                        hide:
                          !!props.useFormResult
                            ?.getValues(fields.refSpecs)
                            ?.find((v: any) => v === VEHICLE_WEIGHT) ||
                          !props.useFormResult
                            ?.getValues(fields.refSpecs)
                            ?.find((v: any) => v === SEAT_COUNTS) ||
                          props.useFormResult?.getValues(fields.typeFlow) ===
                            MOTO,
                        options: props.vehicleSeatCountsData?.map(
                          (it: any) => ({
                            value: it?.value,
                            label: it?.name,
                          })
                        ),
                      },
                      {
                        id: fields.vehicleWeight,
                        type: "select",
                        label: "Tải trọng",
                        validations: ["required"],
                        hide:
                          !!props.useFormResult
                            ?.getValues(fields.refSpecs)
                            ?.find((v: any) => v === SEAT_COUNTS) ||
                          !props.useFormResult
                            ?.getValues(fields.refSpecs)
                            ?.find((v: any) => v === VEHICLE_WEIGHT) ||
                          props.useFormResult?.getValues(fields.typeFlow) ===
                            MOTO,
                        options: props.vehicleWeightData?.map((it: any) => ({
                          value: it?.value,
                          label: it?.name,
                        })),
                      },
                    ]}
                    control={props.useFormResult?.control}
                    classInputsWrapper={classes.classInputsFrameVehicle}
                  />
                ),
              },
              {
                id: "inputsFrameVehicleId",
                type: "custom",
                className: matchesDownSm
                  ? classes.areaFull
                  : classes.areaHalfLeft,
                custom: (
                  <InputsFrame
                    inputsConfig={[
                      {
                        id: fields.vehicleRegister,
                        type: "radio",
                        row: true,
                        classGroup: classesInputRadio.classRadioGroupRadius,
                        classItem: classesInputRadio.classRadioRadius,
                        options: vehicleRegisterOptions?.map((it: any) => ({
                          ...it,
                          label: <RadioLabelRadius label={it?.label} />,
                        })),
                        onChange: (e: any) => {
                          const _value = e?.target?.value;

                          if (!_value) {
                            props.useFormResult?.setValue(
                              fields.vehiclePlateNo,
                              undefined
                            );
                          } else {
                            props.useFormResult?.setValue(
                              fields.vehicleChassisNo,
                              undefined
                            );
                            props.useFormResult?.setValue(
                              fields.vehicleEngineNo,
                              undefined
                            );
                          }
                        },
                      },
                      {
                        id: fields.vehiclePlateNo,
                        type: "text",
                        label: "Biển kiểm soát",
                        validations: [
                          "required",
                          props.useFormResult?.watch(fields.typeFlow) === CAR
                            ? "plateNoCar"
                            : "plateNoMoto",
                        ],
                        hide: !props.useFormResult?.getValues(
                          fields.vehicleRegister
                        ),
                      },
                      {
                        id: fields.vehicleChassisNo,
                        type: "text",
                        label: "Số khung",
                        validations: ["required", "chassisNo"],
                      },
                      {
                        id: fields.vehicleEngineNo,
                        type: "text",
                        label: "Số máy",
                        validations: ["required", "engineNo"],
                      },
                    ]}
                    control={props.useFormResult?.control}
                    classInputsWrapper={classes.classInputsFrameVehicle}
                  />
                ),
              },
              {
                id: "inputsFrameVehicleDuration",
                type: "custom",
                className: matchesDownSm
                  ? classes.areaFull
                  : classes.areaHalfLeft,
                custom: (
                  <InputsFrame
                    inputsConfig={[
                      {
                        id: fields.durations,
                        type: "select",
                        label: "Thời hạn bảo hiểm",
                        className: classes.frameDurationAreaFull,
                        validations: ["required"],
                        options: props.durationByTypeFlowData?.map(
                          (it: any) => ({ value: it?.value, label: it?.name })
                        ),
                        onChange: (e: any) => {
                          const _value = e?.target?.value;

                          // expireDate
                          props.useFormResult?.setValue(
                            fields.expireDate,
                            dayjs(
                              props.useFormResult?.getValues(
                                fields.effectiveDate
                              )
                            )
                              .add(_value, "months")
                              .toDate()
                          );
                        },
                      },
                      {
                        id: fields.effectiveDate,
                        type: "date",
                        label: "Dự kiến từ ngày",
                        validations: ["required", "date", "dateRanger"],
                        min: dayjs().toDate(),
                        onChange: (e: any) => {
                          const _value = e?.target?.value;

                          // expireDate
                          props.useFormResult?.setValue(
                            fields.expireDate,
                            dayjs(_value)
                              .add(
                                props.useFormResult?.getValues(
                                  fields.durations
                                ),
                                "months"
                              )
                              .toDate()
                          );
                        },
                      },
                      {
                        id: fields.expireDate,
                        type: "date",
                        label: "Đến ngày",
                        validations: ["required", "date"],
                        disabled: true,
                      },
                    ]}
                    control={props.useFormResult?.control}
                    classInputsWrapper={classes.classInputsFrameDuration}
                  />
                ),
              },
              {
                id: fields.pkgCode,
                type: "switch",
                switchLabel: (
                  <Typography
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                    component="div"
                  >
                    Bạn muốn mua kèm bảo hiểm cứu hộ xe máy?
                    <DialogInfo
                      title="Bảo hiểm cứu hộ xe máy?"
                      content={
                        <div>
                          <Typography
                            color="primary"
                            sx={{
                              fontWeight: theme.typography.fontWeightBold,
                            }}
                          >
                            Bảo hiểm xe máy OBIKE Plus
                          </Typography>
                          <Typography
                            sx={{
                              fontWeight: theme.typography.fontWeightBold,
                            }}
                          >
                            Đặc quyền cứu hộ 24/7, trên toàn quốc:
                          </Typography>
                          <ul>
                            <li>
                              Hỗ trợ bạn khắc phục tạm thời và tại chỗ các hư
                              hỏng do tai nạn hoặc hỏng hóc như xịt lốp, nổ lốp,
                              mất chìa khoá, chết máy hoặc các sự cố kỹ thuật
                              khác.
                            </li>
                            <li>
                              Vận chuyển xe miễn phí đến địa điểm sửa chữa hoặc
                              nhà bạn khi xe gặp sự cố (trong phạm vi 50km).
                            </li>
                            <li>
                              Không còn nỗi lo hết xăng giữa đường với dịch vụ
                              giao xăng tại chỗ.
                            </li>
                          </ul>
                        </div>
                      }
                    />
                  </Typography>
                ),
                checkedValue: "PKG_TPL_ZUTTO",
                unCheckedValue: "",
                hide: true,
                className: matchesDownSm
                  ? classes.areaFull
                  : classes.areaHalfLeft,
              },
              {
                id: "labelFrameOwner",
                type: "custom",
                className: matchesDownSm
                  ? classes.areaFull
                  : props.useFormResult?.watch(fields.typeFlow) === CAR
                  ? classes.labelFrameOwnerCar
                  : classes.labelFrameOwnerMoto,
                custom: <LabelFrame content="THÔNG TIN CHỦ XE" />,
              },
              {
                id: "inputsFrameOwner",
                type: "custom",
                className: matchesDownSm
                  ? classes.areaFull
                  : props.useFormResult?.watch(fields.typeFlow) === CAR
                  ? classes.inputsFrameOwnerCar
                  : classes.inputsFrameOwnerMoto,
                custom: (
                  <InputsFrame
                    // label={props.useFormResult?.watch(fields.typeFlow) === CAR ? undefined : "THÔNG TIN CHỦ XE"}
                    inputsConfig={[
                      {
                        id: fields.ownerName,
                        type: "text",
                        label: "Họ tên",
                        validations: ["required"],
                        disabled:
                          !!props.blocked && props.defaultValues?.ownerFullName,
                      },
                      {
                        id: fields.ownerPhone,
                        type: "text",
                        label: "Số điện thoại",
                        validations: ["required", "phone"],
                        disabled:
                          !!props.blocked &&
                          props.defaultValues?.ownerPhoneNumber,
                      },
                      {
                        id: fields.ownerEmail,
                        type: "text",
                        label: "Email",
                        validations: ["required", "email"],
                      },
                      {
                        id: fields.ownerAddress,
                        type: "autocomplete",
                        label: "Tỉnh/Thành Phố",
                        validations: ["required"],
                        options:
                          props.provincesData?.map((it: any) => ({
                            value: it?.name,
                            label: it?.name,
                          })) || [],
                      },
                    ]}
                    control={props.useFormResult?.control}
                    classInputsWrapper={classes.classInputsFrameVehicle}
                  />
                ),
              },
              {
                id: "fee1",
                type: "custom",
                className: classes.areaFull,
                custom: (
                  <Fee
                    fee={fee}
                    oldFee={oldFee}
                    discountCode={
                      props.useFormResult?.getValues(fields.discountCode)
                      // props.useFormResult?.getValues(fields.discountCode) ===
                      // "NONE"
                      //   ? ""
                      //   : props.useFormResult?.getValues(fields.discountCode)
                    }
                    hideDiscount={
                      !props.useFormResult?.getValues(fields.pkgCode) ||
                      props.typeFlow === "car"
                    }
                    onSubmit={(data: any, setOpen: any) => {
                      if (!data?.discountCode) {
                        // props.useFormResult?.setValue(
                        //   fields.discountCode,
                        //   "NONE"
                        // );
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
                    typeFlow={props.useFormResult?.getValues(fields.typeFlow)}
                    pkgCode={props.useFormResult?.getValues(fields.pkgCode)}
                    ownerName={props.useFormResult?.getValues(fields.ownerName)}
                    ownerPhone={props.useFormResult?.getValues(
                      fields.ownerPhone
                    )}
                    ownerEmail={props.useFormResult?.getValues(
                      fields.ownerEmail
                    )}
                    vehicleUsing={
                      props.vehicleUsingData?.find(
                        (it: any) =>
                          it?.value ===
                          props.useFormResult?.getValues(fields.vehicleUsing)
                      )?.name
                    }
                    vehicleType={
                      props.vehicleTypeByTypeFlowAndVehicleUsingData?.find(
                        (it: any) =>
                          it?.value ===
                          props.useFormResult?.getValues(fields.vehicleType)
                      )?.name
                    }
                    vehicleSeatCount={
                      props.vehicleSeatCountsData?.find(
                        (it: any) =>
                          it?.value ===
                          props.useFormResult?.getValues(
                            fields.vehicleSeatCount
                          )
                      )?.name
                    }
                    vehicleWeight={
                      props.vehicleWeightData?.find(
                        (it: any) =>
                          it?.value ===
                          props.useFormResult?.getValues(fields.vehicleWeight)
                      )?.name
                    }
                    vehiclePlateNo={props.useFormResult?.getValues(
                      fields.vehiclePlateNo
                    )}
                    vehicleChassisNo={props.useFormResult?.getValues(
                      fields.vehicleChassisNo
                    )}
                    vehicleEngineNo={props.useFormResult?.getValues(
                      fields.vehicleEngineNo
                    )}
                    durations={
                      props.durationByTypeFlowData?.find(
                        (it: any) =>
                          it?.value ===
                          props.useFormResult?.getValues(fields.durations)
                      )?.name
                    }
                    effectiveDate={convertDateToString(
                      props.useFormResult?.getValues(fields.effectiveDate)
                    )}
                    expireDate={convertDateToString(
                      props.useFormResult?.getValues(fields.expireDate)
                    )}
                  />
                ),
              },
              {
                id: fields.saleCode,
                type: "text",
                label: "Mã cán bộ bán",
                className: classes.areaFull,
                validations: ["required"],
              },
              {
                id: fields.confirmed,
                type: "checkbox",
                label: "Cam kết",
                hide: props.hideConfirm,
                hideLabel: true,
                options: [
                  {
                    value: true,
                    label: (
                      <CheckboxLabelRule
                        regulationsAndTermAndConditionUrl={
                          props.useFormResult?.getValues(fields.typeFlow) ===
                          CAR
                            ? props.orderConfigData?.tncTplCarUrl
                            : props.useFormResult?.getValues(fields.pkgCode)
                            ? props.orderConfigData?.tncTplZutoUrl
                            : props.orderConfigData?.tncTplMotoUrl
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
                id: "fee2",
                type: "custom",
                className: classes.areaFull,
                custom: (
                  <Fee
                    fee={fee}
                    oldFee={oldFee}
                    discountCode={
                      props.useFormResult?.getValues(fields.discountCode)
                      // props.useFormResult?.getValues(fields.discountCode) ===
                      // "NONE"
                      //   ? ""
                      //   : props.useFormResult?.getValues(fields.discountCode)
                    }
                    hideDiscount={true}
                    onSubmit={(data: any) => {
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
                            fields.ownerName
                          ),
                        },
                        {
                          label: "Số điện thoại",
                          value: props.useFormResult?.getValues(
                            fields.ownerPhone
                          ),
                        },
                        {
                          label: "Email",
                          value: props.useFormResult?.getValues(
                            fields.ownerEmail
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
                      fee={fee}
                      oldFee={oldFee}
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
      props.provincesData,
      props.vehicleUsingData,
      props.getVehicleTypeByTypeFlowAndVehicleUsingData,
      props.vehicleTypeByTypeFlowAndVehicleUsingData,
      props.vehicleSeatCountsData,
      props.vehicleWeightData,
      props.durationByTypeFlowData,
      props.getDurationByTypeFlowData,
      // fields
      props.useFormResult?.watch(fields.typeFlow),
      props.useFormResult?.watch(fields.vehicleUsing),
      props.useFormResult?.watch(fields.refSpecs),
      props.useFormResult?.watch(fields.vehicleRegister),
      props.useFormResult?.watch(fields.durations),
      props.useFormResult?.watch(fields.effectiveDate),
      props.useFormResult?.watch(fields.expireDate),
      props.useFormResult?.watch(fields.pkgCode),
      props.useFormResult?.watch(fields.discountCode),
      props.useFormResult?.watch(fields.invoiceExport),
      props.useFormResult?.watch(fields.invoiceIsCompany),
      props.useFormResult?.watch(fields.vehicleType),
      props.useFormResult?.watch(fields.vehicleSeatCount),
      props.useFormResult?.watch(fields.vehicleWeight),
      props.useFormResult?.watch(fields.countClickStep),
      // default values
      props.defaultValues?.ownerFullName,
      props.defaultValues?.ownerPhoneNumber,
      // other
      fee,
      props.getPaymentInfoQuery?.isInitialLoading,
      props.getPaymentInfoQuery?.data?.content?.paymentMethods,
      props.hideConfirm,
    ]
  );
};

export default useSteps;
