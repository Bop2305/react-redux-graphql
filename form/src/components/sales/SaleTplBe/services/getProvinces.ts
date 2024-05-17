import fetcher from "./fetcher";

const getProvincesService = async (options: any) => {
  const res = await fetcher(
    `https://staging-e-api.opes.com.vn/api/sale-web/car/spec/provinces`,
    "GET",
    {
      ...options,
      headers: {
        ...options.headers,
        caller: options?.params?.channel,
        path: "/api/sale-web/car/spec/provinces",
      },
    }
  );

  return res?.data;
};

export default getProvincesService;
