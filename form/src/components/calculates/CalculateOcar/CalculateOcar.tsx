import React from "react";
import FormSimple from "components/forms/FormSimple/FormSimple";

import {
  feedbackInfoCarServiceType,
  getCarBrandsServiceType,
  getCarDataByCarTypeCarBrandCarYearServiceType,
  getPlaceOrderInitServiceType,
  getPremiumEstType,
  getProgramsServiceType,
  getProvincesServiceType,
} from "components/sales/types";

import withTheme from "hoc/withTheme";
import useData from "./hooks/useData";
import useInputs from "./hooks/useInputs";
import useStyles from "./hooks/useStyles";

export type CalculateOcarProps = {
  getProgramsService: getProgramsServiceType;
  getPlaceOrderInitService: getPlaceOrderInitServiceType;
  getCarBrandsService: getCarBrandsServiceType;
  getCarDataByCarTypeCarBrandCarYearService: getCarDataByCarTypeCarBrandCarYearServiceType;
  premiumEstOcarService: getPremiumEstType;
  feedbackInfoCarService: feedbackInfoCarServiceType;
  getProvincesService: getProvincesServiceType;
};

const CalculateOcar = (props: CalculateOcarProps) => {
  const classes = useStyles();
  const {
    useFormResult,
    carUsingData,
    deductibleData,
    orderConfigData,
    getCarTypeDataByCarUsing,
    carTypeDataByCarUsing,
    carBrandDataByCarType,
    carYearDataByCarBrand,
    carYearDataAll,
    carLineDataByCarTypeCarBrandCarYear,
    carVersionDataByCarLine,
    carWeightData,
    durationData,
    packageCodeData,
    pricingPackages,
    handlePremiumEstOcar,
    premiumEstOcarLoading,
    handleCarValue,
    cityData,
    handleActiveRegionProvince,
  } = useData({
    getProgramsService: props.getProgramsService,
    getPlaceOrderInitService: props.getPlaceOrderInitService,
    getCarBrandsService: props.getCarBrandsService,
    getCarDataByCarTypeCarBrandCarYearService:
      props.getCarDataByCarTypeCarBrandCarYearService,
    premiumEstOcarService: props.premiumEstOcarService,
    getProvincesService: props.getProvincesService,
  });
  const inputs = useInputs({
    useFormResult,
    carUsingData,
    deductibleData,
    orderConfigData,
    getCarTypeDataByCarUsing,
    carTypeDataByCarUsing,
    carBrandDataByCarType,
    carYearDataByCarBrand,
    carYearDataAll,
    carLineDataByCarTypeCarBrandCarYear,
    carVersionDataByCarLine,
    carWeightData,
    durationData,
    packageCodeData,
    pricingPackages,
    handleCarValue,
    premiumEstOcarLoading,
    feedbackInfoCarService: props.feedbackInfoCarService,
    cityData,
    handleActiveRegionProvince,
  });

  return (
    <div>
      <FormSimple
        inputsWrapperClass={classes.inputsWrapperClass}
        useFormResult={useFormResult}
        inputsConfig={inputs}
        hideSubmitButton={true}
        onSubmit={(data) => {
          handlePremiumEstOcar();
        }}
      />
    </div>
  );
};

export default withTheme<CalculateOcarProps>(CalculateOcar);
