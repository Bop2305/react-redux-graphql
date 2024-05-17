import apiCaller from "./apiCaller";

const checkCouponService = async (options: any) => {
  const res = await apiCaller(
    `http://localhost:8888/api/common/check-coupon/${options?.discountCode}`,
    "GET",
    {
      query: {
        resourceCode: options?.resourceCode,
      },
    }
  );

  return res?.data;
};

export default checkCouponService;
