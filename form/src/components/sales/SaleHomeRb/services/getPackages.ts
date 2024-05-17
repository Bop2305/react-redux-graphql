import apiCaller from "./apiCaller";

const getPackagesService = async (options: any) => {
  const res = await apiCaller(
    `http://localhost:8888/api/common/package/${options.progCode}`,
    "GET"
  );

  return res?.data;
};

export default getPackagesService;
