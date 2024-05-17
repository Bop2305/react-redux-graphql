import apiCaller from "./apiCaller";

const getAgentExistService = async (options: any) => {
  const res = await apiCaller(
    `http://localhost:8888/api/common/agent/${options?.agentNumber}`,
    "GET",
    options
  );

  return res?.data;
};

export default getAgentExistService;
