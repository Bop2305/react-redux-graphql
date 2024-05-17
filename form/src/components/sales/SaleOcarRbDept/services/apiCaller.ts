import axios from "axios";
import FormData from "form-data";

import queryString from "./queryString";

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
    "x-access-token":
      "eyJzaWciOiJvcGVzLW1hcGk7dj0xIiwidHlwIjoiand0IiwiYWxnIjoiSFM1MTIifQ.eyJkb21haW4iOiJYK0NXZGlCeXJEV2t0ZlRFa0IrVjBJVVc1TjdGN0ZXT2RSNjlkdG9wMENUZXk1aUwyMEVJdFpJOVl1TjNzajVKeXJMMEMzMWRreUdqcjlZa2M0R0UzWG05Y21LN056QzFqZllKVXcwSjZPVCtlYktoNm9CTUFFOFFpRkNpTERRdyIsImRvbWFpblZlciI6InYxIiwidHlwZSI6IlVTRVIiLCJ1c2VySWQiOiJ2cGJyYmRlcHQuaG8iLCJleHAiOjE3MTA4NDQzODF9.El-c8S7x9JUgDc7K76wCC9aqeLrzYvgAae57p1mscvgc3LKrC76hmj70-JtcbiK88r7XMHDIoia3xDe7optXrw",
    cid: "d27ff1f97b0236c327695d15291de86dc61231d9db6c05d99e0c1e5e3491f9f3cxcxsdsd",
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
