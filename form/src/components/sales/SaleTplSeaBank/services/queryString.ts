import queryString from "query-string";

const objToString = (obj: any) => {
  return obj && Object.keys(obj).length > 0
    ? `?${queryString.stringify(obj)}`
    : "";
};

const stringToObj = (str: string) => {
  return queryString.parse(str);
};

const funcs = { objToString, stringToObj };

export default funcs;
