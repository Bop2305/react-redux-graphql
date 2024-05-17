import apiCaller from "./apiCaller";

const pricingOcarCoreService = async (options: any) => {
  const res = await apiCaller(
    `http://localhost:8888/api/common/pricing-ocar-core`,
    "POST",
    {
      data: {
        ...options,
        activeRegion: options.activeRegionProvince,
        activeRegionName: options.activeRegionProvinceName,
      },
    }
  );

  return res?.data;
};

export default pricingOcarCoreService;
