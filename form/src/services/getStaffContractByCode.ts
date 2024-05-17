import apiCaller from "../helper/apiCaller";

const getStaffContractByCodeService = async (options: any) => {
  const res = await apiCaller(
    `http://localhost:8888/api/common/staff-contract-by-code/${options.code}`,
    "GET"
  );

  return res?.data;
};

export default getStaffContractByCodeService;
