import apiCaller from "./apiCaller";

const getDraftByOrderIdService = async (options: any) => {
  const res = await apiCaller(
    `http://localhost:8888/api/common/order-draft/${options?.orderId}`,
    "GET"
  );

  return res?.data;
};

export default getDraftByOrderIdService;
