import queryString from "query-string";

const objToString = (obj: any) => {
  return obj && Object.keys(obj).length > 0
    ? `?${queryString.stringify(obj)}`
    : "";
};

const funcs = { objToString };

export default funcs;
