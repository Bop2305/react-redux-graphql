import apiCaller from "../helper/apiCaller";

const getListFlightNoService = async (options: any) => {
  const res = await apiCaller(
    `http://localhost:8888/api/fdc/list-flight-no`,
    "GET",
    {
      query: {
        depDate: options?.depDate,
        flightNo: options?.flightNo,
        flightDate: options?.flightDate,
      },
    }
  );

  return res?.data;
};

export default getListFlightNoService;
