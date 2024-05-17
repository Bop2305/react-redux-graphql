import apiCaller from "../helper/apiCaller";

const ocrService = async (options: any) => {
  const res = await apiCaller(
    `http://localhost:8888/api/ocr/${options?.ocrType}`,
    "POST",
    options
  );

  return res?.data;
};

export default ocrService;
