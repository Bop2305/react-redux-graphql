import React from "react";
import { makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.action.disabledBackground,
    padding: theme.spacing(2, 3),
    display: "grid",
    gridTemplateColumns: "30% 1fr",
    gap: theme.spacing(5),
    "& > img": {
      width: "100%",
    },
  },
  selected: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  contentWrapper: {
    display: "grid",
    alignItems: "center",
  },
}));

type RadioLabelCouponProps = {
  couponCode: string;
  couponName: string;
  couponExpireDate: string;
  selected?: boolean;
};

const RadioLabelCoupon = (props: RadioLabelCouponProps) => {
  const classes = useStyles();

  return (
    <div
      className={`${classes.root} ${props.selected ? classes.selected : ""}`}
    >
      <img
        src="https://n-file.opes.com.vn/of/d/opp/pub/mails/marcom/miniweb/coupon.png"
        alt="coupon"
      />

      <div className={classes.contentWrapper}>
        <Typography fontWeight={500}>{props.couponCode}</Typography>
        <Typography fontWeight={500}>{props.couponName}</Typography>
        <Typography>Ngày hết hạn: {props.couponExpireDate}</Typography>
      </div>
    </div>
  );
};

export default RadioLabelCoupon;
