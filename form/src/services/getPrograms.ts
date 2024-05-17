import apiCaller from "helper/apiCaller";

const getProgramsService = async () => {
  const res = await apiCaller(`http://localhost:8888/api/programs`, "GET");

  return res?.data;
};

export default getProgramsService;
