import apiCaller from "../helper/apiCaller";

const createPolicyFdcService = async (options: any) => {
  const res = await apiCaller(
    `http://localhost:8888/api/fdc/create-policy`,
    "POST",
    {
      data: {
        ...options,
      },
      query: {
        discountCode: options?.discountCode,
      },
      cookies: {
        token: options?.token,
        gid: "og.opes-form",
        cid: "oc.opes-form",
      },
    }
  );
  //
  return res?.data;
};

export default createPolicyFdcService;
