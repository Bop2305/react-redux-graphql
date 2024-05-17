import apiCaller from "./apiCaller";

const createPoolService = async (options: any) => {
  const res = await apiCaller(
    `http://localhost:8888/api/car/create-pool/${options?.orderId}`,
    "POST"
  );

  return res?.data;
};

export default createPoolService;
