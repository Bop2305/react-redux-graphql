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
      "eyJzaWciOiJvcGVzLW1hcGk7dj0xIiwidHlwIjoiand0IiwiYWxnIjoiSFM1MTIifQ.eyJkb21haW4iOiI1dUdJZnduSHI5K0NyZ08vaE53c2FyZlZvaHovRWRoZTc3cEZ5NkpiYzFvOE0xdkxBRUQwNGVGemthQXh1RExETGN0aGl5Q3duWTNRS0tscmNKS0czTEdlRnBBSC9GNk11K2tpdm5PNjZBTG42enlUMmNSeGFCcnNUMjlXa0I4OSIsImRvbWFpblZlciI6InYxIiwidHlwZSI6IlVTRVIiLCJ1c2VySWQiOiJURUNIX0FETUlOIiwiZXhwIjoxNzE2NTE4NDQxfQ.mA4LFZPEmbLwMrjMWt6Lq-VB2Atewx0FRYIbn-iLpsyY2T-O37auQOp72cDiKVf84euar-cXddhZggW8ykumuw",
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
