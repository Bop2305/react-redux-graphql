import React, { useCallback, useEffect, useMemo } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { useMediaQuery, useTheme } from "@mui/material";
import dayjs from "dayjs";
import Button from "components/Button/Button";

import fields from "../help/fields";
import useStyles from "./useStyles";

import { carUsingMapping, packageIconMapping } from "helper/mapping";
import {
  COMMERCIAL,
  SEAT_DEFAULT,
  TRUCK,
  ROMOOC,
  REFRIGERATED,
  OTHER_TRUCKS,
  TRACTOR_CONTAINER,
} from "helper/const";
import RadioLabelBox from "components/inputs/InputRadio/radioLabels/RadioLabelBox";
import RadioLabelPackage from "components/inputs/InputRadio/radioLabels/RadioLabelPackage";
import FeedbackCarInfo from "components/sales/SaleOcar/hooks/useSteps/FeedbackCarInfo";
import { feedbackInfoCarServiceType } from "components/sales/types";

type useInputsProps = {
  useFormResult: UseFormReturn<FieldValues, any>;
  carUsingData: any;
  deductibleData: any;
  orderConfigData: any;
  getCarTypeDataByCarUsing: any;
  carTypeDataByCarUsing: any;
  carBrandDefaultData: any;
  carBrandDataByCarType: any;
  carYearDataByCarBrand: any;
  carYearDataAll: any;
  carLineDataByCarTypeCarBrandCarYear: any;
  carVersionDataByCarLine: any;
  carWeightData: any;
  durationData: any;
  packageCodeData: any;
  pricingPackages: any;
  handleCarValue: any;
  premiumEstOcarLoading: boolean;
  feedbackInfoCarService: feedbackInfoCarServiceType;
  cityData: any;
  cityDataDefault: any;
  handleActiveRegionProvince: any;
};

const listTruck = [
  TRUCK,
  ROMOOC,
  REFRIGERATED,
  OTHER_TRUCKS,
  TRACTOR_CONTAINER,
];

