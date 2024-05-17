import {
  validRequired,
  validEmail,
  validPhone,
  validPlateNoCar,
  validIsDate,
  validMinMaxDate,
  validIdNo,
  validMinMaxNumber,
  validPassword,
  validStringEqual,
  validPlateNoMoto,
  validMinMaxLength,
  validTaxCode,
  validChassisNo,
  validEngineNo,
} from "./validations";

export const validate = (
  value: any,
  values: any,
  label: any,
  validations: any,
  options: any
) => {
  let error: string | boolean = true;

  for (let i = 0; i < validations?.length; i++) {
    const validation = validations[i];

    const min =
      typeof options?.min === "function" ? options?.min(values) : options?.min;
    const max =
      typeof options?.max === "function" ? options?.max(values) : options?.max;

    if (typeof validation === "function") {
      error = validation(value, label, options);
    } else if (validation === "required") {
      error = validRequired(value, label);
    } else if (validation === "email") {
      error = validEmail(value, label);
    } else if (validation === "phone") {
      error = validPhone(value, label);
    } else if (validation === "plateNoCar") {
      error = validPlateNoCar(value, label);
    } else if (validation === "plateNoMoto") {
      error = validPlateNoMoto(value, label);
    } else if (validation === "date") {
      error = validIsDate(value, label);
    } else if (validation === "dateRanger") {
      error = validMinMaxDate(value, label, min, max);
    } else if (validation === "idNo") {
      error = validIdNo(value, label);
    } else if (validation === "numberRanger") {
      error = validMinMaxNumber(value, label, min, max, options?.type);
    } else if (validation === "password") {
      error = validPassword(value, label);
    } else if (validation === "equal") {
      error = validStringEqual(
        value,
        label,
        options?.compareValue,
        options?.compareLabel
      );
    } else if (validation === "lengthRanger") {
      error = validMinMaxLength(value, label, min, max);
    } else if (validation === "taxCode") {
      error = validTaxCode(value, label);
    } else if (validation === "chassisNo") {
      error = validChassisNo(value, label);
    } else if (validation === "engineNo") {
      error = validEngineNo(value, label);
    }

    if (typeof error === "string") break;
  }

  return error;
};

export default validate;
