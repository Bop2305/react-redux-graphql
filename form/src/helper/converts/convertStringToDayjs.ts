import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

const convertStringToDayjs = (value: any, format = "DD/MM/YYYY") => {
  dayjs.extend(customParseFormat);

  return value ? dayjs(value, format) : "";
};

export default convertStringToDayjs;
