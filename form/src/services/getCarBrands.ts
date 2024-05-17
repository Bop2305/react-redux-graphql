import apiCaller from "helper/apiCaller";

const getCarBrandsService = async () => {
  const res = await apiCaller(`http://localhost:8888/api/car-brand`, "GET");

  return res?.data;
};

export default getCarBrandsService;
