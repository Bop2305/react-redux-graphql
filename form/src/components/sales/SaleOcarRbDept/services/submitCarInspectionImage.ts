import apiCaller from "./apiCaller";

const submitCarInspectionImageService = async (options: any) => {
  const res = await apiCaller(
    `http://localhost:8888/api/car/car-inspection/${options?.poolId}/${options?.orderId}/${options?.tag}?fileName=${options?.fileName}`,
    "POST",
    {
      ...options,
      file: options.file,
      fileKey: "file",
    }
  );

  return res?.data;
};

export default submitCarInspectionImageService;
