import apiCaller from "./apiCaller";

const getProvincesService = async () => {
  const res = await apiCaller(
    `http://localhost:8888/api/common/provinces`,
    "GET"
  );

  return res?.data;
};

export default getProvincesService;
