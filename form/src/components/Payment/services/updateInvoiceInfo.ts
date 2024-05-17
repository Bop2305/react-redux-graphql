import fetcher from "./fetcher";

const updateInvoiceInfoService = async (options: any) => {
  const res = await fetcher(
    `https://staging-e-api.opes.com.vn/api/sale-web/save-payment-invoice/${options?.params?.goodCode}`,
    "POST",
    {
      ...options,
      data: {
        invoiceCompanyName: options?.data?.invoiceCompanyName,
        invoiceTaxCode: options?.data?.invoiceTaxCode,
        invoiceBuyerName: options?.data?.invoiceBuyerName,
        invoiceAddress: options?.data?.invoiceAddress,
        invoiceEmail: options?.data?.invoiceEmail,
        invoicePhone: options?.data?.invoicePhone,
        invoiceIsCompany: options?.data?.invoiceIsCompany,
        invoiceExport: options?.data?.invoiceExport,
      },
      headers: {
        ...options.headers,
        caller: options?.params?.channel,
        path: `/api/sale-web/save-payment-invoice/${options?.params?.goodCode}`,
      },
    }
  );

  return res?.data;
};

export default updateInvoiceInfoService;
