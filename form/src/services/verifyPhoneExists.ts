import apiCaller from "../helper/apiCaller";

const verifyPhoneExistsService = async (options: any) => {
  const res = await apiCaller(
    `http://localhost:8888/api/account/verify`,
    "GET",
    {
      query: {
        phone: options?.phone,
      },
    }
  );

  return res?.data;
};

export default verifyPhoneExistsService;
