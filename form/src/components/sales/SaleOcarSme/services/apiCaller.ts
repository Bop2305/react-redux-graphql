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
      "eyJzaWciOiJvcGVzLW1hcGk7dj0xIiwidHlwIjoiand0IiwiYWxnIjoiSFM1MTIifQ.eyJkb21haW4iOiIrVGphSURSbG96SGw1cEJpNHdtUTYrNjlDSEpYaG5ncWFOa0MvSGYvK3RrdUtvSGphcWVNcWxwd0Z4M3p6cVVoUUlLN0NOeWh0ekdkaGpibmI0alZzTlFpS0lsaWQ4bkExczdhcThVVHZzcz0iLCJkb21haW5WZXIiOiJ2MSIsInR5cGUiOiJVU0VSIiwidXNlcklkIjoic21lLnR1bmcucGhhbi5vcGVzIiwiZXhwIjoxNzE1NzU4NTYzfQ.v3J4aH8W7l-ziOUr74786NF7D39NrZiWDx2wuALXzwlEhh9ZAnZEKVOgYNMZxeqkyhUjHAmzmQfGdQt522cR1A",
    cid: "ccc9837c-7e1e-4a11-9214-c0a47715c3e5",
    "x-customer-id": "ccc9837c-7e1e-4a11-9214-c0a47715c3e5",
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
