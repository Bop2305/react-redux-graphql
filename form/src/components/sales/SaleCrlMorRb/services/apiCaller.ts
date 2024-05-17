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
      "eyJzaWciOiJvcGVzLW1hcGk7dj0xIiwidHlwIjoiand0IiwiYWxnIjoiSFM1MTIifQ.eyJkb21haW4iOiJWdUVOaXJnalhKYWNTak9CSUljY0w0cnd4Umx6VXZEdktab2ozRVJURlIyZEc0dWt2V0xQcGc5WHNHZnhXeUd5ckhEcFZHQklVNmhWejUrSUpsMEFTTlBnSUlHcEhFQ1poUEF2Ym1pM1R3RT0iLCJkb21haW5WZXIiOiJ2MSIsInR5cGUiOiJVU0VSIiwidXNlcklkIjoidHVuZy5waGFuIiwiZXhwIjoxNjk4MjI4MDk3fQ.bJpAri4UeWxz0vbXUQBNF7bVSrtkFVo9ZU6OqdwGZra2OXWjpTQxdbzF6H2E9OIyC_pUObP0xRKgMp4Vds7Ctg",
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
