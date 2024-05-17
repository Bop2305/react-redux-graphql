import apiCaller from "../helper/apiCaller";

const getPaymentDetailService = async (options: any) => {
  const res = await apiCaller(
    `http://localhost:8888/api/payment-detail`,
    "GET",
    {
      query: { goodCode: options?.goodCode },
    }
  );

  return res?.data;
};

export default getPaymentDetailService;
