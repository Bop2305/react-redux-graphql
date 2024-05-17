import axios from "axios";
import FormData from "form-data";
// @ts-ignore

import queryString from "./queryString";

const apiCaller = async (
  url: string,
  method: string = "GET",
  options?: any
) => {
  const queryStr = queryString.objToString(options?.query);
  let uri = `${url}${queryStr}`;
  const formData = new FormData();

  if (!!options?.file) {
    if (!!options?.file?.[0]) {
      Object.keys(options?.file)?.forEach((k) => {
        formData.append(options.fileKey || "file", options.file[k]);
      });
    } else {
      formData.append(options.fileKey || "file", options.file);
    }

    if (typeof options?.data === "object") {
      Object.keys(options?.data)?.forEach((key) => {
        formData.append(key, options?.data?.[key]);
      });
    }
    options.data = formData;
  }
  const timestamp = Date.now();
  const cookies = options?.cookies || {}

  const hd = {
    Authorization: `Bearer ${options?.cookies?.token || ""}`,
    // "o-chn": "opes-website",
    "o-gid": options?.cookies?.gid || "",
    "x-customer-id": cookies?.gid || "",
    "x-sale-id": options?.headers?.saleId || "",

    "o-client-id": options?.cookies?.cid || "",
    "content-type": !!options?.file
      ? "multipart/form-data"
      : "application/json",
    ...options?.headers,
  };

  const res = await axios({
    method,
    url: uri,
    data: options?.data,
    headers: hd,
  });

  return res;
};

export default apiCaller;
