import apiCaller from "./apiCaller";

const getPlaceOrderInitService = async (options: any) => {
  const res = await apiCaller(
    `http://localhost:8888/api/common/place-order-core-init/${options?.resourceCode}`,
    "GET",
    {
      query: { orderId: options?.orderId, polSumId: options?.polSumId, polNo: options?.polNo },
    }
  );

  return res?.data;
};

export default getPlaceOrderInitService;
