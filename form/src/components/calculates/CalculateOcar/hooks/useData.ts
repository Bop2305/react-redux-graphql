import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "@tanstack/react-query";

import toaster from "helper/toaster";
import {
  getCarBrandsServiceType,
  getCarDataByCarTypeCarBrandCarYearServiceType,
  getPlaceOrderInitServiceType,
  getPremiumEstType,
  getProgramsServiceType,
  getProvincesServiceType,
} from "components/sales/types";

import fields from "../help/fields";

type useDataProps = {
  getProgramsService: getProgramsServiceType;
  getPlaceOrderInitService: getPlaceOrderInitServiceType;
  getCarBrandsService: getCarBrandsServiceType;
  getCarDataByCarTypeCarBrandCarYearService: getCarDataByCarTypeCarBrandCarYearServiceType;
  premiumEstOcarService: getPremiumEstType;
  getProvincesService: getProvincesServiceType;
};

const useData = (props: useDataProps) => {
  const useFormResult = useForm({ mode: "onTouched" });

  const getProvincesQuery = useQuery(
    ["getProvinces"],
    props.getProvincesService,
    {
      refetchOnWindowFocus: false,
    }
  );

  // province data
  const cityData = useMemo(
    () => getProvincesQuery?.data?.content,
    [getProvincesQuery?.data?.content]
  );

  const getProgramsQuery = useQuery(["getPrograms"], props.getProgramsService, {
    refetchOnWindowFocus: false,
  });

  const resourceCode = useMemo(
    () =>
      getProgramsQuery?.data?.content?.find((it) => it?.progLine === "CAR")
        ?.resourceCode,
    [getProgramsQuery?.data?.content]
  );

  const getPlaceOrderInitQuery = useQuery(
    ["getPlaceOrderInit", resourceCode],
    () =>
      props.getPlaceOrderInitService({
        resourceCode: resourceCode as string,
      }),
    {
      refetchOnWindowFocus: false,
      enabled: !!resourceCode,
    }
  );

  const packageCodeData = useMemo(
    () => getPlaceOrderInitQuery?.data?.content?.packages,
    [getPlaceOrderInitQuery?.data?.content?.packages]
  );

  const orderSpecsData = useMemo(
    () => getPlaceOrderInitQuery?.data?.content?.orderSpecs,
    [getPlaceOrderInitQuery?.data?.content?.orderSpecs]
  );

  const deductibleData = useMemo(
    () =>
      orderSpecsData?.deductible?.items?.map((it: any) => ({
        ...it,
        name: it?.name?.replace(/,/g, "."),
      })),
    [orderSpecsData?.deductible?.items]
  );

  const carYearDataAll = useMemo(
    () => orderSpecsData?.manufactureYear?.items,
    [orderSpecsData?.manufactureYear?.items]
  );

  const carWeightData = useMemo(
    () => orderSpecsData?.weights?.items,
    [orderSpecsData?.weights?.items]
  );

  const durationData = useMemo(
    () => orderSpecsData?.insuranceDuration?.items,
    [orderSpecsData?.insuranceDuration?.items]
  );

  const carUsingData = useMemo(
    () => orderSpecsData?.businessUsing?.items,
    [orderSpecsData?.businessUsing?.items]
  );

  const getCarTypeDataByCarUsing = useCallback(
    (value) =>
      carUsingData?.find((it: any) => it?.value === value)?.child?.items,
    [carUsingData]
  );

  const carTypeDataByCarUsing = useMemo(
    () => getCarTypeDataByCarUsing(useFormResult?.getValues(fields.carUsing)),
    [getCarTypeDataByCarUsing, useFormResult?.watch(fields.carUsing)]
  );

  const orderConfigData = useMemo(
    () => getPlaceOrderInitQuery?.data?.content?.orderConfig,
    [getPlaceOrderInitQuery?.data?.content?.orderConfig]
  );

  // car data
  const getCarBrandsQuery = useQuery(
    ["getCarBrands"],
    props.getCarBrandsService,
    {
      refetchOnWindowFocus: false,
    }
  );

  const carBrandData = useMemo(
    () => getCarBrandsQuery?.data?.content,
    [getCarBrandsQuery?.data?.content]
  );

  const carBrandDataByCarType = useMemo(
    () =>
      carBrandData?.find(
        (it: any) =>
          !!it?.vehicleTypes?.find(
            (vt: any) => vt === useFormResult?.getValues(fields.carType)
          )
      )?.brands || [],
    [carBrandData, useFormResult?.watch(fields.carType)]
  );

  const carYearDataByCarBrand = useMemo(
    () =>
      carBrandDataByCarType?.find(
        (it: any) => it?.value === useFormResult?.getValues(fields.carBrand)
      )?.years,
    [carBrandDataByCarType, useFormResult?.watch(fields.carBrand)]
  );

  const getCarDataByCarTypeCarBrandCarYearQuery = useQuery(
    [
      "getCarDataByCarTypeCarBrandCarYear",
      useFormResult?.getValues(fields.carType),
      useFormResult?.getValues(fields.carBrand),
      useFormResult?.getValues(fields.carYear),
    ],
    () =>
      props.getCarDataByCarTypeCarBrandCarYearService({
        carType: useFormResult?.getValues(fields.carType),
        carBrand: useFormResult?.getValues(fields.carBrand),
        carYear: useFormResult?.getValues(fields.carYear),
      }),
    {
      refetchOnWindowFocus: false,
      enabled:
        !!useFormResult?.watch(fields.carType) &&
        !!useFormResult?.watch(fields.carBrand) &&
        !!useFormResult?.watch(fields.carYear),
    }
  );

  const carLineDataByCarTypeCarBrandCarYear = useMemo(
    () => getCarDataByCarTypeCarBrandCarYearQuery?.data?.content,
    [getCarDataByCarTypeCarBrandCarYearQuery?.data?.content]
  );

  const carVersionDataByCarLine = useMemo(
    () =>
      carLineDataByCarTypeCarBrandCarYear?.find(
        (it: any) => it?.value === useFormResult?.getValues(fields.carLine)
      )?.child?.items,
    [carLineDataByCarTypeCarBrandCarYear, useFormResult?.watch(fields.carLine)]
  );

  const premiumEstOcar = useMutation((data) =>
    props.premiumEstOcarService(data as any)
  );

  const carValueOcar = useMutation((data) =>
    props.premiumEstOcarService(data as any)
  );

  const handlePremiumEstOcar = useCallback(async () => {
    const result = await premiumEstOcar.mutateAsync(
      useFormResult.getValues() as any
    );

    const messageError = result?.content?.messages?.find(
      (it: any) => it?.field === "vehicleValue" || it?.field === "sumInsurance"
    )?.reason;
    if (messageError) {
      toaster.error(messageError);
    }

    if (
      result?.content?.messages?.find(
        (it: any) => it?.field === "vehicleValue" && it?.statusCode === 11
      )
    ) {
      useFormResult?.setValue(fields.feedbackInfoCar, true);
    }

    return result;
  }, []);

  const handleCarValue = useCallback(async () => {
    const result = await carValueOcar.mutateAsync(
      useFormResult.getValues() as any
    );

    if (
      result?.content?.estCarValue &&
      (!useFormResult.getValues(fields.carValue) ||
        !!useFormResult.getValues(fields.carVersion))
    ) {
      useFormResult?.setValue(fields.carValue, result?.content?.estCarValue);
      useFormResult?.setValue(
        fields.sumInsurance,
        result?.content?.estCarValue
      );
    }

    return result;
  }, []);

  const handleActiveRegionProvince = useCallback(async () => {
    const result = await carValueOcar.mutateAsync(
      useFormResult.getValues() as any
    );

    if (
      useFormResult.getValues(fields.activeRegionProvince) ||
      result?.content?.update?.activeRegionProvinceCode
    ) {
      // active region province
      const _activeRegionProvince =
        useFormResult.getValues(fields.activeRegionProvince) ||
        result?.content?.update?.activeRegionProvinceCode;
      useFormResult?.setValue(
        fields.activeRegionProvince,
        _activeRegionProvince
      );
    }

    return result;
  }, []);

  const pricingPackages = useMemo(
    () => premiumEstOcar?.data?.content?.pricing?.packages,
    [premiumEstOcar?.data?.content?.pricing?.packages]
  );

  return {
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
    premiumEstOcarLoading: premiumEstOcar?.isLoading,
    handleCarValue,
    cityData,
    handleActiveRegionProvince,
  };
};

export default useData;
