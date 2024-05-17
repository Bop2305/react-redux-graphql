import apiCaller from "helper/apiCaller";

const createPoolService = async (options: any) => {
  const res = await apiCaller(
    `http://localhost:8888/api/create-pool/${options?.orderId}`,
    "POST",
    {
      cookies: {
        token: options?.token,
        gid: "og.opes-form",
        cid: "oc.opes-form",
      },
    }
  );

  return res?.data;
};

export default createPoolService;
