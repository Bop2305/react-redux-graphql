import apiCaller from "./apiCaller";

const getCarBrandsService = async () => {
  const res = await apiCaller(
    `http://localhost:8888/api/car/car-brands`,
    "GET"
  );

  return res?.data;
};

export default getCarBrandsService;
