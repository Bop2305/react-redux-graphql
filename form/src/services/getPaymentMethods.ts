import apiCaller from "../helper/apiCaller";

const getPaymentMethodsService = async () => {
  const res = await apiCaller(
    `http://localhost:8888/api/common/payment-methods`,
    "GET"
  );

  return res?.data;
};

export default getPaymentMethodsService;
