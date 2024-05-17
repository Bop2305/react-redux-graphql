import apiCaller from "helper/apiCaller";

const pricingOcarCoreService = async (options: any) => {
  // console.log('createPolicyOcarCoreService options: ', options)
  const res = await apiCaller(
    `http://localhost:8888/api/pricing-ocar-core`,
    "POST",
    {
      cookies: {
        gid: "og.1opes-form",
        cid: "oc.1opes-form",
        token: options?.token,
      },
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
