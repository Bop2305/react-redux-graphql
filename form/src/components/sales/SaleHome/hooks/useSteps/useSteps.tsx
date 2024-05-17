import React, { useCallback, useMemo, useEffect, useState } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { Divider, useMediaQuery, Typography, IconButton } from "@mui/material";
import { useTheme } from "@mui/styles";
import dayjs from "dayjs";
import clsx from "clsx";
import Markdown from "components/Markdown";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import useStylesInputRadio from "components/inputs/InputRadio/useStylesInputRadio";
import RadioLabelImage from "components/inputs/InputRadio/radioLabels/RadioLabelImage";
import Dialog from "components/Dialog";
import CheckboxLabelSwitch from "components/inputs/InputCheckbox/checkBoxLabels/CheckboxLabelSwitch";
import Fee from "components/Fee";
import { defaultValuesType, getCouponsType } from "components/sales/types";
import InputsFrame from "components/InputsFrame/InputsFrame";
import RadioLabelBorder from "components/inputs/InputRadio/radioLabels/RadioLabelBorder";
import ConfirmInfo from "./ConfirmInfo";

import useStyles from "../useStyles";
import fields from "../../help/fields";
import getAddress from "../../help/getAddress";
import {
  DETAIL_COV_MAIN,
  HOME_TYPE_DEPARTMENT,
  PROTECT_IN_HOUSE,
} from "../../help/const";
import { CHECK_PRICE } from "helper/const";
import convertDateToString from "helper/converts/convertDateToString";
import CheckboxLabelRule from "components/inputs/InputCheckbox/checkBoxLabels/CheckboxLabelRule";
import {
  invoiceIsCompanyOptions,
  paymentMethodLoadingOptions,
} from "helper/options";
import SummaryInfo from "components/SummaryInfo";
import TotalFee from "components/TotalFee";
import RadioLabelPaymentMethodLong from "components/inputs/InputRadio/radioLabels/RadioLabelPaymentMethodLong";
import { paymentMethodMapping } from "helper/mapping";

type useStepsProps = {
  useFormResult: UseFormReturn<FieldValues, any>;
  resourceCode: string;
  popupInfoList: any;
  assetValueData: any;
  additionalBenefitsData: any;
  orderConfigData: any;
  homeTypeData: any;
  listYearBuildHomeData: any;
  listDurationInsuranceData: any;
  getCouponsService: getCouponsType;
  fee: number;
  oldFee: number;
  createPolicyHandle: any;
  cityData: any;
  districtData: any;
  wardData: any;
  homeBuyerRelationshipD2cData: any;
  defaultValues?: defaultValuesType;
  blocked?: boolean;
  defaultDeductionData: any;
  program: any;
  getPaymentInfoQuery: any;
  getFeeAddOnByPkgCode: any;
};

