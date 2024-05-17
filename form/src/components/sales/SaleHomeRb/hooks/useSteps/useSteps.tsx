import React, { useCallback, useMemo, useEffect } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { Divider, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/styles";
import dayjs from "dayjs";

import {
  invoiceIsCompanyOptions,
  // paymentMethodLoadingOptions,
  homeDurationsOptions,
  homeAddOn2Options,
  isInsuredOptions,
  buyerIsCompanyOptions,
  paymentMethodLoadingOptions,
} from "helper/options";
import Fee from "components/Fee";
// import CheckboxLabelRule from "components/inputs/InputCheckbox/checkBoxLabels/CheckboxLabelRule";

import useStyles from "../useStyles";
import fields from "../../help/fields";
import ConfirmInfo from "./ConfirmInfo";
// import SummaryInfo from "components/SummaryInfo";
// import TotalFee from "components/TotalFee";
// import RadioLabelPaymentMethodLong from "components/inputs/InputRadio/radioLabels/RadioLabelPaymentMethodLong";
// import { paymentMethodMapping } from "helper/mapping";
import { hasBankLoanHomeOptions } from "helper/options";
import getAddress from "../../help/getAddress";
import RadioLabelBox from "components/inputs/InputRadio/radioLabels/RadioLabelBox";
import SummaryInfo from "components/SummaryInfo/SummaryInfo";
import TotalFee from "components/TotalFee/TotalFee";
import RadioLabelPaymentMethodLong from "components/inputs/InputRadio/radioLabels/RadioLabelPaymentMethodLong";
import { paymentMethodMapping } from "helper/mapping";

type useStepsProps = {
  useFormResult: UseFormReturn<FieldValues, any>;
  checkPriceHandle: any;
  checkPriceMutation: any;
  getPaymentInfoQuery: any;
  policy: any;
  homeTypeData: any;
  homeUsingData: any;
  provinceData: any;
  districtData: any;
  communeData: any;
  homeAddOnData: any;
  homeAddOn2Data: any;
  homeBuyerRelationshipData: any;
  saleTypesData: any;
  paymentMethodsQuery: any;
  hierarchies: any;
  getStaffInfoQuery: any;
};

const useSteps = (props: useStepsProps) => {
  const theme = useTheme();
  const classes = useStyles();
  const matchesDownSm = useMediaQuery(theme.breakpoints.down("sm"));

  const getInitValues = useCallback(() => {
    // const _insStartDate = props.policy?.polEffectiveDate;
    // const _insEndDate = props.policy?.polExpireDate;
    // const _insAmount = props.policy?.polAmount;
    // if (_insStartDate && _insEndDate && _insAmount) {
    //   props.checkPriceHandle(_insStartDate, _insEndDate, _insAmount);
    // }
    const _buyerIsCompany = !!props.policy?.polInvoices?.[0]?.invoiceIsCompany;

    return {
      [fields.isInsured]: isInsuredOptions?.[0]?.value,
      [fields.buyerIsCompany]: _buyerIsCompany,

      [fields.invoiceExport]: !!props.policy?.polInvoices?.[0]?.invoiceExport,
      [fields.invoiceIsCompany]: _buyerIsCompany,
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

  useEffect(() => {
    const _arrPkgCode = [
      props.useFormResult.getValues(fields.homeType),
      props.useFormResult.getValues(fields.homeAddon),
      ...(props.useFormResult.getValues(fields.homeAddon2)
        ? props.homeAddOn2Data?.map((it: any) => it?.pkgCode)
        : []),
    ];

    props.useFormResult?.setValue(
      fields.pkgCode,
      _arrPkgCode?.filter((v: any) => !!v)?.join(";")
    );
  }, [
    props.useFormResult.watch(fields.homeType),
    props.useFormResult.watch(fields.homeAddon),
    props.useFormResult.watch(fields.homeAddon2),
  ]);

  useEffect(() => {
    if (
      props.useFormResult.getValues(fields.pkgCode) &&
      props.useFormResult.getValues(fields.sumInsurance) &&
      props.useFormResult.getValues(fields.durations)
    ) {
      props.checkPriceHandle();
    }
  }, [
    props.useFormResult.watch(fields.pkgCode),
    props.useFormResult.watch(fields.sumInsurance),
    props.useFormResult.watch(fields.durations),
    props.checkPriceHandle,
  ]);

  const sumInsuranceMax = useMemo(() => {
    let _sumInsuranceMax = 0;
    const _coverages = props.homeTypeData?.find(
      (it: any) =>
        it?.pkgCode === props.useFormResult?.getValues(fields.homeType)
    )?.coverages;

    _coverages?.forEach((it: any) => {
      _sumInsuranceMax += it?.covValueMax;
    });

    return _sumInsuranceMax;
  }, [props.useFormResult?.watch(fields.homeType)]);

  return useMemo(
    () => [
      {
        screens: [
          {
            title: "Thông tin căn nhà được bảo hiểm",
            inputsConfig: [
              {
                id: fields.saleType,
                type: "radio",
                label: "Kênh bán",
                hideLabel: true,
                validations: ["required"],
                className: classes.areaFull,
                classGroup: classes.classGroupSaleType,
                options: props.saleTypesData?.map((it: any) => ({
                  value: it?.value,
                  label: <RadioLabelBox label={it?.name} />,
                })),
              },
              {
                id: fields.hasBankLoan,
                type: "radio",
                label: "Loại tài sản",
                validations: ["required"],
                options: hasBankLoanHomeOptions,
                row: true,
                className: classes.areaFull,
                onChange: (e: any) => {
                  const _value = e?.target?.value;
                  const org = props.hierarchies?.find(
                    (it: any) =>
                      it?.id ===
                      props.getStaffInfoQuery?.data?.content?.organizationId
                  );

                  if (
                    _value &&
                    (!props.useFormResult?.getValues(fields.benIdNo) ||
                      !props.useFormResult?.getValues(fields.benName))
                  ) {
                    props.useFormResult?.setValue(fields.benIdNo, org?.orgCode);
                    props.useFormResult?.setValue(
                      fields.benAddress,
                      org?.address
                    );
                    props.useFormResult?.setValue(
                      fields.benName,
                      `VPBank - ${org?.name}`
                    );
                  }
                },
              },
              {
                id: fields.homeType,
                type: "radio",
                label: "Loại hình căn nhà",
                validations: ["required"],
                options: props.homeTypeData?.map((it: any) => ({
                  value: it?.pkgCode,
                  label: it?.pkgName,
                })),
                className: classes.areaFull,
              },
              {
                id: fields.projectName,
                type: "text",
                label: "Tên dự án",
              },
              {
                id: fields.homeUsing,
                type: "select",
                label: "Hiện trạng căn nhà sử dụng",
                validations: ["required"],
                options: props.homeUsingData?.map((it: any) => ({
                  value: it?.value,
                  label: it?.name,
                })),
              },
              {
                id: fields.streetAddress,
                type: "text",
                label: "Địa điểm được bảo hiểm",
                helperText: "Số căn hộ / số nhà, đường...",
                validations: ["required"],
              },
              {
                id: fields.provinceCode,
                type: "autocomplete",
                label: "Tỉnh/Thành phố",
                validations: ["required"],
                options:
                  props.provinceData?.map((it: any) => ({
                    value: it?.code,
                    label: it?.name,
                  })) || [],
                onChange: () => {
                  props.useFormResult?.setValue(fields.districtCode, null);
                  props.useFormResult?.setValue(fields.communeCode, null);
                },
              },
              {
                id: fields.districtCode,
                type: "autocomplete",
                label: "Quận/Huyện",
                validations: ["required"],
                options:
                  props.districtData?.map((it: any) => ({
                    value: it?.code,
                    label: it?.name,
                  })) || [],
                onChange: () => {
                  props.useFormResult?.setValue(fields.communeCode, null);
                },
              },
              {
                id: fields.communeCode,
                type: "autocomplete",
                label: "Phường/Xã",
                validations: ["required"],
                options:
                  props.communeData?.map((it: any) => ({
                    value: it?.code,
                    label: it?.name,
                  })) || [],
              },
              {
                id: fields.homeValue,
                type: "currency",
                label: "Giá trị căn nhà",
                validations: ["required"],
              },
              {
                id: fields.sumInsurance,
                type: "currency",
                label: "Số tiền bảo hiểm",
                validations: ["required", "numberRanger"],
                max: sumInsuranceMax,
              },
              {
                id: fields.homeAddon,
                type: "select",
                label: "Gói BH tài sản trong nhà",
                showNone: true,
                options: props.homeAddOnData
                  ?.sort((a: any, b: any) => {
                    let fa = a.pkgName.toLowerCase(),
                      fb = b.pkgName.toLowerCase();

                    if (fa < fb) {
                      return -1;
                    }
                    if (fa > fb) {
                      return 1;
                    }
                    return 0;
                  })
                  ?.filter(
                    (it: any) =>
                      props.useFormResult?.getValues(fields.sumInsurance) >=
                      it?.coverages?.[0]?.covValueMax
                  )
                  ?.map((it: any) => ({
                    value: it?.pkgCode,
                    label: it?.pkgName,
                  })),
              },
              {
                id: fields.homeAddon2,
                type: "select",
                label: "Gói quyền lợi bổ sung",
                options: homeAddOn2Options,
              },
              {
                id: fields.durations,
                type: "select",
                label: "Thời hạn bảo hiểm",
                validations: ["required"],
                options: homeDurationsOptions,
                className: classes.areaFull,
                onChange: (e: any) => {
                  const _effectiveDate = props.useFormResult?.getValues(
                    fields.effectiveDate
                  );

                  if (_effectiveDate) {
                    props.useFormResult?.setValue(
                      fields.expireDate,
                      dayjs(_effectiveDate)
                        .add(e?.target?.value, "years")
                        .toDate()
                    );
                  }
                },
              },
              {
                id: fields.effectiveDate,
                type: "date",
                label: "Hiệu lực từ ngày",
                validations: ["required", "dateRanger"],
                min: dayjs().toDate(),
                onChange: (e: any) => {
                  const _durations = props.useFormResult?.getValues(
                    fields.durations
                  );

                  if (_durations) {
                    props.useFormResult?.setValue(
                      fields.expireDate,
                      dayjs(e?.target?.value).add(_durations, "years").toDate()
                    );
                  }
                },
              },
              {
                id: fields.expireDate,
                type: "date",
                label: "Hiệu lực đến ngày",
                validations: ["required"],
                disabled: true,
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
        screens: [
          {
            title: "Thông tin hợp đồng",
            inputsConfig: [
              {
                id: "buyerInfo",
                type: "custom",
                custom: <b>Thông tin bên mua bảo hiểm</b>,
                className: classes.areaFull,
              },
              {
                id: fields.isInsured,
                type: "radio",
                validations: ["required"],
                label: "Bên mua bảo hiểm đồng thời là Người được bảo hiểm",
                options: isInsuredOptions,
                row: true,
                className: classes.areaFull,
              },
              {
                id: fields.buyerIsCompany,
                type: "select",
                validations: ["required"],
                label: "Bên mua bảo hiểm",
                options: buyerIsCompanyOptions,
                disabled: true,
                onChange: (e: any) => {
                  props.useFormResult?.setValue(
                    fields.invoiceIsCompany,
                    e?.target?.value
                  );
                },
              },
              // {
              //   id: fields.buyerCifNumber,
              //   type: "text",
              //   validations: ["required"],
              //   label: "Số CIF",
              // },
              {
                id: fields.buyerName,
                type: "text",
                validations: ["required"],
                label: props.useFormResult?.getValues(fields.buyerIsCompany)
                  ? "Tên công ty"
                  : "Họ và tên",
                onChange: (e: any) => {
                  props.useFormResult?.setValue(
                    props.useFormResult?.getValues(fields.buyerIsCompany)
                      ? fields.invoiceCompanyName
                      : fields.invoiceBuyerName,
                    e?.target?.value
                  );
                },
              },
              {
                id: fields.buyerIdNo,
                type: "text",
                validations: [
                  "required",
                  props.useFormResult?.getValues(fields.buyerIsCompany)
                    ? "taxCode"
                    : "idNo",
                ],
                label: props.useFormResult?.getValues(fields.buyerIsCompany)
                  ? "Mã số thuế"
                  : "Số giấy tờ tùy thân",
                onChange: (e: any) => {
                  if (props.useFormResult?.getValues(fields.buyerIsCompany)) {
                    props.useFormResult?.setValue(
                      fields.invoiceTaxCode,
                      e?.target?.value
                    );
                  }
                },
              },
              {
                id: fields.buyerDeputyName,
                type: "text",
                validations: ["required"],
                label: "Người đại diện",
                hide: !props.useFormResult?.getValues(fields.buyerIsCompany),
              },
              {
                id: fields.buyerDeputyTitle,
                type: "text",
                validations: ["required"],
                label: "Chức vụ",
                hide: !props.useFormResult?.getValues(fields.buyerIsCompany),
              },
              {
                id: fields.buyerPhone,
                type: "text",
                validations: ["required", "phone"],
                label: "Số điện thoại",
              },
              {
                id: fields.buyerEmail,
                type: "text",
                validations: ["required", "email"],
                label: "Email",
                onChange: (e: any) => {
                  props.useFormResult?.setValue(
                    fields.invoiceEmail,
                    e?.target?.value
                  );
                },
              },
              {
                id: fields.buyerAddress,
                type: "text",
                validations: ["required"],
                label: "Địa chỉ liên lạc",
                className: classes.areaFull,
                onChange: (e: any) => {
                  props.useFormResult?.setValue(
                    fields.invoiceAddress,
                    e?.target?.value
                  );
                },
              },
              {
                id: fields.buyerRelationship,
                type: "radio",
                validations: ["required"],
                label: "Bên mua bảo hiểm là",
                options: props.homeBuyerRelationshipData?.map((it: any) => ({
                  value: it?.value,
                  label: it?.name,
                })),
                className: classes.areaFull,
              },
              {
                id: "insuredInfo",
                type: "custom",
                custom: <b>Thông tin người được bảo hiểm</b>,
                className: classes.areaFull,
                hide: Number(props.useFormResult?.getValues(fields.isInsured)),
              },
              {
                id: fields.insuredName,
                type: "text",
                validations: ["required"],
                label: "Họ và tên",
                hide: Number(props.useFormResult?.getValues(fields.isInsured)),
              },
              {
                id: fields.insuredIdNo,
                type: "text",
                validations: ["required", "idNo"],
                label: "Số giấy tờ tùy thân",
                hide: Number(props.useFormResult?.getValues(fields.isInsured)),
              },
              {
                id: fields.insuredPhone,
                type: "text",
                validations: ["required", "phone"],
                label: "Số điện thoại",
                hide: Number(props.useFormResult?.getValues(fields.isInsured)),
              },
              {
                id: fields.insuredEmail,
                type: "text",
                validations: ["required", "email"],
                label: "Email",
                hide: Number(props.useFormResult?.getValues(fields.isInsured)),
              },
              {
                id: "benInfo",
                type: "custom",
                custom: <b>Thông tin bên thụ hưởng</b>,
                className: classes.areaFull,
                hide:
                  !props.hierarchies ||
                  props.hierarchies?.length === 0 ||
                  !props.useFormResult?.getValues(fields.hasBankLoan),
              },
              {
                id: fields.benIdNo,
                type: "autocomplete",
                label: "Chi nhánh",
                validations: ["required"],
                options: props.hierarchies
                  ?.filter((it: any) => !!it?.id)
                  ?.map((it: any) => ({
                    value: it?.orgCode,
                    label: it?.name,
                  })),
                hide:
                  !props.hierarchies ||
                  props.hierarchies?.length === 0 ||
                  !props.useFormResult?.getValues(fields.hasBankLoan),
                onChange: (e: any) => {
                  const _orgArr = props.hierarchies?.find(
                    (it: any) => it?.orgCode === e?.target?.value
                  );

                  // Set benName
                  props.useFormResult?.setValue(
                    fields.benName,
                    `VPBank - ${_orgArr?.name}`
                  );

                  // Set benAddress
                  props.useFormResult?.setValue(
                    fields.benAddress,
                    _orgArr?.address || ""
                  );
                },
              },
              {
                id: fields.benName,
                type: "text",
                label: "Tên chi nhánh",
                validations: ["required"],
                hide: true,
              },
              {
                id: fields.benAddress,
                type: "text",
                label: "Địa chỉ chi nhánh",
                validations: ["required"],
                hide:
                  !props.hierarchies ||
                  props.hierarchies?.length === 0 ||
                  !props.useFormResult?.getValues(fields.hasBankLoan),
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
                    saleType={
                      props.saleTypesData?.find(
                        (it: any) =>
                          it?.value ===
                          props.useFormResult?.getValues(fields.saleType)
                      )?.name
                    }
                    hasBankLoan={
                      hasBankLoanHomeOptions?.find(
                        (it: any) =>
                          it?.value ===
                          props.useFormResult?.getValues(fields.hasBankLoan)
                      )?.label as any
                    }
                    homeType={
                      props.homeTypeData?.find(
                        (it: any) =>
                          it?.pkgCode ===
                          props.useFormResult?.getValues(fields.homeType)
                      )?.pkgName
                    }
                    projectName={props.useFormResult?.getValues(
                      fields.projectName
                    )}
                    homeUsing={
                      props.homeUsingData?.find(
                        (it: any) =>
                          it?.value ===
                          props.useFormResult?.getValues(fields.homeUsing)
                      )?.name
                    }
                    homeAddress={getAddress(
                      props.useFormResult?.getValues(fields.streetAddress),
                      props.communeData?.find(
                        (it: any) =>
                          it?.code ===
                          props.useFormResult?.getValues(fields.communeCode)
                      )?.name,
                      props.districtData?.find(
                        (it: any) =>
                          it?.code ===
                          props.useFormResult?.getValues(fields.districtCode)
                      )?.name,
                      props.provinceData?.find(
                        (it: any) =>
                          it?.code ===
                          props.useFormResult?.getValues(fields.provinceCode)
                      )?.name
                    )}
                    homeValue={props.useFormResult?.getValues(fields.homeValue)}
                    sumInsurance={props.useFormResult?.getValues(
                      fields.sumInsurance
                    )}
                    homeAddon={
                      props.homeAddOnData?.find(
                        (it: any) =>
                          it?.pkgCode ===
                          props.useFormResult?.getValues(fields.homeAddon)
                      )?.pkgName
                    }
                    homeAddon2={
                      homeAddOn2Options?.find(
                        (it: any) =>
                          it?.value ===
                          props.useFormResult?.getValues(fields.homeAddon2)
                      )?.label as any
                    }
                    durations={
                      homeDurationsOptions?.find(
                        (it: any) =>
                          it?.value ===
                          props.useFormResult?.getValues(fields.durations)
                      )?.label as any
                    }
                    effectiveDate={props.useFormResult?.getValues(
                      fields.effectiveDate
                    )}
                    expireDate={props.useFormResult?.getValues(
                      fields.expireDate
                    )}
                    isInsured={props.useFormResult?.getValues(fields.isInsured)}
                    buyerIsCompany={props.useFormResult?.getValues(
                      fields.buyerIsCompany
                    )}
                    buyerCifNumber={props.useFormResult?.getValues(
                      fields.buyerCifNumber
                    )}
                    buyerName={props.useFormResult?.getValues(fields.buyerName)}
                    buyerIdNo={props.useFormResult?.getValues(fields.buyerIdNo)}
                    buyerDeputyName={props.useFormResult?.getValues(
                      fields.buyerDeputyName
                    )}
                    buyerDeputyTitle={props.useFormResult?.getValues(
                      fields.buyerDeputyTitle
                    )}
                    buyerPhone={props.useFormResult?.getValues(
                      fields.buyerPhone
                    )}
                    buyerEmail={props.useFormResult?.getValues(
                      fields.buyerEmail
                    )}
                    buyerAddress={props.useFormResult?.getValues(
                      fields.buyerAddress
                    )}
                    buyerRelationship={
                      props.homeBuyerRelationshipData?.find(
                        (it: any) =>
                          it?.value ===
                          props.useFormResult?.getValues(
                            fields.buyerRelationship
                          )
                      )?.name
                    }
                    insuredName={props.useFormResult?.getValues(
                      fields.insuredName
                    )}
                    insuredIdNo={props.useFormResult?.getValues(
                      fields.insuredIdNo
                    )}
                    insuredPhone={props.useFormResult?.getValues(
                      fields.insuredPhone
                    )}
                    insuredEmail={props.useFormResult?.getValues(
                      fields.insuredEmail
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
                      fee={fee}
                      oldFee={0}
                      title={"Tổng phí bảo hiểm"}
                      description={"(Đã bao gồm VAT)"}
                    />
                    <br />
                    <Divider />
                  </div>
                ),
              },
              {
                id: fields.paymentMethod,
                type: "radio",
                row: true,
                label: "Phương thức thanh toán",
                // hideLabel: true,
                validations: ["required"],
                className: classes.areaFull,
                classGroup: classes.classGroupPaymentMethod,
                options:
                  props.paymentMethodsQuery?.isInitialLoading ||
                  !props.paymentMethodsQuery?.data?.content
                    ? paymentMethodLoadingOptions
                    : props.paymentMethodsQuery?.data?.content?.map(
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
      props.homeTypeData,
      props.homeUsingData,
      props.provinceData,
      props.districtData,
      props.communeData,
      props.homeAddOnData,
      props.homeAddOn2Data,
      props.homeBuyerRelationshipData,
      props.saleTypesData,

      props.useFormResult?.watch(fields.homeType),
      props.useFormResult?.watch(fields.homeValue),
      props.useFormResult?.watch(fields.sumInsurance),
      props.useFormResult?.watch(fields.buyerIsCompany),
      props.useFormResult?.watch(fields.isInsured),
      props.useFormResult?.watch(fields.hasBankLoan),

      props.useFormResult?.watch(fields.invoiceExport),
      props.useFormResult?.watch(fields.invoiceIsCompany),
      props.useFormResult?.watch(fields.currentStepIndex),

      fee,
      sumInsuranceMax,
      props.checkPriceMutation?.isLoading,
      props.paymentMethodsQuery?.isInitialLoading,
      props.paymentMethodsQuery?.data?.content,
      props.hierarchies,
      props.getStaffInfoQuery?.data?.content,
    ]
  );
};

export default useSteps;
