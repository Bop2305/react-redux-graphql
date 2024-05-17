import apiCaller from "helper/apiCaller";

const getProvincesService = async () => {
  const res = await apiCaller(`http://localhost:8888/api/provinces`, "GET");

  return res?.data;
};

export default getProvincesService;
