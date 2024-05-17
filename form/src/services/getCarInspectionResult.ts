import apiCaller from "helper/apiCaller";

const getCarInspectionResultService = async (options: any) => {
  const res = await apiCaller(
    `http://localhost:8888/api/car-inspection/result/${options?.poolId}/${options?.imageId}`,
    "GET",
    options
  );

  return res?.data;
};

export default getCarInspectionResultService;
