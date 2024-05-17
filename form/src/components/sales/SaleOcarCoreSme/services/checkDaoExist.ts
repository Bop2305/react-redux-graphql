import apiCaller from "./apiCaller";

const checkDaoExistService = async (options: any) => {
  const res = await apiCaller(
    `http://localhost:8888/api/common/check-dao`,
    "POST",
    {
      data: options?.body,
    }
  );

  return res?.data;
};

export default checkDaoExistService;
