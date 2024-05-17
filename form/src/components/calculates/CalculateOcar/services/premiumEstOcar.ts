import fetcher from "./fetcher";
import dayjs from "dayjs";
import { DOMAIN } from "../help/const";

const premiumEstOcarService = async (options: any) => {
  const body = options.data;

  const data = {
    businessUsing: body?.carUsing,
    vehicleType: body?.carType,
    vehicleBrandCode: body?.carBrand,
    vehicleLineCode: body?.carLine,
    vehicleSpecCode: body?.carVersion,
    vehicleYear: body?.carYear,
    vehicleSeatCount: body?.carSeat,
    vehicleWeightCode: body?.carWeight,
    activeRegionProvinceCode: body?.activeRegionProvince,
    ownerBirthday: dayjs(body?.ownerBirthday).format("DD-MM-YYYY"),
    driverExperience: body?.driverExperience,
    driverBirthday: !!body?.ownerIsDriver
      ? dayjs(body?.ownerBirthday).format("DD-MM-YYYY")
      : dayjs(body?.driverBirthday).format("DD-MM-YYYY"),
    duration: body?.duration,
    effectiveDate: dayjs(body?.effectiveDate).format("DD-MM-YYYY"),
    expireDate: dayjs(body?.expireDate).format("DD-MM-YYYY"),
    estCarValue: body?.carValue,
    sumInsurance: body?.sumInsurance,
    deductibleExcess: body?.deductibleExcess,
    pkgCode: body?.pkgCode,
    vehicleValue: body?.carValue,
    vehiclePlateNo: body?.carPlateNo,
  };

  const res = await fetcher(
    `${DOMAIN}/api/sale-web/order/car/premium-est`,
    "POST",
    {
      ...options,
      data: data,
      headers: {
        ...options.headers,
        caller: options?.params?.channel,
        path: `/api/sale-web/order/car/premium-est`,
      },
    }
  );

  return res?.data;
};

export default premiumEstOcarService;
