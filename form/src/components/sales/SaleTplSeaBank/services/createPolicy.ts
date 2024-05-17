import apiCaller from "./apiCaller";
import convertDateToString from "helper/converts/convertDateToString";

const createPolicyService = async (options: any) => {
  const res = await apiCaller(
    `http://localhost:8888/api/common/create-policy`,
    "POST",
    {
      ...options,
      data: {
        contextMode: options?.contextMode,
        resourceCode: options?.resourceCode,
        body: {
          ...options?.body,
          ...options,
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
