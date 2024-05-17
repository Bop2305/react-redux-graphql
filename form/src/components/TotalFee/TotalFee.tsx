import React from "react";
import { Typography, useMediaQuery } from "@mui/material";
import { makeStyles } from "@mui/styles";
import VNDMoneyFormat from "components/VNDMoneyFormat";
import theme from "theme";

const useStyles = makeStyles((theme) => {
  return {
    title: {
      color: theme.palette.common.purple,
      fontWeight: `${theme.typography.fontWeightBold} !important`,
    },
    description: {
      fontStyle: "italic",
    },
    oldFee: {
      display: "block",
      lineHeight: 1,
    },
    fee: {
      display: "block",
      lineHeight: 1,
      fontSize: "1.4rem !important",
    },
    feeBlock: {
      textAlign: "end",
      flexShrink: 0,
    },
    titleBlock: {
      flexShrink: 1,
    },
  };
});

const TotalFee = ({ description, fee, oldFee, title, style }: any) => {
  const classes = useStyles();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        ...style,
      }}
    >
      <div className={classes.titleBlock}>
        <Typography component="p" className={classes.title}>
          {title}
        </Typography>
        <Typography component="p" className={classes.description}>
          {description}
        </Typography>
      </div>
      <div className={classes.feeBlock}>
        {!!oldFee && (
          <Typography
            style={{ display: "flex", justifyContent: "flex-end" }}
            component="span"
          >
            <VNDMoneyFormat
              className={classes.oldFee}
              suffixSameMoneyColor={true}
              boldPriceText={false}
              value={oldFee || 0}
              boldSuffix={false}
              style={{
                textDecoration: "line-through",
                alignItem: "baseline",
              }}
              suffixStyle={{
                lineHeight: 1.2,
              }}
            />
          </Typography>
        )}

        <Typography component="span">
          <VNDMoneyFormat
            className={classes.fee}
            suffixSameMoneyColor={true}
            value={fee || 0}
            boldPriceText={true}
            boldSuffix={false}
            suffixStyle={{
              lineHeight: 1.2,
            }}
          />
        </Typography>
      </div>
    </div>
  );
};

export default TotalFee;
