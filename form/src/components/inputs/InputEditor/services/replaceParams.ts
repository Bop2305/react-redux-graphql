const replaceParams = (str: any, obj: any) => {
  let s = str;
  for (const prop in obj) {
    if (obj[prop]) {
      s = s.replace(new RegExp(`:${prop}`, "g"), obj[prop]);
    }
  }
  return s;
};

export default replaceParams;
