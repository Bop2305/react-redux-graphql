import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";

import QRCodeGenerator from "components/QRCodeGenerator";

const useStyles = makeStyles((theme) => ({
  wrapper: {},
  qrWrapper: {
    display: "grid",
    justifyContent: "center",
    marginTop: theme.spacing(10),
  },
}));

const QrCapture = ({
  orderId,
  discountCode,
  endpointQr,
}: {
  orderId: string;
  discountCode: string;
  endpointQr: string;
}) => {
  const classes = useStyles();
  const [domain, setDomain] = useState();

  useEffect(() => {
    setDomain(window?.location?.origin as any);
  }, [setDomain]);

  return (
    <div className={classes.wrapper}>
      <Typography textAlign="center">
        Để hoàn tất quá trình mua O•CAR
      </Typography>
      <Typography textAlign="center">
        Bạn vui lòng quét mã QR bên dưới để chụp ảnh xe và thanh toán
      </Typography>
      <div className={classes.qrWrapper}>
        <QRCodeGenerator
          value={`${domain || ""}${endpointQr}${
            orderId
              ? `?orderId=${orderId}&s=4&discountCode=${discountCode}`
              : ""
          }`}
        />
      </div>
      <br />
      <br />
      <Typography
        textAlign="center"
        style={{ fontSize: 14, fontStyle: "italic" }}
      >
        * Hãy lưu lại đường link sau khi quét mã QR để hoàn thành mua OCAR bất
        cứ lúc nào
      </Typography>
    </div>
  );
};

export default QrCapture;
