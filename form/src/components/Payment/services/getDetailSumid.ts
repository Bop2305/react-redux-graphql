import fetcher from "./fetcher";

const getDetailSumidService = async (options: any) => {
  const res = await fetcher(
    `https://staging-e-api.opes.com.vn/api/sale-web/detail/sum-id/${options?.params?.polSumId}?append=$inspections;$polCheckChanges;`,
    "GET",
    {
      ...options,
      headers: {
        ...options.headers,
        caller: options?.params?.channel,
        path: `/api/sale-web/detail/sum-id/${options?.params?.polSumId}`,
      },
    }
  );

  return res?.data;
};

export default getDetailSumidService;