const useSteps = (props: useStepsProps) => {
  const classes = useStyles();
  const theme = useTheme();
  const classesInputRadio = useStylesInputRadio();
  const matchesDownSm = useMediaQuery(theme.breakpoints.down("sm"));
  const [modal, setModal] = useState({ open: false } as any);

  const getInitValues = useCallback(() => {
    const homeTypeDataFirst = props.homeTypeData?.[0];
    const homeType = homeTypeDataFirst?.value;
    const departmentPkgCode = {};
    const departmentPkgType = {};
    homeTypeDataFirst?.items?.forEach((it: any, i: number) => {
      if (it?.selected) {
        (departmentPkgCode as any)[`${fields.departmentPkgCode}${i}`] =
          it?.pkgCode;
        (departmentPkgType as any)[`${fields.departmentPkgType}${i}`] =
          it?.pkgType;
      }
    });

    const durations = props.listDurationInsuranceData?.[0]?.value;
    const effectiveDate = dayjs().toDate();
    const expireDate = dayjs().add(durations, "years").toDate();

    const protectInHouse = true;

    return {
      [fields.homeType]: homeType,
      [fields.departmentPkgCode]: departmentPkgCode,
      [fields.departmentPkgType]: departmentPkgType,
      [fields.durations]: durations,
      [fields.effectiveDate]: effectiveDate,
      [fields.expireDate]: expireDate,
      [fields.protectInHouse]: protectInHouse,
    };
  }, [props.homeTypeData, props.listDurationInsuranceData]);

  const getDefaultValues = useCallback(() => {
    const _initValues = getInitValues() as any;

    return {
      [fields.homeType]: _initValues?.[fields.homeType],
      ..._initValues?.[fields.departmentPkgCode],
      ..._initValues?.[fields.departmentPkgType],
      [fields.durations]: _initValues?.[fields.durations],
      [fields.effectiveDate]: _initValues?.[fields.effectiveDate],
      [fields.expireDate]: _initValues?.[fields.expireDate],
      [fields.protectInHouse]: _initValues?.[fields.protectInHouse],
      [fields.buyerName]: props.defaultValues?.buyerName,
      [fields.buyerEmail]: props.defaultValues?.buyerEmail,
      [fields.buyerPhone]: props.defaultValues?.buyerPhone,
      [fields.invoiceIsCompany]: invoiceIsCompanyOptions[1].value,
      [fields.invoiceBuyerName]: props.defaultValues?.buyerName,
      [fields.invoiceEmail]: props.defaultValues?.buyerEmail,
    };
  }, [getInitValues, props.defaultValues]);

  useEffect(() => {
    props.useFormResult.reset(getDefaultValues());
  }, [getDefaultValues]);

  return useMemo(() => {
    const homeTypeFound = props.homeTypeData?.find(
      (it: any) => it?.value === props.useFormResult?.getValues(fields.homeType)
    );
    const packages = homeTypeFound?.items;

    const inputsDepartmentPkgCode = [] as any;

    if (packages?.length > 1) {
      packages?.forEach((it: any, i: number) => {
        if (it?.pkgCode !== "PKG_HOME_CC4") {
          inputsDepartmentPkgCode.push({
            id: `${fields.departmentPkgCode}${i}`,
            type: "switch",
            switchLabel: it?.pkgName,
            variant: "space-between",
            checkedValue: it?.pkgCode,
            unCheckedValue: null,
            className: classes.areaFull,
            onChange: () => {
              props.useFormResult?.setValue(
                `${fields.departmentPkgType}${i}`,
                it?.pkgType
              );
            },
          });
          inputsDepartmentPkgCode.push({
            id: `${fields.departmentPkgCode}Divider${i}`,
            type: "custom",
            custom: <Divider />,
            className: classes.areaFull,
          });
        }
      });
    }

    return [
      {
        screens: [
          {
            inputsConfig: [
              {
                id: "labelProgramsInsurance",
                type: "custom",
                custom: (
                  <Typography textAlign="center">THÔNG TIN NHÀ</Typography>
                ),
                className: clsx({
                  [classes.areaFull]: true,
                  [classes.label]: true,
                }),
              },
              {
                id: fields.homeType,
                type: "radio",
                row: true,
                classItem: classesInputRadio.classRadioRadius,
                className: matchesDownSm
                  ? classes.areaFull
                  : classes.areaCenter,
                options: props.homeTypeData?.map((it: any) => ({
                  value: it?.value,
                  label: (
                    <RadioLabelImage
                      label={it?.name}
                      src={
                        it?.value === "PRIVATE_HOME"
                          ? "https://n-file.opes.com.vn/of/d/opp/pub/opesform/images/icons/house.png"
                          : "https://n-file.opes.com.vn/of/d/opp/pub/opesform/images/icons/apartment.png"
                      }
                    />
                  ),
                })),
              },
              {
                id: `homeTypeDivider`,
                type: "custom",
                custom: <Divider sx={{ visibility: "hidden" }} />,
                className: classes.areaFull,
              },
              ...inputsDepartmentPkgCode,
              {
                id: fields.homeBuildYear,
                type: "autocomplete",
                label: "Năm xây dựng",
                className: classes.areaFull,
                validations: ["required"],
                options:
                  props.listYearBuildHomeData?.map((it: any) => ({
                    value: it?.value,
                    label: it?.name,
                  })) || [],
              },
              {
                id: fields.durations,
                type: "select",
                label: "Thời hạn bảo hiểm",
                className: classes.areaFull,
                validations: ["required"],
                options:
                  props.listDurationInsuranceData?.map((it: any) => ({
                    value: it?.value,
                    label: it?.name,
                  })) || [],
                onChange: (e: any) => {
                  const _value = e?.target?.value;

                  // expireDate
                  props.useFormResult?.setValue(
                    fields.expireDate,
                    dayjs(props.useFormResult?.getValues(fields.effectiveDate))
                      .add(_value, "years")
                      .toDate()
                  );
                },
              },
              {
                id: fields.effectiveDate,
                type: "date",
                label: "Dự kiến từ ngày",
                validations: ["required", "date", "dateRanger"],
                className: matchesDownSm ? classes.areaFull : classes.areaHalf,
                min: dayjs().toDate(),
                max: dayjs()
                  .add(props.orderConfigData?.maxDayPurchase, "days")
                  .toDate(),
                onChange: (e: any) => {
                  const _value = e?.target?.value;

                  // expireDate
                  props.useFormResult?.setValue(
                    fields.expireDate,
                    dayjs(_value)
                      .add(
                        props.useFormResult?.getValues(fields.durations),
                        "years"
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
                className: matchesDownSm ? classes.areaFull : classes.areaHalf,
                disabled: true,
              },
              {
                id: fields.homeValue,
                type: "currency",
                label: "Giá trị căn nhà",
                validations: ["required", "numberRanger"],
                className: classes.areaFull,
                helperText: (
                  <em>
                    * Dựa trên giá trị xây dựng của căn nhà không bao gồm giá
                    trị quyền sử dụng đất.
                  </em>
                ),
                min: props.orderConfigData?.homeMinValue,
                max: props.orderConfigData?.homeMaxValue,
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
                id: "labelProgramsInsurance",
                type: "custom",
                custom: (
                  <Typography textAlign="center">
                    CHƯƠNG TRÌNH BẢO HIỂM
                  </Typography>
                ),
                className: clsx({
                  [classes.areaFull]: true,
                  [classes.label]: true,
                }),
              },
              {
                id: "detailCovMain",
                type: "custom",
                custom: (
                  <>
                    <Typography
                      sx={{
                        color: theme.palette.secondary.main,
                        textDecoration: "underline",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        setModal({ open: true, code: DETAIL_COV_MAIN })
                      }
                      textAlign="center"
                    >
                      Chi tiết quyền lợi chính
                    </Typography>
                    <Dialog
                      open={modal?.open && modal?.code === DETAIL_COV_MAIN}
                      title="Chương trình bảo hiểm"
                      onClose={() => setModal({ open: false })}
                      fullScreen={false}
                    >
                      <Markdown
                        value={
                          props.popupInfoList?.find(
                            (it: any) => it?.code === modal?.code
                          )?.content
                        }
                      />
                    </Dialog>
                  </>
                ),
                className: clsx({
                  [classes.areaFull]: true,
                }),
              },
              {
                id: fields.protectInHouse,
                type: "checkbox",
                hideLabel: true,
                options: [
                  {
                    value: true,
                    label: (
                      <>
                        <b style={{ display: "flex", alignItems: "center" }}>
                          Bảo vệ tài sản bên trong căn nhà{" "}
                          <IconButton
                            size="small"
                            onClick={() =>
                              setModal({ open: true, code: PROTECT_IN_HOUSE })
                            }
                          >
                            <InfoOutlinedIcon fontSize="small" />
                          </IconButton>
                        </b>
                        <Dialog
                          open={modal?.open && modal?.code === PROTECT_IN_HOUSE}
                          title="Tài sản bên trong căn nhà"
                          onClose={() => setModal({ open: false })}
                          fullScreen={false}
                        >
                          <Markdown
                            value={
                              props.popupInfoList?.find(
                                (it: any) => it?.code === modal?.code
                              )?.content
                            }
                          />
                        </Dialog>
                      </>
                    ),
                    showCheckIcon: true,
                  },
                ],
                className: classes.areaFull,
                onChange: (e: any) => {
                  props.createPolicyHandle(CHECK_PRICE, e);
                },
              },
              {
                id: fields.homeAddon,
                type: "select",
                label: "Gói giá trị tài sản",
                className: classes.areaFull,
                validations: ["required"],
                hide: !props.useFormResult?.getValues(fields.protectInHouse),
                helperText: (
                  <em>
                    * Là tổng giá trị tài sản ước tính bên trong nhà mà bạn muốn
                    được bảo vệ
                  </em>
                ),
                options:
                  props.assetValueData?.map((it: any) => ({
                    value: it?.pkgCode,
                    label: it?.pkgName,
                  })) || [],
                onChange: (e: any) => {
                  props.createPolicyHandle(CHECK_PRICE, e);
                },
              },
              {
                id: fields.homeAddonMR,
                options: props.additionalBenefitsData?.map((it: any) => ({
                  label: (
                    <CheckboxLabelSwitch
                      label={it?.pkgName}
                      src={
                        it?.pkgCode === "PKG_OPES_HOME_MR1"
                          ? "https://n-file.opes.com.vn/of/d/opp/pub/opesform/images/icons/rental-costs.png"
                          : it?.pkgCode === "PKG_OPES_HOME_MR2"
                          ? "https://n-file.opes.com.vn/of/d/opp/pub/opesform/images/icons/fire-rescue.png"
                          : it?.pkgCode === "PKG_OPES_HOME_MR3"
                          ? "https://n-file.opes.com.vn/of/d/opp/pub/opesform/images/icons/cleanup.png"
                          : ""
                      }
                      fee={props.getFeeAddOnByPkgCode(
                        props.useFormResult
                          ?.getValues(fields.homeAddonMR)
                          ?.find((v: any) => v === it?.pkgCode)
                      )}
                    />
                  ),
                  value: it?.pkgCode,
                })),
                variant: "full-width",
                className: classes.areaFull,
                type: "checkbox",
                label: "Quyền lợi bổ sung (sau khi xảy ra tổn thất)",
                row: false,
                onChange: (e: any) => {
                  props.createPolicyHandle(CHECK_PRICE, e);
                },
              },
              {
                id: "fee",
                type: "custom",
                className: classes.areaFull,
                custom: (
                  <Fee
                    fee={props.fee}
                    oldFee={props.oldFee}
                    discountCode={props.useFormResult?.getValues(
                      fields.discountCode
                    )}
                    onSubmit={(data: any, setOpen: any) => {
                      if (!data?.discountCode) {
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
            ],
          },
        ],
      },
      {
        screens: [
          {
            inputsConfig: [
              {
                id: "labelBuyerInfo",
                type: "custom",
                custom: (
                  <Typography textAlign="center">
                    THÔNG TIN NGƯỜI MUA BẢO HIỂM
                  </Typography>
                ),
                className: clsx({
                  [classes.areaFull]: true,
                  [classes.label]: true,
                }),
              },
              {
                id: "inputsFrameBuyer",
                type: "custom",
                className: matchesDownSm ? classes.areaFull : classes.areaHalf,
                custom: (
                  <InputsFrame
                    inputsConfig={[
                      {
                        id: fields.buyerName,
                        type: "text",
                        label: "Họ tên",
                        validations: ["required"],
                        disabled:
                          !!props.blocked && !!props.defaultValues?.buyerName,
                      },
                      {
                        id: fields.buyerPhone,
                        type: "text",
                        label: "Số điện thoại",
                        validations: ["required", "phone"],
                        disabled:
                          !!props.blocked && !!props.defaultValues?.buyerPhone,
                      },
                      {
                        id: fields.buyerEmail,
                        type: "text",
                        label: "Email",
                        validations: ["required", "email"],
                        disabled:
                          !!props.blocked && !!props.defaultValues?.buyerEmail,
                      },
                      {
                        id: fields.homeAddress,
                        type: "text",
                        label: "Địa điểm được bảo hiểm",
                        validations: ["required"],
                      },
                      {
                        id: fields.city,
                        type: "autocomplete",
                        label: "Tỉnh/Thành phố",
                        validations: ["required"],
                        options:
                          props.cityData?.map((it: any) => ({
                            value: it?.code,
                            label: it?.name,
                          })) || [],
                        onChange: () => {
                          props.useFormResult?.setValue(fields.district, null);
                          props.useFormResult?.setValue(fields.ward, null);
                        },
                      },
                      {
                        id: fields.district,
                        type: "autocomplete",
                        label: "Quận/Huyện",
                        validations: ["required"],
                        options:
                          props.districtData?.map((it: any) => ({
                            value: it?.code,
                            label: it?.name,
                          })) || [],
                        onChange: () => {
                          props.useFormResult?.setValue(fields.ward, null);
                        },
                      },
                      {
                        id: fields.ward,
                        type: "autocomplete",
                        label: "Phường/Xã",
                        validations: ["required"],
                        options:
                          props.wardData?.map((it: any) => ({
                            value: it?.code,
                            label: it?.name,
                          })) || [],
                      },
                    ]}
                    control={props.useFormResult?.control}
                    classInputsWrapper={classes.inputsFrameBuyer}
                  />
                ),
              },
              {
                id: "inputsFrameBuyer",
                type: "custom",
                className: matchesDownSm ? classes.areaFull : classes.areaHalf,
                custom: (
                  <InputsFrame
                    inputsConfig={[
                      {
                        id: fields.buyerRelationship,
                        type: "radio",
                        label: "Bạn là",
                        validations: ["required"],
                        options: props.homeBuyerRelationshipD2cData?.map(
                          (it: any) => ({
                            value: it.value,
                            label: <RadioLabelBorder label={it?.name} />,
                          })
                        ),
                      },
                    ]}
                    control={props.useFormResult?.control}
                    classInputsWrapper={classes.inputsFrameBuyer}
                  />
                ),
              },
              {
                id: "fee",
                type: "custom",
                className: classes.areaFull,
                custom: (
                  <Fee
                    fee={props.fee}
                    oldFee={props.oldFee}
                    discountCode={props.useFormResult?.getValues(
                      fields.discountCode
                    )}
                    onSubmit={(data: any, setOpen: any) => {
                      if (!data?.discountCode) {
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
                id: "labelConfirmReqInsurance",
                type: "custom",
                custom: (
                  <Typography textAlign="center">
                    XÁC NHẬN YÊU CẦU BẢO HIỂM
                  </Typography>
                ),
                className: clsx({
                  [classes.areaFull]: true,
                  [classes.label]: true,
                }),
              },
              {
                id: "confirmInfo",
                type: "custom",
                className: classes.areaFull,
                custom: (() => {
                  const homeTypeFound = props.homeTypeData?.find(
                    (it: any) =>
                      it?.value ===
                      props.useFormResult?.getValues(fields.homeType)
                  );
                  let pkgs = [];
                  let pkgsAddOn = [];

                  if (
                    props.useFormResult?.getValues(fields.homeType) ===
                    HOME_TYPE_DEPARTMENT
                  ) {
                    pkgs = homeTypeFound?.items
                      ?.filter(
                        (it: any, i: number) =>
                          !!props.useFormResult?.getValues(
                            `${fields.departmentPkgCode}${i}`
                          )
                      )
                      ?.map((it: any) => it?.pkgName);
                  }

                  pkgsAddOn = props.additionalBenefitsData
                    ?.filter((it: any) =>
                      props.useFormResult
                        ?.getValues(fields.homeAddonMR)
                        ?.find((v: any) => v === it?.pkgCode)
                    )
                    ?.map((it: any) => it?.pkgName);

                  return (
                    <ConfirmInfo
                      durations={`${props.useFormResult?.getValues(
                        fields.durations
                      )} Năm`}
                      effectiveDate={convertDateToString(
                        props.useFormResult?.getValues(fields.effectiveDate)
                      )}
                      expireDate={convertDateToString(
                        props.useFormResult?.getValues(fields.expireDate)
                      )}
                      buyerName={props.useFormResult?.getValues(
                        fields.buyerName
                      )}
                      buyerPhone={props.useFormResult?.getValues(
                        fields.buyerPhone
                      )}
                      buyerEmail={props.useFormResult?.getValues(
                        fields.buyerEmail
                      )}
                      homeType={homeTypeFound?.name}
                      pkgs={pkgs}
                      pkgsAddOn={pkgsAddOn}
                      homeAddress={
                        getAddress(
                          props.useFormResult?.getValues(fields.homeAddress),

                          props.wardData?.find(
                            (it: any) =>
                              it?.code ===
                              props.useFormResult?.getValues(fields.ward)
                          )?.name,

                          props.districtData?.find(
                            (it: any) =>
                              it?.code ===
                              props.useFormResult?.getValues(fields.district)
                          )?.name,
                          props.cityData?.find(
                            (it: any) =>
                              it?.code ===
                              props.useFormResult?.getValues(fields.city)
                          )?.name
                        ) as any
                      }
                      homeBuildYear={props.useFormResult?.getValues(
                        fields.homeBuildYear
                      )}
                      homeValue={props.useFormResult?.getValues(
                        fields.homeValue
                      )}
                      inHomeValue={
                        props.assetValueData?.find(
                          (it: any) =>
                            it?.pkgCode ===
                            props.useFormResult?.getValues(fields.homeAddon)
                        )?.pkgName
                      }
                      defaultDeduction={props.defaultDeductionData}
                      buyerRelationship={
                        props.homeBuyerRelationshipD2cData?.find(
                          (it: any) =>
                            it.value ===
                            props.useFormResult?.getValues(
                              fields.buyerRelationship
                            )
                        )?.name
                      }
                      detailCovMain={
                        props.popupInfoList?.find(
                          (it: any) => it?.code === DETAIL_COV_MAIN
                        )?.content
                      }
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
                        regulationsUrl={props.program?.regulationUrl}
                        termAndConditionUrl={
                          props.program?.termsAndConditionsUrl
                        }
                        sub={
                          <div>
                            Tôi cam kết nhà được bảo hiểm có{" "}
                            <b>diện tích sử dụng để ở lớn hơn 60%</b> tổng diện
                            tích sử dụng.
                          </div>
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
                id: "fee",
                type: "custom",
                className: classes.areaFull,
                custom: (
                  <Fee
                    fee={props.fee}
                    oldFee={props.oldFee}
                    discountCode={props.useFormResult?.getValues(
                      fields.discountCode
                    )}
                    onSubmit={(data: any, setOpen: any) => {
                      if (!data?.discountCode) {
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
                            fields.buyerName
                          ),
                        },
                        {
                          label: "Số điện thoại",
                          value: props.useFormResult?.getValues(
                            fields.buyerPhone
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
                      fee={props.fee}
                      oldFee={props.oldFee}
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
    ];
  }, [
    props.homeTypeData,
    props.orderConfigData?.homeMinValue,
    props.orderConfigData?.homeMaxValue,
    props.orderConfigData?.maxDayPurchase,
    props.listYearBuildHomeData,
    props.listDurationInsuranceData,
    props.useFormResult?.watch(fields.homeType),
    props.useFormResult?.watch(fields.protectInHouse),
    props.useFormResult?.watch(fields.discountCode),
    props.useFormResult?.watch(fields.currentStep),
    props.useFormResult?.watch(fields.invoiceExport),
    props.useFormResult?.watch(fields.invoiceIsCompany),
    props.useFormResult?.watch(fields.homeAddonMR),
    modal,
    props.popupInfoList,
    props.assetValueData,
    props.additionalBenefitsData,
    props.fee,
    props.oldFee,
    props.createPolicyHandle,
    props.cityData,
    props.districtData,
    props.wardData,
    props.homeBuyerRelationshipD2cData,
    props.blocked,
    props.defaultValues,
    props.defaultDeductionData,
    props.program?.regulationUrl,
    props.program?.termsAndConditionsUrl,
    props.getPaymentInfoQuery?.isInitialLoading,
    props.getPaymentInfoQuery?.data?.content?.paymentMethods,
    props.getFeeAddOnByPkgCode,
  ]);
};

export default useSteps;
