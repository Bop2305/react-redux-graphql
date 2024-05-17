import apiCaller from "./apiCaller";

const getPolicyService = async (options: any) => {
  const res = await apiCaller(
    `http://localhost:8888/api/common/policies/${options?.params?.id}`,
    "GET",
    options
  );

  return res?.data;
};

export default getPolicyService;
