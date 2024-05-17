import apiCaller from "helper/apiCaller";

const paymentCoreService = async (options: any) => {
  const res = await apiCaller(
    `http://localhost:8888/api/payment-core`,
    "POST",
    {
      query: {
        discountCodes: options?.discountCodes,
      },
      cookies: {
        token: options?.token,
        gid: "og.opes-form",
        cid: "oc.opes-form",
      },
      data: {
        failureUrl: options?.failureUrl,
        paymentMethod: options?.paymentMethod,
        successUrl: options?.successUrl,
        consolidatedInstalmentNo: options?.consolidatedInstalmentNo,
        refPaymentId: options.refPaymentId,
        paymentTriggerBy: options.paymentTriggerBy,
        isWeb: true
      },
    }
  );

  return res?.data;
};

export default paymentCoreService;
