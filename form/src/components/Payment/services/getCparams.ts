import fetcher from "./fetcher";

const service = async (options: any) => {
  const _options = {
    ...options,
    headers: {
      caller: options?.params?.channel,
      path: "/api/sale-web/cparams",
    },
  };

  const res = await fetcher(
    `https://staging-e-api.opes.com.vn${_options?.headers?.path}`,
    "GET",
    _options
  );

  return res.data;
};

export default service;
