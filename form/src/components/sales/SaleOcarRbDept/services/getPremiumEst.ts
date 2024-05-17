import apiCaller from "./apiCaller";

const getPremiumEstService = async (options: any) => {
  const res = await apiCaller(
    `http://localhost:8888/api/common/premium-est/${options?.resourceCode}/${options?.orderId}`,
    "POST",
    {
      query: {
        discountCode: options?.discountCode,
        paymentMethod: options?.paymentMethod,
        paymentFrequency: options?.paymentFrequency,
      },
      data: options?.data,
    }
  );

  return res?.data;
};

export default getPremiumEstService;
