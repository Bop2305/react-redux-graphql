import axios from "axios";
import FormData from "form-data";
import qs from "query-string";

import replaceParams from "./replaceParams";
import { getStorageItem } from "./localStorage";

const caller = async ({
  url,
  method,
  params,
  query,
  data,
  headers,
  cb,
}: any) => {
  const _url = qs.stringifyUrl({
    url: replaceParams(url, params),
    query,
  });

  const _header = {
    "Content-Type": "application/json",
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImNtc2FkbWluIiwiaWQiOiI2MzM2YzU5MGI1NDQ0ZTYzOGEyMDk0OWYiLCJpYXQiOjE2ODQyOTUxMTYsImV4cCI6MTY4NDg5OTkxNn0.j9feh07bykFIZi3tdq5mJPsoFptsOHEGjuwane4XJkg`,
    ...headers,
  };

  return axios({
    method,
    url: _url,
    data,
    headers: _header,
    cb,
  } as any);
};

const get = async ({ url, params, query, headers }: any) =>
  caller({ url, method: "GET", params, query, headers } as any);

const post = async ({ url, params, query, data, headers }: any) =>
  caller({ url, method: "POST", params, query, data, headers } as any);

const patch = async ({ url, params, query, data, headers }: any) =>
  caller({ url, method: "PATCH", params, query, data, headers } as any);

const remove = async ({ url, params, query, data, headers }: any) =>
  caller({ url, method: "DELETE", params, query, data, headers } as any);

const postForm = async ({ url, params, query, data, headers }: any) => {
  const formData = new FormData();

  if (typeof data === "object") {
    Object.keys(data)?.forEach((k) => {
      formData.append(k, data[k]);
    });
  }

  return caller({
    url,
    method: "POST",
    params,
    query,
    data: formData,
    headers: { ...headers, "Content-Type": "multipart/form-data" },
  } as any);
};

const apiCaller = { get, post, patch, remove, postForm };
export default apiCaller;
