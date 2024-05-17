import fetcher from "./fetcher";

const getPaymentInfoService = async (options: any) => {
  const res = await fetcher(
    `https://staging-e-api.opes.com.vn/api/sale-web/get-payment/${options?.params?.goodCode}`,
    "GET",
    {
      ...options,
      query: { discountCodes: options?.query?.discountCodes },
      headers: {
        ...options.headers,
        caller: options?.params?.channel,
        path: `/api/sale-web/get-payment/${options?.params?.goodCode}`,
      },
    }
  );

  return res?.data;
};

export default getPaymentInfoService;
