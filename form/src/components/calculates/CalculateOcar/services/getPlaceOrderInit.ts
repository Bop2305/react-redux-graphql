import fetcher from "./fetcher";
import { DOMAIN } from "../help/const";

const getPlaceOrderInitService = async (options: any) => {
  const res = await fetcher(
    `${DOMAIN}/api/sale-web/car/init-order/${options?.params?.resourceCode}`,
    "POST",
    {
      ...options,
      data: { orderId: options?.data?.orderId },
      headers: {
        ...options.headers,
        caller: options?.params?.channel,
        path: `/api/sale-web/car/init-order/${options?.params?.resourceCode}`,
      },
    }
  );

  return res?.data;
};

export default getPlaceOrderInitService;
