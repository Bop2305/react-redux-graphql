import fetcher from "./fetcher";
import { DOMAIN } from "../help/const";

const getProgramsService = async (options: any) => {
  const _options = {
    ...options,
    headers: {
      caller: options?.params?.channel,
      path: `/api/sale-web/landing`,
    },
  };

  const res = await fetcher(
    `${DOMAIN}${_options?.headers?.path}`,
    "GET",
    _options
  );

  return res.data;
};

export default getProgramsService;
