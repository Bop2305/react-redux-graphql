import fetcher from "./fetcher";

const bookVoucherPolicy = async (options: any) => {
  const _options = {
    ...options,
    headers: {
      caller: options?.params?.channel,
      path: `/api/sale-web/coupon/book-voucher-policy/${options?.params?.polSumId}`,
    },
  };

  const res = await fetcher(
    `https://staging-e-api.opes.com.vn${_options?.headers?.path}`,
    "POST",
    _options
  );

  return res.data;
};

export default bookVoucherPolicy;
