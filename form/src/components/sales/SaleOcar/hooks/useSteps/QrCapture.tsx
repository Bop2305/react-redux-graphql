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
  forceUrl,
  bottomDescription="* Hãy lưu lại đường link sau khi quét mã QR để hoàn thành mua OCAR bất cứ lúc nào",
  topDescription
}: {
  orderId?: string;
  discountCode?: string;
  endpointQr?: string;
  forceUrl?: string;
  bottomDescription?: string;
  topDescription?: string;
}) => {
  const classes = useStyles();
  const [domain, setDomain] = useState();

  useEffect(() => {
    setDomain(window?.location?.origin as any);
  }, [setDomain]);

  const qrUrl = forceUrl ? forceUrl : `${domain || ""}${endpointQr}${orderId ? `?orderId=${orderId}&s=4&discountCode=${discountCode}` : ""}`

  return (
    <div className={classes.wrapper}>
      <Typography textAlign="center">
          {
              topDescription ? topDescription :
              <span>Để hoàn tất quá trình mua O•CAR <br/> Bạn vui lòng quét mã QR bên dưới để chụp ảnh xe và thanh toán</span>
          }
      </Typography>
      <div className={classes.qrWrapper}>
        <QRCodeGenerator
          value={qrUrl}
        />
      </div>
      <br />
      <br />
      <Typography
        textAlign="center"
        style={{ fontSize: 14, fontStyle: "italic" }}
      >
          {bottomDescription}
      </Typography>
    </div>
  );
};

export default QrCapture;
