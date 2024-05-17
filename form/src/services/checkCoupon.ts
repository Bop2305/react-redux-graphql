import apiCaller from "helper/apiCaller";

const checkCouponService = async (options: any) => {
  const res = await apiCaller(
    `http://localhost:8888/api/check-coupon/${options?.discountCode}`,
    "GET",
    {
      query: {
        resourceCode: options?.resourceCode,
      },
    }
  );

  return res?.data;
  // console.log(options);
  //
  //
  // const res = await apiCaller(
  //   `https://staging-e-api.opes.com.vn/api/sale-web/coupon/${options?.discountCode}?resourceCode=PROG_OPES_CAR.1660028128170`,
  //   "GET",
  //   {
  //     ...options,
  //     cookies: {
  //       gid: 'og.68528b4e-d86f-49b2-ad6c-f8c639c32cfa',
  //       cid: "8634e6e71048a82146cdf69bc96b66937b84569d26be6e3d3bb1748e40adf600"
  //     },
  //     headers: {
  //       ...options.headers,
  //       caller: "vpb",
  //       path: `/api/sale-web/coupon/${options?.discountCode}`,
  //     }
  //   }
  // );
  //
  // return res?.data;
};

export default checkCouponService;
