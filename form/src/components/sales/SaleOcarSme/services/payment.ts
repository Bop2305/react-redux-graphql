import apiCaller from "./apiCaller";

const paymentService = async (options: any) => {
  const res = await apiCaller(
    `http://localhost:8888/api/common/payment/${options?.goodCode}`,
    "POST",
    {
      query: {
        discountCodes: options.discountCodes,
      },
      cookies: {
        token: options?.token,
        cid: options?.cid,
        gid: options?.gid,
      },
      data: {
        failureUrl: options?.failureUrl,
        paymentMethod: options?.paymentMethod,
        successUrl: options?.successUrl,
      },
    }
  );

  return res?.data;
};

export default paymentService;
