import React from "react";
import { makeStyles } from "@mui/styles";
import { Typography, Divider } from "@mui/material";

import convertCurrency from "helper/converts/convertCurrency";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: "grid",
    gap: theme.spacing(2),
  },
  feeWrapper: {
    display: "grid",
    gridTemplateColumns: "auto 1fr auto",
    gap: theme.spacing(5),
    alignItems: "center",
  },
  amount: {
    fontWeight: `${theme.typography.fontWeightBold} !important`,
  },
  fee: {
    fontWeight: `${theme.typography.fontWeightBold} !important`,
    color: theme.palette.primary.main,
  },
  flightIcon: {
    width: 40,
  },
}));

const FeeFlight = ({
  depAmount,
  depFee,
  returnAmount,
  returnFee,
  showReturn,
}: any) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <FeeFlightItem
        src="https://n-file.opes.com.vn/of/d/opp/pub/mails/marcom/miniweb/flightup.png"
        amount={depAmount}
        fee={depFee}
      />
      {showReturn && (
        <>
          <Divider />
          <FeeFlightItem
            src="https://n-file.opes.com.vn/of/d/opp/pub/mails/marcom/miniweb/flightdown.png"
            amount={returnAmount}
            fee={returnFee}
          />
        </>
      )}
    </div>
  );
};

const FeeFlightItem = ({ src, amount, fee }: any) => {
  const classes = useStyles();

  return (
    <div className={classes.feeWrapper}>
      <img className={classes.flightIcon} src={src} alt={src} />
      <div>
        <Typography>Số tiền bảo hiểm</Typography>
        <Typography className={classes.amount}>
          {convertCurrency(amount)}đ
        </Typography>
      </div>
      <div>
        <Typography>Phí bảo hiểm</Typography>
        <Typography className={classes.fee}>{convertCurrency(fee)}đ</Typography>
      </div>
    </div>
  );
};

export default FeeFlight;
