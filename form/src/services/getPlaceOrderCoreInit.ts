import apiCaller from "helper/apiCaller";

const getPlaceOrderCoreInitService = async (options: any) => {
  const res = await apiCaller(
    `http://localhost:8888/api/place-order-core-init/${options.resourceCode}`,
    "GET",
    {
      cookies: {
        gid: "og.1opes-form",
        cid: "oc.1opes-form",
        token: options?.token,
      },
      query: {
        orderId: options?.orderId,
      },
    }
  );

  return res?.data;
};

export default getPlaceOrderCoreInitService;
