import apiCaller from "./apiCaller";

const updatePolicyFuncService = async (options: any) => {
  const res = await apiCaller(
    `http://localhost:8888/api/common/update-policy-func/${options?.resourceCode}/${options?.funcName}/${options?.polSumId}`,
    "POST",
    {
      data: {
        ...options,
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

export default updatePolicyFuncService;
