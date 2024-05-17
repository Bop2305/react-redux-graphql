import fetcher from "./fetcher";

const getProgramListService = async (options: any) => {
  const _options = {
    ...options,
    headers: {
      caller: options?.params?.channel,
      path: "/api/sale-web/program/list",
    },
  };

  const res = await fetcher(
    `https://staging-saleplatform.opes.vn${_options?.headers?.path}`,
    "GET",
    _options
  );

  return res.data;
};

export default getProgramListService;
