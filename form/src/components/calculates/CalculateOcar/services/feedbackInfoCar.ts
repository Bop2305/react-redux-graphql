import fetcher from "./fetcher";
import { DOMAIN } from "../help/const";

const feedbackInfoCarService = async (options: any) => {
  const body = options.data;

  const res = await fetcher(
    `${DOMAIN}/api/sale-web/car/customer-data`,
    "POST",
    {
      ...options,
      data: {
        ownerPhone: body?.customerPhoneNumber,
        vehicleBrand: body?.carBrand,
        vehicleLine: body?.carLine,
        vehicleSpec: body?.carVersion,
        vehicleValue: parseInt(body?.carValue),
        vehicleYear: parseInt(body?.carYear),
      },
      headers: {
        ...options.headers,
        caller: options?.params?.channel,
        path: "/api/sale-web/car/customer-data",
      },
    }
  );

  return res?.data;
};

export default feedbackInfoCarService;
