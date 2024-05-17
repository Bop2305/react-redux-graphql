import apiCaller from "./apiCaller";

const uploadFile = async (file: any) => {
  const res = await apiCaller.postForm({
    url: `http://localhost:8000/api/commons/upload`,
    data: { file },
  } as any);

  return res.data;
};

export default uploadFile;
