import apiCaller from "helper/apiCaller";

const paymentService = async (options: any) => {
  const res = await apiCaller(
    `http://localhost:8888/api/payment/${options?.goodCode}`,
    "POST",
    {
      query: {
        discountCodes: options?.discountCodes,
      },
      cookies: {
        token: options?.token,
        gid: "og.opes-form",
        cid: "oc.opes-form",
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
