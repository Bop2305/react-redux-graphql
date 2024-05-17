import apiCaller from "./apiCaller";

const feedbackInfoCarService = async (options: any) => {
  const res = await apiCaller(
    `http://localhost:8888/api/car/feedback-info-car`,
    "POST",
    {
      data: options,
    }
  );

  return res?.data;
};

export default feedbackInfoCarService;