const useInputs = (props: useInputsProps) => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesDownSm = useMediaQuery(theme.breakpoints.down("sm"));

  const getInitValues = useCallback(async () => {
    // car using
    const _carUsing = props.carUsingData?.find(
      (it: any) => it?.selected
    )?.value;

    // car type
    const _carTypeObj = props
      .getCarTypeDataByCarUsing(_carUsing)
      ?.find((it: any) => it?.selected);
    const _carType = _carTypeObj?.value;
    const _refSpecs = _carTypeObj?.refSpecs;

    const _carBrandDefault = props.carBrandDefaultData;
    const _cityDataDefault = props.cityDataDefault;

    // duration
    const _duration = props.durationData?.find(
      (it: any) => it?.selected
    )?.value;

    const _effectiveDate = dayjs().toDate();

    const _expireDate = dayjs(_effectiveDate).add(_duration, "months").toDate();

    // deductible excess
    const _deductibleDataByCarUsingMinConfig = props.deductibleData?.filter(
      (it: any) =>
        _carUsing === COMMERCIAL
          ? it?.value >= props.orderConfigData?.minDeductibleCommercial
          : true
    );

    const _deductibleExcess = _deductibleDataByCarUsingMinConfig?.[0]?.value;

    return {
      [fields.carUsing]: _carUsing,
      [fields.carType]: _carType,
      [fields.refSpecs]: _refSpecs,
      [fields.carBrandDefault]: _carBrandDefault,
      [fields.cityDataDefault]: _cityDataDefault,
      [fields.driverBirthday]: "1980",
      [fields.driverExperience]: 5,
      [fields.activeRegionProvince]: _cityDataDefault,
      [fields.duration]: _duration,
      [fields.effectiveDate]: _effectiveDate,
      [fields.expireDate]: _expireDate,
      [fields.deductibleExcess]: _deductibleExcess,
    };
  }, [
    props.carUsingData,
    props.getCarTypeDataByCarUsing,
    props.durationData,
    props.deductibleData,
  ]); 7

  const getDefaultValues = useCallback(async () => {
    const _initValues = await getInitValues();

    return {
      [fields.carUsing]: _initValues?.[fields.carUsing],
      [fields.carType]: _initValues?.[fields.carType],
      [fields.carBrand]: _initValues?.[fields.carBrandDefault] ? _initValues?.[fields.carBrandDefault] : _initValues?.[fields.carBrand],
      [fields.refSpecs]: _initValues?.[fields.refSpecs],
      // [fields.cityDataDefault]: _initValues?.[fields.cityDataDefault],
      [fields.driverBirthday]: _initValues?.[fields.driverBirthday],
      [fields.driverExperience]: _initValues?.[fields.driverExperience],
      [fields.activeRegionProvince]: _initValues?.[fields.cityDataDefault] ? _initValues?.[fields.cityDataDefault] : _initValues?.[fields.activeRegionProvince],
      [fields.duration]: _initValues?.[fields.duration],
      [fields.effectiveDate]: _initValues?.[fields.effectiveDate],
      [fields.expireDate]: _initValues?.[fields.expireDate],
      [fields.deductibleExcess]: _initValues?.[fields.deductibleExcess],
    };
  }, [getInitValues]);

  useEffect(() => {
    const fetch = async () =>
      props.useFormResult.reset(await getDefaultValues());

    fetch();
  }, [getDefaultValues]);

  return useMemo(
    () => [
      {
        id: fields.carUsing,
        type: "radio",
        label: "Mục đích sử dụng",
        row: true,
        className: classes.areaFull,
        classGroup: classes.classGroupCarUsing,
        validations: ["required"],
        options: props?.carUsingData?.map((it: any) => ({
          value: it?.value,
          label: <RadioLabelBox label={(carUsingMapping as any)[it?.value]} />,
        })),
        onChange: (e: any) => {
          const _value = e?.target?.value;
          const _carType = props.carUsingData
            ?.find((it: any) => it?.value === _value)
            ?.child?.items?.find((it: any) => it?.selected)?.value;

          // deductible excess
          const _deductibleDataByCarUsingMinConfig =
            props.deductibleData?.filter((it: any) =>
              _value === COMMERCIAL
                ? it?.value >= props.orderConfigData?.minDeductibleCommercial
                : true
            );

          // const _deductibleExcess = props.useFormResult?.getValues(
          //   fields?.deductibleExcess
          // )
          //   ? _deductibleDataByCarUsingMinConfig?.find(
          //       (it: any) =>
          //         it?.value ===
          //         props.useFormResult?.getValues(fields?.deductibleExcess)
          //     )?.value || _deductibleDataByCarUsingMinConfig?.[0]?.value
          //   : _deductibleDataByCarUsingMinConfig?.[0]?.value;
          const _deductibleExcess =
            _deductibleDataByCarUsingMinConfig?.[0]?.value;

          props.useFormResult?.setValue(fields.carType, _carType);
          props.useFormResult?.setValue(
            fields.deductibleExcess,
            _deductibleExcess
          );
          props.useFormResult?.setValue(fields.refSpecs, []);
          props.useFormResult?.setValue(fields.carBrand, "");
          props.useFormResult?.setValue(fields.carYear, "");
          props.useFormResult?.setValue(fields.carLine, "");
          props.useFormResult?.setValue(fields.carVersion, "");
          props.useFormResult?.setValue(fields.carSeat, "");
          props.useFormResult?.setValue(fields.carWeight, "");
        },
      },
      {
        id: fields.carType,
        type: "select",
        label: "Loại xe",
        validations: ["required"],
        className: classes.areaFull,
        options: props.carTypeDataByCarUsing?.map((it: any) => ({
          value: it?.value,
          label: it?.name,
        })),
        onChange: (e: any) => {
          const _value = e?.target?.value;

          props.useFormResult?.setValue(
            fields.refSpecs,
            props.carTypeDataByCarUsing?.find((it: any) => it?.value === _value)
              ?.refSpecs
          );

          props.useFormResult?.setValue(fields.carBrand, "");
          props.useFormResult?.setValue(fields.carYear, "");
          props.useFormResult?.setValue(fields.carLine, "");
          props.useFormResult?.setValue(fields.carVersion, "");
          props.useFormResult?.setValue(fields.carSeat, "");
          props.useFormResult?.setValue(fields.carWeight, "");
        },
      },
      {
        id: fields.carBrand,
        type: "autocomplete",
        label: "Hãng xe",
        validations: ["required"],
        options: props.carBrandDataByCarType?.map((it: any) => ({
          value: it?.value,
          label: it?.name,
        })),
        className: matchesDownSm ? classes.areaFull : null,
        onChange: (e: any) => {
          props.useFormResult?.setValue(fields.carYear, "");
          props.useFormResult?.setValue(fields.carLine, "");
          props.useFormResult?.setValue(fields.carVersion, "");
          props.useFormResult?.setValue(fields.carSeat, "");
        },
      },
      {
        id: fields.carYear,
        type: "autocomplete",
        label: "Năm sản xuất",
        validations: ["required"],
        className: matchesDownSm ? classes.areaFull : null,
        options:
          props.carYearDataByCarBrand?.map((v: any) => ({
            value: v,
            label: v,
          })) ||
          props.carYearDataAll?.map((it: any) => ({
            value: it?.value,
            label: it?.name,
          })) ||
          [],
        onChange: (e: any) => {
          props.useFormResult?.setValue(fields.carLine, "");
          props.useFormResult?.setValue(fields.carVersion, "");
          props.useFormResult?.setValue(fields.carSeat, "");
        },
      },
      {
        id: fields.carLine,
        type: "autocomplete",
        label: "Dòng xe",
        validations: ["required"],
        className: matchesDownSm ? classes.areaFull : null,
        options:
          props.carLineDataByCarTypeCarBrandCarYear?.map((it: any) => ({
            value: it?.value,
            label: it?.name,
          })) || [],
        onChange: (e: any) => {
          const _carLineObj = props.carLineDataByCarTypeCarBrandCarYear?.find(
            (it: any) => it?.value === e?.target?.value
          );
          props.useFormResult?.setValue(
            fields.carSeat,
            _carLineObj?.seat || SEAT_DEFAULT
          );

          props.useFormResult?.setValue(fields.carVersion, "");
        },
      },
      {
        id: fields.carVersion,
        type: "autocomplete",
        label: "Phiên bản",
        className: matchesDownSm ? classes.areaFull : null,
        options:
          props.carVersionDataByCarLine?.map((it: any) => ({
            value: it?.value,
            label: it?.name,
          })) || [],
        onChange: (e: any) => {
          props.handleCarValue();
        },
      },
      {
        id: fields.carSeat,
        type: "text",
        label: "Số chỗ ngồi",
        validations: ["required"],
        // disabled: true,
        className: matchesDownSm ? classes.areaFull : null,
      },
      {
        id: "carWeight",
        type: "select",
        label: "Tải trọng",
        validations: ["required"],
        className: matchesDownSm ? classes.areaFull : null,
        hide: !listTruck.includes(
          props.useFormResult?.getValues(fields.carType)
        ),
        options: props.carWeightData?.map((it: any) => ({
          value: it?.value,
          label: it?.name,
        })),
      },
      {
        id: fields.duration,
        type: "select",
        label: "Thời hạn bảo hiểm",
        className: matchesDownSm ? classes.areaFull : undefined,
        options: props.durationData?.map((it: any) => ({
          value: it?.value,
          label: `${it?.value} Tháng`,
        })),
        onChange: ((e: any) => {
          props.useFormResult?.setValue(
            fields.expireDate,
            dayjs(props.useFormResult?.getValues(fields.effectiveDate)).add(
              e?.target?.value,
              "months"
            )
          );
        }) as any,
      },
      {
        id: fields.deductibleExcess,
        type: "select",
        label: "Mức khấu trừ bảo hiểm",
        className: matchesDownSm ? classes.areaFull : undefined,
        options: props.deductibleData
          ?.filter((it: any) =>
            props.useFormResult?.getValues(fields.carUsing) === COMMERCIAL
              ? it?.value >= props.orderConfigData?.minDeductibleCommercial
              : true
          )
          ?.map((it: any) => ({
            value: it?.value,
            label: it?.name,
          })),
      },
      {
        id: fields.carValue,
        type: "currency",
        label: "Giá trị xe",
        className: matchesDownSm ? classes.areaFull : null,
        // disabled: !!props.useFormResult?.getValues(fields.carVersion),
        validations: ["required"],
        onBlur: (e: any) => {
          const _value = e?.target?.value;
          props.useFormResult?.setValue(fields.sumInsurance, _value);
        },
      },
      {
        id: fields.sumInsurance,
        type: "currency",
        label: "Số tiền bảo hiểm",
        className: matchesDownSm ? classes.areaFull : null,
        validations: ["required"],
        onBlur: (e: any) => {
          const _value = e?.target?.value;
        },
      },
      {
        id: fields.driverBirthday,
        label: "Năm sinh",
        type: "date",
        className: matchesDownSm ? classes.areaFull : null,
        validations: ["required", "date", "dateRanger"],
        variant: "year",
        min: dayjs().startOf("days").subtract(80, "years").toDate(),
        max: dayjs().startOf("days").subtract(18, "years").toDate(),
      },
      {
        id: fields.driverExperience,
        label: "Số năm kinh nghiệm lái xe",
        type: "text",
        helperText:
          "* Số năm kinh nghiệm lái xe sẽ ảnh hưởng đến mức phí bảo hiểm",
        className: matchesDownSm ? classes.areaFull : null,
        // hide: props.useFormResult.getValues(fields.ownerIsDriver),
        validations: ["required", "numberRanger"],
        min: 1,
        max: (values: any) => {
          return (
            dayjs().diff(dayjs(values?.[fields.driverBirthday]), "years") -
            18 || 1
          );
        },
        // onChange: (e: any) => {
        //   props.useFormResult?.setValue(
        //     fields.ownerExperience,
        //     e?.target?.value
        //   );
        // },
      },
      {
        id: fields.activeRegionProvince,
        label: "Khu vực xe hoạt động chính",
        type: "autocomplete",
        options:
          props.cityData?.map((it: any) => ({
            value: it?.code,
            label: it?.name,
          })) || [],
        validations: ["required"],
        className: matchesDownSm ? classes.areaFull : undefined,
      },
      {
        id: "feeback",
        type: "custom",
        className: classes.areaFull,
        custom: (
          <FeedbackCarInfo
            open={props.useFormResult?.getValues(fields.feedbackInfoCar)}
            data={props.useFormResult.getValues()}
            carBrandDataByCarType={props.carBrandDataByCarType}
            carLineDataByCarTypeCarBrandCarYear={
              props.carLineDataByCarTypeCarBrandCarYear
            }
            carVersionDataByCarLine={props.carVersionDataByCarLine}
            carYearDataAll={props.carYearDataAll}
            feedbackInfoCarService={props.feedbackInfoCarService}
          />
        ),
      },
      {
        id: "btn",
        type: "custom",
        className: classes.areaFull,
        custom: (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button type="submit" color="secondary">
              Tính phí
            </Button>
          </div>
        ),
      },
      {
        id: fields.pkgCode,
        type: "radio",
        label: "Gói bảo hiểm",
        options: props.packageCodeData?.map((it: any) => ({
          value: it?.pkgCode,
          label: (
            <RadioLabelPackage
              icon={
                <img
                  src={(packageIconMapping as any)?.[it?.pkgCode]}
                  alt={(packageIconMapping as any)?.[it?.pkgCode]}
                />
              }
              loading={props.premiumEstOcarLoading}
              discountAmount={
                props.pricingPackages?.[it?.pkgCode]?.totalDiscount
              }
              price={props.pricingPackages?.[it?.pkgCode]?.totalPremium}
              title={it?.pkgName}
              coverages={it?.displayInfo?.map((df: any, i: number) => {
                const _df = { ...df };

                if (_df?.type === "CAR_ADD_ON") {
                  _df.content = _df?.texts
                    ?.filter(
                      (t: any) =>
                        !!props.pricingPackages?.[it?.pkgCode]?.coverages?.[
                        t?.covCode
                        ]
                    )
                    ?.map((t: any) => t?.text)
                    ?.join("\n");
                } else {
                  _df.content = _df?.texts
                    ?.map((t: any) => t?.text)
                    ?.join("\n");
                }

                if (
                  it?.pkgCode === props.useFormResult.getValues(fields.pkgCode)
                ) {
                  _df.expanded = true;
                }
                return _df;
              })}
            />
          ),
        })),
        className: classes.areaFull,
      },
    ],
    [
      matchesDownSm,
      props?.carUsingData,
      props.deductibleData,
      props.orderConfigData,
      props.carTypeDataByCarUsing,
      props.carBrandDataByCarType,
      props.carYearDataByCarBrand,
      props.carYearDataAll,
      props.carLineDataByCarTypeCarBrandCarYear,
      props.carVersionDataByCarLine,
      props.carWeightData,
      props.packageCodeData,
      props.pricingPackages,
      props.useFormResult?.watch(fields.carType),
      // props.useFormResult?.watch(fields.carVersion),
      props.useFormResult?.watch(fields.pkgCode),
      props.useFormResult?.watch(fields.feedbackInfoCar),
      props.premiumEstOcarLoading,
      props.handleCarValue,
      props.feedbackInfoCarService,
      props.cityData,
      props.handleActiveRegionProvince,
    ]
  );
};

export default useInputs;
