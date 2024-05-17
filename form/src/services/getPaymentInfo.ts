import apiCaller from "../helper/apiCaller";

const getPaymentInfoService = async (options: any) => {
  const res = await apiCaller(
    `http://localhost:8888/api/payment-info/${options?.goodCode}`,
    "GET",
    {
      query: { discountCodes: options?.discountCodes },
    }
  );

  return res?.data;
};

export default getPaymentInfoService;
