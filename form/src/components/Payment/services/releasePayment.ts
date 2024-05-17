import fetcher from "./fetcher";

const releasePaymentService = async (options: any) => {
  const res = await fetcher(
    `https://staging-e-api.opes.com.vn/api/sale-web/release/vacc/${options?.params?.goodCode}`,
    "POST",
    {
      ...options,
      headers: {
        ...options.headers,
        caller: options?.params?.channel,
        path: `/api/sale-web/release/vacc/${options?.params?.goodCode}`,
      },
    }
  );

  return res;
};

export default releasePaymentService;
