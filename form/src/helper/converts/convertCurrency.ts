const convertCurrency = (value: string | number) => {
  const _value: string = !!value ? value?.toString()?.split(".")?.join("") : "";

  if (!isNaN(parseInt(_value))) {
    return parseInt(_value).toLocaleString(["ban", "id"]);
  }

  return 0;
};

export default convertCurrency;
