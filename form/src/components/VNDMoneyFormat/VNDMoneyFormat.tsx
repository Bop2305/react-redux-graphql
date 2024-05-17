import React from "react";
import { makeStyles, useTheme } from "@mui/styles";
import { Typography } from "@mui/material";

import convertCurrency from "helper/converts/convertCurrency";

const useStyle = makeStyles((theme) => ({
  moneySuffix: {
    // color: theme.palette.grey[500],
    lineHeight: 1.5,
  },
}));
const VNDMoneyFormat = ({
  suffix = "đ",
  value,
  fontSize,
  boldPriceText = true,
  boldSuffix,
  suffixFontSize,
  suffixSameMoneyColor,
  style = {},
  suffixStyle = {},
  ...other
}: any) => {
  const classes = useStyle();
  const theme = useTheme();

  if (!value && value !== 0) {
    return value ?? "";
  }
  return (
    <span
      style={{
        ...(fontSize && { fontSize: fontSize }),
        color: theme.palette.text.primary,
        display: "flex",
        alignItems: "baseline",
        gap: theme.spacing(1),
        ...style,
      }}
    >
      <Typography
        {...other}
        component="span"
        style={{
          ...(boldPriceText && {
            fontWeight: "bold",
          }),

          color: "inherit",
          ...other.style,
        }}
      >
        {convertCurrency(value)}
      </Typography>{" "}
      <span
        className={classes.moneySuffix}
        style={{
          ...(suffixFontSize && { fontSize: suffixFontSize }),
          fontWeight: boldSuffix ? "bold" : "normal",
          ...(suffixSameMoneyColor && { color: "inherit" }),
          ...suffixStyle,
        }}
      >
        {suffix}
      </span>
    </span>
  );
};

export default VNDMoneyFormat;
