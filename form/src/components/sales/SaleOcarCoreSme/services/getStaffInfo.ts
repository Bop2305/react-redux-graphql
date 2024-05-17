import apiCaller from "./apiCaller";

const getStaffInfoService = async (options: any) => {
  const res = await apiCaller(
    `http://localhost:8888/api/common/staff-info/${options.saleId}`,
    "GET"
  );

  return res?.data;
};

export default getStaffInfoService;
