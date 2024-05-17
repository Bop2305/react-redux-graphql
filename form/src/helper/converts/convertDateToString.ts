import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

const convertDateToString = (value: any, format = "DD/MM/YYYY") => {
  dayjs.extend(customParseFormat);

  return value ? dayjs(value).format(format) : "";
};

export default convertDateToString;
