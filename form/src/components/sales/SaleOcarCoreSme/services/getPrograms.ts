import apiCaller from "./apiCaller";

const getProgramsService = async () => {
  const res = await apiCaller(
    `http://localhost:8888/api/common/programs`,
    "GET"
  );

  return res?.data;
};

export default getProgramsService;
