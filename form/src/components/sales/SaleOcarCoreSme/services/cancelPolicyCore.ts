import apiCaller from "./apiCaller";

const cancelPolicyCoreService = async (options: any) => {
  const res = await apiCaller(
    `http://localhost:8888/api/common/cancel-policy-core`,
    "POST",
    {
      data: options.body,
    }
  );

  return res?.data;
};

export default cancelPolicyCoreService;
