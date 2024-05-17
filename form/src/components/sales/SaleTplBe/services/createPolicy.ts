import fetcher from "./fetcher";

const createPolicy = async (options: any) => {
  const _options = {
    ...options,
    headers: {
      caller: options?.params?.channel,
      path: "/api/sale-web/save-pol",
      saleId: options?.query?.saleId,
    },
    data: {
      ...options?.data,
      contextMode: options?.data?.contextMode,
    },
  };

  const res = await fetcher(
    `https://staging-e-api.opes.com.vn${_options?.headers?.path}`,
    "POST",
    _options
  );

  return res.data;
};

export default createPolicy;
