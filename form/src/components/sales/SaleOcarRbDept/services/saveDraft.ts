import apiCaller from "./apiCaller";

const saveDraftService = async (options: any) => {
  const res = await apiCaller(
    `http://localhost:8888/api/common/save-draft`,
    "POST",
    {
      data: options,
      cookies: {
        token: options?.token,
        gid: options?.gid,
        cid: options?.cid,
      },
    }
  );

  return res?.data;
};

export default saveDraftService;
