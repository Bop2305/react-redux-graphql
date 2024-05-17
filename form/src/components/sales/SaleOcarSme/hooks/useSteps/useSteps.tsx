import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import dayjs from "dayjs";
import { useTheme } from "@mui/styles";
import {
  Divider,
  InputLabel,
  Typography,
  useFormControl,
  useMediaQuery,
} from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
// import Countdown, { CountdownTimeDelta } from "react-countdown";

import {
  carUsingMapping,
  genderMapping,
  packageIconMapping,
  paymentMethodIconMapping,
} from "helper/mapping";
import convertStringToDate from "helper/converts/convertStringToDate";
import convertStringToDayjs from "helper/converts/convertStringToDayjs";
import { deviceDetect } from "helper/detectDevice";
import {
  BUS,
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
  paymentMethodLoadingOptions,
  isCollateralOptions,
  invoiceIsCompanyOptions,
  ownerIsCompanyOptions,
  vehicleRegisterOptions,
} from "helper/options";
import RadioLabelPackage from "components/inputs/InputRadio/radioLabels/RadioLabelPackage";
import ImageInspection from "components/ImageInspection";
import RadioLabelBox from "components/inputs/InputRadio/radioLabels/RadioLabelBox";
import CheckboxLabelRule from "components/inputs/InputCheckbox/checkBoxLabels/CheckboxLabelRule";
import SummaryInfo from "components/SummaryInfo";
import TotalFee from "components/TotalFee";
import RadioLabelPaymentMethod from "components/inputs/InputRadio/radioLabels/RadioLabelPaymentMethod";
import RadioLabelRadius from "components/inputs/InputRadio/radioLabels/RadioLabelRadius";
import useStylesInputRadio from "components/inputs/InputRadio/useStylesInputRadio";

import useStyles from "../useStyles";
import fields from "../../help/fields";
import {
  feedbackInfoCarServiceType,
  getCarInspectionResultServiceType,
  submitCarInspectionImageServiceType,
} from "../../../types";
import FeedbackCarInfo from "./FeedbackCarInfo";
import TitleInfo from "./TitleInfo";
import QrCapture from "./QrCapture";
import ConfirmInfoField from "./ConfirmInfoField";
import TakePhotoGuide from "../../TakePhotoGuide";
import CountDownRenderer from "../../../../Countdown/CountDownRenderer";
import convertCurrency from "helper/converts/convertCurrency";
import convertDateToString from "helper/converts/convertDateToString";
import ClearIcon from "../../../../icons/ClearIcon";
import Ocr from "./Ocr";

type useStepsProps = {
  useFormResult: UseFormReturn<FieldValues, any>;
  // service
  feedbackInfoCarService: feedbackInfoCarServiceType;
  submitCarInspectionImageService: submitCarInspectionImageServiceType;
  getCarInspectionResultService: getCarInspectionResultServiceType;
  // init order data
  pendingOrderData: any;
  carUsingData: any;
  getCarTypeDataByCarUsing: (value: any) => any;
  carTypeDataByCarUsing: any;
  carYearDataAll: any;
  carWeightData: any;
  genderData: any;
  durationData: any;
  orderConfigData: any;
  deductibleData: any;
  packageCodeData: any;
  loanContractTypeData: any;
  coInsurancesData: any;
  // province data
  cityData: any;
  // car data
  carBrandData: any;
  // getCarBrandDataByRefSpecs: (value: any) => any;
  // carBrandDataByRefSpecs: any;
  getCarBrandDataByCarType: (value: any) => any;
  carBrandDataByCarType: any;
  carYearDataByCarBrand: any;
  getCarLineDataByCarTypeCarBrandCarYear: (
    carType: any,
    carBrand: any,
    carYear: any
  ) => any;
  carLineDataByCarTypeCarBrandCarYear: any;
  getCarVersionDataByCarLine: (value: any, carVersionDataByCarLine: any) => any;
  carVersionDataByCarLine: any;
  // save order
  savePlaceOrderHandle: (e?: any) => any;
  savePlaceOrderLoading: boolean;
  pricingPackages: any;
  payFrequencies: any;
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
  onCheckSaleDao: any;
  getPaymentMethodsQuery: any;
  paymentFrequencyData: any;
  // staff info
  getStaffContractByCodeData: any;

  defaultValues?: any;
  getPremiumEstQuery: any;
  backendUpdateOrder?: boolean;
  onTplEffectiveDateClick?: () => void;
  setIsOpenDialogConfirmOffTplBundle: (value: boolean) => void;
  saleNoPlate?: boolean;
  reinsurance?: boolean;
  coInsurances?: boolean;
  hierarchies: any;
  getStaffInfoQuery: any;
  ocrService: any;
  saveDocService: any;
};

