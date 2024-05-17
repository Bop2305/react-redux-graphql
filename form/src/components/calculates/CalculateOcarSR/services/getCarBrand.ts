import fetcher from "./fetcher";
import { DOMAIN } from "../help/const";

const getCarBrandsService = async (options: any) => {
  const res = await fetcher(`${DOMAIN}/api/sale-web/car/car/brands`, "GET", {
    ...options,
    headers: {
      ...options.headers,
      caller: options?.params?.channel,
      path: "/api/sale-web/car/car/brands",
    },
  });

  return res.data;
};

export default getCarBrandsService;
