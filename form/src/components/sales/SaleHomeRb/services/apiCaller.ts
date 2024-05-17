import axios from "axios";
import FormData from "form-data";

import queryString from "./queryString";

const accessToken =
  "eyJzaWciOiJvcGVzLW1hcGk7dj0xIiwidHlwIjoiand0IiwiYWxnIjoiSFM1MTIifQ.eyJkb21haW4iOiJKK29UZkJHdGlVeTlHc0JRZjlSdFg4bER3Y2FPaHUramhXT3hSc1JIaEF1TjJzQ1JaR1U0L3REaCt3eEQ2NWR0MHlIVWZ0QTdJWnI3RW12ZHNueWNGQzhWQ0lwMkIrVmg4aDF0R09oWlUyVT0iLCJkb21haW5WZXIiOiJ2MSIsInR5cGUiOiJVU0VSIiwidXNlcklkIjoidGVzdC50ZXN0IiwiZXhwIjoxNzA5NjkzMDcyfQ.ckg0aQCZq-gxZOTmlc2ZVN2OvhTYJPcQEJmxKy7Aqzz0oZyhr6BqQP4Oor3w91ZaLdecNEjXTtJKwgSLh_MYlQ";

const cidToken =
  "d27ff1f97b0236c327695d15291de86dc61231d9db6c05d99e0c1e5e3491f9f3cxcxsdsd";

const apiCaller = async (url: string, method = "GET", options?: any) => {
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

  const _headers = {
    "x-access-token": accessToken,
    cid: cidToken,
    "content-type": !!options?.file
      ? "multipart/form-data"
      : "application/json",
    ...options?.headers,
  };

  const res = await axios({
    method,
    url: uri,
    data: options?.data,
    headers: _headers,
  });

  return res;
};

export default apiCaller;
