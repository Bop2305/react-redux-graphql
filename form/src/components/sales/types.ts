export type getProgramsServiceType = () => Promise<{
  content: {
    progLine: string;
    resourceCode: string;
  }[];
  message: string;
  statusCode: number | string;
}>;

export type getPlaceOrderInitServiceType = ({
  resourceCode,
  orderId,
  polSumId,
  polNo,
}: {
  resourceCode: string;
  orderId?: string;
  polSumId?: number;
  polNo?: string;
}) => Promise<{
  content: any;
  message: string;
  statusCode: number | string;
}>;

export type getProvincesServiceType = () => Promise<{
  content: any;
  message: string;
  statusCode: number | string;
}>;

export type getCarBrandsServiceType = () => Promise<{
  content: any;
  message: string;
  statusCode: number | string;
}>;

export type getCarDataByCarTypeCarBrandCarYearServiceType = ({
  carType,
  carBrand,
  carYear,
}: {
  carType: string;
  carBrand: string;
  carYear: string | number;
}) => Promise<{
  content: any;
  message: string;
  statusCode: number | string;
}>;

export type feedbackInfoCarServiceType = ({
  carBrand,
  carYear,
  carLine,
  carVersion,
  carValue,
  customerPhoneNumber,
}: {
  carBrand: string;
  carYear: string | number;
  carLine: string;
  carVersion: string;
  carValue: number;
  customerPhoneNumber: string;
}) => Promise<{
  content: any;
  message: string;
  statusCode: number | string;
}>;

export type savePlaceOrderServiceType = ({
  resourceCode,
  orderId,
  key,
}: {
  resourceCode: string;
  orderId: string;
  [key: string]: any;
}) => Promise<{
  content: any;
  message: string;
  statusCode: number | string;
}>;

export type checkCouponServiceType = ({
  discountCode,
  resourceCode,
}: {
  discountCode: string;
  resourceCode: string;
}) => Promise<{
  content: any;
  message: string;
  statusCode: number | string;
}>;

export type createPoolServiceType = ({
  orderId,
}: {
  orderId: string;
}) => Promise<{
  content: any;
  message: string;
  statusCode: number | string;
}>;

export type submitCarInspectionImageServiceType = ({
  poolId,
  orderId,
  tag,
  fileName,
  file,
}: {
  poolId: string;
  orderId: string;
  tag: string;
  fileName: string;
  file: any;
}) => Promise<{
  content: any;
  message: string;
  statusCode: number | string;
}>;

export type getCarInspectionResultServiceType = ({
  poolId,
  imageId,
}: {
  poolId: string;
  imageId: string;
}) => Promise<{
  content: any;
  message: string;
  statusCode: number | string;
}>;

export type createPolicyServiceType = ({
  contextMode,
  resourceCode,
  orderId,
}: {
  contextMode: "CHECK_PRICE" | "EXECUTION" | "VALIDATE";
  resourceCode: string;
  orderId: string;
}) => Promise<{
  content: any;
  message: string;
  statusCode: number | string;
}>;

export type pricingOcarCoreServiceType = ({
  resourceCode,
  orderId,
}: {
  resourceCode: string;
  orderId: string;
  carYearExternalCode: any
}) => Promise<{
  content: any;
  message: string;
  statusCode: number | string;
}>;

export type getPaymentInfoServiceType = ({
  goodCode,
  discountCodes,
}: {
  goodCode: string;
  discountCodes?: string;
}) => Promise<{
  content: any;
  message: string;
  statusCode: number | string;
}>;

export type getPaymentDetailType = ({
  goodCode,
}: {
  goodCode: string;
}) => Promise<{
  content: any;
  message: string;
  statusCode: number | string;
}>;

export type getPaymentInvoiceCoreServiceType = ({
  polNo
}: {
  polNo: string;
}) => Promise<{
  content: any;
  message: string;
  statusCode: number | string;
}>;

export type paymentServiceType = ({
  goodCode,
  discountCodes,
  failureUrl,
  paymentMethod,
  successUrl,
}: {
  goodCode: string;
  discountCodes?: string;
  failureUrl: string;
  paymentMethod: string;
  successUrl: string;
}) => Promise<{
  content: any;
  message: string;
  statusCode: number | string;
}>;

export type getStaffContractByCodeType = ({
  code,
}: {
  code: string;
}) => Promise<{
  content: any;
  message: string;
  statusCode: number | string;
}>;

export type getPaymentMethodsType = () => Promise<{
  content: any;
  message: string;
  statusCode: number | string;
}>;

export type getPremiumEstType = ({
  resourceCode,
  orderId,
  discountCode,
  paymentMethod,
  paymentFrequency,
}: {
  resourceCode: string;
  orderId: string;
  discountCode?: string;
  paymentMethod?: string;
  paymentFrequency?: string;
  data?: any;
}) => Promise<{
  content: any;
  message: string;
  statusCode: number | string;
}>;

export type defaultValuesType = {
  buyerIsCompany?: boolean;
  ownerIsCompany?: boolean;
  buyerName?: string;
  buyerCifNumber?: string;
  buyerDeputyName?: string;
  buyerDeputyTitle?: string;
  buyerPhone?: string;
  buyerEmail?: string;
  buyerBirthday?: string;
  buyerAddress?: string;
  buyerIdNo?: string;
  ownerIsDriver?: boolean;
  ownerFullName?: string;
  ownerBirthday?: string;
  ownerGender?: string;
  ownerIdNo?: string;
  ownerPhoneNumber?: string;
  ownerEmail?: string;
  driverGender?: string;
  driverFullName?: string;
  driverBirthday?: string;
  driverPhoneNumber?: string;
  driverExperience?: number;
  activeRegionProvince?: number;
  invoiceExport?: boolean;
  invoiceIsCompany?: boolean;
  invoiceCompanyName?: string;
  invoiceBuyerName?: string;
  invoiceTaxCode?: string;
  invoiceEmail?: string;
  invoiceAddress?: string;
  saleCode?: string;
  saleEmail?: string;
};

export type verifyPhoneExistsType = ({ phone }: { phone: string }) => Promise<{
  content: any;
  message: string;
  statusCode: number | string;
}>;

export type newMainProfileType = ({
  fullName,
  cic,
  dateOfBirth,
  email,
  address,
}: {
  fullName: string;
  cic: string;
  dateOfBirth: string;
  email: string;
  address: string;
}) => Promise<{
  content: any;
  message: string;
  statusCode: number | string;
}>;

export type getListFlightNoServiceType = ({
  depDate,
  flightNo,
  flightDate,
}: {
  depDate: string;
  flightNo?: string;
  flightDate?: string;
}) => Promise<{
  content: any;
  message: string;
  statusCode: number | string;
}>;

export type checkPriceServiceType = ({
  packageCode,
  flightNo,
  flightDate,
}: {
  packageCode: string;
  flightNo: string;
  flightDate: string;
}) => Promise<{
  content: any;
  message: string;
  statusCode: number | string;
}>;

export type getCouponsType = ({
  resourceCode,
}: {
  resourceCode: string;
}) => Promise<{
  content: any;
  message: string;
  statusCode: number | string;
}>;

export type submitReinsuranceServiceType = ({
  orderId,
}: {
  orderId: string;
}) => Promise<{
  content: any;
  message: string;
  statusCode: number | string;
}>;
