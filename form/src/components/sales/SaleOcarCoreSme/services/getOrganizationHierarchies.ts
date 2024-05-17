import apiCaller from "./apiCaller";

const getOrganizationHierarchiesService = async () => {
  const res = await apiCaller(
    `http://localhost:8888/api/common/organization-hierarchies`,
    "GET"
  );
  return res.data;
};

export default getOrganizationHierarchiesService;
