import apiCaller from "helper/apiCaller";

const savePlaceOrderCoreService = async (options: any) => {
  const res = await apiCaller(
    `http://localhost:8888/api/place-order-core-save/${options?.resourceCode}/${options?.orderId}`,
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

export default savePlaceOrderCoreService;
