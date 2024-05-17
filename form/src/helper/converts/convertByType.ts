import convertDateToString from "./convertDateToString";

const convertByType = (value: any, type: string, options?: any) => {
  switch (type) {
    case "date":
      return convertDateToString(value);
    case "select":
    case "autocomplete":
      return options?.find((op: any) => op?.value === value)?.label;

    default:
      return value;
  }
};

export default convertByType;
