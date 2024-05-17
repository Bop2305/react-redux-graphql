import apiCaller from "./apiCaller";

const getOrganizationAllService = async () => {
  const res = await apiCaller(
    `http://localhost:8888/api/common/organization-all`,
    "GET"
  );
  return res.data;
};

export default getOrganizationAllService;
