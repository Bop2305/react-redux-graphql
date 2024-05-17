import React, { useMemo } from "react";
import { makeStyles } from "@mui/styles";
import { Divider, Typography, IconButton } from "@mui/material";
import QRCode from "react-qr-code";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

import withTheme from "hoc/withTheme";
import toaster from "helper/toaster";
import { getPaymentDetailType } from "components/sales/types";
import convertCurrency from "helper/converts/convertCurrency";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    maxWidth: 390,
    minHeight: "100vh",
    display: "grid",
    gridTemplateRows: "auto 1fr",
  },
  transferWrapper: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    gap: theme.spacing(3),
    boxShadow: theme.shadows[3],
    borderRadius: theme.spacing(1),
    height: "fit-content",
  },
  title: {
    textAlign: "center",
    fontWeight: `${theme.typography.fontWeightBold} !important`,
    marginTop: `${theme.spacing(5)} !important`,
  },
  account: {
    fontSize: "1.2rem",
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
  },
  subWrapper: {
    padding: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
}));

type TransferCoreProps = {
  minHeight?: string;
  getPaymentDetailService: getPaymentDetailType;
  goodCode: string;
};

const TransferCore = (props: TransferCoreProps) => {
  const classes = useStyles();

  const paymentDetailQuery = useQuery(
    ["paymentInfoService", props.goodCode],
    () => props.getPaymentDetailService({ goodCode: props.goodCode }),
    {
      refetchOnWindowFocus: false,
      enabled: !!props.goodCode,
    }
  );

  const paymentDetail = useMemo(() => {
    return paymentDetailQuery?.data?.content;
  }, [paymentDetailQuery?.data?.content]);

  const expried = useMemo(() => {
    const _expiredTime = paymentDetail?.expiredTime;

    return !!_expiredTime ? dayjs().unix() > dayjs(_expiredTime).unix() : false;
  }, [paymentDetail?.expiredTime]);

  const fee = useMemo(() => {
    return paymentDetail?.chargeAmount;
  }, [paymentDetail]);

  return (
    <div
      className={classes.wrapper}
      style={props.minHeight ? { minHeight: props.minHeight } : {}}
    >
      <div className={classes.transferWrapper}>
        <Typography className={classes.title}>
          Thông tin tài khoản nhận
        </Typography>
        <img
          width="200"
          src="https://n-file.opes.com.vn/of/d/opp/pub/opesform/images/logos/vietqr.png"
          alt="https://n-file.opes.com.vn/of/d/opp/pub/opesform/images/logos/vietqr.png"
        />
        <div
          style={{
            position: "relative",
            display: "grid",
            justifyItems: "center",
            width: "100%",
          }}
        >
          <QRCode
            value={paymentDetail?.transParams || ""}
            size={200}
            viewBox={`0 0 200 200`}
          />
          {expried && (
            <img
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                width: "100%",
                top: "50%",
                transform: "translate(0%, -50%)",
              }}
              src="https://n-file.opes.com.vn/of/d/opp/pub/opesform/images/logos/transfer-expire.png"
            />
          )}
        </div>
        <img
          width="200"
          src="https://n-file.opes.com.vn/of/d/opp/pub/opesform/images/logos/vpbank.png"
          alt="https://n-file.opes.com.vn/of/d/opp/pub/opesform/images/logos/vpbank.png"
        />
        <Typography>CHI NHÁNH HỘI SỞ</Typography>
        <Divider sx={{ width: "100%" }} />
        <Typography component="div" className={classes.account}>
          Số tài khoản*: <b>{paymentDetail?.virtualAccount}</b>
          <IconButton
            sx={{ marginLeft: "4px" }}
            size="small"
            onClick={() => {
              navigator.clipboard.writeText(paymentDetail?.virtualAccount);
              toaster.success("Sao chép số tài khoản thành công");
            }}
          >
            <img
              src="https://n-file.opes.com.vn/of/d/opp/pub/opesform/images/icons/copy.png"
              alt="https://n-file.opes.com.vn/of/d/opp/pub/opesform/images/icons/copy.png"
            />
          </IconButton>
        </Typography>
        <Divider sx={{ width: "100%" }} />
        <Typography className={classes.account}>
          <b>Công ty Cổ phần Bảo hiểm OPES</b>
        </Typography>
        <Divider sx={{ width: "100%" }} />
        <Typography
          style={{ marginBottom: 12 }}
          component="div"
          className={classes.account}
        >
          Số tiền: <b>{convertCurrency(fee)}đ</b>
        </Typography>
      </div>

      <div className={classes.subWrapper}>
        <Typography style={{ fontSize: 10, fontStyle: "italic" }}>
          * Mã QR và Số tài khoản này chỉ được sử dụng <b>DUY NHẤT</b> cho lần
          thanh toán này, <b>KHÔNG ÁP DỤNG</b> cho những giao dịch khác.
          <br />
          <br />* Bạn vui lòng hoàn tất chuyển khoản trong vòng <b>5 ngày</b> để
          hoàn tất hợp đồng bảo hiểm.
        </Typography>

        <Typography style={{ fontSize: 15 }}>
          Opes sẽ gửi thông báo và kích hoạt hợp đồng sau khi nhận được thanh
          toán tối đa 120 giây.
        </Typography>
      </div>
    </div>
  );
};

export default withTheme<TransferCoreProps>(TransferCore);
