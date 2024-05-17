import fetcher from "./fetcher";
import { DOMAIN } from "../help/const";

const getProvincesService = async (options: any) => {
  const res = await fetcher(
    `${DOMAIN}/api/sale-web/car/spec/provinces`,
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
