import React, { useMemo, useCallback, useEffect, useState } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { Typography, Divider, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/styles";
import clsx from "clsx";
import dayjs from "dayjs";

import {
  PERSONAL,
  FAMILY,
  PERSONAL_GROUP_CODE,
  RELATION_MYSELF,
  CHECK_PRICE,
} from "helper/const";
import {
  buyForMapping,
  packageIconMapping,
  paymentMethodIconMapping,
  paymentMethodMapping,
} from "helper/mapping";
import convertCurrency from "helper/converts/convertCurrency";
import {
  invoiceIsCompanyOptions,
  paymentMethodLoadingOptions,
} from "helper/options";

import useStylesInputRadio from "components/inputs/InputRadio/useStylesInputRadio";
import RadioLabelRadius from "components/inputs/InputRadio/radioLabels/RadioLabelRadius";
import RadioLabelPackage from "components/inputs/InputRadio/radioLabels/RadioLabelPackage";
import InputsFrame from "components/InputsFrame";
import ListItemValue from "components/inputs/InputList/listLabels/ListItemValue";
import CheckboxLabelRule from "components/inputs/InputCheckbox/checkBoxLabels/CheckboxLabelRule";
import TotalFee from "components/TotalFee";
import SummaryInfo from "components/SummaryInfo";
import RadioLabelPaymentMethod from "components/inputs/InputRadio/radioLabels/RadioLabelPaymentMethod";
import RadioLabelPaymentMethodLong from "components/inputs/InputRadio/radioLabels/RadioLabelPaymentMethodLong";
import ReadMore from "components/ReadMore";
import Fee from "components/Fee";

import fields from "../../help/fields";
import useStyles from "../useStyles";
import ConfirmInfo from "./ConfirmInfo";
import { defaultValuesType, getCouponsType } from "components/sales/types";

type useStepsProps = {
  useFormResult: UseFormReturn<FieldValues, any>;
  orderConfigData: any;
  durationData: any;
  relationDataByGroupCode: any;
  groupPackageData: any;
  getPackageDataByGroupCode: (buyFor: string, familyHas: string) => any;
  packageDataByGroupCode: any;
  getPaymentInfoQuery: any;
  defaultValues?: defaultValuesType;
  blocked?: boolean;
  createPolicyHandle?: any;
  getCouponsService: getCouponsType;
  resourceCode: string;
};

const HELPER_TEXT_INSURED_MYSELF_FULL_NAME = "Tên người mua bảo hiểm";

const useSteps = (props: useStepsProps) => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesDownSm = useMediaQuery(theme.breakpoints.down("sm"));
  const classesInputRadio = useStylesInputRadio();
  const [rangerPerson, setRangerPerson] = useState() as any;

  const getInitValues = useCallback(() => {
    const _duration = props.durationData?.find(
      (it: any) => it?.selected
    )?.value;

    const _effectiveDate = dayjs().toDate();

    const _groupPackage = props.groupPackageData?.find(
      (it: any) => it?.groupCode === PERSONAL_GROUP_CODE
    );
    setRangerPerson(_groupPackage?.rangeValues);

    const _pkg = _groupPackage?.groups?.find((it: any) => it?.selected);
    const _pkgCode = _pkg?.pkgCode;

    const _totalFee = _pkg?.totalPremium * Number(_duration || 0);

    const _ownerFullName = props.defaultValues?.ownerFullName;
    const _ownerEmail = props.defaultValues?.ownerEmail;
    const _ownerPhoneNumber = props.defaultValues?.ownerPhoneNumber;
    const _ownerIdNo = props.defaultValues?.ownerIdNo;
    const _ownerBirthday = props.defaultValues?.ownerBirthday;

    return {
      [fields.buyFor]: PERSONAL,
      [fields.duration]: _duration,
      [fields.effectiveDate]: _effectiveDate,
      [fields.expireDate]: dayjs(_effectiveDate)
        .add(_duration, "years")
        .toDate(),
      [fields.pkgCode]: _pkgCode,
      [fields.invoiceIsCompany]: invoiceIsCompanyOptions[0].value,
      [fields.totalFee]: _totalFee,
      [fields.ownerFullName]: _ownerFullName,
      [fields.ownerEmail]: _ownerEmail,
      [fields.ownerPhoneNumber]: _ownerPhoneNumber,
      [fields.ownerIdNo]: _ownerIdNo,
      [fields.ownerBirthday]: _ownerBirthday,
    };
  }, [
    props.durationData,
    props.groupPackageData,
    setRangerPerson,
    props.defaultValues,
  ]);

  const getDefaultValues = useCallback(() => {
    const _initValues = getInitValues();

    return {
      [fields.buyFor]: _initValues?.[fields.buyFor],
      [fields.duration]: _initValues?.[fields.duration],
      [fields.effectiveDate]: _initValues?.[fields.effectiveDate],
      [fields.expireDate]: _initValues?.[fields.expireDate],
      [fields.pkgCode]: _initValues?.[fields.pkgCode],
      [fields.invoiceIsCompany]: _initValues?.[fields.invoiceIsCompany],
      [fields.totalFee]: _initValues?.[fields.totalFee],
      [fields.ownerFullName]: _initValues?.[fields.ownerFullName],
      [fields.ownerEmail]: _initValues?.[fields.ownerEmail],
      [fields.ownerPhoneNumber]: _initValues?.[fields.ownerPhoneNumber],
      [fields.ownerIdNo]: _initValues?.[fields.ownerIdNo],
      [fields.ownerBirthday]: _initValues?.[fields.ownerBirthday],
    };
  }, [getInitValues]);

  useEffect(() => {
    props.useFormResult.reset(getDefaultValues());
  }, [getDefaultValues]);

  const getInsuredsDefault = useCallback(
    (buyFor) =>
      buyFor === PERSONAL
        ? [
            {
              relation: props.useFormResult?.getValues(fields.insuredRelation),
              fullName: props.useFormResult?.getValues(fields.insuredFullName),
              birthday: props.useFormResult?.getValues(fields.insuredBirthday),
              idNo: props.useFormResult?.getValues(fields.insuredIdNo),
            },
          ]
        : [
            {
              relation: RELATION_MYSELF,
              fullName:
                props.useFormResult?.getValues(fields.ownerFullName) ||
                HELPER_TEXT_INSURED_MYSELF_FULL_NAME,
              birthday: props.useFormResult?.getValues(fields.ownerBirthday),
              idNo: props.useFormResult?.getValues(fields.ownerIdNo),
              fixed: true,
            },
          ],
    [
      // props.useFormResult?.watch(fields.ownerFullName),
      // props.useFormResult?.watch(fields.ownerBirthday),
      // props.useFormResult?.watch(fields.insuredRelation),
      // props.useFormResult?.watch(fields.insuredFullName),
      // props.useFormResult?.watch(fields.insuredBirthday),
      // props.useFormResult?.watch(fields.insuredIdNo),
    ]
  );

  const setInsureds = useCallback(
    () => {
      const _ownerFullName = props.useFormResult?.getValues(
        fields.ownerFullName
      );
      const _ownerBirthday = props.useFormResult?.getValues(
        fields.ownerBirthday
      );
      const _ownerIdNo = props.useFormResult?.getValues(fields.ownerIdNo);

      let _insureds = props.useFormResult?.getValues(fields.insureds) || [];

      _insureds = _insureds?.map((ins: any, i: number) =>
        ins?.relation === RELATION_MYSELF
          ? {
              ...ins,
              fullName: _ownerFullName,
              birthday: _ownerBirthday,
              idNo: _ownerIdNo,
            }
          : ins
      );

      props.useFormResult?.setValue(fields.insureds, _insureds);
    },
    [
      // props.useFormResult?.watch(fields.ownerFullName),
      // props.useFormResult?.watch(fields.ownerBirthday),
      // props.useFormResult?.watch(fields.ownerIdNo),
      // props.useFormResult?.watch(fields.insureds),
      // props.useFormResult?.setValue,
    ]
  );

  const setInsured = useCallback(
    () => {
      if (
        props.useFormResult?.getValues(fields.buyFor) === PERSONAL &&
        props.useFormResult?.getValues(fields.insuredRelation) ===
          RELATION_MYSELF
      ) {
        props.useFormResult?.setValue(
          fields.insuredFullName,
          props.useFormResult?.getValues(fields.ownerFullName)
        );
        props.useFormResult?.setValue(
          fields.insuredBirthday,
          props.useFormResult?.getValues(fields.ownerBirthday)
        );
        props.useFormResult?.setValue(
          fields.insuredIdNo,
          props.useFormResult?.getValues(fields.ownerIdNo)
        );
      }
    },
    [
      // props.useFormResult?.watch(fields.buyFor),
      // props.useFormResult?.watch(fields.insuredRelation),
      // props.useFormResult?.watch(fields.ownerFullName),
      // props.useFormResult?.watch(fields.ownerBirthday),
      // props.useFormResult?.watch(fields.ownerIdNo),
      // props.useFormResult?.setValue,
    ]
  );

  return useMemo(
    () => [
      {
        screens: [
          {
            inputsConfig: [
              {
                id: "labelBuyFor",
                type: "custom",
                custom: (
                  <Typography textAlign="center">
                    BẠN MUA BẢO HIỂM CHO?
                  </Typography>
                ),
                className: clsx({
                  [classes.areaFull]: true,
                  [classes.labelBuyFor]: true,
                }),
              },
              {
                id: fields.buyFor,
                type: "radio",
                row: true,
                classGroup: classesInputRadio.classRadioGroupRadius,
                classItem: classesInputRadio.classRadioRadius,
                className: matchesDownSm
                  ? classes.areaFull
                  : classes.areaCenter,
                options: [
                  {
                    value: PERSONAL,
                    label: <RadioLabelRadius label={buyForMapping[PERSONAL]} />,
                  },
                  {
                    value: FAMILY,
                    label: <RadioLabelRadius label={buyForMapping[FAMILY]} />,
                  },
                ],
                onChange: (e: any) => {
                  const _value = e?.target?.value;
                  let _familyHas = props.useFormResult?.getValues(
                    fields.familyHas
                  );
                  let _groupPackage;

                  if (_value === PERSONAL) {
                    // find group pkg when buy for personal
                    _groupPackage = props.groupPackageData?.find(
                      (it: any) => it?.groupCode === PERSONAL_GROUP_CODE
                    );
                  }

                  if (_value !== PERSONAL) {
                    if (!_familyHas) {
                      // find group pkg when buy for family is not value familyHas
                      const _groupPackageFilter =
                        props.groupPackageData?.filter(
                          (it: any) => it?.groupCode !== PERSONAL_GROUP_CODE
                        );
                      _groupPackage = _groupPackageFilter?.[0];
                      _familyHas = _groupPackage?.groupCode;
                    } else {
                      // find group pkg when buy for family
                      _groupPackage = props.groupPackageData?.find(
                        (it: any) => it?.groupCode === _familyHas
                      );
                      _familyHas = _groupPackage?.groupCode;
                    }

                    props.useFormResult?.setValue(fields.familyHas, _familyHas);
                  }

                  // set ranger insured
                  setRangerPerson(_groupPackage?.rangeValues);

                  // set pkg code
                  props.useFormResult?.setValue(
                    fields.pkgCode,
                    props
                      .getPackageDataByGroupCode(_value, _familyHas)
                      ?.find((it: any) => {
                        return (
                          props.useFormResult
                            ?.getValues(fields.pkgCode)
                            ?.indexOf(
                              it?.pkgCode?.split("_")?.slice(0, 3)?.join("_")
                            ) > -1
                        );
                      })?.pkgCode
                  );

                  // set insureds
                  props.useFormResult?.setValue(
                    fields.insureds,
                    getInsuredsDefault(_value)
                  );

                  props.useFormResult?.setValue(
                    fields.totalFee,
                    _groupPackage?.groups?.find(
                      (g: any) =>
                        g?.pkgCode ===
                        props.useFormResult?.getValues(fields.pkgCode)
                    )?.totalPremium *
                      getInsuredsDefault(_value)?.length *
                      Number(
                        props.useFormResult?.getValues(fields.duration) || 0
                      )
                  );
                },
              },
              {
                id: "inputsFrameTime",
                type: "custom",
                className: classes.areaFull,
                custom: (
                  <InputsFrame
                    inputsConfig={[
                      {
                        id: fields.duration,
                        type: "select",
                        label: "Thời hạn bảo hiểm",
                        validations: ["required"],
                        options: props.durationData?.map((it: any) => ({
                          value: it?.value,
                          label: it?.name,
                        })),
                        className: matchesDownSm ? classes.areaFull : undefined,
                        onChange: (e: any) => {
                          props.useFormResult?.setValue(
                            fields.expireDate,
                            dayjs(
                              props.useFormResult?.getValues(
                                fields.effectiveDate
                              )
                            ).add(e?.target?.value, "years")
                          );
                        },
                      },
                      {
                        id: fields.effectiveDate,
                        label: "Dự kiến từ ngày",
                        type: "date",
                        validations: ["required", "dateRanger"],
                        className: matchesDownSm ? classes.areaFull : undefined,
                        min: dayjs().toDate(),
                        onChange: (e: any) => {
                          props.useFormResult?.setValue(
                            fields.expireDate,
                            dayjs(e?.target?.value).add(
                              props.useFormResult?.getValues(fields.duration),
                              "years"
                            )
                          );
                        },
                      },
                      {
                        id: fields.expireDate,
                        label: "Đến ngày",
                        className: matchesDownSm ? classes.areaFull : undefined,
                        type: "date",
                        validations: ["required"],
                        disabled: true,
                      },
                      {
                        id: "labelFamilyHas",
                        type: "custom",
                        custom: (
                          <Typography textAlign="center">
                            GIA ĐÌNH BẠN CÓ?
                          </Typography>
                        ),
                        hide:
                          props.useFormResult?.getValues(fields.buyFor) ===
                          PERSONAL,
                        className: clsx({
                          [classes.areaFull]: true,
                          [classes.labelFamilyHas]: true,
                        }),
                      },
                      {
                        id: fields.familyHas,
                        type: "radio",
                        validations: ["required"],
                        label: "Gia đình bạn có?",
                        row: true,
                        hideLabel: true,
                        fullWidth: false,
                        hide:
                          props.useFormResult?.getValues(fields.buyFor) ===
                          PERSONAL,
                        className: clsx({
                          [classes.areaFull]: true,
                          [classes.familyHas]: true,
                        }),
                        options: props.groupPackageData
                          ?.filter(
                            (it: any) => it?.groupCode !== PERSONAL_GROUP_CODE
                          )
                          ?.map((it: any) => ({
                            value: it?.groupCode,
                            label: it?.groupName,
                          })),
                        onChange: (e: any) => {
                          const _value = e?.target?.value;

                          // set min max validate insured
                          const _groupPackage = props.groupPackageData?.find(
                            (it: any) => it?.groupCode === _value
                          );
                          setRangerPerson(_groupPackage?.rangeValues);

                          // set pkg code
                          props.useFormResult?.setValue(
                            fields.pkgCode,
                            props
                              .getPackageDataByGroupCode(
                                props.useFormResult?.getValues(fields.buyFor),
                                _value
                              )
                              ?.find((it: any) => {
                                return (
                                  props.useFormResult
                                    ?.getValues(fields.pkgCode)
                                    ?.indexOf(
                                      it?.pkgCode
                                        ?.split("_")
                                        ?.slice(0, 3)
                                        ?.join("_")
                                    ) > -1
                                );
                              })?.pkgCode
                          );

                          // set insureds
                          props.useFormResult?.setValue(
                            fields.insureds,
                            getInsuredsDefault(
                              props.useFormResult?.getValues(fields.buyFor)
                            )
                          );
                        },
                      },
                    ]}
                    control={props.useFormResult?.control}
                    classInputsWrapper={classes.classInputsFrameTime}
                  />
                ),
              },
              {
                id: "labelProgram",
                type: "custom",
                custom: (
                  <Typography textAlign="center">
                    CHƯƠNG TRÌNH BẢO HIỂM
                  </Typography>
                ),
                className: clsx({
                  [classes.areaFull]: true,
                  [classes.labelProgram]: true,
                }),
              },
              {
                id: fields.pkgCode,
                type: "radio",
                label: "Gói bảo hiểm",
                hideLabel: true,
                validations: ["required"],
                options: props.packageDataByGroupCode?.map((it: any) => ({
                  value: it?.pkgCode,
                  label: (
                    <RadioLabelPackage
                      icon={
                        <img
                          src={
                            (packageIconMapping as any)?.[
                              it?.pkgCode?.split("_")?.slice(0, 3)?.join("_")
                            ]
                          }
                          alt={
                            (packageIconMapping as any)?.[
                              it?.pkgCode?.split("_")?.slice(0, 3)?.join("_")
                            ]
                          }
                        />
                      }
                      color="white"
                      discountAmount={0}
                      price={it?.totalPremium}
                      title={it?.pkgName}
                      coverages={[
                        {
                          title: "Quyền lợi bảo hiểm",
                          expanded:
                            it?.pkgCode ===
                            props.useFormResult?.getValues(fields.pkgCode),
                          content: it?.coverages?.map((cov: any, i: number) => (
                            <div
                              style={{
                                display: "grid",
                                gridTemplateColumns: "1fr auto",
                                gap: theme.spacing(10),
                                justifyContent: "space-between",
                                marginBottom: theme.spacing(5),
                              }}
                              key={cov?.covTitle}
                            >
                              <span>{cov?.covTitle}</span>
                              <span>
                                {convertCurrency(cov?.covValueMax || 0)} đ
                              </span>
                            </div>
                          )),
                        },
                      ]}
                    />
                  ),
                })),
                className: classes.areaFull,
                onChange: (e: any) => {
                  props.useFormResult?.setValue(
                    fields.totalFee,
                    props.packageDataByGroupCode?.find(
                      (it: any) => it?.pkgCode === e?.target?.value
                    )?.totalPremium *
                      (props.useFormResult?.getValues(fields.insureds)
                        ?.length || 1) *
                      Number(
                        props.useFormResult?.getValues(fields.duration) || 0
                      )
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
            inputsConfig: [
              {
                id: "labelOwner",
                type: "custom",
                custom: (
                  <Typography textAlign="center">
                    THÔNG TIN NGƯỜI MUA BẢO HIỂM
                  </Typography>
                ),
                className: clsx({
                  [classes.areaHalfRow1]: !matchesDownSm,
                  [classes.labelOwner]: true,
                  [classes.areaFull]: matchesDownSm,
                }),
              },
              {
                id: "inputsFrameOwner",
                type: "custom",
                className: matchesDownSm
                  ? classes.areaFull
                  : classes.areaHalfRow2,
                custom: (
                  <InputsFrame
                    inputsConfig={[
                      {
                        id: fields.ownerFullName,
                        type: "text",
                        label: "Họ tên",
                        validations: ["required"],
                        disabled:
                          !!props.blocked && props.defaultValues?.ownerFullName,
                        onChange: () => {
                          setInsureds();
                          setInsured();
                        },
                      },
                      {
                        id: fields.ownerPhoneNumber,
                        type: "text",
                        label: "Số điện thoại",
                        disabled:
                          !!props.blocked &&
                          props.defaultValues?.ownerPhoneNumber,
                        validations: ["required", "phone"],
                      },
                      {
                        id: fields.ownerIdNo,
                        type: "text",
                        label: "Số CMND/CCCD",
                        disabled:
                          !!props.blocked && props.defaultValues?.ownerIdNo,
                        validations: ["required", "idNo"],
                        onChange: () => {
                          setInsureds();
                          setInsured();
                        },
                      },
                      {
                        id: fields.ownerBirthday,
                        type: "date",
                        label: "Ngày sinh",
                        disabled:
                          !!props.blocked && props.defaultValues?.ownerBirthday,
                        validations: ["required", "dateRanger"],
                        openTo: "year",
                        min: dayjs()
                          .startOf("days")
                          .subtract(65, "years")
                          .toDate(),
                        max: dayjs()
                          .startOf("days")
                          .subtract(18, "years")
                          .toDate(),
                        onChange: () => {
                          setInsureds();
                          setInsured();
                        },
                      },
                      {
                        id: fields.ownerEmail,
                        type: "text",
                        label: "Email nhận hợp đồng",
                        validations: ["required", "email"],
                      },
                    ]}
                    control={props.useFormResult?.control}
                    classInputsWrapper={classes.classInputsFrameOwner}
                  />
                ),
              },
              {
                id: "labelInsured",
                type: "custom",
                custom: (
                  <Typography textAlign="center">
                    THÔNG TIN NGƯỜI ĐƯỢC BẢO HIỂM
                  </Typography>
                ),
                className: clsx({
                  [classes.areaHalfRow1]: !matchesDownSm,
                  [classes.labelInsured]: true,
                  [classes.areaFull]: matchesDownSm,
                }),
              },
              {
                id: "inputsFrameInsureds",
                type: "custom",
                className: matchesDownSm
                  ? classes.areaFull
                  : classes.areaHalfRow2,
                custom: (
                  <InputsFrame
                    inputsConfig={[
                      {
                        id: fields.insuredRelation,
                        hide:
                          props.useFormResult?.getValues(fields.buyFor) ===
                          FAMILY,
                        type: "autocomplete",
                        label: "Quan hệ với người mua bảo hiểm",
                        validations: ["required"],
                        options: props.relationDataByGroupCode?.map(
                          (it: any) => ({
                            value: it?.value,
                            label: it?.name,
                          })
                        ),
                        onChange: (e: any) => {
                          const _value = e?.target?.value;

                          if (_value === RELATION_MYSELF) {
                            props.useFormResult?.setValue(
                              fields.insuredFullName,
                              props.useFormResult?.getValues(
                                fields.ownerFullName
                              )
                            );
                            props.useFormResult?.setValue(
                              fields.insuredBirthday,
                              props.useFormResult?.getValues(
                                fields.ownerBirthday
                              )
                            );
                            props.useFormResult?.setValue(
                              fields.insuredIdNo,
                              props.useFormResult?.getValues(fields.ownerIdNo)
                            );

                            props.useFormResult?.setValue(fields.insureds, [
                              {
                                relation: _value,
                                fullName: props.useFormResult?.getValues(
                                  fields.ownerFullName
                                ),
                                birthday: props.useFormResult?.getValues(
                                  fields.ownerBirthday
                                ),
                                idNo: props.useFormResult?.getValues(
                                  fields.ownerIdNo
                                ),
                              },
                            ]);
                          } else {
                            props.useFormResult?.setValue(fields.insureds, [
                              {
                                ...props.useFormResult?.getValues(
                                  fields.insureds
                                )?.[0],
                                relation: _value,
                              },
                            ]);
                          }
                        },
                      },
                      {
                        id: fields.insuredFullName,
                        hide:
                          props.useFormResult?.getValues(fields.buyFor) ===
                          FAMILY,
                        type: "text",
                        label: "Họ tên",
                        validations: ["required"],
                        disabled:
                          props.useFormResult?.getValues(
                            fields.insuredRelation
                          ) === RELATION_MYSELF,
                        onChange: (e: any) => {
                          props.useFormResult?.setValue(fields.insureds, [
                            {
                              ...props.useFormResult?.getValues(
                                fields.insureds
                              )?.[0],
                              fullName: e?.target?.value,
                            },
                          ]);
                        },
                      },
                      {
                        id: fields.insuredBirthday,
                        hide:
                          props.useFormResult?.getValues(fields.buyFor) ===
                          FAMILY,
                        type: "date",
                        label: "Ngày sinh",
                        validations: ["required", "dateRanger"],
                        disabled:
                          props.useFormResult?.getValues(
                            fields.insuredRelation
                          ) === RELATION_MYSELF,
                        openTo: "year",
                        min: dayjs()
                          .startOf("days")
                          .subtract(65, "years")
                          .toDate(),
                        max: dayjs()
                          .startOf("days")
                          .subtract(1, "years")
                          .toDate(),
                        onChange: (e: any) => {
                          props.useFormResult?.setValue(fields.insureds, [
                            {
                              ...props.useFormResult?.getValues(
                                fields.insureds
                              )?.[0],
                              birthday: e?.target?.value,
                            },
                          ]);
                        },
                      },
                      {
                        id: fields.insuredIdNo,
                        hide:
                          props.useFormResult?.getValues(fields.buyFor) ===
                          FAMILY,
                        disabled:
                          props.useFormResult?.getValues(
                            fields.insuredRelation
                          ) === RELATION_MYSELF,
                        type: "text",
                        label: "Số CMND/CCCD",
                        validations: ["idNo"],
                        onChange: (e: any) => {
                          props.useFormResult?.setValue(fields.insureds, [
                            {
                              ...props.useFormResult?.getValues(
                                fields.insureds
                              )?.[0],
                              idNo: e?.target?.value,
                            },
                          ]);
                        },
                      },
                      {
                        id: fields.insureds,
                        type: "list",
                        label: "Người được bảo hiểm",
                        hide:
                          props.useFormResult?.getValues(fields.buyFor) ===
                          PERSONAL,
                        hideLabel: true,
                        validations: ["required", "lengthRanger"],
                        min: rangerPerson?.minPerson,
                        max: rangerPerson?.maxPerson,
                        custom: <ListItemValue />,
                        inputsConfig: [
                          {
                            id: "relation",
                            type: "autocomplete",
                            label: "Quan hệ với người mua bảo hiểm",
                            validations: ["required"],
                            mappingOptions: props.relationDataByGroupCode?.map(
                              (it: any) => ({
                                value: it?.value,
                                label: it?.name,
                              })
                            ),
                            options: props.relationDataByGroupCode
                              ?.filter(
                                (it: any) =>
                                  !(
                                    it?.isOnce &&
                                    props.useFormResult
                                      ?.getValues(fields.insureds)
                                      ?.find(
                                        (ins: any) =>
                                          ins?.relation === it?.value
                                      )
                                  )
                              )
                              ?.map((it: any) => ({
                                value: it?.value,
                                label: it?.name,
                              })),
                          },
                          {
                            id: "fullName",
                            type: "text",
                            label: "Họ tên",
                            validations: ["required"],
                            fontWeight: "bold",
                          },
                          {
                            id: "birthday",
                            type: "date",
                            label: "Ngày sinh",
                            validations: ["required", "dateRanger"],
                            openTo: "year",
                            min: dayjs()
                              .startOf("days")
                              .subtract(65, "years")
                              .toDate(),
                            max: dayjs()
                              .startOf("days")
                              .subtract(1, "years")
                              .toDate(),
                          },
                          {
                            id: "idNo",
                            type: "text",
                            label: "Số CMND/CCCD",
                            validations: ["idNo"],
                            hide:
                              props.useFormResult?.getValues(fields.buyFor) ===
                              FAMILY,
                          },
                        ],
                        onChange: (e: any) => {
                          props.useFormResult?.setValue(
                            fields.totalFee,
                            props.packageDataByGroupCode?.find(
                              (it: any) =>
                                it?.pkgCode ===
                                props.useFormResult?.getValues(fields.pkgCode)
                            )?.totalPremium *
                              e?.target?.value?.length *
                              Number(
                                props.useFormResult?.getValues(
                                  fields.duration
                                ) || 0
                              )
                          );
                        },
                      },
                    ]}
                    control={props.useFormResult?.control}
                    classInputsWrapper={classes.classInputsFrameOwner}
                  />
                ),
              },
            ],
          },
        ],
      },
      {
        hideStepper: true,
        screens: [
          {
            inputsConfig: [
              {
                id: "labelConfirmInfo",
                type: "custom",
                custom: (
                  <Typography textAlign="center">
                    XÁC NHẬN YÊU CẦU BẢO HIỂM
                  </Typography>
                ),
                className: clsx({
                  [classes.areaFull]: true,
                  [classes.labelConfirmInfo]: true,
                }),
              },
              {
                id: "confirmInfo",
                type: "custom",
                className: classes.areaFull,
                custom: (() => {
                  const _pkg = props.packageDataByGroupCode?.find(
                    (it: any) =>
                      it?.pkgCode ===
                      props.useFormResult?.getValues(fields.pkgCode)
                  );

                  return (
                    <ConfirmInfo
                      ownerFullName={props.useFormResult?.getValues(
                        fields.ownerFullName
                      )}
                      ownerPhoneNumber={props.useFormResult?.getValues(
                        fields.ownerPhoneNumber
                      )}
                      ownerEmail={props.useFormResult?.getValues(
                        fields.ownerEmail
                      )}
                      insureds={props.useFormResult
                        ?.getValues(fields.insureds)
                        ?.map((it: any) => ({
                          ...it,
                          relationName: props.relationDataByGroupCode?.find(
                            (r: any) => r?.value === it?.relation
                          )?.name,
                        }))}
                      pkgName={_pkg?.pkgName}
                      pkgFee={_pkg?.totalPremium}
                    />
                  );
                })(),
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
                        regulationsUrl={props.orderConfigData?.regulationsUrl}
                        termAndConditionUrl={
                          props.orderConfigData?.termAndConditionUrl
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
                        props.createPolicyHandle(CHECK_PRICE, {
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
                            fields.ownerFullName
                          ),
                        },
                        {
                          label: "SĐT",
                          value: props.useFormResult?.getValues(
                            fields.ownerPhoneNumber
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
      props.useFormResult?.control,
      // props.useFormResult.watch(),
      props.useFormResult?.watch(fields.pkgCode),
      props.useFormResult?.watch(fields.insureds),
      props.useFormResult?.watch(fields.fee),
      props.useFormResult?.watch(fields.oldFee),
      props.useFormResult?.watch(fields.discountCode),
      props.useFormResult?.watch(fields.invoiceExport),
      props.useFormResult?.watch(fields.invoiceIsCompany),
      props.getPaymentInfoQuery?.isInitialLoading,
      // default values
      props.defaultValues?.ownerFullName,
      props.defaultValues?.ownerPhoneNumber,
      props.defaultValues?.ownerIdNo,
      props.defaultValues?.ownerBirthday,
      // data
      props.durationData,
      props.relationDataByGroupCode,
      props.groupPackageData,
      props.getPackageDataByGroupCode,
      props.packageDataByGroupCode,
      // state
      rangerPerson,
      setRangerPerson,
      getInsuredsDefault,
      setInsureds,
    ]
  );
};

export default useSteps;
