import apiCaller from "../helper/apiCaller";

const getPaymentMethodCoreService = async (options: any) => {
  const res = await apiCaller(
    `http://localhost:8888/api/payment-method-core`,
    "GET",
    {
      query: { discountCodes: options?.discountCodes },
    }
  );

  return res?.data;
};

export default getPaymentMethodCoreService;
