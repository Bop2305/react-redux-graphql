import fetcher from "./fetcher";

const paymentService = async (options: any) => {
  const res = await fetcher(
    `https://staging-e-api.opes.com.vn/api/sale-web/payment/${options?.params?.goodCode}`,
    "POST",
    {
      ...options,
      query: {
        discountCodes: options?.query?.discountCodes,
      },
      data: {
        failureUrl: options?.data?.failureUrl,
        paymentMethod: options?.data?.paymentMethod,
        successUrl: options?.data?.successUrl,
        isWeb: true,
      },
      headers: {
        ...options.headers,
        caller: options?.params?.channel,
        path: `/api/sale-web/payment/${options?.params?.goodCode}`,
      },
    }
  );

  return res?.data;
};

export default paymentService;
