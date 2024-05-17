import apiCaller from "./apiCaller";

const saveDocService = async (options: any) => {
  const res = await apiCaller(
    `http://localhost:8888/api/common/save-doc/${options?.orderId}`,
    "POST",
    {
      ...options,
      file: options?.file,
      fileKey: "file",
      cookies: {
        token: options?.token,
        gid: options?.gid,
        cid: options?.cid,
      },
    }
  );

  return res?.data;
};

export default saveDocService;
