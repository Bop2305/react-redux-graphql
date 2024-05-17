import dayjs from "dayjs";
import convertCurrency from "./converts/convertCurrency";

export const validRequired = (value: any, label: any) => {
  if (
    value === null ||
    value === undefined ||
    (typeof value !== "boolean" && value?.toString()?.trim() === "")
  )
    return `Bạn vui lòng điền ${label}`;

  return true;
};

export const validEmail = (value: any, label: any) => {
  const regExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (value)
    return regExp.test(value)
      ? true
      : `${label} sai định dạng (VD: example@gmail.com)`;

  return true;
};

export const validPhone = (value: any, label: any) => {
  const regExp = /0[0-9]{9}\b/;
  if (value)
    return regExp.test(value)
      ? true
      : `${label} sai định dạng (VD: 0351234567)`;

  return true;
};

export const validPlateNoCar = (value: any, label: any) => {
  // const regExp = /^[0-9]+[A-Za-z]{1,2}[0-9]{4,5}$/;
  const regExp = /^([0-9]{2})+[a-zA-Z0-9_.-]{5,10}$/gm;

  if (value)
    return regExp.test(value)
      ? true
      : `${label} sai định dạng (Chỉ bao gồm ký tự số và chữ, không có ký tự "-" hoặc "." VD: 81K8888)`;

  return true;
};

export const validPlateNoMoto = (value: any, label: any) => {
  // const regExp = /^[0-9]{1,2}[A-Za-zĐđ]{1,2}[0-9]{4,6}$/;
  const regExp = /^([0-9]{2})+[a-zA-Z0-9_.-]{5,10}$/gm;

  if (value)
    return regExp.test(value)
      ? true
      : `${label} sai định dạng (Chỉ bao gồm ký tự số và chữ, không có ký tự "-" hoặc "." VD: 70F166666)`;

  return true;
};

export const validIsDate = (value: any, label: any) => {
  if (
    value &&
    (dayjs(value).toDate().toString() === "Invalid Date" ||
      dayjs(value).get("years") < 1800)
  ) {
    return `${label} sai định dạng (VD: 20/03/2006)`;
  }

  return true;
};

export const validMinMaxDate = (
  value: any,
  label: any,
  minDate: any,
  maxDate: any
) => {
  if (value) {
    const _error = validIsDate(value, label);
    if (typeof _error === "string") {
      return _error;
    }

    const _value = dayjs(value).startOf("days").toDate().getTime();
    const _min = minDate
      ? dayjs(minDate).startOf("days").toDate().getTime()
      : null;
    const _max = maxDate
      ? dayjs(maxDate).startOf("days").toDate().getTime()
      : null;

    if (_min && !_max && _value < _min) {
      return `${label} lớn hơn hoặc bằng ${dayjs(_min).format("DD/MM/YYYY")}`;
    } else if (!_min && _max && _value > _max) {
      return `${label} nhỏ hơn hoặc bằng ${dayjs(_max).format("DD/MM/YYYY")}`;
    } else if (_min && _max && (_value > _max || _value < _min)) {
      return `${label} từ ${dayjs(_min).format("DD/MM/YYYY")} - ${dayjs(
        _max
      ).format("DD/MM/YYYY")}`;
    }
  }

  return true;
};

export const validIdNo = (value: any, label: any) => {
  const regExp = /^(([0-9]{9})|([0-9]{12})|(([A-Z]{1})+[0-9]{7}))$/gm;

  if (value)
    return regExp.test(value)
      ? true
      : `- CMND/CCCD có độ dài 9 hoặc 12 số
- Hộ chiếu có độ dài 8 ký tự. Ký tự đầu là chữ cái in hoa, 7 ký tự sau là số`;

  return true;
};

export const validIsNumber = (value: any, label: any) => {
  if (value) {
    if (isNaN(value)) return `${label} là số`;
  }
  return true;
};

