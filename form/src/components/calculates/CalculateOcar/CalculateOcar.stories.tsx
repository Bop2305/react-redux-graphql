import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { CalculateOcarProps } from "./CalculateOcar";
import CalculateOcar from "./CalculateOcar";

import getProgramsService from "./services/getPrograms";
import getPlaceOrderInitService from "./services/getPlaceOrderInit";
import getCarBrandsService from "./services/getCarBrand";
import getCarDataByCarTypeCarBrandCarYearService from "./services/getCarDataByCondition";
import premiumEstOcarService from "./services/premiumEstOcar";
import feedbackInfoCarService from "./services/feedbackInfoCar";
import getProvincesService from "./services/getProvinces";

const queryClient = new QueryClient();
const CalculateOcarWrapper = (props: CalculateOcarProps) => {
  return <CalculateOcar {...props} />;
};

export default {
  title: "components/calculates/CaculateOcar",
  component: CalculateOcarWrapper,
  argTypes: {
    onChange: {},
    onClick: {},
  },
} as ComponentMeta<typeof CalculateOcarWrapper>;

const Template: ComponentStory<typeof CalculateOcarWrapper> = (args) => (
  <QueryClientProvider client={queryClient}>
    <CalculateOcarWrapper {...args} />
    <ToastContainer limit={3} />
  </QueryClientProvider>
);

const gid = "og.opes-form";
const cid = "oc.opes-form";

export const Default = Template.bind({});
Default.args = {
  getProgramsService: async () => {
    const result = await getProgramsService({
      params: { channel: "VPBRB" },
      cookies: {
        gid: gid,
        cid: cid,
      },
    });

    return { ...result, content: result?.content?.programs };
  },
  getPlaceOrderInitService: async ({ resourceCode }) =>
    await getPlaceOrderInitService({
      params: { channel: "VPBRB", resourceCode },
      cookies: {
        gid: gid,
        cid: cid,
      },
    }),
  getCarBrandsService: async () =>
    await getCarBrandsService({
      params: { channel: "VPBRB" },
      cookies: {
        gid: gid,
        cid: cid,
      },
    }),
  getCarDataByCarTypeCarBrandCarYearService: async ({
    carType,
    carBrand,
    carYear,
  }) =>
    await getCarDataByCarTypeCarBrandCarYearService({
      params: {
        channel: "VPBRB",
        vehicleKind: carType,
        brandCode: carBrand,
        year: carYear,
      },
      cookies: {
        gid: gid,
        cid: cid,
      },
    }),
  premiumEstOcarService: async ({
    carUsing,
    carType,
    carBrand,
    carLine,
    carVersion,
    carYear,
    carSeat,
    carWeight,
    activeRegionProvince,
    ownerBirthday,
    driverExperience,
    driverBirthday,
    duration,
    effectiveDate,
    expireDate,
    carValue,
    sumInsurance,
    deductibleExcess,
    pkgCode,
    carPlateNo,
  }: any) =>
    await premiumEstOcarService({
      params: {
        channel: "VPBRB",
      },
      data: {
        carUsing,
        carType,
        carBrand,
        carLine,
        carVersion,
        carYear,
        carSeat,
        carWeight,
        activeRegionProvince,
        ownerBirthday,
        driverExperience,
        driverBirthday,
        duration,
        effectiveDate,
        expireDate,
        carValue,
        sumInsurance,
        deductibleExcess,
        pkgCode,
        carPlateNo,
      },
      cookies: {
        gid: gid,
        cid: cid,
      },
    }),
  feedbackInfoCarService: async ({
    customerPhoneNumber,
    carBrand,
    carLine,
    carVersion,
    carValue,
    carYear,
  }) =>
    await feedbackInfoCarService({
      params: {
        channel: "VPBRB",
      },
      data: {
        customerPhoneNumber,
        carBrand,
        carLine,
        carVersion,
        carValue,
        carYear,
      },
      cookies: {
        gid: gid,
        cid: cid,
      },
    }),
  getProvincesService: async () =>
    await getProvincesService({
      params: { channel: "VPBRB" },
      cookies: {
        gid: gid,
        cid: cid,
      },
    }),
};
