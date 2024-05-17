import fetcher from "./fetcher";

const getCouponsService = async (options: any) => {
  const res = await fetcher(
    `https://staging-e-api.opes.com.vn/api/sale-web/coupon/available/${options?.params?.resourceCode}`,
    "GET",
    {
      ...options,
      headers: {
        ...options.headers,
        caller: options?.params?.channel,
        path: `/api/sale-web/coupon/available/${options?.params?.resourceCode}`,
      },
    }
  );

  return res?.data;
};

export default getCouponsService;
