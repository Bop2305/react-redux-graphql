import axios from "axios";
import FormData from "form-data";

import queryString from "./queryString";
import shaCryptor from "./shaCryptor";

const fetcher = async (url: string, method = "GET", options: any) => {
  const timestamp = Date.now();
  const queryStr = queryString.objToString(options?.query);
  const uri = `${url}${queryStr}`;
  const formData = new FormData();

  const cookies = options?.cookies || {};

  if (!!options?.file) {
    if (!!options?.file?.[0]) {
      Object.keys(options?.file)?.forEach((k) => {
        formData.append(
          options.fileKey || "file",
          options.file[k],
          options?.fileName
        );
      });
    } else {
      formData.append(
        options.fileKey || "file",
        options.file,
        options?.fileName
      );
    }

    if (typeof options?.data === "object") {
      Object.keys(options?.data)?.forEach((key) => {
        formData.append(key, options?.data?.[key]);
      });
    }
    options.data = formData;
  }

  return axios({
    method,
    url: uri,
    data: options?.data,
    headers: {
      "x-caller": options?.headers?.caller || "",
      "x-timestamp": timestamp,
      "x-sig": shaCryptor(
        options?.headers?.caller,
        cookies?.gid || "",
        timestamp,
        options?.headers?.path
      ),
      "x-sale-id": options?.headers?.saleId || "",
      "content-type": !!options?.file
        ? "multipart/form-data"
        : "application/json",

      "x-customer-id": cookies?.gid || "",
      "o-client-id": cookies?.cid || "",
      ...options?.headers,
    },
  });
};

export default fetcher;
