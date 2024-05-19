import apiCaller from "./apiCaller";

const getCparamsService = async () => {
  const res = await apiCaller(
    `https://staging-sale-portal.opes.com.vn/api/common/cparams`,
    "GET"
  );

  console.log('[getCparamsService] [data]', res?.data)

  return res?.data;
};

export default getCparamsService;
