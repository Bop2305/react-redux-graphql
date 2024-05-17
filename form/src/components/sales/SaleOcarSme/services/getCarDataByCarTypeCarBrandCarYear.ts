import apiCaller from "./apiCaller";

const getCarDataByCarTypeCarBrandCarYearService = async (options: any) => {
  const res = await apiCaller(
    `http://localhost:8888/api/car/car-data-by-type-brand-year/${options?.carType}/${options?.carBrand}/${options.carYear}`,
    "GET"
  );

  return res?.data;
};

export default getCarDataByCarTypeCarBrandCarYearService;
