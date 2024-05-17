import convertDateToString from "helper/converts/convertDateToString";
import apiCaller from "./apiCaller";

const createPolicyService = async (options: any) => {
  const res = await apiCaller(
    `http://localhost:8888/api/common/create-policy`,
    "POST",
    {
      ...options,
      data: {
        contextMode: options?.contextMode,
        resourceCode: options?.resourceCode,
        debitAccount: options?.debitAccount,
        paymentMethod: options?.paymentMethod,
        body: {
          ...options?.body,
          insStartDate: convertDateToString(options?.body?.insStartDate),
          insEndDate: convertDateToString(options?.body?.insEndDate),
          creditStartDate: convertDateToString(options?.body?.creditStartDate),
          creditEndDate: convertDateToString(options?.body?.creditEndDate),
        },
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
