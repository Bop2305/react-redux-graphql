import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { Typography, CircularProgress } from "@mui/material";

import withTheme from "hoc/withTheme";

import convertCurrency from "helper/converts/convertCurrency";
import DialogForm from "components/DialogForm";
import Coupons from "components/sales/common/Coupons";
import { getCouponsType } from "components/sales/types";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(5),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftWrapper: {
    display: "grid",
    gap: theme.spacing(3),
  },
  text: {
    color: theme.palette.common.white,
    lineHeight: 1,
  },
  feeWrapper: {},
  fee: {
    fontSize: 36,
    fontWeight: theme.typography.fontWeightBold,
    lineHeight: 1,
  },
  feeUnit: {
    fontSize: 16,
  },
  oldFee: {
    fontSize: 24,
    textDecoration: "line-through",
    lineHeight: 1,
  },
  oldFeeUnit: {
    fontSize: 12,
    textDecoration: "unset",
  },
  discountWrapper: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(2),
    cursor: "pointer",
    width: "fit-content",
    "& > img": {
      height: 16,
    },
  },
  discount: {
    display: "flex",
    gap: theme.spacing(5),
    borderBottom: `1px solid ${theme.palette.common.white}`,
    alignItems: "center",
    "& > p": {
      color: theme.palette.common.white,
    },
    "& > img": {
      height: 16,
    },
  },
}));

type FeeProps = {
  onSubmit: any;
  fee: number;
  oldFee?: number;
  discountCode?: string;
  hideDiscount?: boolean;
  resourceCode: string;
  getCouponsService: getCouponsType | any;
  loading?: boolean;
};
//
const Fee = (props: FeeProps) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.leftWrapper}>
          {!props.hideDiscount && (
            <div
              className={classes.discountWrapper}
              onClick={() => setOpen(true)}
            >
              <img
                src="https://n-file.opes.com.vn/of/d/opp/pub/mails/marcom/miniweb/discount.png"
                alt="discount"
              />
              <div className={classes.discount}>
                <Typography>{props.discountCode || "MÃ GIẢM GIÁ"} </Typography>
                <img
                  src="https://n-file.opes.com.vn/of/d/opp/pub/mails/marcom/miniweb/edit.png"
                  alt="edit"
                />
              </div>
            </div>
          )}
          <Typography className={classes.text}>
            <b>Tổng phí bảo hiểm</b> <em>(đã bao gồm VAT)</em>
          </Typography>
        </div>
        <div className={classes.feeWrapper}>
          {!!props.oldFee && !props.loading && (
            <Typography className={classes.text} sx={{ textAlign: "right" }}>
              <span className={classes.oldFee}>
                {convertCurrency(props.oldFee)}
              </span>
              <span className={classes.oldFeeUnit}>đ</span>
            </Typography>
          )}
          {!props.loading && (
            <Typography className={classes.text}>
              <span className={classes.fee}>{convertCurrency(props.fee)}</span>
              <span className={classes.feeUnit}>đ</span>
            </Typography>
          )}
          {props.loading && (
            <CircularProgress style={{ color: "#fff" }} size={24} />
          )}
        </div>
      </div>
      <Coupons
        discountCode={props.discountCode}
        open={open}
        onClose={() => setOpen(false)}
        getCouponsService={props.getCouponsService}
        resourceCode={props.resourceCode}
        onSubmit={(data: any) => {
          props.onSubmit(data);
          setOpen(false);
        }}
      />
    </>
  );
};

export default withTheme<FeeProps>(Fee);
