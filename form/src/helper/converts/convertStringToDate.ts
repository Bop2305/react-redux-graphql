import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

const convertStringToDate = (value: any, format = "DD/MM/YYYY") => {
  dayjs.extend(customParseFormat);

  return value ? dayjs(value, format).toDate() : "";
};

export default convertStringToDate;