const useSteps = (props: useStepsProps) => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesDownSm = useMediaQuery(theme.breakpoints.down("sm"));
  const [isMobile, setIsMobile] = useState(false);
  const classesInputRadio = useStylesInputRadio();
  const listTruck = [
    TRUCK,
    ROMOOC,
    REFRIGERATED,
    OTHER_TRUCKS,
    TRACTOR_CONTAINER,
  ];

  const getInitValues = useCallback(async () => {
    // loanContractType
    const _loanContractType =
      props.pendingOrderData?.orderContent?.loanContractType ||
      props.loanContractTypeData?.find((it: any) => it?.selected)?.value;

    // car using
    const _carUsing = props.carUsingData?.find((it: any) =>
      props.pendingOrderData?.orderContent?.businessUsing
        ? props.pendingOrderData?.orderContent?.businessUsing === it?.value
        : it?.selected
    )?.value;

    // car type
    const _carTypeData = props.getCarTypeDataByCarUsing(_carUsing);

    const _carTypeObj = _carTypeData?.find((it: any) =>
      props.pendingOrderData?.orderContent?.vehicleType
        ? props.pendingOrderData?.orderContent?.vehicleType === it?.value
        : it?.selected
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

    // await props.getCarLineDataByCarTypeCarBrandCarYear(
    //   _carType,
    //   _carBrand,
    //   undefined
    // );
    const _carLineDataByCarTypeCarBrandCarYear = (
      _resCarLineDataByCarTypeCarBrandCarYear as any
    )?.content;
    const _carLineObj = _carLineDataByCarTypeCarBrandCarYear?.find(
      (it: any) => it?.selected
    );
    const _carLine = _carLineObj?.value;

    // car version
    const _carVersionObj = props
      .getCarVersionDataByCarLine(
        _carLine,
        _carLineDataByCarTypeCarBrandCarYear
      )
      ?.find((it: any) => it?.selected);

    // car weight
    const _carWeight = props.carWeightData?.find(
      (it: any) => it?.selected
    )?.value;

    // gender
    const _driverGender = props.genderData?.find(
      (it: any) => it?.selected
    )?.value;

    // duration
    const _duration = props.durationData?.find(
      (it: any) => it?.selected
    )?.value;

    // deductible excess
    const _deductibleDataByCarUsingMinConfig = props.deductibleData?.filter(
      (it: any) =>
        _carUsing === COMMERCIAL && ["taxi", "taxi_tech"].includes(_carType)
          ? it?.value >= props.orderConfigData?.minDeductibleCommercial
          : true
    );

    const _deductibleExcess = props.pendingOrderData?.orderContent
      ?.deductibleExcess
      ? _deductibleDataByCarUsingMinConfig?.find(
          (it: any) =>
            it?.value === props.pendingOrderData?.orderContent?.deductibleExcess
        )?.value || _deductibleDataByCarUsingMinConfig?.[0]?.value
      : _deductibleDataByCarUsingMinConfig?.[0]?.value;

    // pkg code
    const _pkgCode = props.packageCodeData?.find(
      (it: any) => it?.isSelected
    )?.pkgCode;

    // car version
    const _coInsurances =
      props.pendingOrderData?.orderContent?.coInsurances?.[0] ||
      props.coInsurancesData?.find((it: any) => it?.selected)?.value;

    const _vehicleIsNew = props.pendingOrderData?.orderContent?.vehicleIsNew;

    return {
      [fields.coInsurances]: _coInsurances,
      [fields.loanContractType]: _loanContractType,
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
      [fields.ownerIsDriver]: [null, undefined, ""].includes(
        props.pendingOrderData?.orderContent?.ownerIsDriver
      )
        ? false
        : !!props.pendingOrderData?.orderContent?.ownerIsDriver,
      [fields.driverGender]: _driverGender,
      [fields.duration]: _duration,
      [fields.deductibleExcess]: _deductibleExcess,
      [fields.pkgCode]: _pkgCode,
      [fields.discountCode]: props.discountCodes,
      [fields.buyerIsCompany]:
        props.pendingOrderData?.orderContent?.buyerIsCompany === undefined ||
        props.pendingOrderData?.orderContent?.buyerIsCompany === null
          ? invoiceIsCompanyOptions[0].value
          : props.pendingOrderData?.orderContent?.buyerIsCompany,
      [fields.buyerIsOwner]:
        props.pendingOrderData?.orderContent?.buyerIsOwner === undefined ||
        props.pendingOrderData?.orderContent?.buyerIsOwner === null
          ? ownerIsCompanyOptions[0].value
          : props.pendingOrderData?.orderContent?.buyerIsOwner,
      [fields.paymentFrequency]:
        props.pendingOrderData?.orderContent?.paymentFrequency ||
        props.paymentFrequencyData?.[0]?.value,
      [fields.carRegister]:
        _vehicleIsNew === true ? false : _vehicleIsNew == false ? true : true,
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
          ? true
          : props.pendingOrderData?.orderContent?.invoiceExport,
      [fields.invoiceIsCompany]:
        props.pendingOrderData?.orderContent?.invoiceIsCompany === undefined ||
        props.pendingOrderData?.orderContent?.invoiceIsCompany === null
          ? invoiceIsCompanyOptions[0].value
          : props.pendingOrderData?.orderContent?.invoiceIsCompany,
    };
  }, [
    props.pendingOrderData?.orderContent?.coInsurances,
    props.pendingOrderData?.orderContent?.loanContractType,
    props.pendingOrderData?.orderContent?.businessUsing,
    props.pendingOrderData?.orderContent?.vehicleType,
    props.orderConfigData?.minDeductibleCommercial,
    props.pendingOrderData?.orderContent?.deductibleExcess,
    props.pendingOrderData?.orderContent?.ownerIsDriver,
    props.pendingOrderData?.orderContent?.buyerIsCompany,
    props.pendingOrderData?.orderContent?.buyerIsOwner,
    props.pendingOrderData?.orderContent?.invoiceExport,
    props.pendingOrderData?.orderContent?.invoiceIsCompany,
    props.pendingOrderData?.orderContent?.paymentFrequency,
    props.pendingOrderData?.orderContent?.vehicleIsNew,
    props.pendingOrderData?.orderContent?.vehicleChassisNo,
    props.pendingOrderData?.orderContent?.vehicleEngineNo,
    props.pendingOrderData?.orderContent?.vehicleNewPlateNoDate,
    props.carUsingData,
    props.carWeightData,
    props.genderData,
    props.durationData,
    props.deductibleData,
    props.packageCodeData,
    props.discountCodes,
    props.paymentFrequencyData,
    props.loanContractTypeData,
    props.getCarTypeDataByCarUsing,
    // props.getCarBrandDataByRefSpecs,
    props.getCarBrandDataByCarType,
    props.getCarLineDataByCarTypeCarBrandCarYear,
    props.coInsurancesData,
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

    return {
      [fields.coInsurances]: _initValues?.[fields.coInsurances],
      [fields.hasBankLoan]:
        props.pendingOrderData?.orderContent?.hasBankLoan === undefined ||
        props.pendingOrderData?.orderContent?.hasBankLoan === null
          ? null //isCollateralOptions[0].value
          : props.pendingOrderData?.orderContent?.hasBankLoan,
      [fields.loanContractType]: _initValues?.[fields.loanContractType],
      // [fields.loanContractNo]:
      //   props.pendingOrderData?.orderContent?.loanContractNo,
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
      [fields.buyerIsCompany]:
        props.defaultValues?.[fields.buyerIsCompany] !== undefined &&
        props.defaultValues?.[fields.buyerIsCompany] !== null
          ? props.defaultValues?.[fields.buyerIsCompany]
          : _initValues?.[fields.buyerIsCompany],
      [fields.buyerIsOwner]:
        props.defaultValues?.[fields.buyerIsOwner] !== undefined &&
        props.defaultValues?.[fields.buyerIsOwner] !== null
          ? props.defaultValues?.[fields.buyerIsOwner]
          : _initValues?.[fields.buyerIsOwner],
      [fields.buyerName]:
        props.defaultValues?.[fields.buyerName] ||
        props.pendingOrderData?.orderContent?.buyerName,
      [fields.buyerCifNumber]:
        props.defaultValues?.[fields.buyerCifNumber] ||
        props.pendingOrderData?.orderContent?.buyerCifNumber,
      [fields.buyerDeputyName]:
        props.defaultValues?.[fields.buyerDeputyName] ||
        props.pendingOrderData?.orderContent?.buyerDeputyName,
      [fields.buyerDeputyTitle]:
        props.defaultValues?.[fields.buyerDeputyTitle] ||
        props.pendingOrderData?.orderContent?.buyerDeputyTitle,
      [fields.buyerPhone]:
        props.defaultValues?.[fields.buyerPhone] ||
        props.pendingOrderData?.orderContent?.buyerPhone,
      [fields.buyerEmail]:
        props.defaultValues?.[fields.buyerEmail] ||
        props.pendingOrderData?.orderContent?.buyerEmail,
      [fields.buyerAddress]:
        props.defaultValues?.[fields.buyerAddress] ||
        props.pendingOrderData?.orderContent?.buyerAddress,
      [fields.buyerIdNo]:
        props.defaultValues?.[fields.buyerIdNo] ||
        props.pendingOrderData?.orderContent?.buyerIdNo,
      [fields.ownerIsDriver]:
        props.defaultValues?.[fields.ownerIsDriver] !== undefined &&
        props.defaultValues?.[fields.ownerIsDriver] !== null
          ? props.defaultValues?.[fields.ownerIsDriver]
          : _initValues?.[fields.ownerIsDriver],
      [fields.ownerFullName]:
        props.defaultValues?.[fields.ownerFullName] ||
        props.pendingOrderData?.orderContent?.ownerName,
      [fields.ownerBirthday]: convertStringToDate(
        props.defaultValues?.[fields.ownerBirthday] ||
          props.pendingOrderData?.orderContent?.ownerBirthday,
        "DD-MM-YYYY"
      ),
      [fields.ownerGender]:
        props.defaultValues?.[fields.ownerGender] ||
        props.pendingOrderData?.orderContent?.driverGender ||
        _initValues?.[fields.driverGender],
      [fields.ownerIdNo]:
        props.defaultValues?.[fields.ownerIdNo] ||
        props.pendingOrderData?.orderContent?.ownerId,
      [fields.ownerPhoneNumber]:
        props.defaultValues?.[fields.ownerPhoneNumber] ||
        props.pendingOrderData?.orderContent?.ownerPhone,
      [fields.ownerEmail]:
        props.defaultValues?.[fields.ownerEmail] ||
        props.pendingOrderData?.orderContent?.ownerEmail,
      [fields.ownerAddress]:
        props.defaultValues?.[fields.ownerAddress] ||
        props.pendingOrderData?.orderContent?.ownerAddress,
      [fields.ownerExperience]:
        props.defaultValues?.[fields.driverExperience] ||
        props.pendingOrderData?.orderContent?.driverExperience,
      [fields.driverGender]:
        props.defaultValues?.[fields.driverGender] ||
        props.pendingOrderData?.orderContent?.driverGender ||
        _initValues?.[fields.driverGender],
      [fields.driverExperience]:
        props.defaultValues?.[fields.driverExperience] ||
        props.pendingOrderData?.orderContent?.driverExperience,
      [fields.driverFullName]:
        props.defaultValues?.[fields.driverFullName] ||
        props.pendingOrderData?.orderContent?.driverFullName,
      [fields.driverBirthday]: convertStringToDate(
        props.defaultValues?.[fields.driverBirthday] ||
          props.pendingOrderData?.orderContent?.driverBirthday,
        "DD-MM-YYYY"
      ),
      [fields.driverPhoneNumber]:
        props.defaultValues?.[fields.driverPhoneNumber] ||
        props.pendingOrderData?.orderContent?.driverPhone,
      [fields.activeRegionProvince]:
        props.defaultValues?.[fields.activeRegionProvince] ||
        props.pendingOrderData?.orderContent?.activeRegionProvinceCode,
      [fields.activeRegionProvinceName]:
        props.cityData?.find(
          (it: any) =>
            it?.code === props.defaultValues?.[fields.activeRegionProvince]
        )?.name || props.pendingOrderData?.orderContent?.activeRegionProvince,
      [fields.duration]: _duration,
      [fields.effectiveDate]: _effectiveDate,
      [fields.expireDate]: dayjs(_effectiveDate)
        .add(_duration, "months")
        .toDate(),
      [fields.carValue]: props.pendingOrderData?.orderContent?.estCarValue,
      [fields.estCarValue]: props.pendingOrderData?.orderContent?.estCarValue,
      [fields.sumInsurance]: props.pendingOrderData?.orderContent?.sumInsurance,
      [fields.deductibleExcess]: _initValues?.[fields.deductibleExcess],
      [fields.pkgCode]:
        props.pendingOrderData?.orderContent?.pkgCode ||
        _initValues?.[fields.pkgCode],
      [fields.discountCode]: _initValues?.[fields.discountCode],
      [fields.saleCode]:
        props.defaultValues?.[fields.saleCode] ||
        props.pendingOrderData?.orderContent?.saleCode,
      [fields.saleEmail]:
        props.defaultValues?.[fields.saleEmail] ||
        props.pendingOrderData?.orderContent?.saleEmail,
      [fields.paymentMethod]:
        props.pendingOrderData?.orderContent?.paymentChannel,
      [fields.debitAccount]:
        props.pendingOrderData?.orderContent?.paymentDebitAccount,
      [fields.paymentFrequency]: _initValues?.[fields.paymentFrequency],
      [fields.datePeriod2]: props.pendingOrderData?.orderContent?.datePeriod2,
      [fields.payFreqs]: props.pendingOrderData?.orderContent?.payFreqs,
      [fields.hasTplBundle]: props.pendingOrderData?.orderContent?.hasTplBundle,
      [fields.carRegister]: _initValues?.[fields.carRegister],
      [fields.carChassisNo]: _initValues?.[fields.carChassisNo],
      [fields.carEngineNo]: _initValues?.[fields.carEngineNo],
      [fields.carNewPlateNoDate]: _initValues?.[fields.carNewPlateNoDate],

      [fields.invoiceExport]:
        props.defaultValues?.[fields.invoiceExport] !== undefined &&
        props.defaultValues?.[fields.invoiceExport] !== null
          ? props.defaultValues?.[fields.invoiceExport]
          : _initValues?.[fields.invoiceExport],
      [fields.invoiceIsCompany]:
        props.defaultValues?.[fields.invoiceIsCompany] !== undefined &&
        props.defaultValues?.[fields.invoiceIsCompany] !== null
          ? props.defaultValues?.[fields.invoiceIsCompany]
          : _initValues?.[fields.invoiceIsCompany],
      [fields.invoiceCompanyName]:
        props.defaultValues?.[fields.invoiceCompanyName] ||
        props.pendingOrderData?.orderContent?.invoiceCompanyName,
      [fields.invoiceBuyerName]:
        props.defaultValues?.[fields.invoiceBuyerName] ||
        props.pendingOrderData?.orderContent?.invoiceBuyerName,
      [fields.invoiceTaxCode]:
        props.defaultValues?.[fields.invoiceTaxCode] ||
        props.pendingOrderData?.orderContent?.invoiceTaxCode,
      [fields.invoiceEmail]:
        props.defaultValues?.[fields.invoiceEmail] ||
        props.pendingOrderData?.orderContent?.invoiceEmail,
      [fields.invoiceAddress]:
        props.defaultValues?.[fields.invoiceAddress] ||
        props.pendingOrderData?.orderContent?.invoiceAddress,
      [fields.effectiveDateTpl]: props.pendingOrderData?.orderContent
        ?.effectiveDateTpl
        ? convertStringToDate(
            props.pendingOrderData?.orderContent?.effectiveDateTpl,
            "DD-MM-YYYY"
          )
        : dayjs().toDate(),
    };
  }, [
    // order data
    props.pendingOrderData?.orderContent?.hasBankLoan,
    // props.pendingOrderData?.orderContent?.loanContractNo,
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
    props.pendingOrderData?.orderContent?.buyerName,
    props.pendingOrderData?.orderContent?.buyerCifNumber,
    props.pendingOrderData?.orderContent?.buyerDeputyName,
    props.pendingOrderData?.orderContent?.buyerDeputyTitle,
    props.pendingOrderData?.orderContent?.buyerPhone,
    props.pendingOrderData?.orderContent?.buyerEmail,
    props.pendingOrderData?.orderContent?.buyerAddress,
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
    props.pendingOrderData?.orderContent?.saleCode,
    props.pendingOrderData?.orderContent?.saleEmail,
    props.pendingOrderData?.orderContent?.paymentChannel,
    props.pendingOrderData?.orderContent?.debitAccount,
    props.pendingOrderData?.orderContent?.datePeriod2,
    props.pendingOrderData?.orderContent?.payFreqs,
    props.pendingOrderData?.orderContent?.hasTplBundle,
    props.pendingOrderData?.orderContent?.effectiveDateTpl,

    props.pendingOrderData?.orderContent?.invoiceCompanyName,
    props.pendingOrderData?.orderContent?.invoiceBuyerName,
    props.pendingOrderData?.orderContent?.invoiceTaxCode,
    props.pendingOrderData?.orderContent?.invoiceEmail,
    props.pendingOrderData?.orderContent?.invoiceAddress,
    props.pendingOrderData?.orderContent?.buyerIdNo,
    // init values
    getInitValues,
    props.defaultValues,
    props.cityData,
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
    let _fee =
      props.pricingPackages?.[props.useFormResult.getValues(fields.pkgCode)]
        ?.totalPremium -
      (props.pricingPackages?.[props.useFormResult.getValues(fields.pkgCode)]
        ?.totalDiscount || 0);

    if (props.useFormResult.getValues(fields.hasTplBundle)) {
      _fee += props.useFormResult.getValues(fields.tplTotalPremium);
    }

    return _fee;
  }, [
    props.pricingPackages,
    props.useFormResult.watch(fields.pkgCode),
    props.useFormResult.watch(fields.hasTplBundle),
    props.useFormResult.watch(fields.tplTotalPremium),
  ]);

  const oldFee = useMemo(() => {
    let _oldFee = !!props.pricingPackages?.[
      props.useFormResult.getValues(fields.pkgCode)
    ]?.totalDiscount
      ? props.pricingPackages?.[props.useFormResult.getValues(fields.pkgCode)]
          ?.totalPremium
      : 0;

    if (props.useFormResult.getValues(fields.hasTplBundle) && _oldFee) {
      _oldFee += props.useFormResult.getValues(fields.tplTotalPremium);
    }

    return _oldFee;
  }, [
    props.pricingPackages,
    props.useFormResult.watch(fields.pkgCode),
    props.useFormResult.watch(fields.hasTplBundle),
    props.useFormResult.watch(fields.tplTotalPremium),
  ]);

  const minVehiclePriceToAdjustDown =
    props?.orderConfigData?.minVehiclePriceToAdjustDown || 0;
  const estCarValue = props.useFormResult.getValues(fields.estCarValue);
  const minEstCarValueFrom =
    estCarValue < minVehiclePriceToAdjustDown
      ? estCarValue
      : estCarValue -
        estCarValue * (props.orderConfigData?.adjustingCarValueRate / 100);

  return useMemo(() => {
    const data = [
      {
        title: "Thông tin xe",
        screens: [
          {
            inputsConfig: [
              {
                id: "ocr",
                type: "custom",
                className: classes.areaFull,
                custom: (
                  <Ocr
                    ocrService={props.ocrService}
                    saveDocService={props.saveDocService}
                    orderId={props.pendingOrderData?.orderId}
                  />
                ),
                onChange: (e: any) => {
                  props.useFormResult?.setValue(
                    fields.ownerFullName,
                    e?.target?.value?.content?.ownerName
                  );
                  props.useFormResult?.setValue(
                    fields.carPlateNo,
                    e?.target?.value?.content?.idNoPlate
                  );
                  props.useFormResult?.setValue(
                    fields.carChassisNo,
                    e?.target?.value?.content?.chassisNo
                  );
                  props.useFormResult?.setValue(
                    fields.carEngineNo,
                    e?.target?.value?.content?.engineNo
                  );
                },
              },
              {
                id: fields.coInsurances,
                type: "select",
                label: "Đối tác đồng bảo hiểm",
                validations: ["required"],
                className: classes.areaFull,
                hide:
                  !props.coInsurances || !(props.coInsurancesData?.length > 0),
                options: props.coInsurancesData?.map((it: any) => ({
                  value: it?.value,
                  label: it?.name,
                })),
              },
              {
                id: fields.hasBankLoan,
                type: "radio",
                className: classes.areaFull,
                row: true,
                label: "Loại tài sản",
                validations: ["required"],
                options: isCollateralOptions,
                onChange: (e: any) => {
                  // props.useFormResult.setValue(fields.loanContractNo, "");
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
                id: fields.loanContractType,
                type: "radio",
                label: "Tài sản đảm bảo",
                options: props.loanContractTypeData?.map((it: any) => ({
                  value: it?.value,
                  label: it?.name,
                })),
                row: true,
                className: classes.areaFull,
                hide: !props.useFormResult.getValues(fields.hasBankLoan),
                validations: ["required"],
              },
              // {
              //   id: fields.loanContractNo,
              //   type: "text",
              //   label: "Tài sản đảm bảo",
              //   className: classes.areaFull,
              //   hide: !props.useFormResult.getValues(fields.hasBankLoan),
              //   validations: props.useFormResult.getValues(fields.hasBankLoan)
              //     ? ["required"]
              //     : [],
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
                options: props?.carUsingData?.map((it: any) => ({
                  value: it?.value,
                  label: (
                    <RadioLabelBox
                      label={(carUsingMapping as any)[it?.value]}
                    />
                  ),
                })),
                onChange: (e: any) => {
                  const _value = e?.target?.value;
                  const _carType = props.carUsingData
                    ?.find((it: any) => it?.value === _value)
                    ?.child?.items?.find((it: any) => it?.selected)?.value;

                  // deductible excess
                  const _deductibleDataByCarUsingMinConfig =
                    props.deductibleData?.filter((it: any) =>
                      _value === COMMERCIAL &&
                      ["taxi", "taxi_tech"].includes(_carType)
                        ? it?.value >=
                          props.orderConfigData?.minDeductibleCommercial
                        : true
                    );

                  // const _deductibleExcess = props.useFormResult.getValues(
                  //   fields.deductibleExcess
                  // )
                  //   ? _deductibleDataByCarUsingMinConfig?.find(
                  //       (it: any) =>
                  //         it?.value ===
                  //         props.useFormResult.getValues(fields.deductibleExcess)
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
                options: props.carTypeDataByCarUsing?.map((it: any) => ({
                  value: it?.value,
                  label: it?.name,
                })),
                onChange: (e: any) => {
                  const _value = e?.target?.value;

                  // deductible excess
                  const _deductibleDataByCarUsingMinConfig =
                    props.deductibleData?.filter((it: any) =>
                      props.useFormResult.getValues(fields.carUsing) ===
                        COMMERCIAL && ["taxi", "taxi_tech"].includes(_value)
                        ? it?.value >=
                          props.orderConfigData?.minDeductibleCommercial
                        : true
                    );

                  const _deductibleExcess =
                    _deductibleDataByCarUsingMinConfig?.[0]?.value;
                  props.useFormResult?.setValue(
                    fields.deductibleExcess,
                    _deductibleExcess
                  );

                  //
                  props.useFormResult?.setValue(
                    fields.refSpecs,
                    props.carTypeDataByCarUsing?.find(
                      (it: any) => it?.value === _value
                    )?.refSpecs
                  );

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
                // options: props.carBrandDataByRefSpecs?.map((it: any) => ({
                //   value: it?.value,
                //   label: it?.name,
                // })),
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
                  props.carLineDataByCarTypeCarBrandCarYear?.map((it: any) => ({
                    value: it?.value,
                    label: it?.name,
                  })) || [],
                onChange: (e: any) => {
                  const _carLineObj =
                    props.carLineDataByCarTypeCarBrandCarYear?.find(
                      (it: any) => it?.value === e?.target?.value
                    );
                  props.useFormResult?.setValue(
                    fields.carLineName,
                    _carLineObj?.name
                  );
                  props.useFormResult?.setValue(
                    fields.carSeat,
                    [null, undefined, ""].includes(_carLineObj?.seat)
                      ? SEAT_DEFAULT
                      : _carLineObj?.seat
                  );

                  props.useFormResult?.setValue(fields.carVersion, "");
                  props.useFormResult?.setValue(fields.carVersionName, "");
                },
              },
              {
                id: "carVersion",
                type: "autocomplete",
                label: "Phiên bản",
                // validations:
                //   props.orderConfigData?.adjustingCarValueRate === -1
                //     ? undefined
                //     : ["required"],
                className: matchesDownSm ? classes.areaFull : null,
                options:
                  props.carVersionDataByCarLine?.map((it: any) => ({
                    value: it?.value,
                    label: it?.name,
                  })) || [],
                onChange: (e: any) => {
                  props.useFormResult?.setValue(
                    fields.carVersionName,
                    props.carVersionDataByCarLine?.find(
                      (it: any) => it?.value === e?.target?.value
                    )?.name
                  );
                  props.useFormResult?.setValue(fields.carVersionChanged, true);
                  props.useFormResult?.setValue(
                    fields.carVersion,
                    e?.target?.value || null
                  );
                },
                //1 hide: !!props.useFormResult
                //   ?.getValues(fields.refSpecs)
                //   ?.find((v: any) => v?.indexOf(TRUCK) !== -1),
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
              {
                id: fields.carRegister,
                type: "radio",
                row: true,
                classGroup: classesInputRadio.classRadioGroupRadius,
                classItem: classesInputRadio.classRadioRadius,
                className: classes.carRegister,
                label: (
                  <span style={{ color: theme.palette.common.white }}>
                    carRegister
                  </span>
                ),
                options: vehicleRegisterOptions?.map((it: any) => ({
                  ...it,
                  label: <RadioLabelRadius label={it?.label} />,
                })),
                disabled: !props.saleNoPlate,
                onChange: props.saleNoPlate
                  ? (e: any) => {
                      const _value = e?.target?.value;

                      if (!_value) {
                        props.useFormResult?.setValue(fields.carPlateNo, "");
                      } else {
                        props.useFormResult?.setValue(fields.carChassisNo, "");
                        props.useFormResult?.setValue(fields.carEngineNo, "");
                        props.useFormResult?.setValue(
                          fields.carNewPlateNoDate,
                          null
                        );
                      }
                    }
                  : () => {},
              },
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
                validations: ["required"],
                className: matchesDownSm ? classes.areaFull : undefined,
                // hide: props.useFormResult?.getValues(fields.carRegister),
              },
              {
                id: fields.carEngineNo,
                type: "text",
                label: "Số máy",
                validations: ["required"],
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
        title: "Thông tin bên mua bảo hiểm",
        screens: [
          {
            inputsConfig: [
              {
                id: fields.buyerIsCompany,
                type: "radio",
                row: true,
                classGroup: classesInputRadio.classRadioGroupRadius,
                classItem: classesInputRadio.classRadioRadius,
                className: matchesDownSm
                  ? classes.areaFull
                  : classes.buyerIsCompany,
                options: invoiceIsCompanyOptions?.map((it) => ({
                  value: it?.value,
                  label: <RadioLabelRadius label={it?.label} />,
                })),
                onChange: (e: any) => {
                  const _value = e?.target?.value;

                  if (_value === false) {
                    props.useFormResult.setValue(fields.buyerIsOwner, true);
                  } else {
                    props.useFormResult.setValue(fields.ownerIsDriver, false);
                  }

                  props.useFormResult.setValue(fields.invoiceIsCompany, _value);
                },
              },
              {
                id: "buyerInfo",
                type: "custom",
                custom: <TitleInfo label="Bên mua bảo hiểm" />,
                className: classes.areaFull,
                hide: !props.useFormResult.getValues(fields.buyerIsCompany),
              },
              {
                id: fields.buyerName,
                className: classes.areaFull,
                label: "Tên doanh nghiệp",
                type: "text",
                validations: ["required"],
                hide: !props.useFormResult.getValues(fields.buyerIsCompany),
                onChange: (e: any) => {
                  const _value = e?.target?.value;

                  props.useFormResult.setValue(
                    fields.invoiceCompanyName,
                    _value
                  );

                  if (
                    props.useFormResult.getValues(fields.buyerIsCompany) &&
                    props.useFormResult.getValues(fields.buyerIsOwner)
                  ) {
                    props.useFormResult.setValue(fields.ownerFullName, _value);
                  }
                },
              },
              {
                id: fields.buyerIdNo,
                type: "text",
                label: "Mã số thuế",
                className: matchesDownSm ? classes.areaFull : null,
                validations: ["required", "taxCode"],
                hide: !props.useFormResult.getValues(fields.buyerIsCompany),
                onChange: (e: any) => {
                  props.useFormResult.setValue(
                    fields.invoiceTaxCode,
                    e?.target?.value
                  );
                },
              },
              {
                id: fields.buyerCifNumber,
                type: "text",
                label: "Số CIF",
                className: matchesDownSm ? classes.areaFull : null,
                validations: ["required"],
                hide: !props.useFormResult.getValues(fields.buyerIsCompany),
              },
              {
                id: fields.buyerDeputyName,
                type: "text",
                label: "Người đại diện",
                className: matchesDownSm ? classes.areaFull : null,
                validations: ["required"],
                hide: !props.useFormResult.getValues(fields.buyerIsCompany),
                onChange: (e: any) => {
                  const _value = e?.target?.value;

                  props.useFormResult.setValue(fields.invoiceBuyerName, _value);
                },
              },
              {
                id: fields.buyerDeputyTitle,
                type: "text",
                label: "Chức vụ",
                className: matchesDownSm ? classes.areaFull : null,
                validations: ["required"],
                hide: !props.useFormResult.getValues(fields.buyerIsCompany),
              },
              {
                id: fields.buyerPhone,
                label: "Số điện thoại",
                type: "text",
                className: matchesDownSm ? classes.areaFull : null,
                validations: ["required", "phone"],
                hide: !props.useFormResult.getValues(fields.buyerIsCompany),
                onChange: (e: any) => {
                  const _value = e?.target?.value;

                  if (
                    props.useFormResult.getValues(fields.buyerIsCompany) &&
                    props.useFormResult.getValues(fields.buyerIsOwner)
                  ) {
                    props.useFormResult.setValue(
                      fields.ownerPhoneNumber,
                      _value
                    );
                  }
                },
              },
              {
                id: fields.buyerEmail,
                label: "Email nhận hợp đồng",
                type: "text",
                className: matchesDownSm
                  ? classes.areaFull
                  : ((!props.useFormResult.getValues(fields.ownerIsDriver) &&
                      props.useFormResult.getValues(fields.buyerIsOwner)) ||
                      props.useFormResult.getValues(fields.ownerIsDriver)) &&
                    props.useFormResult.getValues(fields.buyerIsCompany)
                  ? null
                  : (!props.useFormResult.getValues(fields.buyerIsOwner) &&
                      props.useFormResult.getValues(fields.buyerIsCompany)) ||
                    !props.useFormResult.getValues(fields.buyerIsCompany)
                  ? null
                  : classes.areaFull,
                validations: ["required", "email"],
                hide: !props.useFormResult.getValues(fields.buyerIsCompany),
                onChange: (e: any) => {
                  const _value = e?.target?.value;

                  props.useFormResult.setValue(fields.invoiceEmail, _value);

                  if (
                    props.useFormResult.getValues(fields.buyerIsCompany) &&
                    props.useFormResult.getValues(fields.buyerIsOwner)
                  ) {
                    props.useFormResult.setValue(fields.ownerEmail, _value);
                  }
                },
              },
              {
                id: fields.buyerAddress,
                type: "text",
                label: "Địa chỉ",
                className: classes.areaFull,
                validations: ["required"],
                hide: !props.useFormResult.getValues(fields.buyerIsCompany),
                onChange: (e: any) => {
                  const _value = e?.target?.value;

                  props.useFormResult.setValue(fields.invoiceAddress, _value);

                  if (
                    props.useFormResult.getValues(fields.buyerIsCompany) &&
                    props.useFormResult.getValues(fields.buyerIsOwner)
                  ) {
                    props.useFormResult.setValue(fields.ownerAddress, _value);
                  }
                },
              },
              {
                id: fields.buyerIsOwner,
                type: "radio",
                row: true,
                className: classes.areaFull,
                options: ownerIsCompanyOptions,
                hide: !props.useFormResult.getValues(fields.buyerIsCompany),
                onChange: (e: any) => {
                  if (e?.target?.value === true) {
                    props.useFormResult.setValue(fields.ownerIsDriver, false);

                    props.useFormResult.setValue(
                      fields.ownerFullName,
                      props.useFormResult.getValues(fields.buyerName)
                    );
                  } else {
                    props.useFormResult.setValue(
                      fields.ownerFullName,
                      props.useFormResult.getValues(fields.buyerDeputyName)
                    );
                  }

                  props.useFormResult.setValue(
                    fields.ownerPhoneNumber,
                    props.useFormResult.getValues(fields.buyerPhone)
                  );
                  props.useFormResult.setValue(
                    fields.ownerAddress,
                    props.useFormResult.getValues(fields.buyerAddress)
                  );
                  props.useFormResult.setValue(
                    fields.ownerEmail,
                    props.useFormResult.getValues(fields.buyerEmail)
                  );
                },
              },
              {
                id: fields.ownerIsDriver,
                type: "switch",
                switchLabel: "Lái xe đồng thời là chủ xe",
                className: classes.areaFull,
                checkedValue: true,
                unCheckedValue: false,
                disabled:
                  props.useFormResult.getValues(fields.buyerIsOwner) &&
                  props.useFormResult.getValues(fields.buyerIsCompany),
              },
              {
                id: "ownerInfo",
                type: "custom",
                custom: <TitleInfo label="Thông tin chủ xe" />,
                className: classes.areaFull,
                hide: props.useFormResult.getValues(fields.ownerIsDriver),
              },
              {
                id: fields.buyerCifNumber,
                type: "text",
                label: "Số CIF",
                className: classes.areaFull,
                validations: ["required"],
                hide: !!props.useFormResult.getValues(fields.buyerIsCompany),
              },
              {
                id: fields.ownerGender,
                label: "Giới tính",
                hideLabel: true,
                type: "radio",
                validations: ["required"],
                options: props.genderData?.map((it: any) => ({
                  value: it?.value,
                  label: (genderMapping as any)[it?.value],
                })),
                row: true,
                className: classes.areaFull,
                hide: !props.useFormResult.getValues(fields.ownerIsDriver),
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
                label:
                  props.useFormResult.getValues(fields.buyerIsCompany) &&
                  props.useFormResult.getValues(fields.buyerIsOwner)
                    ? "Tên công ty"
                    : "Họ và tên",
                type: "text",
                validations: ["required"],
                // disabled:
                //   props.useFormResult.getValues(fields.buyerIsOwner) &&
                //   props.useFormResult.getValues(fields.buyerIsCompany),
                // hide:
                //   props.useFormResult.getValues(fields.buyerIsOwner) &&
                //   props.useFormResult.getValues(fields.buyerIsCompany),
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
                hide:
                  props.useFormResult.getValues(fields.buyerIsOwner) &&
                  props.useFormResult.getValues(fields.buyerIsCompany),
              },
              {
                id: fields.ownerIdNo,
                label:
                  props.useFormResult.getValues(fields.buyerIsCompany) &&
                  props.useFormResult.getValues(fields.buyerIsOwner)
                    ? "Mã số thuế"
                    : "Số CMND/CCCD",
                type: "text",
                className: matchesDownSm ? classes.areaFull : null,
                validations: [
                  "required",
                  props.useFormResult.getValues(fields.buyerIsCompany) &&
                  props.useFormResult.getValues(fields.buyerIsOwner)
                    ? "taxCode"
                    : "idNo",
                ],
                // hide:
                //   props.useFormResult.getValues(fields.buyerIsOwner) &&
                //   props.useFormResult.getValues(fields.buyerIsCompany),
              },
              {
                id: fields.ownerPhoneNumber,
                label: "Số điện thoại",
                type: "text",
                className: matchesDownSm ? classes.areaFull : null,
                validations: ["required", "phone"],
                hide:
                  props.useFormResult.getValues(fields.buyerIsOwner) &&
                  props.useFormResult.getValues(fields.buyerIsCompany),
              },
              {
                id: fields.ownerEmail,
                label: "Email nhận hợp đồng",
                type: "text",
                className: matchesDownSm
                  ? classes.areaFull
                  : ((!props.useFormResult.getValues(fields.ownerIsDriver) &&
                      props.useFormResult.getValues(fields.buyerIsOwner)) ||
                      props.useFormResult.getValues(fields.ownerIsDriver)) &&
                    props.useFormResult.getValues(fields.buyerIsCompany)
                  ? null
                  : (!props.useFormResult.getValues(fields.buyerIsOwner) &&
                      props.useFormResult.getValues(fields.buyerIsCompany)) ||
                    !props.useFormResult.getValues(fields.buyerIsCompany)
                  ? null
                  : classes.areaFull,
                validations: ["required", "email"],
                hide:
                  props.useFormResult.getValues(fields.buyerIsOwner) &&
                  props.useFormResult.getValues(fields.buyerIsCompany),
              },
              {
                id: fields.ownerAddress,
                type: "text",
                label: "Địa chỉ",
                className: matchesDownSm
                  ? classes.areaFull
                  : props.useFormResult.getValues(fields.buyerIsOwner) &&
                    !props.useFormResult.getValues(fields.ownerIsDriver) &&
                    props.useFormResult.getValues(fields.buyerIsCompany)
                  ? classes.areaFull
                  : null,
                validations: ["required"],
                hide:
                  props.useFormResult.getValues(fields.buyerIsOwner) &&
                  props.useFormResult.getValues(fields.buyerIsCompany),
              },
              {
                id: fields.ownerExperience,
                label: "Số năm kinh nghiệm lái xe",
                type: "text",
                helperText:
                  "* Số năm kinh nghiệm lái xe sẽ ảnh hưởng đến mức phí bảo hiểm",
                className: matchesDownSm ? classes.areaFull : null,
                hide: !props.useFormResult.getValues(fields.ownerIsDriver),
                validations: ["required", "numberRanger"],
                min: 1,
                max: (values: any) => {
                  return (
                    dayjs().diff(
                      dayjs(values?.[fields.ownerBirthday]),
                      "years"
                    ) - 18 || 1
                  );
                },
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
                hide: props.useFormResult.getValues(fields.ownerIsDriver),
              },
              {
                id: fields.driverGender,
                type: "radio",
                label: "Giới tính",
                hideLabel: true,
                validations: ["required"],
                options: props.genderData?.map((it: any) => ({
                  value: it?.value,
                  label: (genderMapping as any)[it?.value],
                })),
                row: true,
                className: classes.areaFull,
                hide: props.useFormResult.getValues(fields.ownerIsDriver),
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
                hide: props.useFormResult.getValues(fields.ownerIsDriver),
                validations: ["required"],
              },
              {
                id: fields.driverBirthday,
                label: "Ngày sinh",
                type: "date",
                className: matchesDownSm ? classes.areaFull : null,
                validations: ["required", "date", "dateRanger"],
                openTo: "year",
                hide: props.useFormResult.getValues(fields.ownerIsDriver),
                min: dayjs().startOf("days").subtract(80, "years").toDate(),
                max: dayjs().startOf("days").subtract(18, "years").toDate(),
              },
              {
                id: fields.driverPhoneNumber,
                label: "Số điện thoại",
                type: "text",
                className: matchesDownSm ? classes.areaFull : null,
                hide: props.useFormResult.getValues(fields.ownerIsDriver),
                validations: ["required", "phone"],
              },
              {
                id: fields.driverExperience,
                label: "Số năm kinh nghiệm lái xe",
                type: "text",
                helperText:
                  "* Số năm kinh nghiệm lái xe sẽ ảnh hưởng đến mức phí bảo hiểm",
                className: matchesDownSm ? classes.areaFull : null,
                hide: props.useFormResult.getValues(fields.ownerIsDriver),
                validations: ["required", "numberRanger"],
                min: 1,
                max: (values: any) => {
                  return (
                    dayjs().diff(
                      dayjs(values?.[fields.driverBirthday]),
                      "years"
                    ) - 18 || 1
                  );
                },
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
                options: props.cityData?.map((it: any) => ({
                  value: it?.code,
                  label: it?.name,
                })),
                validations: ["required"],
                className: matchesDownSm
                  ? classes.areaFull
                  : (props.useFormResult.getValues(fields.ownerIsDriver) &&
                      !props.useFormResult.getValues(fields.buyerIsOwner) &&
                      props.useFormResult.getValues(fields.buyerIsCompany)) ||
                    props.useFormResult.getValues(fields.ownerIsDriver)
                  ? null
                  : classes.areaFull,
                onChange: (e: any) => {
                  props.useFormResult?.setValue(
                    fields.activeRegionProvinceName,
                    props.cityData?.find(
                      (it: any) => it?.code === e?.target?.value
                    )?.name
                  );
                },
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
                  label: `${it?.value} Tháng`,
                })),
                onChange: (e: any) => {
                  props.useFormResult?.setValue(
                    fields.expireDate,
                    dayjs(
                      props.useFormResult.getValues(fields.effectiveDate)
                    ).add(e?.target?.value, "months")
                  );

                  if (
                    !!props.useFormResult.getValues(fields.carValue) &&
                    !!props.useFormResult.getValues(fields.sumInsurance)
                  ) {
                    props.getPremiumEstQuery.refetch();
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
                  props.useFormResult?.setValue(
                    fields.expireDate,
                    dayjs(e?.target?.value).add(
                      props.useFormResult.getValues(fields.duration),
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
                label: "Giá trị khai báo",
                className: matchesDownSm ? classes.areaFull : null,
                disabled:
                  props.orderConfigData?.adjustingCarValueRate <= 0 &&
                  !!props.useFormResult.getValues(fields.carVersion),
                // props.orderConfigData?.adjustingCarValueRate === -1 &&
                // !!props.useFormResult.getValues(fields.carVersion),
                validations:
                  props.orderConfigData?.adjustingCarValueRate &&
                  props.orderConfigData?.adjustingCarValueRate > 0 &&
                  !!props.useFormResult.getValues(fields.carVersion)
                    ? ["required", "numberRanger"]
                    : ["required"],
                ...(props.orderConfigData?.adjustingCarValueRate &&
                props.orderConfigData?.adjustingCarValueRate > 0 &&
                !!props.useFormResult.getValues(fields.carVersion)
                  ? {
                      min: minEstCarValueFrom,
                      max:
                        props.useFormResult.getValues(fields.estCarValue) +
                        props.useFormResult.getValues(fields.estCarValue) *
                          (props.orderConfigData?.adjustingCarValueRate / 100),
                    }
                  : {}),
                onBlur: (e: any) => {
                  if (props.useFormResult.getValues(fields.sumInsurance)) {
                    props.useFormResult.setValue(
                      fields.sumInsurance,
                      e?.target?.value
                    );
                    props.getPremiumEstQuery.refetch();
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
                            props.useFormResult.getValues(fields.carValue) *
                              (props.orderConfigData?.minSumInsurancePercent /
                                100)
                          ) > props.orderConfigData?.limitSumInsuranceAmount
                        ) {
                          props.useFormResult?.setValue(fields.over, true);
                          return `Số tiền bảo hiểm tối thiểu theo yêu cầu ${
                            props.orderConfigData?.minSumInsurancePercent
                          }% giá trị khai báo (${convertCurrency(
                            Math.round(
                              props.useFormResult.getValues(fields.carValue) *
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
                min: (values: any) =>
                  Math.round(
                    values?.[fields.carValue] *
                      (props.orderConfigData?.minSumInsurancePercent / 100)
                  ),
                max: (values: any) => values?.[fields.carValue],
                // props.useFormResult.getValues(fields.carValue) >
                //   props.orderConfigData?.limitSumInsuranceAmount
                //   ? props.orderConfigData?.limitSumInsuranceAmount
                //   : props.useFormResult.getValues(fields.carValue),

                disabled: props.savePlaceOrderLoading,
                helperText: props.useFormResult.getValues(fields.carVersion) ? (
                  <span>
                    * Tổn thất xảy ra với xe sẽ được bồi thường theo tỉ lệ:{" "}
                    <b>
                      {Number(
                        (
                          ((props.useFormResult.getValues(fields.sumInsurance) /
                            props.useFormResult.getValues(fields.carValue)) *
                            100 >
                          100
                            ? 100
                            : (props.useFormResult.getValues(
                                fields.sumInsurance
                              ) /
                                props.useFormResult.getValues(
                                  fields.carValue
                                )) *
                              100) || 0
                        ).toFixed(1)
                      )}
                      %
                    </b>
                  </span>
                ) : (
                  ""
                ),
                onBlur: (e: any) => {
                  if (props.useFormResult.getValues(fields.carValue)) {
                    props.getPremiumEstQuery.refetch();
                  }
                },
              },
              {
                id: fields.deductibleExcess,
                type: "select",
                label: "Mức khấu trừ bảo hiểm",
                className: classes.areaFull,
                options: props.deductibleData
                  ?.filter((it: any) =>
                    props.useFormResult.getValues(fields.carUsing) ===
                      COMMERCIAL &&
                    ["taxi", "taxi_tech"].includes(
                      props.useFormResult?.getValues(fields.carType)
                    )
                      ? it?.value >=
                        props.orderConfigData?.minDeductibleCommercial
                      : true
                  )
                  ?.map((it: any) => ({
                    value: it?.value,
                    label: it?.name,
                  })),
                onChange: (e: any) => {
                  props.getPremiumEstQuery.refetch();
                },
              },
              // {
              //   id: fields.discountCode,
              //   className: classes.areaFull,
              //   type: "text",
              //   disabled: props.isShowCountdown,
              //   label: (
              //     <InputLabel
              //       // component="p"
              //       // className={classes.discountCodeLabel}
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
              //   onClick: () => {
              //     props.useFormResult?.setValue(fields.discountCode, "");
              //     props.useFormResult?.setValue(fields.callCheckDiscount, true);
              //   },
              //   onBlur: (e: any) => {
              //     if (e?.target?.value) {
              //       props.useFormResult?.setValue(
              //         fields.callCheckDiscount,
              //         true
              //       );
              //     } else {
              //       props.savePlaceOrderHandle();
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
                        props.pricingPackages?.[it?.pkgCode]?.totalDiscount
                      }
                      price={props.pricingPackages?.[it?.pkgCode]?.totalPremium}
                      loading={
                        props.savePlaceOrderLoading ||
                        props.getPremiumEstQuery.isInitialLoading
                      }
                      title={it?.pkgName}
                      coverages={it?.displayInfo?.map((df: any, i: number) => {
                        const _df = { ...df };

                        if (_df?.type === "CAR_ADD_ON") {
                          _df.content = _df?.texts
                            ?.filter(
                              (t: any) =>
                                !!props.pricingPackages?.[it?.pkgCode]
                                  ?.coverages?.[t?.covCode]
                            )
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
                        )
                          _df.expanded = true;

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
        hide: props.orderConfigData?.pictureLate,
        title: props.onlyCapture ? "Chụp ảnh xe" : "Tải ảnh xe",
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
                    discountCode={props.useFormResult.getValues(
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
                validations:
                  props.useFormResult?.getValues(fields.carRegister) === true
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
                  />
                ),
              },
              {
                id: fields.carCaptureFrontRight,
                label: "TRƯỚC - PHỤ",
                type: "custom",
                validations:
                  props.useFormResult?.getValues(fields.carRegister) === true
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
                  />
                ),
              },
              {
                id: fields.carCaptureRearLeft,
                label: "SAU - LÁI",
                type: "custom",
                validations:
                  props.useFormResult?.getValues(fields.carRegister) === true
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
                  />
                ),
              },
              {
                id: fields.carCaptureRearRight,
                label: "SAU - PHỤ",
                type: "custom",
                validations:
                  props.useFormResult?.getValues(fields.carRegister) === true
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
            btnNextLabel: props.backendUpdateOrder ? "Lưu" : undefined,
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
                      buyerIsCompany={_data?.buyerIsCompany}
                      buyerName={_data?.buyerName}
                      buyerPhone={_data?.buyerPhone}
                      buyerEmail={_data?.buyerEmail}
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
                        )?.name
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
                      duration={_data?.duration}
                      effectiveDate={_data?.effectiveDate}
                      expireDate={_data?.expireDate}
                      deductibleExcess={_data?.deductibleExcess}
                      oldFee={oldFee}
                      fee={fee}
                      domainLinkFile={_domainLinkFile}
                      carCaptureFrontLeft={_data?.carCaptureFrontLeft}
                      carCaptureFrontRight={_data?.carCaptureFrontRight}
                      carCaptureRearLeft={_data?.carCaptureRearLeft}
                      carCaptureRearRight={_data?.carCaptureRearRight}
                    />
                  );
                })(),
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
              //           regulationsUrl={props.orderConfigData?.regulationsUrl}
              //           termAndConditionUrl={
              //             props.orderConfigData?.termAndConditionUrl
              //           }
              //         />
              //       ),
              //       showCheckIcon: true,
              //     },
              //   ],
              //   className: classes.areaFull,
              //   validations: ["required"],
              // },
              {
                id: "divider1",
                type: "custom",
                custom: <Divider />,
                className: classes.areaFull,
              },
              {
                id: fields.hasTplBundle,
                type: "switch",
                disableDefaultOnChange: true,
                value:
                  props.useFormResult.getValues(fields.hasTplBundle) || false,
                onChange: (e: any) => {
                  if (e.target.value === true) {
                    props.useFormResult.setValue(fields.hasTplBundle, true);
                  } else {
                    props.setIsOpenDialogConfirmOffTplBundle &&
                      props?.setIsOpenDialogConfirmOffTplBundle(true);
                  }
                },
                switchLabel: (
                  <Typography>
                    Bạn muốn mua bảo hiểm TNDS ô tô? Phí:{" "}
                    <b style={{ color: theme.palette.primary.main }}>
                      {convertCurrency(
                        props.useFormResult.getValues(fields.tplTotalPremium)
                      )}
                      đ
                    </b>
                  </Typography>
                ),
                disabled: !props.useFormResult.getValues(
                  fields.tplTotalPremium
                ),
                helperText: !props.useFormResult.getValues(
                  fields.tplTotalPremium
                )
                  ? "*Xe đã có bảo hiểm TNDS tại OPES"
                  : "",
                checkedValue: true,
                unCheckedValue: false,
                className: matchesDownSm ? classes.areaFull : null,
              },
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
                id: "divider2",
                type: "custom",
                custom: <Divider />,
                className: classes.areaFull,
              },
              {
                id: "totalFee",
                type: "custom",
                custom: (
                  <TotalFee
                    title={"Tổng phí bảo hiểm"}
                    description={"(Đã bao gồm VAT)"}
                    oldFee={oldFee}
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
                disabled: props.useFormResult.getValues(fields.buyerIsCompany),
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
                disabled: props.useFormResult.getValues(fields.buyerIsCompany),
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
                disabled: props.useFormResult.getValues(fields.buyerIsCompany),
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
                disabled: props.useFormResult.getValues(fields.buyerIsCompany),
              },
            ],
          },
        ],
      },
      {
        title: "Thông tin thanh toán",
        hideStepper: true,
        screens: [
          {
            btnNextLabel: "Tạo",
            inputsConfig: [
              // {
              //   id: "paymentUserData",
              //   type: "custom",
              //   className: classes.areaFull,
              //   custom: (
              //     <div>
              //       <SummaryInfo
              //         title={"Thông tin thanh toán"}
              //         rowsData={[
              //           {
              //             label: "Họ và tên",
              //             value:
              //               props.useFormResult.getValues(fields.buyerName) ||
              //               props.useFormResult.getValues(fields.ownerFullName),
              //           },
              //           {
              //             label: "SĐT",
              //             value: props.useFormResult.getValues(
              //               fields.ownerPhoneNumber
              //             ),
              //           },
              //           {
              //             label: "Email",
              //             value: props.useFormResult.getValues(
              //               fields.ownerEmail
              //             ),
              //           },
              //         ]}
              //       />
              //       <br />
              //       <Divider />
              //     </div>
              //   ),
              // },
              {
                id: "saleInfo",
                type: "custom",
                custom: <TitleInfo label="Thông tin cộng tác viên" />,
                className: classes.areaFull,
              },
              {
                id: fields.saleCode,
                type: "action",
                label: "Mã DAO",
                validations: ["required"],
                className: classes.areaFull,
                labelAction: "Kiểm tra",
                onClick: async (e: any) => {
                  props.useFormResult.setValue(fields.callCheckStaffCode, true);
                },
                helperText: !!props.getStaffContractByCodeData?.content?.profile
                  ?.fullName
                  ? `Đã tìm thấy cộng tác viên: ${props.getStaffContractByCodeData?.content?.profile?.fullName}`
                  : "",
              },
              {
                id: "saleMethodInfo",
                type: "custom",
                custom: <TitleInfo label="Phương thức thanh toán" />,
                className: classes.areaFull,
                // hide: true,
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
                  props.getPaymentMethodsQuery?.isInitialLoading ||
                  !props.getPaymentMethodsQuery?.data?.content
                    ? paymentMethodLoadingOptions
                    : [
                        props.getPaymentMethodsQuery?.data?.content?.find(
                          (it: any) => it?.method === "AUTO_DEBIT_VPBANK"
                        ),
                        ...props.getPaymentMethodsQuery?.data?.content?.filter(
                          (it: any) => it?.method !== "AUTO_DEBIT_VPBANK"
                        ),
                      ]?.map((it: any) => ({
                        value: it?.method,
                        label: (
                          <RadioLabelPaymentMethod
                            label={it?.name}
                            icon={(paymentMethodIconMapping as any)[it?.method]}
                          />
                        ),
                      })),
                // hide: true,
              },
              {
                id: fields.debitAccount,
                type: "text",
                label: "Tài khoản thanh toán phí",
                validations: ["required"],
                className: classes.areaFull,
                hide:
                  !props.useFormResult.getValues(fields.paymentMethod) ||
                  props.useFormResult.getValues(fields.paymentMethod) !==
                    "AUTO_DEBIT_VPBANK",
              },
              {
                id: fields.paymentFrequency,
                type: "radio",
                label: "Số kỳ thanh toán",
                validations: ["required"],
                className: matchesDownSm ? classes.areaFull : null,
                row: true,
                hide: fee < props.orderConfigData?.minAmountPayFrequency,
                options: props.paymentFrequencyData
                  ?.filter((it: any) => {
                    return fee < props.orderConfigData?.minAmountPayFrequency
                      ? it?.value !== "2_TIME_YEARLY"
                      : true;
                  })
                  ?.map((it: any) => ({
                    value: it?.value,
                    label: it?.name,
                  })),
                onChange: (e: any) => {
                  const _value = e?.target?.value;
                  if (_value === "1_TIME_YEARLY") {
                    props.useFormResult.setValue(fields.payFreqs, [
                      {
                        estPaymentDate: convertDateToString(
                          dayjs().toDate(),
                          "DD-MM-YYYY"
                        ),
                      },
                    ]);
                  } else if (_value === "2_TIME_YEARLY") {
                    props.useFormResult.setValue(fields.payFreqs, [
                      {
                        estPaymentDate: convertDateToString(
                          dayjs().toDate(),
                          "DD-MM-YYYY"
                        ),
                      },
                      {
                        estPaymentDate: convertDateToString(
                          props.useFormResult.getValues(fields.datePeriod2),
                          "DD-MM-YYYY"
                        ),
                      },
                    ]);
                  }
                },
              },
              {
                id: fields.datePeriod2,
                type: "date",
                label: "Ngày thanh toán kỳ 2",
                validations: ["required", "dateRanger"],
                className: matchesDownSm ? classes.areaFull : null,
                min: dayjs().toDate(),
                max: dayjs()
                  .add(props.orderConfigData?.pay2InstallmentMaxDays, "days")
                  .toDate(),
                hide:
                  fee < props.orderConfigData?.minAmountPayFrequency ||
                  props.useFormResult.getValues(fields.paymentFrequency) ===
                    "1_TIME_YEARLY",
                onChange: (e: any) => {
                  if (e?.target?.value?.toString() !== "Invalid Date") {
                    props.useFormResult.setValue(fields.payFreqs, [
                      {
                        estPaymentDate: convertDateToString(
                          dayjs().toDate(),
                          "DD-MM-YYYY"
                        ),
                      },
                      {
                        estPaymentDate: convertDateToString(
                          e?.target?.value,
                          "DD-MM-YYYY"
                        ),
                      },
                    ]);
                  }
                },
                onBlur: () => {
                  props.getPremiumEstQuery.refetch();
                },
              },
              {
                id: "paymentFee",
                type: "custom",
                className: classes.areaFull,
                custom: (
                  <div>
                    <br />
                    <Divider />
                    <br />
                    {props.useFormResult.getValues(fields.paymentFrequency) ===
                      "2_TIME_YEARLY" && (
                      <>
                        <TotalFee
                          fee={
                            props.payFrequencies?.find(
                              (it: any) => it?.freqCode === "2_TIME_YEARLY_1"
                            )?.freqValue
                          }
                          title={"Phí bảo hiểm/kỳ"}
                        />
                        <br />
                      </>
                    )}

                    <TotalFee
                      fee={fee}
                      oldFee={oldFee}
                      title={"Tổng phí bảo hiểm"}
                      description={"(Đã bao gồm VAT)"}
                      style={{
                        alignItems: "flex-start",
                      }}
                    />
                    <br />
                    <Divider />
                  </div>
                ),
              },
            ],
          },
        ],
      },
    ];

    return data;
  }, [
    // data
    props.onlyCarUsingBusiness,
    props.carUsingData,
    props.carTypeDataByCarUsing,
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
    props.paymentFrequencyData,
    props.loanContractTypeData,
    props.coInsurancesData,
    props.getPremiumEstQuery?.data,
    // values
    props.useFormResult.watch(fields.hasBankLoan),
    props.useFormResult.watch(fields.deductibleExcess),
    props.useFormResult.watch(fields.refSpecs),
    props.useFormResult.watch(fields.carType),
    props.useFormResult.watch(fields.buyerIsCompany),
    props.useFormResult.watch(fields.buyerIsOwner),
    props.useFormResult.watch(fields.ownerIsDriver),
    // props.useFormResult.watch(fields.ownerBirthday),
    // props.useFormResult.watch(fields.driverBirthday),
    // props.useFormResult.watch(fields.carValue),
    // props.useFormResult.watch(fields.sumInsurance),
    props.useFormResult.watch(fields.estCarValue),
    props.useFormResult.watch(fields.carVersion),
    props.useFormResult.watch(fields.carUsing),
    props.useFormResult.watch(fields.invoiceExport),
    props.useFormResult.watch(fields.invoiceIsCompany),
    props.useFormResult.watch(fields.paymentMethod),
    props.useFormResult.watch(fields.paymentFrequency),
    props.useFormResult.watch(fields.tplTotalPremium),
    props.useFormResult.watch(fields.passLimitSumInsurance),
    props.useFormResult.watch(fields.carRegister),
    // service
    props.feedbackInfoCarService,
    // payment
    props.getPaymentInfoQuery?.data?.content?.orderInfo?.totalAmount,
    props.getPaymentInfoQuery?.data?.content?.orderInfo?.discounts,
    props.getPaymentInfoQuery?.isInitialLoading,
    props.getPaymentInfoQuery?.data?.content?.paymentMethods,
    props.orderConfigData?.minDeductibleCommercial,
    props.orderConfigData?.minAmountPayFrequency,
    props.orderConfigData?.pay2InstallmentMaxDays,
    props.orderConfigData?.adjustingCarValueRate,
    props.getPaymentMethodsQuery,
    fee,
    oldFee,
    props.backendUpdateOrder,
    props.saleNoPlate,
    props.coInsurances,
    props.orderConfigData?.pictureLate,
    props.hierarchies,
    props.getStaffInfoQuery?.data?.content,
  ]);
};

export default useSteps;
