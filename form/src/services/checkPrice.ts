import apiCaller from "../helper/apiCaller";

const checkPriceService = async (options: any) => {
  const res = await apiCaller(
    `http://localhost:8888/api/fdc/check-price/${options?.packageCode}`,
    "GET",
    {
      query: {
        flightNo: options?.flightNo,
        depDate: options?.flightDate,
      },
    }
  );

  return res?.data;
};

export default checkPriceService;
