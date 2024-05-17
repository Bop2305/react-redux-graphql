import dayjs from "dayjs";
import preciseDiff from "dayjs-precise-range";

dayjs.extend(preciseDiff);

const getTimeText = (startDate: any, endDate: any) => {
  const _start = dayjs(startDate).startOf("days");
  let _end = dayjs(endDate).startOf("days");

  if (endDate) {
    _end = _end.add(1, "days");
  }

  let text = dayjs.preciseDiff(_start, _end, false);

  text = text.replace("years", "năm");
  text = text.replace("year", "năm");
  text = text.replace("months", "tháng");
  text = text.replace("month", "tháng");
  text = text.replace("days", "ngày");
  text = text.replace("day", "ngày");

  return text;
};

export default getTimeText;
