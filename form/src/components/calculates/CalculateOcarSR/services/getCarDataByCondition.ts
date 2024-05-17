import fetcher from "./fetcher";
import { DOMAIN } from "../help/const";

const getCarDataByCondition = async (options: any) => {
  const res = await fetcher(
    `${DOMAIN}/api/sale-web/car/car/data/${options?.params.vehicleKind}/${options.params.brandCode}/${options.params.year}`,
    "GET",
    {
      ...options,
      headers: {
        ...options.headers,
        caller: options?.params?.channel,
        path: `/api/sale-web/car/car/data/${options?.params.vehicleKind}/${options.params.brandCode}/${options.params.year}`,
      },
    }
  );

  return res.data;
};

export default getCarDataByCondition;
