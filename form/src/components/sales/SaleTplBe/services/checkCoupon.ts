import fetcher from "./fetcher";

const checkCouponService = async (options: any) => {
  const res = await fetcher(
    `https://staging-e-api.opes.com.vn/api/sale-web/coupon/${options?.params?.discountCode}?resourceCode=${options.params.resourceCode}`,
    "GET",
    {
      ...options,
      headers: {
        ...options.headers,
        caller: options?.params?.channel,
        path: `/api/sale-web/coupon/${options?.params?.discountCode}`,
      },
    }
  );

  return res?.data;
};

export default checkCouponService;
