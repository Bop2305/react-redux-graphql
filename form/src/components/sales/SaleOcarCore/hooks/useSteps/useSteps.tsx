import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import dayjs from "dayjs";
import { useTheme } from "@mui/styles";
import { Divider, InputLabel, Typography, useMediaQuery } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Countdown, { CountdownTimeDelta } from "react-countdown";
import ClearIcon from "../../../../icons/ClearIcon";

import {
  carUsingMapping,
  carUsingMappingCore,
  genderMapping,
  packageIconMapping,
  paymentMethodIconMapping,
  paymentMethodMapping,
} from "helper/mapping";
import convertStringToDate from "helper/converts/convertStringToDate";
import convertStringToDayjs from "helper/converts/convertStringToDayjs";
import { deviceDetect } from "helper/detectDevice";
import {
  COMMERCIAL,
  FRONT_LEFT_VIEW,
  FRONT_RIGHT_VIEW,
  OTHER_TRUCKS,
  REAR_LEFT_VIEW,
  REAR_RIGHT_VIEW,
  REFRIGERATED,
  ROMOOC,
  SEAT_DEFAULT,
  TRACTOR_CONTAINER,
  TRUCK,
} from "helper/const";
import {
  invoiceIsCompanyOptions,
  paymentMethodLoadingOptions,
  vehicleRegisterOptions,
} from "helper/options";
import convertCurrency from "helper/converts/convertCurrency";
import RadioLabelPackage from "components/inputs/InputRadio/radioLabels/RadioLabelPackage";
import ImageInspection from "components/ImageInspection";
import RadioLabelBox from "components/inputs/InputRadio/radioLabels/RadioLabelBox";
import CheckboxLabelRule from "components/inputs/InputCheckbox/checkBoxLabels/CheckboxLabelRule";
import SummaryInfo from "components/SummaryInfo";
import TotalFee from "components/TotalFee";
import RadioLabelPaymentMethod from "components/inputs/InputRadio/radioLabels/RadioLabelPaymentMethod";
import RadioLabelPaymentMethodLong from "components/inputs/InputRadio/radioLabels/RadioLabelPaymentMethodLong";
import Coupons from "components/sales/common/Coupons";
import useStylesInputRadio from "components/inputs/InputRadio/useStylesInputRadio";

import useStyles from "../useStyles";
import fields from "../../help/fields";
import {
  defaultValuesType,
  feedbackInfoCarServiceType,
  getCarInspectionResultServiceType,
  getCouponsType,
  submitCarInspectionImageServiceType,
} from "../../../types";
import FeedbackCarInfo from "./FeedbackCarInfo";
import TitleInfo from "./TitleInfo";
import QrCapture from "./QrCapture";
import ConfirmInfoField from "./ConfirmInfoField";
import TakePhotoGuide from "../../TakePhotoGuide";
import CountDownRenderer from "../../../../Countdown/CountDownRenderer";
import RadioLabelRadius from "components/inputs/InputRadio/radioLabels/RadioLabelRadius";
import Ocr from "./Ocr";

type useStepsProps = {
  useFormResult: UseFormReturn<FieldValues, any>;
  // service
  feedbackInfoCarService: feedbackInfoCarServiceType;
  submitCarInspectionImageService: submitCarInspectionImageServiceType;
  getCarInspectionResultService: getCarInspectionResultServiceType;
  getCouponsService: getCouponsType;
  // init order data
  pendingOrderData: any;
  carUsingData: any;
  getCarTypeDataByCarUsing: (value: any) => any;
  carTypeDataByCarUsing: any;
  carYearDataAll?: any;
  carWeightData: any;
  genderData: any;
  durationData: any;
  orderConfigData: any;
  deductibleData: any;
  packageCodeData: any;
  // province data
  cityData: any;
  // car data
  carBrandData: any;
  // getCarBrandDataByRefSpecs: (value: any) => any;
  // carBrandDataByRefSpecs: any;
  getCarBrandDataByCarType: (value: any) => any;
  carBrandDataByCarType: any;
  carYearDataByCarBrand: any;
  // getCarLineDataByCarTypeCarBrandCarYear: (
  //   carType: any,
  //   carBrand: any,
  //   carYear: any
  // ) => any;
  carLineDataByCarTypeCarBrandCarYear: any;
  carVersionDataByCarLine: any;
  // save order
  savePlaceOrderHandle: (e?: any) => any;
  savePlaceOrderLoading: boolean;
  pricingPackages: any;
  // create pool
  poolId: string;
  // get payment info
  getPaymentInfoQuery: any;
  // other
  currentEndpoint?: string;
  domainLinkFile: string;
  onlyCapture?: boolean;
  discountCodes?: string;
  onlyCarUsingBusiness?: unknown;
  isVpbStaff?: boolean;
  isShowCountdown: boolean;
  setIsShowCountDown: (value: boolean) => void;
  limitTimeToCheckCoupon?: number; //millisecond
  localstorageCouponCountdownKey: string;
  showHasBankLoan?: boolean;
  notRequireCapture?: boolean;
  saleCode?: string;
  defaultValues?: defaultValuesType;
  blocked?: boolean;
  backendUpdateOrder?: boolean;
  onTplEffectiveDateClick?: () => void;
  setIsOpenDialogConfirmOffTplBundle: (value: boolean) => void;
  resourceCode: string;
  showBen?: boolean;
  saleNoPlate?: boolean;
  ocrService: any;
  // carsData: any;
};

