import apiCaller from "./apiCaller";

const getCparamsService = async () => {
  const res = await apiCaller(
    `http://localhost:8888/api/common/cparams`,
    "GET"
  );

  return res?.data;
};

export default getCparamsService;
