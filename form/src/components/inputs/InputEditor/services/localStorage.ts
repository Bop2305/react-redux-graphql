const { localStorage } = window;

export const setStorageItem = (key: any, value: any) => {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    // handle error
  }
};

// eslint-disable-next-line consistent-return
export const getStorageItem = (key: any) => {
  try {
    const value = localStorage.getItem(key);
    return value;
  } catch (e) {
    // handle error
  }
};

export const removeStorageItem = (key: any) => {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    // handle error
  }
};
