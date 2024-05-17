import apiCaller from "./apiCaller";

const ocrService = async (options: any) => {
  const res = await apiCaller(
    `http://localhost:8888/api/common/ocr/${options?.ocrType}`,
    "POST",
    options
  );

  return res?.data;
};

export default ocrService;
