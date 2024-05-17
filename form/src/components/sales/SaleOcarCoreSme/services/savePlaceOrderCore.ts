import apiCaller from "./apiCaller";

const savePlaceOrderCoreService = async (options: any) => {
  const res = await apiCaller(
    `http://localhost:8888/api/common/save-place-order-core/${options?.resourceCode}/${options?.orderId}`,
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

export default savePlaceOrderCoreService;
