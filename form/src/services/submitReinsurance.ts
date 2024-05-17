import apiCaller from "../helper/apiCaller";

const submitReinsuranceService = async (options: any) => {
  const res = await apiCaller(
    `http://localhost:8888/api/submit-reinsurance/${options?.orderId}`,
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
    }
  );

  return res?.data;
};

export default submitReinsuranceService;