const useSteps = (props: useStepsProps) => {
  const classesInputRadio = useStylesInputRadio();
  const classes = useStyles();
  const theme = useTheme();
  const matchesDownSm = useMediaQuery(theme.breakpoints.down("sm"));
  const [isMobile, setIsMobile] = useState(false);
  const [openCoupon, setOpenCoupon] = useState({ open: false, focus: true });
  const listTruck = [
    TRUCK,
    ROMOOC,
    REFRIGERATED,
    OTHER_TRUCKS,
    TRACTOR_CONTAINER,
  ];

  const getInitValues = useCallback(async () => {
    // car using
    const _carUsing = props.carUsingData?.find((it: any) => props.pendingOrderData?.orderContent?.businessUsing == it?.value)?.value;

    // car type
    const _carTypeObj = props
      .getCarTypeDataByCarUsing(_carUsing)
      ?.find((it: any) =>
        props.pendingOrderData?.orderContent?.vehicleType === it?.value
      );

    const _carType = _carTypeObj?.value;
    const _refSpecs = _carTypeObj?.refSpecs;

    // car brand
    const _carBrandObj = props
      // .getCarBrandDataByRefSpecs(_refSpecs)
      .getCarBrandDataByCarType(_carType)
      ?.find((it: any) => it?.selected);
    const _carBrand = _carBrandObj?.value;

    // car line
    const _resCarLineDataByCarTypeCarBrandCarYear = undefined;

    const _carLineDataByCarTypeCarBrandCarYear = (
      _resCarLineDataByCarTypeCarBrandCarYear as any
    )?.content;
    const _carLineObj = _carLineDataByCarTypeCarBrandCarYear?.find(
      (it: any) => props.pendingOrderData?.orderContent?.vehicleLineCode == it.value
    );

    const _carLine = _carLineObj?.value;

    // car version
    const _carVersionObj = props
      .carVersionDataByCarLine
      ?.find((it: any) => it?.selected);

    // car weight
    const _carWeight = props.carWeightData?.find(
      (it: any) => it?.selected
    )?.value;

    // gender
    const _driverGender = props.genderData?.find(
      (it: any) => props.pendingOrderData?.orderContent?.driverGender == it.value
    )?.value || props.genderData[0].value;

    // duration
    const _duration = props.durationData?.find(
      (it: any) => it?.value == props.pendingOrderData?.orderContent
        ?.duration
    )?.value || 1;

    // deductible excess
    const _deductibleDataByCarUsingMinConfig = props.deductibleData?.filter(
      (it: any) =>
        _carUsing === COMMERCIAL
          ? it?.value >= props.orderConfigData?.minDeductibleCommercial
          : true
    );

    let _deductibleExcess = 1;
    if (_carType === 1000022 || _carType === 1000023) {
      _deductibleExcess = 2
    }

    // const _deductibleExcess = props.pendingOrderData?.orderContent
    //   ?.deductibleExcess
    //   ? _deductibleDataByCarUsingMinConfig?.find(
    //     (it: any) =>
    //       it?.value === props.pendingOrderData?.orderContent?.deductibleExcess
    //   )?.value || _deductibleDataByCarUsingMinConfig?.[0]?.value
    //   : _deductibleDataByCarUsingMinConfig?.[0]?.value;

    // pkg code
    // const _pkgCode = props.packageCodeData?.find(
    //   (it: any) => it?.isSelected
    // )?.pkgCode;

    // ben
    const _hasBen = props.pendingOrderData?.orderContent?.hasBen;
    let _beneficiaries;
    if (_hasBen) {
      _beneficiaries = props.pendingOrderData?.orderContent?.beneficiaries;
    }

    const _vehicleIsNew = props.pendingOrderData?.orderContent?.vehicleIsNew;

    return {
      [fields.carUsing]: _carUsing,
      [fields.carType]: _carType,
      [fields.refSpecs]: _refSpecs,
      [fields.carBrand]: _carBrand,
      [fields.carBrandName]: _carBrandObj?.name,
      [fields.carLine]: _carLine,
      [fields.carLineName]: _carLineObj?.name,
      [fields.carVersion]: _carVersionObj?.value,
      [fields.carVersionName]: _carVersionObj?.name,
      [fields.carSeat]: _carLineObj?.seat,
      [fields.carWeight]: _carWeight,
      [fields.driverGender]: _driverGender,
      [fields.duration]: _duration,
      [fields.deductibleExcess]: _deductibleExcess,
      [fields.pkgCode]: props.pendingOrderData?.orderContent?.pkgCode || "",
      [fields.discountCode]: props.discountCodes,
      [fields.hasBen]: _hasBen,
      [fields.beneficiaries]: _beneficiaries,
      // [fields.carRegister]:
      //   _vehicleIsNew === true ? false : _vehicleIsNew == false ? true : true,
      [fields.carRegister]: true,
      [fields.carChassisNo]:
        props.pendingOrderData?.orderContent?.vehicleChassisNo,
      [fields.carEngineNo]:
        props.pendingOrderData?.orderContent?.vehicleEngineNo,
      [fields.carNewPlateNoDate]: props.pendingOrderData?.orderContent
        ?.vehicleNewPlateNoDate
        ? convertStringToDate(
          props.pendingOrderData?.orderContent?.vehicleNewPlateNoDate,
          "DD-MM-YYYY"
        )
        : null,

      [fields.invoiceExport]:
        props.pendingOrderData?.orderContent?.invoiceExport === undefined ||
          props.pendingOrderData?.orderContent?.invoiceExport === null
          ? false
          : props.pendingOrderData?.orderContent?.invoiceExport,
      [fields.invoiceIsCompany]:
        props.pendingOrderData?.orderContent?.invoiceIsCompany === undefined ||
          props.pendingOrderData?.orderContent?.invoiceIsCompany === null
          ? invoiceIsCompanyOptions[0].value
          : props.pendingOrderData?.orderContent?.invoiceIsCompany,
    };
  }, [
    props.pendingOrderData?.orderContent?.businessUsing,
    props.pendingOrderData?.orderContent?.vehicleType,
    props.orderConfigData?.minDeductibleCommercial,
    props.pendingOrderData?.orderContent?.deductibleExcess,
    props.pendingOrderData?.orderContent?.hasBen,
    props.pendingOrderData?.orderContent?.beneficiaries,
    props.pendingOrderData?.orderContent?.vehicleIsNew,
    props.pendingOrderData?.orderContent?.vehicleChassisNo,
    props.pendingOrderData?.orderContent?.vehicleEngineNo,
    props.pendingOrderData?.orderContent?.vehicleNewPlateNoDate,
    props.carUsingData,
    props.carWeightData,
    props.genderData,
    props.durationData,
    props.deductibleData,
    // props.packageCodeData,
    props.discountCodes,
    props.pendingOrderData?.orderContent?.invoiceExport,
    props.pendingOrderData?.orderContent?.invoiceIsCompany,
    props.getCarTypeDataByCarUsing,
    // props.getCarBrandDataByRefSpecs,
    props.getCarBrandDataByCarType,
    // props.getCarLineDataByCarTypeCarBrandCarYear,
  ]);

  const getDefaultValues = useCallback(async () => {
    const _initValues = await getInitValues();

    const _effectiveDate = props.pendingOrderData?.orderContent?.effectiveDate
      ? dayjs()
        .startOf("days")
        .diff(
          (
            convertStringToDayjs(
              props.pendingOrderData?.orderContent?.effectiveDate,
              "DD-MM-YYYY"
            ) as any
          )?.startOf("days"),
          "days"
        ) > 0
        ? dayjs().toDate()
        : convertStringToDate(
          props.pendingOrderData?.orderContent?.effectiveDate,
          "DD-MM-YYYY"
        )
      : dayjs().toDate();

    const _duration =
      props.pendingOrderData?.orderContent?.duration ||
      _initValues?.[fields.duration];

    let month = props.durationData.find((item: any) => item.value === _duration)?.label || 12;

    return {
      [fields.hasBankLoan]: props.pendingOrderData?.orderContent?.hasBankLoan,
      [fields.loanContractNo]:
        props.pendingOrderData?.orderContent?.loanContractNo,
      [fields.carUsing]: _initValues?.[fields.carUsing],
      [fields.carType]: _initValues?.[fields.carType],
      [fields.refSpecs]: _initValues?.[fields.refSpecs],
      [fields.carBrand]:
        props.pendingOrderData?.orderContent?.vehicleBrandCode ||
        _initValues?.[fields.carBrand],
      [fields.carBrandName]:
        props.pendingOrderData?.orderContent?.vehicleBrand ||
        _initValues?.[fields.carBrandName],
      [fields.carYear]: props.pendingOrderData?.orderContent?.vehicleYear,
      [fields.carLine]:
        props.pendingOrderData?.orderContent?.vehicleLineCode ||
        _initValues?.[fields.carLine],
      [fields.carLineName]:
        props.pendingOrderData?.orderContent?.vehicleLine ||
        _initValues?.[fields.carLineName],
      [fields.carVersion]:
        props.pendingOrderData?.orderContent?.vehicleSpecCode ||
        _initValues?.[fields.carVersion],
      [fields.carVersionName]:
        props.pendingOrderData?.orderContent?.vehicleSpec ||
        _initValues?.[fields.carVersionName],
      [fields.carSeat]:
        props.pendingOrderData?.orderContent?.vehicleSeatCount ||
        _initValues?.[fields.carSeat],
      [fields.carWeight]:
        props.pendingOrderData?.orderContent?.vehicleWeightCode ||
        _initValues?.[fields.carWeight],
      [fields.carPlateNo]: props.pendingOrderData?.orderContent?.vehiclePlateNo,
      [fields.ownerIsDriver]: [null, undefined, ""].includes(
        props.pendingOrderData?.orderContent?.ownerIsDriver
      )
        ? true
        : !!props.pendingOrderData?.orderContent?.ownerIsDriver,
      [fields.ownerFullName]:
        props.defaultValues?.ownerFullName ||
        props.pendingOrderData?.orderContent?.ownerName,
      [fields.ownerBirthday]: convertStringToDate(
        props.defaultValues?.ownerBirthday ||
        props.pendingOrderData?.orderContent?.ownerBirthday,
        "DD-MM-YYYY"
      ),
      [fields.ownerGender]:
        props.pendingOrderData?.orderContent?.driverGender ||
        _initValues?.[fields.driverGender],
      [fields.ownerIdNo]:
        props.defaultValues?.ownerIdNo ||
        props.pendingOrderData?.orderContent?.ownerId,
      [fields.ownerPhoneNumber]:
        props.defaultValues?.ownerPhoneNumber ||
        props.pendingOrderData?.orderContent?.ownerPhone,
      [fields.ownerEmail]:
        props.defaultValues?.ownerEmail ||
        props.pendingOrderData?.orderContent?.ownerEmail,
      [fields.ownerExperience]:
        props.pendingOrderData?.orderContent?.driverExperience,
      [fields.driverGender]:
        props.pendingOrderData?.orderContent?.driverGender ||
        _initValues?.[fields.driverGender],
      [fields.driverExperience]:
        props.pendingOrderData?.orderContent?.driverExperience,
      [fields.driverFullName]:
        props.pendingOrderData?.orderContent?.driverFullName,
      [fields.driverBirthday]: convertStringToDate(
        props.pendingOrderData?.orderContent?.driverBirthday,
        "DD-MM-YYYY"
      ),
      [fields.driverPhoneNumber]:
        props.pendingOrderData?.orderContent?.driverPhone,
      [fields.activeRegionProvince]:
        props.pendingOrderData?.orderContent?.activeRegionProvinceCode,
      [fields.activeRegionProvinceName]:
        props.pendingOrderData?.orderContent?.activeRegionProvince,
      [fields.duration]: _duration,
      [fields.effectiveDate]: _effectiveDate,
      [fields.expireDate]: dayjs(_effectiveDate)
        .add(month, "months")
        .toDate(),
      [fields.carValue]: props.pendingOrderData?.orderContent?.estCarValue,
      [fields.sumInsurance]: props.pendingOrderData?.orderContent?.sumInsurance,
      [fields.deductibleExcess]: _initValues?.[fields.deductibleExcess],
      // [fields.pkgCode]:
      //   props.pendingOrderData?.orderContent?.pkgCode ||
      //   _initValues?.[fields.pkgCode],
      [fields.pkgCode]: "1000005",
      [fields.discountCode]: _initValues?.[fields.discountCode],
      [fields.saleCode]: props.saleCode,
      [fields.hasTplBundle]: props.pendingOrderData?.orderContent?.hasTplBundle,
      [fields.hasBen]: _initValues?.[fields.hasBen],
      [fields.beneficiaries]: _initValues?.[fields.beneficiaries],
      [fields.carRegister]: _initValues?.[fields.carRegister],
      [fields.carChassisNo]: _initValues?.[fields.carChassisNo],
      [fields.carEngineNo]: _initValues?.[fields.carEngineNo],
      [fields.carNewPlateNoDate]: _initValues?.[fields.carNewPlateNoDate],

      [fields.invoiceExport]: _initValues?.[fields.invoiceExport],
      [fields.invoiceIsCompany]: _initValues?.[fields.invoiceIsCompany],
      [fields.invoiceCompanyName]:
        props.pendingOrderData?.orderContent?.invoiceCompanyName,
      [fields.invoiceBuyerName]:
        props.pendingOrderData?.orderContent?.invoiceBuyerName,
      [fields.invoiceTaxCode]:
        props.pendingOrderData?.orderContent?.invoiceTaxCode,
      [fields.invoiceEmail]: props.pendingOrderData?.orderContent?.invoiceEmail,
      [fields.invoiceAddress]:
        props.pendingOrderData?.orderContent?.invoiceAddress,
      [fields.inspections]: []
    };
  }, [
    // order data
    props.pendingOrderData?.orderContent?.hasBankLoan,
    props.pendingOrderData?.orderContent?.loanContractNo,
    props.pendingOrderData?.orderContent?.vehicleBrandCode,
    props.pendingOrderData?.orderContent?.vehicleBrand,
    props.pendingOrderData?.orderContent?.vehicleYear,
    props.pendingOrderData?.orderContent?.vehicleLineCode,
    props.pendingOrderData?.orderContent?.vehicleLine,
    props.pendingOrderData?.orderContent?.vehicleSpecCode,
    props.pendingOrderData?.orderContent?.vehicleSpec,
    props.pendingOrderData?.orderContent?.vehicleSeatCount,
    props.pendingOrderData?.orderContent?.vehicleWeightCode,
    props.pendingOrderData?.orderContent?.vehiclePlateNo,
    props.pendingOrderData?.orderContent?.ownerIsDriver,
    props.pendingOrderData?.orderContent?.ownerName,
    props.pendingOrderData?.orderContent?.ownerBirthday,
    props.pendingOrderData?.orderContent?.ownerId,
    props.pendingOrderData?.orderContent?.ownerPhone,
    props.pendingOrderData?.orderContent?.ownerEmail,
    props.pendingOrderData?.orderContent?.driverGender,
    props.pendingOrderData?.orderContent?.driverExperience,
    props.pendingOrderData?.orderContent?.driverFullName,
    props.pendingOrderData?.orderContent?.driverBirthday,
    props.pendingOrderData?.orderContent?.driverPhone,
    props.pendingOrderData?.orderContent?.activeRegionProvinceCode,
    props.pendingOrderData?.orderContent?.activeRegionProvince,
    props.pendingOrderData?.orderContent?.duration,
    props.pendingOrderData?.orderContent?.effectiveDate,
    props.pendingOrderData?.orderContent?.estCarValue,
    props.pendingOrderData?.orderContent?.sumInsurance,
    props.pendingOrderData?.orderContent?.pkgCode,
    props.saleCode,
    props.pendingOrderData?.orderContent?.hasTplBundle,

    props.pendingOrderData?.orderContent?.invoiceCompanyName,
    props.pendingOrderData?.orderContent?.invoiceBuyerName,
    props.pendingOrderData?.orderContent?.invoiceTaxCode,
    props.pendingOrderData?.orderContent?.invoiceEmail,
    props.pendingOrderData?.orderContent?.invoiceAddress,
    // init values
    getInitValues,
    props.defaultValues,
  ]);

  useEffect(() => {
    const fetch = async () =>
      props.useFormResult.reset(await getDefaultValues());

    fetch();
  }, [getDefaultValues]);

  useEffect(() => {
    setIsMobile(deviceDetect().isMobile);
  }, [setIsMobile]);

  useEffect(() => {
    if (localStorage?.getItem(props.localstorageCouponCountdownKey)) {
      props.setIsShowCountDown(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fee = useMemo(() => {
    let _fee = props.packageCodeData?.find((item: any) => item.pkgCode == props.useFormResult.getValues(fields.pkgCode))?.totalPremium;
    // let _fee =
    //   props.packageCodeData?.[props.useFormResult.getValues(fields.pkgCode)]
    //     ?.totalPremium -
    //   (props.pricingPackages?.[props.useFormResult.getValues(fields.pkgCode)]
    //     ?.totalDiscount || 0);

    // if (props.useFormResult.getValues(fields.hasTplBundle)) {
    //   _fee += props.useFormResult.getValues(fields.tplTotalPremium);
    // }
    //
    return _fee;
  }, [
    props.packageCodeData,
    props.useFormResult.watch(fields.pkgCode),
    // props.useFormResult.watch(fields.hasTplBundle),
    // props.useFormResult.watch(fields.tplTotalPremium),
  ]);

  // const oldFee = useMemo(() => {
  //   let _oldFee = !!props.pricingPackages?.[
  //     props.useFormResult.getValues(fields.pkgCode)
  //   ]?.totalDiscount
  //     ? props.pricingPackages?.[props.useFormResult.getValues(fields.pkgCode)]
  //       ?.totalPremium
  //     : 0;

  //   if (props.useFormResult.getValues(fields.hasTplBundle) && _oldFee) {
  //     _oldFee += props.useFormResult.getValues(fields.tplTotalPremium);
  //   }

  //   return _oldFee;
  // }, [
  //   props.pricingPackages,
  //   props.useFormResult.watch(fields.pkgCode),
  //   props.useFormResult.watch(fields.hasTplBundle),
  //   props.useFormResult.watch(fields.tplTotalPremium),
  // ]);

  // console.log("carYearExternalCode: ", props.useFormResult?.watch(fields.carYearExternalCode));

  const onChangeInspections = (file: any, tag: any) => {
    let listInspection = props.useFormResult?.getValues(fields.inspections);
    if (listInspection && file) {
      let findIndexView = listInspection.findIndex((item: any) => item.tags === tag);
      if (findIndexView > -1) {
        listInspection.splice(findIndexView, 1, file);
      } else {
        listInspection = [...listInspection, file];
      }

      props.useFormResult?.setValue(
        fields.inspections,
        listInspection
      );
    }

  }

  return useMemo(() => {
    const _steps = [
      {
        title: "Thông tin xe",
        screens: [
          {
            inputsConfig: [
              // {
              //   id: "ocr",
              //   type: "custom",
              //   className: classes.areaFull,
              //   custom: <Ocr ocrService={props.ocrService} />,
              //   onChange: (e: any) => {
              //     props.useFormResult?.setValue(
              //       fields.ownerFullName,
              //       e?.target?.value?.content?.ownerName
              //     );
              //     props.useFormResult?.setValue(
              //       fields.carPlateNo,
              //       e?.target?.value?.content?.idNoPlate
              //     );
              //     props.useFormResult?.setValue(
              //       fields.carChassisNo,
              //       e?.target?.value?.content?.chassisNo
              //     );
              //     props.useFormResult?.setValue(
              //       fields.carEngineNo,
              //       e?.target?.value?.content?.engineNo
              //     );
              //   },
              // },
              {
                id: "onlyCarUsingBusiness",
                type: "custom",
                hide: !props.onlyCarUsingBusiness,
                className: classes.onlyCarUsingBusinessField,
                custom: (
                  <div className={classes.onlyCarUsingBusinessBlock}>
                    <span className={classes.onlyCarUsingBusinessText}>
                      Dành cho xe không kinh doanh vận tải
                    </span>
                  </div>
                ),
              },
              {
                id: fields.carUsing,
                type: "radio",
                label: "Mục đích sử dụng",
                row: true,
                className: classes.areaFull,
                classGroup: classes.classGroupCarUsing,
                validations: ["required"],
                hide: !!props.onlyCarUsingBusiness,
                options: props?.carUsingData || [],
                onChange: (e: any) => {
                  const _value = e?.target?.value;
                  // const _carType = props.carUsingData
                  //   ?.find((it: any) => it?.value === _value)
                  //   ?.child?.items?.find((it: any) => it?.selected)?.value;

                  // deductible excess
                  const _deductibleDataByCarUsingMinConfig =
                    props.deductibleData?.filter((it: any) =>
                      _value === COMMERCIAL
                        ? it?.value >=
                        props.orderConfigData?.minDeductibleCommercial
                        : true
                    );

                  const _deductibleExcess =
                    _deductibleDataByCarUsingMinConfig?.[0]?.value;

                  // props.useFormResult?.setValue(fields.carType, _carType);
                  props.useFormResult?.setValue(
                    fields.deductibleExcess,
                    _deductibleExcess
                  );
                  props.useFormResult?.setValue(fields.refSpecs, []);
                  props.useFormResult?.setValue(fields.carBrand, "");
                  props.useFormResult?.setValue(fields.carBrandName, "");
                  props.useFormResult?.setValue(fields.carYear, "");
                  props.useFormResult?.setValue(fields.carLine, "");
                  props.useFormResult?.setValue(fields.carLineName, "");
                  props.useFormResult?.setValue(fields.carVersion, "");
                  props.useFormResult?.setValue(fields.carVersionName, "");
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
                options: props.carTypeDataByCarUsing || [],
                onChange: (e: any) => {
                  const _value = e?.target?.value;

                  if (_value === 1000022 || _value === 1000023) {
                    props.useFormResult?.setValue(
                      fields.deductibleExcess, 2
                    );
                  } else {
                    props.useFormResult?.setValue(
                      fields.deductibleExcess, 1
                    );
                  }

                  props.useFormResult?.setValue(fields.carBrand, "");
                  props.useFormResult?.setValue(fields.carBrandName, "");
                  props.useFormResult?.setValue(fields.carYear, "");
                  props.useFormResult?.setValue(fields.carLine, "");
                  props.useFormResult?.setValue(fields.carLineName, "");
                  props.useFormResult?.setValue(fields.carVersion, "");
                  props.useFormResult?.setValue(fields.carVersionName, "");
                  props.useFormResult?.setValue(fields.carSeat, "");
                  props.useFormResult?.setValue(fields.carWeight, "");
                },
              },
              {
                id: "carBrand",
                type: "autocomplete",
                label: "Hãng xe",
                validations: ["required"],
                options: props.carBrandDataByCarType?.map((it: any) => ({
                  value: it?.value,
                  label: it?.name,
                })),
                className: matchesDownSm ? classes.areaFull : null,
                onChange: (e: any) => {
                  props.useFormResult?.setValue(
                    "carBrandName",
                    // props.carBrandDataByRefSpecs?.find(
                    //   (it: any) => it?.value === e?.target?.value
                    // )?.name
                    props.carBrandDataByCarType?.find(
                      (it: any) => it?.value === e?.target?.value
                    )?.name
                  );
                  props.useFormResult?.setValue(fields.carYear, "");
                  props.useFormResult?.setValue(fields.carLine, "");
                  props.useFormResult?.setValue(fields.carLineName, "");
                  props.useFormResult?.setValue(fields.carVersion, "");
                  props.useFormResult?.setValue(fields.carVersionName, "");
                  props.useFormResult?.setValue(fields.carSeat, "");
                },
              },
              {
                id: "carYear",
                type: "autocomplete",
                label: "Năm sản xuất",
                validations: ["required"],
                className: matchesDownSm ? classes.areaFull : null,
                options: props.carYearDataByCarBrand || [],
                onChange: (e: any) => {
                  props.useFormResult?.setValue(
                    fields.carYearExternalCode,
                    // props.carBrandDataByRefSpecs?.find(
                    //   (it: any) => it?.value === e?.target?.value
                    // )?.name
                    props.carYearDataByCarBrand?.find(
                      (it: any) => it?.value === e?.target?.value
                    )?.externalCode
                  );
                  props.useFormResult?.setValue(fields.carLine, "");
                  props.useFormResult?.setValue(fields.carLineName, "");
                  props.useFormResult?.setValue(fields.carVersion, "");
                  props.useFormResult?.setValue(fields.carVersionName, "");
                  props.useFormResult?.setValue(fields.carSeat, "");
                },
              },
              {
                id: "carLine",
                type: "autocomplete",
                label: "Dòng xe",
                validations: ["required"],
                className: matchesDownSm ? classes.areaFull : null,
                options:
                  props.carLineDataByCarTypeCarBrandCarYear || [],
                onChange: (e: any) => {
                  const _carLineObj =
                    props.carLineDataByCarTypeCarBrandCarYear?.find(
                      (it: any) => it?.value === e?.target?.value
                    );
                  props.useFormResult?.setValue(
                    fields.carLineName,
                    _carLineObj?.label
                  );
                  props.useFormResult?.setValue(
                    fields.carSeat,
                    _carLineObj?.passenger || SEAT_DEFAULT
                  );

                  props.useFormResult?.setValue(fields.carVersion, "");
                  props.useFormResult?.setValue(fields.carVersionName, "");
                },
              },
              {
                id: "carVersion",
                type: "autocomplete",
                label: "Phiên bản",
                validations: ["required"],
                className: matchesDownSm ? classes.areaFull : null,
                options:
                  props.carVersionDataByCarLine || [],
                onChange: (e: any) => {
                  props.useFormResult?.setValue(
                    fields.carVersionName,
                    props.carVersionDataByCarLine?.find(
                      (it: any) => it?.value === e?.target?.value
                    )?.label
                  );

                  props.useFormResult?.setValue(fields.carVersionChanged, true);
                  props.useFormResult?.setValue(fields.carValue, props.carVersionDataByCarLine?.find(
                    (it: any) => it?.value === e?.target?.value
                  )?.carValue);
                  props.useFormResult?.setValue(fields.sumInsurance, props.carVersionDataByCarLine?.find(
                    (it: any) => it?.value === e?.target?.value
                  )?.carValue);
                },
              },
              {
                id: "carSeat",
                type: "text",
                label: "Số chỗ ngồi",
                validations: ["required"],
                disabled: true,
                className: matchesDownSm ? classes.areaFull : null,
              },
              {
                id: "carWeight",
                type: "select",
                label: "Tải trọng",
                validations: ["required"],
                className: matchesDownSm ? classes.areaFull : null,
                // hide: !props.useFormResult
                //   ?.getValues(fields.refSpecs)
                //   ?.find((v: any) => v?.indexOf(TRUCK) !== -1),
                hide: !listTruck.includes(
                  props.useFormResult?.getValues(fields.carType)
                ),
                options: props.carWeightData?.map((it: any) => ({
                  value: it?.value,
                  label: it?.name,
                })),
              },
              // {
              //   id: fields.carRegister,
              //   type: "radio",
              //   row: true,
              //   classGroup: classesInputRadio.classRadioGroupRadius,
              //   classItem: classesInputRadio.classRadioRadius,
              //   className: classes.carRegister,
              //   label: (
              //     <span style={{ color: theme.palette.common.white }}>
              //       carRegister
              //     </span>
              //   ),
              //   options: vehicleRegisterOptions?.map((it: any) => ({
              //     ...it,
              //     label: <RadioLabelRadius label={it?.label} />,
              //   })),
              //   // disabled: !props.saleNoPlate,
              //   disabled: true,
              //   onChange: props.saleNoPlate
              //     ? (e: any) => {
              //       const _value = e?.target?.value;

              //       if (!_value) {
              //         props.useFormResult?.setValue(fields.carPlateNo, "");
              //       } else {
              //         props.useFormResult?.setValue(fields.carChassisNo, "");
              //         props.useFormResult?.setValue(fields.carEngineNo, "");
              //         props.useFormResult?.setValue(
              //           fields.carNewPlateNoDate,
              //           null
              //         );
              //       }
              //     }
              //     : () => { },
              // },
              {
                id: fields.carNewPlateNoDate,
                type: "date",
                label: "Ngày nhận xe dự kiến",
                validations: ["required", "dateRanger"],
                min: dayjs(),
                hide: props.useFormResult?.getValues(fields.carRegister),
                className: matchesDownSm
                  ? classes.areaFull
                  : !props.useFormResult?.getValues(fields.carRegister) &&
                    !listTruck.includes(
                      props.useFormResult?.getValues(fields.carType)
                    )
                    ? classes.areaFull
                    : undefined,
              },
              {
                id: fields.carPlateNo,
                type: "text",
                label: "Biển kiểm soát",
                className: matchesDownSm
                  ? classes.areaFull
                  : !listTruck.includes(
                    props.useFormResult?.getValues(fields.carType)
                  ) && props.useFormResult?.getValues(fields.carRegister)
                    ? classes.areaFull
                    : undefined,
                validations: ["required", "plateNoCar"],
                uppercase: true,
                hide: !props.useFormResult?.getValues(fields.carRegister),
              },
              {
                id: fields.carChassisNo,
                type: "text",
                label: "Số khung",
                validations: ["required", "chassisNo"],
                className: matchesDownSm ? classes.areaFull : undefined,
                // hide: props.useFormResult?.getValues(fields.carRegister),
              },
              {
                id: fields.carEngineNo,
                type: "text",
                label: "Số máy",
                validations: ["required", "engineNo"],
                className: matchesDownSm ? classes.areaFull : undefined,
                // hide: props.useFormResult?.getValues(fields.carRegister),
              },
              {
                id: "carFeedback",
                type: "custom",
                custom: (
                  <FeedbackCarInfo
                    data={props.useFormResult.getValues()}
                    // carBrandDataByRefSpecs={props.carBrandDataByRefSpecs}
                    carBrandDataByCarType={props.carBrandDataByCarType}
                    carLineDataByCarTypeCarBrandCarYear={
                      props.carLineDataByCarTypeCarBrandCarYear
                    }
                    carVersionDataByCarLine={props.carVersionDataByCarLine}
                    carYearDataAll={props.carYearDataAll}
                    feedbackInfoCarService={props.feedbackInfoCarService}
                  />
                ),
                className: classes.areaFull,
              },
            ],
          },
        ],
      },
      {
        title: "Thông tin chủ xe/lái xe",
        screens: [
          {
            inputsConfig: [
              {
                id: fields.ownerIsDriver,
                type: "switch",
                switchLabel: "Lái xe đồng thời là chủ xe",
                className: classes.areaFull,
                checkedValue: true,
                unCheckedValue: false,
              },
              {
                id: "ownerInfo",
                type: "custom",
                custom: <TitleInfo label="Thông tin chủ xe" />,
                className: classes.areaFull,
                hide: props.useFormResult.getValues(fields.ownerIsDriver),
              },
              {
                id: fields.ownerGender,
                label: "Giới tính",
                hideLabel: true,
                type: "radio",
                validations: ["required"],
                options: props.genderData,
                row: true,
                className: classes.areaFull,
                hide: !props.useFormResult?.getValues(fields.ownerIsDriver),
                onChange: (e: any) => {
                  props.useFormResult?.setValue(
                    fields.driverGender,
                    e?.target?.value
                  );
                },
              },
              {
                id: fields.ownerFullName,
                className: matchesDownSm ? classes.areaFull : null,
                label: "Họ và tên",
                type: "text",
                disabled: !!props.blocked && props.defaultValues?.ownerFullName,
                validations: ["required"],
              },
              {
                id: fields.ownerBirthday,
                label: "Ngày sinh",
                type: "date",
                className: matchesDownSm ? classes.areaFull : null,
                validations: ["required", "date", "dateRanger"],
                openTo: "year",
                min: dayjs().startOf("days").subtract(80, "years").toDate(),
                max: dayjs().startOf("days").subtract(18, "years").toDate(),
                disabled: !!props.blocked && props.defaultValues?.ownerBirthday,
              },
              {
                id: fields.ownerIdNo,
                label: "Số CMND/CCCD",
                type: "text",
                className: matchesDownSm ? classes.areaFull : null,
                validations: ["required", "idNo"],
                disabled: !!props.blocked && props.defaultValues?.ownerIdNo,
              },
              {
                id: fields.ownerPhoneNumber,
                label: "Số điện thoại",
                type: "text",
                className: matchesDownSm ? classes.areaFull : null,
                validations: ["required", "phone"],
                disabled:
                  !!props.blocked && props.defaultValues?.ownerPhoneNumber,
              },
              {
                id: fields.ownerEmail,
                label: "Email nhận hợp đồng",
                type: "text",
                className: matchesDownSm
                  ? classes.areaFull
                  : !props.useFormResult?.getValues(fields.ownerIsDriver)
                    ? classes.areaFull
                    : null,
                validations: ["required", "email"],
              },
              {
                id: fields.ownerExperience,
                label: "Số năm kinh nghiệm lái xe",
                type: "text",
                helperText:
                  "* Số năm kinh nghiệm lái xe sẽ ảnh hưởng đến mức phí bảo hiểm",
                className: matchesDownSm ? classes.areaFull : null,
                hide: !props.useFormResult?.getValues(fields.ownerIsDriver),
                validations: ["required", "numberRanger"],
                min: 1,
                max: (values: any) =>
                  dayjs().diff(dayjs(values?.[fields.ownerBirthday]), "years") -
                  18 || 1,
                onChange: (e: any) => {
                  props.useFormResult?.setValue(
                    fields.driverExperience,
                    e?.target?.value
                  );
                },
              },
              {
                id: "driverInfo",
                type: "custom",
                custom: <TitleInfo label="Thông tin lái xe" />,
                className: classes.areaFull,
                hide: props.useFormResult?.getValues(fields.ownerIsDriver),
              },
              {
                id: fields.driverGender,
                type: "radio",
                label: "Giới tính",
                hideLabel: true,
                validations: ["required"],
                options: props.genderData,
                row: true,
                className: classes.areaFull,
                hide: props.useFormResult?.getValues(fields.ownerIsDriver),
                onChange: (e: any) => {
                  props.useFormResult?.setValue(
                    fields.ownerGender,
                    e?.target?.value
                  );
                },
              },
              {
                id: fields.driverFullName,
                label: "Họ và tên",
                type: "text",
                className: matchesDownSm ? classes.areaFull : null,
                hide: props.useFormResult?.getValues(fields.ownerIsDriver),
                validations: ["required"],
              },
              {
                id: fields.driverBirthday,
                label: "Ngày sinh",
                type: "date",
                className: matchesDownSm ? classes.areaFull : null,
                validations: ["required", "date", "dateRanger"],
                openTo: "year",
                hide: props.useFormResult?.getValues(fields.ownerIsDriver),
                min: dayjs().startOf("days").subtract(80, "years").toDate(),
                max: dayjs().startOf("days").subtract(18, "years").toDate(),
              },
              {
                id: fields.driverPhoneNumber,
                label: "Số điện thoại",
                type: "text",
                className: matchesDownSm ? classes.areaFull : null,
                hide: props.useFormResult?.getValues(fields.ownerIsDriver),
                validations: ["required", "phone"],
              },
              {
                id: fields.driverExperience,
                label: "Số năm kinh nghiệm lái xe",
                type: "text",
                helperText:
                  "* Số năm kinh nghiệm lái xe sẽ ảnh hưởng đến mức phí bảo hiểm",
                className: matchesDownSm ? classes.areaFull : null,
                hide: props.useFormResult?.getValues(fields.ownerIsDriver),
                validations: ["required", "numberRanger"],
                min: 1,
                max: (values: any) =>
                  dayjs().diff(
                    dayjs(values?.[fields.driverBirthday]),
                    "years"
                  ) - 18 || 1,
                onChange: (e: any) => {
                  props.useFormResult?.setValue(
                    fields.ownerExperience,
                    e?.target?.value
                  );
                },
              },
              {
                id: fields.activeRegionProvince,
                label: "Khu vực xe hoạt động chính",
                type: "select",
                options: props.cityData || [],
                validations: ["required"],
                className: classes.areaFull,
                onChange: (e: any) => {
                  props.useFormResult?.setValue(
                    fields.activeRegionProvinceName,
                    props.cityData?.find(
                      (it: any) => it?.value === e?.target?.value
                    )?.label
                  );
                },
              },
            ],
          },
        ],
      },
      {
        title: "Chương trình bảo hiểm",
        screens: [
          {
            inputsConfig: [
              {
                id: fields.duration,
                type: "select",
                label: "Thời hạn bảo hiểm",
                className: classes.areaFull,
                options: props.durationData?.map((it: any) => ({
                  value: it?.value,
                  label: `${it?.label} Tháng`,
                })),
                onChange: (e: any) => {

                  let month = props.durationData.find((item: any) => item.value === e?.target?.value)?.label || 12;
                  props.useFormResult?.setValue(
                    fields.expireDate,
                    dayjs(
                      props.useFormResult?.getValues(fields.effectiveDate)
                    ).add(month, "months")
                  );

                  if (
                    !!props.useFormResult?.getValues(fields.carValue) &&
                    !!props.useFormResult?.getValues(fields.sumInsurance)
                  ) {
                    props.savePlaceOrderHandle(e);
                  }
                },
              },
              {
                id: fields.effectiveDate,
                type: "date",
                label: "Dự kiến từ ngày",
                validations: ["required", "dateRanger"],
                min: dayjs().toDate(),
                max: dayjs()
                  .add(props.orderConfigData?.maxDayPurchase, "days")
                  .toDate(),
                onChange: (e: any) => {
                  let durationValue = props.durationData.find((item: any) => item.value == props.useFormResult.getValues(fields.duration))?.label;
                  props.useFormResult?.setValue(
                    fields.expireDate,
                    dayjs(e?.target?.value).add(
                      durationValue,
                      "months"
                    )
                  );
                },
              },
              {
                id: fields.expireDate,
                type: "date",
                label: "Đến ngày",
                disabled: true,
              },
              {
                id: fields.carValue,
                type: "currency",
                label: "Giá trị xe",
                className: matchesDownSm ? classes.areaFull : null,
                // disabled: !props.useFormResult
                //   ?.getValues(fields.refSpecs)
                //   ?.find((v: any) => v?.indexOf(TRUCK) !== -1),
                disabled: true,
                validations: ["required"],
                onBlur: (e: any) => {
                  if (props.useFormResult?.getValues(fields.sumInsurance)) {
                    props.savePlaceOrderHandle(e);
                  }
                },
              },
              {
                id: fields.sumInsurance,
                type: "currency",
                label: "Số tiền bảo hiểm",
                className: matchesDownSm ? classes.areaFull : null,
                validations: [
                  "required",
                  props.useFormResult.getValues(fields.passLimitSumInsurance)
                    ? undefined
                    : (_value: any, _label: any) => {
                      if (
                        Math.round(
                          props.useFormResult?.getValues(fields.carValue) *
                          (props.orderConfigData?.minSumInsurancePercent /
                            100)
                        ) > props.orderConfigData?.limitSumInsuranceAmount
                      ) {
                        props.useFormResult?.setValue(fields.over, true);
                        return `Số tiền bảo hiểm tối thiểu theo yêu cầu ${props.orderConfigData?.minSumInsurancePercent
                          }% giá trị xe (${convertCurrency(
                            Math.round(
                              props.useFormResult?.getValues(fields.carValue) *
                              (props.orderConfigData?.minSumInsurancePercent /
                                100)
                            )
                          )}đ) đang vượt mức quy định ${convertCurrency(
                            props.orderConfigData?.limitSumInsuranceAmount
                          )}đ của OPES. Chúng tôi sẽ liên hệ với Quý khách trong trường hợp yêu cầu được duyệt`;
                      }

                      if (
                        props.useFormResult.getValues(fields.carValue) >
                        props.orderConfigData?.limitSumInsuranceAmount
                      ) {
                        props.useFormResult?.setValue(fields.over, true);
                        return `Số tiền bảo hiểm theo yêu cầu đang vượt mức quy định ${convertCurrency(
                          props.orderConfigData?.limitSumInsuranceAmount
                        )}đ của OPES. Chúng tôi sẽ liên hệ với Quý khách trong trường hợp yêu cầu được duyệt`;
                      }

                      return true;
                    },
                  "numberRanger",
                ],
                min: Math.round(
                  props.useFormResult?.getValues(fields.carValue) *
                  (props.orderConfigData?.minSumInsurancePercent / 100)
                ),
                max: props.useFormResult?.getValues(fields.carValue),
                // props.useFormResult?.getValues(fields.carValue) >
                // props.orderConfigData?.limitSumInsuranceAmount
                //   ? props.orderConfigData?.limitSumInsuranceAmount
                //   : props.useFormResult?.getValues(fields.carValue),

                disabled: props.savePlaceOrderLoading,
                helperText: (
                  <span>
                    * Tổn thất xảy ra với xe sẽ được bồi thường theo tỉ lệ:{" "}
                    <b>
                      {Number(
                        (
                          (props.useFormResult?.getValues(fields.sumInsurance) /
                            props.useFormResult?.getValues(fields.carValue)) *
                          100 || 0
                        ).toFixed(1)
                      )}
                      %
                    </b>
                  </span>
                ),
                onBlur: (e: any) => {
                  if (props.useFormResult?.getValues(fields.carValue)) {
                    props.savePlaceOrderHandle(e);
                  }
                },
              },
              {
                id: fields.deductibleExcess,
                type: "select",
                label: "Mức khấu trừ bảo hiểm",
                className: classes.areaFull,
                options: props.deductibleData,
                onChange: (e: any) => {
                  props.savePlaceOrderHandle(e);
                },
                disabled: true
              },
              // {
              //   id: fields.discountCode,
              //   className: classes.areaFull,
              //   type: "text",
              //   disabled: props.isShowCountdown,
              //   label: (
              //     <InputLabel
              //     // component="p"
              //     // className={classes.discountCodeLabel}
              //     >
              //       Mã khuyến mại
              //       {props.isVpbStaff && (
              //         <span className={classes.subText}>
              //           Cán bộ nhân viên VPBank: vui lòng nhập mã nhân viên để
              //           hưởng ưu đãi
              //         </span>
              //       )}
              //     </InputLabel>
              //   ),
              //   icon: <DeleteIcon />,
              //   onFocus: () => {
              //     if (openCoupon.focus)
              //       setOpenCoupon({ open: true, focus: true });
              //     else setOpenCoupon({ open: false, focus: true });
              //   },
              //   onClick: () => {
              //     props.useFormResult?.setValue(fields.discountCode, "");

              //     // props.useFormResult?.setValue(fields.callCheckDiscount, true);
              //     props.savePlaceOrderHandle({
              //       target: {
              //         name: fields.discountCode,
              //         value: "NONE",
              //       },
              //     });
              //   },
              //   onBlur: (e: any) => {
              //     if (e?.target?.value) {
              //       props.useFormResult?.setValue(
              //         fields.callCheckDiscount,
              //         true
              //       );
              //     } else {
              //       props.savePlaceOrderHandle({
              //         target: {
              //           name: fields.discountCode,
              //           value: "NONE",
              //         },
              //       });
              //     }
              //   },
              //   helperText: props.isShowCountdown && (
              //     <Countdown
              //       onComplete={() => {
              //         props.setIsShowCountDown(false);
              //         localStorage.removeItem(
              //           props.localstorageCouponCountdownKey
              //         );
              //       }}
              //       onTick={(countdownProps) => {
              //         localStorage.setItem(
              //           props.localstorageCouponCountdownKey,
              //           countdownProps.total.toString()
              //         );
              //       }}
              //       date={
              //         Date.now() +
              //         (localStorage.getItem(
              //           props.localstorageCouponCountdownKey
              //         )
              //           ? Number(
              //             localStorage.getItem(
              //               props.localstorageCouponCountdownKey
              //             )
              //           )
              //           : props.limitTimeToCheckCoupon || 180000)
              //       }
              //       renderer={(props: CountdownTimeDelta) => (
              //         <CountDownRenderer
              //           {...(props as any)}
              //           label={"Vui lòng thử lại sau"}
              //         />
              //       )}
              //     />
              //   ),
              // },
              // {
              //   id: "coupons",
              //   type: "custom",
              //   custom: (
              //     <Coupons
              //       getCouponsService={props.getCouponsService}
              //       open={openCoupon.open}
              //       onClose={() => {
              //         setOpenCoupon({ open: false, focus: false });
              //       }}
              //       discountCode={props.useFormResult?.getValues(
              //         fields.discountCode
              //       )}
              //       resourceCode={props.resourceCode}
              //       onSubmit={(d: any) => {
              //         props.useFormResult?.setValue(
              //           fields.discountCode,
              //           d?.discountCode || undefined
              //         );
              //         if (d?.discountCode) {
              //           props.useFormResult?.setValue(
              //             fields.callCheckDiscount,
              //             true
              //           );
              //         } else {
              //           props.savePlaceOrderHandle({
              //             target: {
              //               name: fields.discountCode,
              //               value: "NONE",
              //             },
              //           });
              //         }
              //         setOpenCoupon({ open: false, focus: false });
              //       }}
              //     />
              //   ),
              // },
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
                      discountAmount={
                        0
                      }
                      price={it.totalPremium}
                      loading={props.savePlaceOrderLoading}
                      title={it?.pkgName}
                      coverages={it?.displayInfo?.map((df: any, i: number) => {
                        const _df = { ...df };

                        if (_df?.type === "CAR_ADD_ON") {
                          _df.content = _df?.texts
                            ?.map((t: any) => t?.text)
                            ?.join("\n");
                        } else {
                          _df.content = _df?.texts
                            ?.map((t: any) => t?.text)
                            ?.join("\n");
                        }

                        if (
                          it?.pkgCode ===
                          props.useFormResult.getValues(fields.pkgCode)
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
          },
        ],
      },
      {
        title: "Chụp ảnh xe",
        screens: [
          {
            hide: props.onlyCapture
              ? isMobile ||
              props.useFormResult?.getValues(fields.carRegister) == false
              : true,
            btnNextHide: !isMobile,
            inputsConfig: [
              {
                id: "carQr",
                type: "custom",
                custom: (
                  <QrCapture
                    orderId={props.pendingOrderData?.orderId}
                    discountCode={props.useFormResult?.getValues(
                      fields.discountCode
                    )}
                    endpointQr={props.currentEndpoint as any}
                  />
                ),
                className: classes.areaFull,
              },
            ],
          },
          {
            hide: props.onlyCapture ? !isMobile : true,
            inputsConfig: [
              {
                id: "takePhotoGuide",
                type: "custom",
                custom: <TakePhotoGuide />,
                className: classes.areaFull,
              },
            ],
          },
          {
            hide: props.onlyCapture
              ? !isMobile &&
              props.useFormResult?.getValues(fields.carRegister) === true
              : false,
            btnNextLabel:
              props.useFormResult?.getValues(fields.carRegister) === true
                ? undefined
                : "Chụp ảnh sau",
            inputsConfig: [
              {
                id: "captuteNote",
                type: "custom",
                custom: (
                  <div>
                    <Typography className={classes.captuteNote}>
                      Với xe CHƯA ĐĂNG KÝ, bạn có thể tiếp tục mua OCAR và không
                      bắt buộc chụp ảnh xe.
                    </Typography>
                    <br />
                    <Typography
                      sx={{
                        textAlign: "center",
                        fontWeight: theme.typography.fontWeightBold,
                        color: theme.palette.primary.main,
                        fontSize: "1.2rem",
                      }}
                    >
                      Tải lên ảnh xe
                    </Typography>
                    <br />
                    <Typography textAlign="center">
                      <b>Lưu ý:</b>
                      <br />
                      <span>
                        Chụp chéo 4 góc, toàn bộ xe trong khung hình và rõ biển
                        số xe
                      </span>
                    </Typography>
                  </div>
                ),
                className: classes.areaFull,
                hide:
                  props.useFormResult?.getValues(fields.carRegister) === true,
              },
              {
                id: fields.carCaptureFrontLeft,
                label: "TRƯỚC - LÁI",
                type: "custom",
                validations: props.notRequireCapture
                  ? undefined
                  : props.useFormResult?.getValues(fields.carRegister) === true
                    ? ["required"]
                    : undefined,
                custom: (
                  <ImageInspection
                    bgSrc="https://opes.com.vn/images/car_front_left.png"
                    orderId={props.pendingOrderData?.orderId}
                    poolId={props.poolId}
                    tag={FRONT_LEFT_VIEW}
                    width="100%"
                    height="180px"
                    domainLinkFile={props.domainLinkFile}
                    submitCarInspectionImageService={
                      props.submitCarInspectionImageService
                    }
                    getCarInspectionResultService={
                      props.getCarInspectionResultService
                    }
                    onUploadSuccess={(file: any) => {
                      onChangeInspections(file, FRONT_LEFT_VIEW);
                    }}
                  />
                ),
              },
              {
                id: fields.carCaptureFrontRight,
                label: "TRƯỚC - PHỤ",
                type: "custom",
                validations: props.notRequireCapture
                  ? undefined
                  : props.useFormResult?.getValues(fields.carRegister) === true
                    ? ["required"]
                    : undefined,
                custom: (
                  <ImageInspection
                    bgSrc="https://opes.com.vn/images/car_front_right.png"
                    orderId={props.pendingOrderData?.orderId}
                    poolId={props.poolId}
                    tag={FRONT_RIGHT_VIEW}
                    width="100%"
                    height="180px"
                    domainLinkFile={props.domainLinkFile}
                    submitCarInspectionImageService={
                      props.submitCarInspectionImageService
                    }
                    getCarInspectionResultService={
                      props.getCarInspectionResultService
                    }
                    onUploadSuccess={(file: any) => {
                      onChangeInspections(file, FRONT_RIGHT_VIEW);
                    }}
                  />
                ),
              },
              {
                id: fields.carCaptureRearLeft,
                label: "SAU - LÁI",
                type: "custom",
                validations: props.notRequireCapture
                  ? undefined
                  : props.useFormResult?.getValues(fields.carRegister) === true
                    ? ["required"]
                    : undefined,
                custom: (
                  <ImageInspection
                    bgSrc="https://opes.com.vn/images/car_rear_left.png"
                    orderId={props.pendingOrderData?.orderId}
                    poolId={props.poolId}
                    tag={REAR_LEFT_VIEW}
                    width="100%"
                    height="180px"
                    domainLinkFile={props.domainLinkFile}
                    submitCarInspectionImageService={
                      props.submitCarInspectionImageService
                    }
                    getCarInspectionResultService={
                      props.getCarInspectionResultService
                    }
                    onUploadSuccess={(file: any) => {
                      onChangeInspections(file, REAR_LEFT_VIEW);
                    }}
                  />
                ),
              },
              {
                id: fields.carCaptureRearRight,
                label: "SAU - PHỤ",
                type: "custom",
                validations: props.notRequireCapture
                  ? undefined
                  : props.useFormResult?.getValues(fields.carRegister) === true
                    ? ["required"]
                    : undefined,
                custom: (
                  <ImageInspection
                    bgSrc="https://opes.com.vn/images/car_rear_right.png"
                    orderId={props.pendingOrderData?.orderId}
                    poolId={props.poolId}
                    tag={REAR_RIGHT_VIEW}
                    width="100%"
                    height="180px"
                    domainLinkFile={props.domainLinkFile}
                    submitCarInspectionImageService={
                      props.submitCarInspectionImageService
                    }
                    getCarInspectionResultService={
                      props.getCarInspectionResultService
                    }
                    onUploadSuccess={(file: any) => {
                      onChangeInspections(file, REAR_RIGHT_VIEW);
                    }}
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
            btnNextLabel: props.backendUpdateOrder
              ? "Lưu"
              : props.useFormResult.getValues(fields.passLimitSumInsurance) ===
                false
                ? "Xác nhận"
                : undefined,
            inputsConfig: [
              {
                id: "carConfirm",
                type: "custom",
                className: classes.areaFull,
                custom: (() => {
                  const _data = props.useFormResult.getValues();
                  const _carUsingData = props.carUsingData;
                  // const _carBrandDataByRefSpecs = props.carBrandDataByRefSpecs;
                  const _carBrandDataByCarType = props.carBrandDataByCarType;
                  const _carLineDataByCarTypeCarBrandCarYear =
                    props.carLineDataByCarTypeCarBrandCarYear;
                  const _carVersionDataByCarLine =
                    props.carVersionDataByCarLine;
                  const _packageCodeData = props.packageCodeData;
                  const _pricingPackages = props.pricingPackages;
                  const _domainLinkFile = props.domainLinkFile;

                  return (
                    <ConfirmInfoField
                      ownerFullName={_data?.ownerFullName}
                      ownerPhoneNumber={_data?.ownerPhoneNumber}
                      ownerEmail={_data?.ownerEmail}
                      carUsing={_data?.carUsing}
                      carBrandName={
                        // _carBrandDataByRefSpecs?.find(
                        //   (it: any) => it?.value === _data?.carBrand
                        // )?.name
                        _carBrandDataByCarType?.find(
                          (it: any) => it?.value === _data?.carBrand
                        )?.name
                      }
                      carLineName={
                        _carLineDataByCarTypeCarBrandCarYear?.find(
                          (it: any) => it?.value === _data?.carLine
                        )?.label
                      }
                      carVersionName={
                        _carVersionDataByCarLine?.find(
                          (it: any) => it?.value === _data?.carVersion
                        )?.name
                      }
                      carYear={_data?.carYear}
                      carPlateNo={_data?.carPlateNo}
                      carValue={_data?.carValue}
                      sumInsurance={_data?.sumInsurance}
                      pkgName={
                        _packageCodeData?.find(
                          (it: any) => it?.pkgCode === _data?.pkgCode
                        )?.pkgName
                      }
                      duration={props.durationData.find((item: any) => item.value === props.useFormResult.getValues(fields.duration))?.label}
                      effectiveDate={_data?.effectiveDate}
                      expireDate={_data?.expireDate}
                      deductibleExcess={props.deductibleData?.find((item: any) => item.value === _data?.deductibleExcess)?.label}
                      oldFee={
                        !!_pricingPackages?.[_data?.pkgCode]?.totalDiscount
                          ? _pricingPackages?.[_data?.pkgCode]?.totalPremium
                          : 0
                      }
                      fee={
                        _pricingPackages?.[_data?.pkgCode]?.totalPremium -
                        (_pricingPackages?.[_data?.pkgCode]?.totalDiscount || 0)
                      }
                      domainLinkFile={_domainLinkFile}
                      carCaptureFrontLeft={_data?.carCaptureFrontLeft}
                      carCaptureFrontRight={_data?.carCaptureFrontRight}
                      carCaptureRearLeft={_data?.carCaptureRearLeft}
                      carCaptureRearRight={_data?.carCaptureRearRight}
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
                id: "divider1",
                type: "custom",
                custom: <Divider />,
                className: classes.areaFull,
              },
              // {
              //   id: fields.hasTplBundle,
              //   type: "switch",
              //   disableDefaultOnChange: true,
              //   value:
              //     props.useFormResult.getValues(fields.hasTplBundle) || false,
              //   onChange: (e: any) => {
              //     if (e.target.value === true) {
              //       props.useFormResult.setValue(fields.hasTplBundle, true);
              //     } else {
              //       props.setIsOpenDialogConfirmOffTplBundle &&
              //         props?.setIsOpenDialogConfirmOffTplBundle(true);
              //     }
              //   },
              //   switchLabel: (
              //     <Typography>
              //       Bạn muốn mua bảo hiểm TNDS ô tô? Phí:{" "}
              //       <b style={{ color: theme.palette.primary.main }}>
              //         {convertCurrency(
              //           props.useFormResult.getValues(fields.tplTotalPremium)
              //         )}
              //         đ
              //       </b>
              //     </Typography>
              //   ),
              //   disabled: !props.useFormResult.getValues(
              //     fields.tplTotalPremium
              //   ),
              //   helperText: !props.useFormResult.getValues(
              //     fields.tplTotalPremium
              //   )
              //     ? "*Xe đã có bảo hiểm TNDS tại OPES"
              //     : "",
              //   checkedValue: true,
              //   unCheckedValue: false,
              //   className: matchesDownSm ? classes.areaFull : null,
              // },
              {
                id: "customLabel",
                type: "custom",
                label: "",
                hide: !props.useFormResult.getValues(fields.hasTplBundle),
                custom: (
                  <div
                    className={classes.tplBundleEffectiveDate}
                    onClick={props.onTplEffectiveDateClick}
                  >
                    <span>
                      Từ ngày:{" "}
                      {dayjs(
                        props.useFormResult.getValues(fields.effectiveDateTpl)
                      ).format("DD/MM/YYYY")}
                    </span>
                    <div
                      style={{
                        display: "flex",
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (props?.setIsOpenDialogConfirmOffTplBundle) {
                          props?.setIsOpenDialogConfirmOffTplBundle(true);
                        }
                      }}
                    >
                      <ClearIcon />
                    </div>
                  </div>
                ),
                className: matchesDownSm ? classes.areaFull : null,
              },
              {
                id: "dividerBen",
                type: "custom",
                custom: <Divider />,
                className: classes.areaFull,
              },
              // {
              //   id: fields.hasBen,
              //   type: "switch",
              //   onChange: (e: any) => {
              //     if (e?.target?.value) {
              //       props.useFormResult?.setValue(fields.benModalOpen, true);
              //     } else {
              //       // props.useFormResult?.setValue(
              //       //   fields.beneficiaries,
              //       //   undefined
              //       // );
              //     }
              //   },
              //   switchLabel: "Chỉ định người thụ hưởng là tổ chức tín dụng",
              //   checkedValue: true,
              //   unCheckedValue: false,
              //   className: matchesDownSm ? classes.areaFull : null,
              //   hide: !props.showBen,
              // },
              // {
              //   id: "customLabelBen",
              //   type: "custom",
              //   hide: !props.useFormResult.getValues(fields.hasBen),
              //   custom: (
              //     <div
              //       className={classes.tplBundleEffectiveDate}
              //       onClick={() =>
              //         props.useFormResult?.setValue(fields.benModalOpen, true)
              //       }
              //     >
              //       <span>
              //         {
              //           props.useFormResult?.getValues(
              //             fields.beneficiaries
              //           )?.[0]?.benBankName
              //         }
              //       </span>
              //       <div
              //         style={{
              //           display: "flex",
              //         }}
              //         onClick={(e) => {
              //           e.stopPropagation();
              //           props.useFormResult?.setValue(fields.hasBen, false);
              //         }}
              //       >
              //         <ClearIcon />
              //       </div>
              //     </div>
              //   ),
              //   className: matchesDownSm ? classes.areaFull : null,
              // },
              // {
              //   id: "divider2",
              //   type: "custom",
              //   custom: <Divider />,
              //   className: classes.areaFull,
              //   hide: !props.showBen,
              // },
              {
                id: "totalFee",
                type: "custom",
                custom: (
                  <TotalFee
                    title={"Tổng phí bảo hiểm"}
                    description={"(Đã bao gồm VAT)"}
                    oldFee={0}
                    fee={fee}
                  />
                ),
                className: classes.areaFull,
              },
              {
                id: "divider3",
                type: "custom",
                custom: <Divider />,
                className: classes.areaFull,
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
                hide: !props.useFormResult.getValues(fields.invoiceExport),
              },
              {
                id: fields.invoiceCompanyName,
                type: "text",
                label: "Tên công ty",
                validations: ["required"],
                className: matchesDownSm ? classes.areaFull : null,
                hide:
                  !props.useFormResult.getValues(fields.invoiceExport) ||
                  !props.useFormResult.getValues(fields.invoiceIsCompany),
              },
              {
                id: fields.invoiceBuyerName,
                type: "text",
                label: "Họ tên người mua",
                validations: ["required"],
                className: matchesDownSm ? classes.areaFull : null,
                hide: !props.useFormResult.getValues(fields.invoiceExport),
              },
              {
                id: fields.invoiceTaxCode,
                type: "text",
                label: "Mã số thuế",
                className: matchesDownSm ? classes.areaFull : null,
                validations: ["required", "taxCode"],
                hide:
                  !props.useFormResult.getValues(fields.invoiceExport) ||
                  !props.useFormResult.getValues(fields.invoiceIsCompany),
              },
              {
                id: fields.invoiceEmail,
                type: "text",
                label: "Email",
                className: matchesDownSm ? classes.areaFull : null,
                validations: ["required", "email"],
                hide: !props.useFormResult.getValues(fields.invoiceExport),
              },
              {
                id: fields.invoiceAddress,
                type: "text",
                label: "Địa chỉ",
                className: classes.areaFull,
                validations: ["required"],
                hide: !props.useFormResult.getValues(fields.invoiceExport),
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

    return _steps;
  }, [
    // data
    props.onlyCarUsingBusiness,
    props.carUsingData,
    props.carTypeDataByCarUsing,
    props.packageCodeData,
    props.carBrandDataByCarType,
    props.carYearDataByCarBrand,
    props.carYearDataAll,
    props.carLineDataByCarTypeCarBrandCarYear,
    props.carVersionDataByCarLine,
    props.carWeightData,
    props.genderData,
    props.cityData,
    props.durationData,
    props.orderConfigData,
    props.deductibleData,
    props.resourceCode,
    props.saleNoPlate,
    openCoupon,
    // values
    // props.useFormResult.watch(),
    props.useFormResult.watch(fields.deductibleExcess),
    props.useFormResult.watch(fields.refSpecs),
    props.useFormResult.watch(fields.carType),
    props.useFormResult.watch(fields.ownerIsDriver),
    // props.useFormResult.watch(fields.ownerBirthday),
    // props.useFormResult.watch(fields.driverBirthday),
    // props.useFormResult.watch(fields.carValue),
    // props.useFormResult.watch(fields.sumInsurance),
    props.useFormResult.watch(fields.carUsing),
    props.useFormResult.watch(fields.paymentMethod),
    props.useFormResult.watch(fields.tplTotalPremium),
    props.useFormResult.watch(fields.invoiceIsCompany),
    props.useFormResult.watch(fields.hasTplBundle),
    props.useFormResult.watch(fields.pkgCode),
    props.useFormResult.watch(fields.effectiveDateTpl),
    props.useFormResult.watch(fields.invoiceExport),
    props.useFormResult.watch(fields.passLimitSumInsurance),
    props.useFormResult.watch(fields.carRegister),
    props.useFormResult?.watch(fields.beneficiaries),
    props.useFormResult?.watch(fields.hasBen),
    // default values
    props.defaultValues?.ownerFullName,
    props.defaultValues?.ownerBirthday,
    props.defaultValues?.ownerIdNo,
    props.defaultValues?.ownerPhoneNumber,
    // service
    props.feedbackInfoCarService,
    // payment
    props.getPaymentInfoQuery?.data?.content?.orderInfo?.totalAmount,
    props.getPaymentInfoQuery?.data?.content?.orderInfo?.discounts,
    props.getPaymentInfoQuery?.isInitialLoading,
    props.getPaymentInfoQuery?.data?.content?.paymentMethods,
    props.orderConfigData?.minDeductibleCommercial,
    props.savePlaceOrderLoading,
    props.backendUpdateOrder,
  ]);
};

export default useSteps;
