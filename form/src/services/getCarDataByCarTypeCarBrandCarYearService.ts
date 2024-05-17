import apiCaller from "helper/apiCaller";

const getCarDataByCarTypeCarBrandCarYearService = async (options: any) => {
  const res = await apiCaller(
    `http://localhost:8888/api/car-data-by/${options?.carType}/${options?.carBrand}/${options?.carYear}`,
    "GET",
    options
  );

  return res?.data;
};

export default getCarDataByCarTypeCarBrandCarYearService;
