import apiCaller from "../helper/apiCaller";

const getCouponsService = async (options: any) => {
  const res = await apiCaller(
    `http://localhost:8888/api/coupons/${options?.resourceCode}`,
    "GET"
  );

  return res?.data;
};

export default getCouponsService;
