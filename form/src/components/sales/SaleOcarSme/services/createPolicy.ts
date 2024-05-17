import apiCaller from "./apiCaller";

const createPolicyService = async (options: any) => {
  const res = await apiCaller(
    `http://localhost:8888/api/common/save-policy`,
    "POST",
    {
      ...options,
      data: {
        contextMode: options?.contextMode,
        resourceCode: options?.resourceCode,
        debitAccount: options?.debitAccount,
        paymentMethod: options?.paymentMethod,
      },
      query: {
        orderId: options?.orderId,
      },
      cookies: {
        token: options?.token,
        gid: options?.gid,
        cid: options?.cid,
      },
    }
  );

  return res?.data;
};

export default createPolicyService;
