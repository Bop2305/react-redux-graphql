import apiCaller from "helper/apiCaller";

const getPaymentInvoiceCoreService = async (options: any) => {
  const res = await apiCaller(
    `http://localhost:8888/api/payment-invoice-core`,
    "GET",
    {
      cookies: {
        gid: "og.1opes-form",
        cid: "oc.1opes-form",
        token: options?.token,
      },
      query: {
        polNo: options?.polNo,
      },
    }
  );

  if (res?.data?.content?.content?.length > 0) {
    return res?.data;
  } else {
    throw ("error")
  }

};

export default getPaymentInvoiceCoreService;
