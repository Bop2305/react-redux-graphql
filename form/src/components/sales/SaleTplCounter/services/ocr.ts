import fetcher from "./fetcher";

const ocrService = async (options: any) => {
  const _options = {
    ...options,
    headers: {
      caller: options?.params?.channel,
      path:
        options?.ocrType === "cert"
          ? "/api/sale-web/ocr/vehicle/cert"
          : "/api/sale-web/ocr/vehicle/inspection",
    },
  };

  const res = await fetcher(
    `https://staging-e-api.opes.com.vn${_options?.headers?.path}`,
    "POST",
    _options
  );

  return res.data;
};

export default ocrService;
