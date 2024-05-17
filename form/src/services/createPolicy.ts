import apiCaller from "helper/apiCaller";
import convertDateToString from "helper/converts/convertDateToString";

const createPolicyService = async (options: any) => {
  const res = await apiCaller(
    `http://localhost:8888/api/create-policy`,
    "POST",
    {
      data: {
        contextMode: options?.contextMode,
        resourceCode: options?.resourceCode,
        body: {
          ...options,
          premium: options?.totalFee,
          insurances: options?.insureds?.map((ins: any) => ({
            relation: ins?.relation,
            fullname: ins?.fullName,
            dob: convertDateToString(ins?.birthday, "DD-MM-YYYY"),
            idNo: ins?.idNo,
          })),
          buyerEmail: options?.buyerEmail || options?.ownerEmail,
          buyerPhone: options?.buyerPhone || options?.ownerPhoneNumber,
          buyerDob: convertDateToString(options?.ownerBirthday, "DD-MM-YYYY"),
          buyerIdNo: options?.ownerIdNo,
          buyerName: options?.buyerName || options?.ownerFullName,
          effectiveDate: convertDateToString(
            options?.effectiveDate,
            "DD-MM-YYYY"
          ),
          vehicleSeatCount: options?.vehicleSeatCount
            ? Number(options?.vehicleSeatCount)
            : undefined,
          expireDate: convertDateToString(options?.effectiveDate, "DD-MM-YYYY"),
        },
      },
      query: {
        orderId: options?.orderId,
      },
      cookies: {
        token: options?.token,
        gid: "og.opes-form",
        cid: "oc.opes-form",
      },
    }
  );
  //
  return res?.data;
};

export default createPolicyService;
