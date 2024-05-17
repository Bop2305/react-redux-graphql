const createDefaultValues = (inputsConfig: any) => {
  const values = {} as any;

  inputsConfig?.forEach((ipc: any) => {
    values[ipc?.id] = ipc?.defaultValue || "";
  });

  return values;
};

export default createDefaultValues;
