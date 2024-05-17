import apiCaller from "../helper/apiCaller";

const newMainProfileService = async (options: any) => {
  const res = await apiCaller(
    `http://localhost:8888/api/account/new-main-profile`,
    "POST",
    {
      cookies: {
        token:
          "eyJzaWciOiJvcGVzLW1hcGk7dj0xIiwidHlwIjoiand0IiwiYWxnIjoiSFM1MTIifQ.eyJ0eXBlIjoiVVNFUiIsInVzZXJJZCI6IjI4MzMiLCJleHAiOjE2NzM5Mzk5OTF9.ssXO0rwELajxvVszBdukxgObtHWJyezcXFpCctYPQs1oRFS7lYNltkScmLD_G81becVP6zzKgML6WWsKzqqz6A",
        gid: "og.opes-form",
        cid: "oc.opes-form",
      },
      data: {
        fullName: options?.fullName,
        cic: options?.cic,
        dateOfBirth: options?.dateOfBirth,
        email: options?.email,
        address: options?.address,
      },
    }
  );

  return res?.data;
};

export default newMainProfileService;