export const validMinMaxNumber = (
  value: any,
  label: any,
  minNumber: any,
  maxNumber: any,
  type: any
) => {
  if (value) {
    const _error = validIsNumber(value, label);
    if (typeof _error === "string") {
      return _error;
    }

    const _value = parseInt(value, 10);

    if (minNumber && !maxNumber && _value < minNumber)
      return `${label} lớn hơn hoặc bằng ${
        type === "currency" ? convertCurrency(minNumber) + "đ" : minNumber
      }`;
    else if (!minNumber && maxNumber && _value > maxNumber) {
      return `${label} nhỏ hơn hoặc bằng ${
        type === "currency" ? convertCurrency(maxNumber) + "đ" : maxNumber
      }`;
    } else if (
      minNumber &&
      maxNumber &&
      (_value > maxNumber || _value < minNumber)
    ) {
      return maxNumber === minNumber
        ? `${label} là ${
            type === "currency" ? convertCurrency(minNumber) + "đ" : minNumber
          }`
        : `${label} nằm trong khoảng ${
            type === "currency" ? convertCurrency(minNumber) + "đ" : minNumber
          } - ${
            type === "currency" ? convertCurrency(maxNumber) + "đ" : maxNumber
          }`;
    }
  }
  return true;
};

export const validPassword = (value: any, label: any) => {
  if (value) {
    return /^[\S]{8,20}$/.test(value)
      ? true
      : `${label} dài từ 8 - 20 ký tự viết liền không khoảng trắng`;
  }
  return true;
};

export const validStringEqual = (
  value: any,
  label: any,
  compareValue: any,
  compareLabel: any
) => {
  if (value) {
    return value !== compareValue
      ? `${label} và ${compareLabel} không giống nhau`
      : true;
  }
  return true;
};

export const validMinMaxLength = (
  value: any,
  label: any,
  minLength: any,
  maxLength: any
) => {
  if (value) {
    const isArray = Array.isArray(value);

    if (minLength && !maxLength && value?.length < minLength)
      return `${label} lớn hơn hoặc bằng ${minLength}${
        isArray ? "" : " ký tự"
      }`;
    else if (!minLength && maxLength && value?.length > maxLength) {
      return `${label} nhỏ hơn hoặc bằng ${maxLength}${
        isArray ? "" : " ký tự"
      }`;
    } else if (
      minLength &&
      maxLength &&
      (value?.length > maxLength || value?.length < minLength)
    ) {
      return maxLength === minLength
        ? `${label} là ${minLength}${isArray ? "" : " ký tự"}`
        : `${label} nằm trong khoảng ${minLength} - ${maxLength}${
            isArray ? "" : " ký tự"
          }`;
    }
  }
  return true;
};

export const validTaxCode = (value: any, label: any) => {
  const regExp = /^([0-9]{10}|(([0-9]{10})+-+[0-9]{3}))$/gm;

  if (value)
    return regExp.test(value)
      ? true
      : `${label} sai định dạng 10 hoặc 13 chứ số (VD: 9387637282 hoặc 8574632718-837)`;

  return true;
};

export const validChassisNo = (value: any, label: any) => {
  // const regExp = /^[0-9]+[A-Za-z]{1,2}[0-9]{4,5}$/;
  const regExp = /^[a-zA-Z0-9]{8,17}$/g;

  if (value)
    return regExp.test(value)
      ? true
      : `${label} sai định dạng (Chỉ bao gồm ký tự số và chữ. Từ 8 - 17 ký tự VD: D2DRGD3K)`;

  return true;
};

export const validEngineNo = (value: any, label: any) => {
  // const regExp = /^[0-9]+[A-Za-z]{1,2}[0-9]{4,5}$/;
  const regExp = /^[a-zA-Z0-9]{8,}$/g;

  if (value)
    return regExp.test(value)
      ? true
      : `${label} sai định dạng (Chỉ bao gồm ký tự số và chữ. Từ 8 ký tự VD: D2DRGD3KDFEAWWE)`;

  return true;
};
