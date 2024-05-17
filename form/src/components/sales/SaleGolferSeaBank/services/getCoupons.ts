import apiCaller from "./apiCaller";

const getCouponsService = async (options: any) => {
  const res = await apiCaller(
    `http://localhost:8888/api/common/coupons/${options?.resourceCode}`,
    "GET"
  );

  return res?.data;
};

export default getCouponsService;
