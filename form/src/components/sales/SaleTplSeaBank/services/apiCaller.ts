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
      "eyJzaWciOiJvcGVzLW1hcGk7dj0xIiwidHlwIjoiand0IiwiYWxnIjoiSFM1MTIifQ.eyJkb21haW4iOiJqNHRwWmtzUndjb05PMlVHTHFDaFJRbzNmTkhEWDdHcDhFTXVwSC9KZ2hSaTg1RHhHSlAxajU2em05bGQ0bVVxUWpVaHBWaDZNY0kzQW15V0d0bUhEd282OWZKbmZocDYxMS9aeG5KT0RHcz0iLCJkb21haW5WZXIiOiJ2MSIsInR5cGUiOiJVU0VSIiwidXNlcklkIjoiaG8uc2VhYmFuayIsImV4cCI6MTcwMjQzNjU5NX0.3ht1Swr-sEp8MNA_j9XB9eaXMW7Yk9_HqJvPPwhrj5q9l7fOKSBwvHE90gqdtN49BdO8b9l-2fB4fqJ6f7xWDA",
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
